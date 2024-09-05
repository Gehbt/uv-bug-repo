import { defineConfig } from "@rspack/cli";
import { type RspackPluginFunction, rspack } from "@rspack/core";
import { VueLoaderPlugin } from "vue-loader";
const vue = require("unplugin-vue/rspack");
// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
  context: __dirname,
  entry: {
    main: "./src/main.ts",
  },
  resolve: {
    extensions: ["...", ".ts", ".vue", "*.css"],
  },
  module: {
    rules: [
      // {
      // 	test: /\.vue$/,
      // 	loader: "vue-loader",
      // 	options: {
      // 		experimentalInlineMatchResource: true
      // 	}
      // },
      // {
      //   enforce: "pre",
      //   test: /\.css$/i,
      //   loader: "css-loader", /* ! fail */
      //   // loader: "builtin:lightningcss-loader", /* ! fail */
      //   type: "javascript/auto",
      // },
      {
        test: /\.(js|ts)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: "typescript",
                },
              },
              env: { targets },
            },
          },
        ],
      },
      {
        test: /\.svg/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }),
    new rspack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    vue(),
    // new VueLoaderPlugin() as RspackPluginFunction,
  ],
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
  experiments: {
  	css: true /* ! fail */
  }
});
