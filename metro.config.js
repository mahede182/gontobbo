// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
/**
 *  Expo metro config
 * <>Learn more https://docs.expo.io/guides/customizing-metro

  * For one idea on how to support symlinks in Expo, see:
  * <>https://github.com/infinitered/ignite/issues/1904#issuecomment-1054535068
  */

const config = getDefaultConfig(__dirname);

module.exports = config;
