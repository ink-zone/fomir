import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'
import Translate from '@docusaurus/Translate'
import { Box } from '@fower/react'
import { css } from '@fower/core'

const features = [
  {
    title: 'Schema-First',
    description: (
      <Translate id="home.feature1.desc" description="The homepage welcome message">
        Schema is First class citizen
      </Translate>
    ),
  },
  {
    title: 'State-Driven',
    description: (
      <Translate id="home.feature2.desc" description="The homepage welcome message">
        The entire schema is state, easy to update user interface
      </Translate>
    ),
  },
  {
    title: 'High performance',
    description: (
      <Translate id="home.feature3.desc" description="The homepage welcome message">
        High performance, less rerender
      </Translate>
    ),
  },
]

function Feature({ title, description, idx }) {
  return (
    <div
      style={{
        marginBottom: '40px',
        paddingRight: (idx + 1) % 3 === 0 ? 0 : '40px',
      }}
      className={clsx('col col--4', styles.feature)}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {}, tagline } = context
  return (
    <Layout title={tagline} description={tagline}>
      <div className={styles.container}>
        <Box className="toBetween flexDirection-row">
          <Box>
            <Box
              className="leadingNone fontExtrabold textCenter"
              style={{ fontSize: 108, width: 800 }}
              mt-100
            >
              <Box transparent bgClipText bgGradientX={['yellow500', 'red500']}>
                Schema-First
              </Box>
              <Box transparent bgClipText bgGradientX={['red500', 'purple500']}>
                Form Library
              </Box>
            </Box>

            <Box className={styles.wrapLink} spaceX2 toCenterX>
              <Link
                className={clsx(
                  'button button--lg',
                  styles.getStarted,
                  css('roundedFull', 'bgBlack', 'bgTrueGray800', 'py3', 'borderNone'),
                )}
                to={useBaseUrl('docs/guide/getting-started')}
              >
                Get Started
              </Link>
              <iframe
                className={styles.indexCtasGitHubButton}
                src="https://ghbtns.com/github-btn.html?user=forsigner&amp;repo=fomir&amp;type=star&amp;count=true&amp;size=large"
                width={160}
                height={30}
                title="GitHub Stars"
              />
            </Box>
          </Box>
          {/* <Box className="demo-container">
            <HomeDemo></HomeDemo>
          </Box> */}
        </Box>
      </div>

      <main className="home">
        {features && features.length > 0 && (
          <div className={styles.item}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} idx={idx} {...props} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  )
}

export default Home
