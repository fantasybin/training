import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class Modal extends Component{
    componentDidMount() {
        this.renderLayer();
    }
        
    componentDidUpdate() {
        this.renderLayer();
    }
    componentWillUnmount() {
        this.unrenderLayer();
    }
    
    unrenderLayer() {
        if(!this.layer){
            return;
        }
        unmountComponentAtNode(this.layer); //销毁指定容器内的所有React节点
        document.body.removeChild(this.layer);
        this.layer=null;
    }
    renderLayer() {//自定义渲染
        if(!open){
            this.unrenderLayer()//卸载
            return;
        }
        if(!this.layer){
            this.layer=document.createElement('div');
            document.body.appendChild(this.layer);
        }
        ReactDOM.unstable_renderSubtreeIntoContainer(this,this.props.children,this.layer)
    }
    render() { 
        return null;
    }
 }

 export default Modal;