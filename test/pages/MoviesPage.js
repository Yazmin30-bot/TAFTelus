const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class MoviesPage extends BasePage {
    constructor(driver) {
        super(driver);       
    }

    numberMovies = By.xpath("//div[@class='subtitle-container']/h2");

    async getAndClickOnRating(ratingLetter) {
        let foundMovie = null;
        let previousMoviesCount = 0;
        const targetMoviesText = await this.getText(this.numberMovies);
        const targetMoviesCount = parseInt(targetMoviesText.split(" ")[0], 10);
        const pollingInterval = 2000; 
        const timeout = 1000000; 
        const startTime = Date.now();

        while ((Date.now() - startTime) < timeout) {
            
            let movies = await this.driver.findElements(By.xpath("//p[@class='subtitle']"));
            
            for (let i = 0; i < movies.length; i++) {
                let movie = movies[i];
                let rating = await movie.getText();

                if (rating && rating.trim() === ratingLetter) {
                    foundMovie = movie;
                    console.log("Found a movie with 'E' rating. Stopping scroll.");
                    break;
                }
            }

            if (foundMovie) {
                break;
            }

            if (previousMoviesCount === movies.length && movies.length !== 20) {
                await this.driver.navigate().refresh();
                await new Promise(resolve => setTimeout(resolve, 5000));
                continue; 
            }

            previousMoviesCount = movies.length; 

            if (movies.length < targetMoviesCount) {
                await this.scrollToBottom();
                await new Promise(resolve => setTimeout(resolve, pollingInterval));
            } else {
                console.log("Reached the target of 1146 movies.");
                break; 
            }

            await this.scrollToBottom();

            await new Promise(resolve => setTimeout(resolve, pollingInterval));
        }

        await this.click(foundMovie); 
    }
}

module.exports = MoviesPage ;
