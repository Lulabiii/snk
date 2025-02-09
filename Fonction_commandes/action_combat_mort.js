const { EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, ComponentType  } = require('discord.js');
const db = require('../database');
const { action_combat } = require('../Fonction_commandes/action_combat.js');
const { fight } = require('../Fonction_commandes/fight.js');
const { fight_sans_embed } = require('../Fonction_commandes/fight_sans_embed.js');

async function action_combat_mort(interaction, memberId) {
    try {
        let termine = false;
        const channel = interaction.channel;

        // Envoi du premier message d'introduction avec le bouton "Continuer"
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('button_continuer')
                .setEmoji('<:Eren_titan:1226241042878300310>')
                .setStyle(ButtonStyle.Secondary),
        );

        await channel.send({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`
                        \`\`\` \`\`\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1232763481934270535:1304167342384611459> ] — __Tιtᥲᥒ__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **<@${memberId}>, le titan devant vous semble hostile, faites attention ! Vous arrivez à bien toucher le titan malgrès tout sa nuque a l'air difficilement atteignable.**

\`\`\` \`\`\`
`)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1337701283309682811/Ability_Argus_DeathFog.png')
                    .setImage('https://media1.tenor.com/m/FgaXbmhn7LAAAAAd/saul-titan-saul-goodman.gif')
            ],
            components: [row]
        });

        // Filtrage pour s'assurer que seul le membre cible peut interagir
        const filter = (btnInteraction) => btnInteraction.user.id === memberId;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 600000 });

        collector.on('collect', async (btnInteraction) => {
            console.log("Collector 1 started.");
            console.log("Button clicked:", btnInteraction.customId);
            await btnInteraction.deferUpdate();
            if (btnInteraction.customId === 'button_continuer') {
                console.log("Button 'button_oui_1' pressed.");
                await fight(memberId);  // Fonction "fight" non fournie dans l'exemple

                // Récupérer les données de HP du joueur et du titan
                const [[{ hp } = {}]] = await db.query('SELECT hp FROM personnage WHERE id_membre = ?;', [memberId]);
                const [[result]] = await db.query('SELECT hp, taille FROM fight WHERE id_membre = ?;', ['690553892013867099']);
                const { hp: hp_titan, taille: taille_titan } = result;

                const connection = await db.getConnection();
                const [rows] = await connection.execute(
                    'SELECT level_force, level_agilite, level_resistance, level_sabre, level_tridi FROM entrainement WHERE id_membre = ?',
                    [memberId]
                );

                const { level_force = 0, level_agilite = 0, level_resistance = 0, level_sabre = 0, level_tridi = 0 } = rows[0];

                let degats_membre_multiplicateur = Math.floor(hp_titan / 10);
                let degats_titan_multiplicateur = Math.floor(taille_titan / 2);
                const degats_titan = degats_titan_multiplicateur - level_resistance - (level_agilite / 2) - (level_tridi / 2);
                const degats_membre = degats_membre_multiplicateur + level_force + (level_sabre / 2);

                termine = true;  // Définir termine à true une fois que l'attaque est calculée

                // Envoi de l'embed avec les résultats du combat
                await channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`
                                \`\`\` \`\`\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1232763481934270535:1304167342384611459> ] — __Tιtᥲᥒ__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **<@${memberId}>, vous arrivez à bien toucher le titan cependant le combat n'est pas terminé, faites attention !**

<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ __\`Dégâts effectués\`__ ] <:Sans_titre_349_20240518230508Cop:1304168153680707604> __${degats_membre}__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ __\`Dégâts subis\`__ ] <:Sans_titre_349_20240518230508Cop:1304168153680707604> __${degats_titan}__**

\`\`\` \`\`\`
                            `)
                            .setColor(0xFFFFFF)
                            .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1337701283309682811/Ability_Argus_DeathFog.png')
                            .setImage('https://media1.tenor.com/m/VDuiGk6CcZgAAAAd/titan.gif')
                    ],
                });

                if (hp <= 0) {
                    await channel.send({ content: 'Vous êtes mort !' });
                    await db.query(`UPDATE fight SET lancé = 0 WHERE id_membre = ?`, ['690553892013867099']);
                    return;
                } else if (hp_titan <= 0) {
                    await channel.send({ content: 'Le titan est vaincu !' });
                    await db.query(`UPDATE fight SET lancé = 0 WHERE id_membre = ?`, ['690553892013867099']);
                    return;
                }
                collector.on('end', (collected, reason) => {
                    console.log("Collector 1 ended. Reason:", reason);
                    if (reason === 'time') {
                        console.log("Collector 1 ended due to timeout.");
                    }
                });
                // Demander si le joueur veut continuer le combat (1er duplique)
                const row2 = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('button_oui_1')
                        .setLabel('✅')
                        .setStyle(ButtonStyle.Success),
                );

                const sentMessage2 = await channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`
                                \`\`\` \`\`\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1232763481934270535:1304167342384611459> ] — __Tιtᥲᥒ__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **<@${memberId}>, continuer le combat ?**

\`\`\` \`\`\`
                            `)
                            .setColor(0xFFFFFF)
                            .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1337701283309682811/Ability_Argus_DeathFog.png')
                            .setImage('https://c.tenor.com/DQD4la1ZC6wAAAAC/tenor.gif')
                    ],
                    components: [row2]
                });

                const filter2 = (btnInteraction2) => btnInteraction2.user.id === memberId;
                const collector2 = btnInteraction.channel.createMessageComponentCollector({ filter2, time: 600000 });

                collector2.on('collect', async (btnInteraction2) => {
                    console.log("Collector 2 started.");
                    console.log("Button clicked:", btnInteraction2.customId);
                    if (btnInteraction2.customId === 'button_oui_1') {
                        await btnInteraction2.deferUpdate();
                        await fight_sans_embed(btnInteraction2, memberId);
                        const channel = btnInteraction2.channel;
                        let [[{ hp } = {}]] = await db.query('SELECT hp FROM personnage WHERE id_membre = ?;', [memberId]);
                        const [[result]] = await db.query('SELECT hp FROM fight WHERE id_membre = ?;', ['690553892013867099']);
                        const hp_titan = result.hp;

                        if (hp <= 0) {
                            await channel.send({ content: 'Vous êtes mort !' });
                            await db.query(`UPDATE fight SET lancé = 0 WHERE id_membre = ?`, ['690553892013867099']);
                            return;
                        } else if (hp_titan <= 0) {
                            await channel.send({ content: 'Le titan est vaincu !' });
                            await db.query(`UPDATE fight SET lancé = 0 WHERE id_membre = ?`, ['690553892013867099']);
                            return;
                        }
                        collector2.on('end', (collected, reason) => {
                            console.log("Collector 2 ended. Reason:", reason);
                            if (reason === 'time') {
                                console.log("Collector 2 ended due to timeout.");
                            }
                        });
                        // Imbrication du 2e collector (pour le 2e bouton)
                        const row3 = new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                                .setCustomId('button_oui_2')
                                .setLabel('✅')
                                .setStyle(ButtonStyle.Success),
                        );

                        const sentMessage3 = await channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`
                                        \`\`\` \`\`\`

    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1232763481934270535:1304167342384611459> ] — __Tιtᥲᥒ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **<@${memberId}>, continuer le combat ?**

    \`\`\` \`\`\`
                                    `)
                                    .setColor(0xFFFFFF)
                                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1337701283309682811/Ability_Argus_DeathFog.png')
                                    .setImage('https://c.tenor.com/DQD4la1ZC6wAAAAC/tenor.gif')
                            ],
                            components: [row3]
                        });

                        const filter3 = (btnInteraction3) => btnInteraction3.user.id === memberId;
                        const collector3 = btnInteraction2.channel.createMessageComponentCollector({ filter3, time: 600000 });

                        collector3.on('collect', async (btnInteraction3) => {
                            console.log("Collector 3 started.");
                            console.log("Button clicked:", btnInteraction3.customId);
                            if (btnInteraction3.customId === 'button_oui_2') {
                                await btnInteraction3.deferUpdate();
                                await fight_sans_embed(btnInteraction3, memberId);
                                const channel = btnInteraction3.channel;
                                let [[{ hp } = {}]] = await db.query('SELECT hp FROM personnage WHERE id_membre = ?;', [memberId]);
                                const [[result]] = await db.query('SELECT hp FROM fight WHERE id_membre = ?;', ['690553892013867099']);
                                const hp_titan = result.hp;

                                if (hp <= 0) {
                                    await channel.send({ content: 'Vous êtes mort !' });
                                    await db.query(`UPDATE fight SET lancé = 0 WHERE id_membre = ?`, ['690553892013867099']);
                                    return;
                                } else if (hp_titan <= 0) {
                                    await channel.send({ content: 'Le titan est vaincu !' });
                                    await db.query(`UPDATE fight SET lancé = 0 WHERE id_membre = ?`, ['690553892013867099']);
                                    return;
                                }
                                collector3.on('end', (collected, reason) => {
                                    console.log("Collector 3 ended. Reason:", reason);
                                    if (reason === 'time') {
                                        console.log("Collector 3 ended due to timeout.");
                                    }
                                });
                                const row4 = new ActionRowBuilder().addComponents(
                                    new ButtonBuilder()
                                        .setCustomId('button_oui_4')
                                        .setLabel('✅')
                                        .setStyle(ButtonStyle.Success),
                                );
                                
                                const sentMessage4 = await channel.send({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setDescription(`
                                                \`\`\` \`\`\`
                                
                                > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1232763481934270535:1304167342384611459> ] — __Tιtᥲᥒ__**
                                <:Sans_titre_349_20240519142111Cop:1304168162392019066> **<@${memberId}>, continuer le combat ?**
                                
                                \`\`\` \`\`\`
                                            `)
                                            .setColor(0xFFFFFF)
                                            .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1337701283309682811/Ability_Argus_DeathFog.png')
                                            .setImage('https://c.tenor.com/DQD4la1ZC6wAAAAC/tenor.gif')
                                    ],
                                    components: [row4]
                                });
                                
                                const filter4 = (btnInteraction4) => btnInteraction4.user.id === memberId;
                                const collector4 = btnInteraction3.channel.createMessageComponentCollector({ filter4, time: 600000 });
                                
                                collector4.on('collect', async (btnInteraction4) => {
                                    console.log("Collector 4 started.");
                                    console.log("Button clicked:", btnInteraction4.customId);
                                    if (btnInteraction4.customId === 'button_oui_4') {
                                        await btnInteraction4.deferUpdate();
                                        await fight_sans_embed(btnInteraction4, memberId);
                                        const channel = btnInteraction4.channel;
                                        let [[{ hp } = {}]] = await db.query('SELECT hp FROM personnage WHERE id_membre = ?;', [memberId]);
                                        const [[result]] = await db.query('SELECT hp FROM fight WHERE id_membre = ?;', ['690553892013867099']);
                                        const hp_titan = result.hp;
                                
                                        if (hp <= 0) {
                                            await channel.send({ content: 'Vous êtes mort !' });
                                            await db.query(`UPDATE fight SET lancé = 0 WHERE id_membre = ?`, ['690553892013867099']);
                                            return;
                                        } else if (hp_titan <= 0) {
                                            await channel.send({ content: 'Le titan est vaincu !' });
                                            await db.query(`UPDATE fight SET lancé = 0 WHERE id_membre = ?`, ['690553892013867099']);
                                            return;
                                        }
                                        collector4.on('end', (collected, reason) => {
                                            console.log("Collector 4 ended. Reason:", reason);
                                            if (reason === 'time') {
                                                console.log("Collector 4 ended due to timeout.");
                                            }
                                        });
                                        const row5 = new ActionRowBuilder().addComponents(
                                            new ButtonBuilder()
                                                .setCustomId('button_oui_5')
                                                .setLabel('✅')
                                                .setStyle(ButtonStyle.Success),
                                        );
                                        
                                        const sentMessage5 = await channel.send({
                                            embeds: [
                                                new EmbedBuilder()
                                                    .setDescription(`
                                                        \`\`\` \`\`\`
                                        
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1232763481934270535:1304167342384611459> ] — __Tιtᥲᥒ__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **<@${memberId}>, continuer le combat ?**
                                        
                                            \`\`\` \`\`\`
                                                    `)
                                                    .setColor(0xFFFFFF)
                                                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1337701283309682811/Ability_Argus_DeathFog.png')
                                                    .setImage('https://c.tenor.com/DQD4la1ZC6wAAAAC/tenor.gif')
                                            ],
                                            components: [row5]
                                        });
                                        
                                        const filter5 = (btnInteraction5) => btnInteraction5.user.id === memberId;
                                        const collector5 = btnInteraction4.channel.createMessageComponentCollector({ filter5, time: 600000 });
                                        
                                        collector5.on('collect', async (btnInteraction5) => {
                                            console.log("Collector 5 started.");
                                            console.log("Button clicked:", btnInteraction5.customId);
                                            if (btnInteraction5.customId === 'button_oui_5') {
                                                await btnInteraction5.deferUpdate();
                                                await fight_sans_embed(btnInteraction5, memberId);
                                                const channel = btnInteraction5.channel;
                                                let [[{ hp } = {}]] = await db.query('SELECT hp FROM personnage WHERE id_membre = ?;', [memberId]);
                                                const [[result]] = await db.query('SELECT hp FROM fight WHERE id_membre = ?;', ['690553892013867099']);
                                                const hp_titan = result.hp;
                                        
                                                if (hp <= 0) {
                                                    await channel.send({ content: 'Vous êtes mort !' });
                                                    await db.query(`UPDATE fight SET lancé = 0 WHERE id_membre = ?`, ['690553892013867099']);
                                                    return;
                                                } else if (hp_titan <= 0) {
                                                    await channel.send({ content: 'Le titan est vaincu !' });
                                                    await db.query(`UPDATE fight SET lancé = 0 WHERE id_membre = ?`, ['690553892013867099']);
                                                    return;
                                                }
                                                collector5.on('end', (collected, reason) => {
                                                    console.log("Collector 5 ended. Reason:", reason);
                                                    if (reason === 'time') {
                                                        console.log("Collector 5 ended due to timeout.");
                                                    }
                                                });

                                                const row6 = new ActionRowBuilder().addComponents(
                                                    new ButtonBuilder()
                                                        .setCustomId('button_oui_6')
                                                        .setLabel('✅')
                                                        .setStyle(ButtonStyle.Success),
                                                );
                                                console.log('Boutons 6 créés');
                                                const sentMessage6 = await channel.send({
                                                    embeds: [
                                                        new EmbedBuilder()
                                                            .setDescription(`
                                                                \`\`\` \`\`\`
                                                
                                                    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1232763481934270535:1304167342384611459> ] — __Tιtᥲᥒ__**
                                                    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **<@${memberId}>, continuer le combat ?**
                                                
                                                    \`\`\` \`\`\`
                                                            `)
                                                            .setColor(0xFFFFFF)
                                                            .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1337701283309682811/Ability_Argus_DeathFog.png')
                                                            .setImage('https://c.tenor.com/DQD4la1ZC6wAAAAC/tenor.gif')
                                                    ],
                                                    components: [row6]
                                                });
                                                console.log('Embed 6 envoyé');
                                                const filter6 = (btnInteraction6) => btnInteraction6.user.id === memberId;
                                                const collector6 = btnInteraction5.channel.createMessageComponentCollector({ filter6, time: 600000 });
                                                
                                                collector6.on('collect', async (btnInteraction6) => {
                                                    console.log("Collector 6 started.");
                                                    console.log("Button clicked:", btnInteraction6.customId);
                                                    if (btnInteraction6.customId === 'button_oui_6') {
                                                        try{ 
                                                        await btnInteraction6.deferUpdate();
                                                        await fight_sans_embed(btnInteraction6, memberId);
                                                        const channel = btnInteraction6.channel;
                                                        let [[{ hp } = {}]] = await db.query('SELECT hp FROM personnage WHERE id_membre = ?;', [memberId]);
                                                        const [[result]] = await db.query('SELECT hp FROM fight WHERE id_membre = ?;', ['690553892013867099']);
                                                        const hp_titan = result.hp;
                                                
                                                        if (hp <= 0) {
                                                            await channel.send({ content: 'Vous êtes mort !' });
                                                            await db.query(`UPDATE fight SET lancé = 0 WHERE id_membre = ?`, ['690553892013867099']);
                                                            return;
                                                        } else if (hp_titan <= 0) {
                                                            await channel.send({ content: 'Le titan est vaincu !' });
                                                            await db.query(`UPDATE fight SET lancé = 0 WHERE id_membre = ?`, ['690553892013867099']);
                                                            return;
                                                        }
                                                        collector6.on('end', (collected, reason) => {
                                                            console.log("Collector 6 ended. Reason:", reason);
                                                            if (reason === 'time') {
                                                                console.log("Collector 6 ended due to timeout.");
                                                            }
                                                        });
                                                        const row7 = new ActionRowBuilder().addComponents(
                                                            new ButtonBuilder()
                                                                .setCustomId('button_oui_7')
                                                                .setLabel('✅')
                                                                .setStyle(ButtonStyle.Success),
                                                        );
                                                        
                                                        const sentMessage7 = await channel.send({
                                                            embeds: [
                                                                new EmbedBuilder()
                                                                    .setDescription(`
                                                                        \`\`\` \`\`\`
                                                        
                                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1232763481934270535:1304167342384611459> ] — __Tιtᥲᥒ__**
                                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **<@${memberId}>, continuer le combat ?**
                                                        
                                                            \`\`\` \`\`\`
                                                                    `)
                                                                    .setColor(0xFFFFFF)
                                                                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1337701283309682811/Ability_Argus_DeathFog.png')
                                                                    .setImage('https://c.tenor.com/DQD4la1ZC6wAAAAC/tenor.gif')
                                                            ],
                                                            components: [row7]
                                                        });
                                                        
                                                        const filter7 = (btnInteraction7) => btnInteraction7.user.id === memberId;
                                                        const collector7 = btnInteraction.channel.createMessageComponentCollector({ filter7, time: 600000 });
                                                        
                                                        collector7.on('collect', async (btnInteraction7) => {
                                                            console.log("Collector 7 started.");
                                                            console.log("Button clicked:", btnInteraction7.customId);
                                                            if (btnInteraction7.customId === 'button_oui_7') {
                                                                await btnInteraction7.deferUpdate();
                                                                await fight_sans_embed(btnInteraction7, memberId);
                                                                const channel = btnInteraction7.channel;
                                                                let [[{ hp } = {}]] = await db.query('SELECT hp FROM personnage WHERE id_membre = ?;', [memberId]);
                                                                const [[result]] = await db.query('SELECT hp FROM fight WHERE id_membre = ?;', ['690553892013867099']);
                                                                const hp_titan = result.hp;
                                                        
                                                                if (hp <= 0) {
                                                                    await channel.send({ content: 'Vous êtes mort !' });
                                                                    await db.query(`UPDATE fight SET lancé = 0 WHERE id_membre = ?`, ['690553892013867099']);
                                                                    return;
                                                                } else if (hp_titan <= 0) {
                                                                    await channel.send({ content: 'Le titan est vaincu !' });
                                                                    await db.query(`UPDATE fight SET lancé = 0 WHERE id_membre = ?`, ['690553892013867099']);
                                                                    return;
                                                                }
                                                                
                                                                collector7.on('end', (collected, reason) => {
                                                                    console.log("Collector 7 ended. Reason:", reason);
                                                                    if (reason === 'time') {
                                                                        console.log("Collector 7 ended due to timeout.");
                                                                    }
                                                                });                                                      
                                                                const row8 = new ActionRowBuilder().addComponents(
                                                                    new ButtonBuilder()
                                                                        .setCustomId('button_oui_8')
                                                                        .setLabel('✅')
                                                                        .setStyle(ButtonStyle.Success),
                                                                );
                                                                
                                                                const sentMessage8 = await channel.send({
                                                                    embeds: [
                                                                        new EmbedBuilder()
                                                                            .setDescription(`
                                                                                \`\`\` \`\`\`
                                                                
                                                                    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1232763481934270535:1304167342384611459> ] — __Tιtᥲᥒ__**
                                                                    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **<@${memberId}>, continuer le combat ?**
                                                                
                                                                    \`\`\` \`\`\`
                                                                            `)
                                                                            .setColor(0xFFFFFF)
                                                                            .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1337701283309682811/Ability_Argus_DeathFog.png')
                                                                            .setImage('https://c.tenor.com/DQD4la1ZC6wAAAAC/tenor.gif')
                                                                    ],
                                                                    components: [row8]
                                                                });
                                                                
                                                                const filter8 = (btnInteraction8) => btnInteraction8.user.id === memberId;
                                                                const collector8 = btnInteraction.channel.createMessageComponentCollector({ filter8, time: 600000 });
                                                                
                                                                collector8.on('collect', async (btnInteraction8) => {
                                                                    console.log("Collector 8 started.");
                                                                    console.log("Button clicked:", btnInteraction8.customId);
                                                                    if (btnInteraction8.customId === 'button_oui_8') {
                                                                        await btnInteraction8.deferUpdate();
                                                                        await fight_sans_embed(btnInteraction8, memberId);
                                                                        const channel = btnInteraction8.channel;
                                                                        let [[{ hp } = {}]] = await db.query('SELECT hp FROM personnage WHERE id_membre = ?;', [memberId]);
                                                                        const [[result]] = await db.query('SELECT hp FROM fight WHERE id_membre = ?;', ['690553892013867099']);
                                                                        const hp_titan = result.hp;
                                                                
                                                                        if (hp <= 0) {
                                                                            await channel.send({ content: 'Vous êtes mort !' });
                                                                            await db.query(`UPDATE fight SET lancé = 0 WHERE id_membre = ?`, ['690553892013867099']);
                                                                            return;
                                                                        } else if (hp_titan <= 0) {
                                                                            await channel.send({ content: 'Le titan est vaincu !' });
                                                                            await db.query(`UPDATE fight SET lancé = 0 WHERE id_membre = ?`, ['690553892013867099']);
                                                                            return;
                                                                        }
                                                                        collector8.on('end', (collected, reason) => {
                                                                            console.log("Collector 8 ended. Reason:", reason);
                                                                            if (reason === 'time') {
                                                                                console.log("Collector 8 ended due to timeout.");
                                                                            }
                                                                        });
                                                                        const row9 = new ActionRowBuilder().addComponents(
                                                                            new ButtonBuilder()
                                                                                .setCustomId('button_oui_9')
                                                                                .setLabel('✅')
                                                                                .setStyle(ButtonStyle.Success),
                                                                        );
                                                                        
                                                                        const sentMessage9 = await channel.send({
                                                                            embeds: [
                                                                                new EmbedBuilder()
                                                                                    .setDescription(`
                                                                                        \`\`\` \`\`\`
                                                                        
                                                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1232763481934270535:1304167342384611459> ] — __Tιtᥲᥒ__**
                                                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **<@${memberId}>, continuer le combat ?**
                                                                        
                                                                            \`\`\` \`\`\`
                                                                                    `)
                                                                                    .setColor(0xFFFFFF)
                                                                                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1337701283309682811/Ability_Argus_DeathFog.png')
                                                                                    .setImage('https://c.tenor.com/DQD4la1ZC6wAAAAC/tenor.gif')
                                                                            ],
                                                                            components: [row9]
                                                                        });
                                                                        
                                                                        const filter9 = (btnInteraction9) => btnInteraction9.user.id === memberId;
                                                                        const collector9 = btnInteraction.channel.createMessageComponentCollector({ filter9, time: 600000 });
                                                                        
                                                                        collector9.on('collect', async (btnInteraction9) => {
                                                                            console.log("Collector 9 started.");
                                                                            console.log("Button clicked:", btnInteraction9.customId);
                                                                            if (btnInteraction9.customId === 'button_oui_9') {
                                                                                await btnInteraction9.deferUpdate();
                                                                                await fight_sans_embed(btnInteraction9, memberId);
                                                                                const channel = btnInteraction9.channel;
                                                                                let [[{ hp } = {}]] = await db.query('SELECT hp FROM personnage WHERE id_membre = ?;', [memberId]);
                                                                                const [[result]] = await db.query('SELECT hp FROM fight WHERE id_membre = ?;', ['690553892013867099']);
                                                                                const hp_titan = result.hp;
                                                                        
                                                                                if (hp <= 0) {
                                                                                    await channel.send({ content: 'Vous êtes mort !' });
                                                                                    await db.query(`UPDATE fight SET lancé = 0 WHERE id_membre = ?`, ['690553892013867099']);
                                                                                    return;
                                                                                } else if (hp_titan <= 0) {
                                                                                    await channel.send({ content: 'Le titan est vaincu !' });
                                                                                    await db.query(`UPDATE fight SET lancé = 0 WHERE id_membre = ?`, ['690553892013867099']);
                                                                                    return;
                                                                                }
                                                                                collector9.on('end', (collected, reason) => {
                                                                                    console.log("Collector 9 ended. Reason:", reason);
                                                                                    if (reason === 'time') {
                                                                                        console.log("Collector 9 ended due to timeout.");
                                                                                    }
                                                                                });
                                                                                const row10 = new ActionRowBuilder().addComponents(
                                                                                    new ButtonBuilder()
                                                                                        .setCustomId('button_oui_10')
                                                                                        .setLabel('✅')
                                                                                        .setStyle(ButtonStyle.Success),
                                                                                );
                                                                                
                                                                                const sentMessage10 = await channel.send({
                                                                                    embeds: [
                                                                                        new EmbedBuilder()
                                                                                            .setDescription(`
                                                                                                \`\`\` \`\`\`
                                                                                
                                                                                    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1232763481934270535:1304167342384611459> ] — __Tιtᥲᥒ__**
                                                                                    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **<@${memberId}>, continuer le combat ?**
                                                                                
                                                                                    \`\`\` \`\`\`
                                                                                            `)
                                                                                            .setColor(0xFFFFFF)
                                                                                            .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1337701283309682811/Ability_Argus_DeathFog.png')
                                                                                            .setImage('https://c.tenor.com/DQD4la1ZC6wAAAAC/tenor.gif')
                                                                                    ],
                                                                                    components: [row10]
                                                                                });
                                                                                
                                                                                const filter10 = (btnInteraction10) => btnInteraction10.user.id === memberId;
                                                                                const collector10 = btnInteraction.channel.createMessageComponentCollector({ filter10, time: 600000 });
                                                                                
                                                                                collector10.on('collect', async (btnInteraction10) => {
                                                                                    console.log("Collector 10 started.");
                                                                                    console.log("Button clicked:", btnInteraction10.customId);
                                                                                    if (btnInteraction10.customId === 'button_oui_10') {
                                                                                        await btnInteraction10.deferUpdate();
                                                                                        await fight_sans_embed(btnInteraction10, memberId);
                                                                                        const channel = btnInteraction10.channel;
                                                                                        let [[{ hp } = {}]] = await db.query('SELECT hp FROM personnage WHERE id_membre = ?;', [memberId]);
                                                                                        const [[result]] = await db.query('SELECT hp FROM fight WHERE id_membre = ?;', ['690553892013867099']);
                                                                                        const hp_titan = result.hp;
                                                                                
                                                                                        if (hp <= 0) {
                                                                                            await channel.send({ content: 'Vous êtes mort !' });
                                                                                            await db.query(`UPDATE fight SET lancé = 0 WHERE id_membre = ?`, ['690553892013867099']);
                                                                                            return;
                                                                                        } else if (hp_titan <= 0) {
                                                                                            await channel.send({ content: 'Le titan est vaincu !' });
                                                                                            await db.query(`UPDATE fight SET lancé = 0 WHERE id_membre = ?`, ['690553892013867099']);
                                                                                            return;
                                                                                        }
                                                                                        collector10.on('end', (collected, reason) => {
                                                                                            console.log("Collector 10 ended. Reason:", reason);
                                                                                            if (reason === 'time') {
                                                                                                console.log("Collector 10 ended due to timeout.");
                                                                                            }
                                                                                            collector10.stop();
                                                                                        });

                                                                                    }
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }catch (error) {
                                                        console.error('Erreur lors de l\'utilisation de la commande stats :', error);
                                                    }
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });                                
                            }
                        });
                    }
                });
            }
        });
    } catch (error) {
        console.error('Erreur lors de l\'utilisation de la commande stats :', error);
    }
}

module.exports = { action_combat_mort };
