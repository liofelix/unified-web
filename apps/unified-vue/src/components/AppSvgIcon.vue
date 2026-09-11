<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'

import { isIconifyIconName, isRegisteredIconifyIconName } from '@/utils/iconify'

const props = withDefaults(
  defineProps<{
    name: string
    size?: number | string
    width?: number | string
    height?: number | string
    color?: string
  }>(),
  {
    size: '1em',
    color: 'currentColor',
  },
)

const isIconify = computed(() => isIconifyIconName(props.name))
const isRegisteredIconify = computed(() => isRegisteredIconifyIconName(props.name))
const symbolId = computed(() => `#icon-${props.name}`)
const toCssSize = (value: number | string) => (typeof value === 'number' ? `${value}px` : value)
const iconWidth = computed(() => toCssSize(props.width ?? props.size))
const iconHeight = computed(() => toCssSize(props.height ?? props.size))
</script>

<template>
  <iconify-icon
    v-if="isRegisteredIconify"
    class="app-svg-icon"
    :icon="name"
    :width="iconWidth"
    :height="iconHeight"
    :color="color"
    aria-hidden="true"
  />
  <svg
    v-else
    class="app-svg-icon"
    aria-hidden="true"
    focusable="false"
    :style="{ width: iconWidth, height: iconHeight, color }"
  >
    <use v-if="!isIconify" :href="symbolId" />
  </svg>
</template>

<style scoped>
.app-svg-icon {
  display: inline-block;
  flex-shrink: 0;
  fill: currentcolor;
  vertical-align: -0.125em;
}
</style>
