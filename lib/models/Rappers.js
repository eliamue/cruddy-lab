const pool = require('../utils/pool');

module.exports = class Rappers {
    id;
    group;
    name;

    constructor(row) {
        this.id = row.id;
        this.group = row.group;
        this.name = row.name;
    }

    static async insert(value) {
        const { rows } = await pool.query(
            'INSERT INTO rappers (group, name) VALUES ($1, $2) RETURNING *',
            [value.group, value.name]
        )
        return new Rappers(rows[0]);
    }
}
