import { type Page, type Locator } from "@playwright/test";

export class ShoppingCart {
    readonly page : Page
    readonly sectionHeading : Locator
    readonly coursesSections : Locator
    //
    readonly sectionImg : Locator
    readonly sectionName : Locator
    readonly sectionTag : Locator
    readonly sectionPrice : Locator
    //
    readonly sectionDiscount : Locator
    readonly sectionButton : Locator
    //
    readonly course1Price : Locator
    //2
    readonly cartHeading : Locator
    readonly courseCart : Locator
    readonly totalPriceCart : Locator
    readonly cartButton : Locator
    readonly cartSection : Locator
    readonly successMessageCart : Locator

    constructor(page : Page) {
        this.page = page
        this.sectionHeading = page.locator('.section > h1') // .mt-2.mb-4
        this.coursesSections = page.locator('[id^="course"]') 
        // 
        this.sectionImg = page.locator('[id^="course"] img')
        this.sectionName = page.locator('[id^="course"] h3')
        this.sectionTag = page.locator('[id^="course"] .my-3')
        this.sectionPrice = page.locator('[id^="course"] [data-testid="full-price"]')
        this.sectionDiscount = this.coursesSections.locator('[data-testid="discount"]') //('[id^="course"] [data-testid="discount"]')
        //this.sectionDiscount = page.locator('[id^="course"] :has([data-testid="discount"])') //('[id^="course"] [data-testid="discount"]')
        this.sectionButton = page.locator('[id^="course"] .button')
        //
        this.course1Price = page.locator('#course-1')
        // 2
        this.cartHeading = page.locator('.p-2 .mb-2')
        this.courseCart = page.locator('.course-card')
        this.totalPriceCart = page.locator('#total-price')
        this.cartButton = page.locator('#total-price ~button')
        this.cartSection = page.locator('.column.p-0.is-half')
        this.successMessageCart = page.locator('#total-price ~.is-success')

        
    }
    async goto() {
        await this.page.goto('https://www.techglobal-training.com/frontend/project-8')
    }
    async clickCartButton() {
        await this.cartButton.click()
    }
    async clickSectionButton(number: number) {
        const sectionButtonAll = await this.sectionButton.all()
        await sectionButtonAll[number].click()
    }
    async clicksectionButtonAll() {
        const sectionButtonAll = await this.sectionButton.all()
        for(const button of sectionButtonAll) {
        await button.click()
        }
    }
    number(textLocator:string) : number {
        return Number(textLocator.replace(/\D/g, ''))
    }
    // arrSectionDiscountAll(locator: Locator) {
    //     let sectionDiscountAll = []
    //     const countLocator: number = locator.count()
    //     for (let i = 0; i < countLocator; i++) {
    //         const section = locator.nth(i)
    //             const sectionDiscount = section.locator('[data-testid="discount"]')            
    //             sectionDiscountAll.push(sectionDiscount)
    //         }
    //     return sectionDiscountAll
    // }
    
}
