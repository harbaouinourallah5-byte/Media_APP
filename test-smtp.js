const nodemailer = require('nodemailer');

const t = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'medinabeauty133@gmail.com',
    pass: 'ulzn qhtc coga dpzl'
  }
});

t.verify((err, success) => {
  if (err) {
    console.error("ERROR:", err.message);
  } else {
    console.log('Server is ready');
  }
});
