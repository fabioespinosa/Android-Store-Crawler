var fetch = require('./fetch');

module.exports = function(app) {
  //Tres categorias

  app.get('/aplicaciones/:categoria', fetch.fetchData);
}
