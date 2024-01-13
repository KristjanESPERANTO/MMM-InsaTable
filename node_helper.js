const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
  start: function () {
    console.log("MMM-InsaTable helper started...");
  },

  getJson: function (url) {
    var self = this;

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        // Send the json data back with the url to distinguish it on the receiving part
        self.sendSocketNotification("MMM-InsaTable_JSON_RESULT", {
          url: url,
          data: json
        });
      });
  },

  //Subclass socketNotificationReceived received.
  socketNotificationReceived: function (notification, url) {
    if (notification === "MMM-InsaTable_GET_JSON") {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxx: " + url);
      this.getJson(url);
    }
  }
});
