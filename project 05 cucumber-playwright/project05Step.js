const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PaginationPage = require('../pages/PaginationPage')

const paginationPage = new PaginationPage()

Given('the user is on "https://techglobal-training.com/frontend/project-5"', async function (url) {
    await page.goto(url)
});

Then('the user should see the {string} heading', async function (headingText) {
  const subHeadingText = await paginationPage.getSubHeadingText();
  expect(subHeadingText).toContain(headingText);
});

Then('the user should see the {string} paragraph', async function (paragraphText) {
  const paragraph = await paginationPage.getParagraphText();
  expect(paragraph).toContain(paragraphText);
});

Then('the user should see the "Previous" button is disabled', async function () {
  const isDisabled = await paginationPage.isPreviousButtonDisabled();
  expect(isDisabled).toBe(true);
});

Then('the user should see the "Next" button is enabled', async function () {
  const isDisabled = await paginationPage.isNextButtonDisabled();
  expect(isDisabled).toBe(false);
});

When('the user clicks on the "Next" button', async function () {
  await paginationPage.clickNext();
});

Then('the user should see the "Previous" button is enabled', async function () {
  const isDisabled = await paginationPage.isPreviousButtonDisabled();
  expect(isDisabled).toBe(false);
});

Then('the user should see the "Next" button is disabled', async function () {
  const isDisabled = await paginationPage.isNextButtonDisabled();
  expect(isDisabled).toBe(true);
});

Then('the user should see {string} City with the info below and an image', async function (cityName, dataTable) {
  const data = dataTable.hashes()[0];
  const cityInfo = await paginationPage.getCityInfo();
  expect(cityInfo).toContain(`City: ${cityName}`);
  
  const countryInfo = await paginationPage.getCountryInfo();
  expect(countryInfo).toContain(`Country: ${data.Country}`);
  
  const populationInfo = await paginationPage.getPopulationInfo();
  expect(populationInfo).toContain(`Population: ${data.Population}`);
  
  const imageAlt = await paginationPage.getCityImageAlt();
  expect(imageAlt).toContain(cityName);
});
