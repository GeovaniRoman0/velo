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
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-B7TAHI')
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()
  
  /// Assert
  const containerPedido = page.getByRole('paragraph')
    .filter({hasText: /^Pedido$/}) //expressão regular
    .locator('..') //sobe para o elemento pai (a div que agrupa ambos)
   await expect(containerPedido).toContainText('VLO-B7TAHI',{timeout:10000})

   await expect(page.getByText('APROVADO')).toBeVisible()
   
})