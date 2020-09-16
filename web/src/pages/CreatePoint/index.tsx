import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { toast } from 'react-toastify';

import api from '../../services/api';
import axios from 'axios';
import './styles.css';

import Dropzone from '../../components/Dropzone';


interface Item{
    id: number;
    title:string;
    image_url: string;
}

interface IBGEUFResponse{
    sigla: string;
}

interface IBGECityResponse{
    nome: string;
}

const CreatePoint: React.FC = () => {
    const[items, setItems] = useState<Item[]>([]);
    const[ufs, setUfs] = useState<string[]>([]);
    const[cities, setCities] = useState<string[]>([]);

    const[initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);

    const[formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        bio: '',
        instagram: '',
    });

    
    const[selectedUf, setSelectedUf] = useState('0');
    const[selectedCity, setSelectedCity] = useState('0');

    const[selectedItems, setSelectedItems] = useState<number[]>([]);    
    const[selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);
    const[selectedFile, setSelectedFile] = useState<File>();

    const history = useHistory();
    
    // Inicia pegando a localização do usuário
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const{latitude, longitude} = position.coords;

            setInitialPosition([latitude,longitude]);
        }, () => {
            toast.error('❌ Opss! Algo deu errado :(', toastOptions);
        }, 
        {
            timeout: 30000,
            enableHighAccuracy: true,
        });
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
            const cityName = response.data.map(city => city.nome);

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

    //Seleciona o Ponto no mapa
    function handleMapClick(event: LeafletMouseEvent){
        setSelectedPosition([event.latlng.lat, event.latlng.lng]);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
    
       // console.log(name, value);
        setFormData({...formData, [name]: value});
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

    //Toastify configurations
    const toastOptions = {
        autoclose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    };

    //Envio final
    async function handleSubmit (event: FormEvent){
            event.preventDefault();
            
            const {name, email, whatsapp, bio, instagram} = formData;
            const uf = selectedUf;
            const city = selectedCity;
            const [latitude, longitude] = selectedPosition;
            const actings = selectedItems;

            const data = {
                name,
                email,
                whatsapp,
                bio,
                instagram,
                latitude,
                longitude,
                uf,
                city,
                actings,
            }

            await api.post('business', data);

            alert('Ponto criado com sucesso');
            
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

            <form onSubmit={handleSubmit}>
                <h1>
                    Cadastro do local
                </h1>

                <Dropzone onFileUploaded={setSelectedFile}/>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome do local</label>
                        <input 
                            onChange={handleInputChange}
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input
                            onChange={handleInputChange}
                            type="email"
                            name="email"
                            id="email"
                        />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                onChange={handleInputChange}
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="instagram">User do instragram do seu ponto</label>
                        <input 
                            onChange={handleInputChange}
                            type="text"
                            name="instagram"
                            id="instagram"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="bio">Descrição rápida do seu negócio</label>
                        <input 
                            onChange={handleInputChange}
                            name="bio"
                            id="bio"
                            type="text"
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>
                    
                    <Map center={initialPosition} zoom={14} onclick={handleMapClick}>
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
                                value={selectedCity}
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
                                onClick={() => handleSelectedItem(item.id)}
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