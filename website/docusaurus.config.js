/**
 * @type {import('redocusaurus').PresetEntry}
 */
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const projectName = process.env.npm_config_name;
const dotenv = require('dotenv');
dotenv.config();

const generateSpecs = () => {
  let specs = [
      {
      id: 'api-documentation',
      spec: 'openapi/swagger/swagger.json',
      route: '/documentation/api/',
    }
  ]
  let jsonString = process.env.API_LIST || '[]';
  let apis = JSON.parse(jsonString);
  apis.forEach(api => {
    let id = api.url.split('/')[1];
    let spec = {
      id: id,
      spec: `openapi/swagger/${id}.json`,
      route: `/documentation/api/${id}`,
    }
    specs.push(spec);
  });
  return specs;
}

const generateItems = () => {
  let items = [
    {
      type: 'doc',
      docId: 'mulesoft/introduction',
      position: 'left',
      label: 'MuleSoft',
    },
    {
      type: 'doc',
      docId: 'bankcores/introduction',
      position: 'left',
      label: 'Banking Cores',
    },
    {
      type: 'doc',
      docId: 'devops/introduction',
      position: 'left',
      label: 'DevOps',
    },
    {
      href: "https://www.linkedin.com/company/api-people",
      label: "LinkedIn",
      position: "right",
    },
  ];
  let subItems = [];
  let jsonString = process.env.API_LIST || '[]';
  let apis = JSON.parse(jsonString);
  apis.forEach(api => {
    let id = api.url.split('/')[1];
    let item = {
      label: api.name,
      to: `/documentation/api/${id}`,
    }
    subItems.push(item);
  });
  items.push({
    label: 'Documentations',
    position: 'left',
    items: subItems
  });
  return items;
}

const redocusaurus = [
  'redocusaurus',
  {
    debug: Boolean(process.env.DEBUG || process.env.CI),
    specs: generateSpecs(),
    theme: {
      /**
       * Highlight color for docs
       */
      primaryColor: '#1890ff',
      /**
       * Options to pass to redoc
       * @see https://github.com/redocly/redoc#redoc-options-object
       */
      options: { disableSearch: true },
      /**
       * Options to pass to override RedocThemeObject
       * @see https://github.com/Redocly/redoc#redoc-theme-object
       */
      theme: {},
    },
  },
];

if (process.env.VERCEL_URL) {
  process.env.DEPLOY_PRIME_URL = `https://${process.env.VERCEL_URL}`;
}

/**
 * @type {Partial<import('@docusaurus/types').DocusaurusConfig>}
 */
const config = {
  title: "API People",
  tagline: "Internal Company Documentation",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/apipeople/favicon.ico",
  organizationName: "apipeople", // Usually your GitHub org/user name.
  projectName: projectName, 
  presets: [
    /** ************ Your other presets' config  *********** */
    [
      '@docusaurus/preset-classic',
      {
        debug: Boolean(process.env.DEBUG || process.env.CI),
        theme: { customCss: [require.resolve('./src/custom.css')] },
      },  
    ],
    // Redocusaurus Config
    redocusaurus,
  ],
  customFields: {
    meta: {
      description: 'Integrate Redoc easily into your Docusaurus Site',
    },
  },
  url: 'http://localhost:3000', // Your website URL
  baseUrl: '/', // Base URL for your project */
  favicon: 'img/favicon.ico',
  themeConfig: {
    navbar: {
      title: 'API People',
      logo: {
        alt: 'API People',
        src: 'img/apipeople/small-logo.png',
        srcDark: "img/apipeople/small-logo-white.png"
      },
      items: generateItems(),
    },
    footer: {
      style: "dark",
        links: [
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/docusaurus",
              },
              {
                label: "Discord",
                href: "https://discordapp.com/invite/docusaurus",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/docusaurus",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/facebook/docusaurus",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} API People LLC, Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
    },
  },
};

module.exports = config;
