const 
    net = require('net'),
    ldj = require('./ldj.js'),
    netClient = net.connect({port:5432}),
    ldjClient = ldj.connect(netClient);
    ldjClient.on('message', function(message){
        if(message.type == "watching") {
            console.log("Now watching " + message.file);
        } else if (message.type == 'changed') {
            let date = new Date(message.timestamp);
            console.log("File " + message.file + " Changed at " + date);
        } else {
            throw Error("unrecogized message type" + message.type);
        }
    });