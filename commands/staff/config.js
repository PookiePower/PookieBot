const Discord = require('discord.js'), mainFile = require('../../index.js')
const config = mainFile.config, bot = mainFile.bot

module.exports.run = async (msg, args) => {
    let conf_msg = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTitle(':gear: **Configuration du PookieBot**')
    .setDescription('pour quitter ce menu tapez `close`\n__Attention :__ Ce menu ne se fermera pas automatiquement')
    .addField('__Prefix :__', 'Voici le prefix utilisé : `' + config.prefix + '` \n --=+=-- \n pour changer le prefix tapez `setprefix <prefix>`', true)
    .addField('__Message de réglement :__', 'Channel du message : ' + config.channels.rules + ' \n --=+=-- \n pour mettre en place un message de réglement tapez \n `setrules <Channel du règlement>`', true)
    .addField('__Roles :__', 'membre : ' + config.roles.membre + ' \n restricted (Nouveaux arrivants) : ' + config.roles.restricted + '\n --=+=-- \n pour attribuer les roles, tapez `setroles <type du role> <@nom du role>` ', true)

    msg.channel.send(conf_msg).then( msg => {
        mainFile.cmd(function(){
            return true
        },function(){
            return msg.id
        })
    })
}

module.exports.config = {
    name: "config",
    args: "",
    description: "ouvre le panneau de configuration (permission administrateur uniquement !)"
}