const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, StringSelectMenuBuilder } = require('discord.js');
const db = require('../../database.js');
const { trade } = require('../../Fonction_commandes/trade.js');
const { validé } = require('../../Fonction_commandes/validé.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('vendre')
        .setDescription("Permets à un utilisateur de vendre un objet à un autre.")
        .addUserOption(option =>
            option.setName('membre')
                .setDescription("Mentionnez le membre avec qui vous souhaitez faire la vente.")
                .setRequired(true)
        ),

    async execute(interaction) {
        try {
            const memberId = interaction.member.id;
            const mentionedMember = interaction.options.getUser('membre');
            const targetMember = mentionedMember;
            const metionedMemberId = mentionedMember.id;
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
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('button_nourriture')
                    .setEmoji('<:viande:1332436030422388756>')
                    .setStyle('Secondary'),
                new ButtonBuilder()
                    .setCustomId('button_poisson')
                    .setEmoji('<:poisson_chat:1234607049053044809>')
                    .setStyle('Secondary'),
                new ButtonBuilder()
                    .setCustomId('button_fruit')
                    .setEmoji('<:banane:1333917436440744129>')
                    .setStyle('Secondary'),
							new ButtonBuilder()
                    .setCustomId('button_legumes')
                    .setEmoji('<:legumes:1333917616124985385>')
                    .setStyle('Secondary')
            );
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, que souhaitez-vous vendre ?**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                components: [row],
                flags: 0,
            });
            const filter = (btnInteraction) => btnInteraction.user.id === memberId;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

						collector.on('collect', async (btnInteraction) => {
                            if (btnInteraction.customId === 'button_legumes') { // bouton legume
								const connection = await db.getConnection();
                            const [rowss] = await connection.execute(
                                'SELECT salade, carotte, patate, chou, tomate FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                salade = 0,
                                carotte = 0,
                                patate = 0,
                                chou = 0,
                                tomate = 0,                         
                            } = rowss[0];
								const menu = new StringSelectMenuBuilder()
            .setCustomId('menu_select')
            .setPlaceholder('🍴・Choιsιs qᥙᥱᥣ ᥒoᥙrrιtᥙrᥱ tᥙ soᥙhᥲιtᥱ ᥴoᥒsommᥱr.')
            .addOptions(
                {
                    label: '🥬・Sᥲᥣᥲdᥱ',
                    value: 'salade',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒᥱ sᥲᥣᥲdᥱ.',
                },
							{
                    label: '🥕・Cᥲrottᥱ',
                    value: 'carotte',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒᥱ ᥴᥲrottᥱ.',
                },
							{
                    label: '🥔・Pᥲtᥲtᥱ',
                    value: 'patate',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒᥱ ρᥲtᥲtᥱ.',
                },
							{
                    label: '🥦・Choᥙ',
                    value: 'chou',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒ ᥴhoᥙ.',
                },
							{
                    label: '🍅・Tomᥲtᥱ',
                    value: 'tomate',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒᥱ tomᥲtᥱ.',
                },
            );
            const row = new ActionRowBuilder().addComponents(menu);
									await btnInteraction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:legumes:1333917616124985385> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, cliquez sur la nourriture que vous souhaitez vendre.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925483208904835/INV_Misc_Food_Vendor_Carrot.png?ex=679aaa6a&is=679958ea&hm=07859762b939fb1db9813db1b808d3b6fe62e8bfc9f40100cc488367a7a9dc8a&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                components: [row],
                flags: 0,
            });
		const filter2 = (i) => i.isStringSelectMenu() && i.user.id === interaction.user.id;
        const collector2 = interaction.channel.createMessageComponentCollector({
            filter2,
            time: 15000,
        })
        collector2.on('collect', async (i) => {
            if (i.customId === 'menu_select') {
                const selectedValue = i.values[0];
                if (selectedValue === 'salade') {
                    if ( salade === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:legumes:1333917616124985385> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune salade à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925483208904835/INV_Misc_Food_Vendor_Carrot.png?ex=679aaa6a&is=679958ea&hm=07859762b939fb1db9813db1b808d3b6fe62e8bfc9f40100cc488367a7a9dc8a&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else { // Actuel
                                        await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
							else if (selectedValue === 'carotte') {
                    if ( carotte === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:legumes:1333917616124985385> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune carotte à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925483208904835/INV_Misc_Food_Vendor_Carrot.png?ex=679aaa6a&is=679958ea&hm=07859762b939fb1db9813db1b808d3b6fe62e8bfc9f40100cc488367a7a9dc8a&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
                                        await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
							else if (selectedValue === 'patate') {
                    if ( patate === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:legumes:1333917616124985385> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune pomme de terre à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925483208904835/INV_Misc_Food_Vendor_Carrot.png?ex=679aaa6a&is=679958ea&hm=07859762b939fb1db9813db1b808d3b6fe62e8bfc9f40100cc488367a7a9dc8a&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
							else if (selectedValue === 'chou') {
                    if ( chou === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:legumes:1333917616124985385> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun chou à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925483208904835/INV_Misc_Food_Vendor_Carrot.png?ex=679aaa6a&is=679958ea&hm=07859762b939fb1db9813db1b808d3b6fe62e8bfc9f40100cc488367a7a9dc8a&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
							else if (selectedValue === 'tomate') {
                    if ( tomate === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:legumes:1333917616124985385> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune tomate à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925483208904835/INV_Misc_Food_Vendor_Carrot.png?ex=679aaa6a&is=679958ea&hm=07859762b939fb1db9813db1b808d3b6fe62e8bfc9f40100cc488367a7a9dc8a&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
            }
								});
                                collector.stop()

							}
							else if (btnInteraction.customId === 'button_fruit') {
								const connection = await db.getConnection();
                            const [rowss] = await connection.execute(
                                'SELECT orange, poire, cerise, raisin, banane, pomme, avocat, framboise, pruneau, mûre FROM nourriture WHERE id_membre = ?',
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
                            } = rowss[0];
								const menu = new StringSelectMenuBuilder()
            .setCustomId('menu_select')
            .setPlaceholder('🍴・Choιsιs qᥙᥱᥣ ᥒoᥙrrιtᥙrᥱ tᥙ soᥙhᥲιtᥱ ᥴoᥒsommᥱr.')
            .addOptions(
                {
                    label: '🍊・Orᥲᥒgᥱ',
                    value: 'orange',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒᥱ orᥲᥒgᥱ.',
                },
							{
                    label: '🍐・Poιrᥱ',
                    value: 'poire',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒᥱ ρoιrᥱ.',
                },
							{
                    label: '🍒・Cᥱrιsᥱ',
                    value: 'cerise',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒᥱ ᥴᥱrιsᥱ.',
                },
							{
                    label: '🍇・Rᥲιsιᥒ',
                    value: 'raisin',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒ rᥲιsιᥒ.',
                },
							{
                    label: '🍌・Bᥲᥒᥲᥒᥱ',
                    value: 'banane',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒᥱ bᥲᥒᥲᥒᥱ.',
                },
							{
                    label: '🍎・Pommᥱ',
                    value: 'pomme',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒᥱ ρommᥱ.',
                },
                {
                    label: '🥑・Avoᥴᥲt',
                    value: 'avocat',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒ ᥲvoᥴᥲt.',
                },
                {
                    label: '🍓・Frᥲmboιsᥱ',
                    value: 'framboise',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒᥱ frᥲmboιsᥱ.',
                },
                {
                    label: '🍑・Prᥙᥒᥱᥲᥙ',
                    value: 'pruneau',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒ ρrᥙᥒᥱᥲᥙ.',
                },
                {
                    label: '🍓・Mᥙrᥱ',
                    value: 'mure',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒᥱ mᥙrᥱ.',
                },
            );
            const row = new ActionRowBuilder().addComponents(menu);
									await btnInteraction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, cliquez sur la nourriture que vous souhaitez vendre.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925483208904835/INV_Misc_Food_Vendor_Carrot.png?ex=679aaa6a&is=679958ea&hm=07859762b939fb1db9813db1b808d3b6fe62e8bfc9f40100cc488367a7a9dc8a&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                components: [row],
                flags: 0,
            });
		const filter2 = (i) => i.isStringSelectMenu() && i.user.id === interaction.user.id;
        const collector2 = interaction.channel.createMessageComponentCollector({
            filter2,
            time: 15000,
        })
        collector2.on('collect', async (i) => {
            if (i.customId === 'menu_select') {
                const selectedValue = i.values[0];
                if (selectedValue === 'orange') {
                    if ( orange === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune orange à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925643896885298/INV_Misc_Food_Strawberry_ice.png?ex=679aaa90&is=67995910&hm=7306120615cbfa8fdd6a1258b1f71ce5a63c4921588427040c2877ad8bc6b910&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
							else if (selectedValue === 'poire') {
                    if ( poire === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune poire à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925643896885298/INV_Misc_Food_Strawberry_ice.png?ex=679aaa90&is=67995910&hm=7306120615cbfa8fdd6a1258b1f71ce5a63c4921588427040c2877ad8bc6b910&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
							else if (selectedValue === 'cerise') {
                    if ( cerise === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune cerise à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925643896885298/INV_Misc_Food_Strawberry_ice.png?ex=679aaa90&is=67995910&hm=7306120615cbfa8fdd6a1258b1f71ce5a63c4921588427040c2877ad8bc6b910&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
							else if (selectedValue === 'raisin') {
                    if ( raisin === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun raisin à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925643896885298/INV_Misc_Food_Strawberry_ice.png?ex=679aaa90&is=67995910&hm=7306120615cbfa8fdd6a1258b1f71ce5a63c4921588427040c2877ad8bc6b910&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
							else if (selectedValue === 'banane') {
                    if ( banane === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune banane à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925643896885298/INV_Misc_Food_Strawberry_ice.png?ex=679aaa90&is=67995910&hm=7306120615cbfa8fdd6a1258b1f71ce5a63c4921588427040c2877ad8bc6b910&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
							else if (selectedValue === 'pomme') {
                    if ( pomme === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune pomme à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925643896885298/INV_Misc_Food_Strawberry_ice.png?ex=679aaa90&is=67995910&hm=7306120615cbfa8fdd6a1258b1f71ce5a63c4921588427040c2877ad8bc6b910&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
                else if (selectedValue === 'avocat') {
                    if ( avocat === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun avocat à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925643896885298/INV_Misc_Food_Strawberry_ice.png?ex=679aaa90&is=67995910&hm=7306120615cbfa8fdd6a1258b1f71ce5a63c4921588427040c2877ad8bc6b910&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
                            }
                    collector2.stop();
                }
                else if (selectedValue === 'framboise') {
                    if ( framboise === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune framboise à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925643896885298/INV_Misc_Food_Strawberry_ice.png?ex=679aaa90&is=67995910&hm=7306120615cbfa8fdd6a1258b1f71ce5a63c4921588427040c2877ad8bc6b910&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
                else if (selectedValue === 'pruneau') {
                    if ( pruneau === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun pruneau à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925643896885298/INV_Misc_Food_Strawberry_ice.png?ex=679aaa90&is=67995910&hm=7306120615cbfa8fdd6a1258b1f71ce5a63c4921588427040c2877ad8bc6b910&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
                else if (selectedValue === 'mure') {
                    if ( mûre === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune mure à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925643896885298/INV_Misc_Food_Strawberry_ice.png?ex=679aaa90&is=67995910&hm=7306120615cbfa8fdd6a1258b1f71ce5a63c4921588427040c2877ad8bc6b910&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
            }
								});
                                collector.stop()

							}
							else if (btnInteraction.customId === 'button_nourriture') {
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
								const menu = new StringSelectMenuBuilder()
            .setCustomId('menu_select')
            .setPlaceholder('🍴・Choιsιs qᥙᥱᥣ ᥒoᥙrrιtᥙrᥱ tᥙ soᥙhᥲιtᥱ ᥴoᥒsommᥱr.')
            .addOptions(
                {
                    label: '🍗・Eᥒtrᥱᥴôtᥱ',
                    value: 'entre_côte',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒᥱ ᥱᥒtrᥱᥴôtᥱ.',
                },
							{
                    label: '🍗・Jᥲmboᥒ',
                    value: 'jambon',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒ jᥲmboᥒ.',
                },
							{
                    label: '🍗・Fᥲᥙx-fιᥣᥱt',
                    value: 'faux_filet',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒ fᥲᥙx-fιᥣᥱt.',
                },
							{
                    label: '🍗・Bᥲvᥱttᥱ',
                    value: 'bavette',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒ bᥲvᥱttᥱ.',
                },
							{
                    label: '🍗・Sᥲᥙᥴιssᥱ',
                    value: 'saucisse',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒ sᥲᥙᥴιssᥱ.',
                },
							{
                    label: '🍗・Trᥲᥒᥴhᥱ grᥲssᥱ',
                    value: 'tranch_grasse',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒ trᥲᥒᥴhᥱ grᥲssᥱ.',
                },
            );
            const row = new ActionRowBuilder().addComponents(menu);
									await btnInteraction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, cliquez sur la nourriture que vous souhaitez vendre.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                components: [row],
                flags: 0,
            });
								const filter2 = (i) => i.isStringSelectMenu() && i.user.id === interaction.user.id;
        const collector2 = interaction.channel.createMessageComponentCollector({
            filter2,
            time: 15000,
        })
        collector2.on('collect', async (i) => {
            if (i.customId === 'menu_select') {
                const selectedValue = i.values[0];
                if (selectedValue === 'entre_côte') {
                    if ( entre_côte === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune entrecôte à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
							else if (selectedValue === 'jambon') {
                    if ( jambon === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun jambon à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
                            
									}
                    collector2.stop();
                }
							else if (selectedValue === 'faux_filet') {
                    if ( faux_filet === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun faux filets à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
							else if (selectedValue === 'bavette') {
                    if ( bavette === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune bavette à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
							else if (selectedValue === 'saucisse') {
                    if ( saucisse === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune saucisse à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										
                                        await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
							else if (selectedValue === 'tranche_grasse') {
                    if ( tranche_grasse === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune tranche grasse à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
            }
								});
                                collector.stop()
							}
                else if (btnInteraction.customId === 'button_poisson') {
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
								const menu = new StringSelectMenuBuilder()
            .setCustomId('menu_select')
            .setPlaceholder('🍴・Choιsιs qᥙᥱᥣ ρoιssoᥒ tᥙ soᥙhᥲιtᥱ ᥴoᥒsommᥱr.')
            .addOptions(
                {
                    label: '🐟・Sᥲᥙmoᥒ',
                    value: 'saumon',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒ sᥲᥙmoᥒ.',
                },
							{
                    label: '🐟・Bᥲr',
                    value: 'bar',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒ bᥲr.',
                },
							{
                    label: '🐟・Trᥙιtᥱ',
                    value: 'truite',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒ trᥙιtᥱ.',
                },
							{
                    label: '🐟・Sᥲrdιᥒᥱ',
                    value: 'sardine',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒ sᥲrdιᥒᥱ.',
                },
							{
                    label: '🐟・Bᥙᥣot',
                    value: 'bulot',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒ bᥙᥣot.',
                },
							{
                    label: '🐟・Vιᥱιᥣᥣᥱ',
                    value: 'vieille',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒ vιᥱιᥣᥣᥱ.',
                },
							{
                    label: '🐟・Thoᥒ',
                    value: 'thon',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒ thoᥒ.',
                },
							{
                    label: '🐟・Dorᥲdᥱ',
                    value: 'dorade',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒ dorᥲdᥱ.',
                },
							{
                    label: '🐟・Lιᥱᥙ',
                    value: 'lieu',
                    description: '╰▹ Voᥙs mᥲᥒgᥱz ᥙᥒ ᥣιᥱᥙ.',
                },
            );
            const row = new ActionRowBuilder().addComponents(menu);
				await btnInteraction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, cliquez sur le poisson que vous souhaitez vendre.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332488571629867039/INV_Misc_Fish_76.png?ex=679a0d6f&is=6798bbef&hm=fefe46cacd99f0171086ef13a337f9621c0d5e2b8b7a83625a83583849c48dc3&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                components: [row],
                flags: 0,
            });
		const filter2 = (i) => i.isStringSelectMenu() && i.user.id === interaction.user.id;
        const collector2 = interaction.channel.createMessageComponentCollector({
            filter2,
            time: 15000,
        })
        collector2.on('collect', async (i) => {
            if (i.customId === 'menu_select') {
                const selectedValue = i.values[0];
                if (selectedValue === 'saumon') {
                    if ( saumon === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun saumon à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332488571629867039/INV_Misc_Fish_76.png?ex=679a0d6f&is=6798bbef&hm=fefe46cacd99f0171086ef13a337f9621c0d5e2b8b7a83625a83583849c48dc3&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
							else if (selectedValue === 'bar') {
                    if ( bar === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun bar à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332488571629867039/INV_Misc_Fish_76.png?ex=679a0d6f&is=6798bbef&hm=fefe46cacd99f0171086ef13a337f9621c0d5e2b8b7a83625a83583849c48dc3&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
							else if (selectedValue === 'truite') {
                    if ( truite === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun truite à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332488571629867039/INV_Misc_Fish_76.png?ex=679a0d6f&is=6798bbef&hm=fefe46cacd99f0171086ef13a337f9621c0d5e2b8b7a83625a83583849c48dc3&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
                            
									}
                    collector2.stop();
                }
							else if (selectedValue === 'sardine') {
                    if ( sardine === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun sardine à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332488571629867039/INV_Misc_Fish_76.png?ex=679a0d6f&is=6798bbef&hm=fefe46cacd99f0171086ef13a337f9621c0d5e2b8b7a83625a83583849c48dc3&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
                           
									}
                    collector2.stop();
                }
							else if (selectedValue === 'bulot') {
                    if ( bulot === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun bulot à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332488571629867039/INV_Misc_Fish_76.png?ex=679a0d6f&is=6798bbef&hm=fefe46cacd99f0171086ef13a337f9621c0d5e2b8b7a83625a83583849c48dc3&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
                            
									}
                    collector2.stop();
                }
							else if (selectedValue === 'vieille') {
                    if ( vieille === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun vieille à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332488571629867039/INV_Misc_Fish_76.png?ex=679a0d6f&is=6798bbef&hm=fefe46cacd99f0171086ef13a337f9621c0d5e2b8b7a83625a83583849c48dc3&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										
                                        await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
							else if (selectedValue === 'thon') {
                    if ( thon === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun thon à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332488571629867039/INV_Misc_Fish_76.png?ex=679a0d6f&is=6798bbef&hm=fefe46cacd99f0171086ef13a337f9621c0d5e2b8b7a83625a83583849c48dc3&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										
                                        await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
							else if (selectedValue === 'dorade') {
                    if ( dorade === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun dorade à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332488571629867039/INV_Misc_Fish_76.png?ex=679a0d6f&is=6798bbef&hm=fefe46cacd99f0171086ef13a337f9621c0d5e2b8b7a83625a83583849c48dc3&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										
                                        await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
							else if (selectedValue === 'lieu') {
                    if ( lieu === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Vᥱᥒtᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun lieu à vendre !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332488571629867039/INV_Misc_Fish_76.png?ex=679a0d6f&is=6798bbef&hm=fefe46cacd99f0171086ef13a337f9621c0d5e2b8b7a83625a83583849c48dc3&')
                .setImage('https://media1.tenor.com/m/p7f3u-BtsxkAAAAd/attack-on-titan-hange-zo%C3%AB.gif')
                ],
                flags: 0,
            });
											return;
										}
									else {
										await vendre(i, memberId, selectedValue, metionedMemberId );
									}
                    collector2.stop();
                }
            }
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
