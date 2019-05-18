const Discord = require('discord.js')
const fs = require('fs')
const token = require('./token.json')
const bot = new Discord.Client()
var config = {
    "prefix":"indefinit",
    "rulesmsg":"",
	"channels":{
		"rules":"indefinit"
	},
	"roles":{
        "membre":"indefinit",
        "restricted":"indefinit"
	}
}
var confMsgID = ''
var isConfigOpen = false
var Commands = new Discord.Collection()
var adminCommands = new Discord.Collection()
var confCommands = new Discord.Collection()

module.exports.config = config
module.exports.bot = bot
module.exports.isConfigOpen = isConfigOpen
module.exports.confMsgID = confMsgID
module.exports.Commands = Commands
module.exports.cmd = (isOpenedConfig, msgID) => {
    isConfigOpen = isOpenedConfig()
    confMsgID = msgID()
    console.log(isConfigOpen)
}
module.exports.update = () => {
    this.config = config
    this.bot = bot
    this.isConfigOpen = isConfigOpen
    this.confMsgID = confMsgID
}

//démarrage
bot.on('ready', function(){
	var xml2js = require ('xml2js')
	var parser = new xml2js.Parser()
	fs.readFile('config.xml', function(err, data){
		parser.parseString(data, function(err, result){
			var confdata = result
			config.prefix = confdata.root.prefix[0]
            config.channels.rules = confdata.root.channels[0].rules[0]
            config.roles.membre = confdata.root.roles[0].membre[0]
            config.roles.restricted = confdata.root.roles[0].restricted[0]
            config.rulesmsg = confdata.root.rulesmsg[0]
            
            if(config.rulesmsg != ''){
                bot.channels.get(config.channels.rules.substr(2, 18)).fetchMessage(config.rulesmsg).then(msg => {
                    msg.edit('**Veiller vocher si dessous __après avoir lu les règles__**')
                    config.rulesmsg = msg.id
                })
            }
            bot.user.setActivity(`Fornite (ptdr non), ${config.prefix}help`)
		})
    })
	bot.user.setAvatar('./avatar.png')
    console.log('I am ready!');    

})

//Commandes public setup
fs.readdir('./commands/', 'utf-8', async (err, files) => {
    if(err) console.log(err)

    let cmdfiles = await files.filter(f => f.split('.').pop() === 'js')

    if(cmdfiles.length <= 0) return console.log("ERROR 404 : Couldn't find commands !")

    cmdfiles.forEach((f, i )=>{
        let file = require(`./commands/${f}`)
        Commands.set(file.config.name, file)
    })
})
//Commandes staff setup
fs.readdir('./commands/staff/', 'utf-8', async (err, files) => {
    if(err) console.log(err)

    let cmdfiles = await files.filter(f => f.split('.').pop() === 'js')

    if(cmdfiles.length <= 0) return console.log("ERROR 404 : Couldn't find admins commands !")

    cmdfiles.forEach((f, i )=>{
        let file = require(`./commands/staff/${f}`)
        adminCommands.set(file.config.name, file)
    })
})
//Commandes config setup
fs.readdir('./commands/staff/configs/', 'utf-8', async (err, files) => {
    if(err) console.log(err)

    let cmdfiles = await files.filter(f => f.split('.').pop() === 'js')

    if(cmdfiles.length <= 0) return console.log("ERROR 404 : Couldn't find admins commands !")

    cmdfiles.forEach((f, i )=>{
        let file = require(`./commands/staff/configs/${f}`)
        confCommands.set(file.config.name, file)
    })
})

//nouveau membre
bot.on('guildMemberAdd', member => {
	member.send(new Discord.RichEmbed()
	.setColor(0xFF0000)
	.setTitle('Bonjour et bienvenue sur le Pookie Serv !')
	.setDescription('Avant de pourvoir acceder au reste du serveur, tu doit lire et valider les règlement avec :white_check_mark:')
    ).catch(console.log('erreur ligne 54'))
    member.addRole(config.roles.restricted.substr(3, 18)).catch(console.log('erreur ligne 55'))
})

//commandes
bot.on('message', msg => {
    this.update()

    if(!msg.content.startsWith(config.prefix)) return

    var args = msg.content.split(' ')

    let commandFile = Commands.get(args[0].slice(config.prefix.length))
    if(commandFile) commandFile.run(msg, args)

    adminCommands.forEach((k, file) => {
        if(args[0] === `${config.prefix}${file}`){
            if(msg.member.hasPermission('MOVE_MEMBERS')){
                let admcmd = adminCommands.get(args[0].slice(config.prefix.length))
                if(admcmd) admcmd.run(msg, args)
            }else{
                msg.channel.send(":x: Vous n'avez pas l'autorisation d'utiliser cette commandes !")
            }
        }
    })
})

bot.on('message', msg => {
    this.update()
    var args = msg.content.split(' ')
    if(isConfigOpen){
        confCommands.forEach((k, file) => {
            if(args[0] === `${file}`){
                let confcmd = confCommands.get(args[0])
                if(confcmd) confcmd.run(msg, args)
            }
        })
    }
})


bot.on('messageReactionAdd', (msg_react, user) => {
    if(msg_react.emoji.name === '✅' ){
        console.log(msg_react.message.id + ' !!!!! ' + config.rulesmsg)
        if(msg_react.message.id === config.rulesmsg){
            console.log('ok ?')
            msg_react.message.guild.members.get(user.id).addRole(config.roles.membre.substr(3, 18))
            .then(user.send(new Discord.RichEmbed()
            .setColor(0xFF0000)
            .setTitle('**Merci pour ta coopération !**')
            .setDescription('Bonne aventure a toi sur le Pookie serv !')
            ))
            .catch(console.log('erreur ligne 183'))
            msg_react.message.guild.members.get(user.id).removeRole(config.roles.restricted.substr(3, 18))            
            .catch(console.log('erreur ligne 185'))
        }
    }
})


bot.login(token.token)