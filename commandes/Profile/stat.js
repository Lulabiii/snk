const { Events, AttachmentBuilder, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
const db = require('../../database.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('statistiques')
        .setDescription("Permets à l'utilisateur de regarder les statistiques de lui-même ou d'un autre membre.")
        .addUserOption(option =>
            option.setName('membre')
                .setDescription("Mentionnez un membre pour voir ses statistiques.")
                .setRequired(false)
        ),

    async execute(interaction) {
        const mentionedMember = interaction.options.getUser('membre');
        const targetMember = mentionedMember || interaction.member;
        const memberId = targetMember.id;

        try {
            const [[{ level_force } = {}]] = await db.query(
                'SELECT level_force FROM entrainement WHERE id_membre = ?;', [memberId]
            );
            const [[{ level_agilite } = {}]] = await db.query(
                'SELECT level_agilite FROM entrainement WHERE id_membre = ?;', [memberId]
            );
            const [[{ level_resistance } = {}]] = await db.query(
                'SELECT level_resistance FROM entrainement WHERE id_membre = ?;', [memberId]
            );
            const [[{ level_sabre } = {}]] = await db.query(
                'SELECT level_sabre FROM entrainement WHERE id_membre = ?;', [memberId]
            );
            const [[{ level_tridi } = {}]] = await db.query(
                'SELECT level_tridi FROM entrainement WHERE id_membre = ?;', [memberId]
            );

            const userDisplayName = mentionedMember ? mentionedMember.username : interaction.user.username;

            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
        \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Profιᥣ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, voici vos statistiques :**

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Stᥲtιstιqᥙᥱs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ <:force:1304167448840245289> ] — __Forᥴᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> \`${level_force ?? 0}\`**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ <:agilite:1331383911057723534> ] — __Agιᥣιtᥱ́__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> \`${level_agilite ?? 0}\`**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ <:endurance:1304167362332852285> ] — __Rᥱ́sιstᥲᥒᥴᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> \`${level_resistance ?? 0}\`**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ <:1256582963995611307:1304167353755369513> ] — __Sᥲbrᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> \`${level_sabre ?? 0}\`**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ <:1266766028021563465:1304167360495747174> ] — __Trιdιmᥱᥒsιoᥒᥒᥲᥣιtᥱ́__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> \`${level_tridi ?? 0}\`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1304540451642015795/Ability_Evoker_TipTheScales.png?ex=6792a3f8&is=67915278&hm=2b00d1985bb1d5bdc2d209338698916530ac4455169ff658ef330529172d972a&')
                    .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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
