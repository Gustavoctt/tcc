import React, { useEffect, useState, ChangeEvent } from 'react';
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

interface IBGECityResponse{
    nome: string
}

const Inicio = () => {
    const[actings, setActings] = useState<Actings[]>([]);
    const[ufs, setUfs] = useState<string[]>([]);
    const[cities, setCities] = useState<string[]>([]);

    const[selectedUf, setSelectedUf] = useState('0');
    const[selectedCity, setSelectedCity] = useState('0');

    useEffect(() => {
        api.get('acting').then(response => {
            setActings(response.data)
        });
    });

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response => {
            const UfInitials = response.data.map(uf => uf.sigla);
            setUfs(UfInitials);
        });
    }, []);

    useEffect(() => {
        if(selectedUf === '0'){
            return;
        }
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(response => {
            const cityName = response.data.map(city => city.nome);
            setCities(cityName);
        })
    }, [selectedUf]);

    function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>){
        const uf = event.target.value;

        setSelectedUf(uf);
    }

    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>){
        const city = event.target.value;

        setSelectedCity(city);
    }

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
                                    onChange={handleSelectedUf}
                                    >
                                        <option value={selectedUf}>Selecione o estado</option>
                                        {ufs.map(uf => (
                                            <option key={uf} value={uf}>{uf}</option>
                                        ))}
                                </select>
                            </div>

                            <div className="field">
                                <label htmlFor="cidade">Cidade</label>
                                <select 
                                    name="cidade" 
                                    id="cidade"
                                    onChange={handleSelectedCity}
                                    >
                                        <option value={selectedCity}>Selecione a Cidade</option>
                                        {cities.map(city => (
                                            <option key={city} value={city} >{city}</option>
                                        ))}
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