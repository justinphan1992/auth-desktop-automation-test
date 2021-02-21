import puppeteer from 'puppeteer-core';

const register = async () => {
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

    const timeStamp = Math.floor(Date.now() / 1000);

    const [signUpLink] = await page.$x(
      '//a[contains(., "Don\'t have an account? Sign Up")]'
    );
    await signUpLink.click();
    await page.type('#username', `test${timeStamp}`);
    await page.type('#email', 'tdat258@yopmail.com');
    await page.type('input[name="dob"]', '25081992');
    await page.type('#password', `test${timeStamp}`);
    await page.type('#password_confirmation', `test${timeStamp}`);

    const sButton = await page.$x('//button[@type="submit"]/span[.="Sign Up"]');

    await Promise.all([
      sButton[0].click(),
      await page.waitForFunction(
        'document.querySelector("body").innerText.includes("Sign in")'
      ),
    ]);

    await page.waitForTimeout(3000);

    await browser.close();
  } catch (err) {
    await browser.close();
    throw err;
  }
};

export default register;
