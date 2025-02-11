const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const db = require('../../database.js');
const { validé } = require('../../Fonction_commandes/validé.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profilᶜʳᵉᵉʳ')
        .setDescription("Permet au membre de créer son profil."),
    async execute(interaction) {
        const member = interaction.member;
        const userId = interaction.user.id;

        const roleIdBe = '1304183173311107104';
        const roleIdBs = '1304183180307464226';
        const roleIdGa = '1304183188024725676';
        const roleIdSol = '1304548585647509636';
        const roleIdRecrue = '1304183179325866120';
        const roleIdRecrueBs = '1304183187056103434';
        const roleIdRecrueGa = '1304183192856563783';
        const roleIdFamille = '1304183193859129364';
        const roleIdWork = '1304183207414988820';
        const roleIdPréstige = '1304183215136833596';
        const roleIdDivider1 = '1304183225987502251';
        const roleIdTalent = '1304183226906181703';
        const roleIdAffinité = '1304183237785944175';
        const roleIdDivider2 = '1304183244178329694';
        const roleIdForce = '1304183245302399109';
        const roleIdForce0 = '1304183256765304904';
        const roleIdRésistance = '1304183257700765797';
        const roleIdRésistance0 = '1304183269599871057';
        const roleIdAgilité = '1304183270988189716';
        const roleIdAgilité0 = '1304183288109207652';
        const roleIdTridi = '1304183290097438740';
        const roleIdTridi0 = '1304183301602541678';
        const roleIdSabre = '1304183303196377238';
        const roleIdSabre0 = '1304183315493945514';
        const roleIdDivider3 = '1304183332258713633';
        const roleIdBeEscouade = '1304887496198328391';
        const roleIdBsEscouade = '1304887505404825700';
        const roleIdGaEscouade = '1304887505996218511';
        const roleIdEscouade = '1304183166893817857';
        const roleIdDieuTalent = '1304183227497320451';
        const roleIdXpTalent = '1304183228826910772';
        const roleIdForceSurhumaineTalent = '1304183230429397002';
        const roleIdRésistanceIncompTalent = '1304183231251222620';
        const roleIdTridiTalent = '1304183232321032262';
        const roleIdSabreTalent = '1304183232970887179';
        const roleIdEnduTalent = '1304183234208333834';
        const roleIdForceTalent = '1304183235105914981';
        const roleIdRésiTalent = '1304183235818946575';
        const roleIdAgiTalent = '1304183236649422943';
        const roleIdForce2 = '1304183254517022831';
        const roleIdAgi2 = '1304183286158852116';
        const roleIdRési2 = '1304183267360116736';
        const roleIdTridi2 = '1304183299219914803';
        const roleIdSabre2 = '1304183313295999029';
        const roleIdAgi1 = '1304183287274672140';
        const roleIdRési1 = '1304183268517740655';
        const roleIdForce3 = '1304183253451804713';
        const roleIdRési3 = '1304183266420719626';
        const roleAgi = interaction.member.roles.cache.has(roleIdAgiTalent);
        const roleRési = interaction.member.roles.cache.has(roleIdRésiTalent);
        const roleForce = interaction.member.roles.cache.has(roleIdForceTalent);
        const roleEndu = interaction.member.roles.cache.has(roleIdEnduTalent);
        const roleSabre = interaction.member.roles.cache.has(roleIdSabreTalent);
        const roleTridi = interaction.member.roles.cache.has(roleIdTridiTalent);
        const roleRésiIncomp = interaction.member.roles.cache.has(roleIdRésistanceIncompTalent);
        const roleForceSur = interaction.member.roles.cache.has(roleIdForceSurhumaineTalent);
        const roleXp = interaction.member.roles.cache.has(roleIdXpTalent);
        const roleDieu = interaction.member.roles.cache.has(roleIdDieuTalent);
        const roleSol = interaction.member.roles.cache.has(roleIdSol);
        const roleBe = interaction.member.roles.cache.has(roleIdBeEscouade);
        const roleBs = interaction.member.roles.cache.has(roleIdBsEscouade);
        const roleGa = interaction.member.roles.cache.has(roleIdGaEscouade);
        let corp = ``;

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
                'SELECT validé FROM personnage WHERE id_membre = ?',
                [userId]
            );
            connection.release();

            if (rows.length === 0 || rows[0].validé !== 'Validé') {
                await interaction.reply({
                    embeds: [{
                        description: `
    \`\`\` \`\`\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1231609048273653801Copie:1304167335879381073> ] — __Profιᥣ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'êtes pas validé !**
    
    \`\`\` \`\`\`
                    `,
                    color: 0xFFFFFF,
                    thumbnail: {
                        url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540538158190732/Ability_Hunter_OneWithNature.png?ex=67306c4d&is=672f1acd&hm=ee10e83b8c1398b469479d738fe8bdbf3ebeb3af32f8b90770400a63c3cee3b3&',
                    },
                    image: {
                        url: 'https://media1.tenor.com/m/m-nDhNedJIAAAAAd/aot-titans.gif',
                    },
                    }],
                    flags: 64,
                });
                return;
            }
            if (roleSol) {
                await interaction.reply({
                    embeds: [{
                        description: `Vous êtes déjà recensé.`,
                        color: 0xFFFFFF,
                    }],
                    flags: 0,
                });
                return;
            } else if (roleBe) {
                corp = `Bᥲtᥲιᥣᥣoᥒ d'ᥱxρᥣorᥲtιoᥒ`;
            } else if (roleBs) {
                corp = `Brιgᥲdᥱs sρᥱ́ᥴιᥲᥣᥱs`;
            } else if (roleGa) {
                corp = `Gᥲrᥒιsoᥒ`;
            }

            await interaction.reply({
                embeds: [{
                    description: `
\`\`\` \`\`\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1231609048273653801Copie:1304167335879381073> ] — __Profιᥣ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, quel est le nom de votre personnage ?**

\`\`\` \`\`\`
                `,
                color: 0xFFFFFF,
                thumbnail: {
                    url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540538158190732/Ability_Hunter_OneWithNature.png?ex=67306c4d&is=672f1acd&hm=ee10e83b8c1398b469479d738fe8bdbf3ebeb3af32f8b90770400a63c3cee3b3&',
                },
                image: {
                    url: 'https://media1.tenor.com/m/m-nDhNedJIAAAAAd/aot-titans.gif',
                },
                }]
            });
            const filter = m => m.author.id === userId;
            const collector = interaction.channel.createMessageCollector({ filter, max: 1, time: 60000 });

            collector.on('collect', async message => {
                const characterName = message.content;


                try {

                    const embed1 = new EmbedBuilder()
                        .setColor(0xFFFFFF)
                        .setDescription(`
\`\`\` \`\`\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1231609048273653801Copie:1304167335879381073> ] — __Profιᥣ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, le nom de votre personnage, \`${characterName}\`, a bien été enregistré ! Maintenant quel est le __prénom__ de votre personnage ? ( avec une majuscule )**

\`\`\` \`\`\`
                        `)
                        .setImage('https://media1.tenor.com/m/m-nDhNedJIAAAAAd/aot-titans.gif')
                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1304540538158190732/Ability_Hunter_OneWithNature.png?ex=67306c4d&is=672f1acd&hm=ee10e83b8c1398b469479d738fe8bdbf3ebeb3af32f8b90770400a63c3cee3b3&');

                    await interaction.followUp({ embeds: [embed1] });

                    const filter1 = m => m.author.id === userId;
                    const collector1 = interaction.channel.createMessageCollector({ filter: filter1, max: 1, time: 60000 });

                    collector1.on('collect', async message => {
                        const characterPrénom = message.content;


                        try {

                            const embed2 = new EmbedBuilder()
                                .setColor(0xFFFFFF)
                                .setDescription(`
\`\`\` \`\`\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1231609048273653801Copie:1304167335879381073> ] — __Profιᥣ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, le prénom de votre personnage, \`${characterPrénom}\`, a bien été enregistré ! À quel sexe apprtient votre personnage ? [ __\`Homme / Femme\`__ ].**

\`\`\` \`\`\`
                            `)
                                .setImage('https://media1.tenor.com/m/m-nDhNedJIAAAAAd/aot-titans.gif')
                                .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1304540538158190732/Ability_Hunter_OneWithNature.png?ex=67306c4d&is=672f1acd&hm=ee10e83b8c1398b469479d738fe8bdbf3ebeb3af32f8b90770400a63c3cee3b3&');

                            await interaction.followUp({ embeds: [embed2] });
                            const filter7 = m => m.author.id === userId;
                            const collector7 = interaction.channel.createMessageCollector({ filter: filter7, max: 1, time: 60000 });

                            collector7.on('collect', async message => {
                                const sexe_message = message.content;
                                let sexe = ``;
                                const row = new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId(`set_profile_button_${interaction.user.id}`)
                                        .setLabel('✅')
                                        .setStyle(ButtonStyle.Success),
                                        new ButtonBuilder()
                                        .setCustomId(`button_non`)
                                        .setLabel('❌')
                                        .setStyle(ButtonStyle.Danger)
                                );
                                if (sexe_message === 'Homme') {
                                    sexe = 'Homme'
                                    await interaction.followUp({
                                        embeds: [{
                                            description: `
        \`\`\` \`\`\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1231609048273653801Copie:1304167335879381073> ] — __Profιᥣ__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, voici votre profil, le confirmez-vous ?**
            <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ \`Corps d'armée\`] — __${corp}__**
            <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ \`Nom\`] — __${characterName}__**
            <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ \`Prénom\`] — __${characterPrénom}__**
            <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ \`Sexe\`] — __${sexe}__**
        
        \`\`\` \`\`\``,
                                            color: 0xFFFFFF,
                                            thumbnail: {
                                                url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540538158190732/Ability_Hunter_OneWithNature.png?ex=67306c4d&is=672f1acd&hm=ee10e83b8c1398b469479d738fe8bdbf3ebeb3af32f8b90770400a63c3cee3b3&',
                                            },
                                            image: {
                                                url: 'https://media1.tenor.com/m/m-nDhNedJIAAAAAd/aot-titans.gif',
                                            },
                                        }],
                                        components: [row],
                                        ephemeral: false
                                    });
                                }
                                else if (sexe_message === 'Femme') {
                                    sexe = 'Femme'
                                    await interaction.followUp({
                                        embeds: [{
                                            description: `
        \`\`\` \`\`\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1231609048273653801Copie:1304167335879381073> ] — __Profιᥣ__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, voici votre profil, le confirmez-vous ?**
            <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ \`Corps d'armée\`] — __${corp}__**
            <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ \`Nom\`] — __${characterName}__**
            <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ \`Prénom\`] — __${characterPrénom}__**
            <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ \`Sexe\`] — __${sexe}__**
        
        \`\`\` \`\`\``,
                                            color: 0xFFFFFF,
                                            thumbnail: {
                                                url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540538158190732/Ability_Hunter_OneWithNature.png?ex=67306c4d&is=672f1acd&hm=ee10e83b8c1398b469479d738fe8bdbf3ebeb3af32f8b90770400a63c3cee3b3&',
                                            },
                                            image: {
                                                url: 'https://media1.tenor.com/m/m-nDhNedJIAAAAAd/aot-titans.gif',
                                            },
                                        }],
                                        components: [row],
                                        ephemeral: false
                                    });
                                }
                                collector1.on('end', collected => {
                                    if (collected.size === 0) {
                                        interaction.followUp('Temps écoulé pour répondre. Veuillez recommencer.');
                                    }
                                });

                        try {

                            const filter6 = i => i.customId === `set_profile_button_${interaction.user.id}` && i.user.id === interaction.user.id;
                            const collector6 = interaction.channel.createMessageComponentCollector({ filter6, time: 15000 });

                            collector6.on('collect', async i => {
                                if (i.customId === `set_profile_button_${interaction.user.id}`) {
                                    await i.reply({
                                        embeds: [{
                                            description: `
\`\`\` \`\`\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1231609048273653801Copie:1304167335879381073> ] — __Profιᥣ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vos informations ont bien été enregistrés ! Je vais te donner tes rôles.**

\`\`\` \`\`\``,
                                    color: 0xFFFFFF,
                                    thumbnail: {
                                        url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304863655598493706/Spell_Priest_VowofUnity.png?ex=6730f07a&is=672f9efa&hm=0145fc9bc3704f33ca51226d70ce9d1f5336e3707d2d8dbdc96dc133298e3ce5&',
                                    },
                                    image: {
                                        url: 'https://media1.tenor.com/m/m-nDhNedJIAAAAAd/aot-titans.gif',
                                    },
                                        }],
                                        components: []
                                    });
                                                            
                            const connection = await db.getConnection();
                            await connection.execute(
                                'UPDATE personnage SET prénom = ? WHERE id_membre = ?',
                                [characterPrénom, userId]
                            );
                            connection.release();
                            const connection1 = await db.getConnection();
                            await connection1.execute(
                                'UPDATE personnage SET nom = ? WHERE id_membre = ?',
                                [characterName, userId]
                            );
                            connection1.release();
                            const connection2 = await db.getConnection();
                            await connection2.execute(
                                'UPDATE personnage SET corp = ? WHERE id_membre = ?',
                                [corp, userId]
                            );
                            const connection3 = await db.getConnection();
                            await connection3.execute(
                                'UPDATE personnage SET sexe = ? WHERE id_membre = ?',
                                [sexe, userId]
                            );
                            connection2.release();
                            if (corp === `Bᥲtᥲιᥣᥣoᥒ d'ᥱxρᥣorᥲtιoᥒ`){
                                await member.roles.add(roleIdBe)
                                await member.roles.add(roleIdRecrue)
                                await member.roles.add(roleIdEscouade)
                                await member.roles.add(roleIdBeEscouade)
                                await member.roles.add(roleIdFamille)
                                await member.roles.add(roleIdWork)
                                await member.roles.add(roleIdPréstige)
                                await member.roles.add(roleIdDivider1)
                                await member.roles.add(roleIdTalent)
                                await member.roles.add(roleIdAffinité)
                                await member.roles.add(roleIdDivider2)
                                await member.roles.add(roleIdForce)
                                await member.roles.add(roleIdRésistance)
                                await member.roles.add(roleIdAgilité)
                                await member.roles.add(roleIdTridi)
                                await member.roles.add(roleIdSabre)
                                await member.roles.add(roleIdDivider3)
                                if (roleDieu) {
                                    await member.roles.add(roleIdRési2)
                                    await member.roles.add(roleIdTridi2)
                                    await member.roles.add(roleIdSabre2)
                                    await member.roles.add(roleIdForce2)
                                    await member.roles.add(roleIdAgi2)
                                    const connection = await db.getConnection();
                                    await connection.execute(
                                        'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection.release();
                                    const connection1 = await db.getConnection();
                                    await connection1.execute(
                                        'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection1.release();
                                    const connection2 = await db.getConnection();
                                    await connection2.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection2.release();
                                    const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                    const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection4.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    if (roleEndu) {
                                        await member.roles.add(roleIdAgi1)
                                        await member.roles.add(roleIdRési1)
                                        const connection1 = await db.getConnection();
                                    await connection1.execute(
                                        'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                        ['1',userId]
                                    );
                                    connection1.release();
                                    const connection2 = await db.getConnection();
                                    await connection2.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['1',userId]
                                    );
                                    connection2.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    if (roleRésiIncomp) {
                                        await member.roles.add(roleIdRési3)
                                        const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['3',userId]
                                        );
                                        connection2.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    if (roleForceSur) {
                                        await member.roles.add(roleIdForce3)
                                        const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['3',userId]
                                        );
                                        connection.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    if (roleForce) {
                                        await member.roles.add(roleIdForce2)
                                        const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdForce0)
                                        const connection = await db.getConnection();
                                    await connection.execute(
                                        'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection.release();
                                    }
                                    if (roleAgi) {
                                        await member.roles.add(roleIdAgi2)
                                        const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection1.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                         await member.roles.add(roleIdAgilité0)
                                         const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['0',userId]
                                        );
                                        connection1.release();

                                    }
                                    if (roleRési) {
                                        await member.roles.add(roleIdRési2)
                                        const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection2.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdRésistance0)
                                        const connection2 = await db.getConnection();
                                    await connection2.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection2.release();

                                    }
                                    if (roleTridi) {
                                        await member.roles.add(roleIdTridi2)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection4.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdTridi0)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection4.release();
                                    }
                                    if (roleSabre) {
                                        await member.roles.add(roleIdSabre2)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdSabre0)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                    }
                                }
                                if (roleEndu) {
                                    await member.roles.add(roleIdAgi1)
                                    await member.roles.add(roleIdRési1)
                                    await connection1.execute(
                                        'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                        ['1',userId]
                                    );
                                    connection1.release();
                                    const connection2 = await db.getConnection();
                                    await connection2.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['1',userId]
                                    );
                                    connection2.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    if (roleRésiIncomp) {
                                        await member.roles.add(roleIdRési3)
                                        const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['3',userId]
                                        );
                                        connection2.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    if (roleForceSur) {
                                        await member.roles.add(roleIdForce3)
                                        const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['3',userId]
                                        );
                                        connection.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    if (roleForce) {
                                        await member.roles.add(roleIdForce2)
                                        const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdForce0)
                                        const connection = await db.getConnection();
                                    await connection.execute(
                                        'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection.release();
                                    }
                                    if (roleAgi) {
                                        await member.roles.add(roleIdAgi2)
                                        const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection1.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                         await member.roles.add(roleIdAgilité0)
                                         const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['0',userId]
                                        );
                                        connection1.release();
                                    }
                                    if (roleRési) {
                                        await member.roles.add(roleIdRési2)
                                        const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection2.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdRésistance0)
                                        const connection2 = await db.getConnection();
                                    await connection2.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection2.release();
                                    }
                                    if (roleTridi) {
                                        await member.roles.add(roleIdTridi2)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection4.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdTridi0)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection4.release();
                                    }
                                    if (roleSabre) {
                                        await member.roles.add(roleIdSabre2)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdSabre0)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                    }
                                }
                                if (roleRésiIncomp) {
                                    await member.roles.add(roleIdRési3)
                                    const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['3',userId]
                                        );
                                        connection2.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    if (roleForceSur) {
                                        await member.roles.add(roleIdForce3)
                                        const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['3',userId]
                                        );
                                        connection.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    if (roleForce) {
                                        await member.roles.add(roleIdForce2)
                                        const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdForce0)
                                        const connection = await db.getConnection();
                                    await connection.execute(
                                        'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection.release();
                                    }
                                    if (roleAgi) {
                                        await member.roles.add(roleIdAgi2)
                                        const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection1.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                         await member.roles.add(roleIdAgilité0)
                                         const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['0',userId]
                                        );
                                        connection1.release();
                                    }
                                    if (roleRési) {
                                        await member.roles.add(roleIdRési2)
                                        const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection2.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdRésistance0)
                                        const connection2 = await db.getConnection();
                                    await connection2.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection2.release();
                                    }
                                    if (roleTridi) {
                                        await member.roles.add(roleIdTridi2)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection4.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdTridi0)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection4.release();
                                    }
                                    if (roleSabre) {
                                        await member.roles.add(roleIdSabre2)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdSabre0)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                    }
                                }
                                if (roleForceSur) {
                                    await member.roles.add(roleIdForce3)
                                    const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                        ['3',userId]
                                    );
                                    connection3.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    if (roleForce) {
                                        await member.roles.add(roleIdForce2)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdForce0)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                    }
                                    if (roleAgi) {
                                        await member.roles.add(roleIdAgi2)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                         await member.roles.add(roleIdAgilité0)
                                         const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                    }
                                    if (roleRési) {
                                        await member.roles.add(roleIdRési2)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdRésistance0)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                    }
                                    if (roleTridi) {
                                        await member.roles.add(roleIdTridi2)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection4.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdTridi0)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection4.release();
                                    }
                                    if (roleSabre) {
                                        await member.roles.add(roleIdSabre2)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdSabre0)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                    }
                                }
                                if (roleForce) {
                                    await member.roles.add(roleIdForce2)
                                    const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    await member.roles.add(roleIdForce0)
                                    const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['0',userId]
                                        );
                                        connection.release();
                                }
                                if (roleAgi) {
                                    await member.roles.add(roleIdAgi2)
                                    const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection1.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                     await member.roles.add(roleIdAgilité0)
                                     const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['0',userId]
                                        );
                                        connection1.release();
                                }
                                if (roleRési) {
                                    await member.roles.add(roleIdRési2)
                                    const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection2.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    await member.roles.add(roleIdRésistance0)
                                    const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['0',userId]
                                        );
                                        connection2.release();
                                }
                                if (roleTridi) {
                                    await member.roles.add(roleIdTridi2)
                                    const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection4.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    await member.roles.add(roleIdTridi0)
                                    const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection4.release();
                                }
                                if (roleSabre) {
                                    await member.roles.add(roleIdSabre2)
                                    const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    await member.roles.add(roleIdSabre0)
                                    const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                }
                            }
                            else if (corp === 'Brιgᥲdᥱs sρᥱ́ᥴιᥲᥣᥱs') {
                                await member.roles.add(roleIdBs)
                                await member.roles.add(roleIdRecrueBs)
                                await member.roles.add(roleIdEscouade)
                                await member.roles.add(roleIdBsEscouade)
                                await member.roles.add(roleIdFamille)
                                await member.roles.add(roleIdWork)
                                await member.roles.add(roleIdPréstige)
                                await member.roles.add(roleIdDivider1)
                                await member.roles.add(roleIdTalent)
                                await member.roles.add(roleIdAffinité)
                                await member.roles.add(roleIdDivider2)
                                await member.roles.add(roleIdForce)
                                await member.roles.add(roleIdRésistance)
                                await member.roles.add(roleIdAgilité)
                                await member.roles.add(roleIdTridi)
                                await member.roles.add(roleIdSabre)
                                await member.roles.add(roleIdDivider3)
                                if (roleDieu) {
                                    await member.roles.add(roleIdRési2)
                                    await member.roles.add(roleIdTridi2)
                                    await member.roles.add(roleIdSabre2)
                                    await member.roles.add(roleIdForce2)
                                    await member.roles.add(roleIdAgi2)
                                    const connection = await db.getConnection();
                                    await connection.execute(
                                        'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection.release();
                                    const connection1 = await db.getConnection();
                                    await connection1.execute(
                                        'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection1.release();
                                    const connection2 = await db.getConnection();
                                    await connection2.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection2.release();
                                    const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                    const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection4.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    if (roleEndu) {
                                        await member.roles.add(roleIdAgi1)
                                        await member.roles.add(roleIdRési1)
                                        const connection1 = await db.getConnection();
                                    await connection1.execute(
                                        'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                        ['1',userId]
                                    );
                                    connection1.release();
                                    const connection2 = await db.getConnection();
                                    await connection2.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['1',userId]
                                    );
                                    connection2.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    if (roleRésiIncomp) {
                                        await member.roles.add(roleIdRési3)
                                        const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['3',userId]
                                        );
                                        connection2.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    if (roleForceSur) {
                                        await member.roles.add(roleIdForce3)
                                        const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['3',userId]
                                        );
                                        connection.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    if (roleForce) {
                                        await member.roles.add(roleIdForce2)
                                        const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdForce0)
                                        const connection = await db.getConnection();
                                    await connection.execute(
                                        'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection.release();
                                    }
                                    if (roleAgi) {
                                        await member.roles.add(roleIdAgi2)
                                        const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection1.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                         await member.roles.add(roleIdAgilité0)
                                         const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['0',userId]
                                        );
                                        connection1.release();

                                    }
                                    if (roleRési) {
                                        await member.roles.add(roleIdRési2)
                                        const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection2.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdRésistance0)
                                        const connection2 = await db.getConnection();
                                    await connection2.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection2.release();

                                    }
                                    if (roleTridi) {
                                        await member.roles.add(roleIdTridi2)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection4.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdTridi0)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection4.release();
                                    }
                                    if (roleSabre) {
                                        await member.roles.add(roleIdSabre2)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdSabre0)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                    }
                                }
                                if (roleEndu) {
                                    await member.roles.add(roleIdAgi1)
                                    await member.roles.add(roleIdRési1)
                                    await connection1.execute(
                                        'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                        ['1',userId]
                                    );
                                    connection1.release();
                                    const connection2 = await db.getConnection();
                                    await connection2.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['1',userId]
                                    );
                                    connection2.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    if (roleRésiIncomp) {
                                        await member.roles.add(roleIdRési3)
                                        const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['3',userId]
                                        );
                                        connection2.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    if (roleForceSur) {
                                        await member.roles.add(roleIdForce3)
                                        const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['3',userId]
                                        );
                                        connection.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    if (roleForce) {
                                        await member.roles.add(roleIdForce2)
                                        const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdForce0)
                                        const connection = await db.getConnection();
                                    await connection.execute(
                                        'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection.release();
                                    }
                                    if (roleAgi) {
                                        await member.roles.add(roleIdAgi2)
                                        const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection1.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                         await member.roles.add(roleIdAgilité0)
                                         const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['0',userId]
                                        );
                                        connection1.release();
                                    }
                                    if (roleRési) {
                                        await member.roles.add(roleIdRési2)
                                        const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection2.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdRésistance0)
                                        const connection2 = await db.getConnection();
                                    await connection2.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection2.release();
                                    }
                                    if (roleTridi) {
                                        await member.roles.add(roleIdTridi2)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection4.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdTridi0)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection4.release();
                                    }
                                    if (roleSabre) {
                                        await member.roles.add(roleIdSabre2)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdSabre0)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                    }
                                }
                                if (roleRésiIncomp) {
                                    await member.roles.add(roleIdRési3)
                                    const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['3',userId]
                                        );
                                        connection2.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    if (roleForceSur) {
                                        await member.roles.add(roleIdForce3)
                                        const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['3',userId]
                                        );
                                        connection.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    if (roleForce) {
                                        await member.roles.add(roleIdForce2)
                                        const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdForce0)
                                        const connection = await db.getConnection();
                                    await connection.execute(
                                        'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection.release();
                                    }
                                    if (roleAgi) {
                                        await member.roles.add(roleIdAgi2)
                                        const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection1.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                         await member.roles.add(roleIdAgilité0)
                                         const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['0',userId]
                                        );
                                        connection1.release();
                                    }
                                    if (roleRési) {
                                        await member.roles.add(roleIdRési2)
                                        const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection2.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdRésistance0)
                                        const connection2 = await db.getConnection();
                                    await connection2.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection2.release();
                                    }
                                    if (roleTridi) {
                                        await member.roles.add(roleIdTridi2)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection4.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdTridi0)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection4.release();
                                    }
                                    if (roleSabre) {
                                        await member.roles.add(roleIdSabre2)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdSabre0)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                    }
                                }
                                if (roleForceSur) {
                                    await member.roles.add(roleIdForce3)
                                    const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                        ['3',userId]
                                    );
                                    connection3.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    if (roleForce) {
                                        await member.roles.add(roleIdForce2)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdForce0)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                    }
                                    if (roleAgi) {
                                        await member.roles.add(roleIdAgi2)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                         await member.roles.add(roleIdAgilité0)
                                         const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                    }
                                    if (roleRési) {
                                        await member.roles.add(roleIdRési2)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdRésistance0)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                    }
                                    if (roleTridi) {
                                        await member.roles.add(roleIdTridi2)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection4.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdTridi0)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection4.release();
                                    }
                                    if (roleSabre) {
                                        await member.roles.add(roleIdSabre2)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdSabre0)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                    }
                                }
                                if (roleForce) {
                                    await member.roles.add(roleIdForce2)
                                    const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    await member.roles.add(roleIdForce0)
                                    const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['0',userId]
                                        );
                                        connection.release();
                                }
                                if (roleAgi) {
                                    await member.roles.add(roleIdAgi2)
                                    const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection1.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                     await member.roles.add(roleIdAgilité0)
                                     const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['0',userId]
                                        );
                                        connection1.release();
                                }
                                if (roleRési) {
                                    await member.roles.add(roleIdRési2)
                                    const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection2.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    await member.roles.add(roleIdRésistance0)
                                    const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['0',userId]
                                        );
                                        connection2.release();
                                }
                                if (roleTridi) {
                                    await member.roles.add(roleIdTridi2)
                                    const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection4.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    await member.roles.add(roleIdTridi0)
                                    const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection4.release();
                                }
                                if (roleSabre) {
                                    await member.roles.add(roleIdSabre2)
                                    const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    await member.roles.add(roleIdSabre0)
                                    const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                }
                            }
                            else if (corp === 'Gᥲrᥒιsoᥒ') {
                                await member.roles.add(roleIdGa)
                                await member.roles.add(roleIdRecrueGa)
                                await member.roles.add(roleIdEscouade)
                                await member.roles.add(roleIdGaEscouade)
                                await member.roles.add(roleIdFamille)
                                await member.roles.add(roleIdWork)
                                await member.roles.add(roleIdPréstige)
                                await member.roles.add(roleIdDivider1)
                                await member.roles.add(roleIdTalent)
                                await member.roles.add(roleIdAffinité)
                                await member.roles.add(roleIdDivider2)
                                await member.roles.add(roleIdForce)
                                await member.roles.add(roleIdRésistance)
                                await member.roles.add(roleIdAgilité)
                                await member.roles.add(roleIdTridi)
                                await member.roles.add(roleIdSabre)
                                await member.roles.add(roleIdDivider3)
                                if (roleDieu) {
                                    await member.roles.add(roleIdRési2)
                                    await member.roles.add(roleIdTridi2)
                                    await member.roles.add(roleIdSabre2)
                                    await member.roles.add(roleIdForce2)
                                    await member.roles.add(roleIdAgi2)
                                    const connection = await db.getConnection();
                                    await connection.execute(
                                        'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection.release();
                                    const connection1 = await db.getConnection();
                                    await connection1.execute(
                                        'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection1.release();
                                    const connection2 = await db.getConnection();
                                    await connection2.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection2.release();
                                    const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                    const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection4.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    if (roleEndu) {
                                        await member.roles.add(roleIdAgi1)
                                        await member.roles.add(roleIdRési1)
                                        const connection1 = await db.getConnection();
                                    await connection1.execute(
                                        'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                        ['1',userId]
                                    );
                                    connection1.release();
                                    const connection2 = await db.getConnection();
                                    await connection2.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['1',userId]
                                    );
                                    connection2.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    if (roleRésiIncomp) {
                                        await member.roles.add(roleIdRési3)
                                        const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['3',userId]
                                        );
                                        connection2.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    if (roleForceSur) {
                                        await member.roles.add(roleIdForce3)
                                        const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['3',userId]
                                        );
                                        connection.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    if (roleForce) {
                                        await member.roles.add(roleIdForce2)
                                        const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdForce0)
                                        const connection = await db.getConnection();
                                    await connection.execute(
                                        'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection.release();
                                    }
                                    if (roleAgi) {
                                        await member.roles.add(roleIdAgi2)
                                        const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection1.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                         await member.roles.add(roleIdAgilité0)
                                         const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['0',userId]
                                        );
                                        connection1.release();

                                    }
                                    if (roleRési) {
                                        await member.roles.add(roleIdRési2)
                                        const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection2.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdRésistance0)
                                        const connection2 = await db.getConnection();
                                    await connection2.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection2.release();

                                    }
                                    if (roleTridi) {
                                        await member.roles.add(roleIdTridi2)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection4.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdTridi0)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection4.release();
                                    }
                                    if (roleSabre) {
                                        await member.roles.add(roleIdSabre2)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdSabre0)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                    }
                                }
                                if (roleEndu) {
                                    await member.roles.add(roleIdAgi1)
                                    await member.roles.add(roleIdRési1)
                                    await connection1.execute(
                                        'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                        ['1',userId]
                                    );
                                    connection1.release();
                                    const connection2 = await db.getConnection();
                                    await connection2.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['1',userId]
                                    );
                                    connection2.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    if (roleRésiIncomp) {
                                        await member.roles.add(roleIdRési3)
                                        const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['3',userId]
                                        );
                                        connection2.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    if (roleForceSur) {
                                        await member.roles.add(roleIdForce3)
                                        const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['3',userId]
                                        );
                                        connection.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    if (roleForce) {
                                        await member.roles.add(roleIdForce2)
                                        const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdForce0)
                                        const connection = await db.getConnection();
                                    await connection.execute(
                                        'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection.release();
                                    }
                                    if (roleAgi) {
                                        await member.roles.add(roleIdAgi2)
                                        const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection1.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                         await member.roles.add(roleIdAgilité0)
                                         const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['0',userId]
                                        );
                                        connection1.release();
                                    }
                                    if (roleRési) {
                                        await member.roles.add(roleIdRési2)
                                        const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection2.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdRésistance0)
                                        const connection2 = await db.getConnection();
                                    await connection2.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection2.release();
                                    }
                                    if (roleTridi) {
                                        await member.roles.add(roleIdTridi2)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection4.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdTridi0)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection4.release();
                                    }
                                    if (roleSabre) {
                                        await member.roles.add(roleIdSabre2)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdSabre0)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                    }
                                }
                                if (roleRésiIncomp) {
                                    await member.roles.add(roleIdRési3)
                                    const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['3',userId]
                                        );
                                        connection2.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    if (roleForceSur) {
                                        await member.roles.add(roleIdForce3)
                                        const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['3',userId]
                                        );
                                        connection.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    if (roleForce) {
                                        await member.roles.add(roleIdForce2)
                                        const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdForce0)
                                        const connection = await db.getConnection();
                                    await connection.execute(
                                        'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection.release();
                                    }
                                    if (roleAgi) {
                                        await member.roles.add(roleIdAgi2)
                                        const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection1.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                         await member.roles.add(roleIdAgilité0)
                                         const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['0',userId]
                                        );
                                        connection1.release();
                                    }
                                    if (roleRési) {
                                        await member.roles.add(roleIdRési2)
                                        const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection2.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdRésistance0)
                                        const connection2 = await db.getConnection();
                                    await connection2.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection2.release();
                                    }
                                    if (roleTridi) {
                                        await member.roles.add(roleIdTridi2)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection4.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdTridi0)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection4.release();
                                    }
                                    if (roleSabre) {
                                        await member.roles.add(roleIdSabre2)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdSabre0)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                    }
                                }
                                if (roleForceSur) {
                                    await member.roles.add(roleIdForce3)
                                    const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                        ['3',userId]
                                    );
                                    connection3.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    if (roleForce) {
                                        await member.roles.add(roleIdForce2)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdForce0)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                    }
                                    if (roleAgi) {
                                        await member.roles.add(roleIdAgi2)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                         await member.roles.add(roleIdAgilité0)
                                         const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                    }
                                    if (roleRési) {
                                        await member.roles.add(roleIdRési2)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdRésistance0)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                    }
                                    if (roleTridi) {
                                        await member.roles.add(roleIdTridi2)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection4.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdTridi0)
                                        const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection4.release();
                                    }
                                    if (roleSabre) {
                                        await member.roles.add(roleIdSabre2)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                        await interaction.followUp({
                                            content: `J'ai finis de te donner tes rôles !`,
                                            flags: 64,
                                        });
                                        return;
                                    }
                                    else {
                                        await member.roles.add(roleIdSabre0)
                                        const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                    }
                                }
                                if (roleForce) {
                                    await member.roles.add(roleIdForce2)
                                    const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    await member.roles.add(roleIdForce0)
                                    const connection = await db.getConnection();
                                        await connection.execute(
                                            'UPDATE entrainement SET level_force = ? WHERE id_membre = ?',
                                            ['0',userId]
                                        );
                                        connection.release();
                                }
                                if (roleAgi) {
                                    await member.roles.add(roleIdAgi2)
                                    const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection1.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                     await member.roles.add(roleIdAgilité0)
                                     const connection1 = await db.getConnection();
                                        await connection1.execute(
                                            'UPDATE entrainement SET level_agilite = ? WHERE id_membre = ?',
                                            ['0',userId]
                                        );
                                        connection1.release();
                                }
                                if (roleRési) {
                                    await member.roles.add(roleIdRési2)
                                    const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['2',userId]
                                        );
                                        connection2.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    await member.roles.add(roleIdRésistance0)
                                    const connection2 = await db.getConnection();
                                        await connection2.execute(
                                            'UPDATE entrainement SET level_resistance = ? WHERE id_membre = ?',
                                            ['0',userId]
                                        );
                                        connection2.release();
                                }
                                if (roleTridi) {
                                    await member.roles.add(roleIdTridi2)
                                    const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection4.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    await member.roles.add(roleIdTridi0)
                                    const connection4 = await db.getConnection();
                                    await connection4.execute(
                                        'UPDATE entrainement SET level_tridi = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection4.release();
                                }
                                if (roleSabre) {
                                    await member.roles.add(roleIdSabre2)
                                    const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['2',userId]
                                    );
                                    connection3.release();
                                    await interaction.followUp({
                                        content: `J'ai finis de te donner tes rôles !`,
                                        flags: 64,
                                    });
                                    return;
                                }
                                else {
                                    await member.roles.add(roleIdSabre0)
                                    const connection3 = await db.getConnection();
                                    await connection3.execute(
                                        'UPDATE entrainement SET level_sabre = ? WHERE id_membre = ?',
                                        ['0',userId]
                                    );
                                    connection3.release();
                                }
                            }
                                }
                                else if (i.customId === `button_non`) {
                                    await i.reply({
                                        embeds: [{
                                            description: `
        \`\`\` \`\`\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1231609048273653801Copie:1304167335879381073> ] — __Profιᥣ__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, la création du profile a bien été annulée !**
        
        \`\`\` \`\`\``,
                                            color: 0xFFFFFF,
                                            thumbnail: {
                                                url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540538158190732/Ability_Hunter_OneWithNature.png?ex=67306c4d&is=672f1acd&hm=ee10e83b8c1398b469479d738fe8bdbf3ebeb3af32f8b90770400a63c3cee3b3&',
                                            },
                                            image: {
                                                url: 'https://media1.tenor.com/m/m-nDhNedJIAAAAAd/aot-titans.gif',
                                            },
                                        }],
                                        flags: 0,
                                    });
                                    collector6.stop();
                                    return;
                                }

                            });
                        } catch (error) {
                            console.error('Erreur lors de la mise à jour du prénom dans la base de données:', error);
                            await interaction.followUp('Une erreur est survenue lors de l\'enregistrement du prénom. Veuillez réessayer.');
                        }
                    });
                } catch (error) {
                    console.error('Erreur lors de la mise à jour du prénom dans la base de données:', error);
                    await interaction.followUp('Une erreur est survenue lors de l\'enregistrement du prénom. Veuillez réessayer.');
                }
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du nom dans la base de données:', error);
            await interaction.followUp('Une erreur est survenue lors de l\'enregistrement du nom. Veuillez réessayer.');
        }
    });
} catch (error) {
    console.error('Erreur lors du traitement de la commande:', error);
    await interaction.followUp('Une erreur est survenue, veuillez réessayer.');
}
    }
}