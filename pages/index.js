import Head from 'next/head'
import Link from 'next/link'

import { fetchEntries } from '@utils/contentfulPosts'

import Header from '@components/Header'
import Form from '@components/Form'
import Footer from '@components/Footer'

export default function Home({ messages }) {
  return (
    <div className="container">
      <Head>
        <title>Happy Birthday!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header text="It's birthday time!" />
        <div className="posts">
          <Form cards={messages} />
          {/* Go to one of these slugs:
          <ul>
            {messages.map((m) => {
              return (
                <li>
                  <Link href={`/card/${m.slug}`}>
                    <a>/{m.slug}</a>
                  </Link>
                </li>
              )
            })}
          </ul> */}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetchEntries()
  const messages = await res.map((p) => {
    return p.fields
  })

  console.log(messages)

  return {
    props: {
      messages,
    },
  }
}
