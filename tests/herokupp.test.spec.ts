import { Locator, expect } from '@playwright/test';
import { BaseClass } from '../pageObject/startingPageHeroku';
import { test} from '../test-options';
import { Console } from 'console';

test.describe("Herokup tests" , () => {
    test.beforeEach("Going to starting page", async ({page}) => {
        await page.goto("http://the-internet.herokuapp.com/")
    })
    test("Checking test", async ({baseClass, page}) => {
        await baseClass.goToPage("A/B Testing")
        await page.goBack();
        await expect(page.locator('h1')).toHaveText("Welcome to the-internet")
    })
    test("Add/Remove Elements", async ({baseClass, page}) => {
        await baseClass.goToPage("Add/Remove Elements")
        const addButton =  page.getByRole('button', { name: 'Add Element' })
        const addedAmount =  5
        for(let i=0; i< addedAmount; i++){
            await addButton.click()
        }
        const actuallyAddedButtons = page.locator(".added-manually")
        expect(actuallyAddedButtons).toHaveCount(addedAmount)

        const removedAmount = 3
        const removeButtons = page.getByRole('button', { name: 'Delete' })
        for(let i=0; i<removedAmount; i++){
            await removeButtons.first().click()
        }
        expect(removeButtons).toHaveCount(addedAmount-removedAmount)

    })
    test("Basic auth", async ({baseClass, page}) => {
        await baseClass.goToPage("Basic Auth")
        const textOnMiddle = page.locator('p')
        await expect(textOnMiddle).toHaveText("Congratulations! You must have the proper credentials.")
    })
    test.skip("Images", async ({baseClass, page}) => {
        await baseClass.goToPage("Broken Images") //incorrect approach, should be redone
        // const imagesProperLocators = page.getByRole("img")
        // const imagesAllLocators = page.locator('img')

        // var imagesProperLinks: Locator[]
        // var imagesAllLinks: Locator[]

        // await imagesProperLinks = imagesAllLocators.all()

        // console.log("Wszystkie obrazki to: ")
        // console.log(imagesAllLinks)
        // console.log("Niepoprawne obrazki to: ")
        // console.log(imagesImproperLinks)
    })
    test("Test huge table", async ({baseClass, page}) => {
        await baseClass.goToPage("Checkboxes")
        const checkbox1 = page.getByRole('checkbox').first()
        const checkbox2 = page.getByRole('checkbox').nth(1)

        await checkbox1.check()

        expect(await checkbox1.isChecked()).toBeTruthy()

        await checkbox1.uncheck()
        await checkbox2.uncheck()

        expect(await checkbox1.isChecked()).toBeFalsy()
        expect(await checkbox2.isChecked()).toBeFalsy()
    })

    test.skip("Context Menu", async ({baseClass, page}) => {
        await baseClass.goToPage("Context Menu")
        const hotSpot = page.locator("#hot-spot")
        await hotSpot.click({button: "right"}) //for unkown reason to me no browser message is chowed
    })
    test("Digest Auth", async ({baseClass, page}) => {
        await baseClass.goToPage("Digest Auth")
        const textOnMiddle = page.locator('p')
        await expect(textOnMiddle).toHaveText("Congratulations! You must have the proper credentials.")
    })
    test("Disappearing Elements", async ({baseClass, page}) => {
        await baseClass.goToPage("Disappearing Elements")
        const probablyMissingButton = page.getByRole('link', { name: 'Gallery' })
        var amountSiteRefreshed = 0
        while( ! await probablyMissingButton.isVisible()){
            await page.reload()
            amountSiteRefreshed++
        }
        await expect(probablyMissingButton).toBeVisible()
        console.log('We needed ' + amountSiteRefreshed + ' reloads to show hiden button')
    })

})