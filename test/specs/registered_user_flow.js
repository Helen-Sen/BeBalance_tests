const assert = require("assert");
const signInPage = require("../pageobjects/sign-in_page.js");
const wheelPage = require("../pageobjects/wheel_page.js");
const myTasksPage = require("../pageobjects/my_tasks_page.js");

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

    // assert.strictEqual(await wheelPage.myWheelResultsTitle.isExisting(), true, "Title 'My wheel results' is not present on the page");
    assert.strictEqual(await wheelPage.myWheelResultsTitle.isDisplayed(), true, "Title 'My wheel results' is present but not visible on the page");

    // Check the Wheel is present and visible
    // assert.strictEqual(await wheelPage.balanceWheel.isExisting(), true, "Balance Wheel is not present on the page");
    assert.strictEqual(await wheelPage.balanceWheel.isDisplayed(), true, "Balance Wheel is present but not visible on the page");

    // // Go to my task page
    // await signInPage.myTasksButton.click();
    // await browser.pause(1000);
    // await expect(browser).toHaveUrl(myTasksPage.getPageUrl());
  });

  it("Test: Check user can edit 'My wheel results'", async () => {
    // Click the Edit my wheel result button
    await wheelPage.editMyWheelResultsButton.click();
    await browser.pause(1000);

    // Check the page title "Edit my wheel results" is present and visible

    // assert.strictEqual(await wheelPage.editMyWheelResultsTitle.isExisting(), true, "Title 'Edit my wheel results' is not present on the page");
    assert.strictEqual(await wheelPage.editMyWheelResultsTitle.isDisplayed(), true, "Title 'Edit my wheel results' is present but not visible on the page");

    // Check the "Edit manually" and "Retake quiz" buttons are present and visible

    // assert.strictEqual(await wheelPage.editManuallyButton.isExisting(), true, "'Edit my wheel results' button is not present on the page");
    assert.strictEqual(await wheelPage.editManuallyButton.isDisplayed(), true, "'Edit my wheel results' button is present but not visible on the page");

    // assert.strictEqual(await wheelPage.retakeQuizButton.isExisting(), true, "'Retake quiz' button is not present on the page");
    assert.strictEqual(await wheelPage.retakeQuizButton.isDisplayed(), true, "'Retake quiz' button is present but not visible on the page");

    // Check the sliders are present and visible
    // assert.strictEqual(await wheelPage.slidersTitle.isExisting(), true, "Sliders title is not present on the page");
    assert.strictEqual(await wheelPage.slidersTitle.isDisplayed(), true, "Sliders title button is present but not visible on the page");

    // Log the number of input elements found
    console.log("Number of sliders:", await wheelPage.sliders.length);

    assert.strictEqual(await wheelPage.sliders.length, 8, "There are not exactly 8 slider elements on the page");

    await wheelPage.saveChangesButton.click();
    await browser.pause(1000);

    await wheelPage.editMyWheelResultsButton.click();

    await wheelPage.retakeQuizButton.click();
     await browser.pause(1000);

    console.log("Number of categories:", await wheelPage.categories.length);
  });
});
