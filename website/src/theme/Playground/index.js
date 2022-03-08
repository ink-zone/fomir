/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import clsx from 'clsx'
import Translate from '@docusaurus/Translate'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import BrowserOnly from '@docusaurus/BrowserOnly'
import { usePrismTheme } from '@docusaurus/theme-common'
import styles from './styles.module.css'
import useIsBrowser from '@docusaurus/useIsBrowser'
import { Box } from '@fower/react'

function Header({ children }) {
  return <div className={clsx(styles.playgroundHeader)}>{children}</div>
}

function LivePreviewLoader() {
  // Is it worth improving/translating?
  return <div>Loading...</div>
}

function ResultWithHeader() {
  return (
    <div className={styles.playgroundPreview}>
      <BrowserOnly fallback={<LivePreviewLoader />}>
        {() => (
          <>
            <LivePreview />
            <LiveError />
          </>
        )}
      </BrowserOnly>
    </div>
  )
}

function ThemedLiveEditor() {
  const isBrowser = useIsBrowser()
  return (
    <LiveEditor
      // We force remount the editor on hydration,
      // otherwise dark prism theme is not applied
      key={isBrowser}
      className={styles.playgroundEditor}
    />
  )
}

function EditorWithHeader() {
  return (
    <Box relative>
      <ThemedLiveEditor />
      <Box textXS fontBold green400 absolute bottom-2 right-8>
        LIVE DEMO
      </Box>
    </Box>
  )
}

export default function Playground({ children, transformCode, ...props }) {
  const {
    siteConfig: {
      themeConfig: {
        liveCodeBlock: { playgroundPosition },
      },
    },
  } = useDocusaurusContext()
  const prismTheme = usePrismTheme()

  return (
    <div className={styles.playgroundContainer}>
      <LiveProvider
        code={children.replace(/\n$/, '')}
        transformCode={transformCode || ((code) => `${code};`)}
        theme={prismTheme}
        {...props}
      >
        {playgroundPosition === 'top' ? (
          <>
            <ResultWithHeader />
            <EditorWithHeader />
          </>
        ) : (
          <>
            <EditorWithHeader />
            <ResultWithHeader />
          </>
        )}
      </LiveProvider>
    </div>
  )
}
