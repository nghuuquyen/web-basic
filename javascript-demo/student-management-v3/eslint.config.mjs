import globals from "globals";
import pluginJs from "@eslint/js";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            sourceType: "commonjs",
            globals: {
                ...globals.node  // Add Node.js globals
            }
        },
        plugins: {
            prettier: pluginPrettier
        },
        rules: {
            "prettier/prettier": "error"
        }
    },
    {
        languageOptions: {
            globals: globals.browser
        }
    },
    pluginJs.configs.recommended,
    prettier
];
