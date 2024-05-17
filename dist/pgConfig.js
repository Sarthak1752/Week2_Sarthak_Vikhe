"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: 'localhost',
    database: 'postgres',
    user: 'postgres',
    password: 'sarthak',
    port: 5432
});
exports.default = pool;
//# sourceMappingURL=pgConfig.js.map