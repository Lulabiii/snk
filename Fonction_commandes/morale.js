const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const db = require('../database.js');

async function morale(interaction, memberId) {
    try {
        const [[{ morale } = {}]] = await db.query(
            'SELECT morale FROM personnage WHERE id_membre = ?;', [memberId]
        );
        await interaction.reply({
            embeds: [new EmbedBuilder()
                .setDescription(`
    \`\`\` \`\`\`

    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Profιᥣ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, voici votre réputation :**

    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:utilisateur:1237148938604122152> ] — __Rᥱ́ρᥙtᥲtιoᥒ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ <:rp_alliance:1232763102991224833> ] — __Morᥲᥣᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> \`${morale ?? 0}\`**

    \`\`\` \`\`\`
                `)
                .setColor(0xFFFFFF)
                .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1334628569854378045/8XP_VulperaFlute.png?ex=679d3937&is=679be7b7&hm=3f0c41eed4d56c88d0838cfb8fde6d5fb6c3d07055488c3b7bb484e483af2fec&')
                .setImage('https://media1.tenor.com/m/FgaXbmhn7LAAAAAd/saul-titan-saul-goodman.gif')
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
module.exports = { morale };
