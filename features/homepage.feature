Feature: Home Page

    # Scenario: Home Page with three Sliders only
    #     Given User is on the Books Shop Home page --slider
    #     Then The Home page should contain three Sliders only --slider

    # Scenario: Home Page with three Arrivals only
    #     Given User is on the Books Shop Home page --arrival
    #     Then The Home page should contain three Arrivals only --arrival

    # Scenario: Home page - Images in Arrivals should navigate
    #     Given User is on the Books Shop Home page --navigate
    #     When User clicks on "Selenium Ruby" image in the Arrivals --navigate
    #     Then User should be navigated to the next page to add that book to basket --navigate

    # Scenario: Home page - Arrivals - Images - Description
    #     Given User is on the Books Shop Home page --description
    #     When User clicks on "Selenium Ruby" image in the Arrivals --description
    #     Then There should be a description regarding that book the user clicked on --description
    #         | Product Description |

    # Scenario: Home page - Arrivals - Images - Reviews
    #     Given User is on the Books Shop Home page --reviews
    #     When User clicks on "Selenium Ruby" image in the Arrivals --reviews
    #     Then There should be a Reviews regarding that book the user clicked on --reviews
    #         | Reviews |

    # Scenario: Home page - Arrivals - Images - Add to Basket
    #     Given User is on the Books Shop Home page --add
    #     When User clicks on "Selenium Ruby" image in the Arrivals --add
    #     And User clicks on Add to Basket button --add
    #     Then The cart should update item quantity in the basket --add
    #         | 1 item |

    #Scenario: 7. Home page - Arrivals-Add to Basket with more books
    #Cannot find the Stock.Ex

    # Scenario: Home - Arrivals - Add to Basket - Items
    #     Given User is on the Books Shop Home page --items
    #     When User clicks on "Selenium Ruby" image in the Arrivals --items
    #     And User clicks Add to Basket button --items
    #     And User clicks on Item link --items
    #     Then User should be navigated to proceed to checkout page --items

    # Scenario: Home - Arrivals - Add to Basket - Items - Coupon
    #     Given User is on the Books Shop Home page --coupon
    #     When User clicks on "Selenium Ruby" image in the Arrivals --coupon
    #     And User clicks Add to Basket button --coupon
    #     And User clicks on Item link --coupon
    #     And User applys "krishnasakinala" Coupon code --coupon
    #     Then There should be a successfully applied message displayed --coupon
    #         | Coupon code applied successfully. |

    # Scenario: Home - Arrivals - Add to Basket - Items - Coupon value < 450
    #     Given User is on the Books Shop Home page --less 450
    #     When User clicks on "Mastering Javascript" image in the Arivals --less 450
    #     And User clicks Add to Basket button --less 450
    #     And User clicks on Item link --less 450
    #     And User applys "krishnasakinala" Coupon code --less 450
    #     Then There should be a error message displayes --less 450
    #         | The minimum spend for this coupon is ₹450.00. |

    Scenario: Home - Arivals - Add to Basket - Items - Remove book
        Given User is on the Books Shop Home Page --remove
        When User clicks on "Selenium Ruby" image in the Arrivals --remove
        And User clicks Add to Basket button --remove
        And User clicks on Item link --remove
        And User removes the "Selenium Ruby" book in basket --remove
        Then There should be a message displayed --remove
            | Selenium Ruby removed. Undo? |

