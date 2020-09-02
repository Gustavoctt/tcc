import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import { Map, TileLayer, Marker } from 'react-leaflet';

import './styles.css';

import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import axios from 'axios';

interface Item{
    id: number;
    title:string;
    image_url: string;
}

interface IBGEUFResponse{
    sigla: string;
}

interface IBGECityResponse{
    name: string;
}

const CreatePoint: React.FC = () => {
    const[items, setItems] = useState<Item[]>([]);
    const[ufs, setUfs] = useState<string[]>([]);
    const[cities, setCities] = useState<string[]>([]);

    
    const[selectedUf, setSelectedUf] = useState('0');
    const[selectedCity, setSelectedCity] = useState('0');
    const[selectedItems, setSelectedItems] = useState<number[]>([]);    
    const[selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);
    
    
    const[initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);
    // Inicia pegando a localização do usuário
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const{latitude, longitude} = position.coords;

            setInitialPosition([latitude,longitude]);
        })
    }, []);

    //Iniciar carregando as APIS de estado e cidade
    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                const ufInitials = response.data.map(uf => uf.sigla);
                setUfs(ufInitials);
            });
    }, []);

    useEffect(() => {
        if(selectedUf === '0'){
            return;
        }
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(response => {
            const cityName = response.data.map(city => city.name);

            setCities(cityName);
        });
    }, [selectedUf]);

    //Pega os items que estão no Backend
    useEffect(() => {
        api.get('acting').then(response =>{
            setItems(response.data);
        });
    }, []);

    //Pegar a resposta do Estado e Cidade
    function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>){
        const uf = event.target.value;

        setSelectedUf(uf);
    }

    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>){
        const city = event.target.value;

        setSelectedCity(city);
    }

    //Seleciona o Item na lista
    function handleSelectedItem(id: number){
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if(alreadySelected >= 0){
            const filteredItems = selectedItems.filter(item => item !== id );

            setSelectedItems(filteredItems);

        }else{
            setSelectedItems([...selectedItems, id]);
        }
    }

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

                    <div className="field">
                        <label htmlFor="instagram">User do instragram do seu ponto</label>
                        <input 
                            type="text"
                            name="instagram"
                            id="instagram"
                        />
                    </div>

                    <div className="textarea-field">
                        <label htmlFor="bio">Biografia do seu negócio</label>
                        <textarea id="bio"/>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>
                    
                    <Map center={initialPosition} zoom={13}>
                        <TileLayer
                             attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contribuitors'
                             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    <Marker position={selectedPosition} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select 
                                name="uf" 
                                id="uf"
                                onChange={handleSelectedUf}
                                >
                                <option value={selectedUf}>Selecione um Estado</option>
                                {ufs?.map(uf => (
                                    <option key={uf} value={uf}>
                                        {uf}
                                    </option>
                                ))}        
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select 
                                name="city" 
                                id="city"
                                onChange={handleSelectedCity}
                            >
                              <option value="0">Selecionar uma Cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}          
                            </select>
                        </div>
                    </div>

                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Tipos de negócio</h2>
                        <span>Selecione um ou mais tipos de <br/> negócios do seu estabelecimento</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => (
                            <li
                                key={item.id}
                                onClick={() => {handleSelectedItem(item.id)}}
                                className={selectedItems.includes(item.id) ? 'selected' : ''}
                            >
                                <img src={item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        ))}        
                    </ul>                      
                </fieldset>
                <button type="submit">Cadastrar ponto de coleta</button>
            </form>
        </div>
    );
}

export default CreatePoint;