import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import cx from 'classnames';

class ModalResults extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: true,
      promedio: false,
      apariciones: false
    };
  }

  toggle() {
    this.props.hide();
    this.setState({show: !this.state.show});
  }

  apariciones() {
    this.setState({apariciones: true, promedio: false});
  }

  promedio() {
    this.setState({apariciones: false, promedio: true});
  }

  render(){
    return (
      <Modal show={this.state.show} onHide={this.toggle.bind(this)} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Analisis de palabras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <button onClick={this.apariciones.bind(this)}>Palabras por apariciones</button>
          <button onClick={this.promedio.bind(this)}>Palabras por Promedio de calificacion</button>
          {(this.state.promedio || this.state.apariciones) &&
            <table>
              <tbody>
                <tr>
                    <th>Palabra</th>
                    <th>Promedio</th>
                    <th>Apariciones</th>
                </tr>
                {this.state.promedio && this.props.promedio.map(actual => {
                  return <tr key={actual.palabra}>
                    <td>{actual.palabra}</td>
                    <td>{actual.promedio}</td>
                    <td>{actual.apariciones}</td>
                  </tr>
                })}
                {this.state.apariciones && this.props.apariciones.map(actual => {
                  return <tr key={actual.palabra}>
                    <td>{actual.palabra}</td>
                    <td>{actual.promedio}</td>
                    <td>{actual.apariciones}</td>
                  </tr>
                })}
              </tbody>
            </table>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.toggle.bind(this)}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalResults;
