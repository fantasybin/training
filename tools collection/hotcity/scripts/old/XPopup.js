function XPopup(opts){
	this.panel = null;
	this.className = "popPanel" +(opts.className ? " "+opts.className : "");
	if(opts.close)
		$jsex.event.add(this,'close',opts.close);
	
	if(opts.open)
		$jsex.event.add(this,'open',opts.open);

	if(opts.initialize)
		this.initialize = opts.initialize;

}

XPopup.prototype.initialize = function(panel){};

XPopup.prototype._open = function(){
	this.panel.style.display = '';	
	$jsex.event.trigger(this,'open');
};

XPopup.prototype.isOpend = function(){
	return this.panel && this.panel.style.display != 'none';
};

XPopup.prototype.close = function(){
	$jsex.event.trigger(this,'close');
	this.panel.style.display = 'none';
};

function XPopupManager(container){
	this.popups={};
	this.container = container;
	this.current = null;
	this.defaultName = null;
}

XPopupManager.prototype.createPopup = function(name,opts){
	return this.popups[name] = new XPopup(opts);
};

XPopupManager.prototype.open = function(name){
	var popup = this.popups[name];
	if(popup){
		if(!popup.inited){
			var popPanel = popup.panel;
			if(!popPanel){
				popPanel= $jsex.doc(this.container).createElement('DIV');
				popPanel.className=popup.className;
				popPanel.style.display='none';
				this.container.appendChild(popPanel);
				popup.panel = popPanel;
			}
			popup.initialize();
			popup.inited = true;
		}

		if(this.current && this.current != popup && this.current.isOpend())
			this.current.close();

		if(!popup.isOpend()){
			popup._open();
		}
		return this.current = popup;
	}
};

XPopupManager.prototype.close = function(name){
	if(name && !this.isOpend(name))
		return;

	if(this.current != null){
		this.current.close();
		this.current = null;
	}
};

XPopupManager.prototype.isOpend = function(name){
	if(name){
		if(this.popups[name])
			return this.popups[name].isOpend();
	}else if(this.current != null)
		return this.current.isOpend();

	return false;
};

XPopupManager.prototype.get = function(name){
	return this.popups[name];
};