export const theme = {
    colors: {
        // Brand Colors
        yellow: '#ffcb05',
        yellowLighter: '#fff578',
        yellowDarker: '#f5a61a',
        pink: '#f16682',
        pinkLighter: '#f287b7',
        pinkDarker: '#ee3135',
        green: '#b1d249',
        greenLighter: '#d5e05b',
        greenDarker: '#45b97c',
        blue: '#1ebcc5',
        blueLighter: '#84d0d9',
        blueDarker: '#4594d3',
        
        // Grey tones
        white: '#ffffff',
        grey100: '#f6f6f6',
        grey200: '#ededed',
        grey300: '#d0d2d3',
        grey400: '#a6a8ab',
        grey500: '#808184',
        grey600: '#757575',
        grey700: '#616161',
        grey800: '#58595b',
        grey900: '#231f20',
        black: '#000000',

        // Status colors
        statusOK: '#b1d249',
        statusInfo: '#ffcb05',
        statusAlert: '#ee3135'
    },
    shadows: {
        level1: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)'
    },
    zLayers: {
        main: 1,
        portal: 10,
        appHeader: 20,
        menu: 30,
        modal: 40
    }
} as const;