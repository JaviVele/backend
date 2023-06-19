/**
 * Seguidores.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    fecha: {
      type: 'ref',
      columnType: 'date',
      required: true
    },
    seguidor_id: {
      model: 'Usuario',
      columnName: 'seguidor_id',
      required: true
    },
    seguido_id: {
      model: 'Usuario',
      columnName: 'seguido_id',
      required: true
    }

  },
  // beforeCreate: function (values, next) {
  //   if (values.fecha) {
  //     values.fecha = moment(values.fecha).format('YYYY-MM-DD');
  //   }
  //   return next();
  // },

  // beforeUpdate: function (values, next) {
  //   if (values.fecha) {
  //     values.fecha = moment(values.fecha).format('YYYY-MM-DD');
  //   }
  //   return next();
  // }

};

