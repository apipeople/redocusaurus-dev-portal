import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import styles from './styles.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

const projectName = process.env.npm_config_name;

const sections = [
  {
    title: <>🌚 Dark Mode Support</>,
    description: (
      <>Inbuilt support for Docusaurus Classic Theme&apos;s Dark Mode!</>
    ),
  },
  {
    title: <>🧩 Customizable</>,
    description: (
      <>
        Pass in your custom theme colors or options and it will be merged. All
        components can be swizzled to suit your needs (with Typescript support)
      </>
    ),
  },
  {
    title: <>📑 Schema Definitions</>,
    description: (
      <>Use individual schema definitions directly in your MDX docs</>
    ),
  }
];

/**
 *
 * @param {{
 *   title: string | React.ReactNode;
 *   description: string | React.ReactNode;
 *   link?: string;
 * }} param0
 */
function Section({ title, description, link }) {
  const sectionComponent = <h3>{title}</h3>;
  const fullLink = useBaseUrl(link);
  return (
    <div className={clsx('col col--6', styles.feature, styles.featuresCol)}>
      {link ? <Link to={fullLink}>{sectionComponent}</Link> : sectionComponent}
      <p>{description}</p>
    </div>
  );
}

function Docs() {
  return (
    <Layout title="API People" description="OpenAPI documentation solution">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <title>API People</title>
        <div className="container">
          <h1 className="hero__title">API People</h1>
          <p>Expert Systems Integration Services in MuleSoft, Apache Camel and Java/Spring.</p>
        </div>
      </header>
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

export default Docs;
