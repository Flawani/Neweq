const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "prefix",
    category: "moderation",
    descripton: "Ustaw prefix",
    usage: "Ustaw prefix",
    run: async (client, message, args, prefix) => {

        if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("Nie posiadasz **MANAGE_GUILD**");
        if(!args[0] || args[0 == "help"]) return message.reply(`Użycie: aktualny prefix, **domyślny prefix to:** \`_\` . <nowy prefix>`);

        let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

        prefixes[message.guild.id] = {
            prefixes: args[0]
        };

        fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
            if (err) console.log(err)
        });

        let sEmbed = new Discord.RichEmbed()
        .setColor("#FF9900")
        .setTitle("Prefix ustawiony!")
        .setDescription(`Ustawiony prefix to ${args[0]}`);

        message.channel.send(sEmbed);

    }
}
