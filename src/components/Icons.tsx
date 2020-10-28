import React from 'react';
import '../theme/main.scss';

export function Icons() {
    function HomeIcon() {
        return (
        <svg xmlns="http://www.w3.org/2000/svg" id="icon" className="ionicon" viewBox="0 0 512 512">
            <linearGradient id="svgGradient">
                <stop offset="0%" stop-color="var(--color-stop-1)"/>
                <stop offset="100%" stop-color="var(--color-stop-2)"/>
            </linearGradient>
            <title>Home</title>
            <path
                d="M261.56 101.28a8 8 0 00-11.06 0L66.4 277.15a8 8 0 00-2.47 5.79L63.9 448a32 32 0 0032 32H192a16 16 0 0016-16V328a8 8 0 018-8h80a8 8 0 018 8v136a16 16 0 0016 16h96.06a32 32 0 0032-32V282.94a8 8 0 00-2.47-5.79z" stroke-linecap="round" stroke-linejoin="round"/>
            <path
                d="M490.91 244.15l-74.8-71.56V64a16 16 0 00-16-16h-48a16 16 0 00-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0043 267.56L250.5 69.28a8 8 0 0111.06 0l207.52 198.28a16 16 0 0022.59-.44c6.14-6.36 5.63-16.86-.76-22.97z" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        )
    }

    function DashboardIcon()  {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" id="icon" viewBox="0 0 512 512"><title>Stats Chart</title>
                <linearGradient id="svgGradient">
                    <stop offset="0%" stop-color="var(--color-stop-1)"/>
                    <stop offset="100%" stop-color="var(--color-stop-2)"/>
                </linearGradient>
                <path
                    d="M104 496H72a24 24 0 01-24-24V328a24 24 0 0124-24h32a24 24 0 0124 24v144a24 24 0 01-24 24zM328 496h-32a24 24 0 01-24-24V232a24 24 0 0124-24h32a24 24 0 0124 24v240a24 24 0 01-24 24zM440 496h-32a24 24 0 01-24-24V120a24 24 0 0124-24h32a24 24 0 0124 24v352a24 24 0 01-24 24zM216 496h-32a24 24 0 01-24-24V40a24 24 0 0124-24h32a24 24 0 0124 24v432a24 24 0 01-24 24z"/>
            </svg>
        )
    }

    function SensorIcon() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" id="icon" viewBox="0 0 512 512"><title>Thermometer</title>
                <linearGradient id="svgGradient">
                    <stop offset="0%" stop-color="var(--color-stop-1)"/>
                    <stop offset="100%" stop-color="var(--color-stop-2)"/>
                </linearGradient>
                <path
                    d="M320 287.18V81c0-35.12-27.89-64.42-63-64.95a64.08 64.08 0 00-65 64v207.13a8 8 0 01-3.18 6.37A113.48 113.48 0 00144 384a112 112 0 00224 0 113.48 113.48 0 00-44.82-90.45 8 8 0 01-3.18-6.37zM254.07 432a48 48 0 01-22-89.54 16 16 0 008-13.84V112.45c0-8.61 6.62-16 15.23-16.43A16 16 0 01272 112v216.58a16.18 16.18 0 008.15 13.94A48 48 0 01254.07 432z"/>
            </svg>
        )
    }

    return {
        HomeIcon: HomeIcon,
        DashboardIcon: DashboardIcon,
        SensorIcon: SensorIcon
    }
}
