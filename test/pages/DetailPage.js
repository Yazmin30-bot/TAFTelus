const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class DetailPage extends BasePage {
    constructor(driver) {
        super(driver);
    }

    rating = By.xpath("//h2[@data-testid='wallContentCategory']");

    async getRating() {
  
            try {
                const ratingElement = await this.waitForElement(this.rating);
                const text = await ratingElement.getText(); 
                return text.split(" | ")[0];
            } catch (error) {
                console.error("Error: Unable to retrieve the rating.");
                throw error;
            }

    }

  
}

module.exports = DetailPage;
