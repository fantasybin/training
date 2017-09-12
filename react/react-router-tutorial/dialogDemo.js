import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './components/UDialog/dialog';

class DialogDemo extends React.Component {
  constructor(props) {
    super(props);
    this.states = {
      popupVisible:false
    }
    this.handleClick = this.handleClick.bind(this);

  }
  handleClick() {
    Popup.alert('I am alert, nice to meet you');
  }
  handleConfirm() {    
    /*dialog.confirm('确认取消订单?', {
      subtit: 'confirm',
      note: '这是默认node',
      complete: function(){
        console.info('complete');
      },
      confirm_callback: function(){ 
        console.info('confirm callback');
        console.info(this);
      }
    });*/
  }

  render() {
    return (
      <div>
        <div style={{background: "#ccc", border:'solid 1px blue', width:"100px", height:"50px"}} onClick={this.handleClick}>Alert</div>
        <div style={{background: "#ddd", border:'solid 1px blue', width:"100px", height:"50px"}} onClick={this.handleConfirm}>Confirm</div>
      </div>
    );
  }
}


ReactDOM.render(<DialogDemo />, document.getElementById('container'));

ReactDOM.render(
    <Popup  className="mm-popup"
    btnClass="mm-popup__btn"
    closeBtn={true}
    closeHtml={null}
    defaultOk="Ok"
    defaultCancel="Cancel"
    wildClasses={false}
    closeOnOutsideClick={true} />,
    document.getElementById('popupContainer')
);