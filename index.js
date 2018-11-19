

const nodemailer = require('nodemailer');
const fs = require('fs');

const GM_USER = 'USER GMAIL USER';
const GM_PASSWORD = 'USE GMAIL PASSWORD';
const SUBJECT = 'CHANGE TO YOUR SUBJECT';
const FROM = 'CHANGE TO FROM EMAIL';
const BASE_PATH = 'CHANGE TO BASE PATH';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GM_USER,
    pass: GM_PASSWORD,
  },
});

const files = fs.readdirSync('./source');
const notValidList = [];
const promiseList = [];

for (let i = 0; i < files.length; i++) {
  if (files[i]) {
    const matches = files[i].split(/_(.+)/);
    if (matches.length > 0) {
      const email = matches[1];
      const fullUrl = `${BASE_PATH}/${files[i]}`;
      const mailOptions = {
        from: FROM,
        to: email,
        subject: SUBJECT,
        html: `<p>${fullUrl}</p>`,
      };

      promiseList.push(transporter.sendMail(mailOptions));
    } else {
      notValidList.push(files[i]);
    }
  }
}

// sending all emails
Promise.all(promiseList)
  .then(() => {
  })
  .catch((values) => {
    console.log(values);
  });

console.log(notValidList);
