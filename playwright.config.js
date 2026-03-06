// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Tests in Dateien parallel ausführen */
  fullyParallel: true,
  /* Fehlermeldung auf CI, wenn test.only vergessen wurde */
  forbidOnly: !!process.env.CI,
  /* Retries nur auf CI */
  retries: process.env.CI ? 2 : 0,
  /* Keine parallelen Tests auf CI */
  workers: process.env.CI ? 1 : undefined,
  /* HTML Reporter für schöne Fehlerberichte */
  reporter: 'html',

  /* Gemeinsame Einstellungen für alle Browser-Projekte */
  use: {
    /* Verzögerung einbauen: 1000ms = 1 Sekunde zwischen jedem Schritt */
    launchOptions: {
      slowMo: 1000,
    },

    /* Video-Aufzeichnung aktivieren: 'on' nimmt bei jedem Test ein Video auf */
    video: 'on',

    /* Trace-Aufzeichnung für die Fehlersuche im UI Mode */
    trace: 'on-first-retry',
  },

  /* Konfiguration für die verschiedenen Browser */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});