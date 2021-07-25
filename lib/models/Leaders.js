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
}