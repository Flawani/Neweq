const discord = require("discord.js");

module.exports = {
    name: "close",
    aliases: [""],
    category: "ticket",
    descripton: "Pobierz bilet",
    usage: "<wkład>",
    run: async (client, message, args) => {
     // Id van category van tickets.
     const categoryId = "657593894602670080";

     // Als bericht in ticket kanaal is dan verwijder kanaal ander zend bericht
     if (message.channel.parentID == categoryId) {
 
         message.channel.delete();
 
     } else {
 
         message.channel.send("Proszę umieścić to polecenie w kanale biletów.");
 
     }
 
     var embedCloseTicket = new discord.RichEmbed()
         .setTitle("Cześć, " + message.channel.name)
         .setDescription("Twój bilet jest oznaczony jako ** kompletny **. Jeśli chcesz zrobić nowy, zrób _ticket")
         .setFooter("bilet zamknięty");
 
     // Vind kanaal voor de logs.
     var logChannel = message.guild.channels.find("name", "log");
     if (!logChannel) return message.channel.send("Kanał nie istnieje");
 
     logChannel.send(embedCloseTicket);
 
 }

}


