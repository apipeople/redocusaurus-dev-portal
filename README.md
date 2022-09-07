# API People Redocusaurs Usage

This project was edited to dinamically download and generate the documentation directly from API People's SwaggerHub

## Build steps

1. Select API to be generated in SwaggerHub
2. Get the URL resource download from SwaggerHub: 
   > Example: if the url of the API is https://app.swaggerhub.com/apis/apipeople/sunwst-data-sync-extract-app/1.0.0
   > then copy /sunwst-data-sync-extract-app/1.0.0 resource and use it later
3. Get you API Key from swaggerhub account
    > Should be at https://app.swaggerhub.com/settings/apiKey
4. Set the API_KEY enviroment variable with your swaggerhub key
5. Set the API_LIST enviroment variable containing a list of the names and url to be generated
    ```shell
      export API_LIST=[{"name": "Creditnap System API v1.0.0", "url": "/creditsnap-sys-api/1.0.0"},{"name": "Sunwest Data Sync Process API", "url":"/sunwst-data-sync-process-app/1.0.0"}]
    ```
6. Build the application:
    ```shell
      npm run build
    ```
7. Serve the application
    ```shell
      npm run serve
    ```

 ###### Optionally, steps 4 and 5 can be merged with the command:
 ```shell
  npm run build && npm run serve
 ```


# Redocusaurus

[![npm](https://img.shields.io/npm/v/redocusaurus)](https://www.npmjs.com/package/redocusaurus/)
![npm](https://img.shields.io/npm/dw/redocusaurus)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/redocusaurus)
[![Typed with TypeScript](https://img.shields.io/badge/Typed-555555.svg?logo=typescript&labelColor=fff)](https://www.typescriptlang.org/)
[![Build and Deploy](https://github.com/rohit-gohri/redocusaurus/actions/workflows/build.yml/badge.svg)](https://github.com/rohit-gohri/redocusaurus/actions/workflows/build.yml)
![GitHub branch checks state](https://img.shields.io/github/checks-status/rohit-gohri/redocusaurus/main?logo=github)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/fef74697/redocusaurus)

[Redoc](https://github.com/redocly/redoc) for [Docusaurus v2](https://v2.docusaurus.io/).

## Usage

Check the [documentation on the website](https://redocusaurus.vercel.app/docs).

## Demo

See [Examples](https://redocusaurus.vercel.app/examples/)

## Packages

### [Redocusaurus](./packages/redocusaurus)

A Docusaurus Preset that combines the below 2 packages to easily add API doc(s) to your docs site.

### [Docusaurus Theme Redoc](./packages/docusaurus-theme-redoc)

A wrapper around `RedocStandalone` to make it match the Dcousaurus Theme with added support for Dark Mode.

### [Docusaurus Plugin Redoc](./packages/docusaurus-plugin-redoc)

A content plugin that creates pages from your OpenAPI files or URLs and renders them using the Redoc component from the theme.

### [Website](./website)

Docs website and example project show casing the preset in action with multiple different OpenAPI specs.

#### Who is using Redocusaurus?

See [**Who is using Redocusaurus?** section in docs.](https://redocusaurus.vercel.app/docs/who-is-using-redocusaurus)

## Contributing

Any help is greatly appreciated, check the [DEVELOPMENT.md](./DEVELOPMENT.md) for help on how to setup the project in your local and [CONTRIBUTING.md](./CONTRIBUTING.md) for general info about the contribution workflow.

## Motivation

To have the documentation and API reference in the same site with the same headers/footers. Read more in the blog post, [OpenAPI for Docusaurus](https://rohit.page/blog/projects/openapi-for-docusaurus/?utm_source=github&utm_medium=repo&utm_campaign=redocusaurus).

See this issue, [https://github.com/facebook/docusaurus/issues/638](https://github.com/facebook/docusaurus/issues/638#issuecomment-762502498), and this gist, <https://gist.github.com/rohit-gohri/b1a19f37702cfe4a6c5a47933a11785b> for more details and history.

## License

[MIT License. Copyright (c) 2022 Rohit Gohri](./LICENSE)
