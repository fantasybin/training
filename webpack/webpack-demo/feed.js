import React, { Component } from 'react';
import ReactDOM  from 'react-dom';

//ReactDOM.render(<h1>Hello React!</h1>, document.getElementById('root'));

const books = ["柑橘与柠檬啊", "小王子", "树上的男爵", "撒哈拉的故事", "温柔的夜", "白夜行", "马丁伊登"];

    class Kindle extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                books: []
            }
        }

        componentDidMount() {
            this.setState({
                books: books
            });
        }


        clickHandle(e) {
            let target = e.target;
            if (target.nodeName.toLowerCase() !== "span") {
                return null;
            }
            let index = target.getAttribute("data-index");
            this.state.books.splice(index, 1);
            this.setState({
                books: this.state.books
            });
        }

        render() {
            let books = this.state.books;
            return (
                    <ul id="books" onClick={this.clickHandle.bind(this)}>
                        {books.map(function (v, i, a) {
                            return <li key={i} data-index={i}>{v}
                                <span className="read">读过?</span>
                            </li>
                        })}
                    </ul>
            );
        }
    }

    ReactDOM.render(
            <Kindle />,
            document.getElementById('root')
    );