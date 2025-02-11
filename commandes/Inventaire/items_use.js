const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, StringSelectMenuBuilder } = require('discord.js');
const db = require('../../database.js');
const { sablier_entrainement } = require('../../Fonction_commandes/items.js');
const { validé } = require('../../Fonction_commandes/validé.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('itemᵘᵗⁱˡⁱˢᵉʳ')
        .setDescription("Permets au membre d'utiliser ou non un item présent dans son inventaire"),

    async execute(interaction) {
        const mentionedMember = interaction.options.getUser('membre');
        const targetMember = mentionedMember || interaction.member;
        const memberId = targetMember.id;
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
            const menu = new StringSelectMenuBuilder()
            .setCustomId('menu_select')
            .setPlaceholder('🎈・Choιsιs qᥙᥱᥣ ιtᥱm tᥙ soᥙhᥲιtᥱ ᥙtιᥣιsᥱr.')
            .addOptions(
                {
                    label: '⏳・Sᥲbᥣιᥱr d\'ᥱᥒtrᥲιᥒᥱmᥱᥒt',
                    value: 'sablier_d_entrainement',
                    description: '╰▹ Voᥙs ρᥱrmᥱts d\'ᥙtιᥣιsᥱr ᥣᥱ sᥲbᥣιᥱr.',
                }
            );
            const row = new ActionRowBuilder().addComponents(menu);
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:inventaire:1234628961389121647> ] — __Itᥱms__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, quel item souhaitez-vous utiliser ?**
        
        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1305252396825579520/70_inscription_deck_dominion.png?ex=67968c85&is=67953b05&hm=0811480d9756f9db2171337c4cb789157992ce87ae8df24c10cba947592588d8&')
                .setImage('https://i.pinimg.com/originals/18/e4/b3/18e4b3ba8ea24d479d6bf98d0a0bff27.gif')
                ],
                components: [row],
                flags: 0,
            });
            const filter = (i) => i.isStringSelectMenu() && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            time: 15000,
        })
        collector.on('collect', async (i) => {
            if (i.customId === 'menu_select') {
                const selectedValue = i.values[0];
                if (selectedValue === 'sablier_d_entrainement') {
                    await sablier_entrainement(i, memberId);
                    collector.stop();
                }
            }
        })
            }
        catch (error) {
            console.error(error);
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription("❌ Une erreur est survenue lors de l'execution de la commande.")
                    .setColor(0xFF0000)
                ],
                ephemeral: true,
            });
        }
    },
};