module.exports= function (sequelize,dataTypes){
    let alias = 'alarmas_cliente';
    let cols= {
        cuenta: {
            primaryKey:true,
            autoIncrement:true,
            notNull: true,
            type: dataTypes.STRING,
        },
        nombre:{
            notNull: true,
            type:dataTypes.STRING,
        },
        direccion:{
            notNull:true,
            type:dataTypes.STRING
        },
        localidad:{
            notNull:true,
            type:dataTypes.STRING
        },
        ciudad:{
            notNull:true,
            type:dataTypes.STRING,
        },
        telefono:{
            type:dataTypes.INTEGER,
            notNull: true,
        },
        contacto:{
            type:dataTypes.STRING,
        },
        dispositivos_categoria_id:{
            type:dataTypes.INTEGER,
            notNull: true,
        },
        dispositivos_tipo_id:{
            notNull:true,
            type:dataTypes.INTEGER,
            primaryKey:true,
        },
        protocolo:{
            type:dataTypes.STRING,
        },
    };
    let config={
        tableName:'alarmas_cliente',
        timestamps: false,
    };
    let dispositivos=sequelize.define(alias,cols,config);
    dispositivos.associate = function (models){
        dispositivos.belongsTo(models.dispositivos_tipo, {
        foreignKey: "dispositivos_tipo_id",
        as: "dispositivos_tipo",
      });
      dispositivos.hasMany(models.eventos, {
          foreignKey:"cuenta",
          as: "eventos",
      });
      dispositivos.belongsTo(models.dispositivos_categoria ,{
        foreignKey: "dispositivos_categoria_id",
        as: "dispositivos_categoria"
      });
    }
    
    return dispositivos;
}