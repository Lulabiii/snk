const { Events, AttachmentBuilder, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
const db = require('../database.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription("Permets à l'utilisateur de regarder les statistiques de lui-même ou d'un autre membre."),

    async execute(interaction) {
        const mentionedMember = interaction.options.getUser('membre');
        const targetMember = mentionedMember || interaction.member;
        const memberId = targetMember.id;
    }
};