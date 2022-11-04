module.exports = function (sequelize, dataTypes) {
    let alias = "dispositivos_tipo";
    //Esto es como vamos a llamar a la tabla
    let cols = {
        //Define las columnas de la tabla
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER,
            notNull: true,
        },
        nombre: {
            type: dataTypes.STRING,
            notNull: true
        },
        descripcion:{
            type: dataTypes.STRING,
            notNull:false
        }

    };
    let config = {
        //Le damos el nombre de la tabla en la DB
        tableName: "dispositivos_tipo",
        timestamps: false,
    };
    let dispositivos_tipo = sequelize.define(alias, cols, config);
    //defino el modelo con todos los parametros que defini arriba
    dispositivos_tipo.associate = function (models) {
        dispositivos_tipo.hasMany(models.alarmas_cliente, {
          as: "dispositivos_tipo ",
          foreignKey: "dispositivos_tipo_id",
        });
      };
   
    return dispositivos_tipo;
};
