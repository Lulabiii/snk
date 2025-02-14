const { Events, AttachmentBuilder, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const db = require('../../database.js');
const { validé } = require('../../Fonction_commandes/validé.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gazʳᵃᵛⁱᵗᵃⁱˡˡᵉʳ')
        .setDescription("Permets à l'utilisateur de se ravitailler en gaz."),

    async execute(interaction) {
        const mentionedMember = interaction.options.getUser('membre');
        const targetMember = mentionedMember || interaction.member;
        const memberId = targetMember.id;
        const currentTime = Math.floor(Date.now() / 1000);
        const cooldownTime = 10 * 60 * 60;
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
                'SELECT gaz, reminder_gaz FROM cooldown WHERE id_membre = ?',
                [memberId]
            );

            if (result.length > 0) {
                const { gaz, reminder_gaz } = result[0];

                if (currentTime < gaz) {
                    const remainingTime = gaz - currentTime;
                    const hours = Math.floor(remainingTime / 3600);
                    const minutes = Math.floor((remainingTime % 3600) / 60);

                    await interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setDescription(`
        \`\`\` \`\`\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:gas:1226500556197986406> ] — __Rᥲvιtᥲιᥣᥣᥱmᥱᥒt__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous devez attendre encore __\`${hours}\`__ heures et __\`${minutes}\`__ minutes.**
        
        \`\`\` \`\`\`
                            `)
                            .setColor(0xFFFFFF)
                            .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332844079049871390/ability_rogue_smoke.png?ex=6796bb47&is=679569c7&hm=0af3f0bffb75766922e5f6ea7e9732a8ad41e9e2600fa249b436b53b3eb58c75&')
                            .setImage('https://media1.tenor.com/m/mIk7Nji5JrgAAAAd/snk-levi.gif')
                        ],
                        flags: 64,
                    });

                    return;
                }
            } else {
                await db.query(
                    'INSERT INTO cooldown (id_membre, gaz, reminder_gaz) VALUES (?, ?, 0)',
                    [memberId, expirationTime]
                );
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:gas:1226500556197986406> ] — __Rᥲvιtᥲιᥣᥣᥱmᥱᥒt__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, il vous reste __\`${gaz}%\`__ de gaz. Souhaitez-vous réellement vous ravitailler ? Il vous faudra ensuite attendre 10 heures afin de pouvoir vous ravitailler à nouveau.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332844079049871390/ability_rogue_smoke.png?ex=6796bb47&is=679569c7&hm=0af3f0bffb75766922e5f6ea7e9732a8ad41e9e2600fa249b436b53b3eb58c75&')
                    .setImage('https://media1.tenor.com/m/mIk7Nji5JrgAAAAd/snk-levi.gif')
                ],
                components: [row]
            });
            const filter = (btnInteraction) => btnInteraction.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
    
            collector.on('collect', async (btnInteraction) => {
                if (btnInteraction.customId === 'button_oui') {
                    await db.query(
                        'UPDATE cooldown SET gaz = ?, reminder_gaz = 0 WHERE id_membre = ?',
                        [expirationTime, memberId]
                    );
                    await db.execute(
                        'UPDATE personnage SET gaz = 100 WHERE id_membre = ?',
                        [memberId]
                    );
    
                    const [newRow] = await db.execute(
                        'SELECT gaz FROM personnage WHERE id_membre = ?',
                        [memberId]
                    );
                    const montant2 = newRow[0]?.gaz || 0;
    

                    btnInteraction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`
                                \`\`\` \`\`\`
    
                                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:gas:1226500556197986406> ] — __Rᥲvιtᥲιᥣᥣᥱmᥱᥒt__**
                                <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, le ravitaillement a bien été accompli, votre montant de gaz est désormais au maximum, mais restez tout de même vigilent !**
    
                                \`\`\` \`\`\`
                            `)
                                .setColor(0xFFFFFF)
                                .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332844079049871390/ability_rogue_smoke.png?ex=6796bb47&is=679569c7&hm=0af3f0bffb75766922e5f6ea7e9732a8ad41e9e2600fa249b436b53b3eb58c75&')
                                .setImage('https://media1.tenor.com/m/mIk7Nji5JrgAAAAd/snk-levi.gif')
                        ]
                    });
                    collector.stop();
                } else if (btnInteraction.customId === 'button_non') {
                    btnInteraction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`
                                \`\`\` \`\`\`
    
                                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:gas:1226500556197986406> ] — __Rᥲvιtᥲιᥣᥣᥱmᥱᥒt__**
                                <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, le ravitaillement a été annulé, le cooldown n'a donc pas été utilisé.**
    
                                \`\`\` \`\`\`
                            `)
                                .setColor(0xFFFFFF)
                                .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                                .setImage('https://media1.tenor.com/m/mIk7Nji5JrgAAAAd/snk-levi.gif')
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
            WHERE gaz <= UNIX_TIMESTAMP() 
            AND reminder_gaz = 0
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
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:gas:1226500556197986406> ] — __Rᥲvιtᥲιᥣᥣᥱmᥱᥒt__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${user}, le cooldown de votre ravitaillement vient de passer à l'instant, vous pouvez vous ravitailler à nouveau en utilisant la commande \`/gazʳᵃᵛⁱᵗᵃⁱˡˡᵉʳ\`.**
    
    \`\`\` \`\`\`
                        `,
                        color: 0xFFFFFF,
                        thumbnail: {
                            url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1332844079049871390/ability_rogue_smoke.png?ex=6796bb47&is=679569c7&hm=0af3f0bffb75766922e5f6ea7e9732a8ad41e9e2600fa249b436b53b3eb58c75&',
                        },
                        image: {
                            url: 'https://media1.tenor.com/m/q_bKbilDt9kAAAAd/aot-attack.gif',
                        },
                    }],
                    flags: 0,
                });
                await db.query('UPDATE cooldown SET reminder_gaz = 1 WHERE id_membre = ?', [id_membre]);
            }
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi des rappels :', error);
    }
}, 60000);
