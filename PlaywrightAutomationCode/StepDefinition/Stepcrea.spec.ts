import { Given, TestCaseHookDefinition, Then } from '@cucumber/cucumber'
import test, { Browser, chromium, Locator, Page, expect, } from 'playwright/test';
import { TestData, TestData2 } from '../Files/TestData.json'
import { readExcel } from '../utils/excelUtils';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { PDFParse } from 'pdf-parse';

let browser: Browser, page: Page
let context

Given('I Launch the browser', async function () {
  browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized']
  })
  context = await browser.newContext({
    viewport: null

  })
  page = await context.newPage()

});

Then('I Launch the face book application', async function () {
  await page.goto("https://www.facebook.com")
});

Then('I Launch the test automation practise browser', async function () {

  await page.goto("https://testautomationpractice.blogspot.com/")

});
Then('I Verify locators', async function () {
  console.log("this is locator test")
  await page.getByPlaceholder('Enter Name').fill("swapna")
  await page.getByPlaceholder('Enter EMail').fill("testthough@gmail.com")
  await page.getByPlaceholder('Enter Phone').fill('8787765765')
  console.log("===========this is getbytext========")
  await page.getByText('START').click()
  await page.getByText('STOP').click()
  await page.getByRole('checkbox', { name: 'sunday' }).scrollIntoViewIfNeeded()
  await page.getByRole('checkbox', { name: 'sunday' }).click()
});

Then('I verify locators part 2', async function () {

  await page.goto("https://www.salesforce.com/")
});
Then('I verify locators part 3', async function () {

  await page.goto("https://parabank.parasoft.com/parabank/index.htm")
  await page.getByAltText('ParaBank').click()
  await page.getByTitle('ParaBank').click()
});

