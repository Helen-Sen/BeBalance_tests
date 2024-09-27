const Page = require("./page");

class AIAssistantPage extends Page {
  path = "chat";

  open() {
    return super.open(this.path);
  }

  get helloMessage() {
    return $('//div/p[contains(text(), "Hello")]');
  }

  get wheelMessage() {
    return $('//div/p[contains(text(), "how your wheel")]');
  }
  get questionMessage() {
    return $('//div/p[contains(text(), "Do you want to work on 3 fields")]');
  }

  get yesLowestButton() {
    return $('//button[.//span[text()="Yes, 3 lowest"]]');
  }

  get noSomethingElseButton() {
    return $('//button[.//span[text()="No, something else"]]');
  }

  get yesUsersAnswer() {
    return $('//div[text()="Yes, 3 lowest"]');
  }

  get confirmQuestion() {
    return $('//div/p[contains(text(), "How do you like these tasks?")]');
  }

  get addTaskButton() {
    return $('//button[.//span[text()="add these tasks"]]');
  }

  get explainTaskButton() {
    return $('//button[.//span[text()="explain these tasks"]]');
  }

  get doesntLikeButton() {
    return $('//button[.//span[contains(text(), "like the tasks")]]');
  }

  get explanationMessage() {
    return $('//div[contains(text(), "tasks with explanations.")]');
  }

  get finalMessage() {
    return $('//div[contains(text(), "Way to go!")]');
  }
}

module.exports = new AIAssistantPage();
