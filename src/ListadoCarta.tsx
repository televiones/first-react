import * as React from "react";
import './ListadoCarta.css';

type Props = {
    url: string;
}

type Data = {
    error: any,
    isLoaded: boolean,
    items: [],
    next: any,
    previous: any
}

export default class ListadoCarta extends React.Component<Props, Data> {

    constructor(props: Props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            next: null,
            previous: null
        };
    }

    componentDidMount() {
        fetch(this.props.url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.results,
                        next: result.next,
                        previous: result.previous
                    });
                },
                // Nota: es importante manejar errores aquí y no en
                // un bloque catch() para que no interceptemos errores
                // de errores reales en los componentes.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="container mt-4">
                    <div className="row">
                        <div className="card-deck">
                            {items.map(item => (
                                <div className="card mb-5 miCarta">
                                    <img className="card-img-top image" src={item['background_image']}
                                         alt="Card image cap"/>
                                    <div className="card-body">
                                        <h5 className="card-title">{item['name']}</h5>
                                        <p className="card-text">
                                            <b>Metacritic:</b> {item['metacritic'] !== null ? item['metacritic'] : '-'}
                                        </p>
                                        <a href={'https://rawg.io/games/' + item['slug']} className="btn btn-primary"
                                           target="_blank" rel={"noopener noreferrer"}>Ver descripción</a>
                                        {item['clip'] !== null &&
                                        <a href={item['clip']['clip']}
                                           className="btn btn-primary trailer">Ver trailer</a>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            );
        }
    }
}