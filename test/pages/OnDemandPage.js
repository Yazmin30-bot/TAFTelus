const { until, By } = require("selenium-webdriver");
const BasePage = require("./BasePage");
class OnDemandPage extends BasePage {
    constructor(driver) {
        super(driver);
    }

    viewAllMoviesBtn= By.xpath("//a[contains(@href, '/viewall/TRAY/SEARCH/VOD')]/span[text()='Movies']");
    filterBtn = By.xpath("//div[text()='Filter']");
    animatedOption = By.xpath("//span[text()='Animated']/preceding-sibling::span");
    applyFilterBtn = By.xpath("//div[text()='Apply']");


    async viewAllMovies() {
        try {
            // Wait for the "View All Movies" button to be located and visible
            const onDemandBtn = await this.waitForElement(this.viewAllMoviesBtn);
            
            // Scroll to the button and click it
            await this.scrollToElement(onDemandBtn);
            await this.click(onDemandBtn);
        } catch (error) {
            console.error("Error: 'View All Movies' button not found or not clickable.");
            throw error;
        }       
    }
    
    async filterAnimatedMovies() {
        try {
            // Wait for the "Filter" button, scroll to it, and click it
            const filterBtn = await this.waitForElement(this.filterBtn);
            await this.scrollToElement(filterBtn);
            await this.click(filterBtn);
    
            // Wait for the "Animated" option and select it if not already selected
            const radioButton = await this.waitForElement(this.animatedOption);
            const isSelected = await radioButton.isSelected();
            if (!isSelected) {
                await this.click(radioButton);
                console.log("Animated filter option selected.");
            } else {
                console.log("Animated filter option is already selected.");
            }
    
            // Wait for the "Apply" button, scroll to it, and click it
            const applyBtn = await this.waitForElement(this.applyFilterBtn);
            await this.scrollToElement(applyBtn);
            await this.click(applyBtn);
        } catch (error) {
            console.error("Error: Unable to apply animated filter.");
            throw error;
        }      
    }
    
}
module.exports = OnDemandPage;
