/**
 * ConfiguracionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    crear: async function (req, res) {
        try {
          const congifuracion = await Congifuracion.create(req.body).fetch();
          res.status(201).json(congifuracion);
        } catch (error) {
          res.status(500).json({ error: 'Error al crear la congifuracion' });
        }
      },


      listar: async function (req, res) {
        try {
          const configuraciones = await Configuracion.find();
          res.json(configuraciones);
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener la lista de configuracion' });
        }
      },
    
      // listarUno: async function(req, res) {
      //   try {
      //     const congifuracion = await Congifuracion.findOne({ id: req.params.id });
      //     if (!congifuracion) {
      //       return res.notFound('Congifuracion no encontrado');
      //     }
      //     return res.json(congifuracion);
      //   } catch (error) {
      //     return res.serverError(error);
      //   }
      // },
    
      actualizar: async function (req, res) {
        try {
          const configuracionActualizar = await Congifuracion.updateOne({ id: req.params.id })
            .set(req.body)
            .intercept((error) => {
              return res.status(404).json({ error: 'Congifuracion no encontrado' });
            });
    
          res.json(configuracionActualizar);
        } catch (error) {
          res.status(500).json({ error: 'Error al actualizar el congifuracion' });
        }
      },
      // eliminar: async function (req, res) {
      //   try {
      //     const eliminarCongifuracion = await Congifuracion.destroyOne({ id: req.params.id })
      //       .intercept((err) => {
      //         return res.status(404).json({ error: 'Congifuracion no encontrado' });
      //       });
    
      //     res.json(eliminarCongifuracion);
      //   } catch (error) {
      //     res.status(500).json({ error: 'Error al eliminar el congifuracion' });
      //   }
      // }

};

