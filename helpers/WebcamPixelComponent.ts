// const classPrint = (toPrint: string) => {
//     console.log(toPrint)
// }
class WebcamPixelComponent {
    static count = 0
    instanceId: number
    videoConstraints: MediaTrackConstraints
    videoElement: HTMLVideoElement
    canvasElement: HTMLCanvasElement
    canvasContext: CanvasRenderingContext2D | null
    onFrameCallback: (pixels: Uint8ClampedArray) => void
    videoTrack: MediaStreamTrack | null
    startupPromise: Promise<void> | null
    startupResolve: (() => void) | null

    constructor(
        onFrameCallback: (pixels: Uint8ClampedArray) => void,
        videoConstraints: MediaTrackConstraints
    ) {
        this.instanceId = WebcamPixelComponent.count++
        this.videoConstraints = videoConstraints
        this.videoElement = document.createElement('video')
        this.canvasElement = document.createElement('canvas')
        this.canvasElement.style.display = 'none' // Hide the canvas
        document.body.appendChild(this.canvasElement) // Append to the body to ensure it's part of the DOM
        this.canvasContext = this.canvasElement.getContext('2d', { willReadFrequently: true })
        this.onFrameCallback = onFrameCallback
        this.videoTrack = null
        this.startupPromise = null
        this.startupResolve = null
    }

    async startWebcam() {
        console.log(`beginning start id: ${this.instanceId}`)
        this.startupPromise = new Promise<void>((resolve) => {
            this.startupResolve = resolve
        })
        console.log('just made', this.startupPromise, 'id: ', this.instanceId)

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: this.videoConstraints,
                audio: false
            })

            this.videoTrack = stream.getVideoTracks()[0]
            this.videoElement.srcObject = stream
            await this.videoElement.play() // putting await here causes nothing to load
            // console.log(start)
            console.log('played id:', this.instanceId)

            // Wait for the video to start playing and set the canvas dimensions
            // this.videoElement.onloadedmetadata = () => {
            this.canvasElement.width = this.videoElement.videoWidth
            this.canvasElement.height = this.videoElement.videoHeight
            this.processFrame()
            // }

            // console.log(`done start id: ${this.instanceId}`)
        } catch (error) {
            console.log(`error start id: ${this.instanceId}`)
            console.error('Error accessing webcam:', error)

            throw error // Rethrow the error to be handled by the caller
        }
        if (this.startupResolve) {
            this.startupResolve()
        }
        console.log(`done start id: ${this.instanceId}`)
    }

    processFrame() {
        console.log(`id: ${this.instanceId}`)

        // could be better to delete the cavnas context, canvas el and video el instead of having isrunnning bool
        if (this.canvasContext === null) {
            console.log('No canvas context')
            return
        }

        // Draw the video element frame onto the canvas
        this.canvasContext.drawImage(
            this.videoElement,
            0,
            0,
            this.canvasElement.width,
            this.canvasElement.height
        )

        // Retrieve the image data that you just drew
        const imageData = this.canvasContext.getImageData(
            0,
            0,
            this.canvasElement.width,
            this.canvasElement.height
        )

        // Retireve the pixel array from the image data
        const pixels = imageData.data

        // Call the callback with pixel data
        this.onFrameCallback(pixels)

        // Continue processing frames
        requestAnimationFrame(() => this.processFrame())
    }

    async stopWebcam() {
        // console.log(this)
        console.log(`beginning stop id: ${this.instanceId}`)

        // Ensure that startup has completed before stopping the webcam
        if (this.startupPromise) {
            console.log('awaint id: ', this.instanceId)
            console.log(this.startupPromise, 'id: ', this.instanceId)
            await this.startupPromise
            console.log(this.startupPromise, 'id: ', this.instanceId)
        }
        // await this.startupPromise
        if (this.videoTrack) {
            console.log('remove this.videoTrack id: ', this.instanceId)
            this.videoTrack.enabled = false
            this.videoTrack.stop()
        }
        if (this.videoElement) {
            console.log('remove this.videoElement id: ', this.instanceId)
            this.videoElement.pause()
            this.videoElement.srcObject = null
            this.videoElement.remove()
        }
        this.canvasContext = null
        this.canvasElement.remove()
        console.log(`done stop id: ${this.instanceId}`)
    }
}

export default WebcamPixelComponent
