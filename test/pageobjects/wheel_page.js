const Page = require("./page");

class WheelPage extends Page {
  path = "";
  open() {
    return super.open(this.path);
  }
};

module.exports = new WheelPage();