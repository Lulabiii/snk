const { Events, AttachmentBuilder, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const db = require('../../database.js');
const { validé } = require('../../Fonction_commandes/validé.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('argentʲᵒᵘʳⁿᵃˡⁱᵉʳ')
        .setDescription("Permets à l'utilisateur d'obtenir un petit montant d'argent chaque jours."),

    async execute(interaction) {
        const mentionedMember = interaction.options.getUser('membre');
        const targetMember = mentionedMember || interaction.member;
        const memberId = targetMember.id;
        const currentTime = Math.floor(Date.now() / 1000);
        const cooldownTime = 24 * 60 * 60;
        const expirationTime = currentTime + cooldownTime;

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
            const [result] = await db.query(
                'SELECT daily, prévenu_daily FROM cooldown WHERE id_membre = ?',
                [memberId]
            );

            if (result.length > 0) {
                const { daily, prévenu_daily } = result[0];

                if (currentTime < daily) {
                    const remainingTime = daily - currentTime;
                    const hours = Math.floor(remainingTime / 3600);
                    const minutes = Math.floor((remainingTime % 3600) / 60);

                    await interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setDescription(`
        \`\`\` \`\`\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:gold:1304167372999098489> ] — __Argᥱᥒt__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous devez attendre encore __\`${hours}\`__ heures et __\`${minutes}\`__ minutes.**
        
        \`\`\` \`\`\`
                            `)
                            .setColor(0xFFFFFF)
                            .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333077594857275423/INV_10_Fishing_DragonIslesCoins_Gold.png?ex=67a4c3c1&is=67a37241&hm=f31d20ef2a82eb708986ae59c9ceba6ae97edea08283b430028fdc71af92c78d&')
                            .setImage('https://www.buzzfrance.fr/wp-content/uploads/2021/06/eren-snk.gif')
                        ],
                        flags: 64,
                    });

                    return;
                }
            } else {
                await db.query(
                    'INSERT INTO cooldown (id_membre, daily, prévenu_daily) VALUES (?, ?, 0)',
                    [memberId, expirationTime]
                );
            }
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
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
        \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:gold:1304167372999098489> ] — __Argᥱᥒt__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, souhaitez réellement obtenir votre argent journalier ? Il vous faudra ensuite attendre 24 heures afin de pouvoir l'obtenir à nouveau.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333077594857275423/INV_10_Fishing_DragonIslesCoins_Gold.png?ex=67a4c3c1&is=67a37241&hm=f31d20ef2a82eb708986ae59c9ceba6ae97edea08283b430028fdc71af92c78d&')
                    .setImage('https://www.buzzfrance.fr/wp-content/uploads/2021/06/eren-snk.gif')
                ],
                components: [row]
            });
            const filter = (btnInteraction) => btnInteraction.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
    
            collector.on('collect', async (btnInteraction) => {
                if (btnInteraction.customId === 'button_oui') {
                    await db.query(
                        'UPDATE cooldown SET daily = ?, prévenu_daily = 0 WHERE id_membre = ?',
                        [expirationTime, memberId]
                    );
                    const argent_random = Math.floor(Math.random() * 1000) + 1;
                    await db.execute(
                        'UPDATE économie SET argent = argent + ? WHERE id_membre = ?',
                        [argent_random, memberId]
                    );
    
                    const [newRow] = await db.execute(
                        'SELECT argent FROM économie WHERE id_membre = ?',
                        [memberId]
                    );
                    const montant2 = newRow[0]?.argent || 0;
    

                    btnInteraction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`
                                \`\`\` \`\`\`
    
                                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:gold:1304167372999098489> ] — __Argᥱᥒt__**
                                <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, l'argent vous a bien été donné, vous avez désormais [ __\`${montant2}¥\`__ ].**
                                <:Sans_titre_349_20240519142111Cop:1304168162392019066> [ __\`+${argent_random}¥\`__ ]
    
                                \`\`\` \`\`\`
                            `)
                                .setColor(0xFFFFFF)
                                .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333077594857275423/INV_10_Fishing_DragonIslesCoins_Gold.png?ex=67a4c3c1&is=67a37241&hm=f31d20ef2a82eb708986ae59c9ceba6ae97edea08283b430028fdc71af92c78d&')
                                .setImage('https://www.buzzfrance.fr/wp-content/uploads/2021/06/eren-snk.gif')
                        ]
                    });
                    collector.stop();
                } else if (btnInteraction.customId === 'button_non') {
                    btnInteraction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`
                                \`\`\` \`\`\`
    
                                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:gold:1304167372999098489> ] — __Argᥱᥒt__**
                                <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, l'obtention a bien été annulé, le cooldown n'a donc pas été utilisé.**
    
                                \`\`\` \`\`\`
                            `)
                                .setColor(0xFFFFFF)
                                .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333077594857275423/INV_10_Fishing_DragonIslesCoins_Gold.png?ex=67a4c3c1&is=67a37241&hm=f31d20ef2a82eb708986ae59c9ceba6ae97edea08283b430028fdc71af92c78d&')
                                .setImage('https://www.buzzfrance.fr/wp-content/uploads/2021/06/eren-snk.gif')
                        ]
                    });
                    collector.stop();
                }
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

const config = require('../../config.json');
        const { Client, GatewayIntentBits } = require('discord.js');
        const client = new Client({
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
            token: config.token
        });
        client.login(config.token)
setInterval(async () => {
    try {
        const [results] = await db.query(`
            SELECT id_membre 
            FROM cooldown 
            WHERE daily <= UNIX_TIMESTAMP() 
            AND prévenu_daily = 0
        `);

        for (const { id_membre } of results) {
            const user = await client.users.fetch(id_membre);
            if ((await validé(id_membre)) === false) {
                return;
            }
            if (user) {
                await user.send({
                    embeds: [{
                        description: `
    \`\`\` \`\`\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:gold:1304167372999098489> ] — __Argᥱᥒt__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${user}, le cooldown de votre obtention d'argent journalier vient de passer à l'instant, vous pouvez vous ravitailler à nouveau en utilisant la commande \`/argentʲᵒᵘʳⁿᵃˡⁱᵉʳ\`.**
    
    \`\`\` \`\`\`
                        `,
                        color: 0xFFFFFF,
                        thumbnail: {
                            url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1333077594857275423/INV_10_Fishing_DragonIslesCoins_Gold.png?ex=67a4c3c1&is=67a37241&hm=f31d20ef2a82eb708986ae59c9ceba6ae97edea08283b430028fdc71af92c78d&',
                        },
                        image: {
                            url: 'https://www.buzzfrance.fr/wp-content/uploads/2021/06/eren-snk.gif',
                        },
                    }],
                    flags: 0,
                });
                await db.query('UPDATE cooldown SET prévenu_daily = 1 WHERE id_membre = ?', [id_membre]);
            }
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi des rappels :', error);
    }
}, 10000);
