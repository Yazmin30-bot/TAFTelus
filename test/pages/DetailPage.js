const { until, By } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class DetailPage extends BasePage {
    constructor(driver) {
        super(driver);
    }

    rating = By.xpath("//h2[@data-testid='wallContentCategory']");

    async getRating() {
        /*try {
            let ratingText = await this.driver.wait(
                until.elementLocated(this.rating),
                10000
            );
            

            // Wait until the element is visible
            await this.driver.wait(until.elementIsVisible(ratingText), 5000);
        
            let text = await ratingText.getText(); // Extracts full text, e.g., "G | 2011 | Animated | 1h 29m"

            let ratingLetter = text.split(" | ")[0]; // Extracts only "G"
            return ratingLetter;
        } catch (error) {
            console.error("Error: 'On Demand' button not found or not clickable.");
            throw error;
        }*/
            try {
                // Wait for the rating element to be located and visible
                const ratingElement = await this.waitForElement(this.rating);
    
                // Retrieve the text of the rating element
                const text = await ratingElement.getText(); // Example: "G | 2011 | Animated | 1h 29m"
    
                // Extract and return the rating letter (e.g., "G")
                return text.split(" | ")[0];
            } catch (error) {
                console.error("Error: Unable to retrieve the rating.");
                throw error;
            }

    }

  
}

module.exports = DetailPage;
