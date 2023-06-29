describe('HomePage', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:3001')
    })
  
    it('should render the page content', async () => {
      const content = await page.textContent('main')
      expect(content).toContain('Fixtura Content. About this site')
    })
  })