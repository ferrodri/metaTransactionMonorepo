import FontLoader from 'components/config/FontLoader';
import RainbowKit from 'components/config/RainbowKit';
import ReactQuery from 'components/config/ReactQuery';
import AppLayout from 'components/layouts/AppLayout';
import type { AppProps } from 'next/app';
import 'styles/globals.css';
import 'styles/rainbowkit.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <FontLoader />
            <ReactQuery>
                <RainbowKit>
                    <AppLayout>
                        <Component {...pageProps} />
                    </AppLayout>
                </RainbowKit>
            </ReactQuery>
        </>
    );
}
