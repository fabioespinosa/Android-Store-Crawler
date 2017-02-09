var cheerio = require('cheerio');
var request = require('request');
var _ = require('underscore');

exports.fetchData = (req, res) => {
  console.log(req.params.categoria);
  request(`https://play.google.com/store/apps/category/${req.params.categoria}/collection/topselling_paid`, function(error, response, html) {
    if(!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var hrefs = [];
      $('.card-click-target').each(function() {
          hrefs.push(this.attribs.href);
      })

      var uniqueHrefs = _.unique(hrefs);


      var respuestas = [];
      uniqueHrefs.forEach(function(href, index) {
        if(index<=24) {
          console.log(href);
          request(`https://play.google.com/${href}`, function(error, response, html) {
            if(!error && response.statusCode == 200){
              var $ = cheerio.load(html);
              var respuesta = {};
              respuesta.link = `https://play.google.com/${href}`;
              respuesta.nombre = $('.id-app-title').text();
              respuesta.ratings = $('.reviews-num').html();
              respuesta.promedio = $('.score').text();
              respuesta.ratings5 = $('.rating-bar-container.five .bar-number').html();
              respuesta.ratings4 = $('.rating-bar-container.four .bar-number').html();
              respuesta.descripcion = $('.show-more-content.text-body').text();
              respuesta.cambios = $('.details-section.whatsnew .recent-change').html();
              respuestas.push(respuesta);
              if(index == 24){
                setTimeout(function(){
                  res.json(respuestas);
                }, 2000);
              }
            }
            else {
              console.log(error);
            }

          });
        }
      });


    }
  });



}
