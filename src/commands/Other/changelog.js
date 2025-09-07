const { SlashCommandBuilder } = require('discord.js');
const { version, changelog } = require('../../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('changelog')
		.setDescription('Changelog for the bot.')
        .addStringOption((option) =>
            option
            .setName('version')
            .setDescription("Show the changelog for a specific version of the bot, otherwise show the current one.")
            .setRequired(false)),
	async execute(interaction) {
        const vn = interaction.options.getString('version');
        if(vn) {
            const messageEmbed = {
                color: 0xff0000,
                title: `:x: Sorry, this isn't finished yet.`,
                description: "You can however still use changelog, but only to show the current changelog.",
                timestamp: new Date()
            }
            interaction.reply({ embeds: [messageEmbed] });
        }else {
            const messageEmbed = {
                color: 3447003,
                title: `Changelog for ${version}`,
                description: changelog,
                timestamp: new Date()
            }
            interaction.reply({ embeds: [messageEmbed] });
        }

    }
}
