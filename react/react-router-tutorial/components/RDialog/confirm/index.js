import {dialog} from '../index';

/**
 * confirm
 * @param {String} msg 要弹出的信息
 * @param {Object} opt 配置信息
 */

export default function confirm(msg, opt = {}) {
    opt = Object.assign({
        ok_text: '确定',
        ok_callback: function() {},
        cancel_text: '取消',
        cancel_callback: function() {}
    }, opt);

    dialog.base(msg, {
        type: 'confirm',
        title: '信息提示',
        close: false,
        btns: [
            {
                id: 'layer_continue',
                text: opt.ok_text,
                callback: opt.ok_callback,
                cls: 'btn-ok'
            },
            {
                id: 'layer_cancel',
                text: opt.cancel_text,
                callback: opt.cancel_callback,
                cls: 'btn-cancel'
            }
        ]
    });
}
