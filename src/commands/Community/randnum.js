const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randnum')
		.setDescription('Use this command to get a random number between 01 and 99.'),
	async execute(interaction) {
        function dicenumber() {
            let num = '';
            let dict = '0123456789';
            for(var i = 0; i < 2; i++){
                num = num + dict.charAt(Math.floor(Math.random() * dict.length));
            }
            return num;
        }
        const messageEmbed = {
            color: 3447003,
            title: `Here's your random number:`,
            description: dicenumber(),
            timestamp: new Date()
        }
        interaction.reply({ embeds: [messageEmbed] });
    }
}