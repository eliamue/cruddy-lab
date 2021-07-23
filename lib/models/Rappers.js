import pool from '../utils/pool';

export default class Rappers {
    id;
    kgroup;
    name;

    constructor(row) {
        this.id = row.id;
        this.kgroup = row.kgroup;
        this.name = row.name;
    }

    static async createRapper(value) {
        const { rows } = await pool.query(
            'INSERT INTO rappers (kgroup, name) VALUES ($1, $2) RETURNING *',
            [value.kgroup, value.name]
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

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM rappers WHERE id=$1 RETURNING *',
            [id]
        );
        return new Rappers(rows[0]);
    }
}
