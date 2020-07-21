import Knex from 'knex';

export async function up(knex: Knex){
    //CRIAR A TABELA
    return knex.schema.createTable('business', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('instagram').notNullable();
        table.decimal('longitude').notNullable();
        table.decimal('latitude').notNullable();
        table.string('cidade').notNullable();
        table.string('estado', 2).notNullable();

        table.string('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');
    })
}

export async function down(knex: Knex){
    //VOLTAR ATRAS (DELETAR A TABELA)
    return knex.schema.dropTable('business');
}