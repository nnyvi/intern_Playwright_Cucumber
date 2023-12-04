import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { HomePage } from "../page/homePage";

let homePage: HomePage;

//Verify that there are three Slider on Home page
Given('User is on the Books Shop Home page --slider', function () {
    homePage = new HomePage();
});

Then('The Home page should contain three Sliders only --slider', async function () {
    await homePage.verifySliders();
});

//Verify that there are three new Arrivals displaying on Home page
Given('User is on the Books Shop Home page --arrival', function () {
    homePage = new HomePage();
});

Then('The Home page should contain three Arrivals only --arrival', async function () {
    await homePage.verifyArrivals();
});

//Verify that the user is navigated to the next page where they can add that book into their basket.
Given('User is on the Books Shop Home page --navigate', function () {
    homePage = new HomePage();
});

When('User clicks on {string} image in the Arrivals --navigate', async function (string) {
    await homePage.click(string);
});

Then('User should be navigated to the next page to add that book to basket --navigate', async function () {
    await homePage.navigate('description');
});

//Verify that the user can see description of book when clicking on description button
Given('User is on the Books Shop Home page --description', function () {
    homePage = new HomePage();
});

When('User clicks on {string} image in the Arrivals --description', async function (string) {
    await homePage.click(string);
});

Then('There should be a description regarding that book the user clicked on --description', async function (table: DataTable) {
    await homePage.click('description');
    await homePage.verify(table, 'description');
});

//Verify that the user can see reviews of book when clicking on Reviews button
Given('User is on the Books Shop Home page --reviews', function () {
    homePage = new HomePage();
});

When('User clicks on {string} image in the Arrivals --reviews', function (string) {
    homePage.click(string);
});

Then('There should be a Reviews regarding that book the user clicked on --reviews', async function (table: DataTable) {
    await homePage.click('reviews');
    await homePage.verify(table, 'reviews');
});

//Verify that the user can add book into the item when clicking on add to basket button
Given('User is on the Books Shop Home page --add', function () {
    homePage = new HomePage();
});

When('User clicks on {string} image in the Arrivals --add', async function (string) {
    await homePage.click(string);
});

When('User clicks on Add to Basket button --add', async function () {
    await homePage.click('addtobasket');
});

Then('The cart should update item quantity in the basket --add', async function (table: DataTable) {
    await homePage.verify(table, 'cart');
});

//Verify that the user is navigated to the checkout page when clicking on the items link after add book to basket
Given('User is on the Books Shop Home page --items', function () {
    homePage = new HomePage();
});

When('User clicks on {string} image in the Arrivals --items', async function (string) {
    await homePage.click(string);
});

When('User clicks Add to Basket button --items', async function () {
    await homePage.click('addtobasket');
});

When('User clicks on Item link --items', async function () {
    await homePage.click('items');
});

Then('User should be navigated to proceed to checkout page --items', async function () {
    await homePage.navigate('proceedtocheckout');
});

//Verify that the coupon is applied for total for the book having value more 450 and not being a sale product
Given('User is on the Books Shop Home page --coupon', function () {
    homePage = new HomePage();
});

When('User clicks on {string} image in the Arrivals --coupon', async function (string) {
    await homePage.click(string);
});

When('User clicks Add to Basket button --coupon', async function () {
    await homePage.click('addtobasket');
});

When('User clicks on Item link --coupon', async function () {
    await homePage.click('items');
});

When('User applys {string} Coupon code --coupon', async function (string) {
    await homePage.applyCoupon(string);
});

Then('There should be a successfully applied message displayed --coupon', async function (table: DataTable) {
    await homePage.verify(table, 'message');
});

//Verify that the book is removed when the user clicks on the remove button in the checkout page
Given('User is on the Books Shop Home Page --remove', function () {
    homePage = new HomePage();
});

When('User clicks on {string} image in the Arrivals --remove', function (string) {
    homePage.click(string);
});

When('User clicks Add to Basket button --remove', async function () {
    await homePage.click('addtobasket');
});

When('User clicks on Item link --remove', function () {
    homePage.click('items');
});

When('User removes the {string} book in basket --remove', async function (string) {
    await homePage.removeItem(string);
});

Then('There should be a message displayed --remove', async function (table: DataTable) {
    await homePage.verify(table, 'message');
});

//Verify that the items information is updated when the user modifies the quantity of books
Given('User is on the Books Shop Home Page --add book', function () {
    homePage = new HomePage();
});

When('User click on {string} image in the Arrivals --add book', function (string) {
    homePage.click(string);
});

When('User clicks Add to Basket button --add book', async function () {
    await homePage.click('addtobasket');
});

