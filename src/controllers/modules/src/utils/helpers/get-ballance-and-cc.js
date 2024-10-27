import axios from 'axios'
import { getString } from '../../../utils/helpers/index.js'
import {writeFileSync} from 'fs'


function cookiesToAxiosFormat(cookies) {
    // Mapeia cada cookie para uma string no formato "key=value"
    return cookies
      .map(cookie => `${cookie.name}=${cookie.value}`)
      .join('; '); // Junta todas as strings com um ponto e vírgula e um espaço
  }

export default async function getBallanceAndCC(cookie) {
 
    try {

        cookie = cookiesToAxiosFormat(cookie)
        const {data} = await axios.get('https://www.kabum.com.br/minha-conta/carteira', {
            headers: {
                Cookie: cookie
            }  
        })
        const getBallance = getString(data, 'tablet:text-4xl">', '<')
        return {
            ballance: getBallance
        }
    } catch (error) {
    }
}