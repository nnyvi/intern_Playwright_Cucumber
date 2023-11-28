import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { HomePage } from "../page/homePage";

let homePage: HomePage;

//Home Page with three Sliders only
Given('User is on the Books Shop Home page --slider', function () {
    homePage = new HomePage();
});

Then('The Home page should contain three Sliders only --slider', async function () {
    await homePage.verifySliders();
});

//Home Page with three Arrivals only
Given('User is on the Books Shop Home page --arrival', function () {
    homePage = new HomePage();
});

Then('The Home page should contain three Arrivals only --arrival', async function () {
    await homePage.verifyArrivals();
});

//Home page - Images in Arrivals should navigate
Given('User is on the Books Shop Home page --navigate', function () {
    homePage = new HomePage();
});

When('User clicks on {string} image in the Arrivals --navigate', async function (string) {
    await homePage.click(string);
});

Then('User should be navigated to the next page to add that book to basket --navigate', async function () {
    await homePage.navigate('description');
});

//Home page - Arrivals - Images - Description
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

//Home page - Arrivals - Images - Reviews
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

//Home page - Arrivals - Images - Add to Basket
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

//Home - Arrivals - Add to Basket - Items
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

//Home - Arrivals - Add to Basket - Items - Coupon
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

//Home - Arrivals - Add to Basket - Items - Coupon value < 450
Given('User is on the Books Shop Home page --less 450', function () {
    homePage = new HomePage();
});

When('User clicks on {string} image in the Arivals --less 450', async function (string) {
    await homePage.click(string);
});

When('User clicks Add to Basket button --less 450', async function () {
    await homePage.click('addtobasket');
});

When('User clicks on Item link --less 450', async function () {
    await homePage.click('items');
});

When('User applys {string} Coupon code --less 450', async function (string) {
    await homePage.applyCoupon(string);
});

Then('There should be a error message displayes --less 450', async function (table: DataTable) {
    await homePage.verify(table, 'error');
});

//Home - Arivals - Add to Basket - Items - Remove book
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

//Home - Arrivals - Add to Basket - Items - Add book - Update basket
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

//Home - Arrivals - Add to Basket - Check out - Book Final price - Total & Sub-total condition
Given('User is on the Books Shop Home page --total', function () {
    homePage = new HomePage();
});

When('User click on {string} image in the Arrivals --total', function (string) {
    homePage.click(string);
});

When('User clicks Add to Basket button --total', async function () {
    await homePage.click('addtobasket');
});

When('User clicks on Item link --total', function () {
    homePage.click('items');
});

Then('There should be the total price of the books --total', function () {
   
});

Then('There also should be total above the Proceed to Checkout button --total', function () {
    
});

Then('The tax value should be {int}% --total', function (int) {
   
});