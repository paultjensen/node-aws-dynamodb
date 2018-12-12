/* DynamoDb Data Access
 * index.js
 *
 * Purpose: Provides functions for DynamoDb using the AWS SDK.
 * Author: Paul Jensen (paul.t.jensen@gmail.com)
 */

(function() {
    'use strict';
    let Aws = require('aws-sdk');
    let dynamodb = {};

    dynamodb.initLocal = function(config, logPrefix) {
    };

    dynamodb.init = function(config, logPrefix) {
    };
    
    module.exports = {dynamodb: dynamodb};

})();