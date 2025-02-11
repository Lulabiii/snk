const { EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, ComponentType, Events, SlashCommandBuilder  } = require('discord.js');
const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
const db = require('../../database.js');
const { validé } = require('../../Fonction_commandes/validé.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('payer')
        .setDescription("Permets à l'utilisateur de regarder les statistiques de lui-même ou d'un autre membre.")
        .addUserOption(option =>
            option.setName('membre')
                .setDescription("Mentionnez un membre pour voir ses statistiques.")
                .setRequired(true)
        )
        .addNumberOption(option =>
            option.setName('montant')
                .setDescription("Entrez le montant d'argent que vous voulez transferer.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const mentionedMember = interaction.options.getUser('membre');
        const targetMember = mentionedMember.id;
        const memberId = interaction.member.id;
        const montant = interaction.options.getNumber('montant');
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
            const [rows1] = await db.query(
                'SELECT argent FROM économie WHERE id_membre = ?;', [memberId]
            );
            const argent_membre_1 = rows1.length > 0 ? rows1[0].argent : null; 
            const [rows2] = await db.query(
                'SELECT argent FROM économie WHERE id_membre = ?;', [targetMember]
            );
            const argent_membre_2 = rows2.length > 0 ? rows2[0].argent : null; 
                        const row = new ActionRowBuilder().addComponents(
                                    new ButtonBuilder()
                                        .setCustomId('button_oui')
                                        .setLabel('✅')
                                        .setStyle('Success'),
                                    new ButtonBuilder()
                                        .setCustomId('button_non')
                                        .setLabel('❌')
                                        .setStyle('Danger')
                                );
                                if (montant > 'argent_membre_1') {
                                    await interaction.reply({
                                        embeds: [new EmbedBuilder()
                                            .setDescription(`
                                \`\`\` \`\`\`
                        
                                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:rp_alliance:1232763102991224833> ] — __Pᥲყᥱmᥱᥒt__**
                                <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez pas assez.**
                        
                                \`\`\` \`\`\`
                                            `)
                                            .setColor(0xFFFFFF)
                                            .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333077594857275423/INV_10_Fishing_DragonIslesCoins_Gold.png?ex=67acacc1&is=67ab5b41&hm=a8de7234ca309c9be7c18dbc6531017072056fde88ece9c76d63d8511ec70c0e&')
                                            .setImage('https://media1.tenor.com/m/8O90plJTiQYAAAAd/eren-eren-yeager.gif')
                                        ],
                                    });
                                    return;
                                }
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
        \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:rp_alliance:1232763102991224833> ] — __Pᥲყᥱmᥱᥒt__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, êtes-vous sûr de vouloir payer <@${targetMember}> [ __\`${montant}¥\`__ ] ?**

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:gold:1304167372999098489> ] — __Argᥱᥒt__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ <:1231609048273653801Copie:1304167335879381073> ] — __<@${memberId}>__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> \`${argent_membre_1 ?? 0}\`**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ <:1231609048273653801Copie:1304167335879381073> ] — __<@${targetMember}>__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> \`${argent_membre_2 ?? 0}\`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333077594857275423/INV_10_Fishing_DragonIslesCoins_Gold.png?ex=67acacc1&is=67ab5b41&hm=a8de7234ca309c9be7c18dbc6531017072056fde88ece9c76d63d8511ec70c0e&')
                    .setImage('https://cdn.discordapp.com/attachments/1305249322836693093/1331360828426817536/giphy.gif?ex=67ac5ca4&is=67ab0b24&hm=e22c3bd6fb4aa1a68722816321fecd9ff708a1a94fecd989f428fa6ed8e67f0e&')
                ],components : [row],
            });
            const filter = (btnInteraction) => btnInteraction.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
    
            collector.on('collect', async (btnInteraction) => {
                if (btnInteraction.customId === 'button_oui') {
                    await db.execute(
                        `UPDATE économie SET argent = argent - ${montant} WHERE id_membre = ?`,
                        [memberId]
                    );
                    await db.execute(
                        `UPDATE économie SET argent = argent + ${montant} WHERE id_membre = ?`,
                        [targetMember]
                    );
                    const [rows3] = await db.query(
                        'SELECT argent FROM économie WHERE id_membre = ?;', [memberId]
                    );
                    const argent_membre_3 = rows3.length > 0 ? rows3[0].argent : null; 
                    const [rows4] = await db.query(
                        'SELECT argent FROM économie WHERE id_membre = ?;', [targetMember]
                    );
                    const argent_membre_4 = rows4.length > 0 ? rows4[0].argent : null; 
                    await btnInteraction.reply({
                        embeds: [new EmbedBuilder()
                            .setDescription(`
                \`\`\` \`\`\`
        
                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:rp_alliance:1232763102991224833> ] — __Pᥲყᥱmᥱᥒt__**
                <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, les \`${montant}¥\` ont bien été envoyés à <@${targetMember}>.**
        
                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:gold:1304167372999098489> ] — __Argᥱᥒt__**
                <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ <:1231609048273653801Copie:1304167335879381073> ] — __<@${memberId}>__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> \`${argent_membre_3 ?? 0}\`**
                <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ <:1231609048273653801Copie:1304167335879381073> ] — __<@${targetMember}>__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> \`${argent_membre_4 ?? 0}\`**
        
                \`\`\` \`\`\`
                            `)
                            .setColor(0xFFFFFF)
                            .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333077594857275423/INV_10_Fishing_DragonIslesCoins_Gold.png?ex=67acacc1&is=67ab5b41&hm=a8de7234ca309c9be7c18dbc6531017072056fde88ece9c76d63d8511ec70c0e&')
                            .setImage('https://www.buzzfrance.fr/wp-content/uploads/2021/06/eren-snk.gif')
                        ],
                    });
                    collector.stop();
                } else if (btnInteraction.customId === 'button_non') {
                    await interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setDescription(`
                \`\`\` \`\`\`
        
                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:rp_alliance:1232763102991224833> ] — __Pᥲყᥱmᥱᥒt__**
                <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, le payement de \`${montant}¥\` à <@${targetMember}> a bien été annulé.**
        
                \`\`\` \`\`\`
                            `)
                            .setColor(0xFFFFFF)
                            .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333077594857275423/INV_10_Fishing_DragonIslesCoins_Gold.png?ex=67acacc1&is=67ab5b41&hm=a8de7234ca309c9be7c18dbc6531017072056fde88ece9c76d63d8511ec70c0e&')
                            .setImage('https://media1.tenor.com/m/8O90plJTiQYAAAAd/eren-eren-yeager.gif')
                        ],
                    });
                    collector.stop();
                    return;
                }
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
