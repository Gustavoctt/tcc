import Knex from 'knex';

export async function up(knex: Knex){
    //CRIAR A TABELA
    return knex.schema.createTable('business_acting', table => {
        table.increments('id').primary();
        table.integer('business_id').notNullable().references('id').inTable('business');
        table.integer('acting_id').notNullable().references('id').inTable('acting');
    });
}

export async function down(knex: Knex){
    //VOLTAR ATRAS (DELETAR A TABELA)
    return knex.schema.dropTable('business_acting');
}