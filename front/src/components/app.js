import React, { Component } from 'react';
import axios from 'axios';
import MobileApp from './mobileApp';
import Spinner from './spinner';
import ModalResults from './modalResults';
import calcular from '../util/calcular';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      aplicaciones: [],
      loading: false,
      resultados: false
    }
  }

  fetchData(categoria) {
    this.setState({
      loading: true
    });

    axios.get(`http://localhost:7070/aplicaciones/${categoria}`)
    .then(result => {
      this.setState({
        loading: false,
        aplicaciones: result.data
      });
    });
  }

  calcularDatos() {
    var resultado = calcular(this.state.aplicaciones);
    console.log(resultado);
    this.setState({
      resultado: resultado,
      resultados: true
    });
  }

  hideModal() {
    this.setState({resultados: false});
  }

  render() {
    return (
      <div className="container">
        <br/>
        <br/>
        <div className="row">
          <div className="col-md-4">
            <button className="btn btn-primary" onClick={this.fetchData.bind(this, "FINANCE")}>Finanzas</button>
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary" onClick={this.fetchData.bind(this, "ENTERTAINMENT")}>Entretenimiento</button>
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary" onClick={this.fetchData.bind(this, "COMICS")}>Cómics</button>
          </div>
        </div>
        <hr/>
        {this.state.aplicaciones &&
        <div className="row">
          {this.state.aplicaciones.map((aplicacion, index) => {
            return(
              <MobileApp key={index} aplicacion={aplicacion}/>
            );
          })}
        </div>}
        {this.state.loading &&
          <Spinner/>
        }
        <hr/>
        <button className="btn btn-default" onClick={this.calcularDatos.bind(this)}>Calcular Datos</button>
        {this.state.resultados && <ModalResults hide={this.hideModal.bind(this)} apariciones={this.state.resultado.apariciones} promedio={this.state.resultado.promedio} />}
      </div>
    );
  }
}
