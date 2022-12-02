import { Command } from "commander";
import { serve } from "@jsnote-emi/local-api";
import path from "path";

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
    .command('serve [filename]')
    .description('Open a file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005')
    .action (async (filename='notebook.js', options) => {
        const dir = path.join(process.cwd(), path.dirname(filename));

        try {
            await serve( 
                parseInt(options.port), 
                path.basename(filename), 
                dir,
                !isProduction
                );

            console.log(`started server on ${options.port}`);
            console.log(`navigate to http://localhost:${options.port}`);

        } catch (err:any) {
            if(err.code === 'EADDRINUSE'){
                console.log(`${options.port} is in use, please try an other port`);
            } else {
                console.log('Errorr:', err.message)
            }

            process.exit(1);
        }
    })