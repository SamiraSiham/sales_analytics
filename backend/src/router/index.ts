import express from 'express';
// import authentication from './authentication';
// import products from './products';
const products = require('./products');
const analytics = require('./analytics');
const router = express.Router();

export default (): express.Router => {
    // authentication(router);
    products(router);
    analytics(router);
    return router;
}