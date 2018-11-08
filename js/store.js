class Store {
    constructor() {
        this.state = {
            username: 'demo user',
            messages: []
        };
        this.lastState = this.state;
        this.subscriptions = [];
    }

    subscribe(scope, subscriber) {
        this.subscriptions.push({ scope: scope, subscriber: subscriber });
    }

    action(action, payload) {
        this.lastState = this.state;
        switch (action) {
            case 'send': {
                this.state = {
                    ...this.state,
                    messages: [].concat(this.state.messages, { 
                        type: 'local', 
                        message: payload.message, 
                        user: this.state.username
                    })
                }
                break;
            }
            case 'receive': {
                this.state = {
                    ...this.state,
                    messages: [].concat(this.state.messages, { type: 'remote', message: payload.message, user: payload.user })
                }
                break;
            }
            case 'set-user': {
                this.state = {
                    messages: this.state.messages.map((item)=>{
                        return {
                            ...item,
                            notCurrentUser: true
                        }
                    }) ,
                    username: payload
                }
                break;
            }
        }

        this.emit();
    }

    emit() {
        this.subscriptions.forEach((sub) => {
            let state = sub.scope == '' ? this.state : this.state[sub.scope];
            let last = sub.scope == '' ? this.lastState : this.lastState[sub.scope];
            if (state != last) {
                sub.subscriber(state)
            }
        })
    }
}