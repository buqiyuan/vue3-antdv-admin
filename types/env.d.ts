/**
 * @description 环境变量类型声明
 */
declare namespace NodeJS {
  interface Process {
    env: {
      ENV: 'development' | 'production';

      /** 网站前缀 */
      BASE_URL: string;

      /** API请求路径 */
      VUE_APP_BASE_API: string;
      /** socket路径 */
      VUE_APP_BASE_SOCKET_PATH: string;
      /** socket命名空间 */
      VUE_APP_BASE_SOCKET_NSP: string;

      /** mock api请求路径 */
      VUE_APP_MOCK_API: string;
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
    };
  }
}
