var appTemplates = {
    stat: function(content) {
        return `
        <div class=''>
        service status: 
        ${content == "connecting" ? "connecting... <i class='fas fa-sync-alt'></i>" : ( content ==  "connected" ? "connected <i class='fas fa-check'></i>" : "disconnected <i class='fas fa-exclamation-circle'></i>" )}
        </div>
        `
    },

    message: function (content, last) {
        return `
        <div class='message ${content.type == "local" ? "local" : "remote"} ${last ? "anim" : ""}'>

        ${content.type == "remote" ? "<i class='fas fa-robot'></i>" : ""}
        ${content.type == "remote" || (content.type == "local" && content.notCurrentUser ) ? content.user + ': ' : ""}
            ${content.message}
            ${content.type == "local" ? "<i class='fas fa-user-secret'></i>" : ""}
        </div>
    ` },

    list: function (list) {
        return `
        ${ 
            list.map((item, index) =>  { 
                return this.message(item, index == list.length-1 )
            }).join("")
        }
        `
    }
}