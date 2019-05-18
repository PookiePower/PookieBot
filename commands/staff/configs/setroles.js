const Discord = require('discord.js'), mainFile = require('../../../index.js')
const config = mainFile.config, bot = mainFile.bot

module.exports.run = async (msg, args) => {
    if(msg.member.hasPermission('ADMINISTRATOR')){
        if(args[1] === 'membre'){
            config.roles.membre = args[2]
            msg.channel.send(':white_check_mark: Le role `membre` est maintenant ' + config.roles.membre)
        }else
        if(args[1] === 'restricted'){
            config.roles.restricted = args[2]
            msg.channel.send(':white_check_mark: Le role `restricted` est maintenant ' + config.roles.restricted)
        }
    }else{
        msg.channel.send(":x: Vous n'avez pas l'autorisation d'utiliser cette commande !")
    }
}

module.exports.config = {
    name: "setroles"
}