// @ts-check
const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const { email, password } = require("../user");


test('Valid authorization', async () => {
  test.setTimeout(120_000);
  const browser = await chromium.launch({});
  const page = await browser.newPage();

  await page.goto('https://netology.ru/');
  await page.click("text = Войти");
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Пароль').fill(password);
  await page.click('[data-testid="login-submit-btn"]');
  await expect(page).toHaveURL('https://netology.ru/profile/7833767');
  await browser.close();
});

test('Inalid authorization', async () => {
  test.setTimeout(120_000);
  const browser = await chromium.launch({});
  const page = await browser.newPage();

  await page.goto('https://netology.ru/');
  await page.click("text = Войти");
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Пароль').fill('3456');
  await page.click('[data-testid="login-submit-btn"]');
  await expect(page.locator('[data-testid="login-error-hint"]')).toContainText('Вы ввели неправильно логин или пароль.');
  await browser.close();
});


