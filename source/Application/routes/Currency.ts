import express = require('express');

import {IServices} from '../../Infrastructure/Services';

export default (app: express.Application, services: IServices) => {

    app

        .get('/currency/:code', (request: express.Request, response: express.Response) => {
            response.send(services.currency.get(request.params.code))
        })

        .post('/exchange/rate/:id/:from/:to/:timestamp/:rate', (request: express.Request, response: express.Response) => {
            services.currenciesExchanger.add(Number(request.params.id), request.params.from, request.params.to, Number(request.params.timestamp), Number(request.params.rate))
                .then((status) => response.send({status}))
                .catch((error) => response.status(500).send({message: error.message}));
        })

        .get('/exchange/rate/:id/:from/:to/:timestamp', (request: express.Request, response: express.Response) => {
            services.currenciesExchanger.read(Number(request.params.id), request.params.from, request.params.to, Number(request.params.timestamp))
                .then((rate) => response.send({rate}))
                .catch((error) => response.status(400).send({message: error.message}))
        })
    ;

}
