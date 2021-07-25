import pool from '../utils/pool';

export default class Maknaes {
    id;
    kgroup;
    stage_name;
    real_name;

    constructor(row) {
        this.id = row.id;
        this.kgroup = row.kgroup;
        this.stage_name = row.stage_name;
        this.real_name = row.real_name;
    }

    static async createMaknae(value) {
        const { rows } = await pool.query(
            'INSERT INTO maknaes (kgroup, stage_name, real_name) VALUES ($1, $2, $3) RETURNING *',
            [value.kgroup, value.stage_name, value.real_name]
        )
        return new Maknaes(rows[0]);
    }

    static async getAllMaknaes () {
        const { rows } = await pool.query(
            'SELECT * FROM maknaes',
        )
        return rows.map(row => new Maknaes(row));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM maknaes WHERE id=$1',
            [id]
        )
        return new Maknaes(rows[0]);
    }

    static async update(id, { kgroup, stage_name, real_name }) {
        const existingMaknae = await Maknaes.getById(id);
        const newKgroup = kgroup ?? existingMaknae.kgroup;
        const newStageName = stage_name ?? existingMaknae.stage_name;
        const newRealName = real_name ?? existingMaknae.real_name;

        const { rows } = await pool.query(
            'UPDATE maknaes SET kgroup=$1, stage_name=$2, real_name=$3 WHERE id=$4 RETURNING *',
            [newKgroup, newStageName, newRealName, id]
        );
        return new Maknaes(rows[0]);
    }
}