const {Pool} = require('pg');

/**
 * A class to handle database query to @users table
 */
class UsersService {
  /**
   * A constructor function for the class
   */
  constructor() {
    this._pool = new Pool();
  }

  /**
   * A function to get the name of the user
   * @param {string} userId the id of the user
   * @return {string} the name of the user
   */
  async getNameOfUsernameById(userId) {
    const query = {
      text: 'SELECT username FROM users WHERE id = $1',
      values: [userId],
    };
    const result = await this._pool.query(query);

    return result.rows[0].username;
  }
}

module.exports = UsersService;
