import { test, expect } from '@playwright/test';

test('Fullerenes generated', async ({ page }) => {

  await page.route('**/isGenerating', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'text/plain',
      body: 'false'
    });
  });


  await page.route('**/counts', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      path: './tests/resources/count_response.json'
    });
  });


  await page.route('**/fullerenes/30', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      path: './tests/resources/metadata_response.json'
    });
  });


  await page.route('**/fullerenes/2D/***', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      path: './tests/resources/2D_response.json'
    });
  });

  await page.route('**/fullerenes/3D/***', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      path: './tests/resources/3D_response.json'
    });
  });

  await page.goto('http://localhost:5173/');

  await expect(page.getByRole('button', { name: 'Generate' })).toBeVisible();
  await expect(page.getByText('Generated Fullerenes')).toBeVisible();
  await expect(page.getByText('No Fullerene Selected')).toBeVisible();
  await page.getByTestId('see-fullerene-30').click()
  await page.getByRole('button', { name: 'View' }).click()
  await expect(page.getByText('Interactive 2D molecular structure visualization')).toBeVisible();
  await expect(page.getByTestId('2D-canvas')).toBeVisible()
  await expect(page.getByTestId('Tabs')).toBeVisible()
  await page.getByTestId('3D-tab').click()
  await expect(page.getByTestId('3D-canvas')).toBeVisible()
  await expect(page.getByText('Interactive 3D molecular structure visualization')).toBeVisible();
  await page.getByTestId('2D-tab').click()
  await expect(page.getByTestId('2D-canvas')).toBeVisible()

});

test('Proper buttons appear when algorithm in generating state', async ({ page }) => {

  await page.route('**/isGenerating', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'text/plain',
      body: 'true'
    });
  });

  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page.getByText('Cancel')).toBeVisible();
  await expect(page.getByText('Generating...')).toBeVisible();
  await expect(page.getByText('Generating...')).toBeDisabled();
});

test('should show alert when vertices are less than 20', async ({ page }) => {
  page.on('dialog', async dialog => {
    expect(dialog.message()).toBe('Please enter a valid number of vertices (minimum 20)');
    expect(dialog.type()).toBe('alert');
    await dialog.accept();
  });

  await page.goto('http://localhost:5173/');

  await page.getByLabel('Maximum vertices:').fill('5');
  await page.getByRole('button', { name: 'Generate' }).click();
});
