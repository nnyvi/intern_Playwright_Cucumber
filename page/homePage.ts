import { page } from "../hooks/hooks";
import { expect } from "@playwright/test";
import { DataTable } from "@cucumber/cucumber";

export class HomePage {
    private Elements = {
        home: "//div[@id='pagewrap']",
        item: "//img[@loading='lazy']",
        slider: "//div[contains(@class, 'n2-ss-slider-')]",
        seleniumImage: "//img[@title='Selenium Ruby']",
        masteringJsImage: "//img[@title='Mastering JavaScript']",
        thinkinginHTMLImage: "//img[@title='Thinking in HTML']",
        addBtn: "//button[@class='single_add_to_cart_button button alt']",
        descriptionBtn: "//a[@href='#tab-description']",
        descriptionTab: "//div[@id='tab-description']//h2",
        reviewBtn: "//a[@href='#tab-reviews']",
        reviewTab: "//h2[@class='woocommerce-Reviews-title']",
        cart: "//span[@class='cartcontents']",
        proceedtoChkoutBtn: "//*[contains(text(),'Proceed to Checkout')]",
        couponInput: "//input[@name='coupon_code']",
        applyCouponBtn: "//input[@name='apply_coupon']",
        basketMes: "//div[@class='woocommerce-message']",
        basketErr: "//ul[@class='woocommerce-error']//li",
        basketRow: "//table//tbody//tr",
        updateBtn: "//input[@value='Update Basket']",
        prodSubtotal: "//td[@class='product-subtotal']",

    }

    async verifyArrivals() {
        await page.locator(this.Elements.home).scrollIntoViewIfNeeded();
        const arrivals = page.locator(this.Elements.item);
        await expect(arrivals).toHaveCount(3);
    }

    async verifySliders() {
        const sliders = page.locator(this.Elements.slider);
        await expect(sliders).toHaveCount(3);
    }

    async click(txt: string) {
        let element = "";
        switch(txt) {
            case "Selenium Ruby":
                element = this.Elements.seleniumImage;
                break;
            case "Thinking in HTML":
                element = this.Elements.thinkinginHTMLImage;
                break;
            case "Mastering Javascript":
                element = this.Elements.masteringJsImage;
                break;
            case 'description':
                element = this.Elements.descriptionBtn;
                break;
            case 'reviews':
                element = this.Elements.reviewBtn;
                break;
            case 'addtobasket':
                element = this.Elements.addBtn;
                break;
            case 'items':
                element = this.Elements.cart;
                break;
            case 'proceedtocheckout':
                element = this.Elements.proceedtoChkoutBtn;
                break;
        }
        await page.locator(this.Elements.home).scrollIntoViewIfNeeded();
        await page.click(element);
    }

    async navigate(txt: string) {
        let element = "";
        switch (txt) {
            case 'description':
                element = this.Elements.addBtn;
                break;
            case 'proceedtocheckout': 
                element = this.Elements.proceedtoChkoutBtn;
                await page.locator(element).scrollIntoViewIfNeeded();
                break;
        }
        await expect (page.locator(element)).toBeVisible();
    }

    async verify(table: DataTable, txt: string) {
        let element = "";
        switch (txt) {
            case 'description':
                element = this.Elements.descriptionTab;
                break;
            case 'reviews':
                element = this.Elements.reviewTab;
                break;
            case 'cart':
                element = this.Elements.cart;
                break;
            case 'message':
                element = this.Elements.basketMes;
                break;
            case 'error':
                element = this.Elements.basketErr;
                break;
        }
        const expectRel = table.raw()[0][0];
        const actualRel = await page.textContent(element);
        expect (actualRel).toBe(expectRel);
    }

    async applyCoupon (txt: string) { 
        await page.fill(this.Elements.couponInput, txt);
        await page.click(this.Elements.applyCouponBtn);
    }

    async removeItem (txt: string) {
        const row = page.locator(this.Elements.basketRow);
        const btn = row.filter({ hasText: txt}).getByTitle('Remove this item');
        await btn.click();
    }

    async updQuantity (txt: string, quantity: string) {
        const row = page.locator(this.Elements.basketRow);
        const input = row.filter({ hasText: txt}).getByTitle('Qty');
        await input.fill(quantity);
        await page.click(this.Elements.updateBtn);
    }

    async verifyUpdBtn (status: string) {
        let updBasket = page.locator(this.Elements.updateBtn);
        switch (status) {
            case 'Enabled':
                await expect(updBasket).toBeEnabled();
                break;
            case 'Disabled':
                await expect(updBasket).toBeDisabled();
                break;
        }
    }

    async verifyPrice (txt: string, subtotal: string) {
        const row = page.locator(this.Elements.basketRow);
        const input = row.filter({ hasText: txt}).locator(this.Elements.prodSubtotal);
        await expect (input.textContent()).toBe(subtotal);
    }

}