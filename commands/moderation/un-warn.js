const discord = require("discord.js");
const fs = require("fs");

const warns = JSON.parse(fs.readFileSync("./warning.json", "utf8"));

module.exports = {
    name: "un-warn",
    category: "moderation",
    description: "odejmuje ostrzeżenia członka",
    usage: "<id | wzmianka>",
    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Przepraszam, nie możesz tego zrobić.");

        var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        if (!user) return message.channel.send("Podaj użytkownika lub użytkownika nie ma na tym serwerze");

        if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Przepraszamy, tej osoby nie na się un-warn.");

        warns[user.id].warns --;

        fs.writeFile("./warning.json", JSON.stringify(warns), (err) => {
            if (err) console.log(err);
        });

        var warnEmbed = new discord.RichEmbed()
            .setDescription("un-Warn")
            .setColor("#08FF00")
            .addField("un-warn użytkownik", user)
            .addField("un-warnowany przez", message.author)
        
        let warnChannel = message.guild.channels.find(`name`, "❗┆warny");
        if (!warnChannel) return message.reaply("Nie można znaleźć kanału");

        warnChannel.send(warnEmbed);
        
    }
}