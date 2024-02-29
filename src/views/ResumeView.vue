<script setup lang="ts">
import DownloadAssetButton from '../components/DownloadAssetButton.vue';
import cvURL from '../assets/scott_hitchcock_cv.pdf'

</script>

<template>
  <div class="p-6 md:py-10 drop-shadow-md">
    
      <img src="../assets/scott_hitchcock_cv-1.png">
      <img class="mt-2" src="../assets/scott_hitchcock_cv-2.png">
      <DownloadAssetButton
        :assetPath="cvURL"
        assetFileType="pdf"
        downloadName="Scott Hitchcock CV"
        />
      
  </div>

</template>
