import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/dashboard/overview');
  await page.waitForTimeout(3000);
  const rowsBefore=await page.locator('tr').count();
  console.log(rowsBefore);
  await page.getByRole('button').nth(2).click();
  await page.getByPlaceholder('Load #').click();
  await page.getByPlaceholder('Load #').fill('0001');
  await page.locator('div').filter({ hasText: /^Select a driverJassa JATTJOTYRajuRashminder S Gill$/ }).getByRole('combobox').selectOption('Jassa JATT');
  await page.locator('div').filter({ hasText: /^Select a truck101102103104sdff$/ }).getByRole('combobox').selectOption('101');
  await page.locator('div').filter({ hasText: /^Select a truck101102103104sdff$/ }).getByRole('combobox').press('Tab');
  await page.locator('div').filter({ hasText: /^Select a trailer53701325325222$/ }).getByRole('combobox').selectOption('53701');
  await page.locator('div').filter({ hasText: /^Select a trailer53701325325222$/ }).getByRole('combobox').press('Tab');
  await page.getByPlaceholder('Pick-Up Time').press('Tab');
  await page.getByPlaceholder('Pick-Up Time').fill('2024-01-30T12:01');
  await page.getByPlaceholder('Pick-Up Time').press('Tab');
  await page.getByPlaceholder('Delivery Time').press('Tab');
  await page.getByPlaceholder('Delivery Time').fill('2024-02-01T12:01');
  await page.getByPlaceholder('Delivery Time').press('Tab');
  await page.getByPlaceholder('Documents').press('Tab');
  await page.getByPlaceholder('Price').fill('1005');
  await page.getByPlaceholder('Price').press('Tab');
  await page.getByPlaceholder('Detention').fill('200');
  await page.getByPlaceholder('Detention').press('Tab');
  await page.getByPlaceholder('Miles').fill('200');
  await page.getByPlaceholder('Miles').press('Tab');
  await page.getByPlaceholder('Fuel').fill('200');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('cell', { name: 'Load # ▼' }).click();
 const rowsAfter=await page.locator('tr').count();
    console.log(rowsAfter);
    expect(rowsAfter).toBe(rowsBefore+1);
    
  
});