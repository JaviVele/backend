/**
 * ReblabberController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    crear: async function (req, res) {
        const { id_usuario, id_publicaciones } = req.body;
        console.log(id_publicaciones);
        try {
          
          const nuevoReblabber = await Reblabbers.create(
            {
              id_usuario,
              id_publicaciones
            }
          ).fetch();
          const publicaciones = await Publicacion.find({ id: id_publicaciones });
          //console.log(publicaciones);
          const id_ajeno = publicaciones[0].id_usuario;
        //console.log(id_ajeno);
          const tipoNotificacion = 'rebblabber';
          const fecha_notificacion = new Date();
          const idNotificacion = await Notificacion.create({
            tipo_noti: tipoNotificacion,
            fecha_notificacion: fecha_notificacion,
            id_usuario,
            id_ajeno
        }).fetch();
          res.status(201).json(nuevoReblabber);
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Error al crear el reblabber' });
        }
      },
    
      listar: async function (req, res) {
        try {
          const reblabbers = await Reblabbers.find();
          res.json(reblabbers);
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener la lista de reblabbers' });
        }
      },
    
      // listarUno: async function(req, res) {
      //   try {
      //     const reblabber = await Reblabbers.findOne({ id: req.params.id });
      //     if (!reblabber) {
      //       return res.notFound('Reblabber no encontrado');
      //     }
      //     return res.json(reblabber);
      //   } catch (error) {
      //     return res.serverError(error);
      //   }
      // },
    
    //   actualizar: async function (req, res) {
    //     try {
    //       const seguidorActualizado = await Reblabbers.updateOne({ id: req.params.id })
    //         .set(req.body)
    //         .intercept((error) => {
    //           return res.status(404).json({ error: 'Reblabber no encontrado' });
    //         });
    
    //       res.json(seguidorActualizado);
    //     } catch (error) {
    //       res.status(500).json({ error: 'Error al actualizar el reblabber' });
    //     }
    //   },
      eliminar: async function (req, res) {
        try {
          const blabberEliminado = await Reblabbers.destroyOne({ id: req.params.id })
            .intercept((err) => {
              return res.status(404).json({ error: 'Reblabber no encontrado' });
            });
    
          res.json(blabberEliminado);
        } catch (error) {
          res.status(500).json({ error: 'Error al eliminar el reblabber' });
        }
      }

};

