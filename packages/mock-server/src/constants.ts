export const mockServerEvent = {
  add: 'mockServer:add-mock-file',
  update: 'mockServer:update-mock-file',
  remove: 'mockServer:remove-mock-file',
  clientReady: 'mockServer:client-ready',
} as const;

export const extensions = ['ts', 'js', 'mjs', 'cjs', 'cts', 'mts'];

export const DEFAULT_MOCK_DIR = 'mocks';
