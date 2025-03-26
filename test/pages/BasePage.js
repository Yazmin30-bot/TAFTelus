const { until } = require("selenium-webdriver");
class BasePage {
    constructor(driver) {
        this.driver = driver;
        this.driver.manage().window().maximize();
    }
    async click(element) {
        await element.click();
    }

    async enterText(element, text) {
        await element.sendKeys(text);
    }

    async scrollToElement(element) {
        await this.driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", element);
    }

    async waitForElement(locator, timeout = 10000) {
        await this.driver.wait(until.elementLocated(locator), timeout);
        return await this.driver.findElement(locator);
    }

    async waitForPageLoad(timeout = 10000) {
        await this.driver.wait(async () => {
            const readyState = await this.driver.executeScript("return document.readyState");
            return readyState === "complete";
        }, timeout);
    }


    async scrollToBottom() {
        await this.driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
    }

    async getText(locator) {
        const element = await this.waitForElement(locator); 
        return await element.getText(); 
    }
    
   
  
}
module.exports = BasePage;