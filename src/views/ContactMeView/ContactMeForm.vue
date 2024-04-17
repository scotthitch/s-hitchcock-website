<script setup lang="ts">
const HERO_TOFU_CONTACT_ME_URL = import.meta.env.VITE_HERO_TOFU_CONTACT_ME_URL
</script>

<template>
    <form
        class="my-32"
        :action="HERO_TOFU_CONTACT_ME_URL"
        method="post"
        id="contact-form"
        accept-charset="UTF-8"
    >
    
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
            <button type="submit" form="contact-form" value="Submit">Submit</button>

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
