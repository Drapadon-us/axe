const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

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

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false }); // <-- acknowledges interaction early

        const banUser = interaction.options.getUser('target');
        const banMember = await interaction.guild.members.fetch(banUser.id).catch(() => null);

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return await interaction.editReply("You don't have the **Ban Members** permission.");
        }

        if (!banMember) {
            return await interaction.editReply("That user is NOT in the server.");
        }

        if (!banMember.bannable) {
            return await interaction.editReply("I can't ban this user because their role is above me or they have higher permissions.");
        }

        let reason = interaction.options.getString('reason') || "No reason provided";

        const dmEmbed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`You've been banned from **${interaction.guild.name}**\n**Reason:** ${reason}`);

        const embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(` **${banUser.tag}** was banned.\n**Reason:** ${reason}`);

        try {
            await banUser.send({ embeds: [dmEmbed] }).catch(() => {});
            await banMember.ban({ reason });
            await interaction.editReply({ embeds: [embed] });
        } catch (err) {
            console.error(err);
            await interaction.editReply("I can't ban this user. Please check my permissions and role position.");
        }
    }
};
