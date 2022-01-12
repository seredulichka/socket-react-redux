
const ws = require('ws')
const wss = new ws.Server({
    port: 5000
}, ()=> console.log('Server started on 5000'))



let users = [{id: 0, name: 'Olga'},
            {id: 1, name: 'Olga F'},
]


wss.on('connection', function conection(ws){
    
    let id = Date.now()

    ws.id = id

    ws.on('message', function (message){

        message = JSON.parse(message);

        if(users.findIndex((x)=> x.name === message.username) === -1){
            users.push({id, name: message.username}) 
        }

        message.chatRoom = id
        switch(message.event){
            case 'message':
                broadcastMessage(message, ws.id)
                break
            case 'connection':
                broadcastMessage(message, ws.id)
                break
        }
    })
})

function broadcastMessage(message, id){
    wss.clients.forEach((client)=>{
        if(client.id === id || client.id === +message.recipient){
            client.send(JSON.stringify(message))
        }
    })
}

