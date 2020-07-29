import Knex from "knex";

export async function seed(knex: Knex){
    await knex('acting').insert([
        { title: 'Hoteis', image: 'hotel.svg'},
        { title: 'Alimentação', image: 'alimentacao.svg'},
        { title: 'Outros meios de hospedagem', image: 'house.svg'},
        { title: 'Agência de viagem', image: 'agencia-de-viagem.svg'},
        { title: 'Transporte túristico', image: 'transporte-turistico.svg'},
        { title: 'Pesque pague', image: 'pesque-pague.svg'},
        { title: 'Área de lazer com piscina', image: 'piscina.svg'},
        { title: 'Produtos artesanais', image: 'produtos-artesanais.svg'},
        { title: 'Vinícola', image: 'vinicola.svg'},
        { title: 'Cervejaria', image: 'cervejaria.svg' },
        { title: 'Bares e pubs', image: 'bares-e-pubs.svg' },
        { title: 'Cachaçaria', image: 'cachacaria.svg' },
        { title: 'Trilhas', image: 'trilha.svg' },
        { title: 'Camping', image: 'camping.svg' },
        { title: 'Cachoeira', image: 'cachoeira.svg' },
        { title: 'Produtos naturais', image: 'produtos-naturais.svg' },
    ]);
}