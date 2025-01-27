const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const db = require('../database.js');

async function sablier_entrainement(interaction, memberId) {
    try {
        // Récupère la valeur de sablier_d_entrainement
        const [rows] = await db.execute(
            'SELECT sablier_d_entrainement FROM personnage WHERE id_membre = ?;', 
            [memberId]
        );

        const montant = rows[0]?.sablier_d_entrainement || 0;

        // Si l'utilisateur n'a pas de sabliers, envoie un message d'erreur
        if (montant === 0) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`
                        \`\`\` \`\`\`

                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:inventaire:1234628961389121647> ] — __Sᥲbᥣιᥱr d'ᥱᥒtrᥲιᥒᥱmᥱᥒt__**
                        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun sablier à utiliser.**

                        \`\`\` \`\`\`
                    `)
                        .setColor(0xFFFFFF)
                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332821256810270860/INV_Relics_Hourglass.png?ex=6796a606&is=67955486&hm=9cc45232f332b563a9d3dad6d25776ae73bb754c6a6873c826d91f8467682cfa&')
                        .setImage('https://cdn.discordapp.com/attachments/1305249322836693093/1331360828426817536/giphy.gif?ex=67969be4&is=67954a64&hm=f3fb18a2bcaf9dffc11eba35b1638a9e841e7862b637877a3b6c4dc478361da9&')
                ]
            });
        }

        // Crée les boutons pour la confirmation
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
            embeds: [
                new EmbedBuilder()
                    .setDescription(`
                    \`\`\` \`\`\`

                    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:inventaire:1234628961389121647> ] — __Sᥲbᥣιᥱr d'ᥱᥒtrᥲιᥒᥱmᥱᥒt__**
                    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, êtes-vous sûr de vouloir en utiliser un ?**
                    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **__Sᥲbᥣιᥱr d'ᥱᥒtrᥲιᥒᥱmᥱᥒt__** <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ __\`${montant}\`__ ]**

                    \`\`\` \`\`\`
                `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332821256810270860/INV_Relics_Hourglass.png?ex=6796a606&is=67955486&hm=9cc45232f332b563a9d3dad6d25776ae73bb754c6a6873c826d91f8467682cfa&')
                    .setImage('https://cdn.discordapp.com/attachments/1305249322836693093/1331360828426817536/giphy.gif?ex=67969be4&is=67954a64&hm=f3fb18a2bcaf9dffc11eba35b1638a9e841e7862b637877a3b6c4dc478361da9&')
            ],
            components: [row]
        });

        // Création du collector pour gérer les interactions avec les boutons
        const filter = (btnInteraction) => btnInteraction.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async (btnInteraction) => {
            if (btnInteraction.customId === 'button_oui') {
                // Mise à jour des sabliers et du cooldown
                await db.execute(
                    'UPDATE personnage SET sablier_d_entrainement = sablier_d_entrainement - 1 WHERE id_membre = ?',
                    [memberId]
                );

                const [newRow] = await db.execute(
                    'SELECT sablier_d_entrainement FROM personnage WHERE id_membre = ?',
                    [memberId]
                );

                const montant2 = newRow[0]?.sablier_d_entrainement || 0;

                await db.execute(
                    'UPDATE cooldown SET train = 0, reminder_sent = 0 WHERE id_membre = ?',
                    [memberId]
                );

                // Répond à l'utilisateur après l'utilisation du sablier
                btnInteraction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`
                            \`\`\` \`\`\`

                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:inventaire:1234628961389121647> ] — __Sᥲbᥣιᥱr d'ᥱᥒtrᥲιᥒᥱmᥱᥒt__**
                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, un sablier a bien été utilisé, le cooldown de votre entrainement a été remis à 0 ! Il vous reste désormais [ __ \`${montant2}\`__ ] sabliers.**

                            \`\`\` \`\`\`
                        `)
                            .setColor(0xFFFFFF)
                            .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332821256810270860/INV_Relics_Hourglass.png?ex=6796a606&is=67955486&hm=9cc45232f332b563a9d3dad6d25776ae73bb754c6a6873c826d91f8467682cfa&')
                            .setImage('https://cdn.discordapp.com/attachments/1305249322836693093/1331360828426817536/giphy.gif?ex=67969be4&is=67954a64&hm=f3fb18a2bcaf9dffc11eba35b1638a9e841e7862b637877a3b6c4dc478361da9&')
                    ]
                });
                collector.stop();
            } else if (btnInteraction.customId === 'button_non') {
                btnInteraction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`
                            \`\`\` \`\`\`

                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:inventaire:1234628961389121647> ] — __Sᥲbᥣιᥱr d'ᥱᥒtrᥲιᥒᥱmᥱᥒt__**
                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, aucun sablier n'a été utilisé.**

                            \`\`\` \`\`\`
                        `)
                            .setColor(0xFFFFFF)
                            .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332821256810270860/INV_Relics_Hourglass.png?ex=6796a606&is=67955486&hm=9cc45232f332b563a9d3dad6d25776ae73bb754c6a6873c826d91f8467682cfa&')
                            .setImage('https://cdn.discordapp.com/attachments/1305249322836693093/1331360828426817536/giphy.gif?ex=67969be4&is=67954a64&hm=f3fb18a2bcaf9dffc11eba35b1638a9e841e7862b637877a3b6c4dc478361da9&')
                    ]
                });
                collector.stop();
            }
        });
    } catch (error) {
        console.error('Erreur lors de l\'utilisation du sablier :', error);
    }
}

module.exports = { sablier_entrainement };