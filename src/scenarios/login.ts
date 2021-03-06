import puppeteer from 'puppeteer-core';

const login = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
    defaultViewport: {
      width: 1200,
      height: 728,
      deviceScaleFactor: 1,
    },
    args: ['--start-maximized'],
    executablePath:
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  try {
    const page = await browser.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await page.type('#username', 'test123');
    await page.type('#password', 'test123');
    const buttons = await page.$x('//button[@type="submit"]/span[.="Sign In"]');
    await Promise.all([
      buttons[0].click(),
      page.waitForFunction(
        'document.querySelector("body").innerText.includes("Profile")'
      ),
    ]);
    await browser.close();
  } catch (err) {
    await browser.close();
    throw err;
  }
};

export default login;
