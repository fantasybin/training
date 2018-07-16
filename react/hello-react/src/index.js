import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Hello from './components/helloreact/HelloReact'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Hello name="react" />, document.getElementById('root'));
registerServiceWorker();
