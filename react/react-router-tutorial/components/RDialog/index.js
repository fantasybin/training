
/**
 * @author hailong.zhou <hailong.zhou@qunar.com>
 */
import base from './base/';
import box from './box/';
import alert from './alert/';
import confirm from './confirm/';
import {lightbox} from './lightbox/';


export const dialog = {
    base,
    box,
    alert,
    confirm,
    lightbox,
    hide: lightbox.hide.bind(lightbox)
}

window.dialog = dialog;
