// @ts-check
const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const { email, password } = require("../user");


test('Valid authorization', async () => {
  const browser = await chromium.launch({});
  const page = await browser.newPage();

  await page.goto('https://netology.ru/');
  await page.click("text = Войти");
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Пароль').fill(password);
  await page.click('.Button_button__b_EZq.Button_size-m__GaBB7.Button_color-lilac__kluMS.styles_button___7Xc4');
  //await page.pause();
  await expect(page.locator('.src-components-pages-Profile-Programs--heading--vVw3p')).toContainText('Моё обучение');
  await browser.close();
});

test('Inalid authorization', async () => {
  const browser = await chromium.launch({});
  const page = await browser.newPage();

  await page.goto('https://netology.ru/');
  await page.click("text = Войти");
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Пароль').fill('3456');
  await page.click('.Button_button__b_EZq.Button_size-m__GaBB7.Button_color-lilac__kluMS.styles_button___7Xc4');
  //await page.pause();
  await expect(page.locator('.hint_hint__bpsEa.inputHint')).toContainText('Вы ввели неправильно логин или пароль.');
  await browser.close();
});


