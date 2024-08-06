const deviceType = navigator.userAgent

export const isMobileOrTablet = navigator.maxTouchPoints > 0 && !/Windows/i.test(deviceType)

export const isDeviceAppleTouchScreen = /iPad|iPhone|iPod/.test(deviceType)

export const interactionEvent: 'touchend' | 'click' = isDeviceAppleTouchScreen
    ? 'touchend'
    : 'click'

export const isPortrait = screen.availHeight > screen.availWidth
