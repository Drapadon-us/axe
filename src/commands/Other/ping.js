const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Test the bot latency in a fun way'),
	async execute(interaction) {
		const firstEmbed = {
			color: 3447003,
			title: "Ping?",
			timestamp: new Date()
		}
		const sent = await interaction.reply({ embeds: [firstEmbed], fetchReply: true });
		const secondEmbed = {
			color: 3447003,
			title: "Pong!",
			description: `Latency is ${sent.createdTimestamp - interaction.createdTimestamp} ms.`,
			timestamp: new Date()
		}
        interaction.editReply({ embeds: [secondEmbed] });
	},
};