const Page = require("./page");

class SignInPage extends Page {
  path = "sign-in";

  open() {
    return super.open(this.path);
  }

  get inputEmail() {
    return $('//input[@name="email"]');
  }

  get inputPassword() {
    return $('//input[@name="password"]');
  }

  async loginAndValidateValues(email, password) {
    await this.inputEmail.setValue(email);
    const enteredEmailValue = await this.inputEmail.getValue();
    await expect(enteredEmailValue).toBe(email);

    await this.inputPassword.setValue(password);
    const enteredPasswordValue = await this.inputPassword.getValue();
    await expect(enteredPasswordValue).toBe(password);
  }

  get signInButton() {
    return $("//button[@type='submit' and span[text()='SIGN IN']]");
  }
}

module.exports = new SignInPage();
