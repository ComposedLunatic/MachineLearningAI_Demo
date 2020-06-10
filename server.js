// Copyright(C) 2020 Shawn Hodgson All Rights Reserved

import Express from 'express';
import Path from 'path';
import HTTP from 'http';
import File from 'fs';
import Multer from 'multer';

const Upload = Multer();

const PORT = 3000;

// Server is just meant to load the index.html for now
// Later will implement a Save and Load for AI models

class Server {

    constructor() {

        // setup express
        this.api = Express();
        this.api.use( Express.json())
                .use( Express.urlencoded({ extended: false }))
                .use( Express.static( Path.join(__dirname, '.')));

        // initialize GET POST Handlers
        this.api.get('/', ( req, res ) => {
            res.render('index', { title:'FlappyBerbDemo'});
        });
        // run the server
        this.run();
    }

    run() {
        this.api.set('port', PORT );

        this.listener = HTTP.createServer( this.api );
        this.listener.listen( PORT );

        console.log('Listening on port 3000');
    }
}

const server = new Server();