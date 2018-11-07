class Store {
    constructor () {
        this.state = {
            username: 'demo user',
            messages: []
        }
    }
    action (action,payload) {
        switch (action) {
            case 'send' : {
                this.state = {
                    ...this.state,
                    messages: [].concat(this.state.messages,payload) 
                }
                break;
            }
            case 'receive' : {
                this.state = {
                    ...this.state,
                    messages: [].concat(this.state.messages,payload) 
                }
                break;
            }
            case 'set-user' : {
                this.state = {
                    ...this.state,
                    username: payload
                }
                break;
            }
        }
        console.info('state',this.state)
    }
}