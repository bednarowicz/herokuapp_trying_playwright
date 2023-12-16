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
    test("Drag and Drop", async ({baseClass, page}) => {
        await baseClass.goToPage("Drag and Drop")
        const firstPlaceForSquare = page.locator('#column-a')
        const secondPlaceForSquare = page.locator('#column-b')

        const headerLocator = page.locator('header')

        const firstHeader = firstPlaceForSquare.filter({has: headerLocator})
        const secondHeader = secondPlaceForSquare.filter({has: headerLocator})

        await firstPlaceForSquare.dragTo(secondPlaceForSquare)


        await expect(firstHeader).toHaveText("B")
        await expect(secondHeader).toHaveText("A")
    })
    test("Dropdown List", async ({baseClass, page}) => {
        await baseClass.goToPage("Dropdown")
        const dropdownList = page.locator('#dropdown')

        await dropdownList.selectOption("Option 1")
      
        await expect(dropdownList).toHaveValue("1")        
    })

    test("Dynamic Content", async ({baseClass, page}) => { // refreshed page till jokes will be visible as 3rd picture
        test.slow()
        await baseClass.goToPage("Dynamic Content")
        const thirdText = page.locator('#content .large-10').nth(2)
        const thirdPicture = page.locator('img').nth(3)
        const desiredImage:string = '/img/avatars/Original-Facebook-Geek-Profile-Avatar-7.jpg'
        const desiredText:string = 'Voluptatem'
        var actualText = await thirdText.textContent() 
        var actualPictureSrc = await thirdPicture.getAttribute('src')
        var actualTextTxt:string = <string>actualText
        var actualPictureSrcTxt:string = <string>actualPictureSrc
        // actualTextTxt.includes(desiredText) && 
        while(!(actualPictureSrcTxt.includes(desiredImage))){
            console.log(actualTextTxt)
            console.log(actualPictureSrcTxt)
            await page.reload()
            actualText = await thirdText.textContent() 
            actualPictureSrc = await thirdPicture.getAttribute('src')
            var actualTextTxt:string = <string>actualText
            var actualPictureSrcTxt:string = <string>actualPictureSrc
            }
        })
        test("Dynamic Controls", async ({baseClass, page}) => {
            await baseClass.goToPage("Dynamic Controls")
            const checkbox = page.getByRole('checkbox')
            const removeButton = page.getByRole('button', {name: "Remove" })
            const checkboxMessage = page.locator('#checkbox-example #message')

            await expect(checkbox).toBeEnabled()
            await checkbox.click()
            await expect(checkbox).toBeChecked()

            await removeButton.click()
            await expect(page.locator('#loading')).toBeHidden()
            await expect(checkboxMessage).toContainText("It's gone!")    

            const field = page.getByRole('textbox')
            const enableButton = page.getByRole('button', {name: "Enable" })
            const fieldMessage = page.locator('#input-example #message')
            await expect(field).toBeDisabled()
            await enableButton.click()
            await expect(field).toBeEnabled()
            await field.fill("Test")
            expect(field).toHaveValue("Test")
            
        })
        test("Dynamic Loading1", async ({baseClass, page}) => {
            await baseClass.goToPage("Dynamic Loading")
            await page.getByRole('link', { name: 'Example 1: Element on page' }).click()
            const hiddenText =  page.locator('h4').nth(1)
            await page.getByRole('button').click()
            await hiddenText.waitFor({state: 'visible'})
            await expect(hiddenText).toBeVisible()

            
        })
        test("Dynamic Loading2", async ({baseClass, page}) => {
            await baseClass.goToPage("Dynamic Loading")
            await page.getByRole('link', { name: 'Example 2: Element rendered after the fact' }).click()
            const hiddenText =  page.locator('h4').nth(1)
            await page.getByRole('button').click()
            await hiddenText.waitFor({state: 'visible'})
            await expect(hiddenText).toBeVisible()
            
            
        })
        test("Entry Ad", async ({baseClass, page}) => {
            await baseClass.goToPage("Entry Ad")
            await expect(page.locator('#modal')).toBeVisible()
            await page.getByText('Close', { exact: true }).click()
            await expect(page.locator('#modal')).toBeHidden()
        })
})