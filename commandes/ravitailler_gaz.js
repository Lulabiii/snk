const { Events, AttachmentBuilder, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const db = require('../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gazʳᵃᵛⁱᵗᵃⁱˡˡᵉʳ')
        .setDescription("Permets à l'utilisateur de se ravitailler en gaz."),

    async execute(interaction) {
        const mentionedMember = interaction.options.getUser('membre');
        const targetMember = mentionedMember || interaction.member; // Si pas de membre mentionné, prendre celui qui utilise la commande
        const memberId = targetMember.id;
        const currentTime = Math.floor(Date.now() / 1000); // Temps actuel en secondes (timestamp)
        const cooldownTime = 10 * 60 * 60; // Cooldown de 10 heures en secondes
        const expirationTime = currentTime + cooldownTime;

        try {
            const [result] = await db.query(
                'SELECT gaz, reminder_gaz FROM cooldown WHERE id_membre = ?',
                [memberId]
            );

            if (result.length > 0) {
                const { gaz, reminder_gaz } = result[0];

                // Si le cooldown est actif
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
                        'UPDATE cooldown SET gaz = ?, reminder_gaz = 0, prévenu = 0 WHERE id_membre = ?',
                        [expirationTime, memberId]
                    );
                    // Mise à jour des sabliers et du cooldown
                    await db.execute(
                        'UPDATE personnage SET gaz = 100 WHERE id_membre = ?',
                        [memberId]
                    );
    
                    const [newRow] = await db.execute(
                        'SELECT gaz FROM personnage WHERE id_membre = ?',
                        [memberId]
                    );
                    const montant2 = newRow[0]?.gaz || 0;
    
                    // Répond à l'utilisateur après l'utilisation du sablier
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
                                .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332844079049871390/ability_rogue_smoke.png?ex=6796bb47&is=679569c7&hm=0af3f0bffb75766922e5f6ea7e9732a8ad41e9e2600fa249b436b53b3eb58c75&')
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

const config = require('../config.json');
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
