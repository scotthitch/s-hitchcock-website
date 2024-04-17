<script setup lang="ts">

import PageIntro from '../../components/PageIntro.vue'

const HERO_TOFU_CONTACT_ME_URL = import.meta.env.VITE_HERO_TOFU_CONTACT_ME_URL
</script>

<template>
    <PageIntro pageName="Contact Me" />

    <form :action="HERO_TOFU_CONTACT_ME_URL" method="post" accept-charset="UTF-8">
        <div>
            <label for="name">Your Name</label>
            <input name="Name" id="name" type="text" required />
        </div>
        <div>
            <label for="email">Your Email</label>
            <input name="Email" id="email" type="email" required />
        </div>
        <div>
            <label for="content">Content</label>
            <input name="Content" id="content" type="text" required />
        </div>
        <div>
            <input type="submit" value="Download CTA" />
            <div
                style="
                    text-indent: -99999px;
                    white-space: nowrap;
                    overflow: hidden;
                    position: absolute;
                "
                aria-hidden="true"
            >
                <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" />
            </div>
        </div>
    </form>
</template>
