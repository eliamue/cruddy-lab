import pool from '../utils/pool';

export default class Vocalists {
    id;
    kgroup;
    name;

    constructor(row) {
        this.id = row.id;
        this.kgroup = row.kgroup;
        this.name;
    }

    static async createVocalist(value) {
        const { rows } = await pool.query(
            'INSERT INTO vocalists (kgroup, name) VALUES ($1, $2) RETURNING *',
            [values.kgroup, values.name]
        )
        return new Vocalists(rows[0])
    }
};