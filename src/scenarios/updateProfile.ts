import puppeteer from 'puppeteer-core';

const updateProfile = async () => {
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
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle2',
    });
    await page.type('#username', 'test123');
    await page.type('#password', 'test123');

    const [sButton] = await page.$x(
      '//button[@type="submit"]/span[.="Sign In"]'
    );

    await Promise.all([
      sButton.click(),
      page.waitForFunction(
        'document.querySelector("body").innerText.includes("Profile")'
      ),
    ]);

    await page.evaluate((selector) => {
      document.querySelector(selector).value = '';
    }, '#email');
    await page.type('#email', 'tdat123@yopmail.com');
    await page.evaluate((selector) => {
      document.querySelector(selector).value = '';
    }, 'input[name="dob"]');
    await page.type('input[name="dob"]', '29061995');
    const [uButton] = await page.$x(
      '//button[@type="submit"]/span[.="Update"]'
    );
    await uButton.click();
    await page.waitForTimeout(3000);
    await browser.close();
  } catch (err) {
    await browser.close();
    throw err;
  }
};

export default updateProfile;
