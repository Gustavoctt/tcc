import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';

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

const Dashboard = () => {
    const[actings, setActings] = useState<Actings[]>([]);
    const[ufs, setUfs] = useState<string[]>([]);
    const[cities, setCities] = useState<string[]>([]);

    const[initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);

    const[selectedUf, setSelectedUf] = useState('0');
    const[selectedCity, setSelectedCity] = useState('0');
    const[selectedActing, setSelectedActing] = useState<number[]>([]);
    const[selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);
    const[selectedFile, setSelectedFile] = useState<File>();


    //Pega a posição inicial do usuario
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            setInitialPosition([latitude, longitude]);
        })
    }, [])

    // Tras as 'actings'
    useEffect(() => {
        api.get('acting').then(response => {
            setActings(response.data)
        });
    });

    //Seleciona o estado
    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response => {
            const UfInitials = response.data.map(uf => uf.sigla);
            setUfs(UfInitials);
        });
    }, []);

    //Seleciona a cidade do estado
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

    function handleMapClic(event: LeafletMouseEvent){
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ])
    }
    
    function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>){
        const uf = event.target.value;

        setSelectedUf(uf);
    }

    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>){
        const city = event.target.value;

        setSelectedCity(city);
    }

    function handleSelectedActing(id: number){
        const alreadySelected = selectedActing.findIndex(acting => acting === id);

        if(alreadySelected >= 0){
            const filteredActings = selectedActing.filter(acting => acting !== id);

            setSelectedActing(filteredActings);

        }else{
            setSelectedActing([ ...selectedActing, id]);
        }
    }

    return (
        <div id="page-dashboard-form" className="container">
            <PageHeader 
                title="Que incrível que você quer divulgar."
                description="O primeiro passo é preencher esse formulário de inscrição"
            />

            <main>
                <form>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <div className="field-group">
                            <Input 
                                name="name" 
                                label="Nome do seu negócio" 
                            />

                            <Input 
                                name="email" 
                                label="E-mail" 
                            />
                        </div>
                        <div className="field-group">
                                <Input 
                                    name="whatsapp" 
                                    label="Whatsapp" 
                                />

                                <Input 
                                    name="instagram" 
                                    label="User do instagram (se tiver)" 
                                />
                        </div>
                        <TextArea name="bio" label="Descrição do seu negócio"/>

                        <Input 
                            name="visitations" 
                            label="Número de visitantes" 
                                
                        />
                    </fieldset>
                
                    <fieldset>
                        <div className="map-aplication">
                            <legend>
                                <h3>Endereço</h3>
                                <span>Selecione o endereço no mapa!</span>
                            </legend>

                            
                        </div>

                       
                    </fieldset>

                    <fieldset>
                        <div className="map-aplication">
                            <legend>
                                <h3>Tipos de negócio</h3>
                                <span>Selecione um ou mais tipos de <br/> negócios do seu estabelecimento</span>
                            </legend>

                            <ul className="items-grid">
                                {actings.map(acting => (
                                    <li 
                                        key={acting.id}
                                        onClick={() => {handleSelectedActing(acting.id)}}
                                        className={selectedActing.includes(acting.id) ? 'selected' : ''}
                                    
                                    >
                                        <img src={acting.image_url} alt={acting.title} />
                                        <span>{acting.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </fieldset>

                    <footer>
                        <p>
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar registo
                        </button>
                    </footer>
                </form>   
            </main>
        </div>
    )
}

export default Dashboard;