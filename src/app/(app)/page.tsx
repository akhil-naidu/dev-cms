// pages/index.js
import Head from 'next/head'

import DynamicForm from '@/components/DynamicForm'
import InputWithoutLabel from '@/components/InputWithoutLabel'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Dynamic Form Example</title>
        <meta name='description' content='Dynamic Form Example' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <DynamicForm />
        <InputWithoutLabel />
      </main>

      <footer>{/* Footer content */}</footer>
    </div>
  )
}
