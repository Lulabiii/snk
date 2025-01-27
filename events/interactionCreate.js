const { Events } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    // Si l'interaction n'est pas une commande, on ignore
    if (!interaction.isCommand()) return;

    // Vérifier si la commande existe
    const command = interaction.client.commands.get(interaction.commandName);

    // Si la commande n'existe pas, on ignore
    if (!command) return;

    try {
      // Exécuter la commande
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Il y a eu une erreur lors de l\'exécution de cette commande.', ephemeral: true });
    }
  },
};