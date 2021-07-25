import { tsConstructorType } from '@babel/types';
import pool from '../utils/pool';

export default class Leaders {
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

    static async createLeader(value) {
        const { rows } = await pool.query(
            'INSERT INTO leaders (kgroup, stage_name, real_name) VALUES ($1, $2, $3) RETURNING *',
            [value.kgroup, value.stage_name, value.real_name]
        )
        return new Leaders(rows[0]);
    }

    static async getAllLeaders () {
        const { rows } = await pool.query(
            'SELECT * FROM leaders',
        )
        return rows.map(row => new Leaders(row));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM leaders WHERE id=$1',
            [id]
        )
        return new Leaders(rows[0]);
    }

    static async update(id, { kgroup, stage_name, real_name }) {
        const existingLeader = await leaders.getById(id);
        const newKgroup = kgroup ?? existingLeader.kgroup;
        const newStageName = stage_name ?? existingLeader.stage_name;
        const newRealName = real_name ?? existingLeader.real_name;

        const { rows } = await pool.query(
            'UPDATE leaders SET kgroup=$1, stage_name=$2, real_name=$3 WHERE id=$4 RETURNING *',
            [newKgroup, newStageName, newRealName, id]
        );
        return new Leaders(rows[0]);
    }
}