const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const db = require('../database.js');

async function membrehp(interaction, memberId) {

        try {
            const [[{ hp } = {}]] = await db.query(
                'SELECT hp FROM personnage WHERE id_membre = ?;', [memberId]
            );
            let hpzero = false;
            if (hp === 0) {
                hpzero = true;
                await interaction.followUp({
                    embeds: [new EmbedBuilder()
                        .setDescription(`
            \`\`\` \`\`\`
    
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1232763481934270535:1304167342384611459> ] — __Mortᴿᴾ__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **<@${memberId}>, vous venez de mourir. Veuillez contacter un staff afin de pouvoir recréer un personnage.**
    
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1231609048273653801Copie:1304167335879381073> ] — __Pᥱrsoᥒᥒᥲgᥱ__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ __\`HP\`__ ] — __\`${hp ?? 0}\`__**
    
            \`\`\` \`\`\`
                        `)
                        .setColor(0xFFFFFF)
                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1337783534454177842/INV_Misc_Bone_Skull_01.png?ex=67a8b381&is=67a76201&hm=c56f2a460895ac77285639f2992fdeff37f025964ed4ecac63f43ea351e62b19&')
                        .setImage('https://media1.tenor.com/m/utKHtsqrcvMAAAAd/zeke-yeager-zeak.gif')
                    ],
                });
            }
            else {
                hpzero = false;
            }
            return hpzero;
        } catch (error) {
            console.error('Erreur dans membrehp:', error);
            return null;
        }
}
module.exports = { membrehp };