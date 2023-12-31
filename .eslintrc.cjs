// require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        // '@vue/eslint-config-typescript',
        // '@vue/eslint-config-prettier/skip-formatting'
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "modules": true,
            'jsx': true
        },
        "requireConfigFile": false,
        "parser": '@babel/eslint-parser'
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        complexity: [
            'error',
            {
                max: 10
            }
        ]
    }
}
