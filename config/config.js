import dotenv from "dotenv";

dotenv.config();

const config = {
  development: {
    username: "salonadmin",
    password: "SalonX@123",
    database: "salonx",
    host: "localhost",
    dialect: "postgres",
    seederStorage: "sequelize",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
    seederStorage: "sequelize",
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    seederStorage: "sequelize",
  },
};

export default config;