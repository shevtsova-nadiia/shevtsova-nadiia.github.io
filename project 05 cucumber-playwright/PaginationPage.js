class PaginationPage {
    constructor(page) {
      this.page = page;
      this.previousButton = this.page.locator('#previous');
      this.nextButton = this.page.locator('#next');
      this.cityInfo = this.page.locator('.city_info');
      this.countryInfo = this.page.locator('.country_info');
      this.populationInfo = this.page.locator('.population_info');
      this.cityImage = this.page.locator('img.city_image');
      this.subHeading = this.page.locator('#sub_heading');
      this.paragraph = this.page.locator('#content');
    }
  
    async waitForPageLoad() {
      await this.page.waitForSelector('.Pagination_pagControls__kV7r9');
    }
  
    async getSubHeadingText() {
      return await this.subHeading.textContent();
    }
 
    async getParagraphText() {
      return await this.paragraph.textContent();
    }
  
    async getCityInfo() {
      return await this.cityInfo.textContent();
    }

    async getCountryInfo() {
      return await this.countryInfo.textContent();
    }

    async getPopulationInfo() {
      return await this.populationInfo.textContent();
    }

    async getCityImageAlt() {
      return await this.cityImage.getAttribute('alt');
    }

    async isPreviousButtonDisabled() {
      return await this.previousButton.isDisabled();
    }

    async isNextButtonDisabled() {
      return await this.nextButton.isDisabled();
    }

    async clickNext() {
      await this.nextButton.click();
    }

    async clickPrevious() {
      await this.previousButton.click();
    }
  }
  
  module.exports = PaginationPage;
  