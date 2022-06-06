const sql = require("mssql/msnodesqlv8");
const dotenv = require("dotenv");
dotenv.config();
const config = {
    // server: process.env.SERVER_SQL,
    server: "DESKTOP-G72MV4B",
    connectionString: 'Driver={SQL Server Native Client 11.0};Server={DESKTOP-G72MV4B};Database={DACNPM};Trusted_Connection={yes}',
};
const pool = new sql.ConnectionPool(config);
const poolConnection = pool.connect();

module.exports = { sql, pool, poolConnection };