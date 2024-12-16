import express from 'express';

const app: express.Application = express();

import routes from './routes';

import Repositories from '../Infrastructure/Repositories';
import Services from '../Infrastructure/Services';


routes(app, Services(Repositories()));

const port = 3000;

export default () => {
    app.listen(port, function () {
        console.info('Server started at', `http://127.0.0.1:${port}`)
    });
};
