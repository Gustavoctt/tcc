import React from 'react';
import { Link } from 'react-router-dom';

import { Map, TileLayer, Marker } from 'react-leaflet';

import './styles.css';

import { FiArrowLeft } from 'react-icons/fi';

const CreatePoint: React.FC = () => {
  return (
        <div id="page-create-point">
            <div className="page-header">
                <header>
                    <Link to="/">
                        <FiArrowLeft/>
                        Voltar para a home
                    </Link>
                </header>
            </div>

            <form onSubmit={() => {}} autoComplete="off">
                <h1>
                    Cadastro do local
                </h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome do local</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                        />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>
                    

                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Tipos de negócio</h2>
                        <span>Selecione um ou mais tipos de <br/> negócios do seu estabelecimento</span>
                    </legend>

                    <ul className="items-grid">
                                
                        <li>
                            <img src="" alt="" />
                            <span>Titulo</span>
                        </li>

                        <li>
                            <img src="" alt="" />
                            <span>Titulo</span>
                        </li>    <li>
                            <img src="" alt="" />
                            <span>Titulo</span>
                        </li>
                                
                    </ul>                      
                </fieldset>
                <button type="submit">Cadastrar ponto de coleta</button>
            </form>
        </div>
    );
}

export default CreatePoint;