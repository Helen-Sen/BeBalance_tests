const Page = require("./page");

class WheelPage extends Page {
  path = "";

  open() {
    return super.open(this.path);
  }

  get myWheelResultsTitle() {
    return $('//h4[text()="My wheel results"]');
  }

  get editMyWheelResultsButton() {
    return $('//button[@type="button" and span[text()="edit my wheel results"]]');
  }

  get editMyWheelResultsTitle() {
    return $('//h4[text()="Edit my wheel results"]');
  }

  get editManuallyTab() {
    return $('//button[@type="button" and span[text()="Edit manually"]]');
  }

  get retakeQuizTab() {
    return $('//button[@type="button" and span[text()="Retake quiz"]]');
  }

  get saveChangesButton() {
    return $('//button[@type="button" and span[text()="Save changes"]]');
  }

  get slidersTitle() {
    return $('//p[text()="Do you feel any changes in anything? Estimate the fields from 1 to 10"]');
  }

  get sliders() {
    return $$('//div[@class="_container_zu8ph_1"]//input[@id="slider"]');
  }

  get categoriesTitle() {
    return $('//span[@class="_header_nkgmo_6"]');
  }

  get categories() {
    return $$('//div[@class="_categories-container_1dmv3_12"]//div/label');
  }

  get retakeQuizButton() {
    return $('//button[.//span[text()="retake quiz"]]');
  }

  get completedTasksInPercent() {
    return $('//p[@class = "_percentage_1nwqb_23"]');
  }
}

module.exports = new WheelPage();
