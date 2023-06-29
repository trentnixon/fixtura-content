// __tests__/account.test.js

import { test, expect } from '@playwright/test';
import fetchMock from 'jest-fetch-mock';

test.describe('Account page', () => {

  test.beforeEach(async ({ page }) => {
    // Mock the network responses
    fetchMock.mockOnce(JSON.stringify({ 
      attributes: {
        // add your mocked data for `getFullAccount` here
      } 
    }));
    fetchMock.mockOnce(JSON.stringify({ 
      attributes: {
        // add your mocked data for `getScheduler` here
      } 
    }));
    fetchMock.mockOnce(JSON.stringify([ 
      {
        id: '1',
        attributes: {
          // add your mocked data for `getAllAccount` here
        } 
      },
      // add more accounts if needed
    ]));
  });

  test('should load correctly', async ({ page }) => {
    await page.goto('http://localhost:3001/account/1'); // replace with your test URL
    const content = await page.textContent('body');
    
    // Replace 'Account Page' with text that should be present on the loaded page
    expect(content).toContain('Account Page');
  });
});
