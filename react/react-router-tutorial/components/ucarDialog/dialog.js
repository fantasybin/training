import base from './base';
import alert from './alert';
import confirm from './confirm';
import box from './box';
import {lightbox} from './lightbox';


export const dialog = {
    base,
    alert,
    confirm,
    box,
    lightbox,
    hide: lightbox.hide.bind(lightbox)
}

window.dialog = dialog;
