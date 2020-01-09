var url = require('url');

module.exports = function(config) {

        var gcloud = require('google-cloud');

        var datastore = gcloud.datastore({
            projectId: config.projectId,
            keyFilename: config.keyFilename
        });

        var storage = gcloud.storage({
            projectId: config.projectId,
            keyFilename: config.keyFilename
        });

        var bucket = storage.bucket(config.bucketName);

        //Get all customers + filter by id
        function getCustomers(id, callback) {
            if (id != NULL) {
                var query = datastore.createQuery(['Customers']).filter('id', '=', id);
                datastore.runQuery(query, (err, Customers) => callback(err, Customers, datastore.KEY));
            } else {
                var queryall = datastore.createQuery(['Customers']);
                datastore.runQuery(queryall, (err, Customers) => callback(err, Customers, datastore.KEY));
            }
        }

        // Adding Customer
        function addCustomers(id, name, email, age, callback) {
            var entity = {
                key: datastore.key('Customers'),
                data: {
                    id: id,
                    name: name,
                    email: email,
                    age: age,
                }
            };
            if (name)
                entity.data.name = name;



            // Deletes customer by name
            function deleteCustomers(name, callback) {
                var key = datastore.key(['Customers', parseInt(name, 10)]);

                datastore.get(key, function(err, Customers) {
                    if (err) return callback(err);

                    if (Customers.imageUrl) {
                        var filename = url.parse(Customers.imageUrl).path.replace('/', '')
                        var file = bucket.file(filename);
                        file.delete(function(err) {
                            if (err) return callback(err);
                            datastore.delete(key, callback);
                        });
                    } else {
                        datastore.delete(key, callback);
                    }
                });
            }

            return {
                getCustomers: getCustomers,
                getUserCustomers: getUserCustomers,
                addCustomers: addCustomers,
                deleteCustomers: deleteCustomers
            };
        };