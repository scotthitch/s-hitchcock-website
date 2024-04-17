<script setup lang="ts">
import PageIntro from '../../components/PageIntro.vue'
import ContactMeForm from './ContactMeForm.vue'

</script>

<template>
    <div class="overflow-scroll">
        <PageIntro pageName="Contact Me" />
        <div class="m-auto grid grid-cols-3">
            <div>Thank you for visiting</div>

            <ContactMeForm />
        </div>
    </div>
</template>
