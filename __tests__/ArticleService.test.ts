import { scrapeArticleTextFromPage } from "../src/services/ArticleService";

describe("scrapArticleTextFromPage function", () => {
	describe("should return an empty string", () => {
		test("when rawPage parameter is empty", () => {
			//given
			const rawPage: string = "";

			//when
			const result: string = scrapeArticleTextFromPage(rawPage);

			//then
			expect(result).toMatch("");
		});

		test("when there is no headers and paragraphs in rawPage", () => {
			//given
			const rawPage: string = `
        		below is a list
        		<ul>
					some text in the list
            		<li>Coffee</li>
            		<li>Tea</li>
            		<li>Milk</li>
        		</ul>
        		<div>I'm in a div</div>
				<a>hyperlink!</a>
			`;

			//when
			const result: string = scrapeArticleTextFromPage(rawPage);

			//then
			expect(result).toMatch("");
		});
	});
	describe("should return text", () => {
		test("'cars' when rawPage contains only a header about cars", () => {
			//given
			const rawPage: string = "<h1>cars</h1>";

			//when
			const result: string = scrapeArticleTextFromPage(rawPage);

			//then
			expect(result).toMatch("cars");
		});
		test("'cars' when rawPage contains not only a header about cars", () => {
			//given
			const rawPage: string = "<h1>cars</h1>cars are <a>slow</a>";

			//when
			const result: string = scrapeArticleTextFromPage(rawPage);

			//then
			expect(result).toMatch("cars");
		});
		test("'Red cars\n\nRed cars are fast.' when rawPage contains not only a header and paragraph about cars", () => {
			//given
			const rawPage: string = "<h1>Red cars</h1><p>Red cars are fast.</p>";

			//when
			const result: string = scrapeArticleTextFromPage(rawPage);

			//then
			expect(result).toMatch("Red cars\n\nRed cars are fast.");
		});
		test("'Cars\n\nred.\nfast.' when rawPage contains a header and paragraphs about cars", () => {
			//given
			const rawPage: string = "<h1>Cars</h1><p>red.</p><p>fast.</p>";

			//when
			const result: string = scrapeArticleTextFromPage(rawPage);

			//then
			expect(result).toMatch("Cars\n\nred.\nfast.");
		});
	});
});
