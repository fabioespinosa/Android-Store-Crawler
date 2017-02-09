import _ from 'underscore';


export default function(array) {
  var datos = {};
  for(var i=0; i<array.length; i++){
    var aplicacion = array[i];    if(aplicacion.descripcion) {
      aplicacion.descripcion.split(" ").map(palabra => {
        if(datos[palabra]) {
          datos[palabra].push({promedio: aplicacion.promedio})
        }
        else {
          datos[palabra] = [{promedio: aplicacion.promedio}];
        }
      })
    }
  }

  var promedios = {};

  for(var palabra in datos){
    var suma = 0.0;
    for(var dato in datos[palabra]){
      var datoActual = datos[palabra][dato];
      suma += parseFloat(datoActual.promedio.split(",").join("."));
    }
    var promedio = suma/(datos[palabra].length);
    promedios[palabra] = {palabra: palabra, promedio: promedio, suma: suma, apariciones: datos[palabra].length};
  }

  var final = [];

  for (var dato in promedios) {
    final.push(promedios[dato]);
  }


  var mejorPromedio = _(final).chain().sortBy(function(o) {
    return o.apariciones;
  }).sortBy(function(f) {
    return f.promedio
  }).reverse();

  var mayorApariciones = _(final).chain().sortBy(function(o) {
    return o.promedio;
  }).sortBy(function(f) {
    return f.apariciones
  }).reverse();

  return {
    promedio: mejorPromedio._wrapped, apariciones: mayorApariciones._wrapped
  }
}
