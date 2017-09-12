
import {dialog} from '../index';

/**
 * alert
 * @param {String} msg 要弹出的信息
 * @param {Object} opt 配置信息
 */

export default function alert(msg, opt = {}) {
    opt = Object.assign({
        ok_text: '确定',
        ok_callback: function() {}
    }, opt);

    dialog.base(msg, {
        type: 'alert',
        title: '信息提示',
        subtit: opt.subtit,
        close: false,
        btns: [
            {
                id: 'layer_continue',
                text: opt.ok_text,
                callback: opt.ok_callback,
                cls: 'btn-ok'
            }
        ]
    });
}
