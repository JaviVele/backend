/**
 * Me_gusta.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      id_usuario: {
        model: 'Usuario'
      },
      id_publicacion: {
        model: 'Publicacion'
      },
      id_comentario: {
        model: 'Comentarios'
      }

  },

};

