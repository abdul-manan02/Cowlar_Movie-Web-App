import 'dotenv/config'
const routePrefix = process.env.API_ROUTE_PREFIX || '/api/v1';
import express from 'express'
const app = express();
import userRouter from './routes/user.route.js';

app.use(express.json())
app.use(routePrefix + '/users', userRouter);


const port = process.env.PORT || 3000;

const start = () =>{
    app.listen(port, console.log(`MOVIE APP : ${port}`))
}

start()
