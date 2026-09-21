module.exports = {
  apps: [
    {
      name: 'baytfix',
      script: 'node_modules/.bin/next',
      args: 'start -p 3000',
      cwd: '/var/www/baytfix',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_file: '/var/www/baytfix/.env',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: '/var/log/pm2/baytfix-error.log',
      out_file: '/var/log/pm2/baytfix-out.log',
      merge_logs: true,
    },
  ],
};
