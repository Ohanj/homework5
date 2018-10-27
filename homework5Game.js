const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const backgroundImage = new Image();
backgroundImage.src = 'http://aua.am/wp-content/uploads/2012/02/IMAG0648.jpg';

const me = new Image();
me.src = 'https://static1.fjcdn.com/thumbnails/comments/There+was+an+attempt+_2920236a3bc973de27a119933a63920f.png';

const f = new Image();
f.src = 'http://origin.lcv.org/wp-content/uploads/2018/01/f-grade.png';

const rand = function(num) {
  return Math.floor(Math.random() * num) + 1;
};



const floor = canvas.height-120;
const maxJump = floor-100;
const meSoon = {
    image: me,
    x: 10,
    y: floor,
    width: 100,
    height: 100,
    xDelta: 15,
    yDelta: 0,

    draw: function() {
      context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
    },
    update: function() {
        if (this.yDelta !== 0) {
            this.y = this.y - this.yDelta;
            if (this.y < maxJump) {
              this.yDelta = -this.yDelta;
            } else if (this.y >= floor) {
              this.y = floor,
              this.yDelta = 0;
            }
        }

    }
};

const badGuys = [];

const createPoints = function(count, canvasWidth, canvasHeight) {
  if (count === 0) {
    return badGuys;
  }

  const points = {
    image: f,
    x: rand(canvasWidth-250),
    y: rand(canvasHeight-50),
    width: 50,
    height: 50,
    xDelta: 1,
    yDelta: 1,
    draw: function() {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);

    },
    update: function() {
      this.x += this.xDelta;
      this.y += this.yDelta;
      if(this.x >= canvas.width-this.width || this.x <= 0) {
        this.xDelta = -this.xDelta;
      }
      if(this.y >= canvas.height-this.height || this.y <= 0) {
        this.yDelta = -this.yDelta;
      }
      if (meSoon.yDelta < 0 && meSoon.y === this.y + this.height && meSoon.x + meSoon.width >= this.x && this.x + this.width >= meSoon.x) {
        alert('Game Over');
      }
      if (meSoon.yDelta > 0 && meSoon.y + meSoon.height === this.y && meSoon.x + meSoon.width >= this.x && this.x + this.width >= meSoon.x) {
        alert('Game OVer');
      }
      if (meSoon.yDelta === 0 && meSoon.y + meSoon.height >= this.y && meSoon.y <= this.y + this.height && meSoon.x + meSoon.width >= this.x && this.x + this.width >= meSoon.x) {
        alert('Game Over');
      }

    }
  };

  badGuys[badGuys.length] = points;
  createPoints(count-1, canvasWidth, canvasHeight);
};

createPoints(10, canvas.width, canvas.height);





const loop = function() {

  meSoon.draw();
  meSoon.update();
  const help = function(arr, index) {
    if(index === 0) {
      return;
    }
    arr[index].draw();
    arr[index].update();

    help(arr, index-1)
  };

  help(badGuys, badGuys.length-1);

  requestAnimationFrame(loop);
};

loop();

const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;

document.addEventListener('keydown', function(event) {
	if(event.keyCode === rightKey) {
    meSoon.x = meSoon.x + meSoon.xDelta;
    if (meSoon.x >= canvas.width) {
      meSoon.x = -meSoon.width;
    }
  } else if (event.keyCode === leftKey) {
    meSoon.x = meSoon.x - meSoon.xDelta;
    if (meSoon.x <= -meSoon.width) {
      meSoon.x = canvas.width;
    }
  } else if (event.keyCode === upKey) {
    if (meSoon.yDelta === 0) {
      meSoon.yDelta = 5;
    }
  }
}, false);