Then('I verify locators part 4', async function () {

  await page.goto("https://login.salesforce.com/?locale=in")
  await page.getByLabel('Username').fill("swapna")
});
Then('I verify selemium  locators', async function () {

  await page.goto("https://int-studentlogin.aiuniv.edu/?v=53&ssid=2&cid=5#/login")
  //   await page.locator('/html/body/div[4]/div[2]/div[2]/div[2]/div[2]/div[2]/div[2]/div/div[4]/div[1]/div/div/div[1]/div[1]/div/div/div/div/div[2]/div[1]/input[1]').fill('swapna')
  await page.locator('//input[@id="login"]').fill('Rhonda.McGarthy')
  await page.locator('//*[@id="password"]').fill('qatest')
  await page.locator('.btn-primary').click()
  await page.locator('.user-profile').click()
  // await page.locator('//input[contains(@id,"home-phone")]').fill('7676656666')
  // await page.locator('//input[starts-with(@id,"mobile")]').fill('5368514756')
  var text = await page.locator('//h2[text()="Phone Numbers"]').innerText()
  console.log('inner text', text)

  text = await page.locator('//*[text()= "Mobile Phone"]').innerText()
  console.log('----inner text 2nd way----', text)
  text = await page.locator('//label[starts-with(text(),"Work Phone")]').innerHTML()
  console.log('----3rd way', text)
  // await page.locator('//input[starts-with(@id,"work") and starts-with(@name,"work")]').fill('8555456785')
  // await page.locator('[id*="home-phone"]').fill('7677654543')
  var parentcount = await page.locator('//input[@id="other-phone"]//parent::div').all()
  console.log('count of parent', parentcount.length)
  var ancestorcount = await page.locator('//input[@type="checkbox"]//ancestor::div').all()
  console.log('count of ancestor', ancestorcount.length)
  var childcount = await page.locator('//div[@class="position-relative"]//child::input[@type="text"]').all()
  console.log("this is test")
  await page.locator('//div[@class="position-relative"]//child::input[@type="text"]').last().fill('3456543567')
  await page.locator('//div[@class="position-relative"]//child::input[@type="text"]').nth(1).fill('2214458689')
  await page.locator('//div[@class="position-relative"]//child::input[@type="text"]').nth(2).fill('6987458755')
  await page.locator('//div[@class="position-relative"]//child::input[@type="text"]').nth(3).fill('3658452578')
  var descendant = await page.locator('//div[@class="ctrl-container"]//descendant::input[@type="checkbox"]').all()
  await page.locator('//span[@class="checkmark"]//following::span[@class="checkmark"]').nth(1).click()

  //when there are two same fiels like field1 and field 2 we can get with help of following-sibling
  // //div[@class='form-group]//following-sibling::input[@type='checkbox']
  await page.reload()

  console.log("title of the page :", await page.title())
  console.log("url of the campyus:", await page.url())
  var testcount = await page.locator('//h2[@class="unit-tab-sub-title profile-title"]').allTextContents()
  console.log('count of all web elements', testcount.length)
  for (let i = 0; i < testcount.length; i++) {
    console.log('all text contents', testcount[i])
  }
});
Then('I verify selemium  locators 45', async function () {
  await page.goto("https://testautomationpractice.blogspot.com/")
  await page.getByText('START').dblclick()
  await page.getByText('START').click({ button: 'right' })
  var first = await page.locator('#draggable')
  var second = await page.locator('#droppable')
  await first.dragTo(second)
  var visible = await page.locator("#sunday").isVisible()
  if (visible == true) {
    await page.locator("#sunday").click()
  }
  var hidden = await page.locator("#female").isHidden()
  if (hidden == false) {
    await page.locator("#monday").click()
  }
  var disabled = await page.locator("#female").isDisabled()
  if (disabled == false) {
    await page.locator("#female").click()
  }
  var enabled = await page.locator("#tuesday").isEnabled()
  if (enabled == true) {
    // first way to click on the element
    await page.locator("#tuesday").click()
  }
  var box = await page.locator("#saturday").isChecked()
  if (box == false) {
    // second way to click on the element
    await page.locator("#saturday").setChecked(true)
    await page.locator("#tuesday").setChecked(false)
    await page.locator("#monday").uncheck()
    // first way to clear the text box
    await page.locator('//input[@id="field1"]').clear()

    await page.locator('//input[@id="field2"]').type("this is test")
    // 2nd way to clear the text box
    await page.locator('//input[@id="field2"]').fill("")
    await page.locator('//input[@id="field2"]').fill("Playwright")
    //  3rd way to clear the text box
    await page.locator('//input[@id="field2"]').press("Control+A")
    await page.keyboard.press('Delete')
    await page.keyboard.up('Control')
    //  way to enter the text in the text box
    await page.keyboard.insertText("this is swapna")
    await page.locator('//input[@id="field2"]').clear()
    //  way to enter the text in the text box
    await page.locator('//input[@id="field2"]').pressSequentially("test123")
    await page.locator('//input[@id="field2"]').pressSequentially("345test")
    console.log("======dropdowns===========")
    var dropdown = await page.locator("#colors")
    await dropdown.scrollIntoViewIfNeeded()
    await dropdown.selectOption("Red")
    //  if multiple options are there in the dropdown we can select with the help of array
    await dropdown.selectOption(["Yellow", "Green"])
    await dropdown.selectOption({ index: 1 })
    var othertypedrp = await page.locator("#country")
    await othertypedrp.scrollIntoViewIfNeeded()
    await othertypedrp.selectOption("Canada")
    await othertypedrp.selectOption({ index: 2 })
    console.log("=======screenshots======")
    // first way to take the screenshot
    await page.locator('//input[@id="field2"]').screenshot({ path: "test123.png" })
    // second way to take the screenshot
    await page.screenshot({ path: './PlaywrightAutomationCode/screenshots/uptoscreenlevel.png' })
    // third way to take the screenshot
    await page.screenshot({ path: './PlaywrightAutomationCode/screenshots/fulllpage.png', fullPage: true })
    // playwright and method 
    await page.getByPlaceholder('Enter Name').and(page.locator('#name')).fill("swapna")
    console.log("=======Upload files====")

    await page.locator('#singleFileInput').setInputFiles(".\\PlaywrightAutomationCode\\screenshots\\uptoscreenlevel.png")
    await page.locator("//*[text()='Upload Single File']").click()


    await page.locator('#multipleFilesInput').setInputFiles(["C:\\Users\\SwapnaAnkarla\\Downloads\\userProfile (1).jpg"])
    await page.locator("//*[text()='Upload Multiple Files']").click()


  }

  const todaysDate = new Date()

  console.log("todays date", todaysDate)
  const todaysDateInIST = todaysDate.toLocaleDateString()
  console.log("todaysDateInIST", todaysDateInIST)


  const pastDate = new Date(todaysDate)
  pastDate.setDate(pastDate.getDate() - 5)
  const pastDateInIST = pastDate.toLocaleDateString()
  console.log("pastDateInIST", pastDateInIST)

  const futureDate = new Date(todaysDate)
  futureDate.setDate(futureDate.getDate() + 5)
  const futureDateInIST = futureDate.toLocaleDateString()
  console.log("futureDateInIST", futureDateInIST)
  await page.screenshot({ path: "todaysdate" + todaysDateInIST + ".png" })

});
//static way for knowledge of row count and column count
Then('I verify Web Table  locators 56', async function () {
  await page.goto("https://testautomationpractice.blogspot.com/")
  let webtable = await page.locator("//*[@name='BookTable']").isVisible()
  if (webtable == true) {
    console.log("table is visible")


    // let expected = "Animesh"
    // let actual = await page.locator("//table[@name='BookTable']/tbody/tr[2]//td[2]").innerText()
    // if (expected == actual) {
    //   console.log("expected and actual are same")
    // }
    // else {
    //   console.log("expected and actual are not same")
    // }

    //dyanamic way for knowledge of row count and column count
    // let rowcount = await page.locator("//table[@name='BookTable']/tbody/tr").all()
    // if (rowcount.length > 0) {
    //   console.log("Number of rows in the table:", rowcount.length)
    // }
    // else {
    //   console.log("Number of rows does not exist")
    // }
    // let columncount = await page.locator("//table[@name='BookTable']/tbody//td").all()
    // if (columncount.length > 0) {
    //   console.log("Number of columns in the table:", columncount.length)
    // }
    // else {
    //   console.log("Number of columns does not exist")
    // }

    await page.locator("//*[@name='BookTable']").scrollIntoViewIfNeeded()
    let rowcount1 = await page.locator("//*[@name='BookTable']/tbody/tr").all()
    if (rowcount1.length > 0) {
      console.log("Number of rows")

      for (let i = 1; i <= rowcount1.length; i++) {
        if (i == 1) {
          let columncount1 = await page.locator("//*[@name='BookTable']/tbody/tr[" + i + "]/th").all()


          // let columncount1 = await page.locator("//*[@name='BookTable']/tbody/tr[" + i + "]/th").all()

          if (columncount1.length > 0) {


            for (let j = 1; j <= columncount1.length; j++) {
              let headertext = await page.locator("//*[@name='BookTable']/tbody/tr[" + i + "]/th[" + j + "]").innerText()
              console.log(headertext)
              //           let expected = "Mukesh"
              //           let actual = await page.locator("//table[@name='BookTable']/tbody/tr[" + i + "]/td[" + j + "]").innerText()
              //           if (expected == actual) {
              //             console.log("expected and actual are same","xxx:" + i + ",yyy:" + j)
              //           }
              //         }
              //       }
              //       else {
              //         console.log("expected and actual are not same")
              //       }
              //     }
              //   }
              //   else {
              //     console.log("table is not visible")
              //   }
              // }
            }
          }
        }
      }
    }
  }
});
Then('I launch test automation practice site', async function () {
  await page.goto("https://testautomationpractice.blogspot.com/")
});
Then('I verify web calendar locators 78', async function () {
  await page.locator('#datepicker').scrollIntoViewIfNeeded()
  await page.locator('#datepicker').click()
  let webcalendar = await page.locator('.ui-datepicker-calendar').isVisible()
  if (webcalendar == true) {
    console.log("web calendar is visible")
  }
  else {
    console.log("web calendar is not visible")
  }
  let expected = "23"
  let actual = await page.locator("//*[@class='ui-datepicker-calendar']//tbody/tr[4]/td[4]").innerText()
  if (expected == actual) {
    console.log("results true")
    await page.locator("//*[@class='ui-datepicker-calendar']//tbody/tr[4]/td[4]").click()
  }
  else {
    console.log("results false")
  }
});


