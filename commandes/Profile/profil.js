const { Events, AttachmentBuilder, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const db = require('../../database.js');
const { stats } = require('../../Fonction_commandes/stats.js');
const { inventaire } = require('../../Fonction_commandes/inventaire.js');
const { argent } = require('../../Fonction_commandes/argent.js');
const { morale } = require('../../Fonction_commandes/morale.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profilᶜʰᵉᶜᵏ')
        .setDescription("Permets à l'utilisateur de vérifier son profil ou celui d'un autre.")
        .addUserOption(option =>
            option.setName('membre')
                .setDescription("Mentionnez un membre pour voir ses statistiques.")
                .setRequired(false)
        ),

    async execute(interaction) {
        const mentionedMember = interaction.options.getUser('membre');
        const targetMember = mentionedMember || interaction.member;
        const memberId = targetMember.id;

        try {
            const connection = await db.getConnection();
                            const [rows] = await connection.execute(
                                'SELECT apparence, prénom, nom, corp, sexe FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                apparence = 0,
                                prénom = 0,
                                nom = 0,
                                corp = 0,
                                sexe = 0,
                            } = rows[0];

            const row = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId(`button_stats`)
                                        .setEmoji('<a:stats:1304167376513929256>')
                                        .setStyle('Secondary'),
                                        new ButtonBuilder()
                                        .setCustomId(`button_inventaire`)
                                        .setEmoji('<:inventaire:1234628961389121647>')
                                        .setStyle('Secondary'),
                                        new ButtonBuilder()
                                        .setCustomId(`button_morale`)
                                        .setEmoji('<:rp_alliance:1232763102991224833>')
                                        .setStyle('Secondary'),
                                        new ButtonBuilder()
                                        .setCustomId(`button_argent`)
                                        .setEmoji('<:gold:1304167372999098489>')
                                        .setStyle('Secondary')
                                );
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Profιᥣ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, voici votre profil :**
                    `)
                    .addFields(
                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Prᥱ́ᥒom`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${prénom ?? '0'}__**`, inline: true },
                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Nom`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${nom ?? '0'}__**`, inline: true },
                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Sᥱxᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${sexe ?? '0'}__**`, inline: true },
                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Corρ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${corp ?? '0'}__**`, inline: true },
                    )
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333065714138878015/INV_Misc_PaperBundle01a.png?ex=679789b1&is=67963831&hm=d281a398cdf2db8ac4f752d8dfbdc73762d68b0c46108e270f5f386b4d59b5b9&')
                    .setImage('https://media1.tenor.com/m/OXomI6XC9mAAAAAd/aot-attack.gif')
                ],
                components : [row],
            });
        const filter = (btnInteraction) => btnInteraction.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async (btnInteraction) => {
            if (btnInteraction.customId === 'button_stats') {
                await stats(btnInteraction, memberId);
            }
            else if (btnInteraction.customId === 'button_inventaire') {
                await inventaire(btnInteraction, memberId);
            }
            else if (btnInteraction.customId === 'button_argent') {
                await argent(btnInteraction, memberId);
            }
            else if (btnInteraction.customId === 'button_morale') {
                await morale(btnInteraction, memberId);
            }
        })
        } catch (error) {
            console.error(error);
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription("❌ Une erreur est survenue lors de l'execution de la commande.'")
                    .setColor(0xFF0000)
                ],
                flags: 64,
            });
        }
    }
};
