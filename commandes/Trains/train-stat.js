const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const db = require('../../database.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('trainˢᵗᵃᵗˢ')
        .setDescription(`Permets à l'utilisateur d'entrainer ses statistiques.`),
    async execute(interaction) {
        const memberId = interaction.member.id;
        const roleIdTridi = '1304183242186031185';
        const roleIdSabre = '1304183243184017479';
        const roleIdForce = '1304183239044235345';
        const roleIdRési = '1304183239912722573';
        const roleIdAgi = '1304183240688664628';
        const roleAgi = interaction.member.roles.cache.has(roleIdAgi);
        const roleResi = interaction.member.roles.cache.has(roleIdRési);
        const roleForce = interaction.member.roles.cache.has(roleIdForce);
        const roleSabre = interaction.member.roles.cache.has(roleIdSabre);
        const roleTridi = interaction.member.roles.cache.has(roleIdTridi);
        const userId = interaction.user.id;
        const currentTime = Math.floor(Date.now() / 1000);
        const cooldownTime = 16 * 60 * 60;
        const expirationTime = currentTime + cooldownTime;

        try {
            const [result] = await db.query(
                'SELECT train, reminder_sent FROM cooldown WHERE id_membre = ?',
                [userId]
            );

            if (result.length > 0) {
                const { train, reminder_sent } = result[0];

                if (currentTime < train) {
                    const remainingTime = train - currentTime;
                    const hours = Math.floor(remainingTime / 3600);
                    const minutes = Math.floor((remainingTime % 3600) / 60);

                    await interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setDescription(`
        \`\`\` \`\`\`
        
        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous devez attendre encore __\`${hours}\`__ heures et __\`${minutes}\`__ minutes.**
        
        \`\`\` \`\`\`
                            `)
                            .setColor(0xFFFFFF)
                            .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1331362224295510068/INV__Fistofthewhitetiger.png')
                            .setImage('https://media1.tenor.com/m/8O90plJTiQYAAAAd/eren-eren-yeager.gif')
                        ],
                        flags: 64,
                    });

                    return;
                }
                await db.query(
                    'UPDATE entrainement SET train_global = train_global +1 WHERE id_membre = ?',
                    [userId]
                );
                await db.query(
                    'UPDATE cooldown SET train = ?, reminder_sent = 0 WHERE id_membre = ?',
                    [expirationTime, userId]
                );
            } else {
                await db.query(
                    'INSERT INTO cooldown (id_membre, train, reminder_sent) VALUES (?, ?, 0)',
                    [userId, expirationTime]
                );
            }
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('button_force')
                    .setEmoji('<:force:1304167448840245289>')
                    .setStyle('Secondary'),
                new ButtonBuilder()
                    .setCustomId('button_agi')
                    .setEmoji('<:agilite:1331383911057723534>')
                    .setStyle('Secondary'),
                new ButtonBuilder()
                    .setCustomId('button_resi')
                    .setEmoji('<:endurance:1304167362332852285>')
                    .setStyle('Secondary'),
                new ButtonBuilder()
                    .setCustomId('button_sabre')
                    .setEmoji('<:1256582963995611307:1304167353755369513>')
                    .setStyle('Secondary'),
                new ButtonBuilder()
                    .setCustomId('button_tridi')
                    .setEmoji('<:1266766028021563465:1304167360495747174>')
                    .setStyle('Secondary')
            );
            

            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`
            \`\`\` \`\`\`
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, quelle statistique souhaite-tu entrainer ?**
            
            \`\`\` \`\`\`
                        `)
                        .setColor(0xFFFFFF)
                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1331362224295510068/INV__Fistofthewhitetiger.png')
                        .setImage('https://i.gifer.com/UjLp.gif')
                ],
                components: [row],
                flags: 0,
            });
            const filter = (btnInteraction) => btnInteraction.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async (btnInteraction) => {
                const randomNumber = Math.floor(Math.random() * 1000) + 1;

                if (btnInteraction.customId === 'button_agi') {
                        if (roleAgi) {
                            if (randomNumber < 200) {
                                await btnInteraction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`
                \`\`\` \`\`\`
                    
                    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
                
                    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entrainez avec tellement d'ardeur et de détermination que cet entrainement est doublement efficace. Cependant grâce à votre affinité pour l'agilité cet entrainement est doublement efficace !**
                
                    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:agilite:1331383911057723534> ] — __~~+2~~ \`+4\`__**
                
                \`\`\` \`\`\`
                                        `)
                                        .setColor(0xFFFFFF)
                                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1305596921577996298/Ability_Argus_DeathFog.png?ex=6793d8e2&is=67928762&hm=030493d1c15d0a8e17168175263f029406b02011663039f5962b4501b08b0ab1&')
                                        .setImage('https://media1.tenor.com/m/yXB738y2jYQAAAAd/eren-run.gif')
                                    ],
                                    flags: 0,
                                });
                                const connection = await db.getConnection();
                                await connection.execute(
                                    'UPDATE train_agilite SET nombre = nombre +4 WHERE id_membre = ?',
                                    [memberId]
                                );
                                connection.release();
                                collector.stop()
                                return;
                        }
                        else if (randomNumber < 700) {
                            await btnInteraction.reply({
                                embeds: [new EmbedBuilder()
                                    .setDescription(`
            \`\`\` \`\`\`
                
                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
            
                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entrainez avec un tel dévouement que votre entrainement est plus efficace que d'habitude. Cependant grâce à votre affinité pour l'agilité cet entrainement est doublement efficace !**
            
                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:agilite:1331383911057723534> ] — __~~+1.5~~ \`+3\`__**
            
            \`\`\` \`\`\`
                                    `)
                                    .setColor(0xFFFFFF)
                                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1305596921577996298/Ability_Argus_DeathFog.png?ex=6793d8e2&is=67928762&hm=030493d1c15d0a8e17168175263f029406b02011663039f5962b4501b08b0ab1&')
                                    .setImage('https://media1.tenor.com/m/yXB738y2jYQAAAAd/eren-run.gif')
                                ],
                                flags: 0,
                            });
                            const connection = await db.getConnection();
                            await connection.execute(
                                'UPDATE train_agilite SET nombre = nombre +3 WHERE id_membre = ?',
                                [memberId]
                            );
                            connection.release();
                            collector.stop()
                            return;
                    }
                    else if (randomNumber < 1500) {
                        await btnInteraction.reply({
                            embeds: [new EmbedBuilder()
                                .setDescription(`
        \`\`\` \`\`\`
            
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
        
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entrainez comme tout les jours, aucune efficacité spéciale n'est ressentie. Cependant grâce à votre affinité pour l'agilité cet entrainement est doublement efficace !**
        
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:agilite:1331383911057723534> ] — __\`+2\`__**
        
        \`\`\` \`\`\`
                                `)
                                .setColor(0xFFFFFF)
                                .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1305596921577996298/Ability_Argus_DeathFog.png?ex=6793d8e2&is=67928762&hm=030493d1c15d0a8e17168175263f029406b02011663039f5962b4501b08b0ab1&')
                                .setImage('https://media1.tenor.com/m/yXB738y2jYQAAAAd/eren-run.gif')
                            ],
                            flags: 0,
                        });
                        const connection = await db.getConnection();
                        await connection.execute(
                            'UPDATE train_agilite SET nombre = nombre +2 WHERE id_membre = ?',
                            [memberId]
                        );
                        connection.release();
                        collector.stop()
                        return;
                }
                        }
                        else {
                            if (randomNumber < 200) {
                                await btnInteraction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`
                \`\`\` \`\`\`
                    
                    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
                
                    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entrainez avec tellement d'ardeur et de détermination que cet entrainement est doublement efficace.**
                
                    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:agilite:1331383911057723534> ] — __~~+1~~ \`+2\`__**
                
                \`\`\` \`\`\`
                                        `)
                                        .setColor(0xFFFFFF)
                                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1305596921577996298/Ability_Argus_DeathFog.png?ex=6793d8e2&is=67928762&hm=030493d1c15d0a8e17168175263f029406b02011663039f5962b4501b08b0ab1&')
                                        .setImage('https://media1.tenor.com/m/yXB738y2jYQAAAAd/eren-run.gif')
                                    ],
                                    flags: 0,
                                });
                                const connection = await db.getConnection();
                                await connection.execute(
                                    'UPDATE train_agilite SET nombre = nombre +2 WHERE id_membre = ?',
                                    [memberId]
                                );
                                connection.release();
                                collector.stop()
                                return;
                        }
                        else if (randomNumber < 700) {
                            await btnInteraction.reply({
                                embeds: [new EmbedBuilder()
                                    .setDescription(`
            \`\`\` \`\`\`
                
                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
            
                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entrainez avec un tel dévouement que votre entrainement est plus efficace que d'habitude.**
            
                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:agilite:1331383911057723534> ] — __~~+1~~ \`+1.5\`__**
            
            \`\`\` \`\`\`
                                    `)
                                    .setColor(0xFFFFFF)
                                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1305596921577996298/Ability_Argus_DeathFog.png?ex=6793d8e2&is=67928762&hm=030493d1c15d0a8e17168175263f029406b02011663039f5962b4501b08b0ab1&')
                                    .setImage('https://media1.tenor.com/m/yXB738y2jYQAAAAd/eren-run.gif')
                                ],
                                flags: 0,
                            });
                            const connection = await db.getConnection();
                            await connection.execute(
                                'UPDATE train_agilite SET nombre = nombre +1.5 WHERE id_membre = ?',
                                [memberId]
                            );
                            connection.release();
                            collector.stop()
                            return;
                    }
                    else if (randomNumber < 1500) {
                        await btnInteraction.reply({
                            embeds: [new EmbedBuilder()
                                .setDescription(`
        \`\`\` \`\`\`
            
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
        
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entrainez comme tout les jours, aucune efficacité spéciale n'est ressentie.**
        
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:agilite:1331383911057723534> ] — __\`+1\`__**
        
        \`\`\` \`\`\`
                                `)
                                .setColor(0xFFFFFF)
                                .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1305596921577996298/Ability_Argus_DeathFog.png?ex=6793d8e2&is=67928762&hm=030493d1c15d0a8e17168175263f029406b02011663039f5962b4501b08b0ab1&')
                                .setImage('https://media1.tenor.com/m/yXB738y2jYQAAAAd/eren-run.gif')
                            ],
                            flags: 0,
                        });
                        const connection = await db.getConnection();
                        await connection.execute(
                            'UPDATE train_agilite SET nombre = nombre +1 WHERE id_membre = ?',
                            [memberId]
                        );
                        connection.release();
                        collector.stop()
                        return;
                }
                        }
                    }
                    else if (btnInteraction.customId === 'button_resi') {
                        if (roleResi) {
                            if (randomNumber < 200) {
                                await btnInteraction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`
                \`\`\` \`\`\`
                    
                    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
                
                    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entrainez avec tellement d'ardeur et de détermination que cet entrainement est doublement efficace. Cependant grâce à votre affinité pour la résistance cet entrainement est doublement efficace !**
                
                    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:endurance:1304167362332852285> ] — __~~+2~~ \`+4\`__**
                
                \`\`\` \`\`\`
                                        `)
                                        .setColor(0xFFFFFF)
                                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1305596921800298496/Ability_Bastion_Monk.png?ex=6793d8e2&is=67928762&hm=67c679dab1d86564324763ed2fb13efc8307d2054f5d638d46f13286a5132d4b&')
                                        .setImage('https://media1.tenor.com/m/v_OHr9yjYHQAAAAd/reiner-steam.gif')
                                    ],
                                    flags: 0,
                                });
                                const connection = await db.getConnection();
                                await connection.execute(
                                    'UPDATE train_resistance SET nombre = nombre +4 WHERE id_membre = ?',
                                    [memberId]
                                );
                                connection.release();
                                collector.stop()
                                return;
                        }
                        else if (randomNumber < 700) {
                            await btnInteraction.reply({
                                embeds: [new EmbedBuilder()
                                    .setDescription(`
            \`\`\` \`\`\`
                
                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
            
                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entrainez avec un tel dévouement que votre entrainement est plus efficace que d'habitude. Cependant grâce à votre affinité pour la résistance cet entrainement est doublement efficace !**
            
                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:endurance:1304167362332852285> ] — __~~+1.5~~ \`+3\`__**
            
            \`\`\` \`\`\`
                                    `)
                                    .setColor(0xFFFFFF)
                                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1305596921800298496/Ability_Bastion_Monk.png?ex=6793d8e2&is=67928762&hm=67c679dab1d86564324763ed2fb13efc8307d2054f5d638d46f13286a5132d4b&')
                                    .setImage('https://media1.tenor.com/m/v_OHr9yjYHQAAAAd/reiner-steam.gif')
                                ],
                                flags: 0,
                            });
                            const connection = await db.getConnection();
                            await connection.execute(
                                'UPDATE train_resistance SET nombre = nombre +3 WHERE id_membre = ?',
                                [memberId]
                            );
                            connection.release();
                            collector.stop()
                            return;
                    }
                    else if (randomNumber < 1500) {
                        await btnInteraction.reply({
                            embeds: [new EmbedBuilder()
                                .setDescription(`
        \`\`\` \`\`\`
            
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
        
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entrainez comme tout les jours, aucune efficacité spéciale n'est ressentie. Cependant grâce à votre affinité pour la résistance cet entrainement est doublement efficace !**
        
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:endurance:1304167362332852285> ] — __\`+2\`__**
        
        \`\`\` \`\`\`
                                `)
                                .setColor(0xFFFFFF)
                                .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1305596921800298496/Ability_Bastion_Monk.png?ex=6793d8e2&is=67928762&hm=67c679dab1d86564324763ed2fb13efc8307d2054f5d638d46f13286a5132d4b&')
                                .setImage('https://media1.tenor.com/m/v_OHr9yjYHQAAAAd/reiner-steam.gif')
                            ],
                            flags: 0,
                        });
                        const connection = await db.getConnection();
                        await connection.execute(
                            'UPDATE train_resistance SET nombre = nombre +2 WHERE id_membre = ?',
                            [memberId]
                        );
                        connection.release();
                        collector.stop()
                        return;
                }
                        }
                        else {
                            if (randomNumber < 200) {
                                await btnInteraction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`
                \`\`\` \`\`\`
                    
                    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
                
                    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entrainez avec tellement d'ardeur et de détermination que cet entrainement est doublement efficace.**
                
                    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:endurance:1304167362332852285> ] — __~~+1~~ \`+2\`__**
                
                \`\`\` \`\`\`
                                        `)
                                        .setColor(0xFFFFFF)
                                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1305596921800298496/Ability_Bastion_Monk.png?ex=6793d8e2&is=67928762&hm=67c679dab1d86564324763ed2fb13efc8307d2054f5d638d46f13286a5132d4b&')
                                        .setImage('https://media1.tenor.com/m/v_OHr9yjYHQAAAAd/reiner-steam.gif')
                                    ],
                                    flags: 0,
                                });
                                const connection = await db.getConnection();
                                await connection.execute(
                                    'UPDATE train_resistance SET nombre = nombre +2 WHERE id_membre = ?',
                                    [memberId]
                                );
                                connection.release();
                                collector.stop()
                                return;
                        }
                        else if (randomNumber < 700) {
                            await btnInteraction.reply({
                                embeds: [new EmbedBuilder()
                                    .setDescription(`
            \`\`\` \`\`\`
                
                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
            
                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entrainez avec un tel dévouement que votre entrainement est plus efficace que d'habitude.**
            
                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:endurance:1304167362332852285> ] — __~~+1~~ \`+1.5\`__**
            
            \`\`\` \`\`\`
                                    `)
                                    .setColor(0xFFFFFF)
                                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1305596921800298496/Ability_Bastion_Monk.png?ex=6793d8e2&is=67928762&hm=67c679dab1d86564324763ed2fb13efc8307d2054f5d638d46f13286a5132d4b&')
                                    .setImage('https://media1.tenor.com/m/v_OHr9yjYHQAAAAd/reiner-steam.gif')
                                ],
                                flags: 0,
                            });
                            const connection = await db.getConnection();
                            await connection.execute(
                                'UPDATE train_resistance SET nombre = nombre +1.5 WHERE id_membre = ?',
                                [memberId]
                            );
                            connection.release();
                            collector.stop()
                            return;
                    }
                    else if (randomNumber < 1500) {
                        await btnInteraction.reply({
                            embeds: [new EmbedBuilder()
                                .setDescription(`
        \`\`\` \`\`\`
            
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
        
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entrainez comme tout les jours, aucune efficacité spéciale n'est ressentie.**
        
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:endurance:1304167362332852285> ] — __\`+1\`__**
        
        \`\`\` \`\`\`
                                `)
                                .setColor(0xFFFFFF)
                                .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1305596921800298496/Ability_Bastion_Monk.png?ex=6793d8e2&is=67928762&hm=67c679dab1d86564324763ed2fb13efc8307d2054f5d638d46f13286a5132d4b&')
                                .setImage('https://media1.tenor.com/m/v_OHr9yjYHQAAAAd/reiner-steam.gif')
                            ],
                            flags: 0,
                        });
                        const connection = await db.getConnection();
                        await connection.execute(
                            'UPDATE train_resistance SET nombre = nombre +1 WHERE id_membre = ?',
                            [memberId]
                        );
                        connection.release();
                        collector.stop()
                        return;
                }
                        }
                    }
                    if (btnInteraction.customId === 'button_force') {
                        if (roleForce) {
                            if (randomNumber < 200) {
                                await btnInteraction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`
                    \`\`\` \`\`\`
                    
                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
                    
                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entrainez avec tellement d'ardeur et de détermination que cet entrainement est doublement efficace. Cependant grâce à votre affinité pour la force cet entrainement est doublement efficace !**
                    
                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:force:1331383911057723534> ] — __~~+2~~ \`+4\`__**
                    
                    \`\`\` \`\`\`
                                    `)
                                    .setColor(0xFFFFFF)
                                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1331362224295510068/INV__Fistofthewhitetiger.png')
                                    .setImage('https://media1.tenor.com/m/nTLF40E_Y90AAAAd/anime-attack-on-titan.gif')
                                ],
                                flags: 0,
                            });
                            const connection = await db.getConnection();
                            await connection.execute(
                                'UPDATE train_force SET nombre = nombre +4 WHERE id_membre = ?',
                                [memberId]
                            );
                            connection.release();
                            collector.stop()
                            return;
                        }
                        else if (randomNumber < 700) {
                            await btnInteraction.reply({
                                embeds: [new EmbedBuilder()
                                    .setDescription(`
                    \`\`\` \`\`\`
                    
                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
                    
                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entrainez avec un tel dévouement que votre entrainement est plus efficace que d'habitude. Cependant grâce à votre affinité pour la force cet entrainement est doublement efficace !**
                    
                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:force:1331383911057723534> ] — __~~+1.5~~ \`+3\`__**
                    
                    \`\`\` \`\`\`
                                `)
                                .setColor(0xFFFFFF)
                                .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1331362224295510068/INV__Fistofthewhitetiger.png')
                                .setImage('https://media1.tenor.com/m/nTLF40E_Y90AAAAd/anime-attack-on-titan.gif')
                            ],
                            flags: 0,
                        });
                        const connection = await db.getConnection();
                        await connection.execute(
                            'UPDATE train_force SET nombre = nombre +3 WHERE id_membre = ?',
                            [memberId]
                        );
                        connection.release();
                        collector.stop()
                        return;
                    }
                    else if (randomNumber < 1500) {
                        await btnInteraction.reply({
                            embeds: [new EmbedBuilder()
                                .setDescription(`
                    \`\`\` \`\`\`
                    
                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
                    
                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entrainez comme tout les jours, aucune efficacité spéciale n'est ressentie. Cependant grâce à votre affinité pour la force cet entrainement est doublement efficace !**
                    
                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:force:1331383911057723534> ] — __\`+2\`__**
                    
                    \`\`\` \`\`\`
                                        `)
                                .setColor(0xFFFFFF)
                                .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1331362224295510068/INV__Fistofthewhitetiger.png')
                                .setImage('https://media1.tenor.com/m/nTLF40E_Y90AAAAd/anime-attack-on-titan.gif')
                            ],
                            flags: 0,
                        });
                        const connection = await db.getConnection();
                        await connection.execute(
                            'UPDATE train_force SET nombre = nombre +2 WHERE id_membre = ?',
                            [memberId]
                        );
                        connection.release();
                        collector.stop()
                        return;
                    }
                        }
                        else {
                            if (randomNumber < 200) {
                                await btnInteraction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`
                    \`\`\` \`\`\`
                    
                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
                    
                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entrainez avec tellement d'ardeur et de détermination que cet entrainement est doublement efficace.**
                    
                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:force:1331383911057723534> ] — __~~+1~~ \`+2\`__**
                    
                    \`\`\` \`\`\`
                                        `)
                                        .setColor(0xFFFFFF)
                                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1331362224295510068/INV__Fistofthewhitetiger.png')
                                        .setImage('https://media1.tenor.com/m/nTLF40E_Y90AAAAd/anime-attack-on-titan.gif')
                                    ],
                                    flags: 0,
                                });
                                const connection = await db.getConnection();
                                await connection.execute(
                                    'UPDATE train_force SET nombre = nombre +2 WHERE id_membre = ?',
                                    [memberId]
                                );
                                connection.release();
                                collector.stop()
                                return;
                            }
                            else if (randomNumber < 700) {
                                await btnInteraction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`
                    \`\`\` \`\`\`
                    
                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
                    
                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entrainez avec un tel dévouement que votre entrainement est plus efficace que d'habitude.**
                    
                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:force:1331383911057723534> ] — __~~+1~~ \`+1.5\`__**
                    
                    \`\`\` \`\`\`
                                        `)
                                        .setColor(0xFFFFFF)
                                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1331362224295510068/INV__Fistofthewhitetiger.png')
                                        .setImage('https://media1.tenor.com/m/nTLF40E_Y90AAAAd/anime-attack-on-titan.gif')
                                    ],
                                    flags: 0,
                                });
                                const connection = await db.getConnection();
                                await connection.execute(
                                    'UPDATE train_force SET nombre = nombre +1.5 WHERE id_membre = ?',
                                    [memberId]
                                );
                                connection.release();
                                collector.stop()
                                return;
                            }
                            else if (randomNumber < 1500) {
                                await btnInteraction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`
                    \`\`\` \`\`\`
                    
                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
                    
                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entrainez comme tout les jours, aucune efficacité spéciale n'est ressentie.**
                    
                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:force:1331383911057723534> ] — __\`+1\`__**
                    
                    \`\`\` \`\`\`
                                        `)
                                        .setColor(0xFFFFFF)
                                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1331362224295510068/INV__Fistofthewhitetiger.png')
                                        .setImage('https://media1.tenor.com/m/nTLF40E_Y90AAAAd/anime-attack-on-titan.gif')
                                    ],
                                    flags: 0,
                                });
                                const connection = await db.getConnection();
                                await connection.execute(
                                    'UPDATE train_force SET nombre = nombre +1 WHERE id_membre = ?',
                                    [memberId]
                                );
                                connection.release();
                                collector.stop()
                                return;
                            }
                        }
                    }
                    if (btnInteraction.customId === 'button_tridi') {
                        if (roleTridi) {
                            if (randomNumber < 200) {
                                await btnInteraction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`
                                        \`\`\` \`\`\`
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entraînez avec tellement d'ardeur et de détermination que cet entraînement est doublement efficace. Cependant, grâce à votre affinité pour la Tridimensionnalité, cet entraînement est encore plus efficace !**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:tridi:1331383911057723534> ] — __~~+2~~ \`+4\`__**
                                        
                                        \`\`\` \`\`\`
                                        `)
                                        .setColor(0xFFFFFF)
                                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1305596921293045852/Ability_DemonHunter_Immolation.png?ex=6793d8e2&is=67928762&hm=e4e5a04ac29e5628afe80ced39e85960fa879e0f9a43e2c82bab3e1b2c5861ae&')
                                        .setImage('https://media1.tenor.com/m/6rx2Gv72SsoAAAAd/levi-levi-ackerman.gif')
                                    ],
                                    flags: 0,
                                });
                                const connection = await db.getConnection();
                                await connection.execute(
                                    'UPDATE train_tridi SET nombre = nombre +4 WHERE id_membre = ?',
                                    [memberId]
                                );
                                connection.release();
                                collector.stop();
                                return;
                            } else if (randomNumber < 700) {
                                await btnInteraction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`
                                        \`\`\` \`\`\`
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entraînez avec un tel dévouement que votre entraînement est plus efficace que d'habitude. Cependant, grâce à votre affinité pour la Tridimensionnalité, cet entraînement est encore plus efficace !**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:tridi:1331383911057723534> ] — __~~+1.5~~ \`+3\`__**
                                        
                                        \`\`\` \`\`\`
                                        `)
                                        .setColor(0xFFFFFF)
                                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1305596921293045852/Ability_DemonHunter_Immolation.png?ex=6793d8e2&is=67928762&hm=e4e5a04ac29e5628afe80ced39e85960fa879e0f9a43e2c82bab3e1b2c5861ae&')
                                        .setImage('https://media1.tenor.com/m/6rx2Gv72SsoAAAAd/levi-levi-ackerman.gif')
                                    ],
                                    flags: 0,
                                });
                                const connection = await db.getConnection();
                                await connection.execute(
                                    'UPDATE train_tridi SET nombre = nombre +3 WHERE id_membre = ?',
                                    [memberId]
                                );
                                connection.release();
                                collector.stop();
                                return;
                            } else if (randomNumber < 1500) {
                                await btnInteraction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`
                                        \`\`\` \`\`\`
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entraînez comme tous les jours, aucune efficacité spéciale n'est ressentie. Cependant, grâce à votre affinité pour la Tridimensionnalité, cet entraînement est plus efficace !**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:tridi:1331383911057723534> ] — __\`+2\`__**
                                        
                                        \`\`\` \`\`\`
                                        `)
                                        .setColor(0xFFFFFF)
                                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1305596921293045852/Ability_DemonHunter_Immolation.png?ex=6793d8e2&is=67928762&hm=e4e5a04ac29e5628afe80ced39e85960fa879e0f9a43e2c82bab3e1b2c5861ae&')
                                        .setImage('https://media1.tenor.com/m/6rx2Gv72SsoAAAAd/levi-levi-ackerman.gif')
                                    ],
                                    flags: 0,
                                });
                                const connection = await db.getConnection();
                                await connection.execute(
                                    'UPDATE train_tridi SET nombre = nombre +2 WHERE id_membre = ?',
                                    [memberId]
                                );
                                connection.release();
                                collector.stop();
                                return;
                            }
                        } else {
                            if (randomNumber < 200) {
                                await btnInteraction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`
                                        \`\`\` \`\`\`
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entraînez avec tellement d'ardeur et de détermination que cet entraînement est doublement efficace !**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:tridi:1331383911057723534> ] — __~~+1~~ \`+2\`__**
                                        
                                        \`\`\` \`\`\`
                                        `)
                                        .setColor(0xFFFFFF)
                                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1305596921293045852/Ability_DemonHunter_Immolation.png?ex=6793d8e2&is=67928762&hm=e4e5a04ac29e5628afe80ced39e85960fa879e0f9a43e2c82bab3e1b2c5861ae&')
                                        .setImage('https://media1.tenor.com/m/6rx2Gv72SsoAAAAd/levi-levi-ackerman.gif')
                                    ],
                                    flags: 0,
                                });
                                const connection = await db.getConnection();
                                await connection.execute(
                                    'UPDATE train_tridi SET nombre = nombre +2 WHERE id_membre = ?',
                                    [memberId]
                                );
                                connection.release();
                                collector.stop();
                                return;
                            } else if (randomNumber < 700) {
                                await btnInteraction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`
                                        \`\`\` \`\`\`
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entraînez avec un tel dévouement que votre entraînement est plus efficace que d'habitude.**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:tridi:1331383911057723534> ] — __~~+1~~ \`+1.5\`__**
                                        
                                        \`\`\` \`\`\`
                                        `)
                                        .setColor(0xFFFFFF)
                                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1305596921293045852/Ability_DemonHunter_Immolation.png?ex=6793d8e2&is=67928762&hm=e4e5a04ac29e5628afe80ced39e85960fa879e0f9a43e2c82bab3e1b2c5861ae&')
                                        .setImage('https://media1.tenor.com/m/6rx2Gv72SsoAAAAd/levi-levi-ackerman.gif')
                                    ],
                                    flags: 0,
                                });
                                const connection = await db.getConnection();
                                await connection.execute(
                                    'UPDATE train_tridi SET nombre = nombre +1.5 WHERE id_membre = ?',
                                    [memberId]
                                );
                                connection.release();
                                collector.stop();
                                return;
                            } else if (randomNumber < 1500) {
                                await btnInteraction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`
                                        \`\`\` \`\`\`
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entraînez comme tous les jours, aucune efficacité spéciale n'est ressentie.**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:tridi:1331383911057723534> ] — __\`+1\`__**
                                        
                                        \`\`\` \`\`\`
                                        `)
                                        .setColor(0xFFFFFF)
                                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1305596921293045852/Ability_DemonHunter_Immolation.png?ex=6793d8e2&is=67928762&hm=e4e5a04ac29e5628afe80ced39e85960fa879e0f9a43e2c82bab3e1b2c5861ae&')
                                        .setImage('https://media1.tenor.com/m/6rx2Gv72SsoAAAAd/levi-levi-ackerman.gif')
                                    ],
                                    flags: 0,
                                });
                                const connection = await db.getConnection();
                                await connection.execute(
                                    'UPDATE train_tridi SET nombre = nombre +1 WHERE id_membre = ?',
                                    [memberId]
                                );
                                connection.release();
                                collector.stop();
                                return;
                            }
                        }
                    }
                    if (btnInteraction.customId === 'button_sabre') {
                        if (roleSabre) {
                            if (randomNumber < 200) {
                                await btnInteraction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`
                                        \`\`\` \`\`\`
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entraînez avec tellement d'ardeur et de détermination que cet entraînement est doublement efficace. Cependant, grâce à votre affinité pour la Maîtrise du sabre, cet entraînement est encore plus efficace !**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:sabre:1331383911057723534> ] — __~~+2~~ \`+4\`__**
                                        
                                        \`\`\` \`\`\`
                                        `)
                                        .setColor(0xFFFFFF)
                                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1331362224295510068/INV__Fistofthewhitetiger.png')
                                        .setImage('https://media1.tenor.com/m/DBZ3PIjgdbAAAAAd/levi.gif')
                                    ],
                                    flags: 0,
                                });
                                const connection = await db.getConnection();
                                await connection.execute(
                                    'UPDATE train_sabre SET nombre = nombre +4 WHERE id_membre = ?',
                                    [memberId]
                                );
                                connection.release();
                                collector.stop();
                                return;
                            } else if (randomNumber < 700) {
                                await btnInteraction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`
                                        \`\`\` \`\`\`
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entraînez avec un tel dévouement que votre entraînement est plus efficace que d'habitude. Cependant, grâce à votre affinité pour la Maîtrise du sabre, cet entraînement est encore plus efficace !**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:sabre:1331383911057723534> ] — __~~+1.5~~ \`+3\`__**
                                        
                                        \`\`\` \`\`\`
                                        `)
                                        .setColor(0xFFFFFF)
                                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332099712739971245/Ability_Rogue_ShadowStrikes.png?ex=67940608&is=6792b488&hm=9bcf697285789454a3cba542772bd43f1de0c4a6dd2ae105ae290ecd20540b81&')
                                        .setImage('https://media1.tenor.com/m/DBZ3PIjgdbAAAAAd/levi.gif')
                                    ],
                                    flags: 0,
                                });
                                const connection = await db.getConnection();
                                await connection.execute(
                                    'UPDATE train_sabre SET nombre = nombre +3 WHERE id_membre = ?',
                                    [memberId]
                                );
                                connection.release();
                                collector.stop();
                                return;
                            } else if (randomNumber < 1500) {
                                await btnInteraction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`
                                        \`\`\` \`\`\`
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entraînez comme tous les jours, aucune efficacité spéciale n'est ressentie. Cependant, grâce à votre affinité pour la Maîtrise du sabre, cet entraînement est plus efficace !**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:sabre:1331383911057723534> ] — __\`+2\`__**
                                        
                                        \`\`\` \`\`\`
                                        `)
                                        .setColor(0xFFFFFF)
                                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332099712739971245/Ability_Rogue_ShadowStrikes.png?ex=67940608&is=6792b488&hm=9bcf697285789454a3cba542772bd43f1de0c4a6dd2ae105ae290ecd20540b81&')
                                        .setImage('https://media1.tenor.com/m/DBZ3PIjgdbAAAAAd/levi.gif')
                                    ],
                                    flags: 0,
                                });
                                const connection = await db.getConnection();
                                await connection.execute(
                                    'UPDATE train_sabre SET nombre = nombre +2 WHERE id_membre = ?',
                                    [memberId]
                                );
                                connection.release();
                                collector.stop();
                                return;
                            }
                        } else {
                            if (randomNumber < 200) {
                                await btnInteraction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`
                                        \`\`\` \`\`\`
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entraînez avec tellement d'ardeur et de détermination que cet entraînement est doublement efficace !**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:sabre:1331383911057723534> ] — __~~+1~~ \`+2\`__**
                                        
                                        \`\`\` \`\`\`
                                        `)
                                        .setColor(0xFFFFFF)
                                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332099712739971245/Ability_Rogue_ShadowStrikes.png?ex=67940608&is=6792b488&hm=9bcf697285789454a3cba542772bd43f1de0c4a6dd2ae105ae290ecd20540b81&')
                                        .setImage('https://media1.tenor.com/m/DBZ3PIjgdbAAAAAd/levi.gif')
                                    ],
                                    flags: 0,
                                });
                                const connection = await db.getConnection();
                                await connection.execute(
                                    'UPDATE train_sabre SET nombre = nombre +2 WHERE id_membre = ?',
                                    [memberId]
                                );
                                connection.release();
                                collector.stop();
                                return;
                            } else if (randomNumber < 700) {
                                await btnInteraction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`
                                        \`\`\` \`\`\`
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entraînez avec un tel dévouement que votre entraînement est plus efficace que d'habitude.**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:sabre:1331383911057723534> ] — __~~+1~~ \`+1.5\`__**
                                        
                                        \`\`\` \`\`\`
                                        `)
                                        .setColor(0xFFFFFF)
                                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332099712739971245/Ability_Rogue_ShadowStrikes.png?ex=67940608&is=6792b488&hm=9bcf697285789454a3cba542772bd43f1de0c4a6dd2ae105ae290ecd20540b81&')
                                        .setImage('https://media1.tenor.com/m/DBZ3PIjgdbAAAAAd/levi.gif')
                                    ],
                                    flags: 0,
                                });
                                const connection = await db.getConnection();
                                await connection.execute(
                                    'UPDATE train_sabre SET nombre = nombre +1.5 WHERE id_membre = ?',
                                    [memberId]
                                );
                                connection.release();
                                collector.stop();
                                return;
                            } else if (randomNumber < 1500) {
                                await btnInteraction.reply({
                                    embeds: [new EmbedBuilder()
                                        .setDescription(`
                                        \`\`\` \`\`\`
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, ton entrainement s'est déroulé à merveille !**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266766028021563465:1304167360495747174> ] — __Effιᥴᥲᥴιtᥱ́__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Vous vous entraînez comme tous les jours, aucune efficacité spéciale n'est ressentie.**
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:sabre:1331383911057723534> ] — __\`+1\`__**
                                        
                                        \`\`\` \`\`\`
                                        `)
                                        .setColor(0xFFFFFF)
                                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332099712739971245/Ability_Rogue_ShadowStrikes.png?ex=67940608&is=6792b488&hm=9bcf697285789454a3cba542772bd43f1de0c4a6dd2ae105ae290ecd20540b81&')
                                        .setImage('https://media1.tenor.com/m/DBZ3PIjgdbAAAAAd/levi.gif')
                                    ],
                                    flags: 0,
                                });
                                const connection = await db.getConnection();
                                await connection.execute(
                                    'UPDATE train_sabre SET nombre = nombre +1 WHERE id_membre = ?',
                                    [memberId]
                                );
                                connection.release();
                                collector.stop();
                                return;
                            }
                        }
                    }
                                                                
            });
        } catch (error) {
            console.error('Erreur avec le cooldown SQL:', error);

            if (!interaction.replied) {
                await interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setDescription(`
\`\`\` \`\`\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, il y a eu un problème lors de l'exécution !**

\`\`\` \`\`\`
                        `)
                        .setColor(0xFFFFFF)
                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1331362224295510068/INV__Fistofthewhitetiger.png')
                        .setImage('https://media1.tenor.com/m/8O90plJTiQYAAAAd/eren-eren-yeager.gif')
                    ],
                    flags: 64,
                });
            }
        }
    },
};
const config = require('../../config.json');
        const { Client, GatewayIntentBits } = require('discord.js');
        const client = new Client({
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
            token: config.token
        });
        client.login(config.token)
setInterval(async () => {
    try {
        const [results] = await db.query(`
            SELECT id_membre 
            FROM cooldown 
            WHERE train <= UNIX_TIMESTAMP() 
            AND reminder_sent = 0
        `);

        for (const { id_membre } of results) {
            const user = await client.users.fetch(id_membre);
            if (user) {
                await user.send({
                    embeds: [{
                        description: `
    \`\`\` \`\`\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Eᥒtrᥲιᥒᥱmᥱᥒt__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${user}, le cooldown de votre entrainement vient de passer à l'instant, vous pouvez vous entrainer à nouveau en utilisant la commande \`/trainˢᵗᵃᵗˢ\`.**
    
    \`\`\` \`\`\`
                        `,
                        color: 0xFFFFFF,
                        thumbnail: {
                            url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1331362224295510068/INV__Fistofthewhitetiger.png',
                        },
                        image: {
                            url: 'https://media1.tenor.com/m/pNosOimg4D0AAAAd/aot-eren-yeager.gif',
                        },
                    }],
                    flags: 0,
                });
                await db.query('UPDATE cooldown SET reminder_sent = 1 WHERE id_membre = ?', [id_membre]);
            }
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi des rappels :', error);
    }
}, 60000);
