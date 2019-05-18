const Discord = require('discord.js')

module.exports.run = async (msg, agrs) => {
    msg.channel.send(new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTitle('**Credits du Pookie Bot**')
    .setDescription('Créateur : <@464119931282391061> \n Version : 1.0 \n -=+=- \n Ce bot à été réalisé principalement pour gerer les arrivées sur le Pookie Serv. Mais aussi pour vous permettre de vous amuser avec ^^ (bien evidement) !')
    )
}

module.exports.config = {
    name: "credits",
    args: " ",
    description: ":thinking:"
}