import {dialog} from './dialog';

/**
 * confirm
 * @param {String} msg 要弹出的信息
 * @param {Object} opt 配置信息
 */

export default function confirm(msg, opt = {}) {
    debugger;
    opt = Object.assign({
        type: 'confirm',
        title: '信息提示',
        close: false,
        btns: [
            {
                id: 'layer_continue',
                text: opt.ok_text || '确定',
                callback: opt.confirm_callback || function(){},
                cls: 'btn-ok'
            },
            {
                id: 'layer_cancel',
                text: opt.cancel_text || '取消',
                callback: opt.cancel_callback || function(){},
                cls: 'btn-cancel'
            }
        ]
    }, opt);

    dialog.base(msg, opt);
}
