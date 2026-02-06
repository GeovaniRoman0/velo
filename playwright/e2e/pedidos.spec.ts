import { test, expect } from '@playwright/test'
import { TIMEOUT } from 'node:dns'
import { text } from 'node:stream/consumers'


/// AAA - Arrange, Act, Assert

test('deve consultar um pedido aprovado', async ({ page }) => {  
  /// Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint') 

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido') 

  /// Act
  // await page.locator('//label[text()="Número do Pedido"]/..//input').fill('VLO-B7TAHI')
  // await page.getByLabel('Número do Pedido').fill('VLO-B7TAHI')
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-B7TAHI')
  //await page.getByTestId('search-order-button').click()
  //await page.locator('//buton[text()="BUscar Pedido"]').click()
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()
  
  /// Assert
  //await page.waitForTimeout(10000) Esse tipo de controle para resolver lentidão de sistemas não é legal
  //await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 10000}) //melhor fazer o timeout explicito

  await expect(page.getByText('VLO-B7TAHI')).toBeVisible({timeout: 10000})
  //await expect(page.getByTestId('order-result-VLO-B7TAHI')).toContainText('VLO-B7TAHI') (CODEGEN SUGERIU ESSE CÓDIGO POREM ENTENTDI QUE NAO PODERIA SER USADO O GETBYTESTID)
  await expect(page.locator('//p[normalize-space()="VLO-B7TAHI"]')).toHaveText('VLO-B7TAHI')

  await expect(page.getByText('APROVADO')).toBeVisible({timeout: 10000});
  //await expect(page.getByTestId('order-result-VLO-B7TAHI')).toContainText('APROVADO'); (CODEGEN SUGERIU ESSE CÓDIGO POREM ENTENTDI QUE NAO PODERIA SER USADO O GETBYTESTID)
  await expect(page.locator('//div[normalize-space()="APROVADO"]')).toHaveText('APROVADO')

  // correção Papito
  // xpath para encontrar o numero do pedido ('//p[text()="Pedido"]/..//p[text()="VLOB7TAHI"]')
  // **** primeira solução ****
  // const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLOB7TAHI"]')
  // await expect(orderCode).toBeVisible({timeout:10000})
  // ou pode se usar a outra forma
  // const containerPedido = page.getByRole('paragraph')
  //   .filter({hasText: /^Pedido$/}) //expressão regular
  //   .locator('..') //sobe para o elemento pai (a div que agrupa ambos)
  // await expect(containerPedido).toContainText('VLOB7TAHI',{timeout:10000})

  // await expect(page.getByText('APROVADO')).toBeVisible()
   
})