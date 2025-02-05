const { Events, AttachmentBuilder, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const db = require('../../database.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('argentᶜʰᵉᶜᵏ')
        .setDescription("Permets à l'utilisateur de regarder son argent ou celui d'un autre.")
        .addUserOption(option =>
            option.setName('membre')
                .setDescription("Mentionnez un membre pour voir son argent.")
                .setRequired(false)
        ),

    async execute(interaction) {
        const mentionedMember = interaction.options.getUser('membre');
        const targetMember = mentionedMember || interaction.member;
        const memberId = targetMember.id;

        try {
            const [[{ argent } = {}]] = await db.query(
                'SELECT argent FROM économie WHERE id_membre = ?;', [memberId]
            );

            const userDisplayName = mentionedMember ? mentionedMember.username : interaction.user.username;

            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
        \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Profιᥣ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, voici votre porte-monnaie :**

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:gold:1304167372999098489> ] — __Argᥱᥒt__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ __\`Argᥱᥒt\`__ ] — __\`${argent ?? 0}\`__**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333077594857275423/INV_10_Fishing_DragonIslesCoins_Gold.png?ex=679794c1&is=67964341&hm=c568764b92cbb26ee51fc5a8a9f5624000611a0ea4a971cb16dd5f124d7b0a80&')
                    .setImage('https://media1.tenor.com/m/pNosOimg4D0AAAAd/aot-eren-yeager.gif')
                ],
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription("❌ Une erreur est survenue lors de la récupération des statistiques.")
                    .setColor(0xFF0000)
                ],
                flags: 64,
            });
        }
    }
};
