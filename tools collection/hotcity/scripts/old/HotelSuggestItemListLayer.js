function HotelSuggestItemListLayer(popup,opts){
	this.popup = popup; 
	this.cursor = -1;
	this.nodes = [];

	if(opts.select)
		$jsex.event.add(this,'select',opts.select);
}
HotelSuggestItemListLayer.prototype.error = function(){
	
	var uio = new UIObject();
	uio.append('<table' , 'suggestList' ,' class="ill" cellspacing="0" cellpadding="0" >');
	uio.text('<tr class="illrow error">',
				'<td>对不起，不支持该目的地</td>',
			 '</tr>');
	uio.write(this.popup.panel); 
}
HotelSuggestItemListLayer.prototype.escape = function(s) {
	s = String(s === null ? "" : s);
	return s.replace(/&(?!\w+;)|["'<>\\]/g, function(s) {
	switch(s) {
		case "&": return "&amp;";
		case "\\": return "\\\\";
		case '"': return '&quot;';
		case "'": return '&#39;';
		case "<": return "&lt;";
		case ">": return "&gt;";
		default: return s;
	}});
};

HotelSuggestItemListLayer.prototype.refresh = function(data){
    
	this.cursor=-1;
	if(this.nodes.length > 0){
		for(var i=0;i<this.nodes.length;i++){
			var node = this.nodes[i];
			node.item= null;
			node.layer = null;
			$jsex.event.clear(node);
		}
	}
	this.nodes.length=0; 
    //为了接口兼容性，将返回结果做 || 或处理
	var items = data.result || data.data;
	var input = data.city;
	var inputReg = new RegExp( "(" + input + ")" , "i" );

	var uio = new UIObject();
	uio.append('<table' , 'suggestList' ,' class="ill" cellspacing="0" cellpadding="0" >');
	for(var i=0;i<items.length;i++){
	    
	    var city = items[i];
   	    var typeCls = "" ; 

		uio.text('<tr class="illrow ' , typeCls , '"' ,
		           '>'); 
		var _w = this.escape( city.p ).replace( inputReg , '<span class="keystring">$1</span>');
		uio.append( '<td ' , i )
           .text(   ' class="illn" data-key="' , city.o , '"' ,
				  ' data-name="', city.c ,'"',
    		      '>',
			      city.t == 0 ? _w : '',
				  city.t == 1 ? _w + '-请选择以下目的地' : '',
			      city.t == 2 ? '·相关目的地:' + _w : '',
    		      '</td>'
    		); 
		
		uio.text('</tr>');
	}
	uio.text('</table>');
	uio.write(this.popup.panel); 
	
	var nodes = this.nodes;
	for(var i=0;i<items.length;i++){
	     
		var node = uio.getDomNode(i);
		node.item= { key : items[i]['c'] , type : items[i]['t']};
		node.layer = this;		
		node.idx=i;
		nodes[i]=node;
		$jsex.event.bind(node,'mouseover',this.mouseover);
		$jsex.event.bind(node,'click',this.click);
	}
	 
	
};

HotelSuggestItemListLayer.prototype.mouseover = function(evt){
	if ( this.item.type == 0 || this.item.type == 2 )
		this.layer.enter(this.idx);
};

HotelSuggestItemListLayer.prototype.click = function(evt){
	if ( this.item.type == 0 || this.item.type == 2 )
		this.layer.select(this.idx, true);
};

HotelSuggestItemListLayer.prototype.select = function(idx,finish){
	$jsex.event.trigger(this,'select',idx, finish);
};

HotelSuggestItemListLayer.prototype.enter = function(idx){
 
	for(var i=0;i<this.nodes.length;i++){
		$jsex.removeClassName( this.nodes[i].parentNode ,'tllover');
	}
	if(idx > -1){
		var itm = this.nodes[idx].item;
		if ( !( itm.type == 0 || itm.type == 2 )  ) {
           idx++;
        } 
		$jsex.addClassName( this.nodes[idx].parentNode ,'tllover');
		this.cursor = idx;
	}
};

HotelSuggestItemListLayer.prototype.moveCursor = function(span,select){
	if(this.nodes.length == 0)
		return;

	if(this.cursor == -1 && span == -1){
		this.cursor = this.nodes.length -1;
	}else{
	    var nextNode = this.nodes[ this.cursor + span ];
	    if ( nextNode ) {
	    	if ( !( nextNode.item.type == 0 || nextNode.item.type == 2 ) ) {
	    		span *= 2;
	    	}
	    }
		
	    this.cursor += span;
		
		if(this.cursor < -1 || this.cursor >= this.nodes.length) {
			this.cursor = -1;
		}
		
	}
	
	this.enter(this.cursor);
	
	if(select)
		this.select(this.cursor);
};