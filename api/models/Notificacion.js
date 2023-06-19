/**
 * Notificacion.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    tipo_noti: {
      type: 'string',
      //isIn: ['Me gusta', 'Rebblaber','Seguidor'],
    },  
    fecha_notificacion: {
      type: 'ref',
      columnType: 'date',
    },
    id_usuario: {
      model: 'usuario'
    },
    id_ajeno: {
      model: 'usuario'
    }

  },
  

};

