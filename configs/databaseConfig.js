import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
  }
);

try {
  await sequelize.authenticate();
  console.log('Success connect to database');
} catch (err) {
  console.error(
    `Unable to connect to the database: ${err}`
  );
}

export default sequelize;
