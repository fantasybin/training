/**
 * Created by JetBrains PhpStorm.
 * User: 20141022
 * Date: 15-7-1
 * Time: 下午4:08
 * To change this template use File | Settings | File Templates.
 */
function UCarCombox( inputEl, opts ){
	this.$inputEl = $(inputEl);
	this.elem = this.$inputEl.parent();
	this.popups = {};
	this.collateValue = inputEl.value;
	this.tempValue = null;

	var box = $('<div class="boxWrapper"></div>');
	box.html('<div id="main" class="boxContainer"><div id="sinfo" class="sinfo"></div><div class="sicon"></div><div style="clear:both"></div></div>');
	box.insertBefore(this.$inputEl);
	this.infoPanel = $("#sinfo");
	var popContainer = this.popContainer = $('<div class="popContainer"></div>');
	if(opts.ishotcity){
		var hotCity = this.hotCity = new UCarHotCity();
		hotCity.owner = this;
		hotCity.init();
		popContainer.append(this.hotCity.el)
	}
	if(opts.issuggest){
		var suggest = this.suggest = new UCarSuggest();
		suggest.owner = this;
		suggest.init();
		popContainer.append(suggest.el);
	}

	popContainer.insertAfter(this.$inputEl);

	this.iconBtn = $("#main");
}

$.extend(UCarCombox.prototype, {
	init: function(){
		var self = this;
		this.$inputEl.bind("click", function(evt){
			var sug = self.suggest;
			if(sug && sug.isOpend()){
			}
			else{
				self.openHotCity();
			}
			self.stopEvent(evt);
		})
		.bind("focus",function(){
			$(this).select();
		})
		.bind("keyup", function(){
			//callback: function(elem,handler){return function(){return handler.apply(elem,arguments);};},
			//监控input内容变化
			setTimeout(self._listenKey.apply(self,arguments),0);
		})
		.bind("keydown", function(evt){
				//监控上、下、回车键事件
				self.keypress( evt, evt.keyCode );
			});

		//$jsex.event.bindDom(inputEl,$jsex.ie || $jsex.safari ?'keydown':'keypress',this,opts.input.keypress);

		this.iconBtn.bind("mousedown", function( evt ){
			self.openHotCity();
            self.stopEvent(evt);
		});
		this.elem.bind("blur",function(){
			var vidx = self.vidx;
			if(vidx == -1){
                var sug = self.suggest;
                if(sug && sug.cursor > -1){
	                var items = sug.el.find("td");
					var val = $(items[vidx]).data("name");
                    self.setValue(val);
                }
            }
		});

		$(document.body).bind("mouseup",function(evt){
            if( $(evt.target).closest(".qcbox").length == 0 ) {
                self.popupsClose();
	            $(self.elem).trigger("blur");
            }
        });
	},
	volateValue : function(value){
		this.tempValue = value;
		this.$inputEl.val( value );
		this._listenKey();
	},
	_listenKey: function(selected){
		if(this.$inputEl.val() === this.tempValue){
			//this.popupsClose();
		}else if(this.$inputEl.val() !== this.collateValue){
			var collateValue = this.collateValue;
			this.collateValue = this.$inputEl.val();
			this.valuechange(this.$inputEl.val(),selected === true);
		}
	},
	valuechange: function(val, selected){
		var value = $.trim( val.replace(/["\\]*/g,"") );
		if(!selected){
			this.vidx = -1;
			this.inputold = value;
			var sug = this.suggest;
			if(value){
				sug && sug.layer && (sug.layer.cursor = -1);
				var _url = sug.getURL(value);
				sug.send(_url);
			}else{
				//this.popups.close();
				this.popupsClose();
			}
		}
	},
	
	openHotCity: function(){
		var hotcity = this.hotCity;
		if(hotcity && hotcity.isOpend()) {
			hotcity.close();
		}else{
			hotcity.open();
		}
	},
	getValue: function(){
		return this.$inputEl.val();
	},
	setValue: function(value){
		this.tempValue = null;
		this.$inputEl.val(value);
		this._listenKey(true);
	},
	setInfo : function(info,className,tip){
		this.infoPanel.html(info || "");

		var cName = 'sinfo';
		if(className)
			cName =cName+' '+className;

		this.infoPanel.className = cName;
		this.infoPanel.title= tip || '';
	},
	popupsClose: function(){
		var hotcity = this.hotCity;
		var suggest = this.suggest;
		if(hotcity){
			hotcity.close();
		}
		if(suggest){
			suggest.close();
		}
	},
	keypress : function( evt, keyCode ) {
		var sug = this.suggest;
		if(!sug || !sug.isOpend())
			return ;

		switch (keyCode) {
			case 40://arrow down
				sug.moveCursor(1,true);
				break;
			case 38://arrow up
				sug.moveCursor(-1,true);
				break;
			case 13://enter
				this.stopEvent(evt);
				sug.select(sug.cursor,true);
				sug.close();
				break;
			default:
		}
	},
	stopEvent: function( evt ){
		if(window.event){
			event.returnValue = false;
			event.cancelBubble = true;
		}else{
			evt.preventDefault();
			evt.stopPropagation();
		}
	}
});