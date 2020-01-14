const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "timemute",
    category: "moderation",
    description: "mutuje członka",
    usage: "<id | wzmianka>",
    run: async (client, message, args) => {

        let tomute = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!tomute) return message.reply("Chmura nie znalazła użytkownika.");
        if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Nie mogę ich wyciszyć!");
        let muterole = message.guild.roles.find(`name`, "muted");
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("❌ Nie masz uprawnień do wyciszania. Skontaktuj się z członkiem personelu")
                .then(m => m.delete(5000));
        }

        if(!muterole){
            try{
                muterole = await message.guild.createRole({
                    name: "muted",
                    color: "#000000",
                    permissions:[]
                })
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            }catch(e){
                console.log(e.stack);
            }
        }

        let mutetime = args[1];
        if(!mutetime) return message.reply("Nie podałeś czasu!");

        await(tomute.addRole(muterole.id));
        message.reply(`<@${tomute.id}> został wyciszony na ${ms(ms(mutetime))}`);

        setTimeout(function(){
            tomute.removeRole(muterole.id);
            message.channel.send(`<@${tomute.id}> został odciszony!`)
        }, ms(mutetime));

    }
}