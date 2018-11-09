'use strict'

var app = {
    store: new Store(),
    effects: null,
    controls: {
        userInput: document.querySelector('#user'),
        sendButton: document.querySelector('#console button'),
        msgInput: document.querySelector('#msg')
    },
    start: function () {
        console.info('app started');

        this.effects = new Effects(this.store) ;

        this.controls.userInput.value = this.store.state.username;

        this.controls.userInput.addEventListener('blur', (event) => {
            this.store.action('set-user', event.target.value);
            this.sendButtonEnable();
        })

        this.controls.msgInput.addEventListener('keyup', (event) => {
            this.sendButtonEnable();
            if (event.key == 'Enter' && this.controls.msgInput.value.length && this.controls.userInput.value.length) {
                this.sendMessage();
            }
        })

        this.controls.sendButton.addEventListener('click', (event) => {
            this.sendMessage();
        })

        // test
        // this.store.subscribe('',(state)=>{ console.log( 'full',state )});
        // this.store.subscribe('username',(state)=>{ console.log( 'username',state )});
        // this.store.subscribe('messages',(state)=>{ console.log( 'messages',state )});

    },
    sendMessage() {
        this.store.action('send', { message: this.controls.msgInput.value } );

        // let data = { type: 'local', message: this.controls.msgInput.value, user: 'bot' };
        // document.querySelector('#feed').insertAdjacentHTML('beforeend', appTemplates.message(data))
        // data.type = 'remote';
        // document.querySelector('#feed').insertAdjacentHTML('beforeend', appTemplates.message(data))

        this.controls.msgInput.value = '';
        this.sendButtonEnable();
        this.controls.msgInput.focus();
    },
    sendButtonEnable: function () {
        this.controls.sendButton.disabled = !this.controls.msgInput.value.length || !this.controls.userInput.value.length
    }
}


window.onload = app.start.bind(app); 