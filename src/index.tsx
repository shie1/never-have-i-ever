import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {colors} from "./shared";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <div style={{
            backgroundColor: colors.background,
            width: '100%',
            minHeight: '100vh',
        }}>
            <App/>
        </div>
    </React.StrictMode>
);