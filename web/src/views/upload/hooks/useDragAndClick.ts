import { MAX_FILE_SIZE, ACCEPT_FILE, MAX_FILE_NUM } from '@/constant'
import { generateUniqueId } from '@/utils'
import { IFileWithFileId } from '@/types'

/**
 * todo: 后续再完成拖拽上传
 */
export default function useDrag(refElement: Ref, isShowDrawer: Ref) {
  const { proxy } = getCurrentInstance()!

  const selectFileList = ref<IFileWithFileId[]>([])

  const checkFile = (files: File[] | null) => {
    // 校验文件类型
    if (!files) {
      proxy?.$message({
        type: 'error',
        message: '未选择任何文件',
      })
      return
    }
    // 校验文件大小
    const totalSize = files.reduce((value: number, nextFile: File) => value + nextFile.size, 0)
    if (totalSize > MAX_FILE_SIZE) {
      proxy?.$message({
        type: 'error',
        message: '文件上传不能大于1GB',
      })
      return
    }
    // 校验上传的文件数量, 每次上传最多不能超过10个
    const originLength = selectFileList.value.length
    if(originLength + files.length > MAX_FILE_NUM) {
      proxy?.$message({
        type: 'error',
        message: '每次上传的文件个数不能超过10个',
      })
      return
    }

    // 对新加进的文件补充唯一标识
    const mapFileList = files.map((file) => {
      return {
        file,
        fileId: generateUniqueId(),
      }
    })
    selectFileList.value.push(...mapFileList)
  }

  const handleClick = () => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.style.display = 'none'
    fileInput.multiple = true
    fileInput.accept = ACCEPT_FILE
    fileInput.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement
      if (target?.files) {
        checkFile(Array.from(target?.files))
      }
    })
    document.body.appendChild(fileInput)
    fileInput.click()
  }

  const initEvent = () => {
    const divElement = refElement.value
    if (divElement) {
      // 点击上传事件绑定
      divElement.addEventListener('click', handleClick)
    }
  }

  const clearEvent = () => {
    const divElement = refElement.value
    if (divElement) {
      divElement.removeEventListener('click', handleClick)
    }
  }

  watch(isShowDrawer, () => {
    if (isShowDrawer.value) {
      nextTick(initEvent)
    } else {
      clearEvent()
    }
  })

  return {
    selectFileList,
  }
}
