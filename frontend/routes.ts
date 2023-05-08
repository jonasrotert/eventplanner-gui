import type {Route} from '@vaadin/router';
import './views/contact/contact-list';
import './main-layout';

export type ViewRoute = Route & {
    title?: string;
    icon?: string;
    children?: ViewRoute[];
};

export const views: ViewRoute[] = [
    // Place routes below (more info https://hilla.dev/docs/routing)
    {
        path: 'dashboard',
        component: 'dashboard-view',
        title: 'Dashboard',
        action: async () => {
            await import('./views/dashboard/dashboard-view');
        },
    },
    {
        path: '',
        component: 'contact-list',
        icon: 'file',
        title: 'Contacts',
    },

];
export const routes: ViewRoute[] = [
    {
        path: '',
        component: 'main-layout',
        children: views,
    },
];
