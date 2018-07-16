import React, { Component } from 'react'
import PassengerInput from './PassengerInput'

export default class PassengerApp extends Component {

    constructor () {
        super();
        
    }

    open () {

    }

    close () {

    }

    render () {
        return (
            <div className='passContainer' style={passStyle}>
                <PassengerInput />
                <PassengerList />
            </div>
        )
    }
}

