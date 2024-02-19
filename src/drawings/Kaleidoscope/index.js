let inc;
let prevTheta;
let prevmagM;
let flag = 0;
let magM;
let theta;
let isDrawing = 1;
const hMin = 180;
const hMax = 260;
const sat = 90;
let light = 70;
let ranOff = 20;
let hAvg = ((hMin + hMax) / 2);
let hDif = ((hMin - hMax) / 2);
const reflections = 4;

const script = p5 =>
{
    // These are your typical setup() and draw() methods
    p5.setup = () =>
    {
      p5.createCanvas(400, 400);
      p5.colorMode(p5.HSL);
      p5.background(0);


    };
    p5.draw = () =>
    {
      p5.translate(p5.width, p5.height);
      let xPos = p5.mouseX - p5.width;
      let yPos = p5.mouseY - p5.height;
      inc = 2 * Math.PI / reflections;

      if (!flag) {
        prevTheta = cartesian2Polar(xPos);
        prevmagM = calcMag(xPos, yPos);
      } else {
        prevmagM = magM;
        prevTheta = theta;
      }
      flag++;
      
      if (p5.mouseX != 0 && p5.mouseY != 0)
      {
        // stroke(255);
        p5.strokeWeight(magM / 15 + 2);

        magM = calcMag(xPos, yPos);
        theta = cartesian2Polar(xPos, yPos);
        // stk = hAvg + hDif * cos(theta + ranOff);

        if (isDrawing) 
        {
            for (let i = 0; i < 2 * Math.PI; i += inc) 
            {
                let stk = hAvg + hDif * p5.cos(i + ranOff);
                p5.stroke(stk, sat, light)
                p5.line(magM * p5.cos(theta + i), magM * p5.sin(theta + i), prevmagM * p5.cos(prevTheta + i), prevmagM * p5.sin(prevTheta + i));

            }
        }

        }

    }; 
    function calcMag(x, y) {
        magM = Math.sqrt(x * x + y * y)
        return magM
    }
    
    function cartesian2Polar(x, y) {
        theta = Math.atan2(y, x)
        return theta
    }   
}



export default script