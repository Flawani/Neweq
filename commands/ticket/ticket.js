const discord = require("discord.js");

module.exports = {
    name: "ticket",
    aliases: [""],
    category: "ticket",
    descripton: "Pobierz bilet",
    usage: "<wkład>",
    run: async (client, message, args) => {
         // Id of the category fot tickets.
    const categoryId = "657593894602670080";

    // Get user name
    var userName = message.author.username;
    // Get disciminator
    var userDiscriminator = message.author.discriminator;

    // If ticket has made.
    var bool = false;

    // Check if ticket is already made.
    message.guild.channels.forEach((channel) => {

        // If ticket is made send message
        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {

            message.channel.send("Już utworzyłeś bilet.");

            bool = true;

        }

    });

    // If ticket return.
    if (bool == true) return;

    // Create embed.
    var embedCreateTicket = new discord.RichEmbed()
        .setTitle("Cześć " + message.author.username)
        .setFooter("Utworzono kanał wsparcia");

    // Send embed
    message.channel.send(embedCreateTicket);

    // Create channel and set channel to category.
    message.guild.createChannel(userName + "-" + userDiscriminator, 'text').then( // Create channel
        (createdchan) => {
            createdchan.setParent(categoryId).then( // Set channel to category.
                (settedParent) => {
                    // Set perms so everyone can't read.
                    settedParent.overwritePermissions(message.guild.roles.find('name', '@everyone'), { 'READ_MESSAGES': false });
                    // Set perms that user can use the channel.
                    settedParent.overwritePermissions(message.author, {
                        'READ_MESSAGES': true, 'SEND_MESSAGES': true,
                        'ATTACH_FILES': true, 'CONNECT': true,
                        'CREATE_INSTANT_INVITE': false, 'ADD_REACTIONS': true
                    });

                    // Create embed.
                    var embedParent = new discord.RichEmbed()
                        .setTitle("Cześć, " + message.author.username.toString())
                        .setDescription("Tutaj umieść pytanie / wiadomość.");

                    // Send embed
                    settedParent.send(embedParent);

                }
            ).catch(err => {
                message.channel.send("Coś poszło nie tak");
            });
        }
    ).catch(err => {
        message.channel.send("Coś poszło nie tak");
    });

}

}
