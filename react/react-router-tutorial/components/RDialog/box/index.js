import {dialog} from '../index';

/**
 * 只弹出一个空盒子
 * @param {String} msg 要弹出的信息
 * @param {Object} opt 配置信息
 * @param {Function} complete 弹出后的回调
 * @param {Number} autoClose 自动关闭，为0时不关闭
 */

export default function box(msg, opt = {}) {
    opt = Object.assign({
        complete: opt.complete,
        autoClose: opt.autoClose
    }, opt)
    dialog.base(msg, {
        type: 'box',
        close: false,
        complete: opt.complete,
        autoClose: opt.autoClose,
        btns: []
    });
}
