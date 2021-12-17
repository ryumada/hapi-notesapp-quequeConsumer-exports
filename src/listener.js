/**
 * A class for identifying the services used by the consumer
 */
class Listener {
  /**
   * @param {instance} playlistsService the service to get playlist from
   * the database
   * @param {*} usersService the service to ge user details
   * @param {*} mailSender the service to send the email to the user
   */
  constructor(playlistsService, usersService, mailSender) {
    this._playlistsService = playlistsService;
    this._usersService = usersService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  /**
   * A function to listen RabbitMQ Server
   * @param {object} message the message object from RabbitMQ server
   */
  async listen(message) {
    try {
      const {userId, playlistId, targetEmail} = JSON
          .parse(message.content.toString());

      const songs = await this._playlistsService
          .getSongsInPlaylistById(playlistId);
      const playlistName = await this._playlistsService
          .getPlaylistNameById(playlistId);
      const nameUser = await this._usersService.getNameOfUsernameById(userId);
      const result = await this._mailSender
          .sendEmail(
              targetEmail,
              nameUser,
              playlistName,
              JSON.stringify(songs),
          );

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
