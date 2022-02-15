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
        Fomir create form by passing a form schema which is a json tree. the form schema is very
        flexible, you can create any form by the schema.
      </Translate>
    ),
  },
  {
    title: 'State-Driven',
    description: (
      <Translate id="home.feature1.desc" description="The homepage welcome message">
        Every thing in form schema is state, you can build the form interface easily. it's useful
        when you create a dynamic form.
      </Translate>
    ),
  },
  {
    title: 'High Performance',
    description: (
      <Translate id="home.feature1.desc" description="The homepage welcome message">
        In some case, form performance is very important. Performance of Fomir is high because of
        subscription-based form state management. It will not rerender the whole form when you
        update a single field.
      </Translate>
    ),
  },
  {
    title: 'Sharing and Collaborating',
    description: (
      <Translate id="home.feature1.desc" description="The homepage welcome message">
        In fomir, the component property in form schema decide how to render the form field. Fomir
        will push you to create some form component like Input, Select, DatePicker... this will make
        it easy to share form component in you team.
      </Translate>
    ),
  },
  {
    title: 'Low-code friendly',
    description: (
      <Translate id="home.feature1.desc" description="The homepage welcome message">
        Fomir builds form with schema, so fomir is very easy to use in low-code scenarios. when you
        want to create something like form builder, Fomir might be a good choice.
      </Translate>
    ),
  },
  {
    title: 'Strongly Typed',
    description: (
      <Translate id="home.feature1.desc" description="The homepage welcome message">
        Fomir Form provides strong typing via Typescript to allow you to catch common bugs at coding
        time, and providng the coding intellisense.
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
        <div className="toBetween flexDirection-row flex">
          <div>
            <div
              className="leadingNone fontExtrabold textCenter mt-40"
              style={{ fontSize: 108, width: 800 }}
            >
              <div className="transparent bgClipText bgGradientX-yellow500-red500">
                Schema-First
              </div>
              <div className="transparent bgClipText bgGradientX-red500-purple500">
                Form Library
              </div>
            </div>

            <div className={styles.wrapLink + ' flex row-toCenterX'}>
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
            </div>
          </div>
          {/* <Box className="demo-container">
            <HomeDemo></HomeDemo>
          </Box> */}
        </div>
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
