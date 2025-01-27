const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('fs');
const path = require('path');

const commands = [];
const commandesPath = path.join(__dirname, 'commandes');
const commandFiles = fs.readdirSync(commandesPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commandes/${file}`);
  commands.push({
    name: command.name,
    description: command.description,
    options: command.options || []
  });
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Déploiement des commandes (slash) en cours...');

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );

    console.log('Les commandes (slash) ont été déployées avec succès !');
  } catch (error) {
    console.error(error);
  }
})();
