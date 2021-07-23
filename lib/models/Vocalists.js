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

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM vocalists WHERE id=$1',
            [id]
        )
        return new Vocalists(rows[0]);
    }

    static async update(id, { kgroup, name }) {
        const existingVocalist = await Vocalists.getById(id);
        const newKgroup = kgroup ?? existingVocalist.kgroup;
        const newName = name ?? existingVocalist.name;

        const { rows } = await pool.query(
            'UPDATE vocalists SET kgroup=$1, name=$2 WHERE id=$3 RETURNING *',
            [newKgroup, newName, id]
        );
        return new Vocalists(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM vocalists WHERE id=$1 RETURNING *',
            [id]
        );
        return new Vocalists(rows[0]);
    }
}