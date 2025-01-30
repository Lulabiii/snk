const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const db = require('../database.js');
const embed_perm = require('../events/embed.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rollᵈᵉᵖᵃʳᵗ')
        .setDescription("Permets de faire son roll départ"),
    async execute(interaction, client) {
        const memberId = interaction.member.id;
        try {
            const connection = await db.getConnection();

            const [rows] = await connection.execute(
                'SELECT roll_départ FROM roll WHERE id_membre = ?',
                [memberId]
            );
            connection.release();
            const rollDepart = rows[0].roll_départ;

            if (rollDepart === 1) {
                const randomNumber = Math.floor(Math.random() * 100) + 1;
                if (randomNumber < 5) {
                    await interaction.reply({
                        embeds: [{
                            description: `
        \`\`\` \`\`\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Départ\` ] — __Lᥱ́gᥱᥒdᥲιrᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Iᥒᥱstιmᥲbᥣᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`5%\`__]**
    
        \`⦇・━━━═══════════════════════════════━━━・⦈\`
    
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous commencez alors votre aventure au sein du serveur avec __\`4 rolls talent\`__, __\`4 rolls affinité\`__ ainsi que __\`75000 Yen.\`__ À vous maintenant de faire de votre mieux afin de survivre dans cet monde impitoyable.**
        
        \`\`\` \`\`\`
                            `,
                            color: 0xFFFFFF,
                            thumbnail: {
                                url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451642015795/Ability_Evoker_TipTheScales.png?ex=6731bdb8&is=67306c38&hm=4a294c23ad70362d548debd21158fc5b089692d2d8e1af64ca7d4cf4c5e2a6a9&',
                            },
                            image: {
                                url: 'https://www.buzzfrance.fr/wp-content/uploads/2021/06/eren-snk.gif',
                            },
                        }],
                        flags: 0,
                    });
                    const connection = await db.getConnection();
                    await connection.execute(
                        'UPDATE roll SET roll_départ = ? WHERE id_membre = ?',
                        ['0', memberId]
                    );
                    connection.release();
                    const connection1 = await db.getConnection();
                    await connection1.execute(
                        'UPDATE roll SET roll_talent = roll_talent +? WHERE id_membre = ?',
                        [4, memberId]
                    );
                    connection1.release();
                    const connection2 = await db.getConnection();
                    await connection2.execute(
                        'UPDATE roll SET roll_affinité = roll_affinité +? WHERE id_membre = ?',
                        [4, memberId]
                    );
                    connection2.release();
                    const connection3 = await db.getConnection();
                    await connection3.execute(
                        'UPDATE économie SET argent = argent +? WHERE id_membre = ?',
                        [75000, memberId]
                    );
                    connection3.release();

                }
                else if (randomNumber < 25) {
                    await interaction.reply({
                        embeds: [{
                            description: `
        \`\`\` \`\`\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Départ\` ] — __Coᥒsιdᥱ́rᥲbᥣᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Trᥱ̀s rᥲrᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`20%\`__]**
    
        \`⦇・━━━═══════════════════════════════━━━・⦈\`
    
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous commencez alors votre aventure au sein du serveur avec __\`3 rolls talent\`__, __\`3 rolls affinité\`__ ainsi que __\`50000 Yen.\`__ À vous maintenant de faire de votre mieux afin de survivre dans cet monde impitoyable.**
        
        \`\`\` \`\`\`
                            `,
                            color: 0xFFFFFF,
                            thumbnail: {
                                url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451642015795/Ability_Evoker_TipTheScales.png?ex=6731bdb8&is=67306c38&hm=4a294c23ad70362d548debd21158fc5b089692d2d8e1af64ca7d4cf4c5e2a6a9&',
                            },
                            image: {
                                url: 'https://64.media.tumblr.com/0b9a640817161cd670c35def8529d4e9/6484e37c3d7d11da-5e/s540x810/d6f29d9cf42dacf38646e0b33a7b3d4c9e280f2b.gif',
                            },
                        }],
                        flags: 0,
                    });
                    const connection = await db.getConnection();
                    await connection.execute(
                        'UPDATE roll SET roll_départ = ? WHERE id_membre = ?',
                        ['0', memberId]
                    );
                    connection.release();
                    const connection1 = await db.getConnection();
                    await connection1.execute(
                        'UPDATE roll SET roll_talent = roll_talent +? WHERE id_membre = ?',
                        [3, memberId]
                    );
                    connection1.release();
                    const connection2 = await db.getConnection();
                    await connection2.execute(
                        'UPDATE roll SET roll_affinité = roll_affinité +? WHERE id_membre = ?',
                        [3, memberId]
                    );
                    connection2.release();
                    const connection3 = await db.getConnection();
                    await connection3.execute(
                        'UPDATE économie SET argent = argent +? WHERE id_membre = ?',
                        [50000, memberId]
                    );
                    connection3.release();

                }
                else if (randomNumber < 55) {
                    await interaction.reply({
                        embeds: [{
                            description: `
        \`\`\` \`\`\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Départ\` ] — __Aρρrᥱ́ᥴιᥲbᥣᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Rᥲrᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`30%\`__]**
    
        \`⦇・━━━═══════════════════════════════━━━・⦈\`
    
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous commencez alors votre aventure au sein du serveur avec __\`2 rolls talent\`__, __\`2 rolls affinité\`__ ainsi que __\`35000 Yen.\`__ À vous maintenant de faire de votre mieux afin de survivre dans cet monde impitoyable.**
        
        \`\`\` \`\`\`
                            `,
                            color: 0xFFFFFF,
                            thumbnail: {
                                url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451642015795/Ability_Evoker_TipTheScales.png?ex=6731bdb8&is=67306c38&hm=4a294c23ad70362d548debd21158fc5b089692d2d8e1af64ca7d4cf4c5e2a6a9&',
                            },
                            image: {
                                url: 'https://64.media.tumblr.com/c88aee1106518b70e4cb819243f666b6/tumblr_pyzcpuu01z1vmxayco3_540.gif',
                            },
                        }],
                        flags: 0,
                    });
                    const connection = await db.getConnection();
                    await connection.execute(
                        'UPDATE roll SET roll_départ = ? WHERE id_membre = ?',
                        ['0', memberId]
                    );
                    connection.release();
                    const connection1 = await db.getConnection();
                    await connection1.execute(
                        'UPDATE roll SET roll_talent = roll_talent +? WHERE id_membre = ?',
                        [2, memberId]
                    );
                    connection1.release();
                    const connection2 = await db.getConnection();
                    await connection2.execute(
                        'UPDATE roll SET roll_affinité = roll_affinité +? WHERE id_membre = ?',
                        [2, memberId]
                    );
                    connection2.release();
                    const connection3 = await db.getConnection();
                    await connection3.execute(
                        'UPDATE économie SET argent = argent +? WHERE id_membre = ?',
                        [35000, memberId]
                    );
                    connection3.release();
                }
                else if (randomNumber > 55) {
                    await interaction.reply({
                        embeds: [{
                            description: `
        \`\`\` \`\`\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Départ\` ] — __Loᥙᥲbᥣᥱ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ \`Rareté\` ] — __Pᥱᥙ rᥲrᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ __\`45%\`__]**
    
        \`⦇・━━━═══════════════════════════════━━━・⦈\`
    
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Dᥱ́tᥲιᥣs__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous commencez alors votre aventure au sein du serveur avec __\`2 rolls talent\`__, __\`1 rolls affinité\`__ ainsi que __\`20000 Yen.\`__ À vous maintenant de faire de votre mieux afin de survivre dans cet monde impitoyable.**
        
        \`\`\` \`\`\`
                            `,
                            color: 0xFFFFFF,
                            thumbnail: {
                                url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304540451642015795/Ability_Evoker_TipTheScales.png?ex=6731bdb8&is=67306c38&hm=4a294c23ad70362d548debd21158fc5b089692d2d8e1af64ca7d4cf4c5e2a6a9&',
                            },
                            image: {
                                url: 'https://31.media.tumblr.com/2d9e79c8968ec93c655b9d6f82089789/tumblr_mqyyz4NrXf1qm46two1_500.gif',
                            },
                        }],
                        flags: 0,
                    });
                    const connection = await db.getConnection();
                    await connection.execute(
                        'UPDATE roll SET roll_départ = ? WHERE id_membre = ?',
                        ['0', memberId]
                    );
                    connection.release();
                    const connection1 = await db.getConnection();
                    await connection1.execute(
                        'UPDATE roll SET roll_talent = ? WHERE id_membre = ?',
                        ['2', memberId]
                    );
                    connection1.release();
                    const connection2 = await db.getConnection();
                    await connection2.execute(
                        'UPDATE roll SET roll_affinité = ? WHERE id_membre = ?',
                        ['1', memberId]
                    );
                    connection2.release();
                    const connection3 = await db.getConnection();
                    await connection3.execute(
                        'UPDATE économie SET argent = ? WHERE id_membre = ?',
                        ['20000', memberId]
                    );
                    connection3.release();
                }
            }
            else {
                await interaction.reply({
                    embeds: [{
                        description: `
    \`\`\` \`\`\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:luck:1305248514015756440> ] — __Roᥣᥣ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez pas/plus de roll départ.**
    
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
            }
        } catch (error) {
            console.error(error);
        }
    }
};
