"use strict";

Module.register("MMM-InsaTable", {
  jsonData: null,

  // Default module config.
  defaults: {
    url: "",
    arrayName: null,
    noDataText: "Json data is not of type array! Maybe the config arrayName is not used and should be, or is configured wrong.",
    keepColumns: [],
    size: 0,
    tryFormatDate: false,
    updateInterval: 15000,
    animationSpeed: 500,
    descriptiveRow: null,
    company: ""
  },

  start: function () {
    this.getJson();
    this.scheduleUpdate();
  },

  scheduleUpdate: function () {
    let self = this;
    setInterval(function () {
      self.getJson();
    }, this.config.updateInterval);
  },

  // Request node_helper to get json from url
  getJson: function () {
    this.sendSocketNotification("MMM-InsaTable_GET_JSON", this.config.url);
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "MMM-InsaTable_JSON_RESULT") {
      // Only continue if the notification came from the request we made
      // This way we can load the module more than once
      if (payload.url === this.config.url) {
        this.jsonData = payload.data;
        this.updateDom(this.config.animationSpeed);
      }
    }
  },

  // Override dom generator.
  getDom: function () {
    let wrapper = document.createElement("article");
    wrapper.className = "MMM-InsaTable_article_container";

    if (!this.jsonData) {
      wrapper.innerHTML = "Awaiting json data...";
      return wrapper;
    }

    let items = [];
    if (this.config.arrayName) {
      items = this.jsonData[this.config.arrayName];
    } else {
      items = this.jsonData;
    }

    // Check if items is of type array
    if (!(items instanceof Array)) {
      wrapper.innerHTML = this.config.noDataText;
      return wrapper;
    }

    let now = new Date();
    let isDataAvailable = false;

    items.forEach(element => {
      if (element.company == this.config.company || this.config.company == "") {
        let endTime = new Date(element.eDate + " " + element.eTime);
        if (now < endTime) {
          //Log.log(element);
          let article = this.getArticle(element);
          wrapper.appendChild(article);
          isDataAvailable = true;
        }
      }
    });

    if (!isDataAvailable) wrapper.innerText = "Aktuell stehen keine Verkehrsmeldungen zur Verfügung.";

    return wrapper;
  },

  getArticle: function (jsonObject) {
    let article = document.createElement("article");
    article.className = "MMM-InsaTable_article";

    if (jsonObject.head) {
      let head = document.createElement("h2");
      head.innerText = jsonObject.head;
      article.appendChild(head);
    }

    if (jsonObject.affectedProduct) {
      let products = document.createElement("h3");
      for (let i = 0; i < jsonObject.affectedProduct.length; i++) {
        if (i > 0) { products.innerText = products.innerText + ", " };
        products.innerText = products.innerText + jsonObject.affectedProduct[i].name;
      }
      products.innerText = "Betroffene Linie(n): " + products.innerText;
      article.appendChild(products);
    }

    if (jsonObject.text) {
      let text = document.createElement("p");
      text.innerText = jsonObject.text.replaceAll("<br />", "  ");
      article.appendChild(text);
    }

    return article;
  }

});
