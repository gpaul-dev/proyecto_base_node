module.exports = {
  development: {
    username: "app-",
    password: "",
    database: "pruebas_",
    host: "db2.cdssoftware.com.ar",
    dialect: "mysql",
    dialectOptions: {
      useUTC: false, 
      dateStrings: true,
      typeCast: true      
    },
    timezone: '-03:00'
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "app-",
    password: "",
    database: "",
    host: "db2.cdssoftware.com.ar",
    dialect: "mysql",
    dialectOptions: {
      useUTC: false, 
      dateStrings: true,
      typeCast: true      
    },
    timezone: '-03:00'
  },
};
