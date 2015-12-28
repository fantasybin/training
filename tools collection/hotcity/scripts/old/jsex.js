/**
 * @class $jsex
 * $jsex core utilities and functions.
 * @singleton
 */
var $jsex = {
	ie: 0,
	gecko: 0,
	opera: 0,
	safari: 0,

	browser:null,
	mobile:null,
	air: null,
	
	VOIDFUNC:function(){},
	globalID:(function(){var _GNUM=0;return function(){return _GNUM++;};})(),
	
	$: function(id){return document.getElementById(id);},
	_: function(clazz,parent){function bridge(){};bridge.prototype=parent.prototype;clazz.prototype=new bridge();},
	body: function(doc){if(!doc) doc=document;return doc.body? doc.body : doc.getElementsByTagName("body")[0];},
	doc: function(el){return el?el.nodeType==9?el:el.ownerDocument||document:document;},

	merge: function(o, c){for(var p in c) o[p] = c[p];return o;},

	exec: function(func){return func();},

	toInt:function(s,d){var t;return isNaN(t = parseInt(s))? d : t;},
	toFloat:function(s,d){var t;return isNaN(t = parseFloat(s))? d : t;},
	toBoolean:function(s){if(!s) return false;return (s==true || (s=s.toUpperCase())=='TRUE' || s=='1');},
	
	text: function(el){return el.innerText || el.textContent;},
	trim: function(str,type){switch(type){case 'l':return str.replace(/(^\s*)/g, "");case 'r':return str.replace(/(\s*$)/g, "");default :return str.replace(/(^\s*)|(\s*$)/g, "");}},
	stripTag: function(str) {return str.replace(/<\/?[^>]+>/gi, '');},
	starsWith: function(source,prefix,offset){if(!offset)offset=0;if(!source || source.length <offset+prefix.length)return false;return source.substring(offset,prefix.length) == prefix;},
	
    exists: function(obj,name){var p = name.split('.'),i;for(i = 0; i < p.length; i++){if(!obj[p[i]]) return false; obj = obj[p[i]];}return true;},
	isNull: function(target){return (typeof target == 'object') && !target;},
	isNumber: function(target){return typeof target == 'number' && isFinite(target)?true:false;},
	isArray: function(target){return !!target && target.constructor == Array;},
	
	removeElement: function(obj){if(obj && obj.parentNode)obj.parentNode.removeChild(obj);},
	isChildrenOf : function(node,ancestor,guaranteeDescendant){if(guaranteeDescendant && node) { node = node.parentNode; }while(node) {if(node == ancestor)return true;node = node.parentNode;}return false;},

	hasClassName: function(el, name) {return this.array.indexOf(el.className.split(/\s+/), name) != -1;},
	addClassName: function(el,name){if(this.hasClassName(el,name))return;el.className = el.className + ' ' + name;},
	
	removeClassName: function(el,names){if(typeof names=='string')names=[names];el.className=this.array.select(el.className.split(/\s+/),function(a){return($jsex.array.indexOf(names,a)== -1);}).join(' ');},
	createCssText: function(text,doc){if(!text) return;if(!doc) doc = document;var style = doc.createElement("style");style.setAttribute("type", "text/css");var head = doc.getElementsByTagName("head")[0];if(!head) return; else head.appendChild(style);if(style.styleSheet)style.styleSheet.cssText = text;else{var cssText = doc.createTextNode(text);style.appendChild(cssText);}return style;},
	createCssLink: function(href,doc){if(!href) return;if(!doc) doc = document;if(document.createStyleSheet)document.createStyleSheet(href);else{var css = doc.createElement("link");css.setAttribute('rel', 'stylesheet');css.setAttribute('type', 'text/css');css.setAttribute('href', href);var head = doc.getElementsByTagName("head")[0];if(!head) return; else head.appendChild(css);}},

	stopEvent: function(evt){if(window.event){event.returnValue = false;event.cancelBubble = true;}else{evt.preventDefault();evt.stopPropagation();}},
	callback: function(elem,handler){return function(){return handler.apply(elem,arguments);};},
	getDocumentWindow:function(doc){
		return doc.parentWindow || window;
	},

	array: {
		toArray: function(iterable){if (!iterable) return []; var results=[],i;for (i = 0; i < iterable.length; i++) results.push(iterable[i]); return results;},
		indexOf: function(arr,object){for (var i=0,n=arr.length; i<n; i++)if(arr[i] == object) return i;return -1;},
		each: function(arr,func){if(!arr) return;for(var i=0,n=arr.length;i<n;i++){func(arr[i],i);}},
		select: function(arr,func){if(!arr) return[]; var arr1=[],i,n;for(i=0,n=arr.length;i<n;i++){if(func(arr[i])) arr1.push(arr[i]);} return arr1;},
		copy: function(arr1,arr2,start,end){var i=start||0,len=end||arr1.length;for(;i<len;++i){arr2.push(arr1[i]);}},
		remove: function(arr,obj,loose){var num=0,i,n;for(i=0,n=arr.length;i<n;i++){if(arr[i]===obj || loose&&arr[i]==obj){arr.splice(i--,1);num++;}}return num;}
	},
	hash: {
		each: function(hash, func) {
		for(var key in hash) {
				func(key, hash[key]);	
			}
		}
	},
	event:{
		add: function(obj, name, handler){},
		remove: function(handler){},
		bind: function(elem, name, handler){
			var notmark = (elem == window && name=='unload');
			if(elem.addEventListener){
				var useCapture=false;
				if(name=="focusin"){
					name="focus";
					useCapture=true;
				}else if(name=="focusout"){
					name="blur";
					useCapture=true;
				}
				elem.addEventListener(name,handler,useCapture);
				handler=this.add(elem, name, handler,useCapture?4:1,notmark);
			}else if(elem.attachEvent){
				handler = $jsex.callback(elem, handler);
				elem.attachEvent("on"+name,handler);
				handler=this.add(elem, name, handler,2,notmark);
			}else{
				elem["on"+name]=handler;
				handler=this.add(elem, name, handler,3,notmark);
			}
			return handler;
		},
		bindDom: function(elem, name, target, handler){
			return this.bind(elem, name, function(e){handler.call(target,e,this);});
		},
		stop: function(elem, name){this.bind(elem,name,function(e){$jsex.stopEvent(e);return false;});},
		trigger: function(elem, name, arg){}
	},
	element: { // 此方法极度不靠谱, 废止.
		hide: function(ele) {
			ele.style.display = 'none';
			return ele;
		},
		show: function(ele) {
			ele.style.display = '';
			return ele;
		},
		visible: function(ele) {
			return ele.offsetWidth > 0 || ele.offsetHeight > 0;
		}
	}
	
};

