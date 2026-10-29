import { expect, Page } from "playwright/test";
import { pageFixture } from "../Hoo/Pagefixure";

export class LoginPage{

    constructor(public page : Page){

        this.page = page
    }
public Elements = {

        orangeHRMLogoUsingAltText : "company-branding",
        OrangeHRMLogoUsingCssSelector:".orangehrm-login-branding",
        usernameTextbox :"//*[@name='username']",
        passwordTextbox :"//*[@name='password']",
        loginButton :"//*[@type='submit']",
        loginText : "//*[text()='Login']",
}
 async navigateToOrangeHRMApplication(url : string){

        await pageFixture.page.goto(url)

        await pageFixture.page.waitForLoadState('load',{timeout:5000})

        console.log(await pageFixture.page.title())

        console.log(await pageFixture.page.url())
    }


    async verifyWebElementsInTheLoginPage(){

        expect(await pageFixture.page.getByAltText(this.Elements.orangeHRMLogoUsingAltText)).toBeVisible()

        expect(await pageFixture.page.locator(this.Elements.OrangeHRMLogoUsingCssSelector)).toBeVisible()

        expect(await pageFixture.page.locator(this.Elements.usernameTextbox)).toBeVisible()

        expect(await pageFixture.page.locator(this.Elements.passwordTextbox)).toBeVisible()

        expect(await pageFixture.page.locator(this.Elements.loginButton)).toBeVisible()
    }
        async enterUsername(username :string){

        await pageFixture.page.locator(this.Elements.usernameTextbox).fill(username)
    }

    async enterPssword(password :string){

        await pageFixture.page.locator(this.Elements.passwordTextbox).fill(password)
    }

    async clickLoginButton(){

        await pageFixture.page.locator(this.Elements.loginButton).click()
    }
      
  

}
