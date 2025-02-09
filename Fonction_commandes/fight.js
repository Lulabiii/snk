const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const db = require('../database.js');

async function fight(memberId) {
        try {
            const [[{ hp } = {}]] = await db.query(
                'SELECT hp FROM personnage WHERE id_membre = ?;', [memberId]
            );
            const [[result]] = await db.query('SELECT hp, taille FROM fight WHERE id_membre = ?;', ['690553892013867099']);
            const { hp: hp_titan, taille: taille_titan } = result;
            const connection = await db.getConnection();
            const [rows] = await connection.execute(
                'SELECT level_force, level_agilite, level_resistance, level_sabre, level_tridi FROM entrainement WHERE id_membre = ?',
                [memberId]
                );
                const {
                    level_force = 0,
                    level_agilite = 0,
                    level_resistance = 0,
                    level_sabre = 0,
                    level_tridi = 0,
                } = rows[0];
                let degats_membre_multiplicateur = Math.floor(hp_titan / 4) + level_force *2;
                let degats_titan_multiplicateur = Math.floor(taille_titan / 2);
                const degats_titan = degats_titan_multiplicateur - level_resistance - (level_agilite/2) - (level_tridi/2)
                const degats_membre = degats_membre_multiplicateur + (level_force*2) + (level_sabre/2);
                await db.query(`UPDATE fight SET hp = hp - ${degats_membre} WHERE id_membre = ?`, ['690553892013867099']);
                await db.query(`UPDATE personnage SET hp = hp - ${degats_titan} WHERE id_membre = ?`, [memberId]);
                await db.query(`UPDATE fight SET degat_titan = degat_titan + ${degats_titan} WHERE id_membre = ?`, ['690553892013867099']);
                await db.query(`UPDATE fight SET degat_membre = degat_membre + ${degats_membre} WHERE id_membre = ?`, ['690553892013867099']);
                return;
        } catch (error) {
            console.error('Erreur dans la fonction fight:', error);
        }
}
module.exports = { fight };