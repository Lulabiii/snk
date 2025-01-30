const { Events, AttachmentBuilder, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
const db = require('../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('morale')
        .setDescription("Permets à l'utilisateur d'afficher sa réputation ou celui d'un membre'.")
        .addUserOption(option =>
            option.setName('membre')
                .setDescription("Mentionnez un membre pour voir sa réputation.")
                .setRequired(false)
        ),

    async execute(interaction) {
        const mentionedMember = interaction.options.getUser('membre');
        const targetMember = mentionedMember || interaction.member;
        const memberId = targetMember.id;

        try {
            const [[{ morale } = {}]] = await db.query(
                'SELECT morale FROM personnage WHERE id_membre = ?;', [memberId]
            );

            const userDisplayName = mentionedMember ? mentionedMember.username : interaction.user.username;

            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`
        \`\`\` \`\`\`

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Profιᥣ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, voici votre réputation :**

        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <a:stats:1304167376513929256> ] — __Rᥱ́ρᥙtᥲtιoᥒ__**
        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **[ <:force:1304167448840245289> ] — __Morᥲᥣᥱ__ <:Sans_titre_349_20240518230508Cop:1304168153680707604> \`${morale ?? 0}\`**

        \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1334628569854378045/8XP_VulperaFlute.png?ex=679d3937&is=679be7b7&hm=3f0c41eed4d56c88d0838cfb8fde6d5fb6c3d07055488c3b7bb484e483af2fec&')
                    .setImage('https://media1.tenor.com/m/FgaXbmhn7LAAAAAd/saul-titan-saul-goodman.gif')
                ],
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription("❌ Une erreur est survenue lors de la récupération des données.")
                    .setColor(0xFF0000)
                ],
                flags: 64,
            });
        }
    }
};
