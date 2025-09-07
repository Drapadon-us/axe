const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hug')
		.setDescription('Hug a fellow server member!')
        .addUserOption((option) =>
            option
            .setName('member')
            .setDescription("Who do you wanna hug?")
            .setRequired(true)),
	async execute(interaction) {
        const messageEmbed = {
            color: 3447003,
            title: `Aww!`,
            description: `${interaction.member.toString()} hugs ${interaction.options.getUser('member').toString()}! How sweet!`,
            timestamp: new Date()
        }
        interaction.reply({ content: `${interaction.options.getUser('member').toString()}`, embeds: [messageEmbed] });
    }
}