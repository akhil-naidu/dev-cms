// pages/index.js

import DynamicForm from '@/components/DynamicForm';

import Head from 'next/head';

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
      </main>

      <footer>{/* Footer content */}</footer>
    </div>
  );
}
