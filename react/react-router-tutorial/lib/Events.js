export default {

    addEventListener: function(elem, name, handler) {
        if(elem.addEventListener) {
            elem.addEventListener(name, handler, false);
        } else if(elem.attachEvent) {
            elem.attachEvent(`on${name}`, handler);
        }
    },

    removeEventListener: function(elem, name, handler) {
        if(elem.removeEventListener) {
            elem.removeEventListener(name, handler, false);
        } else if(elem.detachEvent) {
            elem.detachEvent(`on${name}`, handler);
        }
    }
}
