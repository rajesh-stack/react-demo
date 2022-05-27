import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { PhotoGallery } from '../components/PhotoGallery'
import AddPhoto from '../components/AddPhoto'
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Photo Gallery</title>
        <meta name="description" content="Photo Gallery next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PhotoGallery/>
        <AddPhoto/>
      </main>
    </div>
  )
}
