(function($){

	var _initargs = {
		top : 0.382,
		left : 0.5,
		fixable : true,
		modeless : false
	}
	var contentCss = {
		'display' : 'none' , 
		'position' : 'absolute' , 
		'zIndex' : 10000 , 
		'left' : '50%'};
	var overlayCss = {
		'display' : 'none' ,
		'position' : 'absolute' ,
		'zIndex' : 10000 ,
		'top' : '0px' ,
		'left' : '0px' ,
		'opacity' : 0.2,
		'frameborder' : 0,
 		'backgroundColor' : '#000'};
	
	var ind = 0;
	var ZINDEXBASE = 10000;
	var cache = {};

	function getDE(){
			return (document.compatMode && document.compatMode.toLowerCase() == "css1compat") ? document.documentElement : document.body;
	}
	function getWH(){
		var de = getDE();
		return { width : Math.max( de.clientWidth , de.scrollWidth ) , height : Math.max( de.clientHeight , de.scrollHeight )};
	}
	function getTL( content, top , left ){
		var de = getDE();
		var _scrollTop = Math.max( document.documentElement.scrollTop , document.body.scrollTop );
		var top = ( de.clientHeight - content.outerHeight()) * top + _scrollTop;
		var left = Math.floor(content.outerWidth() * left);
		return { marginLeft : - left + 'px', top : top + 'px' };
	}
	function parseInner( html , qbox){
		return html;
	}
	function makeKey(ind){
		return 'qbox' + ind;
	}
	function getQBox( evt ){
		if(typeof evt == 'string')
			return cache[evt];
		else if(evt && evt.isqbox){
			return evt;
		}else{
			evt = jQuery.event.fix(evt || window.event);
			var p = $(evt.target).parents('.qbox_content');
			if(p.size() > 0){
				return cache[ makeKey( p.data('ind') ) ];
			}
		}
	}
	var QBox = function(html , args , ind) {
		this.key = makeKey(ind);
		this.args = args;
		this.alive = true;
		this.binded = false;
		this.overlay = $('<div></div>').addClass('qbox_overlay').css($.extend({} , overlayCss , {'zIndex' : ZINDEXBASE + ind})).appendTo($(document.body));
		var ctx = this.content = $('<div />').addClass('qbox_content').css($.extend({} , contentCss , {'zIndex' : ZINDEXBASE + ind})).appendTo($(document.body));
		
		ctx.data('ind' , ind);

		if(typeof html == 'string')
			ctx.html(parseInner(html));
		else if(html && html.nodeType == 1)
			ctx.append($(html).show());
			
		cache[this.key] = this;
	};
	QBox.prototype = {
		isqbox : 1
	};
	$.each(['close','show','hide','trigger','bind','unbind','data'] , function(idx , type){
		QBox.prototype[type] = function(){ 
			return $.qbox[type].apply(window,[this].concat(Array.prototype.slice.call(arguments || []))); 
		};
	});
	$.qbox = function(html , arg) {
		var _ind = ++ind;
		arg = $.extend(_initargs , arg || {});
		return new QBox(html || "" , arg , _ind);
	};
	$.qbox.bind = function(evt , type , func){
		var qb = getQBox(evt);
		if( !qb || !qb.alive )return;
		$(qb.content).bind( type + '.qbox.' + qb.key, func );
	};
	$.qbox.unbind = function(evt , type , func){
		var qb = getQBox(evt);
		if( !qb || !qb.alive )return;
		if(func)
			$(qb.content).unbind( (type || '') + '.qbox.' + qb.key, func );
		else
			$(qb.content).unbind( (type || '') + '.qbox.' + qb.key );
	};
	$.qbox.trigger = function(evt , type , data){
		var qb = getQBox(evt);
		if( !qb || !qb.alive )return;
		$(qb.content).triggerHandler( type + '.qbox.' + qb.key, data );
	};
	$.qbox.data = function(evt , key , value){
		var qb = getQBox(evt);
		if( !qb || !qb.alive )return;
		return qb.content.data(key , value);
	};
	$.qbox.show = function(evt){
		var qb = getQBox(evt);
		if( !qb || !qb.alive )return;
		
		if(!qb.args.modeless)
			qb.overlay.show();
		qb.overlay.css({
			overflow:'hidden'
		});
		qb.content.show();
		
		if(!qb.binded){
			qb.binded = true;
			$(window).bind('resize.qbox' ,function(evt){
				qb.overlay.css(getWH());
				if(qb.args.fixable){
					qb.content.css(getTL(qb.content,qb.args.top , qb.args.left));
				}
			});
			$(window).bind('scroll.qbox' ,function(evt){
				if(qb.args.fixable){
					qb.content.css(getTL(qb.content,qb.args.top , qb.args.left));
				}
			});
			
		}
		
		var _oldfixable = qb.args.fixable;
		qb.args.fixable = true;
		$(window).triggerHandler('resize.qbox');
		qb.args.fixable = _oldfixable;
		
		$(qb.content).triggerHandler('show.qbox.' + qb.key);

	};
	$.qbox.hide = function(evt){
		var qb = getQBox(evt);
		if( !qb || !qb.alive )return;
		$(window).unbind('scroll.qbox');
		$(window).unbind('resize.qbox');
		qb.binded = false;
		qb.overlay.hide();
		qb.content.hide(); 
		$(qb.content).triggerHandler('hide.qbox.' + qb.key);
	};

	$.qbox.close = function(evt){
		var qb = getQBox(evt);
		if( !qb || !qb.alive )return;
		$.qbox.hide(qb);
		qb.alive = qb.binded = false;
		qb.overlay.remove();
		qb.content.remove();
		delete cache[qb.key];
		$(qb.content).triggerHandler('close.qbox.' + qb.key);
	};
})(jQuery);