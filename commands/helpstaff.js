const Discord = require('discord.js')

module.exports.run = async (msg, agrs) => {
    if(msg.member.hasPermission('MOVE_MEMBERS')){
        msg.channel.send(new Discord.RichEmbed()
        .setColor(0xFF0000)
        .setTitle('__**Commande admin du PookieBot**__')
        .setDescription('`config` - ouvre le panneau de configuration (permission administrateur uniquement !)')
        )
    }else{
        msg.channel.send(':x: Vous ne pouvez pas utiliser cette commande !')
    }
}

module.exports.config = {
    name: "helpstaff",
    args: "",
    description: "Apporte de l'aide au staff"
}