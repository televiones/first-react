import React from 'react';
import './ListadoCarta.css';

type PropsCarta = {
    imagen: string,
    nombre: string,
    id: number,
    fechaEstreno: string
}

export default class Carta extends React.Component<PropsCarta> {
    constructor(props: PropsCarta) {
        super(props);
    }

    render() {
        return (
            <div className="mt-2">
                <div className="card miCarta">
                    <img className="card-img-top image" src={this.props.imagen}
                         alt="Card image cap" height="168"/>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.nombre}</h5>
                        <p className="card-text">
                            <b>Fecha de estreno:</b> {this.props.fechaEstreno}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}