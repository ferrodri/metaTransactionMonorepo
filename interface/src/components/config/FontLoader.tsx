import { Inter, Space_Grotesk } from 'next/font/google';

const primary = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-primary',
});

const secondary = Inter({
    subsets: ['latin'],
    variable: '--font-secondary',
});

export default function FontLoader() {
    return (
        <style jsx global>{`
            html,
            body {
                --font-primary: ${primary.style.fontFamily};
                --font-secondary: ${secondary.style.fontFamily};
            }
        `}</style>
    );
}
