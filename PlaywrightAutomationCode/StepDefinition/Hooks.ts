import { BeforeAll, AfterAll, After, Before, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page, expect } from '@playwright/test';
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { pageFixture } from "../Hoo/Pagefixure";
import path from 'path';
import process from 'process';

let page: Page;
let browser: Browser;
let context: BrowserContext;

setDefaultTimeout(60000) // 60 seconds, if any step takes more than 60 seconds, it will be failed due to timeout error

BeforeAll(async function () {

    browser = await chromium.launch({
        headless: false,
        args: ["--start-maximized"],
    });

    console.log("BeforeAll")

});

Before(async function () {

    context = await browser.newContext({
        recordVideo: { dir: 'test-result/videos' },
        viewport: null
    });

    // 3. Start tracing before navigating or creating a page
    await context.tracing.start({
        screenshots: true,
        snapshots: true,
        sources: true
    });

    page = await context.newPage();

    pageFixture.page = page

    console.log("Before")
});


After(async function (scenario) {
    // Sanitize scenario name to use as a filename
    const traceName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
    const tracePath = path.join(process.cwd(), `reports/traces/${traceName}.zip`);

    // 5. Close the page
    await pageFixture.page.close();

    // 6. Stop tracing and save the file
    // Tip: You can wrap this in an if condition to save only on failure
    await context.tracing.stop({ path: tracePath });

    // 7. Clean up the context and browser
    // await context.close();
    // await browser.close();

      console.log("after")
});

AfterAll(async function () {

    //close the page
    //await pageFixture.page.close();

    //browser.close/context.close 

    //await context.close()

    console.log("afterAll")

    console.log("==============================")
});



// Then('I verify shadow DOM in hooks', async function () {

//     await pageFixture.page.goto('https://selectorshub.com/xpath-practice-page/')

//     // parent shasow dom handling

//     await pageFixture.page.locator('#userName').locator('#kils').fill('quality')

//     // nested shadow dom means parent and child shadow dom
    
//     await pageFixture.page.locator('#userName').locator('#app2').locator('#pizza').fill('corn pizza')

//     console.log("I verify shadow DOM in hooks scenario")

// })

// Then('I launch the test automation practice application in hooks', async function () {

//     await page.goto('https://testautomationpractice.blogspot.com/', { timeout: 10000 }); // 10000 means 10 seconds

//         console.log("I launch the test automation practice application in hooks background keyword")


// })