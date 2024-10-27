import americanas from "./src/americanas.js";
import kabum from "./src/kabum.js";


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
        name:'sair',
        code:0,
        init: () => {
            console.clear()
            console.log('bye bye')
            process.exit()
        }
    }
]