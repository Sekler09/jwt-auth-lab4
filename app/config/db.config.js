module.exports = {
  HOST: process.env.DB_HOST || 'localhost',
  PORT: process.env.DB_PORT || '5432',
  USER: process.env.DB_USER || 'user',
  PASSWORD: process.env.DB_PASSWORD || 'password',
  DB: process.env.DB_NAME || 'test',
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
