import { defineConfig } from '@playwright/test';
// Porta separada evita usar o servidor do grupo conectado ao Supabase real.
const port = process.env.E2E_PORT || '8082';
const baseURL = `http://localhost:${port}`;
export default defineConfig({
 testDir: './tests/e2e', fullyParallel: false, workers: 1, timeout: 60000,
 reporter: [['list'], ['html', { open: 'never' }]],
 use: { baseURL, viewport: { width: 390, height: 844 }, video: 'on', screenshot: 'only-on-failure', trace: 'retain-on-failure' },
 webServer: { command: `node node_modules/expo/bin/cli start --web --host localhost --port ${port}`, url: baseURL, reuseExistingServer: false, stdout: 'pipe', timeout: 180000, env: { CI: '1', EXPO_OFFLINE: '1', EXPO_PUBLIC_SUPABASE_URL: '', EXPO_PUBLIC_SUPABASE_ANON_KEY: '' } },
});