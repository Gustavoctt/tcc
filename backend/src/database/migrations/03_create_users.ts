import Knex from 'knex';

export async function up(knex: Knex){
    //CRIAR A TABELA
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('passwordHash').notNullable();
    })
}

export async function down(knex: Knex){
    //VOLTAR ATRAS (DELETAR A TABELA)
    return knex.schema.dropTable('users');
}