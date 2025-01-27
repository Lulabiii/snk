const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const db = require('../database.js'); // Assurez-vous que ce chemin est correct

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apparenceˢᵉᵗ')
        .setDescription("Permets à un membre de définir son apparence sur le bot.")
        .addStringOption(option =>
            option
                .setName('lien')
                .setDescription('Lien de l\'image à afficher')
                .setRequired(true)
        ),
    async execute(interaction) {
        const imageUrl = interaction.options.getString('lien'); // Lien fourni par l'utilisateur (optionnel)  $
        const mentionedMemberId = interaction.user.id   
        if (imageUrl) {
            // Vérification si le lien semble être une image
            const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(imageUrl);
            if (!isImage) {
                await interaction.reply({
                    embeds: [{
                        description: `
    \`\`\` \`\`\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1231609048273653801Copie:1304167335879381073> ] — __Aρρᥲrᥱᥒᥴᥱ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, le lien fourni ne semble pas être une image valide. Utilisez un lien se terminant par [ \`.jpg\` ], [ \`.png\` ], [ \`.gif\` ], ou [ \`.webp\` ].**
    
    \`\`\` \`\`\`
                        `,
                        color: 0xFFFFFF,
                        thumbnail: {
                            url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304900535861907527/70_inscription_vantus_rune_nightmare.png?ex=673d9913&is=673c4793&hm=f6118ebdb60158f2977802688d9af4cfc32e72d596f7ca66730c7027d139fce2&',
                        },
                        image: {
                            url: 'https://media1.tenor.com/m/HLUBX7pAoDkAAAAd/eren-kruger.gif',
                        },
                    }],
                    flags: 64,
                });
            }
            else {
                await interaction.reply({
                    embeds: [{
                        description: `
    \`\`\` \`\`\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1231609048273653801Copie:1304167335879381073> ] — __Aρρᥲrᥱᥒᥴᥱ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, votre apparence a bien été mise à jours !**
    
    \`\`\` \`\`\`
                        `,
                        color: 0xFFFFFF,
                        thumbnail: {
                            url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1305252655047770254/Achievement_BG_tophealer_SOA.png?ex=673d8f83&is=673c3e03&hm=df1522d8e1172002250ded6c5d6619e06802ca98d376cb48819cb9c82439a444&',
                        },
                        image: {
                            url: imageUrl,
                        },
                    }],
                    flags: 0,
                });
                const connection = await db.getConnection();
                await connection.execute(
                    'UPDATE personnage SET apparence = ? WHERE id_membre = ?',
                    [imageUrl,mentionedMemberId]
                );
                connection.release();
                }
                }
    },
};
