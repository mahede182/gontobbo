// // Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;

// /** @type {import('expo/metro-config').MetroConfig} */
// /**
//  *  Expo metro config
//  * <>Learn more https://docs.expo.io/guides/customizing-metro

//   * For one idea on how to support symlinks in Expo, see:
//   * <>https://github.com/infinitered/ignite/issues/1904#issuecomment-1054535068
//   */

const monorepoRoot = path.resolve(projectRoot, "../..");

// eslint-disable-next-line no-undef
const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [monorepoRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

config.resolver.disableHierarchicalLookup = true;

module.exports = config;