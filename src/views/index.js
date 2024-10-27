import prompt from "prompt-sync";
import banner from 'node-banner'

const [blue, yellow,green,red,resetColor] = [
  '\x1b[34m',
  '\x1b[33m',
  '\x1b[32m',
  '\x1b[31m',
  '\x1b[0m'
]
export const main = async ({ config,preferencies, modulesChecker }) => {
  console.clear();

  const { name, version,author } = config;

  const modulesOptions = modulesChecker.map(({code,name}) => `[${blue}${code}${resetColor}]  ${name} [${green}ON${resetColor}]`);
  const preferenciesWelcome = `
  Author : ${author}                    Handle : ${preferencies.handle}                    File : ${preferencies.file}`

  await banner(`${name} v${version}`, preferenciesWelcome, 'blue', 'yellow')

  console.log(`
 ${modulesOptions.join('\n ')}
    `);

  return prompt()("==> ");
};

export const setFileAccounts = () => prompt()(" Local do arquivo : ");
export const sethandle = async () => {

  const select = async() => prompt()(" background (defalut y) (y|n) :")

  let selected =  await select()
 while(selected != 'y' && selected != 'n' && selected != '') {
  selected  = await select()
 }
 const handle = selected == 'y' || selected == '' ? true : false
}
