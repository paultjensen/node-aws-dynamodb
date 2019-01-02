#!/bin/bash
sudo apt-get update && sudo apt-get upgrade

#Install curl
sudo apt install curl

#Install NodeJS and NPM
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs

#Install Java
sudo apt-get update
sudo apt-get install -y software-properties-common debconf-utils
sudo add-apt-repository -y ppa:webupd8team/java
sudo apt-get update
sudo echo "oracle-java8-installer shared/accepted-oracle-license-v1-1 select true" | sudo debconf-set-selections
sudo apt-get install -y oracle-java8-installer


#Install DynamoDB
mkdir dynamodb
cd dynamodb
wget https://s3-us-west-2.amazonaws.com/dynamodb-local/dynamodb_local_latest.tar.gz
tar -xvf dynamodb_local_latest.tar.gz
rm dynamodb_local_latest.tar.gz
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb

#Install AWS CLI
sudo apt install awscli

#Create DynamoDB Table
aws dynamodb create-table \
    --table-name test-table \
    --region us-east-1 \
    --attribute-definitions \
        AttributeName=item_key,AttributeType=S \
    --key-schema AttributeName=item_key,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=50,WriteCapacityUnits=100 \
    --endpoint-url http://localhost:8000

#Delete DynamoDb Table
#aws dynamodb delete-table --region us-east-1 --table-name test-table --endpoint-url http://localhost:8000