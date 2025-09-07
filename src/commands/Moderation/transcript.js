const { SlashCommandBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, ChannelType } = require('discord.js');
const { createTranscript } = require('discord-html-transcripts');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('transcript')
    .setDMPermission(false)
    .setDescription('Transcripts the specified channel.')
    .addChannelOption(option => option.setName('channel').setDescription('Specified channel will be transcripted.').addChannelTypes(ChannelType.AnnouncementThread, ChannelType.GuildText, ChannelType.GuildAnnouncement, ChannelType.PublicThread, ChannelType.PrivateThread).setRequired(true))
    .addIntegerOption(option => option.setName('limit').setDescription(`Specified limit will be your transcript's message limit.`).setRequired(true).setMinValue(1).setMaxValue(1000)),
    async execute(interaction, client) {
        await interaction.deferReply();

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels) && interaction.user.id !== '1404710929655926785') return await interaction.editReply({ content: 'You **do not** have the permission to do that!', ephemeral: true});
 
        let channel = interaction.options.getChannel('channel');
        let limit = interaction.options.getInteger('limit');
 
        await interaction.editReply({ content: `Your **transcript** is compiling, this may take a minute!` });
 
        const file = await createTranscript(channel, {
            limit: limit,
            returnBuffer: false,
            filename: `${channel.name.toLowerCase()}-transcript.html`,
        });
 
       let test = await client.channels.cache.get('1404710929655926785');
        let testtwo = await test.send({ files: [file] });
 
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('• Open')
            .setURL(`https://mahto.id/chat-exporter?url=${testtwo.attachments.first()?.url}`)
            .setStyle(ButtonStyle.Link),
 
            new ButtonBuilder()
            .setLabel('• Download')
            .setURL(`${msg.attachments.first()?.url}`)
            .setStyle(ButtonStyle.Link)
        )
 
        const embed = new EmbedBuilder()
        .setColor('DarkRed')
        .setTimestamp()
        .setTitle('> Transcript Ready!')
        .addFields({ name: `• Channel`, value: `> ${channel}`})
        .addFields({ name: `• Limit`, value: `> **${limit}**`})
 
        await interaction.editReply({ content: ``, embeds: [embed], components: [button] })
    }
}