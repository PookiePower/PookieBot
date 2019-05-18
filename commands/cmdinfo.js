const Discord = require('discord.js'), mainFile = require('../index.js')
const config = mainFile.config, bot = mainFile.bot

module.exports.run = async (msg, args) => {
    let cmd = mainFile.Commands.get(args[1])
    let cmdArgs = cmd.config.args
    let cmdDesc = cmd.config.description
    msg.channel.send(new Discord.RichEmbed()
    .setTitle('**:information_source: Info Commande**')
    .setColor(0xFF0000)
    .setDescription(`**${cmd.config.name}** ${cmdArgs}`)
    .addField('**Description**', `${cmdDesc}`, true)
    )
}

module.exports.config = {
    name: "cmdinfo",
    args: "<commande>",
    description: "Donne des infos sur une commande"
}