$jsex.createXMLHttpRequest= $jsex.exec(function(){var adapterID=0,adapters=[function() {return new XMLHttpRequest();},function() {return new ActiveXObject('Msxml2.XMLHTTP');},function() {return new ActiveXObject('Microsoft.XMLHTTP');}];return function(){for(var i=adapterID;i<adapters.length;i++){try{adapterID=i;return adapters[i]();}catch(e){}}return $jsex.VOIDFUNC;};});

$jsex.exec(function(){
    var ua=navigator.userAgent, m;

    if ((/WebKit|KHTML/).test(ua)){
    	$jsex.browser='safari';
        $jsex.safari=1;
    }
    m=ua.match(/AppleWebKit\/([^\s]*)/);
    if (m&&m[1]) {
    	$jsex.safari=$jsex.toFloat(m[1]);
    	
        if (/ Mobile\//.test(ua)) {
        	$jsex.mobile = "Apple"; 
        } else {
            m=ua.match(/NokiaN[^\/]*/);
            if (m) 
            	$jsex.mobile = m[0];
        }

        m=ua.match(/AdobeAIR\/([^\s]*)/);
        if (m) 
        	$jsex.air = m[0];
		
    }else{
        m=ua.match(/Opera[\s\/]([^\s]*)/);
        if (m&&m[1]){
        	$jsex.opera = $jsex.toFloat(m[1]);
        	$jsex.browser='opera';
            m=ua.match(/Opera Mini[^;]*/);
            if (m) 
                $jsex.mobile = m[0];
        }else {
            m=ua.match(/MSIE\s([^;]*)/);
            if (m&&m[1]) {
            	$jsex.browser='ie';
            	$jsex.ie=$jsex.toFloat(m[1]);
            } else {
                m=ua.match(/Gecko\/([^\s]*)/);
                if (m) {
                	$jsex.browser='gecko';
                    $jsex.gecko=1;
                    m=ua.match(/rv:([^\s\)]*)/);
                    if (m&&m[1]) {
                    	$jsex.gecko=$jsex.toFloat(m[1]);
                    }
                }
            }
        }
    }
    return false;
});


