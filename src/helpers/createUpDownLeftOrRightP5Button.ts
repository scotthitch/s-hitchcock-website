import P5 from 'p5' // Package from npm
import type { emptyFunction } from '../types'

const createUpDownLeftOrRightP5Button = (
    p5Instance: P5,
    name: '+' | '-' | '<' | '>',
    event: emptyFunction
): P5.Element => {
    const p5button = p5Instance.createButton(name)
    p5button.addClass('p5Button')

    switch (name) {
        case '+':
            p5button.style(`
        width: ${p5Instance.width * 0.25}px;
        height: ${p5Instance.width * 0.25}px;
    `)
            p5button.position(
                p5Instance.width * 0.375,
                p5Instance.height / 2 - p5Instance.width * 0.25
            )
            break

        case '-':
            p5button.style(`
        width: ${p5Instance.width * 0.25}px;
        height: ${p5Instance.width * 0.25}px;
    `)
            p5button.position(p5Instance.width * 0.375, p5Instance.height / 2)
            break

        case '<':
            p5button.style(`
        width: ${p5Instance.width * 0.25}px;
        height: ${p5Instance.width * 0.5}px;
    `)
            p5button.position(
                p5Instance.width * 0.125,
                p5Instance.height / 2 - p5Instance.width * 0.25
            )

            break

        case '>':
            p5button.style(`
        width: ${p5Instance.width * 0.25}px;
        height: ${p5Instance.width * 0.5}px;
    `)
            p5button.position(
                p5Instance.width * 0.625,
                p5Instance.height / 2 - p5Instance.width * 0.25
            )

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
