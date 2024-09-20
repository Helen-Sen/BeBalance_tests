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

  get balanceWheel() {
    return $('//div[@class="_root-wheel-container_1qdfz_6"]/canvas');
  }
  get editMyWheelResultsTitle() {
    return $('//h4[text()="Edit my wheel results"]');
  }

  get editManuallyButton() {
    return $('//button[@type="button" and span[text()="Edit manually"]]');
  }

  get retakeQuizButton() {
    return $('//button[@type="button" and span[text()="Retake quiz"]]');
  }

  get saveChangesButton() {
    return $('//button[@type="button" and span[text()="Save changes"]]');
  }

  get slidersTitle() {
    return $('//p[text()="Do you feel any changes in anything? Estimate the fields from 1 to 10"]');
  }

  get sliders() {
    return $$('//div[@class="_scores-container_rw7pp_20"]//input[@id="slider"]');
  }

  get categories() {
    return $$('//div[@class="_categories-container_1dmv3_12"]//div/label');
  }
}

module.exports = new WheelPage();
