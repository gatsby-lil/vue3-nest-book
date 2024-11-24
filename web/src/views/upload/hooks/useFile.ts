import { MAX_FILE_SIZE } from "@/constant/upload";

export default function useFile() {
    const {proxy} = getCurrentInstance()!
    const checkFile = (file:File) => {
        
         // 校验文件类型
         if(!file) {
            proxy?.$message('未选择任何文件');
            return;
        }
        const { size } = file;
        if(size > MAX_FILE_SIZE) {
            proxy?.$message({
                type: 'error',
                message: '文件上传不能大于1GB'
            });
            return;
        }
        return true;
    }
    return {
        checkFile
    }
}