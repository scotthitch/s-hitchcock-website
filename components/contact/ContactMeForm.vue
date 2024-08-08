<script setup lang="ts">
import InputWithLabel from './InputWithLabel.vue';
import TextAreaWithLabel from './TextAreaWithLabel.vue';
import Button from './Button.vue';

const HERO_TOFU_CONTACT_ME_URL = import.meta.env.VITE_HERO_TOFU_CONTACT_ME_URL;
</script>

<template>
    <div class="content-center p-6 sm:p-8 lg:p-16">
        <div class="text-4xl font-bold italic md:text-5xl">Thank you for visiting.</div>

        <div class="py-2 text-lg font-semibold sm:pb-8 sm:pt-6">
            Please fill out the form to get in touch with me
        </div>

        <form
            class="flex flex-col justify-between gap-4"
            :action="HERO_TOFU_CONTACT_ME_URL"
            method="post"
            id="contact-form"
            accept-charset="UTF-8"
        >
            <div>
                <InputWithLabel label="Name" placeholder="Enter your name" type="text" id="name" />
            </div>
            <div>
                <InputWithLabel
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    id="email"
                />
            </div>
            <div>
                <TextAreaWithLabel
                    label="Content"
                    placeholder="Leave me a message"
                    type="text"
                    id="content"
                />
            </div>
            <div>
                <Button class="mt-3" label="Send" type="submit" formId="contact-form" />
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
    </div>
</template>
