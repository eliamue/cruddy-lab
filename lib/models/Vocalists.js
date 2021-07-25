import pool from '../utils/pool';

export default class Vocalists {
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

    static async createVocalist(value) {
        const { rows } = await pool.query(
            'INSERT INTO vocalists (kgroup, stage_name, real_name) VALUES ($1, $2, $3) RETURNING *',
            [value.kgroup, value.stage_name, value.real_name]
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

    static async update(id, { kgroup, stage_name, real_name }) {
        const existingVocalist = await Vocalists.getById(id);
        const newKgroup = kgroup ?? existingVocalist.kgroup;
        const newStageName = stage_name ?? existingVocalist.stage_name;
        const newRealName = real_name ?? existingVocalist.real_name;

        const { rows } = await pool.query(
            'UPDATE vocalists SET kgroup=$1, stage_name=$2, real_name=$3 WHERE id=$4 RETURNING *',
            [newKgroup, newStageName, newRealName, id]
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