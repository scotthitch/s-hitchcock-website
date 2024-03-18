const isMobile = (): boolean => {
    return navigator.maxTouchPoints > 0 && !/Windows/i.test(navigator.userAgent);
}

export default isMobile