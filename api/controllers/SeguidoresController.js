


module.exports = {
  seguirUsuario: async function (req, res) {
     try {
      console.log(req.body);
      var seguidor_id= req.body.seguidor_id;
      var seguido_id = req.body.seguido_id;
      // Verificar si el usuario ya sigue al usuario objetivo
      const existeSeguidor = await Seguidores.findOne({seguidor_id: seguidor_id, seguido_id: seguido_id});
      console.log(existeSeguidor);
      if (existeSeguidor) {
        return res.status(200).json(existeSeguidor)
      }

    } catch (error) {
      res.status(500).json({ error: 'Error al seguir al usuario' });
     }
  },

  obtenerSeguidores: async function (req, res) {
    try {
      const usuarioId = req.query.userId; // Obtén el ID del usuario del parámetro de la consulta
      //console.log(usuarioId);
      // Busca los seguidores del usuario especificado
      const seguidores = await Seguidores.find({ seguido_id: usuarioId })
        .populate('seguidor_id'); // Realiza el populate para obtener los datos de los seguidores
  
      res.status(200).json(seguidores);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los seguidores' });
    }
  },
  
  obtenerSeguidos: async function (req, res) {
    try {
      const usuarioId = req.query.userId; // Obtén el ID del usuario del parámetro de la consulta
      //console.log(usuarioId);
      // Busca los usuarios seguidos por el usuario especificado
      const seguidos = await Seguidores.find({ seguidor_id: usuarioId })
        .populate('seguido_id'); // Realiza el populate para obtener los datos de los usuarios seguidos
  
      res.status(200).json(seguidos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al obtener los usuarios seguidos' });
    }
  },

  dejarSeguirUsuario: async function (req, res) {
    try {
      const { idUsuarioDejarSeguir } = req.params;
      const seguidor = req.user.id;

      // Verificar si el usuario ya sigue al usuario objetivo
      const seguidorExistente = await Seguidores.findOne({ seguidor, seguido: idUsuarioDejarSeguir });
      if (!seguidorExistente) {
        return res.status(400).json({ error: 'No sigues a este usuario' });
      }

      // Eliminar el seguidor
      await Seguidores.destroy({ seguidor, seguido: idUsuarioDejarSeguir });
      res.status(200).json({ mensaje: 'Has dejado de seguir al usuario' });
    } catch (error) {
      res.status(500).json({ error: 'Error al dejar de seguir al usuario' });
    }
  },
  seguidorNuevo: async function (req, res) {
    try {
      console.log(req.body);
      const { fecha, seguidor_id, seguido_id } = req.body;

      const nuevo = await Seguidores.create( {
        fecha,
        seguidor_id,
        seguido_id
      }).fetch();
      return res.status(200).json(nuevo);
    } catch (error) {
      return res.status(500).json({ error: 'Ocurrió un error al seguir el usuario', mensaje: error.message });
    }
  }
};
