/**
 * Configuracion.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    idioma: {
      type: 'string',
      isIn: ['Español', 'Ingles'],
      required: true
    },
    privacidad: {
      type: 'string',
      isIn: ['Publico', 'Privado'],
      required: true
    },
    privacidad: {
      type: 'boolean',
      required: true
    },
    id_usuario: {
      model: 'Usuario'
    }



  },

};

