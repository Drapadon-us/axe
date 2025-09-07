const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('Ask the magic 8ball a question')
        .addStringOption((option) =>
            option
            .setName('question')
            .setDescription("The question you would like to ask")
            .setRequired(true)),
	async execute(interaction) {
        const theShit = interaction.options.getString('question');
        if(theShit.toLowerCase().startsWith('what')) {
            const messageEmbed = {
                color: 0xff0000,
                title: `The Magic 8ball says:`,
                description: "I'm only an 8ball. I can't answer those kind of questions!",
                timestamp: new Date(),
                footer: { text: `Question: ${theShit}` }
            }
            interaction.reply({ embeds: [messageEmbed] });
        }
        else { function doMagic8BallVoodoo() {
            var rand = ['Yes', 'No', 'Answer Unclear', 'Try Again Later', 'Maybe', 'Probably Not'];
        
            return rand[Math.floor(Math.random()*rand.length)];
          }
        const messageEmbed = {
            color: 3447003,
            title: `The Magic 8ball says:`,
            description: doMagic8BallVoodoo(),
            timestamp: new Date(),
            footer: { text: `Question: ${theShit}` }
        }
        interaction.reply({ embeds: [messageEmbed] });
    }
    }
}