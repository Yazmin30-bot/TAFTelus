const { Builder } = require("selenium-webdriver");
const HomePage = require("../pages/HomePage");
const MoviesPage = require("../pages/MoviesPage");
const DetailPage = require("../pages/DetailPage");
const assert = require("assert");
const OnDemandPage = require("../pages/OnDemandPage");

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


    it("should continue scrolling until there are all the Animated movies", async function () {
        await homePage.closePopup();
        await homePage.goToOnDemand();
        await onDemandPage.viewAllMovies();
        await onDemandPage.filterAnimatedMovies();
        await moviesPage.getAndClickOnRating("E");
        let rating = await detailPage.getRating();
        assert(rating === "E", `Expected rating "E", but found "${rating}"`);
    

    });

    after(async function () {
        await driver.quit();
    });
});