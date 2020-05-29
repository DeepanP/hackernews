import React from 'react';
import NewsApp, { loadNews } from '../components/app';

export default  [
    {
        loadData: loadNews,
        path: '/',
        component: NewsApp,
        routes: [
            {
                path: '/page/:id',
                component: NewsApp
            }
        ]
    }
];