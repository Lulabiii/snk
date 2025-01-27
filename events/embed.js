module.exports = {
    name: 'embed_perm',
    once: false,
    async execute(interaction, client) {
        await interaction.reply({
            embeds: [{
                description: `
\`\`\` \`\`\`

> <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1231609048273653801Copie:1304167335879381073> ] — __Vᥲᥣιdᥲtιoᥒ__**
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, vous n'avez pas les permissions nécessaire à l'utilisation de cette commande.**

\`\`\` \`\`\`
            `,
            color: 0xFFFFFF,
            thumbnail: {
                url: 'https://cdn.discordapp.com/attachments/1304166305401671791/1304900535861907527/70_inscription_vantus_rune_nightmare.png?ex=673112d3&is=672fc153&hm=50cc011178be0b2e510baa71fadb4b972a8ddde49ef37cb47cfbee8951bbeb42&',
            },
            image: {
                url: 'https://media1.tenor.com/m/8MHmAiPCfgAAAAAd/snk-eren-yeager-season4.gif',
            },
            }], ephemeral : true,
        });
    },
};
