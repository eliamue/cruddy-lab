import pool from '../utils/pool';

export default class Rappers {
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

    static async createRapper(value) {
        const { rows } = await pool.query(
            'INSERT INTO rappers (kgroup, stage_name, real_name) VALUES ($1, $2, $3) RETURNING *',
            [value.kgroup, value.stage_name, value.real_name]
        )
        return new Rappers(rows[0]);
    }

    static async getAllRappers () {
        const { rows } = await pool.query(
            'SELECT * FROM rappers',
        )
        return rows.map(row => new Rappers(row));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM rappers WHERE id=$1', 
            [id]
        )
        return new Rappers(rows[0]);
    }

    static async update(id, { kgroup, stage_name, real_name }) {
        const existingRapper = await Rappers.getById(id);
        const newKgroup = kgroup ?? existingRapper.kgroup;
        const newStageName = stage_name ?? existingRapper.stage_name;
        const newRealName = real_name ?? existingRapper.real_name;

        const { rows } = await pool.query(
            'UPDATE rappers SET kgroup=$1, stage_name=$2, real_name=$3 WHERE id=$4 RETURNING *',
            [newKgroup, newStageName, newRealName, id]
        );
        return new Rappers(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM rappers WHERE id=$1 RETURNING *',
            [id]
        );
        return new Rappers(rows[0]);
    }
}
