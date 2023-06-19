module.exports = {
  attributes: {
    // eslint-disable-next-line camelcase
    nombre_usuario: {
      type: 'string',
      
    },
    // eslint-disable-next-line camelcase
    nombre_arroba: {
      type: 'string',
      
    },
    correo: {
      type: 'string',
    
      unique: 'true'
    },
    contrasena: {
      type: 'string',
    
    },
    // eslint-disable-next-line camelcase
    fecha_nacimiento: {
      type: 'ref',
      columnType: 'date',
  
    },
    // eslint-disable-next-line camelcase
    foto_perfil: {
      type: 'string',
      allowNull: true
    },
    biografia: {
      type: 'string',
      allowNull: true
    },
    seguidores: {
      collection: 'Seguidores',
      via: 'seguido_id'
    },
    seguidos: {
      collection: 'Seguidores',
      via: 'seguidor_id'
    }
    // Otros atributos del usuario
  },
  // beforeCreate: function (values, next) {
  //   if (values.fecha_nacimiento) {
  //     values.fecha_nacimiento = moment(values.fecha_nacimiento).format('YYYY-MM-DD');
  //   }
  //   return next();
  // },

  // beforeUpdate: function (values, next) {
  //   if (values.fecha_nacimiento) {
  //     values.fecha_nacimiento = moment(values.fecha_nacimiento).format('YYYY-MM-DD');
  //   }
  //   return next();
  // }
};
