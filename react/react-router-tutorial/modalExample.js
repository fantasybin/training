import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Dialog from './components/Modal/index'
import Confirm from './components/Modal/confirm'

class ModalDemo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            html: '这里是content'
        }
        this.showDemoHandle = this.showDemoHandle.bind(this);
    }

    onCancel() {
        console.log('cancel')
        this.setState({ 
            show:false,
            html: '订单确认?'
        });
    }

    showDemoHandle() {
        this.setState({ 
            show:true,
            html: '订单确认?'
        });
    }

    render() {
        return (
            <div>
                <input type="button" value="demo1" className="demo" onClick={this.showDemoHandle}/>
                <Dialog show={this.state.show} title="title" onOk={()=>{console.log('ok'); this.setState({show: false})}} onCancel={this.onCancel}>
                    {this.state.html}
                </Dialog>
            </div>
        )
    }
}

ReactDOM.render(<ModalDemo />, document.getElementById('content'))

document.getElementById('demo-btn').addEventListener('click', function() {
    Confirm({
        title: 'confirm title',
        content: <p>看我随手一打又是十五字</p>,
        onOk() {
            return new Promise(resolve => setTimeout(resolve, 1000))
        },
        onCancel() {}
    })
}, false)
