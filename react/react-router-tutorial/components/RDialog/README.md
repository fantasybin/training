~~~
import {dialog} from 'component/dialog';

// box
dialog.box('这只是一个弹窗，什么也不干');

dialog.box('这是一个弹窗，1秒后自动关闭', {
    autoClose: 1000
});

dialog.box('这是一个弹窗，弹出后有回调，1秒后有consolelog，2秒后关闭', {
    autoClose: 2000,
    complete: function() {
        setTimeout(function() {
            
        }, 1000)
    }
});

// alert
dialog.alert('这是一个普通的alert')

dialog.alert('这是一个有回调的alert，点击确定按钮看看', {
    ok_text: '点我看效果',
    ok_callback: function() {
        
    }
})

// confirm
dialog.confirm('这是一个普通的confirm')

dialog.confirm('这是一个有回调的confirm，点击确定按钮看看', {
    ok_text: '点我看效果',
    ok_callback: function() {
        
    },
    cancel_text: '不要离开^--^',
    cancel_callback: function() {
        
    }
})
~~~
