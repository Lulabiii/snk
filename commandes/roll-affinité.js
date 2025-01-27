const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const db = require('../database.js'); // Assurez-vous que ce chemin est correct

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rollᵃᶠᶠⁱⁿⁱᵗᵉ')
        .setDescription("Permet de faire son/ses roll affinité après le roll départ."),
    async execute(interaction, client) {
        const memberId = interaction.member.id;
        const member = interaction.member;
        const roleIdTridi = '1304183242186031185';
        const roleIdSabre = '1304183243184017479';
        const roleIdForce = '1304183239044235345';
        const roleIdRési = '1304183239912722573';
        const roleIdAgi = '1304183240688664628';
        try {
            const connection = await db.getConnection();
            const [rows] = await connection.execute(
                'SELECT roll_affinité FROM roll WHERE id_membre = ?',
                [memberId]
            );
            connection.release();
            const rollDepart = rows[0].roll_affinité;
            if (rollDepart === 0) {
                await interaction.reply({
                    embeds: [{
                        description: `
    \`\`\` \`\`\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez pas/plus de roll affinité.**
    
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
                if (randomNumber < 20) {
                    const connection = await db.getConnection();
                    await connection.execute(
                        'UPDATE roll SET roll_affinité = roll_affinité - 1 WHERE id_membre = ?',
                        [memberId]
                    );
                    connection.release();

                    await interaction.reply({
                        embeds: [{
                            description: `
    \`\`\` \`\`\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Affinité\` ] — __Mᥲᥒιᥱmᥱᥒt dᥙ sᥲbrᥱ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`20%\`__]**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Entrainement\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`x1.5\`__]**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rolls restants\` ] <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`${rollDepart - 1}\`__]**
    
    \`⦇・━━━═══════════════════════════════━━━・⦈\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous avez obtenu l'affinité <@&${roleIdSabre}>, __cette affinité permet à vos entrainement dans \`la statistique de votre affinité\` d'être plus efficace.__**
    
    \`\`\` \`\`\`
                            `,
                            color: 0xFFFFFF,
                            thumbnail: {
                                url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451126382592/Ability_Evoker_Rewind2.png?ex=6731bdb8&is=67306c38&hm=f6b4b7fafb0423ff8db0ac9ddde1df1912795135edd4cba7e1237e298a3c3388&',
                            },
                            image: {
                                url: 'https://media1.tenor.com/m/hgNS6aUCPRsAAAAC/foda.gif',
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
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Mᥲᥒιᥱmᥱᥒt dᥙ sᥲbrᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`20%\`__]**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Entrainement\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`x1.5\`__]**
        
        \`⦇・━━━═══════════════════════════════━━━・⦈\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **L'affinité <@&${roleIdSabre}> vous a bien été attribué !**
        
        \`\`\` \`\`\`
                                `,
                                color: 0xFFFFFF,
                                thumbnail: {
                                    url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451126382592/Ability_Evoker_Rewind2.png?ex=6731bdb8&is=67306c38&hm=f6b4b7fafb0423ff8db0ac9ddde1df1912795135edd4cba7e1237e298a3c3388&',
                                },
                                image: {
                                    url: 'https://media1.tenor.com/m/hgNS6aUCPRsAAAAC/foda.gif',
                                },
                            }],
                            components: [],
                        });
                        const connection = await db.getConnection();
                        await connection.execute(
                            'UPDATE roll SET affinité = ? WHERE id_membre = ?',
                            ['Mᥲᥒιᥱmᥱᥒt dᥙ sᥲbrᥱ', memberId]
                        );
                        connection.release();
                        await member.roles.add(roleIdSabre)
                    }
                });
                }
                else if (randomNumber < 40) {
                    const connection = await db.getConnection();
                    await connection.execute(
                        'UPDATE roll SET roll_affinité = roll_affinité - 1 WHERE id_membre = ?',
                        [memberId]
                    );
                    connection.release();

                    await interaction.reply({
                        embeds: [{
                            description: `
    \`\`\` \`\`\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Affinité\` ] — __Trιdιmᥱᥒsιoᥒᥒᥲᥣιtᥱ́__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`20%\`__]**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Entrainement\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`x1.5\`__]**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rolls restants\` ] <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`${rollDepart - 1}\`__]**
    
    \`⦇・━━━═══════════════════════════════━━━・⦈\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous avez obtenu l'affinité <@&${roleIdTridi}>, __cette affinité permet à vos entrainement dans \`la statistique de votre affinité\` d'être plus efficace.__**
    
    \`\`\` \`\`\`
                            `,
                            color: 0xFFFFFF,
                            thumbnail: {
                                url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451126382592/Ability_Evoker_Rewind2.png?ex=6731bdb8&is=67306c38&hm=f6b4b7fafb0423ff8db0ac9ddde1df1912795135edd4cba7e1237e298a3c3388&',
                            },
                            image: {
                                url: 'https://media1.tenor.com/m/hgNS6aUCPRsAAAAC/foda.gif',
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
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Trιdιmᥱᥒsιoᥒᥒᥲᥣιtᥱ́__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`20%\`__]**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Entrainement\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`x1.5\`__]**
        
        \`⦇・━━━═══════════════════════════════━━━・⦈\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **L'affinité <@&${roleIdTridi}> vous a bien été attribué !**
        
        \`\`\` \`\`\`
                                `,
                                color: 0xFFFFFF,
                                thumbnail: {
                                    url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451126382592/Ability_Evoker_Rewind2.png?ex=6731bdb8&is=67306c38&hm=f6b4b7fafb0423ff8db0ac9ddde1df1912795135edd4cba7e1237e298a3c3388&',
                                },
                                image: {
                                    url: 'https://media1.tenor.com/m/hgNS6aUCPRsAAAAC/foda.gif',
                                },
                            }],
                            components: [],
                        });
                        const connection = await db.getConnection();
                        await connection.execute(
                            'UPDATE roll SET affinité = ? WHERE id_membre = ?',
                            ['Trιdιmᥱᥒsιoᥒᥒᥲᥣιtᥱ́', memberId]
                        );
                        connection.release();
                        await member.roles.add(roleIdTridi)
                    }
                });
                }
                else if (randomNumber < 60) {
                    const connection = await db.getConnection();
                    await connection.execute(
                        'UPDATE roll SET roll_affinité = roll_affinité - 1 WHERE id_membre = ?',
                        [memberId]
                    );
                    connection.release();

                    await interaction.reply({
                        embeds: [{
                            description: `
    \`\`\` \`\`\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Affinité\` ] — __Rᥱ́sιstᥲᥒᥴᥱ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`20%\`__]**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Entrainement\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`x1.5\`__]**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rolls restants\` ] <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`${rollDepart - 1}\`__]**
    
    \`⦇・━━━═══════════════════════════════━━━・⦈\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous avez obtenu l'affinité <@&${roleIdRési}>, __cette affinité permet à vos entrainement dans \`la statistique de votre affinité\` d'être plus efficace.__**
    
    \`\`\` \`\`\`
                            `,
                            color: 0xFFFFFF,
                            thumbnail: {
                                url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451126382592/Ability_Evoker_Rewind2.png?ex=6731bdb8&is=67306c38&hm=f6b4b7fafb0423ff8db0ac9ddde1df1912795135edd4cba7e1237e298a3c3388&',
                            },
                            image: {
                                url: 'https://media1.tenor.com/m/hgNS6aUCPRsAAAAC/foda.gif',
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
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Rᥱ́sιstᥲᥒᥴᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`20%\`__]**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Entrainement\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`x1.5\`__]**
        
        \`⦇・━━━═══════════════════════════════━━━・⦈\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **L'affinité <@&${roleIdRési}> vous a bien été attribué !**
        
        \`\`\` \`\`\`
                                `,
                                color: 0xFFFFFF,
                                thumbnail: {
                                    url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451126382592/Ability_Evoker_Rewind2.png?ex=6731bdb8&is=67306c38&hm=f6b4b7fafb0423ff8db0ac9ddde1df1912795135edd4cba7e1237e298a3c3388&',
                                },
                                image: {
                                    url: 'https://media1.tenor.com/m/hgNS6aUCPRsAAAAC/foda.gif',
                                },
                            }],
                            components: [],
                        });
                        const connection = await db.getConnection();
                        await connection.execute(
                            'UPDATE roll SET affinité = ? WHERE id_membre = ?',
                            ['Rᥱ́sιstᥲᥒᥴᥱ', memberId]
                        );
                        connection.release();
                        await member.roles.add(roleIdRési)
                    }
                });
                }
                else if (randomNumber < 80) {
                    const connection = await db.getConnection();
                    await connection.execute(
                        'UPDATE roll SET roll_affinité = roll_affinité - 1 WHERE id_membre = ?',
                        [memberId]
                    );
                    connection.release();

                    await interaction.reply({
                        embeds: [{
                            description: `
    \`\`\` \`\`\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Affinité\` ] — __Forᥴᥱ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`20%\`__]**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Entrainement\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`x1.5\`__]**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rolls restants\` ] <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`${rollDepart - 1}\`__]**
    
    \`⦇・━━━═══════════════════════════════━━━・⦈\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous avez obtenu l'affinité <@&${roleIdForce}>, __cette affinité permet à vos entrainement dans \`la statistique de votre affinité\` d'être plus efficace.__**
    
    \`\`\` \`\`\`
                            `,
                            color: 0xFFFFFF,
                            thumbnail: {
                                url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451126382592/Ability_Evoker_Rewind2.png?ex=6731bdb8&is=67306c38&hm=f6b4b7fafb0423ff8db0ac9ddde1df1912795135edd4cba7e1237e298a3c3388&',
                            },
                            image: {
                                url: 'https://media1.tenor.com/m/hgNS6aUCPRsAAAAC/foda.gif',
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
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Forᥴᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`20%\`__]**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Entrainement\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`x1.5\`__]**
        
        \`⦇・━━━═══════════════════════════════━━━・⦈\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **L'affinité <@&${roleIdForce}> vous a bien été attribué !**
        
        \`\`\` \`\`\`
                                `,
                                color: 0xFFFFFF,
                                thumbnail: {
                                    url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451126382592/Ability_Evoker_Rewind2.png?ex=6731bdb8&is=67306c38&hm=f6b4b7fafb0423ff8db0ac9ddde1df1912795135edd4cba7e1237e298a3c3388&',
                                },
                                image: {
                                    url: 'https://media1.tenor.com/m/hgNS6aUCPRsAAAAC/foda.gif',
                                },
                            }],
                            components: [],
                        });
                        const connection = await db.getConnection();
                        await connection.execute(
                            'UPDATE roll SET affinité = ? WHERE id_membre = ?',
                            ['Forᥴᥱ', memberId]
                        );
                        connection.release();
                        await member.roles.add(roleIdForce)
                    }
                });
                }
                else if (randomNumber < 100) {
                    const connection = await db.getConnection();
                    await connection.execute(
                        'UPDATE roll SET roll_affinité = roll_affinité - 1 WHERE id_membre = ?',
                        [memberId]
                    );
                    connection.release();

                    await interaction.reply({
                        embeds: [{
                            description: `
    \`\`\` \`\`\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Affinité\` ] — __Agιᥣιtᥱ́__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`20%\`__]**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Entrainement\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`x1.5\`__]**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rolls restants\` ] <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`${rollDepart - 1}\`__]**
    
    \`⦇・━━━═══════════════════════════════━━━・⦈\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous avez obtenu l'affinité <@&${roleIdAgi}>, __cette affinité permet à vos entrainement dans \`la statistique de votre affinité\` d'être plus efficace.__**
    
    \`\`\` \`\`\`
                            `,
                            color: 0xFFFFFF,
                            thumbnail: {
                                url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451126382592/Ability_Evoker_Rewind2.png?ex=6731bdb8&is=67306c38&hm=f6b4b7fafb0423ff8db0ac9ddde1df1912795135edd4cba7e1237e298a3c3388&',
                            },
                            image: {
                                url: 'https://media1.tenor.com/m/hgNS6aUCPRsAAAAC/foda.gif',
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
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Talent\` ] — __Agιᥣιtᥱ́__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`20%\`__]**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Entrainement\` ] — __Commᥙᥒ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`x1.5\`__]**
        
        \`⦇・━━━═══════════════════════════════━━━・⦈\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **L'affinité <@&${roleIdAgi}> vous a bien été attribué !**
        
        \`\`\` \`\`\`
                                `,
                                color: 0xFFFFFF,
                                thumbnail: {
                                    url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451126382592/Ability_Evoker_Rewind2.png?ex=6731bdb8&is=67306c38&hm=f6b4b7fafb0423ff8db0ac9ddde1df1912795135edd4cba7e1237e298a3c3388&',
                                },
                                image: {
                                    url: 'https://media1.tenor.com/m/hgNS6aUCPRsAAAAC/foda.gif',
                                },
                            }],
                            components: [],
                        });
                        const connection = await db.getConnection();
                        await connection.execute(
                            'UPDATE roll SET affinité = ? WHERE id_membre = ?',
                            ['Agιᥣιtᥱ́', memberId]
                        );
                        connection.release();
                        await member.roles.add(roleIdAgi)
                    }
                });
                }
        }
        } catch (error) {
            console.error(error);
        }
    },
};
