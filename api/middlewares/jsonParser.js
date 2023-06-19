module.exports = function(req, res, next) {
    if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
      let data = '';
  
      req.on('data', chunk => {
        data += chunk;
      });
  
      req.on('end', () => {
        try {
          req.body = JSON.parse(data);
        } catch (error) {
          return res.status(400).json({ error: 'Error al procesar los datos JSON' });
        }
  
        next();
      });
    } else {
      next();
    }
  };
  