const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'sqlite',
  storage: '../SQLite/database.db',
});

const connectDatabase=async()=>{
  try{
    await db.authenticate();
    console.log("Conectado a la base de datos")
  }catch(error){
    console.log("Ocurrió un error al conectarse a la base de datos")
  }
}

const disconnectDatabase=async()=>{
  try{
    await db.close();
    console.log("Desconectado de la base de datos")
  }catch(error){
    console.log("Ocurrió un error al desconectarnos")
  }
}

module.exports = {
  db,
  Orm: Sequelize,
  connectDatabase,
  disconnectDatabase
};
