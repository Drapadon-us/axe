const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Get information of a user in the server. You can only get info for yourself at the moment.')
        .addUserOption((option) =>
            option
            .setName('member')
            .setDescription("The user you want to get information from. **DOES NOT WORK. STILL IN DEVELOPMENT.**")
            .setRequired(false)),
	async execute(interaction) {
        const target = interaction.options.getUser('member') || interaction.member
        const { user, presence, roles } = target
        await user.fetch()
        const activityType = [
            "Playing",
            "Streaming",
            "Listening to",
            "Watching",
            "Custom",
            "Competing in"
        ];

        const clientType = [
          { name: "desktop", text: "PC" },
          { name: "mobile", text: "Phone" },
          { name: "web", text: "Web" },
          { name: "offline", text: "Offline" },
        ]

        const maxDisplayRoles = (roles, maxFieldLength = 1024) => {
          let totalLength = 0;
          const result = [];

          for(const role of roles) {
            const roleString = `<@${role.id}>`;

            if(roleString.length + totalLength > maxFieldLength)
              break;

            totalLength += roleString.length + 1
            result.push(roleString);
          }

          return result.length;
        }

        const sortedRoles = roles.cache.map(role => role).sort((a, b) => b.position - a.position).slice(0, roles.cache.size - 1);
        const clientStatus = presence?.clientStatus instanceof Object ? Object.keys(presence.clientStatus) : "offline";
        const deviceFilter = clientType.filter(device => clientStatus.includes(device.name));
        const devices = !Array.isArray(deviceFilter) ? new Array(deviceFilter) : deviceFilter;
        const firstEmbed = {
			      color: 3447003,
			      title: `Information for ${user.tag}`,
            thumbnail: {
                url: user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }),
              },
              fields: [{
                name: "Username",
                value: `${target.toString()}`
              },
              {
                name: "Tag",
                value: `#${user.discriminator}`
              },
              {
                name: "ID",
                value: `${user.id}`
              },
              {
                name: "Bot",
                value: `${user.bot}`
              },
              {
                name: "User Status (In development, probably wont work)",
                value: presence?.activities.map(activity => `${activityType[activity.type]} ${activity.name}`).join('\n') || 'None'
              },
              {
                name: "Date Joined",
                value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`
              },
              {
                name: `Roles (${maxDisplayRoles(sortedRoles)} of ${sortedRoles.length})`,
                value: `${sortedRoles.slice(0, maxDisplayRoles(sortedRoles)).join(' ') || 'None'}`
              },
              {
                name: "User Boosting Server (Working status unknown)",
                value: roles.premiumSubscribeRole ? `Since <t:${parseInt(target.premiumSinceTimestamp / 1000)}:R>` : 'No'
              },
              {
                name: "Account Created",
                value: `${user.createdAt}`
              },
              {
                name: "Profile Banner",
                value: user.bannerUrl ? '** **' : 'None'
              },
              ],
			timestamp: new Date()
		}
      interaction.reply({ embeds: [firstEmbed] })
	},
};