import pool from '../utils/pool';

export default class Dancers {
    id;
    kgroup;
    name;

    constructor(row) {
        this.id = row.id;
        this.kgroup = row.kgroup;
        this.name = row.name;
    }

    static async createDancer(value) {
        const { rows } = await pool.query(
            'INSERT INTO dancers (kgroup, name) VALUES ($1, $2) RETURNING *',
            [value.kgroup, value.name]
        )
        return new Dancers(rows[0]);
    }

    static async getAllDancers () {
        const { rows } = await pool.query(
            'SELECT * FROM dancers',
        )
        return rows.map(row => new Dancers(row));
    }
}