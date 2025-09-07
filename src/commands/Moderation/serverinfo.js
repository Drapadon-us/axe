const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Shows you information about the current discord server.'),
    async execute(interaction) {
        const owner = await interaction.guild.fetchOwner()
        const members = interaction.guild.members.cache;
        const messageEmbed = {
            color: 3447003,
            title: 'Server Information',
            description: 'Tells you information about the server',
            fields: [
                {
                    name: 'Server Name',
                    value: `${interaction.guild.name}`
                },
                {
                    name: 'Server Member Count',
                    value: `${interaction.guild.memberCount}`
                },
                {
                    name: 'Users',
                    value: `${members.filter(member => !member.bot).size}`
                },
                {
                    name: 'Bots',
                    value: `${members.filter(member => member.bot).size}`
                },
                {
                    name: 'Boost Tier',
                    value: interaction.guild.premuimTier ? `${interaction.guild.premuimTier}`: 'None'
                },
                {
                    name: 'Boost Level',
                    value: `${interaction.guild.premuimSubscriptionCount || '0'}`
                },
                {
                    name: 'Server Owner',
                    value: `${owner.toString()}`
                },
                {
                    name: 'Server Region',
                    value: `${interaction.guild.preferredLocale}`
                },
                {
                    name: 'Server Created',
                    value: `${interaction.guild.createdAt}`
                },
                {
                    name: 'Server ID',
                    value: `${interaction.guild.id}`
                },
            ],
        thumbnail: {
            url: interaction.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }),
          },
          timestamp: new Date()
        }
        interaction.reply({ embeds: [messageEmbed] })
    }
}