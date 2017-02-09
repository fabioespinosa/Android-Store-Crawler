import React, { Component } from 'react';
import Modal from './modal';

class MobileApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    }
  }

  showModal() {
    this.setState({modal: true});
  }

  hideModal() {
    this.setState({modal: false});
  }

  render() {
    const {link, nombre, promedio, ratings, ratings4, ratings5, descripcion, cambios} = this.props.aplicacion;
    return (
      <div className="col-md-2 altura">
        <div>
          <a target="_blank" href={link}><b><i>{nombre}</i></b></a>
        </div>
        <div>
          Promedio: {promedio}
        </div>
        <div>
          Ratings: {ratings}
        </div>
        <div>
          Ratings4: {ratings4}
        </div>
        <div>
          Ratings5: {ratings5}
        </div>
        <div className="abajo">
          <a onClick={this.showModal.bind(this)}>Ver mas</a>
        </div>
        {this.state.modal && <Modal hide={this.hideModal.bind(this)} nombre={nombre} descripcion={descripcion} cambios={cambios}/>}
      </div>
    );
  }
}

export default MobileApp;
