import Knex from "knex";

export async function seed(knex: Knex){
    await knex('acting').insert([
        { title: 'Diarista', image: 'diarista.svg'},
        { title: 'Eletrecista', image: 'eletrecista.svg'},
        { title: 'Pintor', image: 'pintor.svg'},
        { title: 'Encanador', image: 'encanador.svg'},
        { title: 'Costureira', image: 'costureira.svg'},
        { title: 'Design Gráfico', image: 'design-grafico.svg'},
        { title: 'Desenvolvedor', image: 'desenvolvedor.svg'},
        { title: 'Motoboy', image: 'motoboy.svg'},
        { title: 'Marceneiro', image: 'marceneiro.svg'},
    ]);
}