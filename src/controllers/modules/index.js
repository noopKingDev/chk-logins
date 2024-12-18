import americanas from "./src/americanas.js";
import kabum from "./src/kabum.js";
import crunchyroll from "./src/crunchyroll.js";
import hboMax from "./src/hbo-max.js";

export default [
   {
        name:'Checker empresas americanas',
        init : americanas,
        code:1
    },
    {
        name:"Checker kabum",
        code:2,
        init: kabum
    },
    {
        name:"Checker crunchyroll",
        code:3,
        init: crunchyroll
    },
    {
        name:"Checker hbo max",
        code:4,
        init: hboMax
    },
    {
        name:'sair',
        code:0,
        init: () => {
            console.clear()
            console.log('bye bye')
            process.exit()
        }
    }
]