<script setup lang="ts">
import DownloadAssetButton from '../components/DownloadAssetButton.vue';
import cvURL from '../assets/scott_hitchcock_cv.pdf';
</script>

<template>
  <div class="flex flex-col items-center p-2 sm:py-6">
    <div class="flex flex-col gap-2 sm:w-1/2 sm:min-w-[600px] max-w-[700px]">
      <img src="../assets/scott_hitchcock_cv-1.png" class="mx-auto shadow-md">
      <img src="../assets/scott_hitchcock_cv-2.png" class="mx-auto shadow-md">
      <div class="text-end">
        <DownloadAssetButton
          :assetPath="cvURL"
          assetFileType="pdf"
          downloadName="Scott Hitchcock CV"
        />
      </div>
    </div>
  </div>
</template>
