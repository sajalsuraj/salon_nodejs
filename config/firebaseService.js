var admin = require("firebase-admin");

var initializedApp = admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccountKey.json")),
});

module.exports = initializedApp;
