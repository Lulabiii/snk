const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const db = require('../database.js');

async function argent(interaction, memberId) {

        try {
            const [[{ argent } = {}]] = await db.query(
                'SELECT argent FROM économie WHERE id_membre = ?;', [memberId]
            );
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
module.exports = { argent };