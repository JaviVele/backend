/**
 * Mensaje.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    contenido: {
      type: 'string',
    },
    fecha_envio: {
      type: 'ref',
      columnType: 'date',
    },
    id_usuario_envia: {
      model: 'Usuario'
    },
    id_usuario_recibe: {
      model: 'Usuario'
    }

  },
 

};

