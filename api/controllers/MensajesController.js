/**
 * MensajesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    crear: async function (req, res) {
        try {
          const {contenido, id_usuario_envia, id_usuario_recibe} = req.body;
          const fecha_envio = new Date();
          const mensaje = await Mensaje.create({
            contenido,
            fecha_envio,
            id_usuario_envia,
            id_usuario_recibe
          }).fetch();
          res.status(200).json(mensaje);
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Error al crear el mensaje' });
        }
      },
    
      listar: async function (req, res) {
        const id = req.body.id_usuario_envia;
        const usuarioId = req.body.usuarioId;
        // const usuarioId = req.param('usuarioId');
        
        try {
          const mensajes = await Mensaje.find({id_usuario_envia: id, id_usuario_recibe: usuarioId}).sort('fecha_envio ASC').populate("id_usuario_recibe");
          const mensajesRecibidos = await Mensaje.find({ id_usuario_recibe: id, id_usuario_envia: usuarioId }).sort('fecha_envio ASC').populate("id_usuario_recibe");

          // Combinar los mensajes enviados y recibidos
          const conversacion = [...mensajes, ...mensajesRecibidos];
          res.json(conversacion);
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener la lista de mensajes' });
        }
      },
    
    //   listarUno: async function(req, res) {
    //     try {
    //       const notificacion = await Notification.findOne({ id: req.params.id });
    //       if (!comentario) {
    //         return res.notFound('Notificacion no encontrado');
    //       }
    //       return res.json(comentario);
    //     } catch (error) {
    //       return res.serverError(error);
    //     }
    //   },
    
    //   actualizar: async function (req, res) {
    //     try {
    //       const seguidorActualizado = await Comentario.updateOne({ id: req.params.id })
    //         .set(req.body)
    //         .intercept((error) => {
    //           return res.status(404).json({ error: 'Comentario no encontrado' });
    //         });
    
    //       res.json(seguidorActualizado);
    //     } catch (error) {
    //       res.status(500).json({ error: 'Error al actualizar el comentario' });
    //     }
    //   },
      eliminar: async function (req, res) {
        try {
          const mensajeEliminado = await Mensaje.destroyOne({ id: req.params.id })
            .intercept((err) => {
              return res.status(404).json({ error: 'Mensaje no encontrado' });
            });
    
          res.json(mensajeEliminado);
        } catch (error) {
          res.status(500).json({ error: 'Error al eliminar el mensaje' });
        }
      }

};

