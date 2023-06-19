// /**
//  * Comentarios.js
//  *
//  * @description :: A model definition represents a database table/collection.
//  * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
//  */

module.exports = {

  attributes: {

    id_usuario: {
      model: 'Usuario'
    },
    id_publicaciones: {
      model: 'Publicacion'
    },
    contenido: {
      type: 'string'
    },
    fecha_contenido: {
      type: 'ref',
      columnType: 'date'
    },
    num_mg: {
      type: 'number'
    },

  },
  // beforeCreate: function (values, next) {
  //   if (values.fecha_contenido) {
  //     values.fecha_contenido = moment(values.fecha_contenido).format('YYYY-MM-DD');
  //   }
  //   return next();
  // },

  // beforeUpdate: function (values, next) {
  //   if (values.fecha_contenido) {
  //     values.fecha_contenido = moment(values.fecha_contenido).format('YYYY-MM-DD');
  //   }
  //   return next();
  // }

};

