import P5 from 'p5' // Package from npm
import type { emptyFunction } from '../types'

const createUpDownLeftOrRightP5Button = (
    p5Instance: P5,
    name: '+' | '-' | '<' | '>',
    event: emptyFunction
): P5.Element => {
    const p5button = p5Instance.createButton(name)
    p5button.addClass('p5Button')
    const minWidth = p5Instance.min(p5Instance.width, p5Instance.height) * 0.25

    switch (name) {
        case '+':
            p5button.style(`
        width: ${minWidth}px;
        height: ${minWidth}px;
    `)
            p5button.position(
                p5Instance.width / 2 - minWidth * 0.5,
                p5Instance.height / 2 - minWidth
            )
            break

        case '-':
            p5button.style(`
            width: ${minWidth}px;
            height: ${minWidth}px;
    `)
            p5button.position(p5Instance.width / 2 - minWidth * 0.5, p5Instance.height / 2)
            break

        case '<':
            p5button.style(`
            width: ${minWidth}px;
            height: ${minWidth*2}px;
    `)
            p5button.position(p5Instance.width / 2 - minWidth * 1.5, p5Instance.height / 2 - minWidth)

            break

        case '>':
            p5button.style(`
            width: ${minWidth}px;
            height: ${minWidth*2}px;
    `)
            p5button.position(p5Instance.width / 2 + minWidth * 0.5, p5Instance.height / 2 - minWidth)

            break
    }

    const handleEvent = () => {
        event()
        p5button.removeClass('fadeToNothing')
        setTimeout(function () {
            p5button.addClass('fadeToNothing')
        }, 10)
    }

    p5button.mousePressed(handleEvent)

    return p5button
}

export default createUpDownLeftOrRightP5Button
