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

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM visuals WHERE id=$1',
            [id]
        )
        return new Visuals(rows[0]);
    }

    static async update(id, { kgroup, stage_name, real_name }) {
        const existingVisual = await Visuals.getById(id);
        const newKgroup = kgroup ?? existingVisual.kgroup;
        const newStageName = stage_name ?? existingVisual.stage_name;
        const newRealName = real_name ?? existingVisual.real_name;

        const { rows } = await pool.query(
            'UPDATE visuals SET kgroup=$1, stage_name=$2, real_name=$3 WHERE id=$4 RETURNING *',
            [newKgroup, newStageName, newRealName, id]
        );
        return new Visuals(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM visuals WHERE id=$1 RETURNING *',
            [id]
        );
        return new Visuals(rows[0]);
    }
}