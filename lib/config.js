(function() {
    'use strict';

    let _config = {
        "dynamodb_region": "us-east-1",
        "dynamodb_local_url": "http://localhost:8000",
        "dynamodb_table_name": "test-table"
    };

    module.exports = {config: _config};
})();