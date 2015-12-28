/**
 * Created by JetBrains PhpStorm.
 * User: 20141022
 * Date: 15-7-1
 * Time: 下午5:16
 * To change this template use File | Settings | File Templates.
 */
function UCarSuggest() {
	this.suggestTMPL = ['<table id="suggestList" class="ill" cellspacing="0" cellpadding="0">',
		'<tbody>',
		'{{#cityList}}',
		'<tr class="illrow">',
		'<td class="illn" data-idx={{idx}} data-name="{{name}}">',
		'<div class="illn illnt"><span class="keystring">{{inputname}}</span>{{extendname}}</div>',
		'</td>',
		'</tr>',
		'{{/cityList}}',
		'</tbody>',
		'</table>'].join('');
	this.errorEl = $('<table id="suggestList" class="ill" cellspacing="0" cellpadding="0" ><tr class="illrow errow"><td>对不起，不支持该目的地。</td></tr></table>');
	this.el = $('<div class="popPanel" style="display:none;"></div>');
	this.cache = {};
	this.cursor = -1;
	this.nodes = [];
}

$.extend(UCarSuggest.prototype, {
	init: function() {
		var self = this;
		this.citySuggRequest = new ScriptRequest({
			oncomplete: function(data) {
				if (!data.userInput && data.city)
					data.userInput = data.city;
				self.suggLoaded(data);
			},
			callbackName:"callback"
		});
	},
	isOpend: function() {
		return this.el && this.el.css("display") != 'none';
	},
	getURL: function(val) {
		return "http://hs.qunar.com/api/inn/new/city/typeahead?city=" + encodeURIComponent(val.replace(/[!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]/g, ''))
	},
	send: function(url) {
		this.citySuggRequest.send(url);
		/*$.ajax({
		 url: url,
		 dataType: "jsonp",
		 type: 'GET',
		 success: function(data){
		 console.info(data);
		 }
		 });*/
		/*$.getJSON( url + '&callback=?', function(data){
		 console.info(data);
		 });*/

	},
	suggLoaded : function(data) {
		if (data)
			this.cache[data.userInput] = data;

		if (!data || !data.data || !data.data.length) {
			if (this.error) {
				this.error();
			} else {
				this.owner.setInfo('未找到', 'errtext');
				this.close();
			}
			return;
		}
		this.owner.setInfo('');
		data.q = data.userInput;
		this.refresh(data);
		this.open();
		//this.select(0);
	},
	refresh: function(data) {
		this.cursor = -1;
		var items = data.result || data.data;
		var inputkey = data.city;
		var inputReg = new RegExp("(" + inputkey + ")", "i");
		var searchCitys = [];
		for (var i = 0, len = items.length; i < len; i++) {
			var item = items[i];
			var _exname = this.escape(item.p).replace(inputkey, '');
			searchCitys.push({
				idx: i,
				name: item.c,
				inputname: inputkey,
				extendname: _exname
			});
		}
		var _html = Hogan.compile(this.suggestTMPL).render({cityList: searchCitys});

		this.el.html(_html);
		this.bindEvent(data);
	},
	bindEvent: function(data) {
		var self = this;
		this.el.delegate("td", "mouseover", function() {
			var inx = $(this).data("idx");
			self.mouseover(inx);
		}).delegate("td", "click", function() {
				var inx = $(this).data("idx");
				self.select(inx, true);
			});
	},
	error : function() {
		this.el.empty().append(this.errorEl);
	},
	mouseover: function(inx) {
		var items = this.el.find("tr");
		items.removeClass("tllover");
		$(items[inx]).addClass("tllover");
		this.cursor = inx;
	},

	select: function(idx, finish) {
		var items = this.el.find("td");
		var val = $(items[idx]).data("name");
		if (idx > -1)
			finish ? this.owner.setValue(val) : this.owner.volateValue(val);
		else
			finish ? this.owner.initValue(this.own.inputold) : this.owner.volateValue(this.own.inputold);
		this.owner.vidx = idx;
		if (finish) {
			this.close();
		}
	},
	moveCursor: function(span, select) {
		var items = this.el.find("td");
		if (items.length == 0) {
			return;
		}

		if (this.cursor == -1 && span == -1) {
			this.cursor = items.length - 1;
		} else {
			var nextItem = items[ this.cursor + span ];
			this.cursor += span;

			if (this.cursor < -1 || this.cursor >= items.length) {
				this.cursor = -1;
			}
		}
		this.mouseover(this.cursor);
		if (select) {
			this.select(this.cursor);
		}
	},
	escape : function(s) {
		s = String(s === null ? "" : s);
		return s.replace(/&(?!\w+;)|["'<>\\]/g, function(s) {
			switch (s) {
				case "&":
					return "&amp;";
				case "\\":
					return "\\\\";
				case '"':
					return '&quot;';
				case "'":
					return '&#39;';
				case "<":
					return "&lt;";
				case ">":
					return "&gt;";
				default:
					return s;
			}
		});
	},
	open: function() {
		if (this.owner) {
			this.owner.popupsClose();
		}
		this.el.show();
	},
	close: function() {
		this.el.hide();
	}

});



