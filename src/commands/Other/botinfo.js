const { SlashCommandBuilder } = require('discord.js');
const { version, developmentStatus, notes, changelog } = require('../../../config.json');
let dev = ""
if(developmentStatus === "Yes") {
    dev = "The bot is currently undergoing development."
}else {
    dev = "The bot is not currently undergoing any big software changes."
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('botinfo')
		.setDescription('Sends information about the bot.'),
	async execute(interaction) {
        const messageEmbed = {
            color: 3447003,
            title: `Bot information`,
            description: "Shows information about the bot.",
            thumbnail: {
                url: 'https://cdn.discordapp.com/avatars/726172301455917139/28f8121f6721a840237b3353fd9eef77.webp?size=160'
            },
            fields: [
                {
                    name: "Bot Name",
                    value: "axe"
                },
                {
                    name: "Bot Software Version",
                    value: version
                },
                {
                    name: "Bot Development Status",
                    value: dev
                },
                {
                    name: "Change Log",
                    value: `For build ${version}: ${changelog}`
                },
                {
                    name: "Other Notes",
                    value: notes
                }
            ],
            footer: {
                text: `Developed by Drapadon and Digytt.`
            },
            timestamp: new Date()
        }
        interaction.reply({ embeds: [messageEmbed] });
    }
}