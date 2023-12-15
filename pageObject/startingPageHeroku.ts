import { Page } from "@playwright/test"

export class BaseClass {
    constructor(
        readonly page: Page
        )
        {
            this.page = page
        }

        async goToPage(text: string){
            const clickedHiperlink = this.page.getByRole('link', { name: text })
            await clickedHiperlink.click()
        }

}