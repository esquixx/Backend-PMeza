import { Command } from 'commander'
import config from './config.js'

const program = new Command()

program
    .option('-d <option>' , 'Variable para debug' , false)
    .option('--persistence <persistence>' , 'persistencia')
program.parse()

// Establecer valor predeterminado si 'persistence' es undefined
if (typeof program.opts().persistence === 'undefined') {
    program.opts().persistence = 'MONGO';
}

//---------------------------------------------//
    //comando para ejecutar FILE o MONGO 

    //npm run dev -- --persistence FILE O 'MONGO'
//---------------------------------------------//

export const opts = program.opts()