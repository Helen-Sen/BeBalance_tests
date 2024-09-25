const Page = require("./page");

class ProfilePage extends Page {
  path = "profile";

  open() {
    return super.open(this.path);
  }
  get profileTitle() {
    return $('//h4[text()="Profile"]');
  }

  get imageAvatar() {
    return $('//img[contains(@class, "_user-avatar_1lmpf_9")]');
  }

  get uploadAvatarButton() {
    return $('//button[@type="button" and span[text()="UPLOAD"]]');
  }

  get storedEmail() {
    return $('//input[@name="email"]');
  }

  get storedName() {
    return $('//input[@name="name"]');
  }

  get savePersonalDataButton() {
    return $("//form[@class='_form_7duju_1']//button[@class='_btn_j6zzd_1 _primary-button_j6zzd_16' and span[text()='SAVE']]");
  }

  get saveUpdatedPasswordButton() {
    return $("//form[@class='_form_l9hbg_1']//button[@class='_btn_j6zzd_1 _primary-button_j6zzd_16' and span[text()='SAVE']]");
  }

  get logOutButton() {
    return $("//button[@type='button' and span[text() = 'LOG OUT']]");
  }

  get confirmLogoutPopup() {
    return $("//div[@class='_contents-container_1tpch_19']");
  }

  get confirmYesButton() {
    return $("//button[@type='button' and span[text() = 'Yes']]");
  }

  get confirmNoButton() {
    return $("//button[@type='button' and span[text() = 'No']]");
  }
}

module.exports = new ProfilePage();
