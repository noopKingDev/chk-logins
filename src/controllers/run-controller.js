// import { login } from "../kabum.js";

import { reset } from "./modules/utils/helpers/index.js";
import modulesChecker from "./modules/index.js";

import { isFile, matchStringInFile } from "./ultils/helpers/utils.js";
import { main, setFileAccounts } from "../views/index.js";
import preferencies from '../app/core/preferencies.json' assert {type:'json'}


import config from "../app/core/index.js";

const Menu = async () => {
  const optionSelected = await  main({
    config: config,
    preferencies:preferencies,
    modulesChecker: modulesChecker,
  });

  const optionSelectedData = modulesChecker.filter(
    ({ code }) => code == optionSelected
  );
return optionSelectedData
}

const run = async () => {
const optionSelectedData = await Menu()
  if (optionSelectedData.length == 0)
    return reset({
      message: "Opçâo Invalida",
    });

  optionSelectedData[0].init();
};

export default run;
