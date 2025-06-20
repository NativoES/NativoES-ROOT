import express, { Router } from 'express';
import cors from 'cors';

interface Options {
    port: number;
    routes: Router;
}

export class Server {

    public readonly app = express();

    private readonly port: number;   
    private readonly routes: Router;   

    constructor(options: Options) {
        const { port, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    async start() {

        //* Middleware
        this.app.use(cors());
        this.app.use(express.json({ limit: '10mb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

        this.app.use( express.urlencoded({ extended: true }) ); 

        //* Public folder 

        //* routes
        this.app.use(this.routes);
        
        this.app.listen(this.port, () => {
            console.log('Server is running on http://localhost:5001');
        });
    }
}