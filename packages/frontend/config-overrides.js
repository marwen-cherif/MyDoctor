var path = require('path');

const { override, babelInclude, addBabelPlugins } = require('customize-cra');

module.exports = function (config, env) {
  return Object.assign(
    config,
    override(
      babelInclude([
        /* transpile (converting to es5) code in src/ and shared component library */
        path.resolve('src'),
        path.resolve('../common'),
      ]),
      ...addBabelPlugins([
        'formatjs',
        {
          idInterpolationPattern: '[sha512:contenthash:base64:6]',
          ast: true,
        },
      ]),
    )(config, env),
  );
};
