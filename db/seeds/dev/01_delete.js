var knexCleaner = require('knex-cleaner');

var kcOptions = {
    ignoreTables: ['knex_migrations', 'knex_migrations_lock']
};

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knexCleaner.clean(knex, kcOptions);

    // or write knex queries to delete entries from tables in order
    // to avoid foreign key constraints

    /*
    return knex('categories').del()
        .then(() => {
            return knex('master_categories').del();
        })
        .then(() => {
            return knex('accounts').del();
        })
        .then(() => {
            return knex('budget_authorized_users').del();
        })
        .then(() => {
            return knex('budgets').del();
        })
        .then(() => {
            return knex('users').del();
        })
        .then(() => {
            return knex('user_authorization_states').del();
        });
    */
};
