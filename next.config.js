module.exports = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.glsl$/,
      loader: "webpack-glsl-loader",
    });

    return config;
  },
};
