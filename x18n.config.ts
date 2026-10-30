import { defineConfig } from "@x18n/cli";

// Detected presets: vue-i18n. They apply automatically.
export default defineConfig({
  sourceLocale: "en-US",
  resources: [
    {
      pattern: "apps/unified-vue/src/locales/messages/{locale}.{ext}",
    },
  ],
});
