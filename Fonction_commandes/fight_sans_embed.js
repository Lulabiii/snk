const { EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, Events } = require('discord.js');
const db = require('../database');
const { fight } = require('../Fonction_commandes/fight.js');

async function fight_sans_embed(interaction, memberId) {
    try {
                await fight(memberId);

                // Attendre les résultats de la requête SQL
                const [[{ hp } = {}]] = await db.query(
                    'SELECT hp FROM personnage WHERE id_membre = ?;', [memberId]
                );
                const [[result]] = await db.query('SELECT hp, taille FROM fight WHERE id_membre = ?;', ['690553892013867099']);
                const { hp: hp_titan, taille: taille_titan } = result;

                const connection = await db.getConnection();
                const [rows] = await connection.execute(
                    'SELECT level_force, level_agilite, level_resistance, level_sabre, level_tridi FROM entrainement WHERE id_membre = ?',
                    [memberId]
                );

                const {
                    level_force = 0,
                    level_agilite = 0,
                    level_resistance = 0,
                    level_sabre = 0,
                    level_tridi = 0,
                } = rows[0];

                let degats_membre_multiplicateur = Math.floor(hp_titan / 4) + level_force *2;
                let degats_titan_multiplicateur = Math.floor(taille_titan / 2);
                const degats_titan = degats_titan_multiplicateur - level_resistance - (level_agilite / 2) - (level_tridi / 2);
                const degats_membre = degats_membre_multiplicateur + (level_force*2) + (level_sabre / 2);
                // Attendre la réponse avant d'envoyer l'embed
                const channel = interaction.channel;
                await channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`
\`\`\` \`\`\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1232763481934270535:1304167342384611459> ] — __Tιtᥲᥒ__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **<@${memberId}>, vous arrivez à bien toucher le titan cependant le combat n'est pas terminé, faites attention !**

<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ __\`Dégâts effectués\`__ ] <:Sans_titre_349_20240518230508Cop:1304168153680707604> __${degats_membre}__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ __\`Dégâts subis\`__ ] <:Sans_titre_349_20240518230508Cop:1304168153680707604> __${degats_titan}__**

\`\`\` \`\`\`
                            `)
                            .setColor(0xFFFFFF)
                            .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1337701283309682811/Ability_Argus_DeathFog.png')
                            .setImage('https://media1.tenor.com/m/VDuiGk6CcZgAAAAd/titan.gif')
                    ],
                });

    } catch (error) {
        console.error('Erreur lors de l\'utilisation de la commande stats :', error);
    }
}

module.exports = { fight_sans_embed };
