let budgetData = [
    { 
        budget_id: 1,
        budget_description: 'A Budget for Testing',
        budget_owner_user: 'tim',
    },
    { 
        budget_id: 2,
        budget_description: 'A Sample Budget',
        budget_owner_user: 'dan',
    }
];

let budgetAuthorizedUserData = [
    {
        budget_id: 1,
        user_name: 'dan',
        user_added_by_user: 'tim'
    },
    {
        budget_id: 2,
        user_name: 'tim',
        user_added_by_user: 'system'
    }
];

let accountData = [
    {
        account_id: 1,
        account_description: 'Account 1 for Budget 1',
        account_budget_id: 1
    },
    {
        account_id: 2,
        account_description: 'Account 2 for Budget 1',
        account_budget_id: 1
    },
    {
        account_id: 3,
        account_description: 'Account 3 for Budget 2',
        account_budget_id: 2
    }
];

exports.seed = function(knex, Promise) {
    return knex('accounts').del()
        .then(() => {
            return knex('budget_authorized_users').del();
        })
        .then(() => {
            return knex('budgets').del();
        })
        .then(() => {
            return knex('budgets')
                .insert(budgetData);
        })
        .then(() => {
            return knex('budget_authorized_users')
                .insert(budgetAuthorizedUserData);
        })
        .then(() => {
            return knex('accounts')
                .insert(accountData);
        });
};