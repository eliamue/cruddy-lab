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

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM dancers WHERE id=$1',
            [id]
        )
        return new Dancers(rows[0]);
    }

    static async update(id, { kgroup, name }) {
        const existingDancer = await Dancers.getById(id);
        const newKgroup = kgroup ?? existingDancer.kgroup;
        const newName = name ?? existingDancer.name;

        const { rows } = await pool.query(
            'UPDATE dancers SET kgroup=$1, name=$2 WHERE id=$3 RETURNING *',
            [newKgroup, newName, id]
        );
        return new Dancers(rows[0]);
    }
}