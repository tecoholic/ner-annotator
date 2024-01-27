module.exports = {
    "root": true,
    "env": {
        "node": true,
        "jest": true
    },
    "extends": [
        "plugin:vue/vue3-recommended",
        "eslint:recommended"
    ],
    "parserOptions": {
        "parser": "@babel/eslint-parser"
    },
    "rules": {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "vue/multi-word-component-names": 0
    }
}