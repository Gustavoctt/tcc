import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api';
import axios from 'axios';

import './styles.css';

interface Actings{
    id: number,
    title: string,
    image_url: string
}

interface IBGEUFResponse{
    sigla: string
}

const Inicio = () => {
    const [actings, setActings] = useState<Actings[]>([]);

    useEffect(() => {
        api.get('acting').then(response => {
            setActings(response.data)
        });
    });

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const UFInitials = response.data.map(uf => uf.sigla);

            console.log(UFInitials);
        });
    });

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

                      <Map center={[-28.359147, -49.275375]} zoom={14}>
                        <TileLayer 
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contribuitors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-28.359147, -49.275375]}/>
                      </Map>
                      

                    <div className="field-group">
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
                        {actings.map(item => (
                            <li key={item.id}>
                                <img src={item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button type="submit">Cadastrar estabelecimento</button>
            </form>
        </div>
    )
}

export default Inicio;