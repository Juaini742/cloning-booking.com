import {test, expect} from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({page}) => {
  await page.goto(UI_URL);

  await page.getByRole("link", {name: "Sign In"}).click();

  await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible();

  await page.locator("[name=email]").fill("ahmad@email.com");
  await page.locator("[name=password]").fill("123123");

  await page.getByRole("button", {name: "Login"}).click();

  await expect(page.getByText("Sign in successfully")).toBeVisible();
});

test("should show hotel search results", async ({page}) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going").fill("test_mode");
  await page.getByRole("button", {name: "Search"}).click();

  await expect(page.getByText("Hotels foundin test_mode")).toBeVisible();
  await expect(page.getByText("test_mode description")).toBeVisible();
});

test("should show hotel details", async ({page}) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going").fill("test_mode");
  await page.getByRole("button", {name: "Search"}).click();

  await page.getByText("test_mode name").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", {name: "Book Now"})).toBeVisible();
});
