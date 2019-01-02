/* DynamoDb Data Access
 * index.js
 *
 * Purpose: Provides example functions for DynamoDb using the AWS SDK.
 * Author: Paul Jensen (paul.t.jensen@gmail.com)
 */

(function() {
    'use strict';

    let DynamoDb = require('./lib/dynamodb').dynamodb;
    let Config = require('./lib/config').config;
    let Logger = require('./lib/logger');

    DynamoDb.init(Config);
    DynamoDb.write(Config,'test-item', 'test-report').then((result) => {
        Logger.log.info('Write succeeded.');
        Logger.log.info(JSON.stringify(result));
        DynamoDb.read(Config,'test-item').then((result) => {
            Logger.log.info('Read succeeded.');
            Logger.log.info(JSON.stringify(result));
        }).catch((err) => {
            Logger.log.error(JSON.stringify(err));
        });

    }).catch((err) => {
        Logger.log.error(JSON.stringify(err));
    });

})();