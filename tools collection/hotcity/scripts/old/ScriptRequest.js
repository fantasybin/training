function ScriptRequest(option){
	if(option.funcName)
		this.funcName = option.funcName;
	this.callbackName=option.callbackName || '__jscallback';
	this.doc = option.doc || document;
	this.win = $jsex.getDocumentWindow(this.doc);
	
	if(option.onerror)
		$jsex.event.add(this,'error',option.onerror);
	if(option.ontimeout)
		$jsex.event.add(this,'timeout',option.ontimeout);
	if(option.oncancel)
		$jsex.event.add(this,'cancel',option.oncancel);
	if(option.oncomplete)
		$jsex.event.add(this,'complete',option.oncomplete);
}

ScriptRequest.loadScript = function(url,doc) {
	doc = doc || document;
	var port = doc.createElement("script");
	port.async=true;
	port.type = "text/javascript";
	port.src = url;
	doc.getElementsByTagName("head")[0].appendChild(port);
	return port;
};
ScriptRequest.loadImage = function(opts){
    var _url = [], count=0;
    _url.push( opts.url );
    $.each(opts.params, function(key, param){
        if( param instanceof Array ){
            param = param.join(',');
        }
        if(count == 0){
            _url.push('?'+ key + '=' + param);
        }else{
            _url.push('&'+ key + '=' + param);
        }
        count++;
    });
    var img = document.createElement('img');
    img.onload = function(){  //这个要写在img.src前面，否则，IE下图片如果拿缓存的话，速度太快，会不执行onload事件
    	img.onload = null;
    	img = null;
    }
   	img.src = _url.join('');
};
ScriptRequest.prototype.send = function(url, timeout){
	
	var cid = this.callID = this.funcName ? this.funcName : 'XQScript_'+$jsex.globalID();

	if(url.indexOf('?') == -1)
		url=url+'?';

	url+='&'+this.callbackName+'='+cid;

	var _self = this;
	var _win = this.win;

	var timerid;

	_win[cid] = function(){
		if(timerid){
			window.clearTimeout(timerid);
			timerid=null;
		}
		_self.release();
		_win[cid] = null;
		$jsex.event.triggerParam(_self,'complete',$jsex.array.toArray(arguments));
	};
	if(timeout && timeout >0){
		timerid = window.setTimeout(function(){
				_self.release();
				$jsex.event.trigger(_self,'timeout');
			},timeout
		);
	}
	this.searchPort=ScriptRequest.loadScript(url,this.doc);
};

ScriptRequest.prototype.release=function(){
	if(this.searchPort){
		$jsex.removeElement(this.searchPort);
		this.searchPort = null;
		this.win[this.callID] = $jsex.VOIDFUNC;
		return true;
	}
	return false;
};

ScriptRequest.prototype.cancel=function(){
	if(this.release())
		$jsex.event.trigger(this,'cancel');
};