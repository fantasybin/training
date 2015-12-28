/**
* Config Model:
* {
*	boxId:"boxId" string 要绑定翻转的控件ID
*	speed:600 num 动画翻转的速度 毫秒，默认600
*	effect:"slide" string 翻转的动画类型
*	isLazy: false 是否lazy load图片
*	isLoop: true 是否自动翻转 默认true
*	gap:3000 num 自动翻转的间隔 毫秒 默认3000
** }
**/

function PicsRotate(config){
	if("undefined" == typeof config.boxId) return;
	this.config = config;
	this.box = $("#" + config.boxId);
	if(this.box.length == 0) return;
	this.speed,
	this.effect,
	this.isLazy,
	this.isLoop,
	this.gap,
	this.showBox,
	this.screens,
	this.num,
	this.width,
	this.nextButton,
	this.prevButton,
	this.dots,
	this.lazyCount,
	this.current,
	this.isLoaded,
	this.isMoving;
	//初始化控件
	this.init();
}

PicsRotate.prototype = {

	constructor:PicsRotate, //重新绑定构造类型
	
	init:function(){
		this.speed = ("undefined" == typeof this.config.speed)?600:this.config.speed;
		this.effect = ("undefined" == typeof this.config.effect)?"default":this.config.effect;
		this.isLazy = ("undefined" == typeof this.config.isLazy)?false:this.config.isLazy;
		this.isLoop = ("undefined" == typeof this.config.isLoop)?true:this.config.isLoop;
		this.gap = ("undefined" == typeof this.config.gap)?3000:this.config.gap;
		this.current = 1;
		this.isLoaded = false,
		this.isMoving = false;
		this.showBox = this.box.find("ul");
		this.screens = this.showBox.find("li");
		this.num = this.screens.length;
		this.width = $(this.screens[0]).width();
		this.nextButton = this.box.find(".next");
		this.prevButton = this.box.find(".prev");
		this.dots = null;
		this.isLoaded = false;
		this.lazyCount = this.box.find("[data-lazy]").length;
		this.isMoving = false;
	},
	
	start:function(){ //初始化轮播动画
		if(this.screens.length == 0) return;
		var _self = this;
        _self.createDots();
		_self.bindEvent();
        _self.showButton();
		if(_self.isLoop){ _self.loops(); }
		if(_self.isLazy){ 
			var img0 = $(_self.screens[0]).find("img");
			_self.loadSingleImage(img0);
			_self.lazyLoad(); 
		}
	},
	
	bindEvent:function(){
		var _self = this;
		type = this.effect;
		
		if("undefined" != typeof _self.nextAnimations[type]){
			_self._nextFunc = _self.nextAnimations[type];
		}else{
			_self._nextFunc = _self.nextAnimations["default"];
		}
		
		if("undefined" != typeof _self.prevAnimations[type]){
			_self._prevFunc = _self.prevAnimations[type];
		}else{
			_self._prevFunc = _self.prevAnimations["default"];
		}
		
		if("undefined" != typeof _self.pagingAnimations[type]){
			_self._pagingFunc = _self.pagingAnimations[type];
		}else{
			_self._pagingFunc = _self.pagingAnimations["default"];
		}
		
		_self.nextButton.click(function(e){ 
			_self.cancelAnimation(e);
			_self.next(); 
		});
		
		_self.prevButton.click(function(e){
			_self.cancelAnimation(e);
			_self.prev();
		});
		
		_self.box.delegate("ol li","click",function(e){
			_self.cancelAnimation(e);
			_self.paging(this);
		});
	},
	
	createDots:function(){ //创建分页小点
		var htmls = [];
        for(var i=0,len = this.screens.length;i<len;i++){
            if(i == 0){
                htmls.push("<li class='active'><span>" + (i+1) + "</span></li>");
            }else{
                htmls.push("<li><span>" + (i+1) + "</span></li>");
            }
        }
        this.box.find("ol").append(htmls.join(''));
        this.dots = this.box.find("ol li");
	},
	
	nextAnimations:{ //next动画列表，如果需要增加动画可以在对象外部通过 addAnimation 方法来增加动画类型
		"slide":function(targetId){
			var _self = this;
			_self.showBox.stop().animate({
				"margin-left": "-" + _self.width + "px"
			},_self.speed,function(){
				$(_self.screens.get(_self.current-1)).appendTo(_self.showBox);
				_self.showBox.css("margin-left","0px");
				_self.current = targetId;
				_self.lazyLoad();
				_self.isMoving = false;
			});
		},
		"fadeIn":function(targetId){
			var _self = this;
			var currentScreen = $(_self.screens.hide().get((_self.num == _self.current)?0:_self.current)).show();
			currentScreen.find("img").hide().stop().fadeIn(_self.speed,function(){
				_self.current = targetId
				_self.lazyLoad();
				_self.isMoving = false;
			});
		},
		"default":function(){
		}
	},
	
	prevAnimations:{ //prev动画列表，如果需要增加动画可以在对象外部通过 addAnimation 方法来增加动画类型
		"slide":function(prevNum){
			var _self = this;
			_self.showBox.css("margin-left","-" + _self.width + "px");
			$(_self.screens[prevNum-1]).prependTo(_self.showBox);
			_self.showBox.stop().animate({
				"margin-left":"0px"
			},_self.speed,function(){
				_self.current = prevNum;
				_self.isMoving = false;
			});
		},
		"fadeIn":function(prevNum){
			var _self = this;
			var currentScreen = $(_self.screens.hide().get(prevNum-1)).show();
			currentScreen.find("img").hide().stop().fadeIn(_self.speed,function(){
				_self.current = prevNum;
				_self.isMoving = false;
			});
		},
		"default":function(prevNum){
		}
	},
	
	pagingAnimations:{ //分页动画列表，如果需要增加动画可以在对象外部通过 addAnimation 方法来增加动画类型
		"slide":function(targetOrder){
			var _self = this;
			var distance = (targetOrder - _self.current)* _self.width;
			if(distance > 0){
				_self.showBox.stop().animate({
					"margin-left":"-" + distance + "px"
				},_self.speed,function(){
					_self.screens.slice(0,targetOrder-1).appendTo(_self.showBox);
					_self.showBox.css("margin-left","0px");
					_self.current = targetOrder;
					_self.lazyLoad();
					_self.isMoving = false;
				});
			}else{
				_self.screens.slice(targetOrder-1,_self.current-1).prependTo(_self.showBox);
				_self.showBox.css("margin-left",distance + "px");
				_self.showBox.stop().animate({
					"margin-left": "0px"
				},_self.speed,function(){
					_self.current = targetOrder;
					_self.lazyLoad();
					_self.isMoving = false;
				});
			}
		},
		"fadeIn":function(targetOrder){
			var _self = this;
			var currentScreen = $(_self.screens.hide().get(targetOrder-1)).show();
			currentScreen.find("img").hide().stop().fadeIn(_self.speed,function(){
				_self.current = targetOrder;
				_self.lazyLoad();
				_self.isMoving = false;
			});
		},
		"default":function(targetOrder){
		}
	},
	
	addAnimation:function(type,nextFunc,preFunc,pagingFunc){
		if("undefined" == typeof type || "" == type) return;
		if("undefined" != typeof nextFunc && "function" == typeof nextFunc){
			this.nextAnimations[type] = nextFunc;
		}
		if("undefined" != typeof preFunc && "function" == typeof preFunc){
			this.prevAnimations[type] = preFunc;
		}
		if("undefined" != typeof pagingFunc && "function" == typeof pagingFunc){
			this.pagingAnimations[type] = pagingFunc;
		}
	},
	
	cancelAnimation:function(e){
		//如果动画还未结束则不操作向下翻页
		if(!this.isMoving){
			this.isMoving = true;
		}else{
			return;
		}
		this.tryFixIe6(); 
		e.stopImmediatePropagation();
	},
	
	next:function(){
		var targetId = (this.num == this.current)?1:this.current + 1;
		$(this.dots.removeClass("active").get(targetId-1)).addClass("active");
		this._nextFunc.call(this,targetId);
	},
	
	prev:function(){
		var prevNum = (this.current == 1)?this.num:(this.current-1);
		$(this.dots.removeClass("active").get(prevNum-1)).addClass("active");
		this.lazyLoad(prevNum);
		this._prevFunc.call(this,prevNum);
	},
	
	paging:function(li){
		var target = $(li);
		var targetOrder = parseInt(target.text(),10);
		if(targetOrder == this.current) return;
		this.lazyLoad(targetOrder);
		$(this.dots.removeClass("active").get(targetOrder-1)).addClass("active");
		this._pagingFunc.call(this,targetOrder);
	},
	
	loops:function(){
		var _self = this;
		if(_self.screens.length <= 1) return;
		var loopId;
		_self.box.mouseover(function(){
			clearInterval(loopId);
			_self.isMoving = false;
		}).mouseout(function(){
			loopId = setInterval(function(){
				_self.next();
			},_self.gap);
		});
		_self.box.trigger('mouseout');
	},
	
	lazyLoad:function(targetOrder){
		if(!this.isLazy || this.isLoaded) return;
		if("undefined" == typeof(arguments[0])){
			var targetOrder = (this.num == this.current)?1:this.current + 1;
		}
		var nextPic = $(this.screens[targetOrder-1]).find("img");
		if("undefined" == typeof nextPic.attr("data-lazy")) return;
		this.loadSingleImage(nextPic);
		if(0 == this.lazyCount) this.isLoaded = true;
	},
	
	loadSingleImage:function(pic){
		var lazyImg = document.createElement("img");
		var lazyUrl = pic.attr("data-lazy");
		$(lazyImg).bind("load",function(){
			pic.attr("src",lazyUrl);
			pic.css({"width":"980px","height":"340px"});
			pic.parent().css("background-image","none");
			lazyImg = null;
			this.lazyCount--;
			pic.removeAttr("data-lazy");
		});
		lazyImg.src = lazyUrl;
	},
	
	showButton:function(){
		var _self = this;
		_self.box.mouseover(function(){
            _self.nextButton.show();
            _self.prevButton.show();
        }).mouseout(function(){
            _self.nextButton.hide();
            _self.prevButton.hide();
        });
	},
	
	tryFixIe6:function(){
		if("undefind" != typeof window["tryFixIe6"]){
			try {
				//fix ie6
				if (window.event) {
					event.returnValue = false;
					event.cancelBubble = true;
				}
			} catch (e) {}
		}else{
			return window["tryFixIe6"];
		}
	}
}