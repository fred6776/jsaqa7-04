let page;

beforeEach(async () => {
  page = await browser.newPage();
}, 60000);

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  }, 60000);

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub · Change is constant. GitHub keeps you ahead. · GitHub"
    );
  }, 60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 60000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 60000);
});

test("Compare title page copilot", async () => {
  await page.goto("https://github.com/features/copilot");
  const title = await page.title();
  expect(title).toEqual("GitHub Copilot · Your AI pair programmer · GitHub");
}, 60000);

test("TCompare title actionst", async () => {
  await page.goto("https://github.com/features/actions");
  const title = await page.title();
  expect(title).toEqual("GitHub Actions · GitHub");
}, 60000);

test("Compare title enterprise", async () => {
  await page.goto("https://github.com/enterprise");
  const title = await page.title();
  expect(title).toEqual(
    "GitHub Enterprise · The AI-powered developer platform for the agent-ready enterprise · GitHub"
  );
}, 60000);
