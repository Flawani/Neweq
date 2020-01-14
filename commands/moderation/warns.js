const discord = require("discord.js");
const fs = require("fs");

const warns = JSON.parse(fs.readFileSync("./warning.json", "utf8"));

module.exports = {
    name: "warn",
    category: "moderation",
    description: "ostrzega członka",
    usage: "<id | wzmianka>",
    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Przepraszam, nie możesz tego zrobić.");

        var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        if (!user) return message.channel.send("Podaj użytkownika lub użytkownika nie ma na tym serwerze");

        if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Przepraszamy, tej osoby nie na się ostrzeć.");

        var reasone = args.join(" ").slice(22);

        if (!reasone) return message.channel.send("Proszę podać powód.")

        if (!warns[user.id]) warns[user.id] = {
            warns: 0
        };

        warns[user.id].warns++;

        fs.writeFile("./warning.json", JSON.stringify(warns), (err) => {
            if (err) console.log(err);
        });

        var warnEmbed = new discord.RichEmbed()
            .setDescription("Warn")
            .setColor("#ee0000")
            .addField("zwarnowany użytkownik", user)
            .addField("zwarnowany przez", message.author)
            .addField("Liczba ostrzeżeń", warns[user.id].warns)
            .addField("Powód", reasone);
        
        var warnChannel = message.guild.channels.find(`name`, "❗┆warny ");
        if (!warnChannel) return message.guild.send("Nie można znaleźć kanału");

        warnChannel.send(warnEmbed);

        if (warns[user.id].warns == 3) {
            var warnberichart = new discord.RichEmbed()
            .setDescription("UWAGA! " + user)
            .setColor("#ee0000")
            .addField("Wiadomość", "Kolejne ostrzeżenie i dostaniesz bana!");

        message.channel.send(warnberichart);

        } else if (warns[user.id].warns == 4) {

            message.guild.member(user).ban(reasone);
            message.channel.send(`${user} jest zbanowany!`)

        }
        
    }
}