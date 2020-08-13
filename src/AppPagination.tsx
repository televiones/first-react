import React from "react";

import Pagination from "./Pagination";
import Carta from "./Carta";

type PropsVideojuegos = {
    url: string
}

type StateVideojuegos = {
    totalVideojuegos: number,
    currentVideojuegos: [],
    currentPage: number,
    totalPages: number,
    isLoaded: boolean,
    error: any
}

export default class AppPagination extends React.Component<PropsVideojuegos, StateVideojuegos> {

    constructor(props: PropsVideojuegos) {
        super(props);
        this.state = {
            totalVideojuegos: 0,
            isLoaded: false,
            error: null,
            currentPage: 0,
            totalPages: 0,
            currentVideojuegos: []
        }
        this.onPageChanged = this.onPageChanged.bind(this);
    }

    componentDidMount() {
        fetch(this.props.url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        currentVideojuegos: result.results,
                        currentPage: 1,
                        totalVideojuegos: result.count,
                        totalPages: Math.ceil(result.count / 30)
                    });
                },
                // Nota: es importante manejar errores aquí y no en
                // un bloque catch() para que no interceptemos errores
                // de errores reales en los componentes.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                }
            )
    }

    onPageChanged(data: any) {
        this.setState({isLoaded: false});
        let newUrl = "https://api.rawg.io/api/games?limit=5&page=" + data.currentPage + "&page_size=30&search=witcher"
        fetch(newUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        currentPage: data.currentPage
                    });
                },
                // Nota: es importante manejar errores aquí y no en
                // un bloque catch() para que no interceptemos errores
                // de errores reales en los componentes.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                }
            )
    }


    render() {
        if (this.state.isLoaded && this.state.currentVideojuegos.length === 0) {
            return (
                <div>
                    <h1>
                        Amorten Irumikus!
                    </h1>
                </div>
            );
        } else if (!this.state.isLoaded || this.state.error) {
            return (
                <div>
                    <h1>
                        El baile del pan!
                    </h1>
                </div>
            );
        } else {
            const {totalVideojuegos, currentVideojuegos, currentPage, totalPages} = this.state;
            const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();

            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-9 offset-2">
                            <div
                                className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                                <div className="d-flex flex-row align-items-center">

                                    <h2 className={headerClass}>
                                        <strong className="text-secondary">{totalVideojuegos}</strong> Videojuegos
                                    </h2>

                                    {currentPage && (
                                        <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{currentPage}</span> / <span
                                            className="font-weight-bold">{totalPages}</span>
                </span>
                                    )}

                                </div>

                                <div className="d-flex flex-row py-4 align-items-center">
                                    <Pagination pageNeighbors={1} pageLimit={30} totalRecords={totalVideojuegos}
                                                onChange={this.onPageChanged}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="card-deck">
                                    {currentVideojuegos.map(vj => <Carta nombre={vj['name']} id={vj['id']}
                                                                         imagen={vj['background_image']}
                                                                         fechaEstreno={vj['released']}/>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
