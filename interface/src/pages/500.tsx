import type { NextPage } from 'next';
import Head from 'next/head';

const InternalError: NextPage = () => (
    <>
        <Head>
            <title>Error</title>
            <meta name="robots" content="noindex,nofollow" />
        </Head>
        <div>
            <h1>Something went wrong</h1>
        </div>
    </>
);

export default InternalError;
