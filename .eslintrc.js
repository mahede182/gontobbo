module.exports = {
  root: true,
  extends: ["expo", "prettier"],
  // <> Use the `react-native` plugin to enable rules specific to React Native. l[:25 - :29] react-native/*
  plugins: ["prettier", "react", "react-native"],
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
    /**
     *<> 0 = "off" (disable the rule)
     *<> 1 = "warn" (show a warning for rule violations)
     *<> 2 = "error" (show an error for rule violations)
     */
    "react-native/no-unused-styles": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-color-literals": 2,
    "react-native/no-single-element-style-arrays": 2,
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
  ],
};
