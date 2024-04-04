import { ref, onMounted, onUnmounted } from 'vue'
import type { ScreenDimensions } from '../types'

const useScreenDimensions = (): ScreenDimensions => {
    const screenDimensions = ref<ScreenDimensions>({
        width: window.innerWidth,
        height: window.innerHeight
    })

    const update = () => {
        screenDimensions.value = { width: window.innerWidth, height: window.innerHeight }
    }

    onMounted(() => window.addEventListener('resize', update))
    onUnmounted(() => window.removeEventListener('resize', update))

    return screenDimensions.value
}

export { useScreenDimensions }
