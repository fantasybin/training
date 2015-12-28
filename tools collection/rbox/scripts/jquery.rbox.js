(function($){

    var INIT_ARGUMENT = {
        hideOnClickOutside : false
    };

    var isTouch = "ontouchmove" in window;

    var contentCss = {
        'display' : 'none' ,
        'position' : 'absolute' ,
        'left' : '0',
        'top' : '0',
        'overflow' : 'scroll'
    };

    var overlayerCss = {
        'display':'none',
        'position':'absolute',
        'background-color':'#000',
        'left':'0',
        'top':'0',
        'opacity':0.6,
        'filter': 'Alpha(opacity=60)'
    };

    var ZINDEX_BASE = 10000,
        RBOX_STYLE = 'rbox_outerContent',
        body = $(document.body);

    var ind = 0,
        cache = {};

    //保证全局只有一个rbox被打开
    var isOpened = false;


    function getDE(){
        return (document.compatMode && document.compatMode.toLowerCase() == "css1compat") ? document.documentElement : document.body;
    }

    function getWH(){
        var de = getDE();
        return {
            width: window.innerWidth || de.clientWidth,
            height: window.innerHeight || de.clientHeight
        };
    }

    function makeKey(ind){
        return 'rbox' + ind;
    }
    function getRBox( evt ){
        if(typeof evt == 'string')
            return cache[evt];
        else if(evt && evt.isRBox){
            return evt;
        }else{
            evt = jQuery.event.fix(evt || window.event);
            var p = $(evt.target).parents('.' + RBOX_STYLE);
            return p.size() > 0 && cache[ makeKey( p.data('ind') ) ];
        }
    }


    var FixedHeader = function( content , headerEl , key){


        var fixed = false ,
            fakeEl = $('<div/>').hide() ,
            supportFixed = !$.browser.msie || $.browser.verson >= 7 ;

        if( headerEl ){
            headerEl.after( fakeEl );

            content.bind( 'scroll.rbox.' + key  , this.onScroll = function( evt ){
                var p;
                if( fixed ){
                    p = fakeEl.position();

                    if(p.top >= 0 ){
                        fakeEl.hide();
                        headerEl.css({
                            'position':'',
                            'left' : 0,
                            'top' : 0
                        });

                        fixed = false;
                    }

                }else{
                    p = headerEl.position();
                    if( p.top <= 0 ){
                        fakeEl.css( {
                            width : headerEl.width(),
                            height: headerEl.height()
                        }).show();

                        if( supportFixed )
                            headerEl.css({
                                'position':'fixed',
                                'top' : 0,
                                'left' : fakeEl.position().left
                            });

                        fixed = true;
                    }
                }

                if( fixed && !supportFixed ){
                    headerEl.css({
                        'position':'absolute',
                        'top' : content.scrollTop(),
                        'left' : fakeEl.position().left
                    });
                }
            });

            $( window ).bind('resize.rbox.' + key , this.onResize = function( evt ){
                if( fixed ){
                    if( !supportFixed ){
                        headerEl.css({
                            'top' : content.scrollTop(),
                            'left' : fakeEl.position().left
                        });
                    }else{
                        headerEl.css({
                            'left' : fakeEl.position().left
                        });
                    }
                }
            } );
        }

        this.destroy = function(){
            $( window ).unbind( 'resize.rbox.' + key , this.onResize );
            content.unbind( 'scroll.rbox.' + key , this.onScroll );
        };
    };





    var RBox = function(html , args , ind) {
        this.key = makeKey(ind);
        this.args = args;
        this.alive = true;
        this.binded = false;

        this.visible = false;

        var ctx = this.outerContent = $('<div/>').addClass( RBOX_STYLE ).css($.extend({} , contentCss , {'zIndex' : ZINDEX_BASE + ind})).appendTo($(document.body));
        this.content = $('<div/>').css({
            'float':'left',
            'display':'inline'
        }).appendTo( ctx );
        this.overlayer = $('<div/>').css($.extend({},overlayerCss,{'zIndex':ZINDEX_BASE - ind })).appendTo($(document.body));

        ctx.data('ind' , ind);

        this.setContent( html );

        cache[this.key] = this;
    };

    RBox.prototype = {
        isRBox : 1,
        refresh : function(){}
    };



    $.each(['close','show','hide','trigger','bind','unbind','data','setContent'] , function(idx , type){
        RBox.prototype[type] = function(){
            return $.rbox[type].apply(window,[this].concat(Array.prototype.slice.call(arguments || [])));
        };
    });

    $.rbox = function(html , arg) {
        var _ind = ++ind;
        arg = $.extend({}, INIT_ARGUMENT , arg || {});
        return new RBox(html || "" , arg , _ind);
    };

    $.rbox.setContent = function( evt , html ){

        var qb = getRBox(evt);

        var content = qb.content;

        if( qb.fh ){
            qb.fh.destroy();
            qb.fh = null;
        }

        if(typeof html == 'string')
            content.html(html);
        else if(html && html.nodeType == 1)
            content.append($(html).show());
        else if(html instanceof jQuery){
            content.append(html.show());
        }

        var header = content.find('.js-header');

        if( header.size() === 1 )
            qb.fh = new FixedHeader(  qb.outerContent , header , qb.key );

        if( qb.visible )
            qb.refresh();

        return qb;
    };

    $.rbox.bind = function(evt , type , func){
        var qb = getRBox(evt);
        if( !qb || !qb.alive )return;
        $(qb.outerContent).bind( type + '.rbox', func );
        return qb;
    };

    $.rbox.unbind = function(evt , type , func){
        var qb = getRBox(evt);
        if( !qb || !qb.alive )return;
        if(func)
            $(qb.outerContent).unbind( (type || '') + '.rbox', func );
        else
            $(qb.outerContent).unbind( (type || '') + '.rbox' );
        return qb;
    };

    $.rbox.trigger = function(evt , type , data){
        var qb = getRBox(evt);
        if( !qb || !qb.alive )return;
        $(qb.outerContent).triggerHandler( type + '.rbox' , data  );
        return qb;
    };

    $.rbox.data = function(evt , key , value){
        var qb = getRBox(evt);
        if( !qb || !qb.alive )return;
        return qb.outerContent.data(key , value);
    };


    $.rbox.show = function(evt){

        var qb = getRBox(evt);

        if( !qb || !qb.alive )return;

        if( isOpened ){
            qb.outerContent.scrollTop( 0 ).scrollLeft( 0 );
            if( qb.visible )
                qb.refresh();
            return;
        }

        isOpened = true;

        var args = qb.args,
            vertical = ( args.vertical ? args.vertical : "");

        if( !qb.visible ){

            if(isTouch){
                backupBodyStyle();
                $( window ).scrollTop( 0 ).scrollLeft( 0 );
            }

            backupHTMLOverflow();

        }

        qb.visible = true;

        changeHTMLOverflow( 'hidden' );

        qb.outerContent.show();

        if(!qb.binded){

            qb.binded = true;

            qb.refresh = function( evt ){

                qb.outerContent.css({
                    'overflow' : 'hidden',
                    'width' : '1px'
                });

                var wh = getWH(),
                    de = getDE();

                var _top = Math.max( document.body.scrollTop , document.documentElement.scrollTop ) - ( parseFloat( $( document.documentElement ).css('borderTopWidth') ) || 0 ),
                    _left = Math.max( document.body.scrollLeft , document.documentElement.scrollLeft ) - ( parseFloat( $( document.documentElement ).css('borderLeftWidth') ) || 0 );


                qb.outerContent.css( {
                    width : wh.width,
                    height : wh.height,
                    top : _top,
                    left : _left,
                    overflow : 'auto'
                } );

                qb.overlayer.css({
                    width: Math.max( de.clientWidth , de.scrollWidth ) ,
                    height : Math.max( de.clientHeight , de.scrollHeight ) ,
                    overflow : 'hidden',
                    display : 'block'
                });

                if(isTouch){
                    body.css({
                        height: wh.height,
                        width : wh.width,
                        overflow : 'hidden',
                        overflowX : 'hidden',
                        overflowY  : 'hidden'
                    });
                }

                var _marginTop = 0,
                    _marginLeft;

                qb.content.css( {
                    'marginLeft' : 0 ,
                    'marginTop' : 0
                } );

                if(vertical === "middle")
                    _marginTop = ( ( de.clientHeight - qb.content.height() ) / 2 );

                _marginLeft = ( wh.width - qb.content.width() ) / 2;

                if(_marginTop < 0)_marginTop = 0;
                if(_marginLeft < 0)_marginLeft = 0;

                qb.content.css( {
                    'marginLeft' : _marginLeft + 'px',
                    'marginTop' : _marginTop + 'px'
                } );
            };

            $(window).bind('scroll.rbox.' + qb.key + ' resize.rbox.' + qb.key + ' touchesMoved.rbox.' + qb.key , qb.refresh );

            if( args.hideOnClickOutside ){
                qb.outerContent.bind('click.rbox' ,function( evt ){
                    if( evt.target === qb.outerContent[0] || evt.target === qb.content[0] )
                        qb.hide();
                });
            }

        }

        qb.outerContent.scrollTop( 0 ).scrollLeft(0);

        $(window).triggerHandler('resize.rbox.' + qb.key);

        $(qb.outerContent).triggerHandler('show.rbox');

        return qb;

    };

    $.rbox.hide = function(evt){
        var qb = getRBox(evt);

        if( !qb || !qb.alive || !qb.visible)return;

        qb.visible = false;

        isOpened = false;

        restoreHTMLOverflow();

        $(window).unbind('scroll.rbox.' + qb.key + ' resize.rbox.' + qb.key);

        qb.binded = false;

        qb.outerContent.unbind('scroll.rbox.' + qb.key + ' resize.rbox.' + qb.key);

        qb.content.unbind('scroll.rbox.' + qb.key + ' resize.rbox.' + qb.key);

        qb.outerContent.unbind('click.rbox.' + qb.key );

        qb.overlayer.unbind('click.rbox.' + qb.key );

        qb.outerContent.scrollTop( 0 ).scrollLeft(0);

        qb.outerContent.hide();

        qb.overlayer.hide();

        $(qb.outerContent).triggerHandler('hide.rbox');

        if(isTouch){
            restoreBodyStyle();
        }

        return qb;
    };

    $.rbox.close = function(evt){
        var qb = getRBox(evt);
        if( !qb || !qb.alive )return;
        $.rbox.hide(qb);
        qb.alive = qb.binded = false;
        qb.outerContent.remove();
        delete cache[qb.key];
        $(qb.outerContent).triggerHandler('close.rbox');
        return qb;
    };
    /*
     firefox will lose the scrollTop when change overflow
     */
    function changeHTMLOverflow( type , de ){
        var de = $( document.documentElement || de ),
            _st = de.scrollTop(),
            _sl = de.scrollLeft();

        if( typeof type === 'object' )
            de.css( type );
        else    // IE overflow won't override overflowX & Y existing at the same time!
            de.css( {
                'overflowX' : type,
                'overflowY' : type,
                'overflow' : type
            } );

        de.scrollTop( _st );
        de.scrollLeft( _sl );
    }

    function backupHTMLOverflow( de ){
        de = de || document.documentElement;

        $( de ).data('htmlOverflowBackup',{
            overflowX : de.style.overflowX,
            overflowY : de.style.overflowY,
            //for IE
            overflow : de.style.overflow
        });
    }

    function restoreHTMLOverflow( de ){
        changeHTMLOverflow( $( de || document.documentElement ).data('htmlOverflowBackup') || {} );
    }

    var _bodyHW = {},
        _bodyScroll ={};

    function backupBodyStyle(){

        backupHTMLOverflow( document.body );

        _bodyHW = {
            height :  document.body.style.height || '',
            width : document.body.style.width || ''
        };
        _bodyScroll = {
            scrollTop : $( window ).scrollTop(),
            scrollLeft : $( window ).scrollLeft()
        };
    }

    function restoreBodyStyle(){
        restoreHTMLOverflow( document.body );
        body.css( _bodyHW )
            .scrollLeft(_bodyScroll.scrollLeft || 0)
            .scrollTop(_bodyScroll.scrollTop || 0 );

    }


})(jQuery);