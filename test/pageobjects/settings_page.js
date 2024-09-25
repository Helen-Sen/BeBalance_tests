const Page = require("./page");

class SettingsPage extends Page {
  path = "settings";

  open() {
    return super.open(this.path);
  }

  get settingsTitle() {
    return $('//h1[text()="Settings"]');
  }

  get dayToReceiveTasksTitle() {
    return $('//p[text()="Days to receive tasks"]');
  }

  get notificationFrequencyTitle() {
    return $('//span[text()="Notification frequency"]');
  }
  get saveChangesButton() {
    return $('//button[@type="submit" and span[text()="save changes"]]');
  }
}

module.exports = new SettingsPage();
