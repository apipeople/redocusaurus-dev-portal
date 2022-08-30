const {exec} = require('child_process');
const https = require('node:https');
const fs = require('fs');

const propertiesArray = [];

const writeJsonFile = (str, name) => {
    fs.mkdir(`website/openapi/swagger/`, { recursive: true }, (err) => console.error(err));
    let file = fs.createWriteStream(`website/openapi/swagger/openapi.json`)
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
    let name = process.env.npm_config_name;
    let url = process.env.npm_config_url;
    let apiKey = process.env.npm_config_apikey;
    console.log(`apiKey ${apiKey}`);
    
    if (name == null || url == null || apiKey == null) {
        console.error('Name, URL and apiKey are required. Please, use --name and --url and --apikey arguments.');
        return;
    }
    console.log('Started downloading API documentation to openapi.json file.');
    generateFileFromSwaggerhub(name, url, apiKey)

    console.log(`Waiting for directory creation: ${name}`);
}

init();