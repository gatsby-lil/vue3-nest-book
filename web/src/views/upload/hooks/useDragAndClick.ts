import { MAX_FILE_SIZE } from '@/constant/upload'

export default function useDrag(refElement: Ref, isShowDrawer:Ref) {
  const { proxy } = getCurrentInstance()!

  const selectFile = ref<any>(null)
  const filePrview = ref<any>(null)

  const checkFile = (file: File | null) => {
    // 校验文件类型
    if (!file) {
      proxy?.$message('未选择任何文件')
      return
    }
    const { size } = file
    if (size > MAX_FILE_SIZE) {
      proxy?.$message({
        type: 'error',
        message: '文件上传不能大于1GB',
      })
      return
    }
    // 校验文件大小
    selectFile.value = file
  }

  const handleDrag = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // 获取文件对象
    const files = e.dataTransfer?.files || []
    checkFile(files[0])
  }

  const handleClick = () => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.style.display = 'none'
    fileInput.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement
      checkFile(target?.files?.[0] as File)
    })
    document.body.appendChild(fileInput)
    fileInput.click()
  }

  const initEvent = () => {
    const divElement = refElement.value
    if (divElement) {
      // 拖拽上传事件绑定
      divElement.addEventListener('dragenter', handleDrag)
      divElement.addEventListener('dragover', handleDrag)
      divElement.addEventListener('drop', handleDrop)
      divElement.addEventListener('dragleave', handleDrag)
      // 点击上传事件绑定
      divElement.addEventListener('click', handleClick)
    }
  }

  const clearEvent = () => {
    const divElement = refElement.value
    if (divElement) {
      divElement.removeEventListener('dragenter', handleDrag)
      divElement.removeEventListener('dragover', handleDrag)
      divElement.removeEventListener('drop', handleDrop)
      divElement.removeEventListener('dragleave', handleDrag)
    }
  }

  // todo: 扩展预览部分需要
  watch(selectFile, () => {
    if (!selectFile.value) {
      return
    }
    const url = URL.createObjectURL(selectFile.value)
    filePrview.value = {
      url,
      type: selectFile.value.type,
    }
  })

  watch(isShowDrawer, () => {
    if(isShowDrawer.value) {
      nextTick(initEvent)
    } else {
      clearEvent()
    }
  })

  return {
    filePrview,
    selectFile,
  }
}
