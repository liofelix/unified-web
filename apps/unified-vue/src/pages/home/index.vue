<script setup lang="ts">
const { t } = useI18n()
const fileInput = useTemplateRef<HTMLInputElement>('fileInput')
const selectedFile = shallowRef<File>()

function openFilePicker() {
  fileInput.value?.click()
}

function handleFileChange(event: Event) {
  const input = event.target

  if (!(input instanceof HTMLInputElement)) {
    return
  }

  const file = input.files?.item(0)
  input.value = ''

  if (!file) {
    return
  }

  selectedFile.value = file
}
</script>

<template>
  <div class="home">
    <header class="home__header">
      <AppLocaleSwitcher />
    </header>

    <main class="home__main">
      <section class="home__office-viewer" :aria-label="t('officeViewer.title')">
        <header class="home__office-viewer-header">
          <div>
            <h1 class="home__office-viewer-title">
              {{ t('officeViewer.title') }}
            </h1>
            <p class="home__office-viewer-description">
              {{ t('officeViewer.description') }}
            </p>
          </div>

          <div class="home__office-viewer-actions">
            <input
              ref="fileInput"
              class="home__office-viewer-input"
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
              :aria-label="t('officeViewer.selectFile')"
              @change="handleFileChange"
            />
            <a-button type="primary" @click="openFilePicker">
              {{ selectedFile ? t('officeViewer.replaceFile') : t('officeViewer.selectFile') }}
            </a-button>
          </div>
        </header>

        <AppOfficeViewer :file="selectedFile" />
      </section>
    </main>
  </div>
</template>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  padding: 24px;

  &__header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 24px;
  }

  &__main {
    width: 100%;
  }

  &__office-viewer {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
  }

  &__office-viewer-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
  }

  &__office-viewer-title {
    margin: 0;
    color: #1f2937;
    font-size: 24px;
    line-height: 1.3;
  }

  &__office-viewer-description {
    margin: 8px 0 0;
    color: #6b7280;
    font-size: 14px;
    line-height: 1.5;
  }

  &__office-viewer-actions {
    display: flex;
    flex-shrink: 0;
    align-items: center;
  }

  &__office-viewer-input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
}

@media (max-width: 768px) {
  .home {
    &__office-viewer-header {
      flex-direction: column;
      align-items: stretch;
    }

    &__office-viewer-actions {
      justify-content: flex-start;
    }
  }
}
</style>
