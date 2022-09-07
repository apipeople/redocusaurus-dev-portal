const {exec} = require('child_process');
const https = require('node:https');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({path:'./website/.env'});

const propertiesArray = [];

const writeJsonFile = (str, name) => {
    fs.mkdir(`website/openapi/swagger/`, { recursive: true }, (err) => console.error(err));
    let file = fs.createWriteStream(`website/openapi/swagger/${name}.json`)
        .on('finish', () => file.close());
    file.write(str);
    console.log('Finished downloading API documentation.');
    
}

const convertBodyToJson = (res, name) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => writeJsonFile(body, name));
}

const generateFileFromSwaggerhub = (name, url, apiKey) => {
    let headers = { 'Authorization': apiKey };
    let options = {
        host: 'api.swaggerhub.com',
        path: `/apis/apipeople${url}`,
        headers: headers
    };
    https.get(options, res => convertBodyToJson(res, name))
}

function init() {
    let apiKey = process.env.API_KEY;
    console.log(`apiKey ${apiKey}`);
    let jsonString = process.env.API_LIST || '[]';
    let apis = JSON.parse(jsonString);
    console.log('APIs found: ' + apis.length);
    if (apis.length == 0 || apiKey == null) {
        console.error('APIs and apiKey are required');
        return;
    }
    apis.forEach(api => {
        let id = api.url.split('/')[1];
        generateFileFromSwaggerhub(id, api.url, apiKey)
    });
}

init()