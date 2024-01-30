import { generateService } from '@umijs/openapi';
import type { RequestOptions } from './src/utils/request';

const re = /controller[-_ .](\w)/gi;

// swagger-typescript-api
generateService({
  schemaPath: 'http://127.0.0.1:7001/api-docs-json',
  serversPath: './src/api/backend',
  requestOptionsType: 'RequestOptions',
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
      // 提取出 data 的类型
      const regex = /API\.ResOp & { 'data'\?: (.+); }/;
      return type.replace(regex, '$1');
    },
    customOptionsDefaultValue(data): RequestOptions {
      const { summary } = data;

      if (summary?.startsWith('创建') || summary?.startsWith('新增')) {
        return { successMsg: '创建成功' };
      } else if (summary?.startsWith('更新')) {
        return { successMsg: '更新成功' };
      } else if (summary?.startsWith('删除')) {
        return { successMsg: '删除成功' };
      }

      return {};
    },
  },
});
