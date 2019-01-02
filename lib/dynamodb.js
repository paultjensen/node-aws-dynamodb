/* DynamoDb Data Access
 * index.js
 *
 * Purpose: Provides functions for DynamoDb using the AWS SDK.
 * Author: Paul Jensen (paul.t.jensen@gmail.com)
 */

(function() {
    'use strict';
    let Aws = require('aws-sdk');
    let Logger = require('../lib/logger');

    let _db = null;
    let dynamodb = {};

    dynamodb.init = function(config) {
        if (! _db) {
            Logger.log.info('Initializing connection to local DynamoDB.');
            _db = new Aws.DynamoDB({endpoint: new Aws.Endpoint(config.dynamodb_local_url)});
            _db.config.update({region: config.dynamodb_region});
        } else {
            Logger.log.info('Using existing connection to local DynamoDB.');
        }
    };

    dynamodb.write = function(config, itemKey, report) {
        let item = {
            item_key: {S: itemKey},
            timestamp: {N: new Date().getTime().toString()},
            item_report: {S: report}
        };

        let pars = {
            TableName: config.dynamodb_table_name,
            Item: item
        };

        Logger.log.info('Saving to: ' + pars.TableName);

        return new Promise(function(resolve, reject) {
            _db.putItem(pars, (err) => {
                if (err) {
                    reject(err);
                } else {
                    Logger.log.info('Finished successful save.');
                    resolve('success');
                }
            });
        });
    };

    dynamodb.read = function(config, itemKey) {
        return new Promise(function(resolve, reject) {

            let pars = {
                TableName: config.dynamodb_table_name,
                Key: { "item_key": {"S": itemKey}}
            };

            _db.getItem(pars, function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    if (data.Item) {
                        resolve(data.Item);
                    } else {
                        resolve({});
                    }
                }
            });
        });
    };

    module.exports = {dynamodb: dynamodb};

})();