import './bootstrap';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { Toaster } from 'sonner';
import { ThemeProvider } from './Providers/ThemeProvider';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider defaultTheme='dark'>
                <Toaster richColors theme='dark' position='top-center' closeButton duration={1500} />
                <App {...props} />
            </ThemeProvider>            
        );
    },
});

InertiaProgress.init({ color: '#960000',delay:10 });
