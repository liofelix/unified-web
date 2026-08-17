<script setup lang="ts">
import { FileViewer } from '@file-viewer/vue3'
import type { FileViewerOptions } from '@file-viewer/vue3'
import '@file-viewer/vue3/dist/file-viewer3.css'

const SUPPORTED_FILE_EXTENSIONS = new Set(['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'])

type OfficeViewerStatus = 'empty' | 'invalid' | 'loading' | 'ready'

interface Props {
  file?: File
}

const props = defineProps<Props>()
const { t } = useI18n()
const status = shallowRef<OfficeViewerStatus>('empty')

const statusText = computed(() =>
  t(status.value === 'invalid' ? 'officeViewer.status.invalid' : 'officeViewer.status.empty'),
)

function getFileExtension(fileName: string) {
  const lastDotIndex = fileName.lastIndexOf('.')

  return lastDotIndex === -1 ? '' : fileName.slice(lastDotIndex + 1).toLowerCase()
}

function isSupportedFile(file: File) {
  return SUPPORTED_FILE_EXTENSIONS.has(getFileExtension(file.name))
}

const viewableFile = computed(() => {
  const file = props.file

  return file && isSupportedFile(file) ? file : undefined
})

watch(
  () => props.file,
  (file) => {
    if (!file) {
      status.value = 'empty'
      return
    }

    status.value = isSupportedFile(file) ? 'loading' : 'invalid'
  },
  { immediate: true },
)

function handleLoadStart() {
  status.value = 'loading'
}

function handleLoadComplete() {
  status.value = 'ready'
}

const viewerOptions: FileViewerOptions = {
  toolbar: {
    search: false,
    zoom: false,
    download: false,
    print: true,
    exportHtml: false,
    theme: false,
    permissions: {
      download: false,
      print: false,
      exportHtml: false,
    },
  },
  pdf: {
    navigation: true,
    defaultNavigationVisible: true,
    thumbnails: true,
    initialViewState: {
      scale: 1,
    },
  },
}
</script>

<template>
  <section class="app-office-viewer">
    <div class="app-office-viewer__preview">
      <file-viewer
        v-if="viewableFile"
        :key="`${viewableFile.name}-${viewableFile.lastModified}`"
        class="app-office-viewer__file-viewer"
        :file="viewableFile"
        :filename="viewableFile.name"
        :options="viewerOptions"
        @load-start="handleLoadStart"
        @load-complete="handleLoadComplete"
      />
      <div v-else class="app-office-viewer__empty" role="status">
        {{ statusText }}
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.app-office-viewer {
  width: 100%;

  &__preview {
    position: relative;
    height: clamp(480px, 70vh, 860px);
    min-height: 480px;
    overflow: hidden;
    background: #f8fafc;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
  }

  &__file-viewer {
    display: block;
    width: 100%;
    height: 100%;
  }

  &__empty {
    display: grid;
    height: 100%;
    padding: 24px;
    color: #6b7280;
    text-align: center;
    place-items: center;
  }
}

@media (max-width: 768px) {
  .app-office-viewer {
    &__preview {
      height: calc(100vh - 250px);
      min-height: 420px;
    }
  }
}
</style>
