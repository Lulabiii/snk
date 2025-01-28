const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
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
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
                ],
                flags: 0,
            });
						return;
					}
					else if ( faim < 50 {
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('button_nourriture')
                    .setEmoji('<:viande:1332436030422388756>')
                    .setStyle('Secondary'),
                new ButtonBuilder()
                    .setCustomId('button_poisson')
                    .setEmoji('<:1266038099637571688:1304167358927208570>')
                    .setStyle('Secondary'),
                new ButtonBuilder()
                    .setCustomId('button_fruit')
                    .setEmoji('<:coffre:1332436827470168075>')
                    .setStyle('Secondary'),
							new ButtonBuilder()
                    .setCustomId('button_legumes')
                    .setEmoji('<:coffre:1332436827470168075>')
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
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
                ],
                components: [row],
                flags: 0,
            });
            const filter = (btnInteraction) => btnInteraction.user.id === memberId;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

						collector.on('collect', async (btnInteraction) => {
							if (btnInteraction.customId === 'button_fruit') {
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, cliquez sur la nourriture que vous souhaitez consommer.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune entre-côte à manger !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre entre-côte, il vous en reste [ __ \`${entre_côte}\__ ]. Vous êtes désormais à [ __ \`${faim}\__ ] de satiété.`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun jambon à manger !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre jambon, il vous en reste [ __ \`${jambon}\__ ]. Vous êtes désormais à [ __ \`${faim}\__ ] de satiété.`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun faux filets à manger !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre faux filet, il vous en reste [ __ \`${faux_filet}\__ ]. Vous êtes désormais à [ __ \`${faim}\__ ] de satiété.`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune bavette à manger !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre bavette, il vous en reste [ __ \`${bavette}\__ ]. Vous êtes désormais à [ __ \`${faim}\__ ] de satiété.`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune saucisse à manger !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre saucisse, il vous en reste [ __ \`${saucisse}\__ ]. Vous êtes désormais à [ __ \`${faim}\__ ] de satiété.`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune tranche grasse à manger !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre tranche_grasse, il vous en reste [ __ \`${tranche_grasse}\__ ]. Vous êtes désormais à [ __ \`${faim}\__ ] de satiété.`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
            }
								}
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, cliquez sur la nourriture que vous souhaitez consommer.**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune entre-côte à manger !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre entre-côte, il vous en reste [ __ \`${entre_côte}\__ ]. Vous êtes désormais à [ __ \`${faim}\__ ] de satiété.`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun jambon à manger !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre jambon, il vous en reste [ __ \`${jambon}\__ ]. Vous êtes désormais à [ __ \`${faim}\__ ] de satiété.`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucun faux filets à manger !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre faux filet, il vous en reste [ __ \`${faux_filet}\__ ]. Vous êtes désormais à [ __ \`${faim}\__ ] de satiété.`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune bavette à manger !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre bavette, il vous en reste [ __ \`${bavette}\__ ]. Vous êtes désormais à [ __ \`${faim}\__ ] de satiété.`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune saucisse à manger !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre saucisse, il vous en reste [ __ \`${saucisse}\__ ]. Vous êtes désormais à [ __ \`${faim}\__ ] de satiété.`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez aucune tranche grasse à manger !**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:poisson_chat:1234607049053044809> ] — __Rᥱρᥲs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre tranche_grasse, il vous en reste [ __ \`${tranche_grasse}\__ ]. Vous êtes désormais à [ __ \`${faim}\__ ] de satiété.`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
            }
								}
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
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre saumon, il vous en reste [ __ \`${saumon}\__ ]. Vous êtes désormais à [ __ \`${faim}\__ ] de satiété.`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre bar, il vous en reste [ __ \`${bar}\__ ]. Vous êtes désormais à [ __ \`${faim}\__ ] de satiété.`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre truite, il vous en reste [ __ \`${truite}\__ ]. Vous êtes désormais à [ __ \`${faim}\__ ] de satiété.`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre sardine, il vous en reste [ __ \`${sardine}\__ ]. Vous êtes désormais à [ __ \`${faim}\__ ] de satiété.`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre bulot, il vous en reste [ __ \`${bulot}\__ ]. Vous êtes désormais à [ __ \`${faim}\__ ] de satiété.`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre vieille, il vous en reste [ __ \`${vieille}\__ ]. Vous êtes désormais à [ __ \`${faim}\__ ] de satiété.`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre thon, il vous en reste [ __ \`${thon}\__ ]. Vous êtes désormais à [ __ \`${faim}\__ ] de satiété.`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre dorade, il vous en reste [ __ \`${dorade}\__ ]. Vous êtes désormais à [ __ \`${faim}\__ ] de satiété.`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
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
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous mangez donc votre lieu, il vous en reste [ __ \`${lieu}\__ ]. Vous êtes désormais à [ __ \`${faim}\__ ] de satiété.`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332094788538994719/INV_Misc_Bag_08.png?ex=6794aa32&is=679358b2&hm=f347d88031a4971419ecfb2316b9ec6a763c891b657da733aad59f616bc7322c&')
                .setImage('https://media1.tenor.com/m/lz62Bs8vM10AAAAd/beast-titan-zeke-yeager.gif')
                ],
                flags: 0,
            });
									}
                    collector2.stop();
                }
            }
								}
						})
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
