import { generateService } from '@umijs/openapi';

const re = /controller[-_ .](\w)/gi;

// swagger-typescript-api
generateService({
  schemaPath: 'http://127.0.0.1:5001/api-docs-json',
  // schemaPath: 'https://petstore.swagger.io/v2/swagger.json',
  serversPath: './src/api/test',
  // 自定义网络请求函数路径
  requestImportStatement: 'import { request, type RequestOptions } from "@/utils/request";',
  hook: {
    // @ts-ignore
    customFunctionName(operationObject, apiPath) {
      const { operationId } = operationObject;

      if (!operationId) {
        console.warn('[Warning] no operationId', apiPath);
        return;
      }

      const funcName = operationId.replace(re, (_all, letter) => letter.toUpperCase());

      operationObject.operationId = funcName;

      return funcName;
    },
    // @ts-ignore
    customFileNames(operationObject, apiPath) {
      const { operationId } = operationObject;

      if (!operationId) {
        console.warn('[Warning] no operationId', apiPath);
        return;
      }
      const controllerName = operationId.split(re)[0];
      const moduleName = operationObject.tags?.[0].split(' - ')[0];

      if (moduleName === controllerName) {
        return [controllerName];
      } else if (moduleName && moduleName !== controllerName) {
        return [`${moduleName}_${controllerName}`];
      }
      return;
    },
    customType(schemaObject, namespace, defaultGetType) {
      const type = defaultGetType(schemaObject, namespace);
      const regex = /API\.ResOp & { 'data'\?: (.+); }/;
      return type.replace(regex, '$1');
    },
  },
});
