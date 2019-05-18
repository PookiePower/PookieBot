const Discord = require('discord.js'), mainFile = require('../../../index.js')
const config = mainFile.config, bot = mainFile.bot

module.exports.run = async (msg, args) => {
    if(msg.member.hasPermission('ADMINISTRATOR')){
        if(config.rulesmsg != ''){
            bot.channels.get(config.channels.rules.substr(2, 18)).fetchMessage(config.rulesmsg).then(msg => {
                msg.delete()
            })
        }
        config.channels['rules'] = args[1]
        bot.channels.get(config.channels.rules.substr(2, 18)).send('**Veiller vocher si dessous __après avoir lu les règles__**')
        .then(msg => {
            msg.react('✅')
            config.rulesmsg = msg.id
        })
        msg.channel.send(':white_check_mark: Le règlement est maintenant dans ' + config.channels.rules)
    }else{
        msg.channel.send(":x: Vous n'avez pas l'autorisation d'utiliser cette commande !")
    }
}

module.exports.config = {
    name: "setrules"
}