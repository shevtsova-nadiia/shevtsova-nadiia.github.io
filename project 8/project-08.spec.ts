import { test, expect } from "../../fixtures/shoppingCart-fixtures";
import { ShoppingCart } from "../../pages/ShoppingCart";

test.describe('Shopping Cart', () => {
    test('Test Case 01 - Available Courses Section Validation', async ({ shoppingCart}) => {
        const coursesSectionsAll = await shoppingCart.coursesSections.all()

        await test.step('2. Validate the heading is "Available Courses"', async() => {
            const headingName = 'Available Courses'
            await expect(shoppingCart.sectionHeading).toHaveText(headingName)
        })
        await test.step('3. Validate that there are 3 courses displayed', async() => {
            await expect(shoppingCart.coursesSections).toHaveCount(3)
            for(const section of coursesSectionsAll){
                await expect(section).toBeVisible()
            }
        })
        await test.step('4. Validate that each course has an image, name, tag, and a price of more than zero', async() => {
            const sectionsElementsAll = [
                shoppingCart.sectionImg, 
                shoppingCart.sectionName, 
                shoppingCart.sectionTag, 
                shoppingCart.sectionPrice
            ]
            for (const sectionElements of sectionsElementsAll){
                await expect(sectionElements).toHaveCount(3)
            }
            const sectionPriceAll = await shoppingCart.sectionPrice.all()
            for(const price of sectionPriceAll){
                const priceText = await price.innerText()
                    // or
                //const priceText = await price.textContent()
                //const priceNumber = Number(priceText.replace(/\D/g, ''))
                const priceNumber = shoppingCart.number(priceText)
                expect(priceNumber).toBeGreaterThan(0)
            }
        })
        await test.step('5. Validate the first 2 courses have discount tags', async() => {
            let sectionDiscountAll = []
            for (let i = 0; i < 2; i++) {
                const section = shoppingCart.coursesSections.nth(i)
                const sectionDiscount = section.locator('[data-testid="discount"]')            
                sectionDiscountAll.push(sectionDiscount)
            }
            expect(sectionDiscountAll).toHaveLength(2)
                // or
            //expect(sectionDiscountAll.length).toBe(2)
        })
        await test.step('6. Validate that there is an “Add to Cart” button under each course which is displayed, enabled, and has the text “Add to Cart”', async() => {
            for (const section of coursesSectionsAll) {
            const allElements = section.locator('*');
            const count = await allElements.count()
            expect(await allElements.nth(count - 1).evaluate(el => el.tagName)).toBe('BUTTON');
            }
            const sectionButtonAll = await shoppingCart.sectionButton.all()
            for (const button of sectionButtonAll) {
                expect(button).toBeVisible()
                expect(button).toBeEnabled()
                expect(button).toHaveText('Add to Cart')
            }
        })
    })
    test('Test Case 02 - Cart Section Validation', async({ shoppingCart }) => {
        await test.step('2. Validate the heading is “Items Added to Cart”', async() => {
            const headingName = 'Items Added to Cart'
            await expect(shoppingCart.cartHeading).toHaveText(headingName)
        })
        await test.step('3. Validate that the cart is empty by default', async() => {
            await expect(shoppingCart.courseCart).not.toBeAttached()
        })
        await test.step('4. Validate that the total price is zero “$0” by default', async() => {
            const totalPriceText = await shoppingCart.totalPriceCart.textContent!()
            //const totalPriceNumber = Number(totalPriceText!.replace(/\D/g, ''))
            const totalPriceNumber = shoppingCart.number(totalPriceText!)
            expect(totalPriceNumber).toEqual(0)
        })
        await test.step('5. Validate that there is a “Place Order” button is displayed, disabled, and has the text “Place Order”', async() => {
            const buttonName = 'Place Order'
            expect(shoppingCart.cartButton).toBeVisible()
            expect(shoppingCart.cartButton).toBeDisabled()
            //expect(shoppingCart.cartButton).toHaveText('Place Order')
            expect(shoppingCart.cartButton).toHaveText(buttonName)
        })
    })
    test('Test Case 03 - Add a Course to the Cart and Validate', async ({ shoppingCart }) => {
        let priceWithDiscount = 0
        // const coursesSectionsAll = await shoppingCart.coursesSections.all()
        // const  randomIndex = Math.floor(Math.random() * coursesSectionsAll.length)
        // const sectionButtonAll = await shoppingCart.sectionButton.all()
        // await sectionButtonAll[randomIndex].click()
        await test.step('2. Click on the “Add to Cart” button for one of the courses', async() => {
            await shoppingCart.clickSectionButton(1)
            // const sectionButtonAll = await shoppingCart.sectionButton.all()
            // await sectionButtonAll[1].click()
        })
        await test.step('3. Validate that the course is displayed in the cart with its image, name, and discount amount if available', async() => {
            const sectionNameAll = await shoppingCart.sectionName.allInnerTexts()
            const sectionDiscountAll = await shoppingCart.sectionDiscount.allInnerTexts()
            const sectionDiscountString = sectionDiscountAll[1].replace(/\D/g, '')
            await expect(shoppingCart.courseCart).toHaveCount(1)
            await expect(shoppingCart.courseCart.locator('img')).toBeVisible()
            await expect(shoppingCart.courseCart.locator('.has-text-black')).toHaveText(sectionNameAll[1])
            await expect(shoppingCart.courseCart.locator('[data-testid="discount"]')).toContainText(sectionDiscountString)
                // Price
            const sectionPriceAll = await shoppingCart.sectionPrice.allInnerTexts()
            const sectionPriceNumber = Number(sectionPriceAll[1].replace(/\D/g, ''))
            const sectionDiscountNumber = Number(sectionDiscountString)
            const totalPriceWithDiscount = sectionPriceNumber - (sectionPriceNumber * sectionDiscountNumber)/100
            console.log(sectionPriceNumber)
            console.log(sectionDiscountNumber)
            console.log(totalPriceWithDiscount)
            priceWithDiscount = totalPriceWithDiscount
        })
        await test.step('4. Validate that the course price is added to the total price excluding the discount amount', async() => {
            const totalPriceText = await shoppingCart.totalPriceCart.textContent!()
            //const totalPriceNumber = Number(totalPriceText!.replace(/\D/g, ''))
            const totalPriceNumber = shoppingCart.number(totalPriceText!)
            expect(totalPriceNumber).toBe(priceWithDiscount)
        })
        await test.step('5. Click on the “Place Order” button', async() => {
            await shoppingCart.clickCartButton()
        })
        await test.step('6. Validate a success message is displayed with the text “Your order has been placed.”', async() => {
            await expect(shoppingCart.successMessageCart).toHaveText('Your order has been placed.')
        })
        await test.step('7. Validate that the cart is empty', async() => {
            await expect(shoppingCart.courseCart).not.toBeAttached()
        })
    })
    test('Test Case 04 - Add Two Courses to the Cart and Validate', async ({ shoppingCart }) => {
        await test.step('2. Click on the “Add to Cart” button for one of the courses', async() => {
            await shoppingCart.clickSectionButton(0)
            // const sectionButtonAll = await shoppingCart.sectionButton.all()
            // await sectionButtonAll[0].click()
        })
        await test.step('3. Click on the “Add to Cart” button for another course', async() => {
            await shoppingCart.clickSectionButton(2)
            // const sectionButtonAll = await shoppingCart.sectionButton.all()
            // await sectionButtonAll[2].click()
        })
        await test.step('4. Validate that the courses are displayed in the cart with their image, name, and discount amount if available', async() => {
            const arrTest04 = [0, 2]
            const sectionNameAll = await shoppingCart.sectionName.allInnerTexts()
            const sectionDiscountAll = await shoppingCart.sectionDiscount.allInnerTexts()
            const sectionDiscountString = sectionDiscountAll[1].replace(/\D/g, '')
            const courseCartAll = await shoppingCart.courseCart.all()
            expect(courseCartAll).toHaveLength(2)
            await expect(shoppingCart.courseCart.locator('img')).toBeVisible()
            await expect(shoppingCart.courseCart.locator('.has-text-black')).toHaveText(sectionNameAll[1])
            await expect(shoppingCart.courseCart.locator('[data-testid="discount"]')).toContainText(sectionDiscountString)
        })
        await test.step('5. Validate that the course prices are added to the total price excluding the discount amounts', async() => {

        })
        await test.step('6. Click on the “Place Order” button', async() => {
            await shoppingCart.clickCartButton()
        })
        await test.step('7. Validate a success message is displayed with the text “Your order has been placed.”', async() => {
            await expect(shoppingCart.successMessageCart).toHaveText('Your order has been placed.')
        })
        await test.step('8. Validate that the cart is empty', async() => {
            await expect(shoppingCart.courseCart).not.toBeAttached()
        })
    })
    test('Test Case 05 - Add All Three Courses to the Cart and Validate', async ({ shoppingCart }) => {
        await test.step('2. Click on the “Add to Cart” button for one of the courses', async() => {
            await shoppingCart.clicksectionButtonAll()
        })
        await test.step('3. Validate that the courses are displayed in the cart with their image, name, and discount amount if available', async() => {
            let sectionDiscountAll = []
            for (let i = 0; i < 2; i++) {
                const section = shoppingCart.courseCart.nth(i)
                const sectionDiscount = section.locator('[data-testid="discount"]')            
                sectionDiscountAll.push(sectionDiscount)
            }
            expect(sectionDiscountAll).toHaveLength(2)
        })
        const sectionNameAll = await shoppingCart.sectionName.allInnerTexts()
        const sectionDiscountAll = await shoppingCart.sectionDiscount.allInnerTexts()
        let sectionDiscountString = ''
        for (const sectionDiscount of sectionDiscountAll) {
        sectionDiscountString = sectionDiscount.replace(/\D/g, '')
        }
        await expect(shoppingCart.courseCart).toHaveCount(3)
        const courseCartAll = await shoppingCart.courseCart.all()
        for(const course of courseCartAll) {
        await expect(course.locator('img')).toBeVisible()
        }
        await expect(shoppingCart.courseCart.locator('.has-text-black')).toHaveText(sectionNameAll)
        await expect(shoppingCart.courseCart.locator('[data-testid="discount"]')).toHaveText(sectionDiscountString)
            // Price
            
        const sectionPriceAll = await shoppingCart.sectionPrice.allInnerTexts()
        const sectionPriceNumber = Number(sectionPriceAll[1].replace(/\D/g, ''))
        const sectionDiscountNumber = Number(sectionDiscountString)
        const totalPriceWithDiscount = sectionPriceNumber - (sectionPriceNumber * sectionDiscountNumber)/100
        console.log(sectionPriceNumber)
        console.log(sectionDiscountNumber)
        console.log(totalPriceWithDiscount)
        priceWithDiscount = totalPriceWithDiscount

        await test.step('4. Validate that the course price is added to the total price excluding the discount amount', async() => {
            const totalPriceText = await shoppingCart.totalPriceCart.textContent!()
            //const totalPriceNumber = Number(totalPriceText!.replace(/\D/g, ''))
            const totalPriceNumber = shoppingCart.number(totalPriceText!)
            expect(totalPriceNumber).toBe(priceWithDiscount)
        })
        await test.step('5. Click on the “Place Order” button', async() => {
            await shoppingCart.clickCartButton()
        })
        await test.step('6. Validate a success message is displayed with the text “Your order has been placed.”', async() => {
            await expect(shoppingCart.successMessageCart).toHaveText('Your order has been placed.')
        })
        await test.step('7. Validate that the cart is empty', async() => {
            await expect(shoppingCart.courseCart).not.toBeAttached()
        }) 
    })
})