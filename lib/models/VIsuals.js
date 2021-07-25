import pool from '../utils/pool';

export default class Visuals {
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

    static async createVisual(value) {
        const { rows } = await pool.query(
            'INSERT INTO visuals (kgroup, stage_name, real_name) VALUES ($1, $2, $3) RETURNING *',
            [value.kgroup, value.stage_name, value.real_name]
        )
        return new Visuals(rows[0]);
    }

    static async getAllVisuals () {
        const { rows } = await pool.query(
            'SELECT * FROM visuals',
        )
        return rows.map(row => new Visuals(row));
    }
}