import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            chatInput: '',
            socket: this.props.socket
        }

        this.sendMessage = this.sendMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let {
            socket
        } = this.props;

        socket.on('chat', msg => {
            this.setState(prevState => {
                let messages = prevState.messages;
                let {
                    text,
                    senderName
                } = msg;
                messages.push({ text, senderName });
                return {
                    messsages: messages
                }
            })
        })
        this.setState({
            socket: socket
        })
    }

    sendMessage() {
        let {
            chatInput,
            socket
        } = this.state;
        let {
            opponentId,
            myName
        } = this.props;

        if (!chatInput) {
            return false;
        }

        this.setState(prevState => {
            let messages = prevState.messages;
            messages.push({
                text: chatInput,
                senderName: myName
            })
            return {
                chatInput: '',
                messages: messages
            }
        })

        socket.emit('chat', {
            to: opponentId,
            text: chatInput,
            senderName: myName
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        let {
            messages,
            chatInput
        } = this.state;

        messages = messages.map((msg, index) =>
            <div key={index}>
                <span>{msg.senderName}:</span> {msg.text}
            </div>);

        return (
            <div>
                {messages}
                <TextField
                    name="chatInput"
                    value={chatInput}
                    onChange={this.handleChange}
                    variant="outlined"
                />
                <Button
                    onClick={this.sendMessage}
                    variant="contained"
                    color="default"
                >
                    Send
                </Button>
            </div>
        )
    }
}