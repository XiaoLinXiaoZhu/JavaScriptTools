// 重新提交更改
///@ts-ignore
import { exec, execSync } from 'child_process';
// echo "📎 正在添加 dist/ 文件到暂存区..."
// git add dist/*.js

// echo "🔁 正在将构建产物加入提交..."
// SKIP_HOOK=1 git commit --amend -m "$(git log -1 --pretty=%B) [skip-hook]"

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
            
            // 添加[skip-hook]标记并重新提交
            // 在Windows上，使用set命令设置环境变量，只对当前命令有效
            const amendCommand = `powershell -Command "$env:SKIP_HOOK='1'; git commit --amend -m \\"${commitMsg.trim()} [skip-hook]\\""}`;
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