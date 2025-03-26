const { Builder } = require("selenium-webdriver");
const HomePage = require("../pages/HomePage");
const MoviesPage = require("../pages/MoviesPage");
const DetailPage = require("../pages/DetailPage");
const OnDemandPage = require("../pages/OnDemandPage");
const assert = require("assert");

describe("Telus TV Automation", function () {
    let driver, homePage, onDemandPage,moviesPage,detailPage;
    this.timeout(1000000);

    before(async function () {
        driver = await new Builder().forBrowser("chrome").build();
        homePage = new HomePage(driver);
        onDemandPage = new OnDemandPage(driver);
        moviesPage = new MoviesPage(driver);
        detailPage = new DetailPage(driver);
        await driver.get("https://telustvplus.com/");
    });


    it("The asset with the E rating should be displayed", async function () {
        await homePage.closePopup();
        await homePage.goToOnDemand();
        await onDemandPage.viewAllMovies();
        await onDemandPage.filterAnimatedMovies();
        await moviesPage.getAndClickOnRating("E");
        let rating = await detailPage.getRating();
        assert.strictEqual(rating, "E", `Expected rating "E", but found "${rating}"`);
    });

    after(async function () {
        await driver.quit();
    });
});