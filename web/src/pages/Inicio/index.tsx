import React, {useState} from 'react';
import './styles.css';
//import { Map, TileLayer, Marker } from 'react-leaflet';

const Inicio = () => {

    function mascaraTelefone(telefone){


    }

    //const[initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);
    //const[selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);

    return (
        <div id="page-create-business">
            <header>

            </header>

            <form>
                <h1>Cadastro do seu negócio</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome do seu negócio</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            onChange={()=> {}}
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                onChange={()=> {}}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">WhatsApp</label>
                            <input 
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={()=> {}}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa!</span>
                    </legend>

                    <div className="fied-group">
                            <div className="field">
                                <label htmlFor="estado">Estado</label>
                                <select 
                                    name="estado" 
                                    id="estado"
                                    onChange={()=>{}}
                                    >
                                        <option value="">Selecione o estado</option>
                                </select>
                            </div>

                            <div className="field">
                                <label htmlFor="cidade">Cidade</label>
                                <select 
                                    name="cidade" 
                                    id="cidade"
                                    onChange={()=>{}}
                                    >
                                        <option value="">Selecione a Cidade</option>
                                </select>
                            </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Tipos de negócio</h2>
                        <span>Selecione um ou mais tipos de negócios do seu estabelecimento</span>
                    </legend>

                    <ul className="items-grid">
                        <li>
                            <span>Titulo</span>
                        </li>
                        <li>
                            <span>Titulo</span>
                        </li>
                    </ul>
                </fieldset>

                <button type="submit">Cadastrar estabelecimento</button>
            </form>
        </div>
    )
}

export default Inicio;