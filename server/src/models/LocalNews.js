const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const LocalNews = sequelize.define('LocalNews', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photoUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mainText: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = { LocalNews, sequelize };
