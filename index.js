const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');
const fs = require('fs');
const path = require('path');

// Créer une nouvelle instance du client Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
    ],
});

// Créer une collection pour les commandes
client.commands = new Collection();

// Charger les commandes
const commandFiles = fs.readdirSync(path.join(__dirname, 'commandes')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commandes/${file}`);
    client.commands.set(command.data.name, command);
}

// Enregistrer les commandes slash auprès de Discord
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

// Lorsque le bot est prêt
client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
});

// Charger les événements
const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
// Connexion avec le token
client.login(token);
