const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require('../../database.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('richesse')
        .setDescription('Affiche le classement des membres les plus riches du serveur.'),

    async execute(interaction) {
        try {
            const [result] = await db.query('SELECT id_membre, argent FROM économie ORDER BY argent DESC');

            if (result.length === 0) {
                await interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setDescription("❌ Aucun membre n'a encore d'argent dans la base de données.")
                        .setColor(0xFF0000)
                    ]
                });
                return;
            }

            const itemsPerPage = 10;
            const totalPages = Math.ceil(result.length / itemsPerPage);
            let currentPage = 1;

            const generateEmbed = async (page) => {
                const start = (page - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                const currentItems = result.slice(start, end);

                let classement = '\`\`\` \`\`\`\n\n> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:gold:1304167372999098489> ] — __Cᥣᥲssᥱmᥱᥒt__**';

                for (const [index, row] of currentItems.entries()) {
                    try {
                        const user = await interaction.client.users.fetch(row.id_membre);
                        const userName = user ? `<@${user.id}>` : 'Utilisateur introuvable';
                        classement += `\n<:Sans_titre_349_20240519142111Cop:1304168162392019066> [ __**\`${start + index + 1}\`**__ ] — ${userName} <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __**\`${row.argent}¥\`**__ ]\n`;
                    } catch (err) {
                        classement += `\n<:Sans_titre_349_20240519142111Cop:1304168162392019066> [ __**\`${start + index + 1}\`**__ ] — Utilisateur introuvable <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __**\`${row.argent}¥\`**__ ]\n`;
                    }
                }
                classement += '\n\n\`\`\` \`\`\`';

                return new EmbedBuilder()
                    .setDescription(classement)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333077594857275423/INV_10_Fishing_DragonIslesCoins_Gold.png')
                    .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                    .setFooter({ text: `Page ${page} sur ${totalPages}` });
            };

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('prev')
                        .setLabel('◀️')
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(currentPage === 1),
                    new ButtonBuilder()
                        .setCustomId('next')
                        .setLabel('▶️')
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(currentPage === totalPages)
                );

            const sentMessage = await interaction.reply({
                embeds: [await generateEmbed(currentPage)],
                components: [row],
                withResponse: true,
            });

            const filter = (i) => i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async (buttonInteraction) => {
                if (buttonInteraction.customId === 'prev' && currentPage > 1) {
                    currentPage--;
                } else if (buttonInteraction.customId === 'next' && currentPage < totalPages) {
                    currentPage++;
                }

                await buttonInteraction.update({
                    embeds: [await generateEmbed(currentPage)],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId('prev')
                                    .setLabel('◀️')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setDisabled(currentPage === 1),
                                new ButtonBuilder()
                                    .setCustomId('next')
                                    .setLabel('▶️')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setDisabled(currentPage === totalPages)
                            ),
                    ],
                });

                await buttonInteraction.deferUpdate();
            });

            collector.on('end', () => {
                sentMessage.edit({ components: [] });
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
};
