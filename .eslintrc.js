module.exports = {
  root: true,
  extends: ["expo", "prettier"],
  plugins: ["prettier", "react"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        semi: true,
        bracketSpacing: true,
        trailingComma: "all",
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        bracketSameLine: true,
        insertPragma: false,
      },
    ],
    "react/display-name": "off",
    "no-console": "warn",
    "@typescript-eslint/no-empty-object-type": "off",
    "import/no-unresolved": [
      "error",
      {
        ignore: ["^@env$"],
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        project: [
          "./apps/mobile/tsconfig.json",
          "./apps/backend/tsconfig.json",
          "./packages/shared/tsconfig.json",
        ],
        noWarnOnMultipleProjects: true,
      },
    },
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.d.ts"],
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    // CLI scripts, seeders, and loggers intentionally use console
    {
      files: [
        "apps/backend/prisma/**/*.{js,ts}",
        "apps/backend/src/index.ts",
        "apps/backend/src/config/env.ts",
        "apps/backend/src/config/gemini.ts",
        "apps/backend/src/middleware/errorHandler.ts",
        "apps/backend/src/modules/**/*.ts",
        "apps/mobile/src/utils/applogger.ts",
        "apps/mobile/src/config/ReactotronConfig.ts",
      ],
      rules: {
        "no-console": "off",
      },
    },
    // React Native rules only apply to the mobile app
    {
      files: ["apps/mobile/**/*.{js,jsx,ts,tsx}"],
      plugins: ["react-native"],
      rules: {
        "react-native/no-unused-styles": "error",
        // Dynamic/glass UI styles are intentional; StyleSheet for every opacity is noise
        "react-native/no-inline-styles": "off",
        "react-native/no-color-literals": "off",
        "react-native/no-single-element-style-arrays": "error",
      },
    },
  ],
};
