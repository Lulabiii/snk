const pool = require('../database');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('assigner_xp')
        .setDescription("Attribue de l'expérience à un membre")
            .addStringOption(option => 
                option
                    .setName('pseudo')
                    .setDescription('Le pseudo RP du membre')
                    .setRequired(true)
            ),

    async execute(interaction) {
        const pseudo = interaction.options.getString('pseudo');
        const member = interaction.member;

        try {
            const idMembre = member.id;
            const nomMembre = member.user.username;


            const [xpResult] = await pool.query(
                'SELECT xp FROM experience WHERE id_membre = ?;', [idMembre]
            );

            const [trainResult] = await pool.query(
                'SELECT train_global FROM entrainement WHERE id_membre = ?;', [idMembre]
            );

            if (!xpResult[0] || !trainResult[0]) {
                throw new Error('Données manquantes dans la base de données');
            }

            const xp = xpResult[0]?.xp || 0;
            const trainGlobal = trainResult[0]?.train_global || 0;
            const trainMultiplié = trainGlobal * 250;
            const xpFinal = xp + trainMultiplié;


            await pool.query(
                'UPDATE experience SET xp = ? WHERE id_membre = ?;',
                [xpFinal, idMembre]
            );
            await member.setNickname(`${pseudo} [ ${xpFinal} ]`);

            await interaction.reply({
                embeds: [{
                    description: `# > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1260570361150439496:1304167355600863312> ] — __Exρᥱrιᥱᥒᥴᥱ__**\n <:Sans_titre_349_20240519142111Cop:1304168162392019066> __**L'xp de ${member} a bien été mise à jour.**__`,
                    color: 0xFFFFFF,
                    thumbnail: {
                        url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304166323038720011/XP_ICON.png?ex=672e6709&is=672d1589&hm=3d9c185b2b388a33311be803e76a8f1c23ed766f28fac125d4a0a36d49e11c57&',
                    },
                    image: {
                        url: 'https://media1.tenor.com/m/OXomI6XC9mAAAAAd/aot-attack.gif',
                    },
                    timestamp: new Date(),
                }],
                flags: 0,
            });

        } catch (error) {
            console.error(error);

            await interaction.reply({
                content: `Une erreur est survenue.`,
                flags: 64,
            });
        }
    },
};