// Then('I verify Hard Assertions', async function () {

//   await page.goto("https://www.amazon.com/")
//   expect(await page.getByPlaceholder('Search Amazon')).toBeVisible()
//   await page.getByPlaceholder('Search Amazon').fill('iphone')
//   expect(await page.locator('#nav-search-submit-button')).toBeAttached()
//   await page.locator('#nav-search-submit-button').click()

//   //hard assertion fail case 
//   expect(await page.locator('//*[text()="Sell"]')).toBeHidden()
//   // expect(await page.locator('//*[text()="Sell"]')).toBeDisabled()
//   await page.locator('//*[text()="Sell"]').click()
//   expect(await page.locator('//*[text()="Sell"]')).toHaveCount(1)
//   await page.waitForTimeout(7000)

//   await page.goto("https://testautomationpractice.blogspot.com/")

//   expect(await page.locator('//*[@class="title"]')).toHaveCount(17)
//   let ttt = await page.locator('//*[@class="title"]').allTextContents()
//   for (let i = 0; i < ttt.length; i++) {
//     console.log(ttt[i])
//   }
//   await page.waitForTimeout(7000)
//   expect(await page.locator('//*[text()="Data Entry Form"]')).toContainText('Data Entry Form')
//   expect(await page.getByPlaceholder('Enter Name')).toHaveAttribute('class')
//   expect(await page.getByPlaceholder('Enter Name')).toHaveAttribute('class', 'form-group')
//   expect(await page.getByPlaceholder('Enter Name')).toHaveClass('form-control')
//   expect(await page.getByPlaceholder('Enter Name')).toBeTruthy()
//   expect(await page.getByPlaceholder('Enter Name')).toBeEmpty()
//   await page.getByPlaceholder('Enter Name').fill('swapna')

