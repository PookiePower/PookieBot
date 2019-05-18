const Discord = require('discord.js'), mainFile = require('../index.js')
const config = mainFile.config, bot = mainFile.bot

module.exports.run = async (msg, agrs) => {
    msg.channel.send(new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTitle('__**Commande du PookieBot**__')
    .setDescription('Le prefix que vous devez mettre devant les commandes est `' + config.prefix + '`')
    .addField('__Commandes Admin :__', '`helpstaff` - Commandes pour le staff', true)
    .addField('__Commandes Membres :__', '`pookieyt` - La chaine de Pookie, notre maitre a tous ! \n `calinou` - Pas besoin de vous faire un dessin je pense \n `credits` - :thinking: ', true)
    .addField('__AH et aussi :__', 'Faite moi part des ajouts que vous voudiez voir sur ce bot mar mp (<@464119931282391061>) et aussi des bugs que vous trouvez ^^ !', true)
    )
}

module.exports.config = {
    name: "help",
    args: "",
    description: "Vous apporte de l'aide"
}