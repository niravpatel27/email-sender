

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');



const GM_USER = 'CHANGE';
const GM_PASSWORD = 'CHANGE';
const SUBJECT = 'CHANGE TO YOUR SUBJECT';
const FROM = 'CHANGE';

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

  if (files[i] && path.extname(files[i])==='.jpg') {
    const matches = files[i].split(/_/);
    
    if (matches.length > 0) {
      const email = matches[2].replace('.jpg','');
      const mailOptions = {
        from: FROM,
        to: email,
        subject: SUBJECT,
        attachments: [{
            filename: files[i],
            path: `./source/${files[i]}`
        }]
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
