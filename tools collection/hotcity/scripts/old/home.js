var cityBox
cityBox = this.toCity = new XCombox(form.toCity, {
		button : {
			mousedown: function(evt){
				this.openMainMenu();
				$jsex.stopEvent(evt);
			}
		},
		input: {
			click: function(evt){
				// 20121206 --改变搜索框交互方式（点击输入框时出现热门搜索）
				var sug = this.popups.get('suggest');
				if(sug && sug.isOpend()){
				}
				else{
					this.openMainMenu();
				}
				$jsex.stopEvent(evt);
			},
			change: function(value,old,selected){
				var value = $jsex.trim( value.replace(/["\\]*/g,"") );
				if(!selected){
					this.vidx = -1;
					this.inputold = value;
					if(value){
						var sug = this.popups.get('suggest');
						sug && sug.layer && (sug.layer.cursor = -1);
						citySuggRequest.cancel();
						if(this.cache[value])
							this.suggLoaded(this.cache[value]);
						else{
							citySuggRequest.send(SuggestLayer.getURL(value));
						}
					}else
						this.popups.close();
				}else{
					/*
					if(qBox.city != value){
						qBox.setValue('');
						qBox.setTip();
					}
					*/
					$jsex.event.trigger(control, "cityfinished",this.getValue());
				}
			},
			keypress : function(evt) {
				this.keypress(evt,evt.keyCode);
			}
		},
		focus: function(){
			this.inputEl.select();
		},
		blur: function(){
			if(this.vidx == -1){
				var sug = this.popups.get('suggest');
				if(sug && sug.layer && (sug.layer.cursor > -1)){
					this.setValue(sug.layer.nodes[sug.layer.cursor].item.key);
					trackCityBox( sug.layer.nodes[sug.layer.cursor].item.key , "1");
				}
			}

			/*
			if(qBox.city != this.getValue()){
				qBox.setValue('');
				qBox.setTip();
			}
			*/
		},
		popups: {
			main : {
				initialize: function() {
					var cityList = hotCityConfig.list;
					var uio = new UIObject()
					.text('<div class="cityinput" hotcitytype="1"><div class="hint">')
					.append('<img','close',' class="closeImg" src="http://source.qunar.com/site/images/new_main/Button_Hotcity_Close.gif"/>')
					.text(	'<span class="">Top ',cityList.length,'热门城市</span>',
							'<hr/><ul>');
					for(var i=0;i<cityList.length;i++) {
						uio.text('<li>');
						uio.append('<a ' ,i).text(' href="javascript:void(0);">',cityList[i],'</a></li>');
					}

					uio.text('<div class="clear"></div>',
							'</ul>',
							'</div></div>');
					uio.write(this.panel);
					var own = this.own;
					for(var i=0;i<cityList.length;i++) {
						var node = uio.getDomNode(i);
						$jsex.event.bind(node, 'click', function(evt) {
                            $jsex.stopEvent(evt);
							own.setValue($jsex.trim(this.innerHTML));
							own.vidx = null;
							trackCityBox( own.getValue() , "1&hot=1");
							own.setInfo('');
							own.popups.close();
						});
					}
					$jsex.event.bind(uio.getDomNode('close'), 'click', function() {
						own.popups.close();
					});
				}
			},suggest : {
				initialize: function(){
					this.layer = new SuggestLayer(this,{
						select: function(idx,finish){
							if(idx > -1)
								finish? this.popup.own.setValue(this.nodes[idx].item.key) : this.popup.own.volateValue(this.nodes[idx].item.key);
							else
								finish? this.popup.own.initValue(this.popup.own.inputold) : this.popup.own.volateValue(this.popup.own.inputold);
							this.popup.own.vidx = idx;
							if(finish)
								this.popup.close();
							if(finish && idx>-1){
								trackCityBox( cityBox.getValue() , "1");
							}
						}
					});
				}
			}
		},
		attrs: {
			suggRequest : new ScriptRequest({
				oncomplete: function(data) {
					
					cityBox.dataLoaded(data);
				},
				callbackName:"callback"
			}),

			invalid : function() {
				return $jsex.hasClassName(this.infoPanel, 'errtext');
			},
			cache: {},
			suggLoaded : function(data){
				if(data)
					this.cache[data.userInput] = data;

				if(!data || !data.result || !data.result.length  ){
					var suggest = this.popups.open('suggest');
					if( suggest.layer.error ){
						suggest.layer.error();
					}else{
						this.setInfo('暂未收录','errtext');
						this.popups.close();
					}
					trackCityBox( data.userInput , "0");
					return;
				}
				this.setInfo('');
				data.q = data.userInput;
				var suggest = this.popups.open('suggest');
				suggest.layer.refresh(data);
				suggest.layer.enter(0);
			},
			keypress : function(evt,keyCode) {

				var sug = this.popups.get('suggest');
				if(!sug || !sug.isOpend())
					return ;

				switch (keyCode) {
					case 40://arrow down
						sug.layer.moveCursor(1,true);
						break;
					case 38://arrow up
						sug.layer.moveCursor(-1,true);
						break;
					case 13://enter
						$jsex.stopEvent(evt);
						sug.layer.select(sug.layer.cursor,true);
						sug.close();
						qBox.focusin();
						break;
					default:
				}
			}
		}
	});
