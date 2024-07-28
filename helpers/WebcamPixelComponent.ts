class WebcamPixelComponent {
    videoElement: HTMLVideoElement;
    canvasElement: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D | null;
    onFrameCallback: (pixels: Uint8ClampedArray) => void;
    videoTrack: MediaStreamTrack | null;

    constructor(onFrameCallback: (pixels: Uint8ClampedArray) => void) {
        this.videoElement = document.createElement('video');
        this.canvasElement = document.createElement('canvas');
        this.canvasElement.style.display = 'none'; // Hide the canvas
        document.body.appendChild(this.canvasElement); // Append to the body to ensure it's part of the DOM
        this.canvasContext = this.canvasElement.getContext('2d');
        this.onFrameCallback = onFrameCallback;
        this.videoTrack = null;
    }

    async startWebcam() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 50 },
                    height: { ideal: 50 },
                    frameRate: { ideal: 1, max: 5 }
                },
                audio: false
            });

            this.videoTrack = stream.getVideoTracks()[0];
            this.videoElement.srcObject = stream;
            this.videoElement.play();

            // Wait for the video to start playing and set the canvas dimensions
            this.videoElement.onloadedmetadata = () => {
                this.canvasElement.width = this.videoElement.videoWidth;
                this.canvasElement.height = this.videoElement.videoHeight;
                this.processFrame();
            };
        } catch (error) {
            console.error('Error accessing webcam:', error);
        }
    }

    processFrame() {
        if (this.canvasContext === null) {
            console.log('No canvas context');
            return;
        }
        this.canvasContext.drawImage(this.videoElement, 0, 0, this.canvasElement.width, this.canvasElement.height);
        const imageData = this.canvasContext.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
        const pixels = imageData.data;

        // Call the callback with pixel data
        this.onFrameCallback(pixels);

        // Continue processing frames
        requestAnimationFrame(() => this.processFrame());
    }

    stopWebcam() {
        if (this.videoTrack) {
            this.videoTrack.stop();
        }
        if (this.videoElement) {
            this.videoElement.pause();
            this.videoElement.srcObject = null;
        }
    }
}

export default WebcamPixelComponent;
