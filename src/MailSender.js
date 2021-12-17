const nodemailer = require('nodemailer');

/**
 * A class to send emails
 */
class MailSender {
  /**
   * A constructor function for the class
   */
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  /**
   * A function to send emails
   * @param {string} targetEmail who will receive this email?
   * @param {string} userName the name of the user
   * @param {string} playlistName the name of the playlist
   * @param {JSON.stringify} content what content to be attached to sent email
   * @return {object} the status of the sent email
   */
  sendEmail(targetEmail, userName, playlistName, content) {
    const message = {
      from: 'Open Music API',
      to: targetEmail,
      subject: `Ekspor Lagu Playlist ${playlistName} - openmusic`,
      text: `Hai ${userName}, kamu telah meminta untuk mengekspor playlist kamu,
ini dia kami lampirkan lagu di dalam playlist yang kamu pilih.\n\n
Terima kasih telah menggunakan layanan open music :D\n\n\n\n
      openmusic\n\n
      Keep the music open just for you.`,
      attachments: [
        {
          filename: `playlist-${playlistName}.openmusic.json`,
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
