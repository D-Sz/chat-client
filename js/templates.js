var appTemplates = {
    message:  function(content) { return `
        <div class='message ${content.type == "local" ? "local" : ""  }'>

        ${content.type == "remote" ? "<i class='fas fa-robot'></i>" : ""  }
        ${content.type == "remote" ? content.user + ': ' : ""  }
            ${content.message}
            ${content.type == "local" ? "<i class='fas fa-user-secret'></i>" : ""  }
        </div>
    ` }
}