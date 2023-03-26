import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

const updateList = [
  'https://gitee.com/maotoumao/MusicFree/raw/master/release/version.json',
  'https://raw.githubusercontent.com/maotoumao/MusicFree/master/release/version.json',
];

async function getLatestVersion() {
  for (let i = 0; i < updateList.length; ++i) {
    try {
      const rawInfo = await fetch(updateList[i]).then(_ => _.json());
      return rawInfo;
    } catch { }
  }
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [versionInfo, setVersionInfo] = useState();

  useEffect(() => {
    getLatestVersion().then(setVersionInfo);
  }, []);

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to={versionInfo?.download?.[0] ? versionInfo.download[0] : 'https://gitee.com/maotoumao/MusicFree/releases'}>下载最新版{versionInfo ? `(${versionInfo?.version})` : ''}</Link>
          <Link
            className={clsx("button button--secondary button--lg", styles.ml4)}
            to="/docs/tutorial-usage/intro">
            查看使用指南
          </Link>
          <Link
            className={clsx("button button--secondary button--lg", styles.ml4)}
            to="/docs/tutorial-plugin/intro">
            插件开发手册
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`MusicFree - ${siteConfig.tagline}`}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
