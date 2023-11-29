import { page } from "../hooks/hooks";
import { expect } from "@playwright/test";
import { DataTable } from "@cucumber/cucumber";

export class HomePage {
    private Elements = {
        home: "//div[@id='pagewrap']",
        item: "//img[@loading='lazy']",
        slider: "//div[contains(@class, 'n2-ss-slider-')]",
        seleniumImage: "//img[@title='Selenium Ruby']",
        seleniumAdd: "//a[@data-product_id='160']",
        masteringJsImage: "//img[@title='Mastering JavaScript']",
        thinkinginHTMLImage: "//img[@title='Thinking in HTML']",
        thinkAdd: "//a[@data-product_id='163']",
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
        subtotal: "//td[@data-title='Subtotal']",
        tax: "//td[@data-title='Tax']",
        total: "//tr[@class='order-total']//td[@data-title='Total']",
        paymentTitle: "//div[@class='woocommerce-billing-fields']//h3",
        fstName: "//input[@id='billing_first_name']",
        lstName: "//input[@id='billing_last_name']",
        email: "//input[@id='billing_email']",
        phone: "//input[@id='billing_phone']",
        address: "//input[@id='billing_address_1']",
        city: "//input[@id='billing_city']",
        postcode: "//input[@id='billing_postcode']",
        paymentMes: "//p[@class='woocommerce-thankyou-order-received']",
        placeorderBtn: "//input[@class='button alt']",
        blankMes: "//ul[@class='woocommerce-error']//li"
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
            case "Add Selenium":
                element = this.Elements.seleniumAdd;
                break;
            case "Thinking in HTML":
                element = this.Elements.thinkinginHTMLImage;
                break;
            case "Add Think":
                element = this.Elements.thinkAdd;
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
            case 'Proceed to Checkout':
                element = this.Elements.proceedtoChkoutBtn;
                break;
            case 'Place order':
                element = this.Elements.placeorderBtn;
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
            case 'Proceed to Checkout':
                element = this.Elements.paymentTitle;
                break;
            case 'Success payment':
                element = this.Elements.paymentMes;
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

    async verifyPrice (table: DataTable) {
        const elements = [
            this.Elements.prodSubtotal,
            this.Elements.subtotal,
            this.Elements.tax,
            this.Elements.total
        ];
        let expectVal = table.raw()[1];
        for ( let i = 0; i < elements.length; i ++) {
            const actualVal = await page.locator(elements[i]).textContent()
            await expect(actualVal?.trim()).toBe(expectVal[i].trim());
        }
    }

    async fillPayment (table: DataTable) {
        const elements = [
            this.Elements.fstName,
            this.Elements.lstName,
            this.Elements.email,
            this.Elements.phone,
            this.Elements.address,
            this.Elements.city,
            this.Elements.postcode
        ]
        for (let i = 0; i < elements.length; i++) {
            const inputValue = table.raw()[1][i];
            await page.fill(elements[i], inputValue);
        }
    }

    async verifyBlank (table: DataTable) {
        const errorMess = table.raw;
        for (let i = 0; i < errorMess.length; i++) {
            const expectVal = errorMess()[i][0]
            const actualVal = await page.textContent(this.Elements.blankMes);
            expect(actualVal).toBe(expectVal);
        }
    }
}