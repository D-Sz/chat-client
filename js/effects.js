class Effects {

    constructor(store) {
        this.subscriptions = [
            { scope: 'messages', effect: this.renderMsg },
            { scope: 'messages', effect: this.sendMsg }
        ];

        this.subscriptions.forEach((sub) => {
            store.subscribe(sub.scope, sub.effect.bind(this))
        })

        this.socket = io.connect('http://185.13.90.140:8081/');
        this.socket.on('connect', function (e) {
                console.log(e)
         });
         this.socket.on('message', function (data) {
            console.log(data);
            app.store.action('receive', data );
         });
         this.socket.on('disconnect', function () {
            console.log(e)
        });
    }

    renderMsg(data) {
        //document.querySelector('#feed').insertAdjacentHTML('beforeend', appTemplates.message(data[data.length - 1]));
        document.querySelector('#feed').innerHTML = appTemplates.list(data) ;
        document.querySelector('#feed div:last-child').scrollIntoView();
    }

    sendMsg(data){
        let msg = data[data.length - 1];
        if(msg.type == 'local') {
            this.socket.emit('message',{message: data.message, user: data.user })
        }
    }

}