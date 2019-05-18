const Discord = require('discord.js'), mainFile = require('../../../index.js')
const config = mainFile.config

module.exports.run = async (msg, args) => {
    if(mainFile.isConfigOpen){
        mainFile.cmd(function(){
            return false
        }, function(){
            return mainFile.confMsgID
        })
        msg.channel.fetchMessage(mainFile.confMsgID).then(msg => {
            msg.delete()
            msg.channel.send(':white_check_mark: Le panneau de configuration a été fermé !')
        })

        let fs = require('fs')
        let xml2js = require('xml2js')
        let writer = new xml2js.Builder()
        fs.writeFile('config.xml', writer.buildObject(config), function(err){
            if(err) console.log(err)
        })
    }else{
        msg.channel.send(':x: Le panneau de configuration est fermé !')
    }
}

module.exports.config = {
    name: "close"
}