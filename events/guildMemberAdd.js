const { Events, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
const db = require('../database.js'); // Assurez-vous que ce chemin est correct
const path = require('path');

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member, client) {
    try {
      // Vérification que le nom d'utilisateur est bien défini
      const userId = member.user.id;
      const username = member.user?.username;
      if (!username) {
        console.error("Username is undefined");
        return;
      }

      // Définir l'ID du canal de bienvenue
      const welcomeChannelId = '1304183414429319249';  // Remplacez par votre vrai canal
      const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);
      const welcomeChannelId2 = '1304183437179224176';  // Remplacez par votre vrai canal
      const welcomeChannel2 = member.guild.channels.cache.get(welcomeChannelId2);
      const guildname = member.guild.name; // Récupère le nom du serveur
      if (!welcomeChannel) {
        console.error(`Channel with ID ${welcomeChannelId} not found.`);
        return;
      }

      // Récupérer l'URL de l'avatar de l'utilisateur
      const avatarURL = member.user.displayAvatarURL({ format: 'png' });

      // Configuration du Canvas
      const canvas = createCanvas(1024, 500);
      const ctx = canvas.getContext('2d');

      // Charger l'image de fond
      const background = await loadImage(`C:/Users/noeca/OneDrive/Documents/Perso/DISCORD/BOT/SNK/images/background.png`);
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      // Appliquer un léger flou à l'image de fond
      ctx.globalAlpha = 0.5;  // Ajuste l'opacité pour adoucir l'arrière-plan
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      // Dessiner un rectangle semi-transparent sous le texte pour améliorer la lisibilité
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'; // Rectangle noir semi-transparent
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Ajustez la taille et la position du rectangle sous le texte

      // Charger la police via GlobalFonts
      const fontPath = path.join(__dirname, '../fonts', 'Ditty.ttf');
      GlobalFonts.registerFromPath(fontPath, 'Ditty'); // Enregistrer la police globale

            // Utiliser la police
            ctx.font = '80px "Ditty"'; // Applique la police personnalisée
            ctx.fillStyle = '#ffffff'; // Texte en blanc
            ctx.fillText(`BIENVENUE`, 340, 356);
            ctx.font = '40px "Ditty"'; // Applique la police personnalisée
            ctx.fillStyle = '#ffffff'; // Texte en blanc
            ctx.fillText(`${username}`, 440, 410);
            ctx.font = '40px "Ditty"'; // Applique la police personnalisée
            ctx.fillStyle = '#ffffff'; // Texte en blanc
            ctx.fillText(`Passe un bon moment parmis nous !`, 250, 460);

      // Charger l'avatar de l'utilisateur et le rendre rond
      const avatar = await loadImage(avatarURL);
      const avatarRadius = 100;  // Rayon de l'avatar rond
      const avatarX = (canvas.width / 2) - avatarRadius;  // Centrer l'avatar
      const avatarY = (canvas.height / 3) - avatarRadius;  // Centrer l'avatar

      // Ajouter un bord gris autour de l'avatar
      ctx.save();
      ctx.beginPath();
      ctx.arc(avatarX + avatarRadius, avatarY + avatarRadius, avatarRadius + 2, 0, Math.PI * 2, false); // Bord extérieur
      ctx.lineWidth = 8; // Largeur du bord
      ctx.strokeStyle = '#1d1d1d'; // Couleur du bord (gris)
      ctx.stroke();
      ctx.restore();

      // Découper l'avatar en cercle
      ctx.save();
      ctx.beginPath();
      ctx.arc(avatarX + avatarRadius, avatarY + avatarRadius, avatarRadius, 0, Math.PI * 2, false);
      ctx.clip();
      ctx.drawImage(avatar, avatarX, avatarY, avatarRadius * 2, avatarRadius * 2);
      ctx.restore();

      // Créer un buffer à partir du canvas
      const attach = new AttachmentBuilder(canvas.toBuffer('image/png'), {
        name: 'bienvenue.png',
      });

      // Récupérer le nombre de membres
      const memberCount = member.guild.memberCount;

      // Configurer l'embed
      const embed = new EmbedBuilder()
        .setColor('#fffafa')
        .setDescription(`
\`\`\` \`\`\`

  **╭・๑・〣 Bienvenue ${member.user} !**
  **❘ <:Sans_titre_349_20240518230508Cop:1304168153680707604> __\`${guildname}\`__**
  **╰・๑・〣 Nous sommes désormais __${memberCount}__ !**

  \`⦇・━━━═══════════════════════════════━━━・⦈\`
\#\# **<:Sans_titre_349_20240518230508Cop:1304168153680707604> Que faire ?**

  > <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Renseigne-toi sur les règles à respecter dans le serveur <#1304183417260212354>.**

  > <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Il est conseillé d'aller lire le <#1304183474852331613> afin de bien connaître les spécificités du RP. Une fois cela fait tu peux nous envoyer ta fiche via <#1304183513431674960>.**

  > <:Sans_titre_349_20240519142111Cop:1304168162392019066> **Le plus important est bien évidemment de s'amuser, alors ne sois pas toxique avec les autres !**

  \`\`\` \`\`\`
          `)
        .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1304541180717170790/ACHIEVEMENT_GUILDPERK_EVERYONES_A_HERO_RANK2.png')
        .setImage('attachment://bienvenue.png');

      // Envoyer dans le canal de bienvenue
      await welcomeChannel.send({ embeds: [embed], files: [attach] });
      const embed1 = new EmbedBuilder()
        .setColor('#fffafa')
        .setDescription(`
# <:Sans_titre_349_20240518230508Cop:1304168153680707604> [ <:1266766028021563465:1304167360495747174> ] — __Noᥙvᥱᥲᥙ mᥱmbrᥱ__
<:Sans_titre_349_20240519142111Cop:1304168162392019066> **Bienvenue ${member}.**
          `)
          .setThumbnail('https://cdn.discordapp.com/attachments/1304166305401671791/1304541180717170790/ACHIEVEMENT_GUILDPERK_EVERYONES_A_HERO_RANK2.png')
          await welcomeChannel2.send({ embeds: [embed1] });
          const connection = await db.getConnection();
try {
    const [rows] = await connection.execute(
        `
        SELECT COUNT(*) AS count
        FROM (
            SELECT id_membre FROM entrainement WHERE id_membre = ?
            UNION ALL
            SELECT id_membre FROM experience WHERE id_membre = ?
            UNION ALL
            SELECT id_membre FROM personnage WHERE id_membre = ?
            UNION ALL
            SELECT id_membre FROM warn WHERE id_membre = ?
            UNION ALL
            SELECT id_membre FROM train_agilite WHERE id_membre = ?
            UNION ALL
            SELECT id_membre FROM train_force WHERE id_membre = ?
            UNION ALL
            SELECT id_membre FROM train_resistance WHERE id_membre = ?
            UNION ALL
            SELECT id_membre FROM train_tridi WHERE id_membre = ?
            UNION ALL
            SELECT id_membre FROM train_sabre WHERE id_membre = ?
        ) AS combined
        `,
        [userId, userId, userId, userId, userId, userId, userId, userId, userId]
    );

    if (rows[0].count === 0) {
      const connection = await db.getConnection();
      await connection.execute(
          'INSERT entrainement (id_membre, nom_membre) Values (?, ?)',
          [userId, username]
      );
      connection.release();
      const connection1 = await db.getConnection();
      await connection1.execute(
          'INSERT experience (id_membre, nom_membre) Values (?, ?)',
          [userId, username]
      );
      connection1.release();
      const connection2 = await db.getConnection();
      await connection2.execute(
          'INSERT personnage (id_membre, nom_membre) Values (?, ?)',
          [userId, username]
      );
      connection2.release();
      const connection3 = await db.getConnection();
      await connection3.execute(
          'INSERT warn (id_membre, nom_membre) Values (?, ?)',
          [userId, username]
      );
      connection3.release();
      const connection4 = await db.getConnection();
      await connection4.execute(
          'INSERT train_agilite (id_membre, nom_membre) Values (?, ?)',
          [userId, username]
      );
      connection4.release();
      const connection5 = await db.getConnection();
      await connection5.execute(
          'INSERT train_force (id_membre, nom_membre) Values (?, ?)',
          [userId, username]
      );
      connection5.release();
      const connection6 = await db.getConnection();
      await connection6.execute(
          'INSERT train_resistance (id_membre, nom_membre) Values (?, ?)',
          [userId, username]
      );
      connection6.release();
      const connection7 = await db.getConnection();
      await connection7.execute(
          'INSERT train_tridi (id_membre, nom_membre) Values (?, ?)',
          [userId, username]
      );
      connection7.release();
      const connection8 = await db.getConnection();
      await connection8.execute(
          'INSERT train_sabre (id_membre, nom_membre) Values (?, ?)',
          [userId, username]
      );
      connection8.release();
      const connection9 = await db.getConnection();
      await connection9.execute(
          'INSERT économie (id_membre, nom_membre) Values (?, ?)',
          [userId, username]
      );
      connection9.release();
      const connection10 = await db.getConnection();
      await connection10.execute(
      'INSERT entrainement (id_membre, nom_membre) Values (?, ?)',
          [userId, username]
      );
      connection10.release();
      const connection11 = await db.getConnection();
      await connection11.execute(
      'INSERT roll (id_membre, nom_membre) Values (?, ?)',
          [userId, username]
      );
      connection11.release();
      const connection12 = await db.getConnection();
      await connection12.execute(
      'INSERT cooldown (id_membre, nom_membre) Values (?, ?)',
          [userId, username]
      );
      const connection13 = await db.getConnection();
      await connection13.execute(
      'INSERT nourriture (id_membre, nom_membre) Values (?, ?)',
          [userId, username]
      );
      const connection14 = await db.getConnection();
      await connection14.execute(
      'INSERT poisson (id_membre, nom_membre) Values (?, ?)',
          [userId, username]
      );
      const connection15 = await db.getConnection();
      await connection15.execute(
      'INSERT inventaire (id_membre, nom_membre) Values (?, ?)',
          [userId, username]
      );
      connection12.release();
    }
} finally {
    connection.release();
}
    } catch (error) {
      console.error(error);

      const errorChannel = member.guild.channels.cache.get(1304183414429319249);
      if (errorChannel) {
        await errorChannel.send('Une erreur est survenue lors de l\'envoi du message de bienvenue.');
      }
    }
  }
};