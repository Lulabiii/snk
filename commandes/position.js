const { Events, AttachmentBuilder, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
const db = require('../database');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('position')
        .setDescription("Permets à l'utilisateur d'afficher sa position en temps réel sur la carte."),

    async execute(interaction) {
        try {
            const member = interaction.member;
            const imagePath = 'https://cdn.discordapp.com/attachments/1304166305401671791/1334637511137296415/carte.png?ex=679d418b&is=679bf00b&hm=7d495adc78c6f5817c4efdaab9005a1e2ebea10c7212af9ae80a5ec2e759a050&';
            const pinPath = 'https://cdn.discordapp.com/attachments/1304166305401671791/1334637510352965702/epingle.png?ex=679d418a&is=679bf00a&hm=90319e663e7f1f92d294971c7e37a418acb247ecea104baf0070f4013804e27c&';
            const outputPath = path.join(__dirname, '../images/carte_tempo.png');
            
            // Assurer que le répertoire existe
            const dir = path.dirname(outputPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            const categoryId = message.channel.parentId;
            let markerX = 0;
            let markerY = 0;
            if (categoryId === '1303429846579413085') {
                const markerX = 660; // Position X commune
                const markerY = 1180; // Position Y commune
            }

            const avatarURL = member.user.displayAvatarURL({ format: 'png', size: 128 });
            const avatarResponse = await axios.get(avatarURL, { responseType: 'arraybuffer' });
            const avatarBuffer = Buffer.from(avatarResponse.data);
        
            const image = await loadImage(imagePath);
            const pin = await loadImage(pinPath);
            const profile = await loadImage(avatarBuffer);
            const canvas = createCanvas(image.width, image.height);
            const ctx = canvas.getContext('2d');
        
            // Dessiner l'image de base
            ctx.drawImage(image, 0, 0, image.width, image.height);
            
            // Définir la position de l'ensemble (pin + profil) dans un "groupe"
            const groupX = markerX;
            const groupY = markerY;
            
            // Dessiner la photo de profil
            const profileSize = 50;
            ctx.save();
            ctx.beginPath();
            ctx.arc(groupX, groupY - pinSize / 2, profileSize / 2, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(profile, groupX - profileSize / 2, groupY - pinSize / 2 - profileSize / 2, profileSize, profileSize);
            ctx.restore();
            
            // Dessiner l'épingle
            const pinSize = 160;
            ctx.drawImage(pin, groupX - pinSize / 2, groupY - pinSize + 18, pinSize, pinSize);
            
        
            // Création du buffer final
            const buffer = canvas.toBuffer('image/png');
            fs.writeFileSync(outputPath, buffer);

            const attachment = new AttachmentBuilder(outputPath);

            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`\`\`\` \`\`\`

                    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Profιᥣ__**
                    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, voici votre position !**

                    \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1334628569854378045/8XP_VulperaFlute.png?ex=679d3937&is=679be7b7&hm=3f0c41eed4d56c88d0838cfb8fde6d5fb6c3d07055488c3b7bb484e483af2fec&')
                    .setImage(`attachment://carte_tempo.png`)
                ], files: [attachment]
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
