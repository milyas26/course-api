module.exports = {
  apps : [{
    name: 'course-api',
    script: 'app.js',
    watch: '.',
    instances: "max",
    exec_mode: "cluster",
    env: {
      NODE_ENV: "production",
      PORT: 8001
    },
  }],
};
