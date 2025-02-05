const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const db = require('../database.js');

async function stats(interaction, memberId, item, membreTrade) {
    try {
            try {
                let item_mot = '';
                if ( item === 'saumon') {
                    item_mot = 'Saumon';
                } else if ( item === 'bar') {
                    item_mot = 'Bar';
                }else if ( item === 'truite') {
                    item_mot = 'Truite';
                }else if ( item === 'sardine') {
                    item_mot = 'Sardine';
                }else if ( item === 'bulot') {
                    item_mot = 'Bulot';
                }else if ( item === 'vieille') {
                    item_mot = 'Vieille';
                }else if ( item === 'thon') {
                    item_mot = 'Thon';
                }else if ( item === 'dorade') {
                    item_mot = 'Dorade';
                }else if ( item === 'lieu') {
                    item_mot = 'Lieu';
                }else if ( item === 'pain') {
                    item_mot = 'Pain';
                }else if ( item === 'entre_côte') {
                    item_mot = 'Entrecôte';
                }else if ( item === 'jambon') {
                    item_mot = 'Jambon';
                }else if ( item === 'faux_filet') {
                    item_mot = 'Faux filet';
                }else if ( item === 'bavette') {
                    item_mot = 'Bavette';
                }else if ( item === 'saucisse') {
                    item_mot = 'Saucisse';
                }else if ( item === 'tranche_grasse') {
                    item_mot = 'Tranche grasse';
                }else if ( item === 'orange') {
                    item_mot = 'Orange';
                }else if ( item === 'poire') {
                    item_mot = 'Poire';
                }else if ( item === 'cerise') {
                    item_mot = 'Cerise';
                }else if ( item === 'raisin') {
                    item_mot = 'Raisin';
                }else if ( item === 'banane') {
                    item_mot = 'Banane';
                }else if ( item === 'pomme') {
                    item_mot = 'Pomme';
                }else if ( item === 'avocat') {
                    item_mot = 'Avocat';
                }else if ( item === 'framboise') {
                    item_mot = 'Framboise';
                }else if ( item === 'mûre') {
                    item_mot = 'Mûre';
                }else if ( item === 'pruneau') {
                    item_mot = 'Pruneau';
                }else if ( item === 'blé') {
                    item_mot = 'Blé';
                }else if ( item === 'salade') {
                    item_mot = 'Salade';
                }else if ( item === 'carotte') {
                    item_mot = 'Carotte';
                }else if ( item === 'patate') {
                    item_mot = 'Patate';
                }else if ( item === 'chou') {
                    item_mot = 'Chou';
                }else if ( item === 'tomate') {
                    item_mot = 'Tomate';
                }else if ( item === 'sablier_d_entrainement') {
                    item_mot = 'Sablier d\'entraînement';
                }else if ( item === 'coffre_normal') {
                    item_mot = 'Coffre normal';
                }else if ( item === 'coffre_rare') {
                    item_mot = 'Coffre rare';
                }else if ( item === 'coffre_epique') {
                    item_mot = 'Coffre épique';
                }else if ( item === 'coffre_legendaire') {
                    item_mot = 'Coffre légendaire';
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
    
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Profιᥣ__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, voici vos statistiques :**
    
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Stᥲtιstιqᥙᥱs__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ <:force:1304167448840245289> ] — __Forᥴᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> \`${level_force ?? 0}\`**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ <:agilite:1331383911057723534> ] — __Agιᥣιtᥱ́__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> \`${level_agilite ?? 0}\`**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ <:endurance:1304167362332852285> ] — __Rᥱ́sιstᥲᥒᥴᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> \`${level_resistance ?? 0}\`**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ <:1256582963995611307:1304167353755369513> ] — __Sᥲbrᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> \`${level_sabre ?? 0}\`**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ <:1266766028021563465:1304167360495747174> ] — __Trιdιmᥱᥒsιoᥒᥒᥲᥣιtᥱ́__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> \`${level_tridi ?? 0}\`**
    
            \`\`\` \`\`\`
                        `)
                        .setColor(0xFFFFFF)
                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1304540451642015795/Ability_Evoker_TipTheScales.png?ex=6792a3f8&is=67915278&hm=2b00d1985bb1d5bdc2d209338698916530ac4455169ff658ef330529172d972a&')
                        .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
                    ],components: [row]
                });
            const filter = (btnInteraction2) => btnInteraction2.user.id === membreTrade;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
    
            collector.on('collect', async (btnInteraction2) => {
                if (btnInteraction2.customId === 'button_oui') {

                }
                else if (btnInteraction2.customId === 'button_non') {

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
        } catch (error) {
        console.error('Erreur lors de l\'utilisation de la commande stats :', error);
    }
}
module.exports = { trade };