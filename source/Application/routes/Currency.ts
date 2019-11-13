import express = require('express');

import {IServices} from '../../Infrastructure/Services';
import {ERRORS as ERRORS_CurrenciesExchanger} from "../../Domain/Models/CurrenciesExchanger";
import {ERRORS as ERRORS_CurrenciesExchangerService} from "../../Infrastructure/Services/CurrenciesExchanger";

export default (app: express.Application, services: IServices) => {

    app

        .get('/currency/:code', (request: express.Request, response: express.Response) => {
            response.send(services.currency.get(request.params.code))
        })

        .post('/exchange/rate/:id/:from/:to/:timestamp/:rate', (request: express.Request, response: express.Response) => {
            services.currenciesExchanger.add(Number(request.params.id), request.params.from, request.params.to, Number(request.params.timestamp), Number(request.params.rate))
                .then((status) => response.send({status}))
                .catch((error) => {
                    const {message, status} = ((error) => {
                        switch (error.message) {
                            default:
                                return {message: error.message, status: 500};
                        }
                    })(error);

                    response.status(status).send({message});
                })
        })

        .get('/exchange/rate/:id/:from/:to/:timestamp', (request: express.Request, response: express.Response) => {
            services.currenciesExchanger.read(Number(request.params.id), request.params.from, request.params.to, Number(request.params.timestamp))
                .then((rate) => response.send({rate}))
                .catch((error) => {
                    const {message, status} = ((error) => {
                        switch (error.message) {
                            case ERRORS_CurrenciesExchangerService.CURRENCIES_EXCHANGER_MISSED:
                                return {message: error.message, status: 404};
                            case ERRORS_CurrenciesExchanger.LOADER_FAILED:
                                return {message: error.message, status: 403};
                            case ERRORS_CurrenciesExchanger.RATE_MISSED:
                                return {message: error.message, status: 404};
                            default:
                                return {message: error.message, status: 500};
                        }
                    })(error);

                    response.status(status).send({message});
                })
        })
    ;

}
