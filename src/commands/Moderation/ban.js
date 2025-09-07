const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user you would like to ban')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for banning the user')
        ),

    async execute(interaction, client) {
        const banUser = interaction.options.getUser('target');
        const banMember = await interaction.guild.members.fetch(banUser.id).catch(() => null);
        const channel = interaction.channel;

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return await interaction.reply({
                content: "You dont have the **Ban Members** permission.",
                ephemeral: true
            });
        }

        if (!banMember) {
            return await interaction.reply({
                content: 'That user is NOT in the server',
                ephemeral: true
            });
        }

        if (!banMember.bannable) {
            return await interaction.reply({
                content: "I can't ban this user because their role is above me or they have higher permissions.",
                ephemeral: true
            });
        }

        let reason = interaction.options.getString('reason');
        if (!reason) reason = "No reason provided";

        const dmEmbed = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`You've have been banned from **${interaction.guild.name}**\n**reason:** ${reason}`);

        const embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`I wiped **${banUser.tag}** from the face of this server \n**Reason:** ${reason}`);

        await banUser.send({ embeds: [dmEmbed] }).catch(err => {
            // doesn't attempt to send a dm if users dms are closed
        });

        await banMember.ban({ reason: reason }).catch(err => {
            return interaction.reply({
                content: "I don't know why, but I can't ban this user.",
                ephemeral: true
            });
        });

        await interaction.reply({ embeds: [embed] });
    }
}
