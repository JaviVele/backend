const cors = require('cors');
const bodyParser = require('body-parser');

module.exports.http = {
  middleware: {
    order: [
      // ...
      'bodyParser',
      'cors',
      // ...
      'router',

      
      // ...
    ],
    
    //bodyParser: require('body-parser').json(),
    // ...
    cors: (function() {
      const corsOptions = {
        origin: 'https://blabbersocial.netlify.app',
        credentials: false,
        methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
        headers: 'Content-Type',
        optionsSuccessStatus: 200,
      };
      return cors(corsOptions);
    })(),
    // bodyParser: (function _configureBodyParser(){
    //   var skipper = require('skipper');
    //   var middlewareFn = skipper({
    //     strict: true,
    //     // ... more Skipper options here ...
    //   });
    //   return middlewareFn;
    // })(),
    
   
  },

  trustProxy: true
  
  // ...
};


module.exports.bodyParser ={
  json: {
    limit: '1mb',
  },
  urlencoded: {
    limit: '1mb',
    extended: true,
  },
}
