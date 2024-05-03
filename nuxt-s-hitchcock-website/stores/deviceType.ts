import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDeviceTypeStore = defineStore('deviceType', () => {
    const deviceType = ref(navigator.userAgent)

    const isMobileOrTablet = computed(
        () => navigator.maxTouchPoints > 0 && !/Windows/i.test(deviceType.value)
    )

    const isDeviceAppleTouchScreen = computed(() => /iPad|iPhone|iPod/.test(deviceType.value))

    const interactionEvent: 'touchend' | 'click' = isDeviceAppleTouchScreen.value
        ? 'touchend'
        : 'click'

    return { deviceType, isDeviceAppleTouchScreen, interactionEvent, isMobileOrTablet }
})
