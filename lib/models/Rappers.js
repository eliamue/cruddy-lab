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
}
