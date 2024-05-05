import P5 from 'p5' // Package from npm

const createIncrementalP5Button = (p5Instance: P5, name: '+' | '-'): P5.Element => {
    const p5button = p5Instance.createButton(name)
    p5button.addClass('p5Button')
    p5button.style(`
        width: ${p5Instance.width * 0.8}px;
        height: ${p5Instance.height * 0.38}px;
    `)  

    switch (name) {
        case '+':
            p5button.position(p5Instance.width * 0.1, p5Instance.height * 0.1)
            break
        case '-':
            p5button.position(p5Instance.width * 0.1, p5Instance.height * 0.52)
            break
    }

    return p5button
}

export default createIncrementalP5Button
