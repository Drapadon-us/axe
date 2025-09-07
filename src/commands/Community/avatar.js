const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Gets a users avatar.')
        .addUserOption((option) =>
            option
            .setName('member')
            .setDescription("The member you want to get the avatar from.")
            .setRequired(false)),
	async execute(interaction) {
        const target = interaction.options.getUser('member') || interaction.member
        const { user } = target
        const messageEmbed = {
            color: 3447003,
            title: `${target.toString()}'s avatar:`,
            image: {
                url: target.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }),
            },
            timestamp: new Date()
        }
        interaction.reply({ embeds: [messageEmbed] });
    }
}