const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 25,
  secure: false,
});

transporter.sendMail(
  {
    from: 'test@example.com',
    to: 'qaTestUser_zsyy@example.com',
    subject: 'Test email iz nodemailer-a',
    text: 'Ovo je test poruka.',
  },
  (err, info) => {
    if (err) {
      console.error('Greška:', err);
    } else {
      console.log('Poslato:', info);
    }
  }
);
