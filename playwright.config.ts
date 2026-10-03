import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir: './tests/e2e', fullyParallel: false, workers: 1, timeout: 60000,
 reporter: [['list'], ['html', { open: 'never' }]],
 use: { baseURL: 'http://127.0.0.1:8081', viewport: { width: 390, height: 844 }, video: 'on', screenshot: 'only-on-failure', trace: 'retain-on-failure' },
 webServer: { command: 'npm.cmd run web -- --port 8081', url: 'http://127.0.0.1:8081', reuseExistingServer: true, timeout: 180000, env: { CI: '1', EXPO_PUBLIC_SUPABASE_URL: '', EXPO_PUBLIC_SUPABASE_ANON_KEY: '' } },
});