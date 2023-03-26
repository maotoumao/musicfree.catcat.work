import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '插件化',
    Svg: require('@site/static/img/undraw_monitor.svg').default,
    description: (
      <>
        软件默认是一个本地音乐播放器，可以通过【插件】扩展第三方源。
      </>
    ),
  },
  {
    title: '开源，免费',
    Svg: require('@site/static/img/undraw_open_source.svg').default,
    description: (
      <>
        基于<a href='https://github.com/maotoumao/MusicFree/blob/master/LICENSE'>GPL 3.0协议</a>开源，APP不接受任何形式的商用&内置广告，仅供学习参考。
      </>
    ),
  },
  {
    title: '版本更新',
    img: "https://img1.imgtp.com/2023/03/26/o8ckNA1Z.jpg",
    description: (
      <>
        获取最新消息、反馈问题或者提供建议可以关注公众号【一只猫头猫】。不定期更新（尽量保证更新频率）。
      </>
    ),
  },
];

function Feature({Svg, img, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {Svg ? <Svg className={styles.featureSvg} role="img" /> : <img src={img} className={styles.featureSvg}></img>}
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
