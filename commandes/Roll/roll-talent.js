const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const db = require('../../database.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rollᵗᵃˡᵉⁿᵗ')
        .setDescription("Permet de faire son/ses roll talent après le roll départ."),
    async execute(interaction, client) {
        const memberId = interaction.member.id;
        const member = interaction.member;
        const roleIdDieu = '1304183227497320451';
        const roleIdXp = '1304183228826910772';
        const roleIdForceSurhumaine = '1304183230429397002';
        const roleIdRésistanceIncomp = '1304183231251222620';
        const roleIdTridi = '1304183232321032262';
        const roleIdSabre = '1304183232970887179';
        const roleIdEndu = '1304183234208333834';
        const roleIdForce = '1304183235105914981';
        const roleIdRési = '1304183235818946575';
        const roleIdAgi = '1304183236649422943';
        try {
            const connection = await db.getConnection();
            const [rows] = await connection.execute(
                'SELECT roll_talent FROM roll WHERE id_membre = ?',
                [memberId]
            );
            connection.release();
            const rollDepart = rows[0].roll_talent;
            if (rollDepart === 0) {
                await interaction.reply({
                    embeds: [{
                        description: `
    \`\`\` \`\`\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez pas/plus de roll talent.**
    
    \`\`\` \`\`\`
                        `,
                        color: 0xFFFFFF,
                        thumbnail: {
                            url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304900535861907527/70_inscription_vantus_rune_nightmare.png?ex=6731bb93&is=67306a13&hm=fd9931a37d24bcc0dbbf455f8a2c53082a2208fb2eb04dd8b44449029e744f66&',
                        },
                        image: {
                            url: 'https://media1.tenor.com/m/8O90plJTiQYAAAAd/eren-eren-yeager.gif',
                        },
                    }],
                    flags: 0,
                });
                return;
            }
            if (rollDepart === null || rollDepart === undefined) {
                await interaction.reply({
                    embeds: [{
                        description: `
    \`\`\` \`\`\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, il vous faut faire la commande [ __\`/rollᵈᵉᵖᵃʳᵗ\`__ ] d'abord.**
    
    \`\`\` \`\`\`
                        `,
                        color: 0xFFFFFF,
                        thumbnail: {
                            url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304900535861907527/70_inscription_vantus_rune_nightmare.png?ex=6731bb93&is=67306a13&hm=fd9931a37d24bcc0dbbf455f8a2c53082a2208fb2eb04dd8b44449029e744f66&',
                        },
                        image: {
                            url: 'https://media1.tenor.com/m/8O90plJTiQYAAAAd/eren-eren-yeager.gif',
                        },
                    }],
                    flags: 0,
                });
                return;
            }

            if (rollDepart > 0) {
                const randomNumber = Math.floor(Math.random() * 100) + 1;
                if (randomNumber < 8) {
                    await interaction.reply({
                        embeds: [{
                            description: `
    \`\`\` \`\`\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Dιᥱᥙ dᥱ ᥣ'ᥱᥒtrᥲιᥒᥱmᥱᥒt__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Lᥱ́gᥱᥒdᥲιrᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`8%\`__]**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rolls restants\` ] <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`${rollDepart - 1}\`__]**
    
    \`⦇・━━━═══════════════════════════════━━━・⦈\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous avez obtenu le talent <@&1304183227497320451>, ce talent vous aidera dans le développement de votre personnage. Grâce à ce talent vous obtenez __\`+2 à chaque stats\`__. Vous pouvez d'ailleurs vous entrainer toute les __\`12h\`__ et non pas toute les __\`24h.\`__ __Ne gâchez pas cette chance !__**
    
    \`\`\` \`\`\`
                            `,
                            color: 0xFFFFFF,
                            thumbnail: {
                                url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451910455326/Ability_Evoker_Rewind.png?ex=6731bdb8&is=67306c38&hm=854703e392fc5982e9021aa4a81a417611fdc07d78c6ed62121b4d548b608580&',
                            },
                            image: {
                                url: 'https://www.buzzfrance.fr/wp-content/uploads/2021/06/eren-snk.gif',
                            },
                        }],
                        components: [
                            new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                    .setCustomId('confirmTalent1')
                                    .setLabel('❘ 〘 ✅ 〙 ๑ ↝ Choιsιr :')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setDisabled(false)
                            ),
                        ],
                        flags: 0,
                    });
                const filter = i => i.customId === 'confirmTalent1' && i.user.id === interaction.user.id;
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15 * 60 * 1000 });

                collector.on('collect', async i => {
                    if (i.customId === 'confirmTalent1') {
                        await i.reply({
                            embeds: [{
                                description: `
        \`\`\` \`\`\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Dιᥱᥙ dᥱ ᥣ'ᥱᥒtrᥲιᥒᥱmᥱᥒt__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Lᥱ́gᥱᥒdᥲιrᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`8%\`__]**
        
        \`⦇・━━━═══════════════════════════════━━━・⦈\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Le talent <@&1304183227497320451> vous a bien été attribué !**
        
        \`\`\` \`\`\`
                                `,
                                color: 0xFFFFFF,
                                thumbnail: {
                                    url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451910455326/Ability_Evoker_Rewind.png?ex=6731bdb8&is=67306c38&hm=854703e392fc5982e9021aa4a81a417611fdc07d78c6ed62121b4d548b608580&',
                                },
                                image: {
                                    url: 'https://www.buzzfrance.fr/wp-content/uploads/2021/06/eren-snk.gif',
                                },
                            }],
                            components: [],
                        });
                        const connection = await db.getConnection();
                        await connection.execute(
                            'UPDATE roll SET talent = ? WHERE id_membre = ?',
                            ['Dιᥱᥙ dᥱ ᥣ\'ᥱᥒtrᥲιᥒᥱmᥱᥒt', memberId]
                        );
                        connection.release();
                        await member.roles.add(roleIdDieu)
                    }
                });
                }
                else if (randomNumber < 20) {
                    const connection = await db.getConnection();
                    await connection.execute(
                        'UPDATE roll SET roll_talent = roll_talent - 1 WHERE id_membre = ?',
                        [memberId]
                    );
                    connection.release();

                    await interaction.reply({
                        embeds: [{
                            description: `
    \`\`\` \`\`\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __XP ᥲᥙgmᥱᥒtᥱ́__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Mყthιqᥙᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`12%\`__]**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rolls restants\` ] <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`${rollDepart - 1}\`__]**
    
    \`⦇・━━━═══════════════════════════════━━━・⦈\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous avez obtenu le talent <@&${roleIdXp}>, ce talent vous aidera à développer votre personnage __\`plus vite que les autres\`__ puisque __tout__ vos gains d'xp seront __\`multipliés par 1,5\`__!**
    
    \`\`\` \`\`\`
                            `,
                            color: 0xFFFFFF,
                            thumbnail: {
                                url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451910455326/Ability_Evoker_Rewind.png?ex=6731bdb8&is=67306c38&hm=854703e392fc5982e9021aa4a81a417611fdc07d78c6ed62121b4d548b608580&',
                            },
                            image: {
                                url: 'https://www.buzzfrance.fr/wp-content/uploads/2021/06/eren-snk.gif',
                            },
                        }],
                        components: [
                            new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                    .setCustomId('confirmTalent2')
                                    .setLabel('❘ 〘 ✅ 〙 ๑ ↝ Choιsιr :')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setDisabled(false)
                            ),
                        ],
                        flags: 0,
                    });
                const filter = i => i.customId === 'confirmTalent2' && i.user.id === interaction.user.id;
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15 * 60 * 1000 });

                collector.on('collect', async i => {
                    if (i.customId === 'confirmTalent2') {
                        await i.reply({
                            embeds: [{
                                description: `
        \`\`\` \`\`\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __XP ᥲᥙgmᥱᥒtᥱ́__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Mყthιqᥙᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`12%\`__]**
        
        \`⦇・━━━═══════════════════════════════━━━・⦈\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Le talent <@&${roleIdXp}> vous a bien été attribué !**
        
        \`\`\` \`\`\`
                                `,
                                color: 0xFFFFFF,
                                thumbnail: {
                                    url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451910455326/Ability_Evoker_Rewind.png?ex=6731bdb8&is=67306c38&hm=854703e392fc5982e9021aa4a81a417611fdc07d78c6ed62121b4d548b608580&',
                                },
                                image: {
                                    url: 'https://www.buzzfrance.fr/wp-content/uploads/2021/06/eren-snk.gif',
                                },
                            }],
                            components: [],
                        });
                        const connection = await db.getConnection();
                        await connection.execute(
                            'UPDATE roll SET talent = ? WHERE id_membre = ?',
                            ['XP ᥲᥙgmᥱᥒtᥱ́', memberId]
                        );
                        connection.release();
                        await member.roles.add(roleIdXp)
                    }
                }); 
                }
                else if (randomNumber < 40) {
                    const randomNumber1 = Math.floor(Math.random() * 100) + 1;
                    if ( randomNumber1 < 50) {
                        const connection = await db.getConnection();
                    await connection.execute(
                        'UPDATE roll SET roll_talent = roll_talent - 1 WHERE id_membre = ?',
                        [memberId]
                    );
                    connection.release();

                    await interaction.reply({
                        embeds: [{
                            description: `
    \`\`\` \`\`\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Forᥴᥱ sᥙrhᥙmᥲιᥒᥱ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Trᥱ̀s rᥲrᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`20%\`__]**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rolls restants\` ] <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`${rollDepart - 1}\`__]**
    
    \`⦇・━━━═══════════════════════════════━━━・⦈\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous avez obtenu le talent <@&${roleIdForceSurhumaine}>, ce talent vous aidera dans le développement de votre personnage. Grâce à ce talent vous obtenez __\`+3 à la force.\`__ __Désormais à vous de l'améliorer grâce à vos entrainements.__**
    
    \`\`\` \`\`\`
                            `,
                            color: 0xFFFFFF,
                            thumbnail: {
                                url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451910455326/Ability_Evoker_Rewind.png?ex=6731bdb8&is=67306c38&hm=854703e392fc5982e9021aa4a81a417611fdc07d78c6ed62121b4d548b608580&',
                            },
                            image: {
                                url: 'https://i.pinimg.com/originals/18/e4/b3/18e4b3ba8ea24d479d6bf98d0a0bff27.gif',
                            },
                        }],
                        components: [
                            new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                    .setCustomId('confirmTalent3')
                                    .setLabel('❘ 〘 ✅ 〙 ๑ ↝ Choιsιr :')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setDisabled(false)
                            ),
                        ],
                        flags: 0,
                    });
                const filter = i => i.customId === 'confirmTalent3' && i.user.id === interaction.user.id;
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15 * 60 * 1000 });

                collector.on('collect', async i => {
                    if (i.customId === 'confirmTalent3') {
                        await i.reply({
                            embeds: [{
                                description: `
        \`\`\` \`\`\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Forᥴᥱ sᥙrhᥙmᥲιᥒᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Trᥱ̀s rᥲrᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`20%\`__]**
        
        \`⦇・━━━═══════════════════════════════━━━・⦈\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Le talent <@&${roleIdForceSurhumaine}> vous a bien été attribué !**
        
        \`\`\` \`\`\`
                                `,
                                color: 0xFFFFFF,
                                thumbnail: {
                                    url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451910455326/Ability_Evoker_Rewind.png?ex=6731bdb8&is=67306c38&hm=854703e392fc5982e9021aa4a81a417611fdc07d78c6ed62121b4d548b608580&',
                                },
                                image: {
                                    url: 'https://i.pinimg.com/originals/18/e4/b3/18e4b3ba8ea24d479d6bf98d0a0bff27.gif',
                                },
                            }],
                            components: [],
                        });
                        const connection = await db.getConnection();
                        await connection.execute(
                            'UPDATE roll SET talent = ? WHERE id_membre = ?',
                            ['Forᥴᥱ sᥙrhᥙmᥲιᥒᥱ', memberId]
                        );
                        connection.release();
                        await member.roles.add(roleIdForceSurhumaine)
                    }
                }); 
                    }
                    else if (randomNumber1 > 50) {
                        const connection = await db.getConnection();
                        await connection.execute(
                            'UPDATE roll SET roll_talent = roll_talent - 1 WHERE id_membre = ?',
                            [memberId]
                        );
                        connection.release();
    
                        await interaction.reply({
                            embeds: [{
                                description: `
        \`\`\` \`\`\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Rᥱ́sιstᥲᥒᥴᥱ ιᥒᥴomρᥲrᥲbᥣᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Trᥱ̀s rᥲrᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`20%\`__]**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rolls restants\` ] <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`${rollDepart - 1}\`__]**
        
        \`⦇・━━━═══════════════════════════════━━━・⦈\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous avez obtenu le talent <@&${roleIdRésistanceIncomp}>, ce talent vous aidera dans le développement de votre personnage. Grâce à ce talent vous obtenez __\`+3 à la résistance\`__ et __\`+1 à l'agilité\`__ __Désormais à vous de l'améliorer grâce à vos entrainements.__**
        
        \`\`\` \`\`\`
                                `,
                                color: 0xFFFFFF,
                                thumbnail: {
                                    url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451910455326/Ability_Evoker_Rewind.png?ex=6731bdb8&is=67306c38&hm=854703e392fc5982e9021aa4a81a417611fdc07d78c6ed62121b4d548b608580&',
                                },
                                image: {
                                    url: 'https://i.pinimg.com/originals/18/e4/b3/18e4b3ba8ea24d479d6bf98d0a0bff27.gif',
                                },
                            }],
                            components: [
                                new ActionRowBuilder().addComponents(
                                    new ButtonBuilder()
                                        .setCustomId('confirmTalent4')
                                        .setLabel('❘ 〘 ✅ 〙 ๑ ↝ Choιsιr :')
                                        .setStyle(ButtonStyle.Secondary)
                                        .setDisabled(false)
                                ),
                            ],
                            flags: 0,
                        });
                    const filter = i => i.customId === 'confirmTalent4' && i.user.id === interaction.user.id;
                    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15 * 60 * 1000 });
    
                    collector.on('collect', async i => {
                        if (i.customId === 'confirmTalent4') {
                            await i.reply({
                                embeds: [{
                                    description: `
            \`\`\` \`\`\`
            
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Rᥱ́sιstᥲᥒᥴᥱ ιᥒᥴomρᥲrᥲbᥣᥱ__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Trᥱ̀s rᥲrᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`20%\`__]**
            
            \`⦇・━━━═══════════════════════════════━━━・⦈\`
            
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Le talent <@&${roleIdRésistanceIncomp}> vous a bien été attribué !**
            
            \`\`\` \`\`\`
                                    `,
                                    color: 0xFFFFFF,
                                    thumbnail: {
                                        url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451910455326/Ability_Evoker_Rewind.png?ex=6731bdb8&is=67306c38&hm=854703e392fc5982e9021aa4a81a417611fdc07d78c6ed62121b4d548b608580&',
                                    },
                                    image: {
                                        url: 'https://i.pinimg.com/originals/18/e4/b3/18e4b3ba8ea24d479d6bf98d0a0bff27.gif',
                                    },
                                }],
                                components: [],
                            });
                            const connection = await db.getConnection();
                            await connection.execute(
                                'UPDATE roll SET talent = ? WHERE id_membre = ?',
                                ['Rᥱ́sιstᥲᥒᥴᥱ ιᥒᥴomρᥲrᥲbᥣᥱ', memberId]
                            );
                            connection.release();
                            await member.roles.add(roleIdRésistanceIncomp)
                        }
                    }); 
                }
            } 
            else if (randomNumber < 65) {
                const randomNumber1 = Math.floor(Math.random() * 100) + 1;
                if ( randomNumber1 < 50) {
                    const connection = await db.getConnection();
                await connection.execute(
                    'UPDATE roll SET roll_talent = roll_talent - 1 WHERE id_membre = ?',
                    [memberId]
                );
                connection.release();

                await interaction.reply({
                    embeds: [{
                        description: `
\`\`\` \`\`\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Trιdιmᥱᥒsιoᥒᥒᥲᥣιtᥱ́ ᥲᥙgmᥱᥒtᥱ́__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Rᥲrᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`25%\`__]**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rolls restants\` ] <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`${rollDepart - 1}\`__]**

\`⦇・━━━═══════════════════════════════━━━・⦈\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous avez obtenu le talent <@&${roleIdTridi}>, ce talent vous aidera dans le développement de votre personnage. Grâce à ce talent vous obtenez __\`+2 à la maîtrise tridimensionnelle.\`__ __Désormais à vous de l'améliorer grâce à vos entrainements.__**

\`\`\` \`\`\`
                        `,
                        color: 0xFFFFFF,
                        thumbnail: {
                            url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451910455326/Ability_Evoker_Rewind.png?ex=6731bdb8&is=67306c38&hm=854703e392fc5982e9021aa4a81a417611fdc07d78c6ed62121b4d548b608580&',
                        },
                        image: {
                            url: 'https://media.giphy.com/media/AKI06qGNgli48/giphy.gif',
                        },
                    }],
                    components: [
                        new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                                .setCustomId('confirmTalent5')
                                .setLabel('❘ 〘 ✅ 〙 ๑ ↝ Choιsιr :')
                                .setStyle(ButtonStyle.Secondary)
                                .setDisabled(false)
                        ),
                    ],
                    flags: 0,
                });
            const filter = i => i.customId === 'confirmTalent5' && i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15 * 60 * 1000 });

            collector.on('collect', async i => {
                if (i.customId === 'confirmTalent5') {
                    await i.reply({
                        embeds: [{
                            description: `
    \`\`\` \`\`\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Trιdιmᥱᥒsιoᥒᥒᥲᥣιtᥱ́ ᥲᥙgmᥱᥒtᥱ́__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Rᥲrᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`25%\`__]**
    
    \`⦇・━━━═══════════════════════════════━━━・⦈\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Le talent <@&${roleIdTridi}> vous a bien été attribué !**
    
    \`\`\` \`\`\`
                            `,
                            color: 0xFFFFFF,
                            thumbnail: {
                                url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451910455326/Ability_Evoker_Rewind.png?ex=6731bdb8&is=67306c38&hm=854703e392fc5982e9021aa4a81a417611fdc07d78c6ed62121b4d548b608580&',
                            },
                            image: {
                                url: 'https://media.giphy.com/media/AKI06qGNgli48/giphy.gif',
                            },
                        }],
                        components: [],
                    });
                    const connection = await db.getConnection();
                    await connection.execute(
                        'UPDATE roll SET talent = ? WHERE id_membre = ?',
                        ['Trιdιmᥱᥒsιoᥒᥒᥲᥣιtᥱ́ ᥲᥙgmᥱᥒtᥱ́', memberId]
                    );
                    connection.release();
                    await member.roles.add(roleIdTridi)
                }
            }); 
                }
                else if (randomNumber1 > 50) {
                    const connection = await db.getConnection();
                    await connection.execute(
                        'UPDATE roll SET roll_talent = roll_talent - 1 WHERE id_membre = ?',
                        [memberId]
                    );
                    connection.release();

                    await interaction.reply({
                        embeds: [{
                            description: `
    \`\`\` \`\`\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Mᥲι̂trιsᥱ dᥱ ᥣᥲ ᥣᥲmᥱ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Rᥲrᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`25%\`__]**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rolls restants\` ] <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`${rollDepart - 1}\`__]**
    
    \`⦇・━━━═══════════════════════════════━━━・⦈\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous avez obtenu le talent <@&${roleIdSabre}>, ce talent vous aidera dans le développement de votre personnage. Grâce à ce talent vous obtenez __\`+2 à la maîtrise du sabre.\`__ __Désormais à vous de l'améliorer grâce à vos entrainements.__**
    
    \`\`\` \`\`\`
                            `,
                            color: 0xFFFFFF,
                            thumbnail: {
                                url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451910455326/Ability_Evoker_Rewind.png?ex=6731bdb8&is=67306c38&hm=854703e392fc5982e9021aa4a81a417611fdc07d78c6ed62121b4d548b608580&',
                            },
                            image: {
                                url: 'https://media.giphy.com/media/AKI06qGNgli48/giphy.gif',
                            },
                        }],
                        components: [
                            new ActionRowBuilder().addComponents(
                                new ButtonBuilder()
                                    .setCustomId('confirmTalent6')
                                    .setLabel('❘ 〘 ✅ 〙 ๑ ↝ Choιsιr :')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setDisabled(false)
                            ),
                        ],
                        flags: 0,
                    });
                const filter = i => i.customId === 'confirmTalent6' && i.user.id === interaction.user.id;
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15 * 60 * 1000 });

                collector.on('collect', async i => {
                    if (i.customId === 'confirmTalent6') {
                        await i.reply({
                            embeds: [{
                                description: `
        \`\`\` \`\`\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Mᥲι̂trιsᥱ dᥱ ᥣᥲ ᥣᥲmᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Rᥲrᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`25%\`__]**
        
        \`⦇・━━━═══════════════════════════════━━━・⦈\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Le talent <@&${roleIdSabre}> vous a bien été attribué !**
        
        \`\`\` \`\`\`
                                `,
                                color: 0xFFFFFF,
                                thumbnail: {
                                    url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451910455326/Ability_Evoker_Rewind.png?ex=6731bdb8&is=67306c38&hm=854703e392fc5982e9021aa4a81a417611fdc07d78c6ed62121b4d548b608580&',
                                },
                                image: {
                                    url: 'https://media.giphy.com/media/AKI06qGNgli48/giphy.gif',
                                },
                            }],
                            components: [],
                        });
                        const connection = await db.getConnection();
                        await connection.execute(
                            'UPDATE roll SET talent = ? WHERE id_membre = ?',
                            ['Mᥲι̂trιsᥱ dᥱ ᥣᥲ ᥣᥲmᥱ', memberId]
                        );
                        connection.release();
                        await member.roles.add(roleIdSabre)
                    }
                }); 
            }
        }
        else if (randomNumber < 100) {
            const randomNumber1 = Math.floor(Math.random() * 100) + 1;
            if ( randomNumber1 < 25) {
                const connection = await db.getConnection();
            await connection.execute(
                'UPDATE roll SET roll_talent = roll_talent - 1 WHERE id_membre = ?',
                [memberId]
            );
            connection.release();

            await interaction.reply({
                embeds: [{
                    description: `
\`\`\` \`\`\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Forᥴᥱ ᥲmᥱ́ᥣιorᥱ́__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`50%\`__]**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rolls restants\` ] <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`${rollDepart - 1}\`__]**

\`⦇・━━━═══════════════════════════════━━━・⦈\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous avez obtenu le talent <@&${roleIdForce}>, ce talent vous aidera dans le développement de votre personnage. Grâce à ce talent vous obtenez __\`+2 à la force.\`__ __Désormais à vous de l'améliorer grâce à vos entrainements.__**

\`\`\` \`\`\`
                    `,
                    color: 0xFFFFFF,
                    thumbnail: {
                        url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451910455326/Ability_Evoker_Rewind.png?ex=6731bdb8&is=67306c38&hm=854703e392fc5982e9021aa4a81a417611fdc07d78c6ed62121b4d548b608580&',
                    },
                    image: {
                        url: 'https://media.giphy.com/media/AKI06qGNgli48/giphy.gif',
                    },
                }],
                components: [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId('confirmTalent7')
                            .setLabel('❘ 〘 ✅ 〙 ๑ ↝ Choιsιr :')
                            .setStyle(ButtonStyle.Secondary)
                            .setDisabled(false)
                    ),
                ],
                flags: 0,
            });
        const filter = i => i.customId === 'confirmTalent7' && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15 * 60 * 1000 });

        collector.on('collect', async i => {
            if (i.customId === 'confirmTalent7') {
                await i.reply({
                    embeds: [{
                        description: `
\`\`\` \`\`\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Forᥴᥱ ᥲmᥱ́ᥣιorᥱ́__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`50%\`__]**

\`⦇・━━━═══════════════════════════════━━━・⦈\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **Le talent <@&${roleIdForce}> vous a bien été attribué !**

\`\`\` \`\`\`
                        `,
                        color: 0xFFFFFF,
                        thumbnail: {
                            url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451910455326/Ability_Evoker_Rewind.png?ex=6731bdb8&is=67306c38&hm=854703e392fc5982e9021aa4a81a417611fdc07d78c6ed62121b4d548b608580&',
                        },
                        image: {
                            url: 'https://media.giphy.com/media/AKI06qGNgli48/giphy.gif',
                        },
                    }],
                    components: [],
                });
                const connection = await db.getConnection();
                await connection.execute(
                    'UPDATE roll SET talent = ? WHERE id_membre = ?',
                    ['Forᥴᥱ ᥲmᥱ́ᥣιorᥱ́', memberId]
                );
                connection.release();
                await member.roles.add(roleIdForce)
            }
        }); 
            }
            else if (randomNumber1 < 50) {
                const connection = await db.getConnection();
                await connection.execute(
                    'UPDATE roll SET roll_talent = roll_talent - 1 WHERE id_membre = ?',
                    [memberId]
                );
                connection.release();

                await interaction.reply({
                    embeds: [{
                        description: `
\`\`\` \`\`\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Agιᥣιtᥱ́ ᥲᥙgmᥱᥒtᥱ́__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`50%\`__]**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rolls restants\` ] <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`${rollDepart - 1}\`__]**

\`⦇・━━━═══════════════════════════════━━━・⦈\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous avez obtenu le talent <@&${roleIdAgi}>, ce talent vous aidera dans le développement de votre personnage. Grâce à ce talent vous obtenez __\`+2 à l'agilité.\`__ __Désormais à vous de l'améliorer grâce à vos entrainements.__**

\`\`\` \`\`\`
                        `,
                        color: 0xFFFFFF,
                        thumbnail: {
                            url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451910455326/Ability_Evoker_Rewind.png?ex=6731bdb8&is=67306c38&hm=854703e392fc5982e9021aa4a81a417611fdc07d78c6ed62121b4d548b608580&',
                        },
                        image: {
                            url: 'https://media.giphy.com/media/AKI06qGNgli48/giphy.gif',
                        },
                    }],
                    components: [
                        new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                                .setCustomId('confirmTalent8')
                                .setLabel('❘ 〘 ✅ 〙 ๑ ↝ Choιsιr :')
                                .setStyle(ButtonStyle.Secondary)
                                .setDisabled(false)
                        ),
                    ],
                    flags: 0,
                });
            const filter = i => i.customId === 'confirmTalent8' && i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15 * 60 * 1000 });

            collector.on('collect', async i => {
                if (i.customId === 'confirmTalent8') {
                    await i.reply({
                        embeds: [{
                            description: `
    \`\`\` \`\`\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Agιᥣιtᥱ́ ᥲᥙgmᥱᥒtᥱ́__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`50%\`__]**
    
    \`⦇・━━━═══════════════════════════════━━━・⦈\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Le talent <@&${roleIdAgi}> vous a bien été attribué !**
    
    \`\`\` \`\`\`
                            `,
                            color: 0xFFFFFF,
                            thumbnail: {
                                url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451910455326/Ability_Evoker_Rewind.png?ex=6731bdb8&is=67306c38&hm=854703e392fc5982e9021aa4a81a417611fdc07d78c6ed62121b4d548b608580&',
                            },
                            image: {
                                url: 'https://media.giphy.com/media/AKI06qGNgli48/giphy.gif',
                            },
                        }],
                        components: [],
                    });
                    const connection = await db.getConnection();
                    await connection.execute(
                        'UPDATE roll SET talent = ? WHERE id_membre = ?',
                        ['Agιᥣιtᥱ́ ᥲᥙgmᥱᥒtᥱ́', memberId]
                    );
                    connection.release();
                    await member.roles.add(roleIdAgi)
                }
            }); 
        }
        else if (randomNumber1 < 75) {
            const connection = await db.getConnection();
            await connection.execute(
                'UPDATE roll SET roll_talent = roll_talent - 1 WHERE id_membre = ?',
                [memberId]
            );
            connection.release();

            await interaction.reply({
                embeds: [{
                    description: `
\`\`\` \`\`\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Eᥒdᥙrᥲᥒᥴᥱ hors dᥙ ᥴommᥙᥒ__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`50%\`__]**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rolls restants\` ] <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`${rollDepart - 1}\`__]**

\`⦇・━━━═══════════════════════════════━━━・⦈\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous avez obtenu le talent <@&${roleIdEndu}>, ce talent vous aidera dans le développement de votre personnage. Grâce à ce talent vous obtenez __\`+1 à la résistance et +1 à l'agilité.\`__ __Désormais à vous de l'améliorer grâce à vos entrainements.__**

\`\`\` \`\`\`
                    `,
                    color: 0xFFFFFF,
                    thumbnail: {
                        url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451910455326/Ability_Evoker_Rewind.png?ex=6731bdb8&is=67306c38&hm=854703e392fc5982e9021aa4a81a417611fdc07d78c6ed62121b4d548b608580&',
                    },
                    image: {
                        url: 'https://media.giphy.com/media/AKI06qGNgli48/giphy.gif',
                    },
                }],
                components: [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId('confirmTalent9')
                            .setLabel('❘ 〘 ✅ 〙 ๑ ↝ Choιsιr :')
                            .setStyle(ButtonStyle.Secondary)
                            .setDisabled(false)
                    ),
                ],
                flags: 0,
            });
        const filter = i => i.customId === 'confirmTalent9' && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15 * 60 * 1000 });

        collector.on('collect', async i => {
            if (i.customId === 'confirmTalent9') {
                await i.reply({
                    embeds: [{
                        description: `
\`\`\` \`\`\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Eᥒdᥙrᥲᥒᥴᥱ hors dᥙ ᥴommᥙᥒ__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`50%\`__]**

\`⦇・━━━═══════════════════════════════━━━・⦈\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **Le talent <@&${roleIdEndu}> vous a bien été attribué !**

\`\`\` \`\`\`
                        `,
                        color: 0xFFFFFF,
                        thumbnail: {
                            url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451910455326/Ability_Evoker_Rewind.png?ex=6731bdb8&is=67306c38&hm=854703e392fc5982e9021aa4a81a417611fdc07d78c6ed62121b4d548b608580&',
                        },
                        image: {
                            url: 'https://media.giphy.com/media/AKI06qGNgli48/giphy.gif',
                        },
                    }],
                    components: [],
                });
                const connection = await db.getConnection();
                await connection.execute(
                    'UPDATE roll SET talent = ? WHERE id_membre = ?',
                    ['Eᥒdᥙrᥲᥒᥴᥱ hors dᥙ ᥴommᥙᥒ', memberId]
                );
                connection.release();
                await member.roles.add(roleIdEndu)
            }
        }); 
    }
    else if (randomNumber1 < 100) {
        const connection = await db.getConnection();
        await connection.execute(
            'UPDATE roll SET roll_talent = roll_talent - 1 WHERE id_membre = ?',
            [memberId]
        );
        connection.release();

        await interaction.reply({
            embeds: [{
                description: `
\`\`\` \`\`\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Rᥱ́sιstᥲᥒᥴᥱ ᥲmᥱ́ᥣιorᥱ́__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`50%\`__]**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rolls restants\` ] <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`${rollDepart - 1}\`__]**

\`⦇・━━━═══════════════════════════════━━━・⦈\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous avez obtenu le talent <@&${roleIdRési}>, ce talent vous aidera dans le développement de votre personnage. Grâce à ce talent vous obtenez __\`+2 à la résistance.\`__ __Désormais à vous de l'améliorer grâce à vos entrainements.__**

\`\`\` \`\`\`
                `,
                color: 0xFFFFFF,
                thumbnail: {
                    url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451910455326/Ability_Evoker_Rewind.png?ex=6731bdb8&is=67306c38&hm=854703e392fc5982e9021aa4a81a417611fdc07d78c6ed62121b4d548b608580&',
                },
                image: {
                    url: 'https://media.giphy.com/media/AKI06qGNgli48/giphy.gif',
                },
            }],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('confirmTalent10')
                        .setLabel('❘ 〘 ✅ 〙 ๑ ↝ Choιsιr :')
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(false)
                ),
            ],
            flags: 0,
        });
    const filter = i => i.customId === 'confirmTalent10' && i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15 * 60 * 1000 });

    collector.on('collect', async i => {
        if (i.customId === 'confirmTalent10') {
            await i.reply({
                embeds: [{
                    description: `
\`\`\` \`\`\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Rᥱ́sιstᥲᥒᥴᥱ ᥲmᥱ́ᥣιorᥱ́__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`50%\`__]**

\`⦇・━━━═══════════════════════════════━━━・⦈\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **Le talent <@&${roleIdRési}> vous a bien été attribué !**

\`\`\` \`\`\`
                    `,
                    color: 0xFFFFFF,
                    thumbnail: {
                        url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451910455326/Ability_Evoker_Rewind.png?ex=6731bdb8&is=67306c38&hm=854703e392fc5982e9021aa4a81a417611fdc07d78c6ed62121b4d548b608580&',
                    },
                    image: {
                        url: 'https://media.giphy.com/media/AKI06qGNgli48/giphy.gif',
                    },
                }],
                components: [],
            });
            const connection = await db.getConnection();
            await connection.execute(
                'UPDATE roll SET talent = ? WHERE id_membre = ?',
                ['Rᥱ́sιstᥲᥒᥴᥱ ᥲmᥱ́ᥣιorᥱ́', memberId]
            );
            connection.release();
            await member.roles.add(roleIdRési)
        }
    }); 
}
    }
        }
        } catch (error) {
            console.error(error);
        }
    },
};