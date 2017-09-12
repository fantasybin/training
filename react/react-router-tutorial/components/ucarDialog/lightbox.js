/*
 *  lightbox
 *  usage:
 *  lightbox.show(text , callback)
 */
import Events from '../../lib/Events';
 
export const lightbox = {
    overlay: null,
    content: null,
    a: {
        display: "none",
        left: "0"
    }, // content hide
    b: {
        display: "none"
    }, // overlay hide
    c: {
        display: "block",
        left: "50%"
    }, // content show
    d: {
        display: "block"
    }, // overlay show
    binded: false,
    toBind: () => {lightbox.show(null, 1)},
    gid: 1,
    _place: function (arg) {
        // 1 overlay 2 content
        //  calculate width & height
        let de = (document.compatMode && document.compatMode.toLowerCase() == "css1compat") ? document.documentElement :
            document.body;
 
        if (arg & 2) {
            //alert(de.clientHeight + "|" + this.content.offsetHeight + "|" + window.pageYOffset);
            let top = (de.clientHeight - this.content.offsetHeight) / 2;
            let left = Math.floor(this.content.offsetWidth / 2);
 
            let style = Object.assign({}, this.c, {
                top: ((top > 0 ? top : 0) + (window.pageYOffset || de.scrollTop)) + "px",
                marginLeft: 0 - left + "px"
            });
            for (let key in style) {
                lightbox.content.style[key] = style[key]
            }
        }
 
        if (arg & 1) {
 
            let style = Object.assign({}, this.d, {
                height: Math.max(de.scrollHeight, de.clientHeight) + "px",
                width: Math.max(de.scrollWidth, de.clientWidth) + "px"
            });
            for (let key in style) {
                lightbox.overlay.style[key] = style[key]
            }
        }
    },
    show: function (text, args) {
        // initialize overlay & content
        if (!this.overlay) {
            this.overlay = document.body.appendChild(document.createElement("div"));
            this.content = document.body.appendChild(document.createElement("div"));
            this.overlay.id = "g-pops-bg";
            this.overlay.className = "g-pops-bg";
            this.content.id = "g-pops";
            this.content.className = "g-pops";
        }

       // set inner
        if (text) {
            this.content.innerHTML = text;
        }
        // set event
        if (!this.binded) {
            this.binded = true;
            Events.addEventListener(window, "resize", this.toBind);
        }
 
        this.content.style.visibility = "hidden";
        this.content.style.display = "block";
 
        this._place(args == null ? 3 : args);
 
        //display
        this.content.style.visibility = "visible";
        let self = this;
        //修复ie8一下包括ie8弹框不出现的bug
        if (args == null) {
            setTimeout(function () {
 
                for (let key in self.c) {
                    self.content.style[key] = self.c[key];
                }
                for (let key in self.d) {
                    self.overlay.style[key] = self.d[key];
                }
            }, 50)
        }
 
    },
    hide: function () {
        this.content.innerHTML = '';
        // renew style
        for (let name in this.a)
            this.content.style[name] = this.a[name];
        for (let name in this.b)
            this.overlay.style[name] = this.b[name];

        Events.removeEventListener(window, "resize", this.toBind);
        this.binded = false;
    }
}
