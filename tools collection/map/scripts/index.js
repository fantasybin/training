(function(win, $){
    var map;
    var MapManager = {
        loadMap: function(fn) {
            var name = '__baiducallback';
            window[name] = fn;
            var url ='http://api.map.baidu.com/api?v=2.0&ak=vtmpLccy3rvgANP6wzWNTDGee9N5EzeH&callback=' + name;
            var port = document.createElement("script");
            port.async=true;
            port.type = "text/javascript";
            port.src = url;
            document.getElementsByTagName("head")[0].appendChild(port);
            return port;
        }
    };

    var throttle = function (fn, wait) {
            var ctx;
            var args;
            var rtn;
            var timeoutID;
            var last = 0;
            var call = function () {
                timeoutID = null;
                last = +new Date();
                rtn = fn.apply(ctx, args);
                ctx = null;
                args = null;
            };
            return function () {
                ctx = this;
                args = arguments;
                var delta = new Date() - last;
                if (!timeoutID) {
                    if (delta >= wait) {
                        call();
                    } else {
                        timeoutID = setTimeout(call, wait - delta);
                    }
                }
                return rtn;
            };
        }

    function G(id) {
        return document.getElementById(id);
    }

    var mapSearch = {
        autoCompleteInit: function() {
            window.map = map = new BMap.Map('mapContainer');
            map.centerAndZoom("天津", 12);
            map.enableScrollWheelZoom();
            //this.getAddress(lng, lat);

            function setAutocomplete() {
                var auto = new BMap.Autocomplete({
                    input: 'inputkey',
                    location: map
                });

                auto.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
                    var str = "";
                    var _value = e.fromitem.value;
                    var value = "";
                    if (e.fromitem.index > -1) {
                        value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                    }
                    str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
                    
                    value = "";
                    if (e.toitem.index > -1) {
                        _value = e.toitem.value;
                        value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                    }
                    str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
                    G("mapsugg").innerHTML = str;
                });

                var myValue;
                auto.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
                    var _value = e.item.value;
                    myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                    G("mapsugg").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
                    
                    setPlace();
                });

                function setPlace(){
                    map.clearOverlays();    //清除地图上所有覆盖物
                    function myFun(){
                        var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                        map.centerAndZoom(pp, 18);
                        map.addOverlay(new BMap.Marker(pp));    //添加标注
                    }
                    var local = new BMap.LocalSearch(map, { //智能搜索
                      onSearchComplete: myFun
                    });
                    local.search(myValue);
                }
            }
            setAutocomplete();
        },
        search: function(key) {

        },
        getPoint: function (key) {
            var map = new BMap.Map("l-map");      
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);      
            // 创建地址解析器实例     
            var myGeo = new BMap.Geocoder();      
            // 将地址解析结果显示在地图上，并调整地图视野    
            myGeo.getPoint("北京市海淀区上地10街10号", function(point){      
                      if (point) {      
                          map.centerAndZoom(point, 16);      
                          map.addOverlay(new BMap.Marker(point));      
                      }      
                  }, "北京市");
        },
        getLocation: function(lng, lat) {
            var map = new BMap.Map("l-map");      
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);      
            // 创建地理编码实例      
            var myGeo = new BMap.Geocoder();      
            // 根据坐标得到地址描述    
            myGeo.getLocation(new BMap.Point(116.364, 39.993), function(result){      
                             if (result){      
                                 alert(result.address);      
                              }      
            });
        },
        drivingRoute: function () {
            var map = new BMap.Map("mapContainer");    
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);    
            var driving = new BMap.DrivingRoute(map, {    
             renderOptions: {
               map   : map,
               panel : "mapsugg",
               autoViewport: true    
             }
            });
            driving.search("中关村", "天安门");
        },

        localSearch: function(key) {
            window.map = map = new BMap.Map("mapContainer");
            map.centerAndZoom(new BMap.Point(117.399212, 39.165676), 12);

            var options = {
                onSearchComplete: function(results){
                    // 判断状态是否正确
                    if (local.getStatus() == BMAP_STATUS_SUCCESS){
                        console.info(results);
                        var s = ['<dl>'];
                        for (var i = 0; i < results.getCurrentNumPois(); i ++){
                            s.push('<dd style="margin:5px;">' + results.getPoi(i).title + ", " + results.getPoi(i).address + '</dd>');
                        }
                        s.push('</dl>');
                        document.getElementById("mapsugg").innerHTML = s.join("");
                    }
                }
                //,renderOptions: {map: map, panel: "mapsugg"} 
            };
            var local = new BMap.LocalSearch(new BMap.Point(117.399212, 39.165676), options);

            $('#inputkey').keyup(throttle(function () {
                var _val = $("#inputkey").val();
                local.search(_val);
            }, 500));

            //local.search("公园");
        },

        getAddress: function(lng, lat, fn) {

        }
    };

    
    //MapManager.loadMap(mapSearch.autoCompleteInit);
    //MapManager.loadMap(mapSearch.localSearch);
    MapManager.loadMap(mapSearch.drivingRoute);

/*
baidu
lat:39.165676
lng:117.399212

gaode
lat:39.1599
lng":117.393177
*/
})(window, jQuery);