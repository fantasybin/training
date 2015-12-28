function UCarHotCity(){
	/*this.TMPL = [
		'<div class="cityinput" hotcitytype="1"><div class="hint">',
		'<img id="close" class="closeImg" src="http://source.qunar.com/site/images/new_main/Button_Hotcity_Close.gif"/>',
		'<span class="">Top {{citycount}} 热门城市</span><hr/>',
		'<ul>',
		'{{#cityList}}',
		'<li><a class="js_name" data-name="{{name}}" href="javascript:void(0);">{{name}}</a></li>',
		'{{/cityList}}',
		'</ul>',
		'</div></div>'

	].join('');*/



	this.newTMPL = [
		'<div class="hotelhint" style="width:430px">',
			'<img id="close" class="closeImg" src="http://source.qunar.com/site/images/new_main/Hot_close.png">',
			'<div class="b_hct_tit">',
				'直接输入可搜索71360个城市',
			'</div>',
			'<div class="b_hct_nav">',
			'{{#menuList}}',
			'<span class="js_hotcitymenu" data-key="{{key}}" data-tab-id="hc-{{key}}">{{key}}</span>',
			'{{/menuList}}',
			'</div>',
			'<div id="citybox" class="js_citybox">',
			'{{#menuList}}',
			'<div class="b_hct_lst js_hotcity_panel" data-panel-id="hc-{{key}}" style="display: none;"></div>',
			'{{/menuList}}',
			'</div>',
			'<div class="b_hct_tip">更多城市可直接输入搜索</div>',
		'</div>'
	].join('');

	this.cityListTMPL = [
			'{{#cityList}}',
			'<dl class="e_hct_lst">',
				'<dt class="citychar">{{char}}</dt>',
				'<dd class="cityname">',
					'<ul>',
						'{{#list}}',
						'<li key="{{name}}"><a href="#" data-city="{{pinyin}}">{{name}}</a></li>',
						'{{/list}}',
					'</ul>',
				'</dd>',
			'</dl>',
			'{{/cityList}}'
		].join('');
	
	this.el = $('<div class="popPanel" style="display:none;"></div>');
}
UCarHotCity.prototype = $.extend({
    init: function(){
	    this.loadData();
    },
	loadData: function(){
		var self = this;
		$.ajax({
			url: 'hotcity.json',
			type: "GET",
			dataType: "JSON",
			success: function(data){
				if(!data) {
					alert('data is null.');
					return;
				}
				self.render(data);
			}
		})
	},
	render: function(data){
		var hotCityConfig = this.hotCityConfig = data.hotCityConfig;
		var menu = hotCityConfig.domestic;
		var cityList = hotCityConfig.data;
		var menuList = [];
		$.each(menu, function(i,item){
			menuList.push({
				key: item,
				title: cityList[item].title
			})
		});

		var _html = Hogan.compile( this.newTMPL ).render({menuList:menuList});
		this.el.html(_html);
		this.bindEvent();
	},
	bindEvent: function(){
		var self = this;
		this.el.delegate("#close", "click", function(){
			self.close();
		})
		.delegate(".js_name", "click", function(){
				var cityname = $(this).data("name");
				self.owner.setValue(cityname);
				self.close();
			});
		this.el.delegate(".js_hotcitymenu", "click", function(){
			$(this).parent().find(".js_hotcitymenu").removeClass("active");
			$(this).addClass("active");
			var menuKey = $(this).data("key");
			self.appendCity(menuKey);
		});
	},
	appendCity: function(menuKey){
		if(!this.hotCityConfig) return;
		var data = this.hotCityConfig.data[menuKey];
		var cityList = data.cityList;
		var _html = Hogan.compile(this.cityListTMPL).render({cityList:cityList});

		var citypanels = this.el.find(".js_hotcity_panel");
		citypanels.hide();
		var tagpanel = this.el.find("[data-panel-id=hc-"+menuKey+"]");
		tagpanel.html(_html);
		tagpanel.show();
	},
	isOpend: function(){
		return this.el && this.el.css("display") != 'none';
	},
	open: function(){
		this.el.show();
	},
	close: function(){
		this.el.hide();
	}
});