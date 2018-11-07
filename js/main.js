'use strict'

var app = {
    store: new Store() ,
    controls: {
         userInput: document.querySelector('#user') ,
         sendButton:document.querySelector('#console button') ,
         msgInput: document.querySelector('#msg') 
    },
    start: function() {
        console.info('app started') ;
        
        this.controls.userInput.value = this.store.state.username;
    
        this.controls.userInput.addEventListener('keyup',(event)=>{
            console.log(event);
            this.store.action('set-user',event.target.value) ;
            this.sendButtonEnable();
        })
    
        this.controls.msgInput.addEventListener('keyup',(event)=>{
            console.log(event)
            this.sendButtonEnable();
        })
    
        this.controls.sendButton.addEventListener('click',(event)=>{
            console.log(event)
        })
    
    },
    sendButtonEnable: function() {
        this.controls.sendButton.disabled = !this.controls.msgInput.value.length || !this.controls.userInput.value.length
    }
}


window.onload = app.start.bind(app) ; 