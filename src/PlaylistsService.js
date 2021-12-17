const {Pool} = require('pg');

/**
 * A class to handle database query to @playlist table
 */
class PlaylistsService {
  /**
   * A constructor function for the class
   */
  constructor() {
    this._pool = new Pool();
  }

  /**
   * A function to get the songs of the playlist
   * @param {string} playlistId the id of the playlist
   * @return {object} rows of the result
   */
  async getSongsInPlaylistById(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer
      FROM playlistsongs
      LEFT JOIN songs ON songs.id = playlistsongs.song_id
      WHERE playlist_id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);

    return result.rows;
  }

  /**
   * A function to get playlist name
   * @param {string} playlistId the id of the playlist
   * @return {string} the name of the playlist
   */
  async getPlaylistNameById(playlistId) {
    const query = {
      text: 'SELECT name FROM playlists WHERE id = $1',
      values: [playlistId],
    };
    const result = await this._pool.query(query);

    return result.rows[0].name;
  }
}

module.exports = PlaylistsService;
