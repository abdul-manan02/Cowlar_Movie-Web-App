import 'dotenv/config'
const routePrefix = process.env.API_ROUTE_PREFIX || '/api/v1';
import express from 'express'
import cors from 'cors'
const app = express();
import userRouter from './routes/user.route.js';
import movieRouter from './routes/movie.route.js';
import reviewRouter from './routes/review.route.js';

app.use(express.json())
app.use(cors())
app.use(routePrefix + '/users', userRouter);
app.use(routePrefix + '/movies', movieRouter);
app.use(routePrefix + '/reviews', reviewRouter);

const port = process.env.PORT || 3000;

const start = () =>{
    app.listen(port, console.log(`MOVIE APP : ${port}`))
}

start()
