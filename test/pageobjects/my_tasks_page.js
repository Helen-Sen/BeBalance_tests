const Page = require("./page");

class MyTasksPage extends Page {
  path = "tasks";

  open() {
    return super.open(this.path);
  }
  get myTasksTitle() {
    return $('//h4[text()="My Tasks"]');
  }

  get activeTab() {
    return $('//button[@type="button" and span[text()="Active"]]');
  }

  get pastTab() {
    return $('//button[@type="button" and span[text()="Past"]]');
  }

  get taskCategories() {
    return $$('//div[contains(@class, "_content-container_")]');
  }

   get deadlineTasks() {
    return $$('//div[contains(@class, "_countdown_")]');
  }
}




module.exports = new MyTasksPage();
