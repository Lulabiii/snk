const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
const db = require('../../database.js');
const { validé } = require('../../Fonction_commandes/validé.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('faim')
        .setDescription("Permets de savoir si vous devez manger ou non."),

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
            const [[{ faim } = {}]] = await db.query(
                'SELECT faim FROM personnage WHERE id_membre = ?', [memberId]);
            const userDisplayName = targetMember ? targetMember.username : interaction.user.username;
            if (faim < 15) {
                await interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setDescription(`
                \`\`\` \`\`\`
    
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Fᥲιm__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous devez manger avant les 3 heures qui suivent.**
    
            \`\`\` \`\`\`
                        `)
                        .setColor(0xFFFFFF)
                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332492222280503306/INV_Misc_Food_132_Meat.png?ex=6798bf56&is=67976dd6&hm=62041b42d2b4e03331820906bdc5c2cc24a175c2cb533b153b4ca2fdb69a0e77&')
                    .setImage('https://media1.tenor.com/m/F1dA-vgRx2QAAAAd/jarrehh-sophie-eating-strength-armin-mikasa.gif')
                    ],
                    flags: 0,
                });
            }
            else if (faim <= 30) {
                await interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setDescription(`
                \`\`\` \`\`\`
    
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Fᥲιm__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, il vous est recommandé de manger.**
    
            \`\`\` \`\`\`
                        `)
                        .setColor(0xFFFFFF)
                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332492222280503306/INV_Misc_Food_132_Meat.png?ex=6798bf56&is=67976dd6&hm=62041b42d2b4e03331820906bdc5c2cc24a175c2cb533b153b4ca2fdb69a0e77&')
                    .setImage('https://media1.tenor.com/m/F1dA-vgRx2QAAAAd/jarrehh-sophie-eating-strength-armin-mikasa.gif')
                    ],
                    flags: 0,
                });
            }
            
            else if (faim > 30) {
                await interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setDescription(`
                \`\`\` \`\`\`
    
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Fᥲιm__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez pas encore besoin de manger.**
    
            \`\`\` \`\`\`
                        `)
                        .setColor(0xFFFFFF)
                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1332492222280503306/INV_Misc_Food_132_Meat.png?ex=6798bf56&is=67976dd6&hm=62041b42d2b4e03331820906bdc5c2cc24a175c2cb533b153b4ca2fdb69a0e77&')
                    .setImage('https://media1.tenor.com/m/F1dA-vgRx2QAAAAd/jarrehh-sophie-eating-strength-armin-mikasa.gif')
                    ],
                    flags: 0,
                });
            }
            
        } catch (error) {
            console.error(error);
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription("❌ Une erreur est survenue lors de la récupération des données.")
                    .setColor(0xFF0000)
                ],
                ephemeral: true,
            });
        }
    }
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
            FROM personnage 
            WHERE faim > 0
        `);

        for (const row of results) {
            const memberId = row.id_membre;
            if ((await validé(memberId)) === false) {
                return;
            }
            await db.query(`
                UPDATE personnage 
                SET faim = faim - 5 
                WHERE id_membre = ?
            `, [memberId]);
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la faim:', error);
    }
}, 3600000);
setInterval(async () => {
    try {
        // Récupérer tous les membres avec faim = 0
        const [results] = await db.query(`
            SELECT id_membre
            FROM personnage
            WHERE faim = 0 and notified = 0
        `);

        if (results.length === 0) {
            console.log("Aucun membre avec faim = 0.");
            return;
        }


        for (const row of results) {
            const memberId = row.id_membre;
            if ((await validé(memberId)) === false) {
                return;
            }

            const guild = client.guilds.cache.get('1303429846579413084');
            if (!guild) {
                console.error('Serveur introuvable.');
                continue;
            }

            const member = await guild.members.fetch(memberId).catch(() => null);
            if (!member) {
                console.error(`Membre avec ID ${memberId} introuvable.`);
                continue;
            }


            await member.send({
                embeds: [{
                    description: `
                \`\`\` \`\`\`
    
            > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:viande:1332436030422388756> ] — __Fᥲιm__**
            <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${member}, il vous faut manger maintenant, vous ne pouvez plus rien faire !**
    
            \`\`\` \`\`\`
                    `,
                    thumbnail: { url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1332492222280503306/INV_Misc_Food_132_Meat.png?ex=6798bf56&is=67976dd6&hm=62041b42d2b4e03331820906bdc5c2cc24a175c2cb533b153b4ca2fdb69a0e77&' },
                    image: { url: 'https://media1.tenor.com/m/F1dA-vgRx2QAAAAd/jarrehh-sophie-eating-strength-armin-mikasa.gif' },
                    color: 0xFFFFFF,
                }],
            }).catch((err) => {
                console.error(`Impossible d'envoyer un message au membre ${member.user.tag}:`, err);
            });
            await db.query(`
                UPDATE personnage 
                SET notified = 1 
                WHERE id_membre = ?
            `, [memberId]);
        }

    } catch (error) {
        console.error('Erreur lors de la vérification de la faim:', error);
    }
}, 60000);

