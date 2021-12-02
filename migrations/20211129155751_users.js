
exports.up = function(knex) {
    return knex.schema
        .createTable('users', (table) => {
            table.increments('user_id')
                .notNullable()
                .primary()
            table.string('email')
                .notNullable()
                .unique()
            table.string('username', 50)
                .notNullable()
            table.string('tag', 15)
                .notNullable()
                .unique()
            table.string('password', 255)
                .notNullable()
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users');
};
