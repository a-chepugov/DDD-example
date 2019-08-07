import express = require('express');
// @ts-ignore
import packageJSON = require('../../../package.json');

export default (app: express.Application, services: any) => {
    app
        .get('/', (request: express.Request, response: express.Response) => response.end(`${packageJSON.name} ${packageJSON.version}`))
    ;

    app.get('/_cat', (request: express.Request, response: express.Response) => {
        const routes = app._router.stack
            .filter(({route}: express.Router) => route)
            .map(({route}: express.Router) => {
                const {path, methods = {}}: any = route || {};
                const methodsList = Object.keys(methods).filter((item) => item).join(', ');
                return `${methodsList}\t${path}`
            })
            .join('\n')
        ;
        response.end(routes);
    });

    require('./ping').default(app, services);
    require('./Currency').default(app, services);
}
