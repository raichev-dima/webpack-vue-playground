import path from "path";
import webpack from "webpack";
import { VueLoaderPlugin } from "vue-loader-v16";
import { exec } from "child_process";
import packageJson from "../package.json";

exec("rm -rf dist", (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});

webpack(
  {
    // eslint-disable-next-line no-constant-condition
    mode: true ? "production" : "development",
    // eslint-disable-next-line no-constant-condition
    devtool: true ? "source-map" : "eval-cheap-module-source-map",
    entry: path.resolve(__dirname, "/src/main.js"),
    output: {
      path: path.resolve(__dirname, "../dist"),
      filename: "[name].webpack-library.js",
      library: packageJson.name,
      libraryTarget: "umd",
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
      new VueLoaderPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader-v16",
          options: {
            loaders: {
              scss: "vue-style-loader!css-loader!sass-loader",
            },
            // other vue-loader options go here
          },
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
        "@": path.resolve(__dirname, "/src/"),
      },
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all",
          },
        },
      },
    },
    externals: {
      vue: {
        commonjs: "vue",
        commonjs2: "vue",
        amd: "vue",
        root: "Vue",
      },
    },
  },
  (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(
      stats?.toString({
        chunks: false,
        colors: true,
      })
    );
  }
);