// });

Then('I verify soft Assertions', async function () {

  await page.goto("https://www.amazon.com/")
  expect.soft(await page.getByPlaceholder('Search Amazon')).toBeVisible()
  await page.getByPlaceholder('Search Amazon').fill('iphone')
  expect.soft(await page.locator('#nav-search-submit-button')).toBeAttached()
  await page.locator('#nav-search-submit-button').click()
  expect.soft(await page.locator('//*[text()="Sell"]')).toBeHidden()
  // expect(await page.locator('//*[text()="Sell"]')).toBeDisabled()
  await page.locator('//*[text()="Sell"]').click()
  expect.soft(await page.locator('//*[text()="Sell"]')).toHaveCount(1)
  await page.waitForTimeout(7000)

  await page.goto("https://testautomationpractice.blogspot.com/")

  expect.soft(await page.locator('//*[@class="title"]')).toHaveCount(17)
  let ttt = await page.locator('//*[@class="title"]').allTextContents()
  for (let i = 0; i < ttt.length; i++) {
    console.log(ttt[i])
  }
  await page.waitForTimeout(7000)
  expect.soft(await page.locator('//*[text()="Data Entry Form"]')).toContainText('Data Entry Form')
  expect.soft(await page.getByPlaceholder('Enter Name')).toHaveAttribute('class')
  expect.soft(await page.getByPlaceholder('Enter Name')).toHaveAttribute('class', 'form-group')
  expect.soft(await page.getByPlaceholder('Enter Name')).toHaveClass('form-control')
  expect.soft(await page.getByPlaceholder('Enter Name')).toBeTruthy()
  expect.soft(await page.getByPlaceholder('Enter Name')).toBeEmpty()
  await page.getByPlaceholder('Enter Name').fill('swapna')

});
//Filters and alerts
Then('I verify filters locators', async function () {
  await page.goto("https://testautomationpractice.blogspot.com/")
  await page.locator('#sunday').scrollIntoViewIfNeeded()
  await page.waitForTimeout(3000)
  await page.locator("//*[@class='form-check form-check-inline']").filter({ hasText: 'sunday' }).getByRole('checkbox', { name: 'sunday' }).click()
})
Then('I verify simple alert locators', async function () {
  await page.goto("https://testautomationpractice.blogspot.com/")
  await page.waitForTimeout(3000)
  await page.on('dialog', (dialog) => {
    dialog.accept()
  })

  await page.locator("//*[text()='Simple Alert']").click()
})

