const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class HomePage extends BasePage {
    constructor(driver) {
        super(driver);
    }

    popupCloseBtn = By.css("span[class='close-modal'] button[type='button']");
    onDemandLink = By.xpath("//a[contains(text(), 'On Demand')]");

    async closePopup() {
        const popup = await this.waitForElement(this.popupCloseBtn);
        await this.click(popup);
    }

    async goToOnDemand() {
        const onDemand = await this.waitForElement(this.onDemandLink);
        await this.click(onDemand);
    } 

}

module.exports = HomePage;
