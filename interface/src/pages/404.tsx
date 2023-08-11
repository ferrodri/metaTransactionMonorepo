import type { NextPage } from 'next';
import Head from 'next/head';

const NotFound: NextPage = () => (
    <>
        <Head>
            <title>Not found</title>
            <meta name="robots" content="noindex,nofollow" />
        </Head>
        <div>
            <h1>Not found</h1>
        </div>
    </>
);

export default NotFound;
