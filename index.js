const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');
const fs = require('fs');
const path = require('path');
const db = require('./database');
const { Events, AttachmentBuilder, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
    ],
});

client.commands = new Collection();

function readCommandsFromDir(dir) {
    const files = fs.readdirSync(dir);
    let commandFiles = [];
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            commandFiles = commandFiles.concat(readCommandsFromDir(filePath));
        } else if (file.endsWith('.js')) {
            commandFiles.push(filePath);
        }
    }
    return commandFiles;
}

const commandFiles = readCommandsFromDir(path.join(__dirname, 'commandes'));

for (const file of commandFiles) {
    const command = require(file);
    client.commands.set(command.data.name, command);
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Démarrage de l\'enregistrement des commandes slash...');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: client.commands.map(command => command.data.toJSON()) },
        );

        console.log('Commandes slash enregistrées avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement des commandes slash:', error);
    }
})();

setInterval(async () => {
    try {
        const [results] = await db.query(`
            SELECT id_membre 
            FROM économie 
            WHERE argent > 10000
        `);

        for (const { id_membre } of results) {
            const user = await client.users.fetch(id_membre);
            if (user) {
                await db.query('UPDATE économie SET argent = argent -10000 WHERE id_membre = ?', [id_membre]);
                const [newRow] = await db.execute(
                    'SELECT argent FROM économie WHERE id_membre = ?',
                    [id_membre]
                );
                const montant2 = newRow[0]?.argent || 0;
                await user.send({
                    embeds: [{
                        description: `
    \`\`\` \`\`\`
    
    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:gold:1304167372999098489> ] — __Tᥲxᥱ__**
    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${user}, La taxe a bien été payée, il vous reste désormais [ __\`${montant2}¥\`__ ].**
    
    \`\`\` \`\`\`
                        `,
                        color: 0xFFFFFF,
                        thumbnail: {
                            url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1333077594857275423/INV_10_Fishing_DragonIslesCoins_Gold.png?ex=67a4c3c1&is=67a37241&hm=f31d20ef2a82eb708986ae59c9ceba6ae97edea08283b430028fdc71af92c78d&',
                        },
                        image: {
                            url: 'https://www.buzzfrance.fr/wp-content/uploads/2021/06/eren-snk.gif',
                        },
                    }],
                    flags: 0,
                });
            }
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi des rappels :', error);
    }
}, 604800000);

client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
});

const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(token);