When('User clicks on Item link --add book', function () {
    homePage.click('items');
});

Then('The update basket button should be unclickable --add book', async function () {
    await homePage.verifyUpdBtn('Disabled');
});

When('User modifies quantity for {string} and clicks on Update basket button --add book', async function (string) {
    await homePage.updQuantity(string, '10');
});

Then('There should be a successfully updated message displayed --add book', async function (table: DataTable) {
    await homePage.verify(table, 'message');
});

//Verify that the total price of book, subtotal, tax and total are displayed 
Given('User is on the Books Shop Home page --total', function () {
    homePage = new HomePage();
});

When('User click on {string} image in the Arrivals --total', async function (string) {
    await homePage.click(string);
});

When('User clicks Add to Basket button --total', async function () {
    await homePage.click('addtobasket');
});

When('User clicks on Item link --total', async function () {
    await homePage.click('items');
});

Then('There should be the information to checkout for the books in basket --total', async function (table: DataTable) {
    await homePage.verifyPrice(table);
});

//Verify that the user is navigated to the payment page when clicking on the Proceed to checkout button
Given('User is on the Books Shop Home page --checkout', function () {
    homePage = new HomePage();
});

When('User click on {string} image in the Arrivals --checkout', async function (string) {
    await homePage.click(string);
});

When('User clicks Add to Basket button --checkout', async function () {
    await homePage.click('addtobasket');
});

When('User clicks on Item link --checkout', async function () {
    await homePage.click('items');
});

When('User click on {string} button under total --checkout', async function (string) {
    await homePage.click(string);
});

Then('User should be navigated to payment gateway page --checkout', async function (table: DataTable) {
    await homePage.verify(table, 'Proceed to Checkout');
});

//Verify that there is a successful payment message when clicking on the Place order button after filling required information
Given('User is on the Books Shop Home page --payment', function () {
    homePage = new HomePage();
});

When('User click on {string} image in the Arrivals --payment', async function (string) {
    await homePage.click(string);
});

When('User clicks Add to Basket button --payment', async function () {
    await homePage.click('addtobasket');
});

When('User clicks on Item link --payment', async function () {
    await homePage.click('items');
});

When('User click on {string} button under total --payment', async function (string) {
    await homePage.click(string);
});

When('User fills information to payment and click {string} button --payment', async function (string, table: DataTable) {
    await homePage.fillPayment(table);
    await homePage.click(string);
});

Then('There should be a successful payment message --payment', async function (table: DataTable) {
    await homePage.verify(table, 'Success payment');
});

//Verify that there are validation error messages displayed when clicking place order button without filling payment information
Given('User is on the Books Shop Home page --blank', async function () {
    homePage = new HomePage()
});

When('User clicks on {string} image in the Arrivals --blank', async function (string) {
    await homePage.click(string)
});

When('User clicks on Add to Basket button --blank', async function () {
    await homePage.click('addtobasket')
});

When('User clicks on Item Link --blank', async function () {
    await homePage.click('items')
});

When('User clicks on {string} button under total --blank', async function (string) {
    await homePage.click(string)
});

When('User clicks on {string} button --blank', async function (string) {
    await homePage.click(string)
});

Then('There should be validation error messages displayed above billing details --blank', async function (table: DataTable) {
    await homePage.verifyBlank(table);
});

//Verify that user can not apply coupon for sale book
Given('User is on the Books Shop Home page --sale', function () {
    homePage = new HomePage();
});

When('User clicks on ADD TO BASKET button of Thinking in HTML image in the Arrivals--sale', async function () {
    await homePage.click("Add Think");
});

When('User clicks on ADD TO BASKET button of Selenium Ruby image in the Arrivals--sale', async function () {
    await homePage.click("Add Selenium");
});

When('User clicks on {string} link --sale', async function (string) {
    await homePage.click(string)
});

When('User applys {string} coupon code for basket --sale', async function (string) {
    await homePage.applyCoupon(string)
});

Then('There should be an error message displayed --sale', async function (table: DataTable) {
    await homePage.verify(table, 'error');
});

//Verify that user can not apply coupon for book having price less 450
Given('User is on the Books Shop Home page --coupon less', function () {
    homePage = new HomePage()
});

When('User clicks on ADD TO BASKET button of Mastering Javascript image in the Arrivals --coupon less', async function () {
    await homePage.click("Add Mastering Js")
});

When('User clicks on {string} link --coupon less', async function (string) {
    await homePage.click(string);
});

When('User applys {string} coupon code for basket --coupon less', async function (string) {
    await homePage.applyCoupon(string);
});

Then('There should be an error message displayed --coupon less', async function (table: DataTable) {
    await homePage.verify(table, "error")
});