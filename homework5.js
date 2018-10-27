const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const rand = function(num) {
  return Math.floor(Math.random() * num) + 1;
};

const colorArray = ['#6BFF33', '#409C1D', '#32713F', '#143E1C', '#000000'];
const arrayPoints = [];

const createPoints = function(count, canvasWidth, canvasHeight) {
  if (count === 0) {
    return arrayPoints;
  }

  const points = {
    x: rand(canvasWidth-20),
    y: rand(canvasHeight-20),
    width: 20,
    height: 20,
    xDelta: 4,
    yDelta: 4,
    color: colorArray[rand(colorArray.length)],
    draw: function() {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);

    },
    update: function() {


      this.x += this.xDelta;
      this.y += this.yDelta;
      if(this.x >= canvas.width-this.width || this.x <= 0) {
        this.xDelta = -this.xDelta;
        this.color = colorArray[rand(colorArray.length)];
      }
      if(this.y >= canvas.height-this.height || this.y <= 0) {
        this.yDelta = -this.yDelta;
        this.color = colorArray[rand(colorArray.length)];
      }
    }

  };

  arrayPoints[arrayPoints.length] = points;
  createPoints(count-1, canvasWidth, canvasHeight);
};

createPoints(300, canvas.width, canvas.height);




const loop = function() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  const help = function(arr, index) {
    if(index === 0) {
      return;
    }

    arr[index].draw();

    arr[index].update();

    help(arr, index-1)
  };

  help(arrayPoints, arrayPoints.length-1);
  requestAnimationFrame(loop);
};

loop();