$jsex.exec(function(){
	var supportOpacity = -1;
	function testOpacity(){
		var div = document.createElement("div");
		div.innerHTML = '   <a href="/a" style="color:red;float:left;opacity:.5;">a</a>';
		var a = div.getElementsByTagName("a")[0];
		supportOpacity = a.style.opacity == "0.5";
	}
	$jsex.opacity = function(el,value){
		if(supportOpacity === -1)
			testOpacity();
		if(supportOpacity){
			if(value !== undefined)
				el.opacity = value;
			return el.opacity;
		}else{
			if(value !== undefined){
				el.zoom = 1;
				el.filter = (el.filter || "").replace( /alpha\([^)]*\)/, "" ) + (parseInt( value ) + '' == "NaN" ? "" : "alpha(opacity=" + value * 100 + ")");
			}
			return el.filter && el.filter.indexOf("opacity=") >= 0 ? (parseFloat( el.filter.match(/opacity=([^)]*)/)[1] ) / 100) + '':"";
		}
	};
});


$jsex.exec(function(){
	var boxModel = -1;
	$jsex.boxModel =function(){
		if(boxModel !== -1)
			return boxModel;
		var div = document.createElement("div");
		div.style.width = div.style.paddingLeft = "1px";
		document.body.appendChild( div );
		boxModel = div.offsetWidth === 2;
		document.body.removeChild( div ).style.display = 'none';
		return boxModel;
	};
});



$jsex.exec(function(){
	
	var initialized = false,doesNotAddBorder,doesAddBorderForTableAndCells,subtractsBorderForOverflowNotVisible,doesNotIncludeMarginInBodyOffset;
	
	function initialize() {
		if ( initialized ) return;
		var body = document.body, container = document.createElement('div'), innerDiv, checkDiv, table, td, rules, prop, bodyMarginTop = body.style.marginTop,
			html = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';

		rules = { position: 'absolute', top: 0, left: 0, margin: 0, border: 0, width: '1px', height: '1px', visibility: 'hidden' };
		for ( prop in rules ) container.style[prop] = rules[prop];

		container.innerHTML = html;
		body.insertBefore(container, body.firstChild);
		innerDiv = container.firstChild, checkDiv = innerDiv.firstChild, td = innerDiv.nextSibling.firstChild.firstChild;

		doesNotAddBorder = (checkDiv.offsetTop !== 5);
		doesAddBorderForTableAndCells = (td.offsetTop === 5);

		innerDiv.style.overflow = 'hidden', innerDiv.style.position = 'relative';
		subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);

		body.style.marginTop = '1px';
		doesNotIncludeMarginInBodyOffset = (body.offsetTop === 0);
		body.style.marginTop = bodyMarginTop;
		body.removeChild(container);
		initialized = true;
	}
	
	if ( document.documentElement["getBoundingClientRect"] )
		$jsex.offset = function(elem) {
			if ( elem === elem.ownerDocument.body ) return $jsex.bodyOffset( elem );
			var box  = elem.getBoundingClientRect(), doc = elem.ownerDocument, body = doc.body, docElem = doc.documentElement,
				clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0,
				top  = box.top  + (self.pageYOffset || $jsex.boxModel && docElem.scrollTop  || body.scrollTop ) - clientTop,
				left = box.left + (self.pageXOffset || $jsex.boxModel && docElem.scrollLeft || body.scrollLeft) - clientLeft;
			return { top: top, left: left };
		};
	else 
		$jsex.offset = function(elem) {
			if ( elem === elem.ownerDocument.body ) return $jsex.bodyOffset( elem );
			initialized || initialize();

			var elem = elem, offsetParent = elem.offsetParent, prevOffsetParent = elem,
				doc = elem.ownerDocument, computedStyle, docElem = doc.documentElement,
				body = doc.body, defaultView = doc.defaultView,
				prevComputedStyle = defaultView.getComputedStyle(elem, null),
				top = elem.offsetTop, left = elem.offsetLeft;

			while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
				computedStyle = defaultView.getComputedStyle(elem, null);
				top -= elem.scrollTop, left -= elem.scrollLeft;
				if ( elem === offsetParent ) {
					top += elem.offsetTop, left += elem.offsetLeft;
					if ( doesNotAddBorder && !(doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(elem.tagName)) )
						top  += parseInt( computedStyle.borderTopWidth,  10) || 0,
						left += parseInt( computedStyle.borderLeftWidth, 10) || 0;
					prevOffsetParent = offsetParent, offsetParent = elem.offsetParent;
				}
				if ( subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" )
					top  += parseInt( computedStyle.borderTopWidth,  10) || 0,
					left += parseInt( computedStyle.borderLeftWidth, 10) || 0;
				prevComputedStyle = computedStyle;
			}

			if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" )
				top  += body.offsetTop,
				left += body.offsetLeft;

			if ( prevComputedStyle.position === "fixed" )
				top  += Math.max(docElem.scrollTop, body.scrollTop),
				left += Math.max(docElem.scrollLeft, body.scrollLeft);

			return { top: top, left: left };
		};

	$jsex.bodyOffset=function(){
		initialized || initialize();
		var top = body.offsetTop, left = body.offsetLeft;
//		if ( doesNotIncludeMarginInBodyOffset )
//			top  += parseInt( jQuery.curCSS(body, 'marginTop',  true), 10 ) || 0,
//			left += parseInt( jQuery.curCSS(body, 'marginLeft', true), 10 ) || 0;
		return { top: top, left: left };
	};
});

