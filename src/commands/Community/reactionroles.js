const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reactionrole')
        .setDescription('Creates a reaction role message.')
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The role to give when the emoji is reacted to')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('emoji')
                .setDescription('The emoji to use for the reaction role')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('description')
                .setDescription('The message description')
                .setRequired(true)
        ),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const role = interaction.options.getRole('role');
        const emoji = interaction.options.getString('emoji');
        const description = interaction.options.getString('description');

        const embed = new EmbedBuilder()
            .setTitle('Roles')
            .setDescription(description)
            .setColor('Blue')
            .setFooter({ text: `React to get the ${role.name} role.` });

        const message = await interaction.channel.send({ embeds: [embed] });
        await message.react(emoji);

        await interaction.reply({ content: 'Sent.', ephemeral: true });

        // Store reaction-role mapping (this should ideally be in a database)
        const collector = message.createReactionCollector({ dispose: true });

        collector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name === emoji && !user.bot) {
                const member = await interaction.guild.members.fetch(user.id);
                await member.roles.add(role).catch(console.error);
            }
        });

        collector.on('remove', async (reaction, user) => {
            if (reaction.emoji.name === emoji && !user.bot) {
                const member = await interaction.guild.members.fetch(user.id);
                await member.roles.remove(role).catch(console.error);
            }
        });
    }
};