Then('I verify confimation alert locators', async function () {
  await page.goto("https://testautomationpractice.blogspot.com/")
  await page.waitForTimeout(3000)
  await page.on('dialog', (dialog) => {
    dialog.accept()
  })

  await page.locator('#confirmBtn').click()
})
// Then('I verify confimation alert with cancle locators', async function () {
//   await page.goto("https://testautomationpractice.blogspot.com/")
//   await page.waitForTimeout(3000)
//   await page.on('dialog', (dialog) => {
//     dialog.dismiss()
// })
// var visible12 = await page.getByRole('button',{name:'Confirmation Alert'}).isVisible()
//   await page.getByRole('button',{name:'Confirmation Alert'}).click()
//   await page.waitForTimeout(1000);
// })

Then('I verify confimation alert with prompt alert locators', async function () {
  await page.goto("https://testautomationpractice.blogspot.com/")
  await page.waitForTimeout(3000)
  await page.on('dialog', (dialog) => {
    // to pass the text in the prompt alert we can use accept method and pass the text in the accept method
    dialog.accept("this is test")
  })
  await page.locator('#promptBtn').click()


})

Then('I Launch the frames application', async function () {
  await page.goto("https://the-internet.herokuapp.com/iframe")
  await page.waitForTimeout(3000)
  var frame = await page.frames()
  console.log("frame count", frame.length)

  var bt = await page.frameLocator('#mce_0_ifr').locator('//*[text()="Your content goes here."]').innerText()
  await page.waitForTimeout(3000)
  await page.goto("https://the-internet.herokuapp.com/frames")
  await page.waitForTimeout(3000)
  await page.locator('//*[@id="content"]/div/ul/li[1]/a').click()
  await page.waitForTimeout(3000)

  //  var ttb =await page.frameLocator('//*[@src="/frame_right"]').locator('//*[contains(text(),"RIGHT")]').innerText()
  // console.log("this is text in the frame",ttb)
  // console.log("this is text in the frame",ttb)  
  // 2nd way to get the text in the frame using URL of the frame
  let ttb1 = await page.frame({ url: "https://the-internet.herokuapp.com/frame_bottom" })
  var ttb3 = await ttb1?.locator('//*[contains(text(),"BOTTOM")]').innerText()
  console.log("this is text in the frame", ttb3)
  // single Frame
  await page.goto("https://demo.automationtesting.in/Frames.html")
  await page.waitForTimeout(3000)
  var frame = await page.frames()
  console.log("frame count", frame.length)
  let singleframe = await page.frame({ url: "https://demo.automationtesting.in/SingleFrame.html" })
  var singlefra1 = await singleframe?.locator('//*[@type="text"]').fill("this is test")
  // multiple nested frame 

  let multiframe = await page.locator("//*[text()='Iframe with in an Iframe']").click()
  await page.waitForTimeout(3000)
  let multiframe1 = await page.frame({ url: "https://demo.automationtesting.in/MultipleFrames.html" })
  var multiframe2 = await multiframe1?.childFrames()
  console.log("this is child frame count", multiframe2?.length)
  if (multiframe2 && multiframe2.length > 0) {
    await multiframe2[0].
      locator('//*[@type="text"]').fill("2nd frame text")
  }

})
Then('I Verify test data from json file', async function () {

  await page.goto("https://testautomationpractice.blogspot.com/")
  await page.waitForTimeout(3000)
  await page.getByPlaceholder('Enter Name').fill(TestData.Name)
  await page.getByPlaceholder('Enter EMail').fill(TestData.Email)
  await page.getByPlaceholder('Enter Phone').fill(TestData.Phone)
  await page.locator('#textarea').fill(TestData.Address)
  await page.getByRole('radio', { name: TestData.Gender }).click()


})
Then('I Verify test data from excel file', async function () {

  await page.goto("https://testautomationpractice.blogspot.com/")
  const testData: any[] = readExcel('./PlaywrightAutomationCode/utils/Autotest.xlsx', 'Sheet1');
  await page.waitForTimeout(3000)
  for (const data of testData) {

    console.log('Excel records:', testData.length);
    console.log(data);
    await page.locator('#name').fill(data.Name ?? '')
    await page.locator('#email').fill(data.Email ?? '')
    await page.locator('#phone').fill(data.Phone ?? '')
    await page.locator('#textarea').fill(data.Address ?? '')
    await page.getByRole('radio', { name: data.Gender }).check()
  }
})
Then('I Verify test data from PDF file', async function () {
  await page.goto(
    'https://www.playwrightautomation.com/assets/downloads'
  );


  // Wait for the download event and click the download button
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#btn-download-report').click(),
  ]);

  // Save the downloaded PDF
  const downloadDir = path.resolve('downloads');
  fs.mkdirSync(downloadDir, { recursive: true });

  const filePath = path.join(downloadDir, 'sample.pdf');
  await download.saveAs('test-results/sample.pdf');

  // Verify that the file exists
  expect(fs.existsSync(filePath)).toBeTruthy();

  console.log(`PDF downloaded successfully: ${filePath}`);
});


