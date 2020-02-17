const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/screams", {
      target:
        "https://asia-northeast1-socialape-5ae20.cloudfunctions.net/api/screams"
    })
  );
};
