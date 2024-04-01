<script setup lang="ts"></script>

<template>
    <div class="fade-in">
        <div
            class="w-100svw pt-6 sm:pt-12 text-black text-center text-6xl sm:text-7xl font-bold slide-from-right"
        >
            Scott Hitchcock
        </div>
        <div
            class="w-100svw pt-2 text-gray-700 text-center text-xl sm:text-2xl font-bold italic slide-from-left"
        >
            Mechatronics Engineer
        </div>

        <div
            class="w-100svw pt-2 text-gray-700 text-center text-xl sm:text-2xl font-bold italic slide-from-left"
        >
            Welcome to my home page
        </div>
    </div>
</template>

<style>
.fade-in {
    animation: fadeIn 0.8s forwards;
}

.slide-from-right {
    animation: slideFromRight 0.5s forwards;
}

.slide-from-left {
    animation: slideFromLeft 0.5s forwards;
}

@keyframes slideFromLeft {
    from {
        transform: translateX(-40px);
    }
    to {
        transform: translateX(0px);
    }
}

@keyframes slideFromRight {
    from {
        transform: translateX(40px);
    }
    to {
        transform: translateX(0px);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
