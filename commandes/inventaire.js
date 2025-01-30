const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
const db = require('../database.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventaire')
        .setDescription("Permets de visionner l'inventaire d'un membre.")
        .addUserOption(option =>
            option.setName('membre')
                .setDescription("Mentionnez un membre pour voir son inventaire.")
                .setRequired(false)
        ),

    async execute(interaction) {
        const mentionedMember = interaction.options.getUser('membre');
        const targetMember = mentionedMember || interaction.member;
        const memberId = targetMember.id;
        const interaction_member_id = interaction.user.id;

        try {
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('button_nourriture')
                    .setEmoji('<:viande:1332436030422388756>')
                    .setStyle('Secondary'),
                new ButtonBuilder()
                    .setCustomId('button_items')
                    .setEmoji('<:1266038099637571688:1304167358927208570>')
                    .setStyle('Secondary'),
                new ButtonBuilder()
                    .setCustomId('button_coffre')
                    .setEmoji('<:coffre:1332436827470168075>')
                    .setStyle('Secondary')
            );
            const userDisplayName = mentionedMember ? mentionedMember.username : interaction.user.username;
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:inventaire:1234628961389121647> ] — __Iᥒvᥱᥒtᥲιrᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, quelle partie de l'inventaire souhaitez-vous afficher ?**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
                ],
                components: [row],
                flags: 0,
            });
            const filter = (btnInteraction) => btnInteraction.user.id === interaction_member_id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async (btnInteraction) => {

                if (btnInteraction.customId === 'button_nourriture') {
                    const row2 = new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId('button_poisson')
                            .setEmoji('<:poisson_chat:1234607049053044809>')
                            .setStyle('Secondary'),
                        new ButtonBuilder()
                            .setCustomId('button_viande')
                            .setEmoji('<:viande:1332436030422388756>')
                            .setStyle('Secondary'),
                        new ButtonBuilder()
                            .setCustomId('button_autres')
                            .setEmoji('<:bl:1332490082053132372>')
                            .setStyle('Secondary'),
                    );
                    await btnInteraction.reply({
                        embeds: [new EmbedBuilder()
                            .setDescription(`
                    \`\`\` \`\`\`

                    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:inventaire:1234628961389121647> ] — __Iᥒvᥱᥒtᥲιrᥱ__**
                    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, quel type de nourriture souhaitez-vous afficher ?**

                    \`\`\` \`\`\`
                            `)
                            .setColor(0xFFFFFF)
                            .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                            .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
                        ],
                        components: [row2],
                        flags: 0,
                    });
                    collector.stop()
                    const filter2 = (btnInteraction1) => btnInteraction1.user.id === memberId;
                    const collector2 = interaction.channel.createMessageComponentCollector({ filter2, time: 60000 });

                    collector2.on('collect', async (btnInteraction1) => {
                        if (btnInteraction1.customId === 'button_poisson') {
                            const connection = await db.getConnection();
                            const [rows] = await connection.execute(
                                'SELECT saumon, bar, truite, sardine, bulot, vieille, thon, dorade, lieu FROM poisson WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                saumon = 0,
                                bar = 0,
                                truite = 0,
                                sardine = 0,
                                bulot = 0,
                                vieille = 0,
                                thon = 0,
                                dorade = 0,
                                lieu = 0,
                            } = rows[0];
                            await btnInteraction1.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setDescription(`
                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:inventaire:1234628961389121647> ] — __Iᥒvᥱᥒtᥲιrᥱ__**
                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, voici votre inventaire.**
                                        `)
                                        .addFields(
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Sᥲᥙmoᥒ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${saumon ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Bᥲr`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${bar ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Trᥙιtᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${truite ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Sᥲrdιᥒᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${sardine ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Bᥙᥣot`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${bulot ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Vιᥱιᥣᥣᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${vieille ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Thoᥒ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${thon ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Dorᥲdᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${dorade ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Lιᥱᥙ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${lieu ?? '0'}__**`, inline: true },
                                        )
                                        .setColor(0xFFFFFF)
                                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332488571629867039/INV_Misc_Fish_76.png?ex=6795702f&is=67941eaf&hm=5f5f8c6ee69fb270026121fc10c25c5cadcbb2db9ab2b58dff9d2d3d2b27c08b&')
                                        .setImage('https://i.pinimg.com/originals/e2/1b/3e/e21b3e5513c79ceca5432a184d9f8e55.gif')
                                ],
                                flags: 0,
                            });
                            collector2.stop()
                            return;
                        }
                        else if (btnInteraction1.customId === 'button_viande') {
                            const connection = await db.getConnection();
                            const [rowss] = await connection.execute(
                                'SELECT entre_côte, jambon, faux_filet, bavette, saucisse, tranche_grasse FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                entre_côte = 0,
                                jambon = 0,
                                faux_filet = 0,
                                bavette = 0,
                                saucisse = 0,
                                tranche_grasse = 0,
                            } = rowss[0];
                            await btnInteraction1.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setDescription(`
                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:inventaire:1234628961389121647> ] — __Iᥒvᥱᥒtᥲιrᥱ__**
                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, voici votre inventaire.**
                                        `)
                                        .addFields(
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Côtᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${entre_côte ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Jᥲmboᥒ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${jambon ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Fιᥣᥱts`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${faux_filet ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Bᥲvᥱttᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${bavette ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Sᥲᥙᥴιssᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${saucisse ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Oᥒgᥣᥱt`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${tranche_grasse ?? '0'}__**`, inline: true }
                                        )
                                        .setColor(0xFFFFFF)
                                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332492222280503306/INV_Misc_Food_132_Meat.png?ex=67957396&is=67942216&hm=b50df1530cc2f0bd9e586c42e9bcb7f9253dbc1a8282b394c5bdea51b6684bdc&')
                                        .setImage('https://media1.tenor.com/m/fb7BOrBCmy8AAAAd/eren-attack-on-titan.gif')
                                ],
                                flags: 0,
                            });
                            collector2.stop()
                            return;
                        }
                        else if (btnInteraction1.customId === 'button_autres') {
                            const connection = await db.getConnection();
                            const [rowss] = await connection.execute(
                                'SELECT orange, poire, cerise, raisin, banane, pomme, avocat, framboise, pruneau, mûre, blé, salade, pain FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                orange = 0,
                                poire = 0,
                                cerise = 0,
                                raisin = 0,
                                banane = 0,
                                pomme = 0,
                                avocat = 0,
                                framboise = 0,
                                pruneau = 0,
                                mûre = 0,
                                blé = 0,
                                salade = 0,
                                pain = 0,                               
                            } = rowss[0];
                            await btnInteraction1.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setDescription(`
                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:inventaire:1234628961389121647> ] — __Iᥒvᥱᥒtᥲιrᥱ__**
                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, voici votre inventaire.**
                                        `)
                                        .addFields(
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Orᥲᥒgᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${orange ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Poιrᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${poire ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Cᥱrιsᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${cerise ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Rᥲιsιᥒ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${raisin ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Bᥲᥒᥲᥒᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${banane ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Pommᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${pomme ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Avoᥴᥲt`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${avocat ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Frᥲmboιsᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${framboise ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Prᥙᥒᥱᥲᥙ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${pruneau ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Mᥙrᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${mûre ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Bᥣᥱ́`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${blé ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Sᥲᥣᥲdᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${salade ?? '0'}__**`, inline: true },
                                            { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Pᥲιᥒ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${pain ?? '0'}__**`, inline: true },
                                        )
                                        .setColor(0xFFFFFF)
                                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332496383537582173/INV_Misc_Food_Wheat_01.png?ex=67957776&is=679425f6&hm=87b2198aab9c7f335037f7fdce03e800172ac1bfbdf85d39101eddf198e59ddf&')
                                        .setImage('https://media1.tenor.com/m/F1dA-vgRx2QAAAAd/jarrehh-sophie-eating-strength-armin-mikasa.gif')
                                ],
                                flags: 0,
                            });
                            collector2.stop()
                            return;
                        }
                    })
                    collector.stop()
                }
                else if (btnInteraction.customId === 'button_items') {
                    const connection = await db.getConnection();
                            const [rowss] = await connection.execute(
                                'SELECT sablier_d_entrainement FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                sablier_d_entrainement = 0,                           
                            } = rowss[0];
                    await btnInteraction.reply({
                        embeds: [new EmbedBuilder()
                            .setDescription(`
                    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:inventaire:1234628961389121647> ] — __Iᥒvᥱᥒtᥲιrᥱ__**
                    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, voici votre inventaire.**
                            `)
                            .addFields(
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Sᥲbᥣιᥱr d\'ᥱᥒtrᥲιᥒᥱmᥱᥒt`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${sablier_d_entrainement ?? '0'}__**`, inline: true },
                            )
                            .setColor(0xFFFFFF)
                            .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332821256810270860/INV_Relics_Hourglass.png?ex=6796a606&is=67955486&hm=9cc45232f332b563a9d3dad6d25776ae73bb754c6a6873c826d91f8467682cfa&')
                            .setFooter({
                                text: 'Pour plus d\'infos sur les items spéciaux, veuillez taper la commande suivante /itemsⁱⁿᶠᵒˢ.'
                            })
                            .setImage('https://c.tenor.com/ZT1gU25aVMEAAAAd/tenor.gif')
                        ],
                        flags: 0,
                    });
                    collector.stop()
                }
                else if (btnInteraction.customId === 'button_coffre') {
                    const connection = await db.getConnection();
                            const [rowss] = await connection.execute(
                                'SELECT coffre_normal, coffre_rare, coffre_epique, coffre_legendaire FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                coffre_normal = 0,
                                coffre_rare = 0,   
                                coffre_epique = 0,   
                                coffre_legendaire = 0,                              
                            } = rowss[0];
                    await btnInteraction.reply({
                        embeds: [new EmbedBuilder()
                            .setDescription(`
                    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:inventaire:1234628961389121647> ] — __Iᥒvᥱᥒtᥲιrᥱ__**
                    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, voici votre inventaire.**
                            `)
                            .addFields(
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Coffrᥱ ᥒormᥲᥣ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${coffre_normal ?? '0'}__**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Coffrᥱ rᥲrᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${coffre_rare ?? '0'}__**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Coffrᥱ ᥱ́ριqᥙᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${coffre_epique ?? '0'}__**`, inline: false },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Coffrᥱ ᥣᥱ́gᥱᥒdᥲιrᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${coffre_legendaire ?? '0'}__**`, inline: false },
                            )
                            .setColor(0xFFFFFF)
                            .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332824326625296455/Inv_legion_chest_Valajar.png?ex=6796a8e2&is=67955762&hm=4c1008efb61ab6ad63a1cc7504605ca9ae0b1cdc8209459b15b6e4969cd24db1&')
                            .setFooter({
                                text: 'Pour plus d\'infos sur les coffres, veuillez taper la commande suivante /itemsⁱⁿᶠᵒˢ.'
                            })
                            .setImage('https://www.shonencorner.com/wp-content/uploads/2021/12/titan-charrette-capacite-attaque.gif')
                        ],
                        flags: 0,
                    });
                    collector.stop()
                }
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription("❌ Une erreur est survenue lors de la récupération des statistiques.")
                    .setColor(0xFF0000)
                ],
                ephemeral: true,
            });
        }
    }
};