#!/bin/bash
PROJECT_NAME=M4.256-PAC6

# create the projecte
npx @angular/cli@latest new ${PROJECT_NAME} --no-strict --standalone=false --style=scss --ssr=no --skip-tests --package-manager="npm"

# install the packages
cd ${PROJECT_NAME}
ng add @angular-eslint/schematics --defaults --skip-confirmation
ng add @angular/material --defaults --skip-confirmation --typography
npm install --save-dev prettier prettier-eslint eslint-config-prettier eslint-plugin-prettier
npm install --save chart.js ngx-papaparse

# overwrite / create config files
cat << EOF > eslint.config.js
// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      eslintPluginPrettierRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
EOF
cat << EOF > .prettierrc.json
{
  "trailingComma": "none",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "overrides": [
    {
      "files": "*.html",
      "options": {
        "parser": "angular"
      }
    }
  ]
}
EOF

# generate components
ng g s shared/grades

ng g m home --route home --module app.module --routing
ng g c home/home-page -m home

ng g m list --route list --module app.module --routing
ng g c list/list-page -m list

ng g m statistics --route statistics --module app.module --routing
ng g c statistics/statistics-page -m statistics
ng g c statistics/resume-data -m statistics
ng g c statistics/gender -m statistics
ng g c statistics/general-results -m statistics
