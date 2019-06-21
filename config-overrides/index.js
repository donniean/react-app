module.exports = {
  webpack: function(config, env) {
    console.log(JSON.stringify(config));
    console.log(env);
    return config;
  }
};
