import { test, expect, type Page } from '@playwright/test';
import { mkdir, readFile } from 'node:fs/promises';
const evidence = 'docs/evidence';
async function start(page: Page) { await page.goto('/'); await page.getByRole('button', { name: 'Começar', exact: true }).click(); await expect(page.getByRole('button', { name: /Chanel Classic Flap,/ })).toBeVisible(); }
async function capture(page: Page, name: string) { await mkdir(evidence, { recursive: true }); await page.screenshot({ path: `${evidence}/${name}.png` }); }
test('percurso pelas seis telas do Figma e solicitação de troca', async ({ page }) => {
 const errors: string[]=[]; page.on('pageerror', e => errors.push(e.message));
 await page.goto('/'); await expect(page.getByRole('button', { name:'Começar', exact:true })).toBeVisible(); await capture(page,'01-splash');
 await page.getByRole('button',{name:'Começar',exact:true}).click(); await expect(page.getByRole('button',{name:/Chanel Classic Flap,/})).toBeVisible(); await capture(page,'02-home');
 await page.getByRole('button',{name:/Chanel Classic Flap,/}).click(); await expect(page.getByText('Classic Flap Medium — Caviar',{exact:true})).toBeVisible(); await capture(page,'03-detalhe');
 await page.getByRole('button',{name:'Voltar',exact:true}).click(); await page.getByRole('button',{name:'Vender',exact:true}).last().click(); await expect(page.getByRole('textbox',{name:'Marca e modelo'})).toBeVisible(); await capture(page,'04-vender');
 await page.getByRole('button',{name:'Voltar',exact:true}).click(); await page.getByRole('button',{name:'Trocar',exact:true}).last().click(); await expect(page.getByText('R$ 1.240',{exact:true})).toBeVisible(); await capture(page,'05-trade-in');
 await page.getByRole('button',{name:'Solicitar troca',exact:true}).click(); await expect(page.getByRole('button',{name:'Conhecer o programa'})).toBeVisible(); await capture(page,'06-exchange-program');
 await page.getByRole('button',{name:'Conhecer o programa'}).click(); await page.getByRole('button',{name:'Confirmar solicitação de troca'}).click(); await expect(page.getByText('Troca solicitada',{exact:true})).toBeVisible(); await page.getByRole('button',{name:'Entendi'}).click();
 await page.getByRole('button',{name:'Voltar',exact:true}).click(); await expect(page.getByText('Troca solicitada',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Solicitar troca',exact:true}).click(); await page.getByRole('button',{name:'Conhecer o programa'}).click(); await expect(page.getByRole('button',{name:/Louis Vuitton Speedy 30 ·/})).toHaveCount(0); await page.getByRole('button',{name:'Fechar',exact:true}).click();
 await page.getByRole('button',{name:'Voltar',exact:true}).click(); await page.getByRole('button',{name:'Voltar',exact:true}).click(); await page.getByRole('button',{name:'Perfil',exact:true}).click(); await expect(page.getByText('Louis Vuitton Speedy 30 · Solicitada',{exact:true})).toBeVisible();
 expect(errors).toEqual([]);
});
test('favoritos persistem e busca filtra marcas', async ({ page }) => {
 await start(page); await page.getByRole('button',{name:/Chanel Classic Flap,/}).click(); await page.getByRole('button',{name:'Adicionar aos favoritos'}).click(); await expect(page.getByRole('button',{name:'Remover dos favoritos'})).toBeVisible();
 await page.reload(); await page.getByRole('button',{name:'Começar',exact:true}).click(); await page.getByRole('button',{name:'Perfil',exact:true}).click(); await expect(page.getByRole('button',{name:'Chanel · Classic Flap',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Voltar',exact:true}).click(); await page.getByRole('button',{name:'Buscar',exact:true}).click(); await page.getByRole('textbox',{name:'Buscar bolsas'}).fill('louis'); await expect(page.getByRole('button',{name:/Louis Vuitton Neverfull MM,/})).toBeVisible(); await expect(page.getByRole('button',{name:/Chanel Classic Flap,/})).toHaveCount(0);
 await page.getByRole('textbox',{name:'Buscar bolsas'}).fill('inexistente'); await expect(page.getByText('Nenhuma bolsa encontrada. Experimente outra busca.')).toBeVisible();
});
test('compra aplica crédito, atualiza saldo e persiste pedido', async ({ page }) => {
 await start(page); await page.getByRole('button',{name:'Trocar',exact:true}).last().click(); await page.getByRole('button',{name:'Usar crédito no catálogo',exact:true}).click(); await page.getByRole('button',{name:/Chanel Classic Flap,/}).click(); await page.getByRole('button',{name:'Comprar agora'}).click();
 await expect(page.getByText('Crédito aplicado: R$ 1.240',{exact:true})).toBeVisible(); await expect(page.getByText('Pagamento simulado: R$ 7.660',{exact:true})).toBeVisible(); await capture(page,'07-checkout');
 await page.getByRole('button',{name:'Confirmar compra simulada'}).click(); await expect(page.getByText('Compra simulada concluída',{exact:true})).toBeVisible(); await page.getByRole('button',{name:'Entendi'}).click(); await expect(page.getByText('Compras simuladas (1)',{exact:true})).toBeVisible(); await capture(page,'08-perfil');
 await page.reload(); await page.getByRole('button',{name:'Começar',exact:true}).click(); await page.getByRole('button',{name:'Perfil',exact:true}).click(); await expect(page.getByText('Compras simuladas (1)',{exact:true})).toBeVisible(); await expect(page.getByText('R$ 0',{exact:true})).toBeVisible();
});
test('venda valida formulário, aceita quatro fotos e persiste curadoria', async ({ page }) => {
 await start(page); await page.getByRole('button',{name:'Vender',exact:true}).last().click(); await page.getByRole('button',{name:'Enviar para curadoria'}).click(); await expect(page.getByText('Informe a marca e o modelo da bolsa (mínimo de 3 caracteres).')).toBeVisible();
 await page.getByRole('textbox',{name:'Marca e modelo'}).fill('Prada Re-Edition 2005'); await page.getByRole('button',{name:'Enviar para curadoria'}).click(); await expect(page.getByText('Adicione pelo menos 4 fotos: frente, verso, interior e etiqueta.')).toBeVisible();
 await page.getByRole('button',{name:'Bom',exact:true}).click(); await expect(page.getByText('R$ 2.800 – R$ 3.360',{exact:true})).toBeVisible();
 const chooser = page.waitForEvent('filechooser'); await page.getByRole('button',{name:'Adicionar fotos da bolsa'}).click(); const fileChooser = await chooser;
 const photo = await readFile('assets/products/chanel-classic.jpg');
 await fileChooser.setFiles(['frente','verso','interior','etiqueta'].map(name => ({ name:`${name}.jpg`,mimeType:'image/jpeg',buffer:photo })));
 await expect(page.getByText('4 fotos selecionadas · Adicionar mais',{exact:true})).toBeVisible(); await page.getByRole('button',{name:'Enviar para curadoria'}).click(); await expect(page.getByText('Peça enviada para curadoria',{exact:true})).toBeVisible(); await page.getByRole('button',{name:'Entendi'}).click();
 await page.getByRole('button',{name:'Voltar',exact:true}).click(); await page.getByRole('button',{name:'Perfil',exact:true}).click(); await expect(page.getByText('Prada Re-Edition 2005',{exact:true})).toBeVisible(); await expect(page.getByText('Em curadoria · Bom · 4 fotos',{exact:true})).toBeVisible();
 await page.reload(); await page.getByRole('button',{name:'Começar',exact:true}).click(); await page.getByRole('button',{name:'Perfil',exact:true}).click(); await expect(page.getByText('Em curadoria · Bom · 4 fotos',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Prada Re-Edition 2005',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Prada Re-Edition 2005'})).toBeVisible();
 await expect(page.getByRole('img',{name:'Foto 1 de Prada Re-Edition 2005'})).toBeVisible();
 await page.getByRole('button',{name:'Ver foto 4',exact:true}).click();
 await expect(page.getByText('Foto 4 de 4',{exact:true})).toBeVisible();
 await expect(page.getByRole('img',{name:'Foto 4 de Prada Re-Edition 2005'})).toBeVisible();
 await page.getByRole('button',{name:'Voltar',exact:true}).click();
 await expect(page.getByText('Peças enviadas (1)',{exact:true})).toBeVisible();
});
test('layout de catálogo não cria rolagem horizontal em 360 e 1280 px', async ({ page }) => {
 for (const width of [360,1280]) { await page.setViewportSize({width,height:844}); await start(page); expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true); await expect(page.getByRole('button',{name:/Gucci Marmont Small,/})).toBeVisible(); }
});
test('erro de armazenamento é exibido e permite tentar novamente', async ({ page }) => {
 await page.addInitScript(() => localStorage.setItem('next-chapter:demo:v1','{}'));
 await page.goto('/'); await page.getByRole('button',{name:'Começar',exact:true}).click();
 await expect(page.getByText('Dados locais inválidos. Limpe os dados do aplicativo para iniciar novamente.')).toBeVisible();
 await page.getByRole('button',{name:'Perfil',exact:true}).click(); await expect(page.getByText('Dados indisponíveis',{exact:true})).toBeVisible(); await page.getByRole('button',{name:'Entendi'}).click();
 await page.evaluate(() => localStorage.removeItem('next-chapter:demo:v1'));
 await page.getByRole('button',{name:'Tentar novamente',exact:true}).click();
 await expect(page.getByRole('button',{name:/Chanel Classic Flap,/})).toBeVisible();
});
