const assert = require("assert");
const signInPage = require("../pageobjects/sign-in_page.js");
const wheelPage = require("../pageobjects/wheel_page.js");
const myTasksPage = require("../pageobjects/my_tasks_page.js");
const settingsPage = require("../pageobjects/settings_page.js");
const profilePage = require("../pageobjects/profile_page.js");
const aiAssistantPage = require("../pageobjects/ai_assistant_page.js");

const testData = require("../test_data.json");

const userName = testData.user.name;
const email = testData.user.email;
const password = testData.user.password;
let numberOfActiveTasks;
let numberOfTasksRequsted;

describe("Registered user flow", () => {
  it("Test: Check user login and redirected to 'My wheel results' page", async () => {
    // Open the sign in page
    await signInPage.open();
    await browser.maximizeWindow();
    console.log("Sign in page URL:", signInPage.getPageUrl());
    await browser.pause(1000);

    // Perform login and validate values
    await signInPage.loginAndValidateValues(email, password);
    await browser.pause(1000);

    // Click the Sign in button
    await signInPage.signInButton.click();
    await browser.pause(1000);

    // Check the user on the wheel page
    await expect(browser).toHaveUrl(wheelPage.getPageUrl());
    await browser.pause(3000);

    // Check the page title "My wheel results" is present and visible
    assert(await wheelPage.myWheelResultsTitle.isDisplayed(), "Title 'My wheel results' is not displayed on the page");

    // Check the Wheel is present and visible
    assert(await wheelPage.balanceWheel.isDisplayed(), "Balance Wheel is not displayed on the page");
  });

  it("Test: Check 'My wheel results' page contains edit controls", async () => {
    // Click the Edit my wheel result button
    await wheelPage.editMyWheelResultsButton.click();
    await browser.pause(1000);

    // Check the page title "Edit my wheel results" is present and visible
    assert(await wheelPage.editMyWheelResultsTitle.isDisplayed(), "Title 'Edit my wheel results' is not displayed on the page");

    // Check the "Edit manually" and "Retake quiz" tabs are present and visible
    assert(await wheelPage.editManuallyTab.isDisplayed(), "'Edit my wheel results' tab is not displayed on the page");
    assert(await wheelPage.retakeQuizTab.isDisplayed(), "'Retake quiz' tab is not displayed on the page");
    await browser.pause(1000);

    // Check the all 8 sliders are present and visible
    assert(await wheelPage.slidersTitle.isDisplayed(), "Sliders title are present but not visible on the page");
    assert.strictEqual(await wheelPage.sliders.length, 8, "There are not exactly 8 slider elements on the page");
    console.log("Number of sliders:", await wheelPage.sliders.length);
    
    assert(await wheelPage.retakeQuizTab.isClickable(), "'Retake Quiz Tab' is not clickable");

    await wheelPage.retakeQuizTab.click();
    await browser.pause(1000);

    // Check the all 8 categories + "All" option are present and visible
    assert(await wheelPage.categoriesTitle.isDisplayed(), "Categories title are present but not visible on the page");
    assert.strictEqual(await wheelPage.categories.length, 9, "There are not exactly 9 caterogies on the page");
    console.log("Number of categories:", await wheelPage.categories.length);

    assert(await wheelPage.retakeQuizButton.isDisplayed(), true, "'Retake quiz' button is not displayed on the page");

    // Completed tasks in %
    console.log("completed tasks:", await wheelPage.completedTasksInPercent.getText());
  });

  it("Test: Check 'My task' page main controls", async () => {
    // Go to My task page
    await wheelPage.myTasksButton.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl(myTasksPage.getPageUrl());

    // Check the page title "My tasks" is present and visible
    assert(await myTasksPage.myTasksTitle.isDisplayed(), "Title 'My tasks' is not displayed on the page");

    // Check the "Active" and "Past" tabs are present and visible
    assert(await myTasksPage.activeTab.isDisplayed(), "'Active' tab is not displayed on the page");
    assert(await myTasksPage.pastTab.isDisplayed(), "'Past' tab is not displayed on the page");

    // Check the task(s)
    numberOfActiveTasks = await myTasksPage.taskElements.length;
    if (numberOfActiveTasks > 0) {
      console.log("User has %d active tasks", numberOfActiveTasks);

      const taskCategoriesElements = await myTasksPage.taskCategories;
      const taskCategoryNames = [];

      for (const categoryElement of taskCategoriesElements) {
        const categoryName = await categoryElement.getText();
        taskCategoryNames.push(categoryName);
      }
      console.log("User has active task for the next categories:", taskCategoryNames);
    } else {
      console.log("User doesn't have any active tasks");
    }

    await myTasksPage.pastTab.click();
    await browser.pause(1000);
    const numberOfPastTasks = await myTasksPage.taskElements.length;
    if (numberOfActiveTasks > 0) {
      console.log("User has %d past tasks", numberOfPastTasks);

      const taskCategoriesElements = await myTasksPage.taskCategories;
      const taskCategoryNames = [];

      for (const categoryElement of taskCategoriesElements) {
        const categoryName = await categoryElement.getText();
        taskCategoryNames.push(categoryName);
      }
      console.log("User has past task for the next categories:", taskCategoryNames);
    } else {
      console.log("User doesn't have any past tasks yet");
    }
  });

  it("Test: Check 'AI ' page main controls", async () => {
    // Go to AI Assistant page
    await aiAssistantPage.AIAssistantButton.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl(aiAssistantPage.getPageUrl());

    // Check messages from AI
    assert(await aiAssistantPage.helloMessage.isDisplayed(), "'Hello message' is not displayed on the page");
    assert(await aiAssistantPage.wheelMessage.isDisplayed(), "'Wheel results message' is not displayed on the page");
    assert(await aiAssistantPage.questionMessage.isDisplayed(), "'Question message' is not displayed on the page");

    // Check buttons
    assert(await aiAssistantPage.yesLowestButton.isDisplayed(), "'Yes, 3 lowest' button is not displayed on the page");
    assert(await aiAssistantPage.noSomethingElseButton.isDisplayed(), "'No, something else' button is not displayed on the page");

    // Agree to get 3 tasks for categories with the lowest score
    await aiAssistantPage.yesLowestButton.click();
    await browser.pause(2000);
    assert(await aiAssistantPage.yesUsersAnswer.isDisplayed(), "'Yes, 3 lowest' users' answer is not displayed on the page");
    await browser.pause(25000);
    numberOfTasksRequsted = 3;
    numberOfTasksAndExplanationsRequsted = numberOfTasksRequsted * 2;

    assert.strictEqual(await aiAssistantPage.taskElements.length, numberOfTasksRequsted, "There are not exactly 3 tasks on the page");
    console.log("user got %d tasks", await aiAssistantPage.taskElements.length);

    // Check the next AI question and 3 buttons with 3 options of answers
    assert(await aiAssistantPage.confirmQuestion.isDisplayed(), "'How do you like these tasks?' question is not displayed on the page");
    assert(await aiAssistantPage.addTaskButton.isDisplayed(), "'Add these tasks' button is not displayed on the page");
    assert(await aiAssistantPage.explainTaskButton.isDisplayed(), "'Explain these tasks' button is not displayed on the page");
    assert(await aiAssistantPage.doesntLikeButton.isDisplayed(), "'I don't like the tasks' button is not displayed on the page");

    // User get tasks explanation agreed with all tasks
    await aiAssistantPage.explainTaskButton.click();
    await browser.pause(30000);
    assert.strictEqual(await aiAssistantPage.taskElements.length, numberOfTasksAndExplanationsRequsted, "There are not exactly 3 tasks and 3 explanations on the page");
    assert(await aiAssistantPage.confirmQuestion.isDisplayed(), "'How do you like these tasks?' question is not displayed on the page");
    assert(await aiAssistantPage.addTaskButton.isDisplayed(), "'Add these tasks' button is not displayed on the page");
    assert(await aiAssistantPage.doesntLikeButton.isDisplayed(), "'I don't like the tasks' button is not displayed on the page");

    await aiAssistantPage.addTaskButton.click();
    assert(await aiAssistantPage.finalMessage.isDisplayed(), "'Way to go! I'll check up on you later.' message is not displayed on the page");

    // Check that all 3 tasks have been added to 'My tasks' page
    await wheelPage.myTasksButton.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl(myTasksPage.getPageUrl());
    assert.strictEqual(await myTasksPage.taskElements.length, numberOfActiveTasks + numberOfTasksRequsted, "3 tasks have not been added to 'My tasks' page");
    console.log("User has %d active tasks after AI conversation", await myTasksPage.taskElements.length);
  });

  it("Test: Check 'Setting' page main controls", async () => {
    // Go to Settings page
    await settingsPage.settingsButton.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl(settingsPage.getPageUrl());

    // Check the page "Settings" title  is present and visible
    assert(await settingsPage.settingsTitle.isDisplayed(), "Title 'Settings' is not displayed on the page");

    // Check the "Day to receive tasks" and "Notification frequency" titles  are present and visible
    assert(await settingsPage.dayToReceiveTasksTitle.isDisplayed(), "Title 'Day to receive tasks' is not displayed on the page");
    assert(await settingsPage.notificationFrequencyTitle.isDisplayed(), "Title 'Notification frequency' is not displayed on the page");
  });

  it("Test: Check Profile page main controls", async () => {
    // Go to Profile page
    await profilePage.userNameLink.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl(profilePage.getPageUrl());

    // Check the page "Profile" title  is present and visible
    assert(await profilePage.profileTitle.isDisplayed(), "Title 'Profile' is not displayed on the page");

    // Check the avatar and "upload" buttons are present and visible
    assert(await profilePage.imageAvatar.isDisplayed(), "Avatar' is not displayed on the page");
    assert(await profilePage.uploadAvatarButton.isDisplayed(), "Upload' button is not displayed on the page");

    //  Check email saved in profile is correct.
    assert.strictEqual(await profilePage.storedEmail.getValue(), email, "The stored email should match the test data email");

    // Check the displayed user name,  stored name and test data name match each other
    const storedName = await profilePage.storedName.getValue();
    const displayedUsername = await profilePage.userNameLink.getText();
    assert.strictEqual(storedName, userName, "Stored name and test data name should match each other");
    assert.strictEqual(displayedUsername, userName, "Displayed user name and test data name should match each other");

    // Check the "Save" buttons for personal data and updated password are present and visible
    assert(await profilePage.savePersonalDataButton.isDisplayed(), "Save'button for personal data is not displayed on the page");
    assert(await profilePage.saveUpdatedPasswordButton.isDisplayed(), "Save'button for update password is not displayed on the page");

    // Check the "Log out" button is present and visible
    assert(await profilePage.logOutButton.isDisplayed(), "Log out'button is not displayed on the page");

    // Check user can Log out
    await profilePage.logOutButton.click();
    assert(await profilePage.confirmLogoutPopup.isDisplayed(), "Confirm Log out pop up should be displayed on the page");
    await profilePage.confirmYesButton.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl(signInPage.getPageUrl());
  });
});
