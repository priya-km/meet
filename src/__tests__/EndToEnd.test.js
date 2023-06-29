import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  let browser, page;
  jest.setTimeout(30000);

  beforeAll(async () => {
    try {
      browser = await puppeteer.launch({
        headless: false,
        slowMo: 250, // slow down by 250ms
        ignoreDefaultArgs: ["--disable-extensions"],
      });
      page = await browser.newPage();
      await page.goto("http://localhost:3000/meet");
      await page.waitForSelector(".event");
    } catch (err) {
      console.error("Error during setup:", err);
    }
  });
  afterAll(async () => {
    await browser.close();
  });

  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".event .event__Details");
    expect(eventDetails).toBeNull();
  });

  test("User can expand an event to see its details", async () => {
    await page.click(".event .details-btn");
    const eventDetails = await page.$(".event .event__Details");
    expect(eventDetails).toBeDefined();
  });

  test("User can collapse an event to hide its details", async () => {
    await page.click(".event .details-btn");
    const eventDetails = await page.$(".event .event__Details");
    expect(eventDetails).toBeNull();
  });
});
