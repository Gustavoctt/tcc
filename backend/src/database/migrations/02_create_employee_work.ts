import Knex from 'knex';

export async function up(knex: Knex){
    //CRIAR A TABELA
    return knex.schema.createTable('employee_work', table => {
        table.increments('id').primary();
        table.integer('employee_id').notNullable().references('id').inTable('employee');
        table.integer('work_id').notNullable().references('id').inTable('work');
    });
}

export async function down(knex: Knex){
    //VOLTAR ATRAS (DELETAR A TABELA)
    return knex.schema.dropTable('employee_work');
}