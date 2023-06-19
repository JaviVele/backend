const cloudinary = require('cloudinary').v2;
const path = require('path');
//const Publicacion = require("../models/Publicacion");
cloudinary.config({
  cloud_name: 'dvvoon3qo',
  api_key: '166311839662986',
  api_secret: 'HPBj4wE3lryIXHbd72YCIytJ250'
})

module.exports = {
  // api/controllers/UsuarioController.js
  crear: async function (req, res) {
    try {
      const { nombre_usuario, nombre_arroba, correo, contrasena, fecha_nacimiento } = req.body;

      // Aquí puedes realizar las validaciones necesarias y el procesamiento de los datos recibidos

      // Por ejemplo, puedes crear un nuevo usuario en la base de datos
      const nuevoUsuario = await Usuario.create({
        nombre_usuario,
        nombre_arroba,
        correo,
        contrasena,
        fecha_nacimiento
      }).fetch();
      return res.status(200).json({ mensaje: 'Usuario creado exitosamente', usuario: nuevoUsuario });
    } catch (error) {
      return res.status(500).json({ error: 'Ocurrió un error al crear el usuario', mensaje: error.message });
    }
  },
  listar: async function (req, res) {
    try {
      const usuarios = await Usuario.find();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    }
  },

  listarUno: async function(req, res) {
    try {
      const usuario = await Usuario.findOne({ id: req.params.id });
      if (!usuario) {
        return res.notFound('Usuario no encontrado');
      }
      return res.json(usuario);
    } catch (error) {
      return res.serverError(error);
    }
  },

  actualizar: async function (req, res) {
    
    //console.log(req.file('foto_perfil'));
    const usuario = await Usuario.find({ id: req.param('id') });
    //console.log(usuario);
    
    
    req.file('foto_perfil').upload(async function (err, uploadedFiles) {
      if (err) {
        return res.send(500, err);
      }

      if (!uploadedFiles || uploadedFiles.length === 0 || !uploadedFiles[0].fd) {
        //return res.badRequest('No se ha seleccionado ningún archivo.');
        
        
        //console.log(mensaje);
        try {
          const usuarioActualizado = await Usuario.update({ id: req.param('id') })
            .set({
              nombre_usuario: req.param('nombre_usuario'),
              fecha_nacimiento: req.param('fecha_nacimiento'),
              foto_perfil: usuario[0].foto_perfil,
              biografia: req.param('biografia')
            })
            .intercept((err) => {
              return res.status(404).json({ error: 'Usuario no encontrado' });
            });

          res.json(usuarioActualizado);
        } catch (error) {
          res.status(500).json({ error: 'Error al actualizar el usuario' });
        }
      }else{
        cloudinary.uploader.upload(uploadedFiles[0].fd, async function (error, result) {
          if (error) {
            return res.send(500, error);
          }
          //console.log(uploadedFiles[0].fd);
          try {
            const usuarioActualizado = await Usuario.update({ id: req.param('id') })
              .set({
                nombre_usuario: req.body.nombre_usuario,
                fecha_nacimiento: req.body.fecha_nacimiento,
                foto_perfil: result.secure_url,
                biografia: req.body.biografia
              })
              
              .intercept((err) => {
                return res.status(404).json({ error: 'Usuario no encontrado' });
              });
  
            res.json(usuarioActualizado);
          } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el usuario' });
          }
        });
      }

      
    });
    
  },
  eliminar: async function (req, res) {
    try {
      
      const usuarioEliminado = await Usuario.destroyOne({ id: req.params.id })
      
        .intercept((err) => {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        });
      
      res.json(usuarioEliminado);
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
  },

  comprobarUsuario: async function (req, res){
    var nombreArroba = req.body.nombre_arroba;
    var contrasena = req.body.contrasena;
    try {
      const comprobarUsuario = await Usuario.findOne({nombre_arroba: nombreArroba, contrasena: contrasena})
      if (!comprobarUsuario) {
        return res.status(404).json({ error: 'Usuario no encontrado en la base de datos' });
        //return res.notFound('Usuario no encontrado en la base de datos');
      }
      //res.json(comprobarUsuario);
      return res.status(200).json({ mensaje: 'Logeado correctamente', usuario: comprobarUsuario });
    } catch(error) {
      res.status(500).json({error: 'Error al comprobar el usuario'});
    }
  },

  comprobarUsuarioArroba: async function (req, res){
    var nombreArroba = req.param("usuario");
    try {
      const comprobarUsuario = await Usuario.findOne({nombre_arroba: nombreArroba})
      if (!comprobarUsuario) {
        return res.status(404).json({ error: 'Usuario no encontrado en la base de datos' });
        //return res.notFound('Usuario no encontrado en la base de datos');
      }
      //res.json(comprobarUsuario);
      return res.status(200).json({usuario: comprobarUsuario });
    } catch(error) {
      res.status(500).json({error: 'Error al comprobar el usuario'});
    }
  }

};
