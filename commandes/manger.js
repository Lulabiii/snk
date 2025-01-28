const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, StringSelectMenuBuilder } = require('discord.js');
const db = require('../database.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('manger')
        .setDescription("Permets à l'utilisateur de manger [ Nécessite une saciété à - de 50% ]."),

    async execute(interaction) {
        const memberId = interaction.member.id;

        try {
					const [[{ faim } = {}]] = await db.query(
                'SELECT faim FROM personnage WHERE id_membre = ?', [memberId]);
					if ( faim > 50 ) {
						await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous ne pouvez pas encore manger.**

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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, que souhaitez-vous manger ?**

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
                            if (btnInteraction.customId === 'button_legumes') {
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:legumes:1333917616124985385> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, cliquez sur la nourriture que vous souhaitez consommer.**

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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:legumes:1333917616124985385> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune salade à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +5 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE nourriture SET salade = salade -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT salade FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                salade = 0,
                            } = rows[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:legumes:1333917616124985385> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre salade, il vous en reste [ __ \`${salade}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

            \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925483208904835/INV_Misc_Food_Vendor_Carrot.png?ex=679aaa6a&is=679958ea&hm=07859762b939fb1db9813db1b808d3b6fe62e8bfc9f40100cc488367a7a9dc8a&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
							else if (selectedValue === 'carotte') {
                    if ( carotte === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:legumes:1333917616124985385> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune carotte à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +5 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE nourriture SET carotte = carotte -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT carotte FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                carotte = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:legumes:1333917616124985385> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre carotte, il vous en reste [ __ \`${carotte}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925483208904835/INV_Misc_Food_Vendor_Carrot.png?ex=679aaa6a&is=679958ea&hm=07859762b939fb1db9813db1b808d3b6fe62e8bfc9f40100cc488367a7a9dc8a&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
							else if (selectedValue === 'patate') {
                    if ( patate === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:legumes:1333917616124985385> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune pomme de terre à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +5 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE nourriture SET patate = patate -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT patate FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                patate = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:legumes:1333917616124985385> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre pomme de terre, il vous en reste [ __ \`${patate}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925483208904835/INV_Misc_Food_Vendor_Carrot.png?ex=679aaa6a&is=679958ea&hm=07859762b939fb1db9813db1b808d3b6fe62e8bfc9f40100cc488367a7a9dc8a&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
							else if (selectedValue === 'chou') {
                    if ( chou === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:legumes:1333917616124985385> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun chou à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +5 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE nourriture SET chou = chou -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT chou FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                chou = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:legumes:1333917616124985385> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre chou, il vous en reste [ __ \`${chou}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925483208904835/INV_Misc_Food_Vendor_Carrot.png?ex=679aaa6a&is=679958ea&hm=07859762b939fb1db9813db1b808d3b6fe62e8bfc9f40100cc488367a7a9dc8a&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
							else if (selectedValue === 'tomate') {
                    if ( tomate === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:legumes:1333917616124985385> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune tomate à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +5 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE nourriture SET tomate = tomate -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT tomate FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                tomate = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:legumes:1333917616124985385> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre tomate, il vous en reste [ __ \`${tomate}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925483208904835/INV_Misc_Food_Vendor_Carrot.png?ex=679aaa6a&is=679958ea&hm=07859762b939fb1db9813db1b808d3b6fe62e8bfc9f40100cc488367a7a9dc8a&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, cliquez sur la nourriture que vous souhaitez consommer.**

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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune orange à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +5 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE nourriture SET orange = orange -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT orange FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                orange = 0,
                            } = rows[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre orange, il vous en reste [ __ \`${orange}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

            \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925643896885298/INV_Misc_Food_Strawberry_ice.png?ex=679aaa90&is=67995910&hm=7306120615cbfa8fdd6a1258b1f71ce5a63c4921588427040c2877ad8bc6b910&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
							else if (selectedValue === 'poire') {
                    if ( poire === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune poire à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +5 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE nourriture SET poire = poire -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT poire FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                poire = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre poire, il vous en reste [ __ \`${poire}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925643896885298/INV_Misc_Food_Strawberry_ice.png?ex=679aaa90&is=67995910&hm=7306120615cbfa8fdd6a1258b1f71ce5a63c4921588427040c2877ad8bc6b910&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
							else if (selectedValue === 'cerise') {
                    if ( cerise === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune cerise à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +5 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE nourriture SET cerise = cerise -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT cerise FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                cerise = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre cerise, il vous en reste [ __ \`${cerise}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925643896885298/INV_Misc_Food_Strawberry_ice.png?ex=679aaa90&is=67995910&hm=7306120615cbfa8fdd6a1258b1f71ce5a63c4921588427040c2877ad8bc6b910&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
							else if (selectedValue === 'raisin') {
                    if ( raisin === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun raisin à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +5 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE nourriture SET raisin = raisin -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT raisin FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                raisin = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre raisin, il vous en reste [ __ \`${raisin}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925643896885298/INV_Misc_Food_Strawberry_ice.png?ex=679aaa90&is=67995910&hm=7306120615cbfa8fdd6a1258b1f71ce5a63c4921588427040c2877ad8bc6b910&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
							else if (selectedValue === 'banane') {
                    if ( banane === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune banane à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +5 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE nourriture SET banane = banane -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT banane FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                banane = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre banane, il vous en reste [ __ \`${banane}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925643896885298/INV_Misc_Food_Strawberry_ice.png?ex=679aaa90&is=67995910&hm=7306120615cbfa8fdd6a1258b1f71ce5a63c4921588427040c2877ad8bc6b910&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
							else if (selectedValue === 'pomme') {
                    if ( pomme === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune pomme à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +5 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE nourriture SET pomme = pomme -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT pomme FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                pomme = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre pomme, il vous en reste [ __ \`${pomme}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925643896885298/INV_Misc_Food_Strawberry_ice.png?ex=679aaa90&is=67995910&hm=7306120615cbfa8fdd6a1258b1f71ce5a63c4921588427040c2877ad8bc6b910&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
                else if (selectedValue === 'avocat') {
                    if ( avocat === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun avocat à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +5 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE nourriture SET avocat = avocat -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT avocat FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                avocat = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre avocat, il vous en reste [ __ \`${avocat}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925643896885298/INV_Misc_Food_Strawberry_ice.png?ex=679aaa90&is=67995910&hm=7306120615cbfa8fdd6a1258b1f71ce5a63c4921588427040c2877ad8bc6b910&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
                else if (selectedValue === 'framboise') {
                    if ( framboise === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune framboise à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +5 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE nourriture SET framboise = framboise -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT framboise FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                framboise = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre framboise, il vous en reste [ __ \`${framboise}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925643896885298/INV_Misc_Food_Strawberry_ice.png?ex=679aaa90&is=67995910&hm=7306120615cbfa8fdd6a1258b1f71ce5a63c4921588427040c2877ad8bc6b910&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
                else if (selectedValue === 'pruneau') {
                    if ( pruneau === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun pruneau à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +5 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE nourriture SET pruneau = pruneau -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT pruneau FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                pruneau = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre pruneau, il vous en reste [ __ \`${pruneau}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925643896885298/INV_Misc_Food_Strawberry_ice.png?ex=679aaa90&is=67995910&hm=7306120615cbfa8fdd6a1258b1f71ce5a63c4921588427040c2877ad8bc6b910&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
                else if (selectedValue === 'mure') {
                    if ( mûre === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune mure à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +5 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE nourriture SET mure = mure -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT mure FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                mure = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:banane:1333917436440744129> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre mure, il vous en reste [ __ \`${mure}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333925643896885298/INV_Misc_Food_Strawberry_ice.png?ex=679aaa90&is=67995910&hm=7306120615cbfa8fdd6a1258b1f71ce5a63c4921588427040c2877ad8bc6b910&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
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
                    value: 'entrecôte',
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, cliquez sur la nourriture que vous souhaitez consommer.**

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
                if (selectedValue === 'entrecôte') {
                    if ( entre_côte === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune entre-côte à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +25 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE nourriture SET entre_côte = entre_côte -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT entre_côte FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                entre_côte = 0,
                            } = rows[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre entre-côte, il vous en reste [ __ \`${entre_côte}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
							else if (selectedValue === 'jambon') {
                    if ( jambon === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun jambon à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +15 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE nourriture SET jambon = jambon -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT jambon FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                jambon = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre jambon, il vous en reste [ __ \`${jambon}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
							else if (selectedValue === 'faux_filet') {
                    if ( faux_filet === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun faux filets à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +20 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE nourriture SET faux_filet = faux_filet -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT faux_filet FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faux_filet = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre faux filet, il vous en reste [ __ \`${faux_filet}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
							else if (selectedValue === 'bavette') {
                    if ( bavette === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune bavette à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +20 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE nourriture SET bavette = bavette -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT bavette FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                bavette = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre bavette, il vous en reste [ __ \`${bavette}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
							else if (selectedValue === 'saucisse') {
                    if ( saucisse === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune saucisse à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +15 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE nourriture SET saucisse = saucisse -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT saucisse FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                saucisse = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre saucisse, il vous en reste [ __ \`${saucisse}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
							else if (selectedValue === 'tranche_grasse') {
                    if ( tranche_grasse === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune tranche grasse à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +25 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE nourriture SET tranche_grasse = tranche_grasse -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT tranche_grasse FROM nourriture WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                tranche_grasse = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre tranche grasse, il vous en reste [ __ \`${tranche_grasse}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, cliquez sur le poisson que vous souhaitez consommer.**

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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun saumon à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +10 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE poisson SET saumon = saumon -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT saumon FROM poisson WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                saumon = 0,
                            } = rows[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre saumon, il vous en reste [ __ \`${saumon}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332488571629867039/INV_Misc_Fish_76.png?ex=679a0d6f&is=6798bbef&hm=fefe46cacd99f0171086ef13a337f9621c0d5e2b8b7a83625a83583849c48dc3&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
							else if (selectedValue === 'bar') {
                    if ( bar === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun bar à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +10 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE poisson SET bar = bar -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT bar FROM poisson WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                bar = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre bar, il vous en reste [ __ \`${bar}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332488571629867039/INV_Misc_Fish_76.png?ex=679a0d6f&is=6798bbef&hm=fefe46cacd99f0171086ef13a337f9621c0d5e2b8b7a83625a83583849c48dc3&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
							else if (selectedValue === 'truite') {
                    if ( truite === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun truite à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +10 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE poisson SET truite = truite -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT truite FROM poisson WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                truite = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre truite, il vous en reste [ __ \`${truite}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332488571629867039/INV_Misc_Fish_76.png?ex=679a0d6f&is=6798bbef&hm=fefe46cacd99f0171086ef13a337f9621c0d5e2b8b7a83625a83583849c48dc3&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
							else if (selectedValue === 'sardine') {
                    if ( sardine === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun sardine à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +10 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE poisson SET sardine = sardine -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT sardine FROM poisson WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                sardine = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre sardine, il vous en reste [ __ \`${sardine}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332488571629867039/INV_Misc_Fish_76.png?ex=679a0d6f&is=6798bbef&hm=fefe46cacd99f0171086ef13a337f9621c0d5e2b8b7a83625a83583849c48dc3&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
							else if (selectedValue === 'bulot') {
                    if ( bulot === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun bulot à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +10 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE poisson SET bulot = bulot -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT bulot FROM poisson WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                bulot = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre bulot, il vous en reste [ __ \`${bulot}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332488571629867039/INV_Misc_Fish_76.png?ex=679a0d6f&is=6798bbef&hm=fefe46cacd99f0171086ef13a337f9621c0d5e2b8b7a83625a83583849c48dc3&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
							else if (selectedValue === 'vieille') {
                    if ( vieille === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun vieille à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +10 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE poisson SET vieille = vieille -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT vieille FROM poisson WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                vieille = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre vieille, il vous en reste [ __ \`${vieille}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332488571629867039/INV_Misc_Fish_76.png?ex=679a0d6f&is=6798bbef&hm=fefe46cacd99f0171086ef13a337f9621c0d5e2b8b7a83625a83583849c48dc3&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
							else if (selectedValue === 'thon') {
                    if ( thon === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun thon à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +10 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE poisson SET thon = thon -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT thon FROM poisson WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                thon = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre thon, il vous en reste [ __ \`${thon}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332488571629867039/INV_Misc_Fish_76.png?ex=679a0d6f&is=6798bbef&hm=fefe46cacd99f0171086ef13a337f9621c0d5e2b8b7a83625a83583849c48dc3&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
							else if (selectedValue === 'dorade') {
                    if ( dorade === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun dorade à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +10 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE poisson SET dorade = dorade -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT dorade FROM poisson WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                dorade = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre dorade, il vous en reste [ __ \`${dorade}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332488571629867039/INV_Misc_Fish_76.png?ex=679a0d6f&is=6798bbef&hm=fefe46cacd99f0171086ef13a337f9621c0d5e2b8b7a83625a83583849c48dc3&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
							else if (selectedValue === 'lieu') {
                    if ( lieu === 0 ) {
											await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun lieu à manger !**

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
										const connection = await db.getConnection();
														await db.execute(
				                    'UPDATE personnage SET faim = faim +10 WHERE id_membre = ?',
				                    [memberId]
				                    );
                            const [rows] = await connection.execute(
                                'SELECT faim FROM personnage WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                faim = 0,
                            } = rows[0];
														await db.execute(
				                    'UPDATE poisson SET lieu = lieu -1 WHERE id_membre = ?',
				                    [memberId]
				                    );
														const [rows2] = await connection.execute(
                                'SELECT lieu FROM poisson WHERE id_membre = ?',
                                [memberId]
                            );
                            const {
                                lieu = 0,
                            } = rows2[0];
										await i.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
            \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre lieu, il vous en reste [ __ \`${lieu}\`__ ]. Vous êtes désormais à [ __ \`${faim}\`__ ] de satiété.**

            \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332488571629867039/INV_Misc_Fish_76.png?ex=679a0d6f&is=6798bbef&hm=fefe46cacd99f0171086ef13a337f9621c0d5e2b8b7a83625a83583849c48dc3&')
                .setImage('https://media1.tenor.com/m/EcUruzW454AAAAAd/meat-cooking.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
            }
								});
                                collector.stop()
						}
                });
                const connection = await db.getConnection();
									await db.execute(
				                    'UPDATE personnage SET notified = 0 WHERE id_membre = ?',
				                    [memberId]
				                    );
            }
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
