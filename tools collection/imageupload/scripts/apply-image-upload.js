(function($) {
    jQuery.fn.extend({
        uploadPreview: function(opts) {
            opts = jQuery.extend({
                width: 0,
                height: 0,
                imgDiv: "#imgDiv",
                maxSize:1000,
                imgType: ["gif", "jpeg", "jpg", "bmp", "png"],
                callback: function() { return false; }
            }, opts || {});
            //var _self = this;
            var _this = $(this);
            var imgDiv = $(opts.imgDiv);
            imgDiv.width(opts.width);
            imgDiv.height(opts.height);
             
            var version = 10;
            
            autoScaling = function() {
            	
                if (version == 7 || version == 8  || version == 9) imgDiv.get(0).filters.item("DXImageTransform.Microsoft.AlphaImageLoader").sizingMethod = "image";
                var img_width = imgDiv.width();
                var img_height = imgDiv.height();
                if (img_width > 0 && img_height > 0) {
                    var rate = (opts.width / img_width < opts.height / img_height) ? opts.width / img_width : opts.height / img_height;
                    if (rate <= 1) {
                        if (version == 7 || version == 8  || version == 9) imgDiv.get(0).filters.item("DXImageTransform.Microsoft.AlphaImageLoader").sizingMethod = "scale";
                        imgDiv.width(img_width * rate);
                        imgDiv.height(img_height * rate);
                    } else {
                        imgDiv.width(img_width);
                        imgDiv.height(img_height);
                    }
                    var left = (opts.width - imgDiv.width()) * 0.5;
                    var top = (opts.height - imgDiv.height()) * 0.5;
                    imgDiv.css({ "margin-left": left, "margin-top": top });
                    imgDiv.show();
                }
            },
            
            createImg = function(){
        		imgDiv.html('');
        		
        		var img = $("<img />");
        		img.width(opts.width);
        		img.height(opts.height);
                imgDiv.replaceWith(img);
                imgDiv = img;
            },
   
            _this.change(function() {
            	
                if (this.value) {
                    $("#validateCompanyQuality").html("");
                    if (!RegExp("\.(" + opts.imgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                        $("#validateCompanyQuality").html("<span class=\"field-validation-error\">image must is" + opts.imgType.join("，") + "</span>");
                        this.value = "";
                        return false;
                    }
                    imgDiv.hide();
                    if ($.browser.msie && version <= 10) {
                    	
                        if (version == 6) {
                        	
                            var image = new Image();
                            image.onload = function(){
                                if( (image.fileSize/1024) > opts.maxSize) {
                                    $("#validateCompanyQuality").html('<span class=\"field-validation-error\">image limit' + opts.maxSize + 'K</span>');
                                    imgDiv.show();
                                	return false;
                                }
                            }
                            image.src = 'file:///' + this.value;

                            createImg();
                            imgDiv.attr('src', image.src);
                            autoScaling();
                        }  else {
                        	
                        	this.select();
                        	var img = document.selection.createRange().text;
                            var image = new Image();
                            image.onload = function(){
                                if( (image.fileSize/1024) > opts.maxSize) {
                                    $("#validateCompanyQuality").html('<span class=\"field-validation-error\">image limit' + opts.maxSize + 'K</span>');
                                    imgDiv.show();
                                	return false;
                                }
                            }
                            image.src = img;                        	
                            
                        	imgDiv.html('');                        	
                            imgDiv.css({ filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image)" });
                            imgDiv.get(0).filters.item("DXImageTransform.Microsoft.AlphaImageLoader").sizingMethod = "image";                           
                            
                            try {
                                imgDiv.get(0).filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = img;
                            } catch (e) {
                                $("#validateCompanyQuality").html("<span class=\"field-validation-error\">image is invalid！</span>");
                                imgDiv.show();
                                return;
                            }                            
                            
                            setTimeout("autoScaling()", 100);                            
                        }
                    }
                    else {
                    	try{   
                    		var file = null;
                    		var size = 0;
                    		if(this.files && this.files[0] ){
                    			file = this.files[0]; 
                    			size = file.size;
                    		}else if(this.files && this.files.item(0)) {                    			
                    			file = this.files.item(0);   
                    			size = file.fileSize;
                    	    } 
 
                    		if((size/1024) > opts.maxSize){
                    		    $("#validateCompanyQuality").html('<span class=\"field-validation-error\">image limit' + opts.maxSize + 'K</span>');
                    		    imgDiv.show();
                            	return false;
                			}
                			
                			createImg();
                    		
                    		//Firefox input[file].value 
                    		try{
                    			//Firefox7.0 down                    			
                    			imgDiv.attr('src', file.getAsDataURL());
                    		}catch(e){
                    			//Firefox8.0 up               			
                    			imgDiv.attr('src', window.URL.createObjectURL(file));
                    		}
                    		
	                        imgDiv.css({ "vertical-align": "middle" });
	                        setTimeout("autoScaling()", 100);
                    	}catch(e){                    		
                    		//support html5
                    		if (this.files && this.files[0]) {                    		
                    			if((this.files[0].size/1024) > opts.maxSize){
                    			    $("#validateCompanyQuality").html('<span class=\"field-validation-error\">image limit' + opts.maxSize + 'K</span>');
                    			    imgDiv.show();
                                	return false;
                    			}
                    			
                    	        var reader = new FileReader(); 
                    	        reader.onload = function (e) {                      	        	
                    	        	imgDiv.attr('src', e.target.result);  
                    	        };
                    	        reader.readAsDataURL(this.files[0]); 
                    	        setTimeout("autoScaling()", 100);
                    	    }  
                    	}
                    }
                }
            });
        }
    });
})(jQuery);