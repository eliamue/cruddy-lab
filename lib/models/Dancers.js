import pool from '../utils/pool';

export default class Dancers {
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

    static async createDancer(value) {
        const { rows } = await pool.query(
            'INSERT INTO dancers (kgroup, stage_name, real_name) VALUES ($1, $2, $3) RETURNING *',
            [value.kgroup, value.stage_name, value.real_name]
        )
        return new Dancers(rows[0]);
    }

    static async getAllDancers () {
        const { rows } = await pool.query(
            'SELECT * FROM dancers',
        )
        return rows.map(row => new Dancers(row));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM dancers WHERE id=$1',
            [id]
        )
        return new Dancers(rows[0]);
    }

    static async update(id, { kgroup, stage_name, real_name }) {
        const existingDancer = await Dancers.getById(id);
        const newKgroup = kgroup ?? existingDancer.kgroup;
        const newStageName = stage_name ?? existingDancer.stage_name;
        const newRealName = real_name ?? existingDancer.real_name;

        const { rows } = await pool.query(
            'UPDATE dancers SET kgroup=$1, stage_name=$2, real_name=$3 WHERE id=$4 RETURNING *',
            [newKgroup, newStageName, newRealName, id]
        );
        return new Dancers(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM dancers WHERE id=$1 RETURNING *',
            [id]
        );
        return new Dancers(rows[0]);
    }
}