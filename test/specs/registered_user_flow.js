const signInPage = require("../pageobjects/sign-in_page.js");
const wheelPage = require("../pageobjects/wheel_page.js");
const myTasksPage = require("../pageobjects/my_tasks_page.js");

describe("login tests", () => {
  it("Test: Check Login", async () => {
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

    // Go to my task page
    await signInPage.myTasksButton.click();
    await browser.pause(1000);
    await expect(browser).toHaveUrl(myTasksPage.getPageUrl());
  });
});
