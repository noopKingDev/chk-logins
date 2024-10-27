import puppeteer from "puppeteer";
import { setFileAccounts, sethandle } from "../../../../views/index.js";
import { isFile, matchStringInFile } from "../../../ultils/helpers/utils.js";
import banner from 'node-banner'

import run from "../../../run-controller.js";

export const getString = (string, start, end) => {
  const rgx = new RegExp(start + "(.*?)" + end);
  return string?.match(rgx)?.[1];
};


export const createBrowser = async ({ url, handle }) => {
  try {
    // if (browseActive) {
    //   browseActive = !browseActive;
    //   await page.close;
    // }
    
    const browser = await puppeteer.launch({
      headless: handle,
    });
    const page = await browser.newPage();

     await page.goto(url, { timeout: 0 });
     await page.waitForSelector('[data-testid="login-input"]', {timeout: 0})

    return page
  } catch (error) {
    console.log(error);
    
    return false;
  }
};
export const clearAndHandleBanner = ({
  bannerMessage,
  timeout
}) => {
  return new Promise(async r => 
    setTimeout(async() => {
      console.clear()
       await banner(bannerMessage, '', 'blue')
      r()
    }, timeout || 1300)
  )
}

export const reset = ({
  message,
  timeout
}) => {
  console.log(message)
  setTimeout(() => {
    run()
  }, timeout || 1300 );
}

export const readFile = async(match) => {
    let fileAccounts = await setFileAccounts();

    if (fileAccounts.includes("\\")) fileAccounts = fileAccounts.replace(/\\/g, "/");
    const isValidFile = await isFile(fileAccounts)
    
    const fileName = fileAccounts.split('/').at(-1)

  if(!isValidFile) return {
    message:'caminho do arquivo invalido.'
  }

  const matchStrings = await matchStringInFile(fileAccounts, match);

  sethandle()
    return matchStrings?.length != 0 ? {
      matchStrings:matchStrings,
      fileName: fileName || 'Error no nome do arquivo'
    }  : {
        message:'Não foram encontradas contas correspondentes.'
    }
}