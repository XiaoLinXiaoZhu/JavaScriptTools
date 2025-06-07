// 重新提交更改
///@ts-ignore
import { exec, execSync } from 'child_process';

const reCommit = () => {
    // 使用异步exec方法在独立进程中执行git命令
    console.log('📎 正在添加 dist/ 文件到暂存区...');
    exec('git add dist/*.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`执行出错: ${error}`);
            return;
        }
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
        
        console.log('📎 dist/ 文件已添加到暂存区');
        
        // 获取上一次提交信息
        exec('git log -1 --pretty=%B', (error, commitMsg, stderr) => {
            if (error) {
                console.error(`获取提交信息出错: ${error}`);
                return;
            }
            
            // 之前的方法太复杂且容易出错，改用最简单的方式：
            // 我们直接调用带命令标签的git命令，将不会触发pre-commit钩子
            const amendCommand = `git commit --amend --no-verify -m "${commitMsg.trim()} [skip-hook]"`;
            console.log('🔁 正在将构建产物加入提交...');
            
            exec(amendCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error(`提交出错: ${error}`);
                    return;
                }
                if (stdout) console.log(stdout);
                if (stderr) console.error(stderr);
                
                console.log('🔁 构建产物已加入提交');
            });
        });
    });
}

reCommit();