$jsex.exec(function(){
	
	function setObjectValue(target,id,obj){
		if(!target[id])
			target[id]=obj;
		else if(target[id] instanceof Array){
			var arr = target[id];
			if(obj instanceof Array){
				for(var i=0;i<obj.length;i++)
					arr.push(obj[i]);
			}else
				target[id].push(obj);
		}else
			target[id]=[target[id],obj];
	}
	
	var readObject = $jsex.readObject = function(el,target,id){
		var obj,text;
		var childs = el.getAttribute('jxChilds') || !target;

		if(text=el.getAttribute('jxObject')){
			obj = eval('({'+text+'});');
		}else if(text=el.getAttribute('jxValue')){
			if(_Rp$(text,'%.'))
				obj=el.getAttribute(text.substring(2));
			else
				obj = text;
		}else if(!childs)
			obj = el.innerHTML;
		else 
			obj ={};

		if(childs == '1'){
			var els = el.childNodes;
			for(var i=0;i<els.length;i++){
				if(els[i].nodeType == 1){
					var _id=els[i].getAttribute('jxc');
					if(_id)
						readObject(els[i],obj,_id);
				}
			}
		}
		if(id == '.')
			asd=(obj);
	
		if(target && id){
			if(id == '.')
				for(var i in obj)
					setObjectValue(target,i,obj[i]);
			else
				setObjectValue(target,id,obj);
		}
		return obj;
	};

	function getEventStack(obj, name, create){
		var arr,prop=obj.__x_;
		if(prop){
			arr=prop[name];
			if(!arr){
				arr=[];
				if(create) prop[name]=arr;
			}
		}else{
			arr=[];
			if(create){
				obj.__x_={};
				obj.__x_[name]=arr;
			}
		}
		return arr;
	}
	
	function getEventStackCopy(obj, name){
		var arr=[],prop=obj.__x_;
		if(prop){
			if(name){
				if(prop[name])
					$jsex.array.copy(prop[name],arr);
			}else{
				$jsex.array.each(prop,function(name,obj){$jsex.arraycopy(obj,arr);});
			}
		}
		return arr;
	}
	
	var events=[];

	$jsex.event.add = function(obj, name, handler, type, notmark){
		obj = new EventListener(obj,name,handler,type);
		if(!notmark){
			events.push(obj);
			obj.refer = events.length-1;
		}
		return obj;
	};
	
	$jsex.event.remove = function(listener){
		listener.remove();
		var i=listener.refer;
		if(!(i<0)){
			var obj=events.pop();
			if(i<events.length){
				events[i]=obj;
				obj.refer=i;
			}
			listener.refer=-1;
		};
	};
	
	$jsex.event.clear = function(elem, name){
		$jsex.array.each(getEventStackCopy(elem,name), $jsex.event.remove);
	};
	
	$jsex.event.trigger=function(elem, name, arg){
		var args=[];
		$jsex.array.copy(arguments,args,2);
		this.triggerParam(elem, name, args);
	};
	
	$jsex.event.triggerParam=function(elem, name, args){
		$jsex.array.each(getEventStackCopy(elem,name),function(func){
			func.apply(elem,args);
		});
	};

	
	
	function EventListener(elem,name,handler,type){
		this.elem=elem;
		this.name=name;
		this.handler=handler;
		this.type=type;
		this.refer=-1;
		getEventStack(elem,name,true).push(this);
	}

	EventListener.prototype.remove = function(){
		if(this.elem){
			switch(this.type){
				case 1:
					this.elem.removeEventListener(this.name,this.handler,false);break;
				case 4:
					this.elem.removeEventListener(this.name,this.handler,true);break;
				case 2:
					this.elem.detachEvent("on"+this.name,this.handler);break;
				case 3:
					this.elem["on"+this.name]=null;break;
			}
			$jsex.array.remove(getEventStack(this.elem,this.name), this);
			this.elem=this.handler=null;
		}
	};
	
	EventListener.prototype.apply = function(obj,args){
		return this.handler.apply(obj,args);
	};
	
});

