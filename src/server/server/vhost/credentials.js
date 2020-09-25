const fs = require('fs')
const cred = {};

const domain = process.env.DOMAIN
const serverRoot = `/etc/letsencrypt/live/${domain}/`

cred.default = {
    // key:'1234',
    // cert:'321',
    key: fs.readFileSync(`${serverRoot}privkey.pem`),
    cert: fs.readFileSync(`${serverRoot}cert.pem`),
  };

const wildcard1 = `mobile.${domain}`;
const rootWc1 = `/etc/letsencrypt/live/${wildcard1}/`
cred.wc1 = {
  hostname: wildcard1,
  key: fs.readFileSync(`${rootWc1}privkey.pem`),
  cert: fs.readFileSync(`${rootWc1}cert.pem`),
};

const wildcard2 = `dev.${domain}`;
const rootWc2 = `/etc/letsencrypt/live/${wildcard2}/`;
cred.wc2 = {
  hostname: wildcard2,
  key: fs.readFileSync(`${rootWc2}privkey.pem`),
  cert: fs.readFileSync(`${rootWc2}cert.pem`),
};

const wildcard3 = `app.${domain}`;
const rootWc3 = `/etc/letsencrypt/live/${wildcard3}-0001/`;
cred.wc3 = {
  hostname: wildcard3,
  key: fs.readFileSync(`${rootWc3}privkey.pem`),
  cert: fs.readFileSync(`${rootWc3}cert.pem`),
};

//console.log(cred.default);
  // const defaultCredential = {
  //   key: fs.readFileSync(
  //     "/etc/letsencrypt/live/enabletech.tech/privkey.pem"
  //   ),
  //   cert: fs.readFileSync(
  //     "/etc/letsencrypt/live/enabletech.tech/cert.pem"
  //   ),
  // };

  // const credentialA = {
  //   hostname: "mobile.enabletech.tech",
  //   key: fs.readFileSync(
  //     "/etc/letsencrypt/live/mobile.enabletech.tech/privkey.pem"
  //   ),
  //   cert: fs.readFileSync(
  //     "/etc/letsencrypt/live/mobile.enabletech.tech/cert.pem"
  //   ),
  // };
  // const credentialB = {
  //   hostname: "app.enabletech.tech",
  //   key: fs.readFileSync(
  //     "/etc/letsencrypt/live/app.enabletech.tech/privkey.pem"
  //   ),
  //   cert: fs.readFileSync(
  //     "/etc/letsencrypt/live/app.enabletech.tech/cert.pem"
  //   ),
  // };
module.exports = cred;
