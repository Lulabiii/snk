const { Events, AttachmentBuilder, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const db = require('../../database.js');
const { validé } = require('../../Fonction_commandes/validé.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gaz')
        .setDescription("Permets de voir le gaz qu'il reste à l'utilisateur.")
        .addUserOption(option =>
            option.setName('membre')
                .setDescription("Mentionnez un membre pour voir son gaz.")
                .setRequired(false)
        ),

    async execute(interaction) {
        const mentionedMember = interaction.options.getUser('membre');
        const targetMember = mentionedMember || interaction.member;
        const memberId = targetMember.id;
        try {
            if ((await validé(memberId)) === false) {
                await interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setDescription(`
                \`\`\` \`\`\`
                
                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Profιᥣ__**
                <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'êtes pas validé et ne pouvez en conséquent pas effectuer cette commande.**
                
                \`\`\` \`\`\`
                        `)
                        .setColor(0xFFFFFF)
                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1304540451910455326/Ability_Evoker_Rewind.png?ex=67ac5938&is=67ab07b8&hm=56a56fe6b8a79e8e664d2d3fe5017e5e143cc3c6a10a02d9b5d3ecb57c7cead2&')
                        .setImage('https://media1.tenor.com/m/8O90plJTiQYAAAAd/eren-eren-yeager.gif')
                    ], flags :64,
                });
                return;
            }
            let [[{ gaz } = {}]] = await db.query(
                'SELECT gaz FROM personnage WHERE id_membre = ?;', [memberId]
            );
            if (gaz === null) {
                gaz = 0
            }
            const userDisplayName = mentionedMember ? mentionedMember.username : interaction.user.username;
            let phrase = '';
            if (gaz > 20) {
                phrase = 'Aucun besoin de ravitaillement pour l\'instant, cependant restez vigilant.';
            } else if (gaz < 20) {
                phrase = 'Vous devriez vous ravitailler en gaz le plus vite possible.';
            }

            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
        \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:gas:1226500556197986406> ] — __Gᥲz__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, il vous reste __\`${gaz}%\`__ de gaz. ${phrase}**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332844079049871390/ability_rogue_smoke.png?ex=6796bb47&is=679569c7&hm=0af3f0bffb75766922e5f6ea7e9732a8ad41e9e2600fa249b436b53b3eb58c75&')
                    .setImage('https://media1.tenor.com/m/mIk7Nji5JrgAAAAd/snk-levi.gif')
                ],
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription("❌ Une erreur est survenue lors de la récupération des données.")
                    .setColor(0xFF0000)
                ],
                flags: 64,
            });
        }
    }
}