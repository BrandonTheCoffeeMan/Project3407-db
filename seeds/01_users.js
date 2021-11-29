
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'New User 1',
          tag: 'OfficialDeeno',
          password: '123',
        },
        {
          username: 'New User 2',
          tag: 'OfficialBdubs',
          password: '456'
        }
      ]);
    });
};
