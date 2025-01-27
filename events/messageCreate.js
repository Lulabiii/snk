const { Events, AttachmentBuilder, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const db = require('../database'); // Connexion SQL via votre fichier database.js

module.exports = {
    name: Events.MessageCreate,
    async execute(message, interaction) {
        // Ignorer les messages des bots
        if (message.author.bot) return;

        const userId = message.author.id;
        const channel = message.channel;
        const xpGain = 2; // XP gagné par message
        const xpThreshold = 20; // XP nécessaire pour passer au niveau suivant
        try {
            if (message.content.includes("envola")) {
                const [newRow] = await db.execute(
                    'SELECT gaz FROM personnage WHERE id_membre = ?',
                    [userId]
                );
                const montant2 = newRow[0]?.gaz || 0;
                const [Row2] = await db.execute(
                    'SELECT prévenu FROM cooldown WHERE id_membre = ?',
                    [userId]
                );
                const prévenu = Row2[0]?.prévenu || 0;

                if ( montant2 === 0) {
                    if (prévenu === 0) {
                        channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`
                                    \`\`\` \`\`\`
            
                                    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:inventaire:1234628961389121647> ] — __Gᥲz__**
                                    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **<@${userId}>, vous n'avez plus de gaz, vous ne pouvez plus utiliser l'appareil tridimensionnel.**
            
                                    \`\`\` \`\`\`
                                `)
                                    .setColor(0xFFFFFF)
                                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332844079049871390/ability_rogue_smoke.png?ex=6796bb47&is=679569c7&hm=0af3f0bffb75766922e5f6ea7e9732a8ad41e9e2600fa249b436b53b3eb58c75&')
                                    .setImage('https://media1.tenor.com/m/mIk7Nji5JrgAAAAd/snk-levi.gif')
                            ],
                            flags: 64,
                        });
                        await db.execute(
                            'UPDATE cooldown SET prévenu = 1 WHERE id_membre = ?',
                            [userId]
                        );
                        return;
                    }
                    else if (prévenu === 1){
                        return;
                    }
                }
                await db.execute(
                    'UPDATE personnage SET gaz = gaz -5 WHERE id_membre = ?',
                    [userId]
                );
                const [newRo1] = await db.execute(
                    'SELECT gaz FROM personnage WHERE id_membre = ?',
                    [userId]
                );
                const montant3 = newRo1[0]?.gaz || 0;
                if (montant2 < 20) {
                    channel.send({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setDescription(`
                                            \`\`\` \`\`\`
                    
                                            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:inventaire:1234628961389121647> ] — __Gᥲz__**
                                            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **<@${userId}>, vous devriez être prudent, il ne vous reste que [ __\`${montant3}%\`__ ] de gaz.**
                    
                                            \`\`\` \`\`\`
                                        `)
                                            .setColor(0xFFFFFF)
                                            .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332844079049871390/ability_rogue_smoke.png?ex=6796bb47&is=679569c7&hm=0af3f0bffb75766922e5f6ea7e9732a8ad41e9e2600fa249b436b53b3eb58c75&')
                                            .setImage('https://media1.tenor.com/m/mIk7Nji5JrgAAAAd/snk-levi.gif')
                                    ],
                                    flags: 64,
                                });
                }
            } 
        } catch (error) {
            console.error('Erreur lors de la gestion du système de gaz :', error);
        }

        try {
            // Vérifier si l'utilisateur est déjà dans la base de données
            const [results] = await db.query(
                'SELECT xp, level FROM levels WHERE id_membre = ?',
                [userId]
            );

            const user = results[0]; // Extraire le premier élément des résultats

            if (!user) {
                // Si l'utilisateur n'existe pas, l'ajouter avec un niveau et XP initiaux
                await db.query(
                    'INSERT INTO levels (id_membre, xp, level) VALUES (?, ?, ?)',
                    [userId, xpGain, 1]
                );
                console.log(`Nouvel utilisateur ajouté : ${message.author.tag}`);
            } else {
                // Mettre à jour l'XP et vérifier le niveau
                let xp = user.xp || 0; // Assurez-vous que xp a une valeur numérique par défaut
                let level = user.level || 1; // Assurez-vous que level a une valeur numérique par défaut
                xp += xpGain;

                if (xp >= xpThreshold*level) {
                    level += 1; // Augmenter le niveau

                    // Informer l'utilisateur qu'il a monté de niveau
                    message.channel.send(
                        `🎉 Félicitations ${message.author}, tu es maintenant niveau **${level}** !`
                    );
                }

                // Mettre à jour la base de données
                await db.query(
                    'UPDATE levels SET xp = ?, level = ? WHERE id_membre = ?',
                    ['0', level, userId]
                );
            }
        } catch (error) {
            console.error('Erreur lors de la gestion du système d\'XP :', error);
        }
    },
};
