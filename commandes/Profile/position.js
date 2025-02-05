const { Events, AttachmentBuilder, EmbedBuilder, SlashCommandBuilder, MessageFlags } = require('discord.js');
const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
const db = require('../../database.js');
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
            const imagePath = 'https://cdn.discordapp.com/attachments/1304166305401671791/1334637511137296415/carte.png?ex=67a481cb&is=67a3304b&hm=51ec2237300b3f575f43aed95ff5f87e3bc79457e1e02d5167dc24b8f63c3c71&';
            const pinPath = 'https://cdn.discordapp.com/attachments/1304166305401671791/1334876260152905859/epingle.png?ex=67a4b765&is=67a365e5&hm=112e14757dd3263997da5b42dd2e9473af06a8039843685b6690ca9ddc4d44f6&';
            const outputPath = path.join(__dirname, '../images/carte_tempo.png');
            
            // Assurer que le répertoire existe
            const dir = path.dirname(outputPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            const categoryId = interaction.channel.parentId;
            const channelId = interaction.channelId;
            let markerX = 0;
            let markerY = 0;
            if (channelId === '1304183787864985701' || channelId === '1304183789320142962' || channelId === '1304183790700335114' || channelId === '1304183792633774130' || channelId === '1304183795758534677' || channelId === '1304183796890861710' || channelId === '1304183799298523176'){
                await interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setDescription(`\`\`\` \`\`\`
    
                        > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Posιtιoᥒ__**
                        <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, aucune informations sur votre position n'est disponible, faites attention...**
    
                        \`\`\` \`\`\`
                        `)
                        .setColor(0xFFFFFF)
                        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1334628569854378045/8XP_VulperaFlute.png?ex=679d3937&is=679be7b7&hm=3f0c41eed4d56c88d0838cfb8fde6d5fb6c3d07055488c3b7bb484e483af2fec&')
                        .setImage(`https://media1.tenor.com/m/8O90plJTiQYAAAAd/eren-eren-yeager.gif`)
                    ],flags: MessageFlags.Ephemeral
                });
                return;
            }
            if (categoryId === '1304183375535411274') { // Shiganshina
                markerX = 660; // Position X 
                markerY = 1180; // Position Y 
            }
            else if (categoryId === '1304183351166369862') { // Capitale royale
                markerX = 650; // Position X 
                markerY = 620; // Position Y 
            }
            else if (categoryId === '1304183352571596900') { // Bas fonds
                markerX = 650; // Position X 
                markerY = 620; // Position Y 
            }
            else if (categoryId === '1304183353833951295') { // QG BE
                markerX = 995; // Position X 
                markerY = 600; // Position Y 
            }
            else if (categoryId === '1304183355637760142') { // QG BS
                markerX = 650; // Position X 
                markerY = 620; // Position Y 
            }
            else if (categoryId === '1304183355637760142') { // QG GA
                markerX = 673; // Position X 
                markerY = 995; // Position Y 
            }
            else if (channelId == '1304183625679372380') { // Porte
                markerX = 647; // Position X 
                markerY = 812; // Position Y 
            }
            else if (channelId == '1304183627139121194') { // Long du mur
                markerX = 621; // Position X 
                markerY = 823; // Position Y 
            }
            else if (channelId == '1304183628598607934') { // Abords du mur
                markerX = 689; // Position X 
                markerY = 806; // Position Y 
            }
            else if (channelId == '1304183629928337420') { // Haut du mur
                markerX = 667; // Position X 
                markerY = 812; // Position Y 
            }
            else if (categoryId === '1304183360381259919') { // Ehrmich
                markerX = 650; // Position X 
                markerY = 825; // Position Y 
            }
            else if (categoryId === '1304183360381259919') { // Dauper
                markerX = 676; // Position X 
                markerY = 839; // Position Y 
            }
            else if (categoryId === '1304183362826797168') { // Camp d'entrainement
                markerX = 1027; // Position X 
                markerY = 843; // Position Y 
            }
            else if (categoryId === '1304183364793794682') { // Ragako
                markerX = 1050; // Position X 
                markerY = 670; // Position Y 
            }
            else if (categoryId === '1304183366442291287') { // Château d'utgard
                markerX = 1030; // Position X 
                markerY = 580; // Position Y 
            }
            else if (channelId == '1304183706331910204') { // Porte
                markerX = 673; // Position X 
                markerY = 989; // Position Y 
            }
            else if (channelId == '1304183707149533346') { // Long du mur
                markerX = 717; // Position X 
                markerY = 967; // Position Y 
            }
            else if (channelId == '1304183708772991038') { // Abords du mur
                markerX = 626; // Position X 
                markerY = 967; // Position Y 
            }
            else if (channelId == '1304183710219899042') { // Hauts du mur
                markerX = 686; // Position X 
                markerY = 983; // Position Y 
            }
            else if (categoryId === '1304183369646739566') { // Trost
                markerX = 671; // Position X 
                markerY = 992; // Position Y 
            }
            else if (categoryId === '1304183366442291287') { // Base d'opération
                markerX = 649; // Position X 
                markerY = 1074; // Position Y 
            }
            else if (categoryId === '1304183366442291287') { // Foret des titans
                markerX = 601; // Position X 
                markerY = 1230; // Position Y 
            }
            else if (channelId == '1304183757204619344') { // Porte
                markerX = 662; // Position X 
                markerY = 1186; // Position Y 
            }
            else if (channelId == '1304183758316109934') { // Long du mur
                markerX = 654; // Position X 
                markerY = 1189; // Position Y 
            }
            else if (channelId == '1304183759469543495') { // Abords du mur
                markerX = 612; // Position X 
                markerY = 1151; // Position Y 
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
            const pinSize = 140;
            // Dessiner la photo de profil
            const profileSize = 80;
            const profileOffsetY = 23; // Ajuste cette valeur pour remonter l'image
            
            ctx.save();
            ctx.beginPath();
            ctx.arc(groupX, groupY - pinSize / 2 - profileOffsetY, profileSize / 2, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(profile, groupX - profileSize / 2, groupY - pinSize / 2 - profileSize / 2 - profileOffsetY, profileSize, profileSize);
            ctx.restore();
            
            
            // Dessiner l'épingle
            ctx.drawImage(pin, groupX - pinSize / 2, groupY - pinSize, pinSize, pinSize);
            
        
            // Création du buffer final
            const buffer = canvas.toBuffer('image/png');
            fs.writeFileSync(outputPath, buffer);

            const attachment = new AttachmentBuilder(outputPath);

            await interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`\`\`\` \`\`\`

                    > <:Sans_titre_349_20240518230508Cop:1304168153680707604> **[ <:1266038099637571688:1304167358927208570> ] — __Posιtιoᥒ__**
                    <:Sans_titre_349_20240519142111Cop:1304168162392019066> **${interaction.user}, voici votre position !**

                    \`\`\` \`\`\`
                    `)
                    .setColor(0xFFFFFF)
                    .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1334628569854378045/8XP_VulperaFlute.png?ex=679d3937&is=679be7b7&hm=3f0c41eed4d56c88d0838cfb8fde6d5fb6c3d07055488c3b7bb484e483af2fec&')
                    .setImage(`attachment://carte_tempo.png`)
                ], files: [attachment], flags: MessageFlags.Ephemeral
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
