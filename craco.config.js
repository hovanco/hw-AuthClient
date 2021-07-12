const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            // theme antd
                            'primary-color': '#4267b2',
                            'height-base': '38px',
                            'border-radius-base': '4px',
                            'border-color-base': '#dee5e7',

                            // other
                            'dark-color': '#101025',
                            '@color_secondary': '#4267b2',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
