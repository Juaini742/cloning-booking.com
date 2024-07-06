import test, {expect} from "@playwright/test";
import path from "path";

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

test("should allow uyser to add a hotel", async ({page}) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator('[name="name"]').fill("test_mode name");
  await page.locator('[name="city"]').fill("test_mode city");
  await page.locator('[name="country"]').fill("test_mode country");
  await page.locator('[name="description"]').fill("test_mode description");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");
  await page.getByText("Budget").click();
  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("4");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.jpeg"),
    path.join(__dirname, "files", "2.jpeg"),
  ]);

  await page.getByRole("button", {name: "Save"}).click();
  await expect(page.getByText("Hotel Saved")).toBeVisible();
});

test("should desplay hotels", async ({page}) => {
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByText("test_mode name")).toBeVisible();
  await expect(page.getByText("test_mode description")).toBeVisible();

  await expect(
    page.getByText("test_mode city, test_mode country")
  ).toBeVisible();
  await expect(page.getByText("Budget")).toBeVisible();
  await expect(page.getByText("$100 per night")).toBeVisible();
  await expect(page.getByText("2 adult, 4 children")).toBeVisible();
  await expect(page.getByText("3 Start Rating")).toBeVisible();

  await expect(
    page.getByRole("link", {name: "View Detail"}).first()
  ).toBeVisible();
  await expect(page.getByRole("link", {name: "Add hotel"})).toBeVisible();
});

test("should edit hotel", async ({page}) => {
  await page.goto(`${UI_URL}my-hotels`);

  await page.getByRole("link", {name: "View Detail"}).first().click();

  await page.waitForSelector("[name='name']", {state: "attached"});
  await expect(page.locator("[name='name']")).toHaveValue("test_mode name");
  await page.locator("[name='name']").fill("New Test Name Hotel");
  await page.getByRole("button", {name: "Save"}).click();
  await expect(page.getByText("Hotel Saved")).toBeVisible();

  await page.reload();
  await expect(page.locator("[name='name']")).toHaveValue(
    "New Test Name Hotel"
  );
  await page.locator("[name='name']").fill("test_mode name");
  await page.getByRole("button", {name: "Save"}).click();
  await expect(page.getByText("Hotel Saved")).toBeVisible();
});
