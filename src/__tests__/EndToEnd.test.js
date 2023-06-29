import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  let browser, page;
  jest.setTimeout(30000);

  beforeAll(async () => {
    try {
      browser = await puppeteer.launch({
        /*     headless: false,
        slowMo: 250, // slow down by 250ms
        ignoreDefaultArgs: ["--disable-extensions"], */
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

describe("Filter events by city", () => {
  let browser, page;
  jest.setTimeout(30000);

  beforeAll(async () => {
    try {
      browser = await puppeteer.launch({
        /* headless: false,
        slowMo: 250, // slow down by 250ms
        ignoreDefaultArgs: ["--disable-extensions"], */
      });
      page = await browser.newPage();
      await page.goto("http://localhost:3000/meet");
      await page.waitForSelector(".CitySearch .city");
    } catch (err) {
      console.error("Error during setup:", err);
    }
  });

  afterAll(async () => {
    await browser.close();
  });

  test("When user hasn`t searched for a city, show upcoming events from all cities", async () => {
    const eventCount = await page.$$eval(
      ".event",
      // $$eval - retrieve information about elements that match the .event selector
      (elements) => elements.length
      // counts the number of events, turns into eventCount
    );
    expect(eventCount).toBeGreaterThan(0);
  });

  test("User should see a list of suggestions when they search for a city", async () => {
    await page.focus(".CitySearch .city");
    await page.keyboard.type("Berlin, Germany");

    const suggestionCount = await page.$$eval(
      ".CitySearch .suggestions li",
      (elements) => elements.length
    );
    expect(suggestionCount).toBeGreaterThan(0);
  });

  test("User can select a city from the suggested list", async () => {
    await page.focus(".CitySearch .city");
    await page.waitForSelector(".CitySearch .suggestions li");
    await page.click(".CitySearch .suggestions li");

    const selectedCity = await page.$eval(
      ".CitySearch .city",
      (element) => element.value
    );
    expect(selectedCity).toBe("Berlin, Germany");

    const eventCount = await page.$$eval(
      ".event",
      (elements) => elements.length
    );
    expect(eventCount).toBeGreaterThan(0);
  });
});
