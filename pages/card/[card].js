import Head from 'next/head'
import { useRouter } from 'next/router'

import { fetchEntries } from '@utils/contentfulPosts'

import Header from '@components/Header'
import Card from '@components/Card'

function parseImage(items) {
  let item = items[Math.floor(Math.random() * items.length)]
  return {
    url: item.fields.file.url,
    alt: item.fields.title,
    size: item.fields.file.details.image,
  }
}

export default function Home({ content }) {
  const router = useRouter()
  let img = parseImage(content?.coverImage)

  return (
    <>
      <Head>
        <title>{content?.message}</title>
      </Head>
      <div className="container">
        <Header text={content?.message} />
        <Card img={img} to={router.query.to} from={router.query.from} />
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const res = await fetchEntries()
  const cornucopia = await res.map((p) => {
    return `/card/${p.fields.slug}`
  })

  return { paths: cornucopia, fallback: false }
}

export async function getStaticProps({ params }) {
  console.log(params)
  const res = await fetchEntries()
  const content = await res
    .map((p) => {
      return p.fields
    })
    .filter((thing) => {
      return thing.slug === params.card
    })

  return {
    props: {
      content: content[0],
    },
  }
}
