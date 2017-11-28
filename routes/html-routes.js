var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/user.html"));
  });

  // cms route loads cms.html
  app.get("/activity", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/addActivity.html"));
  });

  app.get('/calculator/', function(req, res){
	res.sendFile(path.join(__dirname, "../public/results.html"));
	
})


};