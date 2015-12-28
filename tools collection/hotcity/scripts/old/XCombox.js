

function FocusChecker(elem,target){
	var focusin = false;
	var temp = false;
	var checker = null;
	var delay = 5;

	function checkFocus(){
		checker=null;
		if(focusin != temp)
			focusin = temp;
		if(focusin){
			target.focusin();
		}else
			target.focusout();
	}

	$jsex.event.bind(elem, 'focusin', function(){
		temp = true;
		if(checker)
			clearTimeout(checker);
		checker = setTimeout(checkFocus,delay);
	});
	
	$jsex.event.bind(elem, 'focusout', function(){
		temp = false;
		if(checker)
			clearTimeout(checker);
		checker = setTimeout(checkFocus,delay);
	});
}



function XCombox(inputEl, opts){

	var elem = this.elem = inputEl.parentNode;
	this.inputEl=inputEl;
	this.collateValue = inputEl.value;
	this.tempValue=null;
	
	var lcEl = $jsex.doc(elem).createElement('DIV');
	lcEl.className="labelContainer";
	elem.insertBefore(lcEl,inputEl);

	var butEl = $jsex.doc(elem).createElement('DIV');
	butEl.className="boxWrapper";
	elem.insertBefore(butEl,inputEl);
	
	var uio = new UIObject()
	.append('<div','main',' class="boxContainer">')
	.append(	'<div','sinfo',' class="sinfo"></div><div class="sicon"></div>')
	.text(		'<div style="clear:both"></div>')
	.text(	'</div>');
	uio.write(butEl);
	
	var mel = uio.getDomNode('main'),
		iel = uio.getDomNode('sinfo');

	this.infoPanel = iel;
	
	$jsex.event.bind(mel, 'mouseover', function(){
		$jsex.addClassName(this, 'switcher_in');
	});

	$jsex.event.bind(mel, 'mouseout', function(){
		$jsex.removeClassName(this, 'switcher_in');
	});

	if(opts.attrs)
		for(var i in opts.attrs)
			this[i]=opts.attrs[i];
	
	if(opts.button){
		if(opts.button.mousedown)
			$jsex.event.add(this,'buttonmousedown',opts.button.mousedown);
	}

	if(opts.input){
		if(opts.input.click)
			$jsex.event.bindDom(inputEl,'click',this,opts.input.click);
		if(opts.input.mousedown)
			$jsex.event.bindDom(inputEl,'mousedown',this,opts.input.mousedown);
		if(opts.input.change)
			$jsex.event.add(this,'valuechange',opts.input.change);
		if(opts.input.keypress)
			$jsex.event.bindDom(inputEl,$jsex.ie || $jsex.safari ?'keydown':'keypress',this,opts.input.keypress);
		if(opts.input.label)
			lcEl.innerHTML = opts.input.label;
	}

	FocusChecker(elem,this,inputEl);
	
	if(opts.focus)
		$jsex.event.add(this,'focus',opts.focus);
	if(opts.blur)
		$jsex.event.add(this,'blur',opts.blur);

	$jsex.event.bindDom(inputEl,'keyup',this,function(evt){
		setTimeout($jsex.callback(this,this._listenKey),0);
	});

	var popContainer= this.popContainer = $jsex.doc(elem).createElement('DIV');
	popContainer.className="popContainer";
	popContainer.display='none';
	elem.appendChild(popContainer);
	
	

	this.popups = new XPopupManager(popContainer);
	if(opts.popups){
		for(var i in opts.popups)
			this.popups.createPopup(i, opts.popups[i]).own = this;
	}

	$jsex.ie && $jsex.event.bind(inputEl,"beforedeactivate",function(evt){
		//if(this._f_leave)
			//$jsex.stopEvent(evt); TODO::解决bug http://svn.corp.qunar.com/bugfree/Bug.php?BugID=27922
		this._f_leave=0;
	});
	
	$jsex.ie && $jsex.event.bind(inputEl,"focus",function(evt){
		this._f_leave=0;
	});

	$jsex.event.bindDom(mel,'mousedown',this,this.mousedown);
	popContainer.onmousedown=function(evt){
		inputEl._f_leave=1;
		return false;
	};
}

XCombox.prototype.setValue = function(value){
	this.tempValue = null;
	this.inputEl.value = value;
	this._listenKey(true);
};

XCombox.prototype.volateValue = function(value){
	this.tempValue = this.inputEl.value = value;
	this._listenKey();
};

XCombox.prototype.initValue = function(value){
	this.collateValue = this.inputEl.value = value;
	this.tempValue = null;
};

XCombox.prototype.getValue = function(){
	return this.inputEl.value;
};

XCombox.prototype.setInfo = function(info,className,tip){
	this.infoPanel.innerHTML = info || '';

	var cName = 'sinfo';
	if(className)
		cName =cName+' '+className;
	
	this.infoPanel.className = cName;
	this.infoPanel.title= tip || '';
};


XCombox.prototype.focusin=function(){
	$jsex.addClassName(this.elem, 'qbc_fin');
	$jsex.event.trigger(this,'focus');
	
	this.collateValue = this.inputEl.value;
	this.tempValue = null;
	
	
	this.timerListen(true);
};

XCombox.prototype.focusout=function(){
	this.popups.close();	// 检测是否有popup开启, typeend
	$jsex.removeClassName(this.elem, 'qbc_fin');
	$jsex.event.trigger(this,'blur');
	this.timerListen(false);
};

XCombox.prototype.mousedown = function(evt){
	var ipt = this.inputEl;
	$jsex.ie && (ipt._f_leave=1);
	window.setTimeout(function(){ipt.focus();}, 0);
	
	//this.inputEl.focus();
	$jsex.stopEvent(evt);
	$jsex.event.trigger(this,'buttonmousedown',evt);
	return false;
};

XCombox.prototype.openMainMenu = function(){
	var main = this.popups.get('main');
	if(main && main.isOpend())
		this.popups.close();
	else
		this.popups.open('main');
};

XCombox.prototype._listenKey= function(finished){
	if(this.inputEl.value == this.tempValue){
		//$jsex.event.trigger(this,'valuechange',this.inputEl.value, collateValue, true);
	}else if(this.inputEl.value != this.collateValue){
		var collateValue = this.collateValue;
		this.collateValue = this.inputEl.value;
		$jsex.event.trigger(this,'valuechange',this.inputEl.value, collateValue, finished === true);
	}
};

XCombox.prototype.timerListen = function(open){

	if(open){
		if(!this.listenID)
			this.listenID = setInterval($jsex.callback(this,this._listenKey),50);
	}else{
		if(this.listenID){
			clearInterval(this.listenID);
			this.listenID = null;
		}
	}
};