import { expect, Page } from "playwright/test";
import { pageFixture } from "../Hoo/Pagefixure";

export class Forgotpass {

    constructor(public page: Page) {

        this.page = page
    }
    public Elements = {


    forgotYourPasswordLink: "//*[text()='Forgot your password? ']",
    Forgotusernametext: "//*[@name='username']",
        Cancelforgot: "//*[@type='button']",
        resetPasswordButton: "//*[@type='submit']",

    }

    async forgotYourPasswordLink() {

        await pageFixture.page.locator(this.Elements.forgotYourPasswordLink).click()
    }



    async enterForgotUsername(username: string) {
        await pageFixture.page.locator(this.Elements.Forgotusernametext).fill(username)
    }

    async clickCancelForgot() {
        await pageFixture.page.locator(this.Elements.Cancelforgot).click()
    }

    async resetPassword() {
        await pageFixture.page.locator(this.Elements.resetPasswordButton).click()
    }

}
