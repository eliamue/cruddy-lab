import pool from '../utils/pool';

export default class Vocalists {
    id;
    kgroup;
    name;

    constructor(row) {
        this.id = row.id;
        this.kgroup = row.kgroup;
        this.name = row.name;
    }

    static async createVocalist(value) {
        const { rows } = await pool.query(
            'INSERT INTO vocalists (kgroup, name) VALUES ($1, $2) RETURNING *',
            [value.kgroup, value.name]
        )
        return new Vocalists(rows[0])
    }

    static async getAllVocalists () {
        const { rows } = await pool.query(
            'SELECT * FROM vocalists',
        )
        return rows.map(row => new Vocalists(row));
    }
};