
export default function useDrag(refElement: Ref) {
    const {proxy} = getCurrentInstance()!

    const selectFile = ref<any>(null);
    const filePrview = ref<any>(null);

    const checkFile = (file:File) => {
        // 校验文件类型
        if(!file) {
            proxy?.$message('未选择任何文件');
            return;
        }

        // 校验文件大小
        selectFile.value = file
    }
    
    const handleDrag = (e:DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDrop = (e:DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // 获取文件对象
        const files = e.dataTransfer?.files || []
        console.log(files, 'files');
        checkFile(files[0]);
    }


    onMounted(() => {
        const divElement = refElement.value
        if(divElement) {
            divElement.addEventListener('dragenter',handleDrag);
            divElement.addEventListener('dragover',handleDrag);
            divElement.addEventListener('drop',handleDrop);
            divElement.addEventListener('dragleave',handleDrag);
        } 
    })

   onUnmounted(() => {
        const divElement = refElement.value
        if(divElement) {
            divElement.removeEventListener('dragenter',handleDrag);
            divElement.removeEventListener('dragover',handleDrag);
            divElement.removeEventListener('drop',handleDrop);
            divElement.removeEventListener('dragleave',handleDrag);
        }
   })

   watch(selectFile, () => {
        if(!selectFile.value) {
            return;
        }
        const url = URL.createObjectURL(selectFile.value);
        filePrview.value = {
            url,
            type: selectFile.value.type
        }
   })

   return {
    filePrview,
    selectFile
   }
}