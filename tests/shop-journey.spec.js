const { test, expect } = require('@playwright/test');

test('Vollständige User Journey: Shop-Navigation bis Checkout', async ({ page }) => {
  // 1. Navigation zum Shop
  // Wir nutzen eine Beispiel-URL, die für Tests oft verwendet wird
  await page.goto('https://www.saucedemo.com/');

  // 2. Login (Teil der Journey)
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // 3. Artikel in den Warenkorb legen
  // Wir wählen das erste Produkt "Backpack"
  await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
  
  // 4. Zum Warenkorb navigieren
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/cart/);

  // 5. Checkout-Prozess starten
  await page.click('[data-test="checkout"]');

  // Versanddaten ausfüllen
  await page.fill('[data-test="firstName"]', 'Max');
  await page.fill('[data-test="lastName"]', 'Mustermann');
  await page.fill('[data-test="postalCode"]', '12345');
  await page.click('[data-test="continue"]');

  // 6. Abschluss & Verifizierung
  await page.click('[data-test="finish"]');

  // Überprüfung: Erscheint der Bestätigungstext?
  const successHeader = page.locator('.complete-header');
  await expect(successHeader).toHaveText('Thank you for your order!');
  
  // Optional: Screenshot vom Erfolg machen
  await page.screenshot({ path: 'checkout_success.png' });
});