/**
 * ComentariosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  crear: async function (req, res) {
    try {
      const { contenido, fecha_contenido, num_mg, id_publicaciones, id_usuario } = req.body;
      
      // Verificar si la publicación existe
      const publicacion = await Publicacion.find({ id: id_publicaciones });
      if (!publicacion) {
        return res.status(404).json({ error: 'La publicación no existe.' });
      }
  
      // Verificar si el usuario existe
      const usuario = await Usuario.find({ id: id_usuario });
      if (!usuario) {
        return res.status(404).json({ error: 'El usuario no existe.' });
      }
  
      // Crear la nueva respuesta
      const nuevaRespuesta = await Comentarios.create({
        contenido: contenido,
        fecha_contenido: new Date(),
        num_mg: num_mg,
        id_usuario: id_usuario,
        id_publicaciones: id_publicaciones
        
        
      }).fetch();
      console.log(nuevaRespuesta);
      // Obtener el número actual de "Me gusta" para la publicación
      const numComentariosactualizados = await Comentarios.count({ id_publicaciones: id_publicaciones });
      await Publicacion.update({ id: id_publicaciones }).set({ num_comentarios: numComentariosactualizados });

      const publicaciones = await Publicacion.find({ id: id_publicaciones });
        //console.log(publicaciones);
        const id_ajeno = publicaciones[0].id_usuario;
        //console.log(id_ajeno);
        const tipoNotificacion = 'comentario';
        const fecha_notificacion = new Date();
        const idNotificacion = await Notificacion.create({
          tipo_noti: tipoNotificacion,
          fecha_notificacion: fecha_notificacion,
          id_usuario,
          id_ajeno
        }).fetch();
  
      return res.status(200).json({ respuesta: nuevaRespuesta });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Ocurrió un error al agregar la respuesta.' });
    }
  },
  
    
      listar: async function (req, res) {
        try {
          const comentarios = await Comentarios.find();
          res.json(comentarios);
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener la lista de comentarios' });
        }
      },
    
      listarUno: async function(req, res) {
        //console.log(req.params);
        try {
          // Lógica para obtener los comentarios de la publicación usando el publicacionId
          // Puedes usar el modelo y los métodos adecuados para obtener los comentarios de la base de datos
          const comentarios = await Comentarios.find({ id_publicaciones:req.params.id });

          return res.status(200).json(comentarios);
        } catch (error) {
          return res.status(500).json({ error: 'Error al obtener los comentarios' });
        }
      },
    
      actualizar: async function (req, res) {
        try {
          const seguidorActualizado = await Comentarios.updateOne({ id: req.params.id })
            .set(req.body)
            .intercept((error) => {
              return res.status(404).json({ error: 'Comentario no encontrado' });
            });
    
          res.json(seguidorActualizado);
        } catch (error) {
          res.status(500).json({ error: 'Error al actualizar el comentario' });
        }
      },
      eliminar: async function (req, res) {
        try {
          const comentarioEliminado = await Comentarios.destroyOne({ id: req.params.id })
            .intercept((err) => {
              return res.status(404).json({ error: 'Comentario no encontrado' });
            });
    
          res.json(comentarioEliminado);
        } catch (error) {
          res.status(500).json({ error: 'Error al eliminar el comentario' });
        }
      }

};

