import express = require('express');

export default (app: express.Application) => {
    app.get('/ping', (request: express.Request, response: express.Response) => {
        response.send({pong: Date.now()})
    })
}
