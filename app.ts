
import * as express from "express";
import * as bodyParser from "body-parser";
import {Routes} from "./routes/customer.routes"; 
import {sequelize} from "./config/db.config";
import { auth } from './auth';

class App {
    public app: express.Express;
    public routes: Routes = new Routes();


    constructor() {
        this.app = express();
        this.config();
        auth.authenticate(this.app);
        this.routes.routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        sequelize.setConnection();
    }
}

export default new App().app;




















// const app =  express();

// const port = process.env.PORT || 20200;

// app.use(bodyParser.urlencoded({extended: true}));

// app.use(bodyParser.json());

// app.get('/',(req,res)=>{res.send('Hello world');});

// app.listen(port, ()=>{
//     console.log(`Server is listening on port: ${port}`);
// });

// const app = express();
// const PORT = 8000;
// app.get('/', (req, res) => res.send('Express + TypeScript Server'));
// app.listen(PORT, () => {
//   console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
// });