function UIObject(){
	this._XGUI_=true;
	this._content_ = [];
	this._childrens_ = [];
	this._GID_ = "XI"+$jsex.globalID();;
}

UIObject.prototype.append=function(args){
	var html = this._content_;
	var com = this._childrens_;
	var gid = this._GID_;

	for(var i=0;i<arguments.length;i++){
		var o = arguments[i];
		if(o!=null){
			if(i%2 == 0)
				html.push(o);
			else{
				if(o._XGUI_ == true){
					com.push(o);
					html.push(o);
				}else
					html.push(' id="',o,gid,'"');
			}
		}
	}
	return this;
};

UIObject.prototype.text=function(texts){
	var html = this._content_;
	for(var i=0;i<arguments.length;i++)
		html.push(arguments[i]);
	return this;
};

UIObject.prototype.getDomNode = function(name){
	return $jsex.$(name+this._GID_,this._document_);
};

UIObject.prototype.initDocument=function(_document){
	this._document_ = _document;
	var com = this._childrens_;
	for(var i=0;i<com.length;i++)
		com[i].initDocument(_document);
	this.initialize();
};

UIObject.prototype.write=function(node){
	node.innerHTML = this.toString();
	this.initDocument($jsex.doc(node));
};

UIObject.prototype.toString=function(){
	return this._content_.join("");
};

UIObject.prototype.initialize=$jsex.VOIDFUNC;

function ActionDelay(delay){
	this.delay = delay;
	this.timer = null;
}

ActionDelay.prototype.reset= function(func){
	this.cancel();
	this.timer = setTimeout(func,this.delay);
};

ActionDelay.prototype.cancel = function(){
	if(this.timer)
		clearTimeout(this.timer);
};

function ActionFlow(interval){	// 数组无限制长度,在核心流程控制中使用.慎!
	this.actions={};
	this.logs=[];

	this.interval = interval;
	this.tid=null;
}

ActionFlow.prototype.add = function(priority,key,func){
	var node = this.actions[key];
	
	if(node && node.order < priority)
		return;
	
	this.actions[key] = {
		order: priority,
		key: key,
		func: func
	};
	return this;
};

ActionFlow.prototype.remove = function(key){
	delete this.actions[key];
};

ActionFlow.prototype.start=function(){
	
	if(this.tid !== null)
		return;
	
	var hasMore = false;
	for(var i in this.actions){
		hasMore=true;
		break;
	}
	if(!hasMore)
		return;
	this.tid = setTimeout($jsex.callback(this,this.run),this.interval);
};

ActionFlow.prototype.run=function(){
	clearTimeout(this.tid);
	this.tid=null;

	var as=this.actions,n = null;
	for(var i in as){
		var node = as[i];
		if(!n || node.order < n.order){
			n=node;
			delete as[i];
		}
	}

	if(n == null) return;
	var time = new Date().getTime();
	var state;
	try{
		n.func();
		state='done';
	}catch(e){
		state='error:'+e;
	}
	this.logs.push([time,state,new Date().getTime()-time,n.key]);
	this.start();
};

//
//trunkFlow.add(5 , 'a', function(){alert('a')});
//trunkFlow.add(3 , 'b', function(){alert('b')});
//trunkFlow.add(2 , 'a', function(){alert('aa')});
//trunkFlow.add(6 , 'c', function(){alert('c')});
//trunkFlow.add(2 , 'x', function(){alert('x')});
//trunkFlow.start();

if($jsex.ie >5 && $jsex.ie < 7){
    try{
    	(function(){
    	    document.execCommand("BackgroundImageCache", false, true);
    	    $jsex.addClassName(document.getElementsByTagName("html")[0], "jx-ie"+($jsex.ie*10));    	    
    	})();
    }catch(e){}
}