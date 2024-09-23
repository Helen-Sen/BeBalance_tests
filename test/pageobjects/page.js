const { browser } = require("@wdio/globals");

let baseUrl = "http://bebalance.eu-central-1.elasticbeanstalk.com";

module.exports = class Page {
  path = "";

  open(path) {
    this.path = path;
    return browser.url(`${baseUrl}/${path}`);
  }

  getPageUrl() {
    return `${baseUrl}/${this.path}`;
  }

  get myTasksButton() {
    return $("//*[@href='/tasks']");
  }

  get settingsButton() {
    return $("//*[@href='/settings']");
  }

  get myWheelButton() {
    return $("//*[@href='/']");
  }

  get userNameLink() {
    return $("//span[@class='_username_crmnu_20']")
  }

  
};
