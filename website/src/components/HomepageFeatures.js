import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'MuleSoft',
    imageSrc: '/img/mulesoft/logo.png',
    toLink: '/docs/mulesoft/introduction',
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    )
  },
  {
    title: 'Banking Cores',
    imageSrc: '/img/banks/bank.png',
    toLink: '/docs/bankcores/introduction',
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    )
  },
  {
    title: 'DevOps',
    imageSrc: '/img/devops/devops.png',
    toLink: '/docs/bankcores/introduction',
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    )
  }
];

function Feature({imageSrc,toLink,  title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <a href={toLink}>
          <img alt={title} src={imageSrc} width="175px" height="175px" />
        </a>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
