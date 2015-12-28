var HotelLang = {
	hotCityConfig : {
		list:["丽江", "三亚", "大理", "束河", "阳朔", "西塘", "鼓浪屿", "凤凰", "黄山", "平遥", "张家界", "乌镇", "婺源", "泰山", "周庄" ,"曾厝垵", "泸沽湖", "宏村", "香格里拉", "和顺镇"],
		number:6113
	},
	_CAPTIAL:'丽江'
};

CityLib = {
	hotCityConfig:{
		menu:["热门城市","ABCDE","FGHJ","KLMNP","QRSTW","XYZ"],
		list:{
			热门城市:{
				title:"热门城市",
				cityList:[
					{"char":" ",
						"list":[
							{"cityurl":"beijing_city","name":"北京"},
							{"cityurl":"shanghai_city","name":"上海"},
							{"cityurl":"guangzhou","name":"广州"},
							{"cityurl":"shenzhen","name":"深圳"},
							{"cityurl":"qingdao","name":"青岛"},
							{"cityurl":"dalian","name":"大连"},
							{"cityurl":"hangzhou","name":"杭州"},
							{"cityurl":"nanjing","name":"南京"},
							{"cityurl":"chengdu","name":"成都"},
							{"cityurl":"wuhan","name":"武汉"},{"cityurl":"chongqing_city","name":"重庆"},{"cityurl":"sanya","name":"三亚"},
							{"cityurl":"xiamen","name":"厦门"},{"cityurl":"hongkong_city","name":"香港"},{"cityurl":"macao_city","name":"澳门"}
						]
					}
				],
				"charSort":true
			},
			"ABCDE":{
				title:"ABCDE",
				"cityList":[
					{"char":"A",
						"list":[
							{"cityurl":"aba","name":"阿坝"},
							{"cityurl":"anshan","name":"鞍山"},{"cityurl":"anqing","name":"安庆"},{"cityurl":"anshun","name":"安顺"},
							{"cityurl":"anyang","name":"安阳"},{"cityurl":"ankang","name":"安康"},{"cityurl":"akesu","name":"阿克苏"},
							{"cityurl":"aletai","name":"阿勒泰"}]},{"char":"B","list":[{"cityurl":"beijing_city","name":"北京"},{"cityurl":"beihai","name":"北海"},
							{"cityurl":"baoding","name":"保定"},{"cityurl":"baoshan","name":"保山"},{"cityurl":"baoji","name":"宝鸡"},{"cityurl":"baishan","name":"白山"},
							{"cityurl":"baotou","name":"包头"},{"cityurl":"baoting","name":"保亭"},{"cityurl":"bangbu","name":"蚌埠"},
							{"cityurl":"binzhou","name":"滨州"}
						]
					},
					{"char":"C",
						"list":[
							{"cityurl":"chengdu","name":"成都"},{"cityurl":"chongqing_city","name":"重庆"},{"cityurl":"changsha","name":"长沙"},
							{"cityurl":"changzhou","name":"常州"},{"cityurl":"changchun","name":"长春"},{"cityurl":"changde","name":"常德"},
							{"cityurl":"chizhou","name":"池州"},{"cityurl":"chenzhou","name":"郴州"},{"cityurl":"chaozhou","name":"潮州"},
							{"cityurl":"cangzhou","name":"沧州"}]},{"char":"D","list":[{"cityurl":"dalian","name":"大连"},{"cityurl":"dali","name":"大理"},
							{"cityurl":"dandong","name":"丹东"},{"cityurl":"dongguan","name":"东莞"},{"cityurl":"datong","name":"大同"},{"cityurl":"diqing","name":"迪庆"},
							{"cityurl":"dezhou","name":"德州"},{"cityurl":"dongying","name":"东营"},{"cityurl":"deyang","name":"德阳"},{"cityurl":"daqing","name":"大庆"}
						]
					},
					{"char":"E","list":[{"cityurl":"eerduosi","name":"鄂尔多斯"},{"cityurl":"enshi","name":"恩施自治州"},{"cityurl":"ezhou","name":"鄂州"},{"cityurl":"emeishan","name":"峨眉山市"}]}],"charSort":true},
			"FGHJ":{
				"title":"FGHJ","cityList":[{"char":"F","list":[{"cityurl":"fuzhou_fujian","name":"福州"},{"cityurl":"foshan","name":"佛山"},{"cityurl":"fangchenggang","name":"防城港"},{"cityurl":"fushun","name":"抚顺"},{"cityurl":"fuyang_anhui","name":"阜阳"},{"cityurl":"fuxin","name":"阜新"},{"cityurl":"fuzhou_jiangxi","name":"抚州"},{"cityurl":"fenghuang","name":"凤凰县"}]},{"char":"G","list":[{"cityurl":"guangzhou","name":"广州"},{"cityurl":"guilin","name":"桂林"},{"cityurl":"guiyang","name":"贵阳"},{"cityurl":"ganzi","name":"甘孜"},{"cityurl":"ganzhou","name":"赣州"},{"cityurl":"guangyuan","name":"广元"},{"cityurl":"guigang","name":"贵港"},{"cityurl":"guangan","name":"广安"},{"cityurl":"gannan","name":"甘南"},{"cityurl":"guyuan","name":"固原"}]},{"char":"H","list":[{"cityurl":"hangzhou","name":"杭州"},{"cityurl":"huangshan","name":"黄山"},{"cityurl":"huizhou_guangdong","name":"惠州"},{"cityurl":"haerbin","name":"哈尔滨"},{"cityurl":"hefei","name":"合肥"},{"cityurl":"haikou","name":"海口"},{"cityurl":"huzhou","name":"湖州"},{"cityurl":"huhehaote","name":"呼和浩特"},{"cityurl":"hengyang","name":"衡阳"},{"cityurl":"huludao","name":"葫芦岛"}]},{"char":"J","list":[{"cityurl":"jiaxing","name":"嘉兴"},{"cityurl":"jinan","name":"济南"},{"cityurl":"jinzhong","name":"晋中"},{"cityurl":"jinhua","name":"金华"},{"cityurl":"jiujiang","name":"九江"},{"cityurl":"jiangmen","name":"江门"},{"cityurl":"jiaozuo","name":"焦作"},{"cityurl":"jining","name":"济宁"},{"cityurl":"jiuquan","name":"酒泉"},{"cityurl":"jinzhou","name":"锦州"},{"cityurl":"jingdezhen","name":"景德镇"},{"cityurl":"jilin_city","name":"吉林"},{"cityurl":"jian","name":"吉安"},{"cityurl":"jiuzhaigou","name":"九寨沟县"}]}],"charSort":true},
			"KLMNP":{
				"title":"KLMNP","cityList":[{"char":"K","list":[{"cityurl":"kunming","name":"昆明"},{"cityurl":"kaifeng","name":"开封"},{"cityurl":"kashi","name":"喀什"},{"cityurl":"kelamayi","name":"克拉玛依"}]},{"char":"L","list":[{"cityurl":"lijiang","name":"丽江"},{"cityurl":"luoyang","name":"洛阳"},{"cityurl":"leshan","name":"乐山"},{"cityurl":"lasa","name":"拉萨"},{"cityurl":"lanzhou","name":"兰州"},{"cityurl":"liangshan","name":"凉山"},{"cityurl":"langfang","name":"廊坊"},{"cityurl":"lianyungang","name":"连云港"},{"cityurl":"liuzhou","name":"柳州"},{"cityurl":"linyi","name":"临沂"}]},{"char":"M","list":[{"cityurl":"mianyang","name":"绵阳"},{"cityurl":"maoming","name":"茂名"},{"cityurl":"meizhou","name":"梅州"},{"cityurl":"meishan","name":"眉山"},{"cityurl":"mudanjiang","name":"牡丹江"},{"cityurl":"maanshan","name":"马鞍山"}]},{"char":"N","list":[{"cityurl":"nanjing","name":"南京"},{"cityurl":"ningbo","name":"宁波"},{"cityurl":"nanning","name":"南宁"},{"cityurl":"nanchang","name":"南昌"},{"cityurl":"nanping","name":"南平"},{"cityurl":"nanchong","name":"南充"},{"cityurl":"nantong","name":"南通"},{"cityurl":"ningde","name":"宁德"},{"cityurl":"nanyang","name":"南阳"},{"cityurl":"neijiang","name":"内江"}]},{"char":"P","list":[{"cityurl":"putian","name":"莆田"},{"cityurl":"pingxiang","name":"萍乡"},{"cityurl":"panjin","name":"盘锦"},{"cityurl":"panzhihua","name":"攀枝花"},{"cityurl":"pingliang","name":"平凉"},{"cityurl":"pingdingshan","name":"平顶山"},{"cityurl":"puyang","name":"濮阳"},{"cityurl":"puer","name":"普洱"}]}],"charSort":true},
			"QRSTW":{
				"title":"QRSTW","cityList":[{"char":"Q","list":[{"cityurl":"qingdao","name":"青岛"},{"cityurl":"qinhuangdao","name":"秦皇岛"},{"cityurl":"qiandongnan","name":"黔东南"},{"cityurl":"quanzhou","name":"泉州"},{"cityurl":"qingyuan","name":"清远"},{"cityurl":"qionghai","name":"琼海"},{"cityurl":"qiannan","name":"黔南"},{"cityurl":"qiqihaer","name":"齐齐哈尔"},{"cityurl":"quzhou","name":"衢州"},{"cityurl":"qinzhou","name":"钦州"}]},{"char":"R","list":[{"cityurl":"rizhao","name":"日照"},{"cityurl":"rikaze","name":"日喀则"}]},{"char":"S","list":[{"cityurl":"shanghai_city","name":"上海"},{"cityurl":"sanya","name":"三亚"},{"cityurl":"shenzhen","name":"深圳"},{"cityurl":"suzhou_jiangsu","name":"苏州"},{"cityurl":"shenyang","name":"沈阳"},{"cityurl":"shijiazhuang","name":"石家庄"},{"cityurl":"shaoxing","name":"绍兴"},{"cityurl":"shaoguan","name":"韶关"},{"cityurl":"shangrao","name":"上饶"},{"cityurl":"shantou","name":"汕头"},{"cityurl":"shiyan","name":"十堰"}]},{"char":"T","list":[{"cityurl":"tianjin_city","name":"天津"},{"cityurl":"taiyuan","name":"太原"},{"cityurl":"taian","name":"泰安"},{"cityurl":"tangshan","name":"唐山"},{"cityurl":"taizhou_zhejiang","name":"台州"},{"cityurl":"taizhou_jiangsu","name":"泰州"},{"cityurl":"tianshui","name":"天水"},{"cityurl":"tongren","name":"铜仁"}]},{"char":"W","list":[{"cityurl":"wuhan","name":"武汉"},{"cityurl":"wuxi","name":"无锡"},{"cityurl":"wulumuqi","name":"乌鲁木齐"},{"cityurl":"wenzhou","name":"温州"},{"cityurl":"weihai","name":"威海"},{"cityurl":"wuhu","name":"芜湖"},{"cityurl":"weifang","name":"潍坊"},{"cityurl":"weinan","name":"渭南"},{"cityurl":"wanning","name":"万宁"},{"cityurl":"wenchang","name":"文昌"},{"cityurl":"wuzhou","name":"梧州"},{"cityurl":"wuyishan","name":"武夷山市"}]}],"charSort":true},
			"XYZ":{
				"title":"XYZ","cityList":[{"char":"X","list":[{"cityurl":"xiamen","name":"厦门"},{"cityurl":"xian","name":"西安"},{"cityurl":"xiangxi","name":"湘西"},{"cityurl":"xuzhou","name":"徐州"},{"cityurl":"xining","name":"西宁"},{"cityurl":"xishuangbanna","name":"西双版纳"},{"cityurl":"xianyang","name":"咸阳"},{"cityurl":"xinzhou","name":"忻州"},{"cityurl":"xinxiang","name":"新乡"},{"cityurl":"xuancheng","name":"宣城"},{"cityurl":"xianning","name":"咸宁"},{"cityurl":"xiangfan","name":"襄樊"}]},{"char":"Y","list":[{"cityurl":"yangzhou","name":"扬州"},{"cityurl":"yantai","name":"烟台"},{"cityurl":"yichang","name":"宜昌"},{"cityurl":"yangjiang","name":"阳江"},{"cityurl":"yinchuan","name":"银川"},{"cityurl":"yaan","name":"雅安"},{"cityurl":"yibin","name":"宜宾"},{"cityurl":"yanbian","name":"延边"},{"cityurl":"yingkou","name":"营口"},{"cityurl":"yueyang","name":"岳阳"},{"cityurl":"yuxi","name":"玉溪"},{"cityurl":"yancheng","name":"盐城"},{"cityurl":"yanan","name":"延安"},{"cityurl":"yichun_jiangxi","name":"宜春"},{"cityurl":"yuncheng","name":"运城"}]},{"char":"Z","list":[{"cityurl":"zhuhai","name":"珠海"},{"cityurl":"zhengzhou","name":"郑州"},{"cityurl":"zhoushan","name":"舟山"},{"cityurl":"zhangjiajie","name":"张家界"},{"cityurl":"zhaoqing","name":"肇庆"},{"cityurl":"zhenjiang","name":"镇江"},{"cityurl":"zhangzhou","name":"漳州"},{"cityurl":"zhongshan","name":"中山"},{"cityurl":"zhanjiang","name":"湛江"},{"cityurl":"zaozhuang","name":"枣庄"},{"cityurl":"zhuzhou","name":"株洲"},{"cityurl":"zibo","name":"淄博"},{"cityurl":"zunyi","name":"遵义"},{"cityurl":"zigong","name":"自贡"},{"cityurl":"zhangjiakou","name":"张家口"}]}],"charSort":true}}}
};