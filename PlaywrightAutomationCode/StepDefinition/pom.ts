import { LoginPage } from "../Pages/Loginpage";

import { CredentialsOrangeHRM } from "../Files/TestData.json"
import { Given, Then } from "@cucumber/cucumber";
import { pageFixture } from '../Hoo/Pagefixure';
import { Forgotpass } from "../Pages/Forgotpass";
import { Home } from "../Pages/Home";

let lp: LoginPage
let Fyp: Forgotpass
let hm : Home

Given('I Launch the browser OGH', async function () {

    lp = new LoginPage(pageFixture.page)

    lp.navigateToOrangeHRMApplication(CredentialsOrangeHRM.url)
})

Then('I Launch the Orange HRM application', async function () {

    lp = new LoginPage(pageFixture.page)

    await pageFixture.page.waitForTimeout(5000)

    lp.enterUsername(CredentialsOrangeHRM.Username)

    await pageFixture.page.waitForTimeout(5000)

    lp.enterPssword(CredentialsOrangeHRM.Password)

    await pageFixture.page.waitForTimeout(5000)

    lp.clickLoginButton()

await pageFixture.page.waitForTimeout(5000)

})

// Then('I Launch the Forgot Password application', async function () {
//     lp = new LoginPage(pageFixture.page)
//     Fyp = new Forgotpass(pageFixture.page)

//     await Fyp.forgotYourPasswordLink()

//  Fyp.enterForgotUsername(CredentialsOrangeHRM.Forgotusernametext)
//     await pageFixture.page.waitForTimeout(5000)
//      Fyp.clickCancelForgot()

// });

Then('I Launch the Home Page applicatione', async function () {
lp = new LoginPage(pageFixture.page)
hm = new Home(pageFixture.page)


await hm.homepageadmin()
await pageFixture.page.waitForTimeout(5000)
await pageFixture.page.getByRole('link', { name: 'PIM' }).click()
await pageFixture.page.waitForTimeout(5000)
await pageFixture.page.getByRole('link', { name: 'Add Employee' }).click()
await pageFixture.page.waitForTimeout(5000)
await pageFixture.page.getByRole('textbox', { name: 'First Name' }).fill(CredentialsOrangeHRM.Name)
await pageFixture.page.waitForTimeout(5000)
await pageFixture.page.getByRole('textbox').nth(3).fill(CredentialsOrangeHRM.id)
await pageFixture.page.waitForTimeout(5000)
await pageFixture.page.getByRole('combobox', { name: 'Status' }).click()
await pageFixture.page.waitForTimeout(5000)
await pageFixture.page.getByRole('combobox', { name: 'information' }).click()
await pageFixture.page.waitForTimeout(5000)
await pageFixture.page.getByRole('button', { name: 'Reset' }).click()
await pageFixture.page.waitForTimeout(5000)



});
