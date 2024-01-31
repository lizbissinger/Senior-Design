import { test, expect } from '@playwright/test';

test('Add-load', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/dashboard/overview');
  await page.waitForTimeout(3000);
  const rowsBefore=await page.locator('tr').count();
  console.log(rowsBefore);
  await page.getByRole('button').nth(2).click();
  await page.getByPlaceholder('Load #').click();
  await page.getByPlaceholder('Load #').fill('0001');
  //await page.locator('div').filter({ hasText: /^Select a driverJassa JATTJOTYRajuRashminder S Gill$/ }).getByRole('combobox').selectOption('Jassa JATT');
  await page.selectOption('.form:nth-child(2) select', { index: 1 });
  //await page.locator('div').filter({ hasText: /^Select a truck101102103104sdff$/ }).getByRole('combobox').selectOption('101');
  await page.selectOption('.form:nth-child(3) select', { index: 1 });
 // await page.locator('div').filter({ hasText: /^Select a truck101102103104sdff$/ }).getByRole('combobox').press('Tab');
  //await page.locator('div').filter({ hasText: /^Select a trailer53701325325222$/ }).getByRole('combobox').selectOption('53701');
  await page.selectOption('.form:nth-child(4) select', { index: 1 });
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


test('Add Driver then Delete it', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173/dashboard/fleet');
  await page.getByRole('link', { name: 'Fleet Management' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Add Driver' }).click();
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill('Rishabh Sharma');
  await page.getByPlaceholder('Name').press('Tab');
  await page.getByPlaceholder('License Number').fill('vk199625');
  await page.getByPlaceholder('License Number').press('Tab');
  await page.getByPlaceholder('Phone Number').fill('513459609');
  await page.getByPlaceholder('Phone Number').press('Tab');
  await page.getByPlaceholder('Email').fill('rishabsharma@rishabh.com');
  await page.getByRole('button', { name: 'Add Driver' }).click();
  await page.getByRole('row', { name: 'Rishabh Sharma vk199625' }).getByRole('button').nth(1).click();
});



test('Add Truck then Delete it', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/dashboard/overview');
  await page.getByRole('button').nth(2).click();
  
  await page.getByRole('link', { name: 'Fleet Management' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Add Truck' }).click();
  await page.getByPlaceholder('Truck Number').click();
  await page.getByPlaceholder('Truck Number').fill('001');
  await page.getByPlaceholder('Truck Number').press('Tab');
  await page.getByPlaceholder('Make').fill('Volvo');
  await page.getByPlaceholder('Make').press('Tab');
  await page.getByPlaceholder('Model').fill('700');
  await page.getByPlaceholder('Model').press('Tab');
  await page.getByPlaceholder('Year').fill('500');
  await page.getByPlaceholder('Year').press('Tab');
  await page.getByPlaceholder('VIN').fill('69098309');
  await page.getByRole('button', { name: 'Add Truck' }).click();
  await page.getByRole('cell', { name: '001' }).click();
  await page.getByRole('row', { name: 'Volvo 700 500 69098309' }).getByRole('button').nth(1).click();
});



test('Add Trailer then Delete it', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/dashboard/fleet');
  await page.getByRole('link', { name: 'Fleet Management' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Add Trailer' }).click();
  await page.getByPlaceholder('Trailer Number').click();
  await page.getByPlaceholder('Trailer Number').fill('001');
  await page.getByPlaceholder('Trailer Number').press('Tab');
  await page.getByPlaceholder('Make').fill('Test');
  await page.getByPlaceholder('Make').press('Tab');
  await page.getByPlaceholder('Model').fill('Test');
  await page.getByPlaceholder('Model').press('Tab');
  await page.getByPlaceholder('Year').fill('10');
  await page.getByPlaceholder('Year').press('Tab');
  await page.getByPlaceholder('VIN').fill('test');
  await page.getByRole('button', { name: 'Add Trailer' }).click();
  await page.getByRole('cell', { name: '001' }).click();
  await page.getByRole('row', { name: 'Test Test 10 test' }).getByRole('button').nth(1).click();
});