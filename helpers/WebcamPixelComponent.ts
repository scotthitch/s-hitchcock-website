class WebcamPixelComponent {
    videoTrack: MediaStreamTrack | null
    imageCapture: ImageCapture | null
    canvasElement: HTMLCanvasElement
    canvasContext: CanvasRenderingContext2D | null
    onFrameCallback: (pixels: Uint8ClampedArray) => void
    // imageCapture: null |
    // this.imageCapture: ImageCapture;
    constructor(onFrameCallback: (pixels: Uint8ClampedArray) => void) {
        this.canvasElement = document.createElement('canvas')
        this.canvasContext = this.canvasElement.getContext('2d')
        this.onFrameCallback = onFrameCallback
        // this.imageCapture: imageCap
        this.videoTrack = null
        this.imageCapture = null
    }

    async startWebcam() {
        try {
            console.log('sje')
            const stream = await navigator.mediaDevices.getUserMedia({ video: {width: 80, height: 80} })
            this.videoTrack = stream.getVideoTracks()[0]
            this.imageCapture = new ImageCapture(this.videoTrack)
            console.log(this.imageCapture)
            // Set canvas dimensions to match video
            const frame = await this.imageCapture.grabFrame()
            this.canvasElement.width = frame.width
            this.canvasElement.height = frame.height

            // Start processing frames
            this.processFrame()
        } catch (error) {
            console.error('Error accessing webcam:', error)
        }
    }

    async processFrame() {
        if (this.canvasContext === null) {
            console.log('no canvas context')
            return
        }
        try {
            const frame = await this.imageCapture.grabFrame()
            this.canvasContext.drawImage(
                frame,
                0,
                0,
                this.canvasElement.width,
                this.canvasElement.height
            )
            const imageData = this.canvasContext.getImageData(
                0,
                0,
                this.canvasElement.width,
                this.canvasElement.height
            )
            const pixels = imageData.data

            // Call the callback with pixel data
            // console.log(pixels)
            this.onFrameCallback(pixels)

            // Continue processing frames
            requestAnimationFrame(() => this.processFrame())
        } catch (error) {
            console.error('Error capturing frame:', error)
        }
    }

    stopWebcam() {
        if (this.videoTrack) {
            this.videoTrack.stop()
        }
    }
}
export default WebcamPixelComponent
