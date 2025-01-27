const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const db = require('../database.js'); // Assurez-vous que ce chemin est correct
const embed_perm = require('../events/embed.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('validerᶠⁱᶜʰᵉ')
        .setDescription("Permets à un membre du staff de valider la fiche d'un membre.")
        .addUserOption(option =>
            option.setName('membre')
                .setDescription('Le membre dont la fiche doit être validée')
                .setRequired(true)
        ),
    async execute(interaction, client) { // Ajoute 'client' pour accéder au cache des salons
        const roleIdStaff = '1304183166008954991';
        const mentionedMember = interaction.options.getUser('membre');
        const roleStaff = interaction.member.roles.cache.has(roleIdStaff);
        const mentionedMemberId = mentionedMember.id

        if (roleStaff) {
            const connection = await db.getConnection();
            await connection.execute(
                'UPDATE personnage SET validé = ? WHERE id_membre = ?',
                ["Validé",mentionedMemberId]
            );
            connection.release();

            await interaction.reply({
                embeds: [{
                    description: `
\`\`\` \`\`\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1231609048273653801Copie:1304167335879381073> ] — __Vᥲᥣιdᥲtιoᥒ__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous avez bien validé <@${mentionedMemberId}> !**

\`\`\` \`\`\`
                    `,
                    color: 0xFFFFFF,
                    thumbnail: {
                        url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304896494977155092/INV_CHECKERED_FLAG.png?ex=67310f10&is=672fbd90&hm=aef2749ff4513ce1d5317f3a076c984bd8cdc3f6b7eee209a0cebc737bd05dc7&',
                    },
                    image: {
                        url: 'https://c.tenor.com/FavFrpFfiVkAAAAC/tenor.gif',
                    },
                }],
                flags: 0,
            });

            // Envoie un message dans le salon spécifique
            const targetChannel = interaction.client.channels.cache.get('1304183515084230677');
            if (targetChannel) {
                await targetChannel.send({
                    embeds: [{
                        description: `
    \`\`\` \`\`\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1231609048273653801Copie:1304167335879381073> ] — __Vᥲᥣιdᥲtιoᥒ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **<@${mentionedMemberId}> vient de se recenser !**
    
    \`\`\` \`\`\`
                    `,
                        color: 0xFFFFFF,
                        thumbnail: {
                            url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304896494977155092/INV_CHECKERED_FLAG.png',
                        },
                        image: {
                            url: 'https://c.tenor.com/FavFrpFfiVkAAAAC/tenor.gif',
                        },
                    }],
                });
            } else {
                console.error('Le salon cible est introuvable.');
            }
        } else {
            await embed_perm.execute(interaction);
            return;
        };
    }
}