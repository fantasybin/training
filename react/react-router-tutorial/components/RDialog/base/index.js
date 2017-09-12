import {lightbox} from '../lightbox/'
import Events from 'lib/Events';

const NOOP = function() {}

// let binded = false;
let _maskCallback;
let _eleCallback;

/**
 * base - 弹窗能用逻辑
 *
 * @param  {type} msg 显示的内容
 * @param  {type} opt 配置
 */

export default function base(msg, opt = {}) {

    if(!msg) {
        return;
    }

    opt = Object.assign({
        type: '',
        complete: NOOP,
        autoClose: 0,
        close: true,
        maskClose: false, // 点击外面遮罩层，是否关闭弹框
        title: '',
        subtit: '',
        note: '',
        btns: [
            {
                text: '确定',
                callback: NOOP,
                id: 'layer_continue',
                cls: 'btn-ok'

            },
            {
                text: '取消',
                callback: NOOP,
                id: 'layer_cancel',
                cls: 'btn-cancel'
            }
        ]
    }, opt);

    let tmp = [];

    tmp.push('<div id="popContentLayer" class="pop-wrap pop-wrap-' + opt.type + '">');
    tmp.push('<div class="cont">');

    if(opt.close) {
        tmp.push('<i class="iconfont ico-close" id="layer_close">&#xf471;</i>')
    }

    if(opt.title) {
        tmp.push('<div class="pop-hd">' + opt.title + '</div>');
    }

    tmp.push('<div class="pop-bd">');

    if(opt.subtit){
        tmp.push('<div class="d-tit">' + opt.subtit + ' </div>');
        tmp.push('<div class="d-info">' + msg + '</div>');
    } else {
        tmp.push('<div class="d-txt">' + msg + '</div>');
    }

    if(opt.btns && opt.btns.length) {
        tmp.push('<div class="d-btn">');

        for(let i = 0; i < opt.btns.length; i++) {
            let btn = opt.btns[i];
            tmp.push('<button id="' + btn.id + '" class="' + btn.cls + '">' + btn.text + '</button>');
        }

        tmp.push('</div>');
    }

    if(opt.note) {
        tmp.push('<div class="d-des">' + opt.note + '</div>');
    }

    tmp.push('</div>');

    tmp.push('</div>');
    tmp.push('</div>');

    lightbox.show(tmp.join(''));

    if(opt.complete) {
        opt.complete.call(null);
    }

    if(opt.autoClose) {
        setTimeout(function() {
            popHide();
        }, opt.autoClose)
    }

    clickBind(function(e, elem, opt) {
        eventDelegate(e, opt);
    }, opt);

}

function clickBind(callback, opt) {

    let target = this;
    let _cb = function(e) {
        if(!e.target) {
            e.target = e.srcElement;
        }
        callback.call(target, e, this, opt);
    }

    if(opt.maskClose) {
        let mask = document.getElementById('g-pops-bg');
        _maskCallback = _cb;
        Events.addEventListener(mask, 'click', _maskCallback);
    }

    // if(!binded) {
        let elem = document.getElementById('g-pops');
        _eleCallback = _cb;
        Events.addEventListener(elem, 'click', _eleCallback);
        // binded = true;
    // }
}

function eventDelegate(e, opt) {
    let parent = e.target;

    if(parent.id === "g-pops-bg") {
        popHide();
        return;
    }

    while (parent != document.getElementById('g-pops')) {

        if(opt.btns && opt.btns.length) {
            for(let i = 0; i < opt.btns.length; i++) {
                let btn = opt.btns[i];

                if(parent.id == btn.id) {
                    popHide();
                    btn.callback && btn.callback();
                    return;
                }
            }

        }

        if(parent.id == 'layer_close' || parent.id == 'layer_cancel') {
            popHide();
            return;
        }

        // if(parent.className == 'g-pops') {
        //     return;
        // }
        parent = parent.parentNode;
    }

    return;
}

function popHide() {
    dialog.lightbox.hide();

    if(_maskCallback) {
        let mask = document.getElementById('g-pops-bg');
        Events.removeEventListener(mask, 'click', _maskCallback);
        _maskCallback = null;
    }

    if(_eleCallback) {
        let elem = document.getElementById('g-pops');
        Events.removeEventListener(elem, 'click', _eleCallback);
        _eleCallback = null;
    }
}
