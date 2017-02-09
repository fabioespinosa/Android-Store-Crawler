import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import cx from 'classnames';



class ModalShow extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: true
    };
  }

  toggle() {
    this.props.hide();
    this.setState({show: !this.state.show});
  }

  render(){
    const {nombre, descripcion, cambios} = this.props;
    return (
      <Modal show={this.state.show} onHide={this.toggle.bind(this)} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Info {nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Descripcion:
            <br/>
            {descripcion}
            <hr/>
            Cambios:
            <br/>
            {cambios}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.toggle.bind(this)}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalShow;
