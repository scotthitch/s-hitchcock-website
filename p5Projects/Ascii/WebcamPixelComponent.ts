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
        this.videoElement.playsInline = true
        this.videoElement.muted = true
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
        this.startupPromise = new Promise<void>((resolve) => {
            this.startupResolve = resolve
        })

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: this.videoConstraints,
                audio: false
            })

            this.videoTrack = stream.getVideoTracks()[0]
            this.videoElement.srcObject = stream
            await this.videoElement.play() // putting await here causes nothing to load

            // Once playing, set canvas dimensions and begin processing
            this.canvasElement.width = this.videoElement.videoWidth
            this.canvasElement.height = this.videoElement.videoHeight
            this.processFrame()
        } catch (error) {
            console.error('Error accessing webcam:', error)

            throw error // Rethrow the error to be handled by the caller
        }
        if (this.startupResolve) {
            this.startupResolve()
        }
    }

    processFrame() {
        // console.log(`processing id: ${this.instanceId}`)

        // could be better to delete the cavnas context, canvas el and video el instead of having isrunnning bool
        if (this.canvasContext === null) {
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

        // Ensure that startup has completed before stopping the webcam
        if (this.startupPromise) {
            await this.startupPromise
        }
        // await this.startupPromise
        if (this.videoTrack) {
            this.videoTrack.enabled = false
            this.videoTrack.stop()
        }
        if (this.videoElement) {
            this.videoElement.pause()
            this.videoElement.srcObject = null
            this.videoElement.remove()
        }
        this.canvasContext = null
        this.canvasElement.remove()
    }
}

export default WebcamPixelComponent
