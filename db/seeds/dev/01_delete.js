var knexCleaner = require('knex-cleaner');

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knexCleaner.clean(knex);

    // or

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