Then('I Launch the test automation practice application <string>,<string>,<string>,<string>,<string>', async function (name, email, phone, address, wikipedia) {
  await page.goto('https://testautomationpractice.blogspot.com/')
  console.log('Application launched:', page.url());
});


// Then('I verify reading testdata from feature file with scenario keyword {string},{string},{string},{string},{string}', async function (name, email, phone, address, wikipedia) {

//     await page.getByPlaceholder('Enter Name').fill(name)

//     await page.getByPlaceholder('Enter EMail').fill(email)

//     await page.getByRole('textbox', { name: 'phone' }).fill(phone)

//     await page.locator('#textarea').fill(address)

//     await page.locator('.wikipedia-search-input').fill(wikipedia)
// });

// Then('I verify reading testdata from feature file with scenario outline keyword {string},{string},{string},{string},{string}', async function (name, email, phone, address, wikipedia) {

//     await page.getByPlaceholder('Enter Name').fill(name)

//     await page.getByPlaceholder('Enter EMail').fill(email)

//     await page.getByRole('textbox', { name: 'phone' }).fill(phone)

//     await page.locator('#textarea').fill(address)

//     await page.locator('.wikipedia-search-input').fill(wikipedia)
// });



Then(

  'I Launch the test automation practice application',

  async function () {

    await page.goto(

      'https://testautomationpractice.blogspot.com/'

    );
 
    console.log('Application launched:', page.url());

  }

);
 
Then(

  'I verify reading testdata from feature file with scenario outline keyword {string},{string},{string},{string},{string}',

  async function (name, email, phone, address, wikipedia) {
 
    console.log('Reading test data:', {

      name, email, phone, address, wikipedia

    });
 
    await page.getByPlaceholder('Enter Name').fill(name);

    await page.getByPlaceholder('Enter EMail').fill(email);

    await page.locator('#phone').fill(phone);

    await page.locator('#textarea').fill(address);

    await page.locator('.wikipedia-search-input').fill(wikipedia);
 
    console.log('Form data entered successfully');

  }

);

Then(

  'I verify reading testdata from feature file with scenario keyword {string},{string},{string},{string},{string}',

  async function (name, email, phone, address, wikipedia) {
 
    console.log('Reading test data:', {

      name, email, phone, address, wikipedia

    });
 
    await page.getByPlaceholder('Enter Name').fill(name);

    await page.getByPlaceholder('Enter EMail').fill(email);

    await page.locator('#phone').fill(phone);

    await page.locator('#textarea').fill(address);

    await page.locator('.wikipedia-search-input').fill(wikipedia);
 
    console.log('Form data entered successfully');

  }

);

 