import { expect, Page } from "playwright/test";
import { pageFixture } from "../Hoo/Pagefixure";

export class Home{

    constructor(public page : Page){

        this.page = page
    }
public Elements = {

HomepageAdmin: "//*[text()='Admin']",
HomepagePIM: "//*[text()='PIM']",
Addemployee:"//*[text()='Employee Information']",
Name:"//*[@placeholder='Type for hints...']",
id:"//*[@class='oxd-input oxd-input--active']",
status:"//*[dropdown='Status']",
infor:"//*[text()='Current Employees Only']",
reset:"//*[text()='Reset']"
}
async homepageadmin(){
   await pageFixture.page.locator(this.Elements.HomepageAdmin).click()
   await pageFixture.page.waitForTimeout(5000)
   await pageFixture.page.locator(this.Elements.HomepagePIM).click()
   await pageFixture.page.waitForTimeout(5000)
   await pageFixture.page.locator(this.Elements.Addemployee).click() 
   await pageFixture.page.waitForTimeout(5000)
   await pageFixture.page.locator(this.Elements.Name).fill("Swapna")
   await pageFixture.page.waitForTimeout(5000)
   await pageFixture.page.locator(this.Elements.id).fill("1234")
   await pageFixture.page.waitForTimeout(5000)
   await pageFixture.page.locator(this.Elements.status).click()
   await pageFixture.page.waitForTimeout(5000)
   await pageFixture.page.locator(this.Elements.infor).click()
   await pageFixture.page.waitForTimeout(5000)
   await pageFixture.page.locator(this.Elements.reset).click()   
}
}