const assert = require("assert");
const signInPage = require("../pageobjects/sign-in_page.js");
const wheelPage = require("../pageobjects/wheel_page.js");
const myTasksPage = require("../pageobjects/my_tasks_page.js");
const settingsPage = require("../pageobjects/settings_page.js");

describe("Registered user flow", () => {
  it("Test: Check user login and redirected to 'My wheel results' page", async () => {
    // Open the sign in page
    await signInPage.open();
    console.log("Sign in page URL:", signInPage.getPageUrl());
    await browser.pause(1000);
    console.log("I am on the Sign in page");

    // Perform login and validate values
    await signInPage.loginAndValidateValues("iamtrueolena@gmail.com", "Helena12");
    await browser.pause(1000);

    // Click the Sign in button
    await signInPage.signInButton.click();
    await browser.pause(1000);

    // Check the user on the wheel page
    await expect(browser).toHaveUrl(wheelPage.getPageUrl());
    await browser.pause(3000);

    // Check the page title "My wheel results" is present and visible

    assert.strictEqual(await wheelPage.myWheelResultsTitle.isDisplayed(), true, "Title 'My wheel results' is present but not visible on the page");

    // Check the Wheel is present and visible
    assert.strictEqual(await wheelPage.balanceWheel.isDisplayed(), true, "Balance Wheel is present but not visible on the page");
  });

  it("Test: Check user can edit 'My wheel results'", async () => {
    // Click the Edit my wheel result button
    await wheelPage.editMyWheelResultsButton.click();
    await browser.pause(1000);

    // Check the page title "Edit my wheel results" is present and visible
    assert.strictEqual(await wheelPage.editMyWheelResultsTitle.isDisplayed(), true, "Title 'Edit my wheel results' is present but not visible on the page");

    // Check the "Edit manually" and "Retake quiz" tabs are present and visible
    assert.strictEqual(await wheelPage.editManuallyTab.isDisplayed(), true, "'Edit my wheel results' tab is present but not visible on the page");
    assert.strictEqual(await wheelPage.retakeQuizTab.isDisplayed(), true, "'Retake quiz' tab is present but not visible on the page");

    // Check the all 8 sliders are present and visible
    assert.strictEqual(await wheelPage.slidersTitle.isDisplayed(), true, "Sliders title are present but not visible on the page");
    assert.strictEqual(await wheelPage.sliders.length, 8, "There are not exactly 8 slider elements on the page");
    console.log("Number of sliders:", await wheelPage.sliders.length);

    await wheelPage.saveChangesButton.click();
    await browser.pause(1000);

    await wheelPage.editMyWheelResultsButton.click();

    await wheelPage.retakeQuizTab.click();
    await browser.pause(1000);

    // Check the all 8 categories + "All" option are present and visible
    assert.strictEqual(await wheelPage.categoriesTitle.isDisplayed(), true, "Categories title are present but not visible on the page");
    assert.strictEqual(await wheelPage.categories.length, 9, "There are not exactly 9 caterogies on the page");
    console.log("Number of categories:", await wheelPage.categories.length);

    assert.strictEqual(await wheelPage.retakeQuizButton.isDisplayed(), true, "'Retake quiz' button is present but not visible on the page");

    // Completed tasks in %
    console.log("completed tasks:", await wheelPage.completedTasksInPercent.getText());
  });

  it("Test: Check My task page", async () => {
    // Go to My task page
    await wheelPage.myTasksButton.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl(myTasksPage.getPageUrl());

    // Check the page title "My tasks" is present and visible
    assert.strictEqual(await myTasksPage.myTasksTitle.isDisplayed(), true, "Title 'My tasks' is present but not visible on the page");

    // Check the "Active" and "Past" tabs are present and visible
    assert.strictEqual(await myTasksPage.activeTab.isDisplayed(), true, "'Active' tab is present but not visible on the page");
    assert.strictEqual(await myTasksPage.pastTab.isDisplayed(), true, "'Past' tab is present but not visible on the page");
  });

  it("Test: Check Setting page", async () => {
    // Go to Settings page
    await settingsPage.settingsButton.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl(settingsPage.getPageUrl());

    // Check the page title "Settings" is present and visible
    assert.strictEqual(await settingsPage.settingsTitle.isDisplayed(), true, "Title 'Settings' is present but not visible on the page");
    assert.strictEqual(await settingsPage.dayToReceiveTasksTitle.isDisplayed(), true, "Title 'Day to receive tasks' is present but not visible on the page");
    assert.strictEqual(await settingsPage.notificationFrequencyTitle.isDisplayed(), true, "Title 'Notification frequency' is present but not visible on the page");

  });

  
});
