const { Events, AttachmentBuilder, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const db = require('../../database.js');
const { validé } = require('../../Fonction_commandes/validé.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('prix')
        .setDescription("Permets à l'utilisateur d'afficher les prixs actuel et leur augmentation récente."),

    async execute(interaction) {
        const targetMember = interaction.member;
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
            const connection = await db.getConnection();
            const [rows] = await connection.execute(
                'SELECT salade,carotte,patate,chou,tomate,orange,poire,cerise,raisin,banane,pomme,avocat,framboise,pruneau,mure,saumon,bar,truite,sardine,bulot,vieille,thon,dorade,lieu,pain,entre_côte,jambon,faux_filet,bavette,saucisse,tranche_grasse,blé FROM prix WHERE id_membre = ?',
                ['690553892013867099']
            );
            const {
                salade = 0,
                carotte = 0,
                patate = 0,
                chou = 0,
                tomate = 0,
                orange = 0,
                poire = 0,
                cerise = 0,
                raisin = 0,
                banane = 0,
                pomme = 0,
                avocat = 0,
                framboise = 0,
                pruneau = 0,
                mure = 0,
                saumon = 0,
                bar = 0,
                truite = 0,
                sardine = 0,
                bulot = 0,
                vieille = 0,
                dorade = 0,
                thon = 0,
                lieu = 0,
                pain = 0,
                entre_côte = 0,
                jambon = 0,
                faux_filet = 0,
                bavette = 0,
                saucisse = 0,
                tranche_grasse = 0,
                blé = 0,
            } = rows[0];
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
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:gold:1304167372999098489> ] — __Prιx__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, voici les prix actuel ainsi que leurs augmentation récente.**
        
        \`\`\` \`\`\`
                            `)
                            .setColor(0xFFFFFF)
                            .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1333077594857275423/INV_10_Fishing_DragonIslesCoins_Gold.png?ex=67a4c3c1&is=67a37241&hm=f31d20ef2a82eb708986ae59c9ceba6ae97edea08283b430028fdc71af92c78d&')
                            .setImage('https://www.buzzfrance.fr/wp-content/uploads/2021/06/eren-snk.gif')
                        ],
                        flags: 64, components : [row],
                    });
                    const filter = (btnInteraction) => btnInteraction.user.id === memberId;
                    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
        
                                collector.on('collect', async (btnInteraction) => {
                                    if (btnInteraction.customId === 'button_poisson') { 
                                        await btnInteraction.reply({
                                            embeds: [
                                                new EmbedBuilder()
                                                    .setDescription(`
                                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:inventaire:1234628961389121647> ] — __Prιx__**
                                        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, voici les prixs.**
                                                    `)
                                                    .addFields(
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Sᥲᥙmoᥒ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${saumon ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Bᥲr`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${bar ?? '0'}__**`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Trᥙιtᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${truite ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Sᥲrdιᥒᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${sardine ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Bᥙᥣot`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${bulot ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Vιᥱιᥣᥣᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${vieille ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Thoᥒ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${thon ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Dorᥲdᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${dorade ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Lιᥱᥙ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${lieu ?? '0'}__**¥`, inline: true },
                                                    )
                                                    .setColor(0xFFFFFF)
                                                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332488571629867039/INV_Misc_Fish_76.png?ex=6795702f&is=67941eaf&hm=5f5f8c6ee69fb270026121fc10c25c5cadcbb2db9ab2b58dff9d2d3d2b27c08b&')
                                                    .setImage('https://i.pinimg.com/originals/e2/1b/3e/e21b3e5513c79ceca5432a184d9f8e55.gif')
                                            ],
                                            flags: 64,
                                        });
                                        collector.stop();
                                    }
                                    else if (btnInteraction.customId === 'button_legumes') {
                                        await btnInteraction.reply({
                                            embeds: [
                                                new EmbedBuilder()
                                                    .setDescription(`
                                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:inventaire:1234628961389121647> ] — __Prιx__**
                                        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, voici les prixs.**
                                                    `)
                                                    .addFields(
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Sᥲᥣᥲdᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${salade ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Cᥲrottᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${carotte ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Pᥲtᥲtᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${patate ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Choᥙ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${chou ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Tomᥲtᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${tomate ?? '0'}__**¥`, inline: true },
                                                    )
                                                    .setColor(0xFFFFFF)
                                                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332496383537582173/INV_Misc_Food_Wheat_01.png?ex=67957776&is=679425f6&hm=87b2198aab9c7f335037f7fdce03e800172ac1bfbdf85d39101eddf198e59ddf&')
                                                    .setImage('https://media1.tenor.com/m/F1dA-vgRx2QAAAAd/jarrehh-sophie-eating-strength-armin-mikasa.gif')
                                            ],
                                            flags: 64,
                                        });
                                        collector.stop()
                                     }
                                    else if (btnInteraction.customId === 'button_fruit') { 
                                        await btnInteraction.reply({
                                            embeds: [
                                                new EmbedBuilder()
                                                    .setDescription(`
                                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:inventaire:1234628961389121647> ] — __Prιx__**
                                        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, voici les prixs.**
                                                    `)
                                                    .addFields(
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Orᥲᥒgᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${orange ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Poιrᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${poire ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Cᥱrιsᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${cerise ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Rᥲιsιᥒ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${raisin ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Bᥲᥒᥲᥒᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${banane ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Pommᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${pomme ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Avoᥴᥲt`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${avocat ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Frᥲmboιsᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${framboise ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Prᥙᥒᥱᥲᥙ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${pruneau ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Mᥙrᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${mure ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Bᥣᥱ́`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${blé ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Pᥲιᥒ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${pain ?? '0'}__**¥`, inline: true },
                                                    )
                                                    .setColor(0xFFFFFF)
                                                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332496383537582173/INV_Misc_Food_Wheat_01.png?ex=67957776&is=679425f6&hm=87b2198aab9c7f335037f7fdce03e800172ac1bfbdf85d39101eddf198e59ddf&')
                                                    .setImage('https://media1.tenor.com/m/F1dA-vgRx2QAAAAd/jarrehh-sophie-eating-strength-armin-mikasa.gif')
                                            ],
                                            flags: 64,
                                        });
                                        collector.stop()
                                    }
                                    else if (btnInteraction.customId === 'button_nourriture') {
                                        await btnInteraction.reply({
                                            embeds: [
                                                new EmbedBuilder()
                                                    .setDescription(`
                                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:inventaire:1234628961389121647> ] — __Prιx__**
                                        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, voici les prixs.**
                                                    `)
                                                    .addFields(
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Côtᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${entre_côte ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Jᥲmboᥒ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${jambon ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Fιᥣᥱts`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${faux_filet ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Bᥲvᥱttᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${bavette ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Sᥲᥙᥴιssᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${saucisse ?? '0'}__**¥`, inline: true },
                                                        { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Oᥒgᥣᥱt`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${tranche_grasse ?? '0'}__**¥`, inline: true },
                                                    )
                                                    .setColor(0xFFFFFF)
                                                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332492222280503306/INV_Misc_Food_132_Meat.png?ex=67957396&is=67942216&hm=b50df1530cc2f0bd9e586c42e9bcb7f9253dbc1a8282b394c5bdea51b6684bdc&')
                                                    .setImage('https://media1.tenor.com/m/fb7BOrBCmy8AAAAd/eren-attack-on-titan.gif')
                                            ],
                                            flags: 64,
                                        });
                                        collector.stop()
                                     }

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
}

const config = require('../../config.json');
        const { Client, GatewayIntentBits } = require('discord.js');
        const client = new Client({
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
            token: config.token
        });
        client.login(config.token);

        async function updatePrices(interaction) {
            try {
                // Récupération des noms de colonnes de la table `prix`
                const [columns] = await db.execute("SHOW COLUMNS FROM prix");
                const itemColumns = columns.map(col => col.Field).filter(field => field !== "id_membre");
                const channel = interaction.guild.channels.cache.get('1304183470771273803');
        
        
                if (itemColumns.length === 0) {
                    await interaction.reply("Aucune colonne d'item trouvée.");
                    return;
                }
        
                let updateQueryPrix = "UPDATE prix SET ";
                let updateQueryAugmentation = "UPDATE augmentation SET ";
                let updateValuesPrix = [];
                let updateValuesAugmentation = [];
        
                for (const column of itemColumns) {
                    const [rows] = await db.execute(`SELECT \`${column}\` FROM prix`);
                    if (rows.length > 0) {
                        const prixInitial = rows[0][column];
        
                        const pourcentage = (Math.random() * 100 - 50).toFixed(2); // Entre -50% et +50%
                        const facteur = 1 + pourcentage / 100;
                        const nouveauPrix = Math.max(1, Math.round(prixInitial * facteur));
        
                        // Ajout du nom de la colonne directement dans la requête
                        updateQueryPrix += `\`${column}\` = ?, `;
                        updateValuesPrix.push(nouveauPrix);
        
                        updateQueryAugmentation += `\`augmentation_${column}\` = ?, `;
                        updateValuesAugmentation.push(pourcentage);
                    }
                }
        
                // Suppression de la dernière virgule et espace dans les requêtes SQL
                updateQueryPrix = updateQueryPrix.slice(0, -2);
                updateQueryAugmentation = updateQueryAugmentation.slice(0, -2);
        
                // Ajout de la clause WHERE pour ne pas mettre à jour tous les membres
                updateQueryAugmentation += " WHERE id_membre = ?";
                updateValuesAugmentation.push(690553892013867099);
        
                // Exécution des requêtes SQL uniquement si des valeurs ont été ajoutées
                if (updateValuesPrix.length > 0) {
                    await db.execute(updateQueryPrix, updateValuesPrix);
                }
                if (updateValuesAugmentation.length > 1) {
                    await db.execute(updateQueryAugmentation, updateValuesAugmentation);
                }
                const connection = await db.getConnection();
                const [rows] = await connection.execute(
                    'SELECT salade,carotte,patate,chou,tomate,orange,poire,cerise,raisin,banane,pomme,avocat,framboise,pruneau,mure,saumon,bar,truite,sardine,bulot,vieille,thon,dorade,lieu,pain,entre_côte,jambon,faux_filet,bavette,saucisse,tranche_grasse,blé FROM prix WHERE id_membre = ?',
                    ['690553892013867099']
                );
                const {
                    salade = 0,
                    carotte = 0,
                    patate = 0,
                    chou = 0,
                    tomate = 0,
                    orange = 0,
                    poire = 0,
                    cerise = 0,
                    raisin = 0,
                    banane = 0,
                    pomme = 0,
                    avocat = 0,
                    framboise = 0,
                    pruneau = 0,
                    mure = 0,
                    saumon = 0,
                    bar = 0,
                    truite = 0,
                    sardine = 0,
                    bulot = 0,
                    vieille = 0,
                    dorade = 0,
                    thon = 0,
                    lieu = 0,
                    pain = 0,
                    entre_côte = 0,
                    jambon = 0,
                    faux_filet = 0,
                    bavette = 0,
                    saucisse = 0,
                    tranche_grasse = 0,
                    blé = 0,
                } = rows[0];
                const [rows2] = await connection.execute(
                    'SELECT augmentation_salade,augmentation_carotte,augmentation_patate,augmentation_chou,augmentation_tomate,augmentation_orange,augmentation_poire,augmentation_cerise,augmentation_raisin,augmentation_banane,augmentation_pomme,augmentation_avocat,augmentation_framboise,augmentation_pruneau,augmentation_mure,augmentation_saumon,augmentation_bar,augmentation_truite,augmentation_sardine,augmentation_bulot,augmentation_vieille,augmentation_thon,augmentation_dorade,augmentation_lieu,augmentation_pain,augmentation_entre_côte,augmentation_jambon,augmentation_faux_filet,augmentation_bavette,augmentation_saucisse,augmentation_tranche_grasse,augmentation_blé FROM augmentation WHERE id_membre = ?',
                    ['690553892013867099']
                );
                const {
                    augmentation_salade = 0,
                    augmentation_carotte = 0,
                    augmentation_patate = 0,
                    augmentation_chou = 0,
                    augmentation_tomate = 0,
                    augmentation_orange = 0,
                    augmentation_poire = 0,
                    augmentation_cerise = 0,
                    augmentation_raisin = 0,
                    augmentation_banane = 0,
                    augmentation_pomme = 0,
                    augmentation_avocat = 0,
                    augmentation_framboise = 0,
                    augmentation_pruneau = 0,
                    augmentation_mure = 0,
                    augmentation_saumon = 0,
                    augmentation_bar = 0,
                    augmentation_truite = 0,
                    augmentation_sardine = 0,
                    augmentation_bulot = 0,
                    augmentation_vieille = 0,
                    augmentation_dorade = 0,
                    augmentation_thon = 0,
                    augmentation_lieu = 0,
                    augmentation_pain = 0,
                    augmentation_entre_côte = 0,
                    augmentation_jambon = 0,
                    augmentation_faux_filet = 0,
                    augmentation_bavette = 0,
                    augmentation_saucisse = 0,
                    augmentation_tranche_grasse = 0,
                    augmentation_blé = 0,
                } = rows2[0];
                await channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`
                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:inventaire:1234628961389121647> ] — __Prιx__**
                <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Les prixs viennent de changer !**
                            `)
                            .addFields(
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Sᥲᥙmoᥒ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${saumon ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_saumon}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Bᥲr`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${bar ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_bar}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Trᥙιtᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${truite ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_truite}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Sᥲrdιᥒᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${sardine ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_sardine}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Bᥙᥣot`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${bulot ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_bulot}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Vιᥱιᥣᥣᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${vieille ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_vieille}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Thoᥒ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${thon ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_thon}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Dorᥲdᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${dorade ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_dorade}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Lιᥱᥙ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${lieu ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_lieu}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Côtᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${entre_côte ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_entre_côte}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Jᥲmboᥒ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${jambon ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_jambon}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Fιᥣᥱts`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${faux_filet ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_faux_filet}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Bᥲvᥱttᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${bavette ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_bavette}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Sᥲᥙᥴιssᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${saucisse ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_saucisse}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Oᥒgᥣᥱt`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${tranche_grasse ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_tranche_grasse}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Sᥲᥣᥲdᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${salade ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_salade}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Cᥲrottᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${carotte ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_carotte}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Pᥲtᥲtᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${patate ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_patate}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Choᥙ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${chou ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_chou}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Tomᥲtᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${tomate ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_tomate}%\`__ ]**`, inline: true },
                                
                            )
                            .setColor(0xFFFFFF)
                            .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332496383537582173/INV_Misc_Food_Wheat_01.png?ex=67957776&is=679425f6&hm=87b2198aab9c7f335037f7fdce03e800172ac1bfbdf85d39101eddf198e59ddf&')
                            .setImage('https://media1.tenor.com/m/F1dA-vgRx2QAAAAd/jarrehh-sophie-eating-strength-armin-mikasa.gif')
                    ],
                });
                await channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`
                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:inventaire:1234628961389121647> ] — __Prιx__**
                <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Les prixs viennent de changer ! #2**
                            `)
                            .addFields(
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Orᥲᥒgᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${orange ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_orange}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Poιrᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${poire ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_poire}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Cᥱrιsᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${cerise ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_cerise}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Rᥲιsιᥒ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${raisin ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_raisin}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Bᥲᥒᥲᥒᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${banane ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_banane}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Pommᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${pomme ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_pomme}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Avoᥴᥲt`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${avocat ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_avocat}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Frᥲmboιsᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${framboise ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_framboise}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Prᥙᥒᥱᥲᥙ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${pruneau ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_pruneau}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Mᥙrᥱ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${mure ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_mure}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Bᥣᥱ́`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${blé ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_blé}%\`__ ]**`, inline: true },
                                { name: '<:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __`Pᥲιᥒ`__ ]', value: `<:Sans_titre_349_20240519142111Cop:1304168162392019066> **__${pain ?? '0'}__**¥\n**<:Sans_titre_349_20240519142111Cop:1304168162392019066> + [ __\`${augmentation_pain}%\`__ ]**`, inline: true },
                                
                            )
                            .setColor(0xFFFFFF)
                            .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332496383537582173/INV_Misc_Food_Wheat_01.png?ex=67957776&is=679425f6&hm=87b2198aab9c7f335037f7fdce03e800172ac1bfbdf85d39101eddf198e59ddf&')
                            .setImage('https://c.tenor.com/VCFZnE8WKIwAAAAd/tenor.gif')
                    ],
                });
                return;
            } catch (error) {
                console.error('Erreur lors de la mise à jour des prix :', error);
                return;
            }
        }
        
        setInterval(updatePrices, 24 * 60 * 60 * 1000);
        