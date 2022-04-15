import React, {KeyboardEvent} from 'react';


const chatStyle: {} = {
    textAlign: 'center',
    padding: '10px',
    border: '1px solid black',
    maxHeight: '600px',
    overflowY: 'scroll',
    width: '100%'
}

class Chat extends React.Component<any, any> {
    state = {
        messages: [{userName:'static',message: 'hello'}]
    }
    socket: any = {}

    componentDidMount() {
        let baseUrl = 'social-network.samuraijs.com'
        this.socket = new WebSocket(`wss://${baseUrl}/handlers/ChatHandler.ashx`)
        this.socket.onmessage = this.onMessages.bind(this)
    }

    onMessages(messageEvent: MessageEvent<any>) {
        debugger
        if (messageEvent.data) {
            let messages = JSON.parse(messageEvent.data)
            //messages = messages.map((m: any) => ({message: m.message}))
            this.setState({
                messages: [...this.state.messages, ...messages]
            })
        }
    }

    onKeyPressHandler(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (e.ctrlKey && e.code === 'Enter') {
            this.socket.send(e.currentTarget.value)
            e.currentTarget.value = ""
        }
    }

    render() {
        return <div style={{display: "flex", flexDirection: 'column', alignItems: 'center'}}>
            <h3>Chat it-incubator</h3>
            <div style={chatStyle}>
                {this.state.messages.map((e, i) => <div key={i}>
                    <b>{e.userName}: </b>{e.message}
                </div>)}
            </div>
            <div style={{padding: "10px"}}>
                <textarea onKeyPress={this.onKeyPressHandler.bind(this)}>

                </textarea>
            </div>
        </div>
    }
}

export default Chat
