import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './components/UDialog/dialog';
import Modal from './components/dialog/Modal';
import Dialog from './components/dialog/index';
import Button from './components/dialog/button';

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

  render() {
    const {open} = true; //接受变量控制dialog的显示
    return (
      <div>
        <div style={{background: "#ccc", border:'solid 1px blue', width:"100px", height:"50px"}} onClick={this.handleClick}>Alert</div>
         <Modal>
            <Dialog 
                title="Dialog对话框Demo" 
                open={true} 
                modal={false} 
                action={<Button className="btnConfim" children="阿牛" />}
                onRequestClose={ ()=>{this.changeOpen()} }
            >
                Dialog内容
            </Dialog>
        </Modal>
      </div>
    );
  }
}


ReactDOM.render(<DialogDemo />, document.getElementById('container'));


