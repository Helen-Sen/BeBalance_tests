const Page = require("./page");

class MyTasksPage extends Page {
  path = "tasks";
  open() {
    return super.open(this.path);
  }
 
}

module.exports = new MyTasksPage();
