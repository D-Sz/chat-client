class Effects {

    constructor(store) {
        this.subscriptions = [
            { scope: 'messages', effect: this.renderMsg }
        ];

        this.subscriptions.forEach((sub) => {
            store.subscribe(sub.scope, sub.effect.bind(this))
        })

        var socket = io.connect('http://185.13.90.140:8081/');
        socket.on('connect', function (e) {
                console.log(e)
         });
        socket.on('message', function (data) {
            console.log(data)
         });
        socket.on('disconnect', function () {
            console.log(e)
        });
    }

    renderMsg(data) {
        document.querySelector('#feed').insertAdjacentHTML('beforeend', appTemplates.message(data[data.length - 1]))
    }

}