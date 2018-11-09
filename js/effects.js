class Effects {
    constructor(store) {
        this.subscriptions = [
            { scope: 'messages', effect: this.renderMsg },
            { scope: 'messages', effect: this.sendMsg },
            { scope: 'networkState', effect: this.networkState }
        ];

        this.subscriptions.forEach((sub) => {
            store.subscribe(sub.scope, sub.effect.bind(this))
        })

        setTimeout(() => {
            app.store.action('set-network-state', 'connecting' );
            this.socket = io.connect('http://185.13.90.140:8081/');
            this.socket.on('connect', function (e) {
                app.store.action('set-network-state', 'connected' );
            });
            this.socket.on('reconnect', function (e) {
                app.store.action('set-network-state', 'connected' );
            });
            this.socket.on('reconnecting', function (e) {
                app.store.action('set-network-state', 'connecting' );
            });
            this.socket.on('message', function (data) {
                app.store.action('receive', data);
            });
            this.socket.on('disconnect', function () {
                app.store.action('set-network-state', 'disconnected' );
            });

        },4000);
        app.store.action('set-network-state', 'init' );
    }

    renderMsg(data) {
        document.querySelector('#feed').innerHTML = appTemplates.list(data);
        document.querySelector('#feed div:last-child').scrollIntoView();
    }

    sendMsg(data) {
        let msg = data[data.length - 1];
        if (msg.type == 'local') {
            this.socket.emit('message', { message: data.message, user: data.user })
        }
    }

    networkState(data) {
        document.querySelector('#stat').innerHTML = appTemplates.stat(data);
    }

}