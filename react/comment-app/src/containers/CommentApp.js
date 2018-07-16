import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

export default class CommentApp extends Component {
    constructor(props) {
        super(props);
        console.info('commentapp.constructor');
    }

  render() {
    console.info('commentApp.render');
    return (
      <div className='wrapper'>
        <CommentInput />
        <CommentList />
      </div>
    )
  }
}

