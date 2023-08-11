import { SignApprove } from 'components/SignApprove';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>TesseractProxy MetaTransaction</title>
                <meta name="description" content="TesseractProxy MetaTransaction" />
            </Head>

            <div className="container-content grow">
                <h1 className="py-8 text-[64px] font-bold uppercase text-center" >
                    TesseractProxy MetaTransaction
                </h1>
                <SignApprove />
            </div>
        </>
    );
};

export default Home;
