import React from 'react';
import ReactDOM from 'react-dom';
import Popup from 'react-popup';
import rdialog from './components/dialog/rdialog';
import ucarDialog from './components/ucarDialog/dialog';
import ConfirmWins from './components/Popups/ConfirmWins';

class DialogDemo extends React.Component {
  constructor(props) {
    super(props);
    this.states = {
      popupVisible:false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleConfirmWins = this.handleConfirmWins.bind(this);
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.confirmCallback = this.confirmCallback.bind(this);
    console.info('ucarDialog: ' + ucarDialog);
  }
  handleClick() {
    console.log(rdialog);
    //Popup.alert('I am alert, nice to meet you');
    //rdialog.show('这只是一个弹窗，什么也不干');
    dialog.alert('这只是一个弹窗');
  }
  handleConfirm() {
    
    dialog.confirm('确认取消订单?', {
      subtit: 'confirm',
      note: '这是默认node',
      complete: function(){
        console.info('complete');
      },
      confirm_callback: function(){
        console.info('confirm callback');
        console.info(this);
      }
    });
    /*let mySpecialPopup = Popup.register({
        title: 'I am special',
        content: 'Since I am special you might need me again later. Save me!',
        buttons: {
            left: ['cancel'],
            right: ['ok']
        }
    });

    Popup.queue(mySpecialPopup);*/
  }
  confirmCallback() {
    console.info('confirmCallback');
  }
  componentDidMount() {
    console.info('did');
   /* Popup.registerPlugin('popover', function (content, target) {
        this.create({
            content: content,
            className: 'popover',
            noOverlay: true,
            position: function (box) {
                let bodyRect      = document.body.getBoundingClientRect();
                let btnRect       = target.getBoundingClientRect();
                let btnOffsetTop  = btnRect.top - bodyRect.top;
                let btnOffsetLeft = btnRect.left - bodyRect.left;
                let scroll        = document.documentElement.scrollTop || document.body.scrollTop;

                box.style.top  = (btnOffsetTop - box.offsetHeight - 10) - scroll + 'px';
                box.style.left = (btnOffsetLeft + (target.offsetWidth / 2) - (box.offsetWidth / 2)) + 'px';
                box.style.margin = 0;
                box.style.opacity = 1;
            }
        });
    });

    Popup.plugins().popover('This popup will be displayed right above this button.', document.getElementById('popoverContainer'));*/
  }
  handleBox(event) {
    dialog.box('tips', {autoClose:9000});
    /*Popup.create({
      title: null,
      content: 'Hello, look at me',
      className: 'alert',
      buttons: {
          right: ['ok']
      }
  });*/
    //Popup.plugins().popover('hello tips', event.target);
  }
  handleLeftClick() {
    console.info('leftBtn click')
    
  }
  handleRightClick() {
    console.info('rightBtn click')
    
  }
  handleConfirmWins(){
    console.info('handle pop' + ConfirmWins.props);
    this.refs.confirmwins.show();
    
  }
  handleModal(){
    
  }
  render() {
    return (
      <div>
        <div style={{background: "#ccc", border:'solid 1px blue', width:"100px", height:"50px"}} onClick={this.handleClick}>Alert</div>
        <div style={{background: "#ddd", border:'solid 1px blue', width:"100px", height:"50px"}} onClick={this.handleConfirm}>Confirm</div>
        <div style={{background: "#ddd", border:'solid 1px blue', width:"100px", height:"50px"}} onClick={this.handleBox}>box</div>
        <div style={{background: "#ddd", border:'solid 1px blue', width:"100px", height:"50px"}} onClick={this.handleConfirmWins}>confirmwins</div>
        <div style={{background: "#ddd", border:'solid 1px blue', width:"100px", height:"50px"}} onClick={this.handleModal}>modal</div>
        <ConfirmWins title='title' desc='description' ref="confirmwins" popupVisible={'true'} leftBtn={{text: '取消'}} rightBtn={{text:'确认'}} 
        onLeftClick={this.handleLeftClick.bind(this)} onRightClick={this.handleRightClick.bind(this)}/>
      </div>
    );
  }
}


ReactDOM.render(<DialogDemo />, document.getElementById('container'));

ReactDOM.render(
    <Popup />,
    document.getElementById('popupContainer')
);