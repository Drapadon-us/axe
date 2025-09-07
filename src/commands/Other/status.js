const { Client, SlashCommandBuilder, GatewayIntentBits, ClientPresence } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription("Sets the bot's status light (only can be used by the owner.")
        .addStringOption(option => option
            .setName('type')
            .setDescription("What type you want it?")
            .setRequired(true)
            .addChoices(
                { name: 'Online', value: 'Online' },
                { name: 'Idle', value: 'Idle' },
                { name: 'DND', value: 'DND' },
                { name: 'Offline', value: 'Invisible' },
            )
        ),
	async execute(interaction) {
        const types = interaction.options.getString('type')
        if(!interaction.member.id === "648209386312826900") {
            const notOwnerEmbed = {
                color: 0xff0000,
                title: ":x: Error!",
                description: "You cannot execute this command because you are not the owner of the bot.",
                timestamp: new Date(),
            }
            return interaction.reply({ embeds: [notOwnerEmbed], ephemeral: true });
        }else {
            const completeEmbed = {
                color: 0xff0000,
                title: ":x: Error",
                description: `The bot's status could not be set to ${types}.`,
                timestamp: new Date(),
            }
            interaction.reply({ embeds: [completeEmbed], ephemeral: true });
        }
    }
}