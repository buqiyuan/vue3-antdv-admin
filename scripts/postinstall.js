import { promisify } from 'node:util';
import { exec } from 'node:child_process';

// TODO 此脚本用于临时解决：https://github.com/pnpm/pnpm/issues/6088

const execAsync = promisify(exec);

const executeCommand = async (cmd) => {
  try {
    const { stdout, stderr } = await execAsync(cmd);
    console.log('标准输出：', stdout);
    stderr && console.error('标准错误：', stderr);
  } catch (error) {
    console.error('执行命令时出错：', error);
  }
};

if (process.env.POSTINSTALL_EXECUTED === 'true') {
  // console.log('执行过了');
} else {
  // console.log('首次执行');
  process.env.POSTINSTALL_EXECUTED = 'true';

  await executeCommand('pnpm nx:build');
  await executeCommand('pnpm install');
}
