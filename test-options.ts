import {test as base} from '@playwright/test'
import { BaseClass } from './pageObject/startingPageHeroku'

export type TestOptions = {

    baseClass: BaseClass
}

export const test = base.extend<TestOptions>({

    baseClass:  async({page}, use) => {
        const pm = new BaseClass(page)
        await use(pm)
    }
})