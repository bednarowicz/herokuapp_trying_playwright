import { expect } from '@playwright/test';
import { BaseClass } from '../pageObject/startingPageHeroku';
import { test} from '../test-options';

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
})