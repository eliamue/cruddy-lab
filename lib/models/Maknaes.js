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
}