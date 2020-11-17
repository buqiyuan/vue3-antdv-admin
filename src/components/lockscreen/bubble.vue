<template>
  <canvas id="myCanvas" width="100vw" height="100vh"></canvas>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue'

export default defineComponent({
  name: "bubble",
  setup() {

    onMounted(() => {
        CanvasRenderingContext2D.prototype.draw = function (x, y, radius) {
          this.beginPath();
          this.arc(x, y, radius, 0, Math.PI * 2, false);
          this.closePath();
          this.fill();
        }

        class MathUtil extends Object {
          constructor() {
            super();
          }

          BezierEllipse2(ctx, x, y, a, b) {
            const k = .5522848,
                ox = a * k, // 水平控制点偏移量
                oy = b * k; // 垂直控制点偏移量

            ctx.beginPath();
            //左端点开始,顺时针
            ctx.moveTo(x - a, y);
            ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
            ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
            ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
            ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
            ctx.fill();
          }

          distance(obj, tag) {
            const dx = Math.pow(obj.x - tag.x, 2);
            const dy = Math.pow(obj.y - tag.y, 2);
            const d = Math.pow(obj.radius + tag.radius, 2);
            return dx + dy - d;
          }

          generateUUID() {
            const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
            const uuid = new Array(36);
            let rnd = 0,
                r;
            return function generateUUID() {
              for (let i = 0; i < 36; i++) {
                if (i === 8 || i === 13 || i === 18 || i === 23) {
                  uuid[i] = '-';
                } else if (i === 14) {
                  uuid[i] = '4';
                } else {
                  if (rnd <= 0x02)
                    rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                  r = rnd & 0xf;
                  rnd = rnd >> 4;
                  uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];

                }

              }

              return uuid.join('');

            }
            ();

          }

        }

        class Color {
          constructor() {
            this.mode = "HSLA";
            this.hue = Math.floor(Math.random() * 354) + 1;
            this.saturation = Math.floor(50 + Math.random() * 50) + "%";
            this.lightness = Math.floor(30 + Math.random() * 20) + "%";
            this.alpha = "1";
          }

          get instance() {
            return "hsla(" + this.hue + "," + this.saturation + "," + this.lightness + "," + this.alpha + ")";
          }

          update() {
            this.hue += .2
          }
        }

        //global varibles
        const $ = {
          canvas: document.getElementById("myCanvas"),

          context: document.getElementById("myCanvas").getContext("2d"),

          Math: new MathUtil(),

          config: {
            number: 10,
            speed: 10,
            lose: .8,
            size: 100
          }
        }

        $.Math.impactDetection = (obj) => {
          const borderTop = 0,
              borderLeft = 0,
              borderRight = $.canvas.width,
              borderBottom = $.canvas.height;
          const reduce = -$.config.lose

          for (let i = 0; i < $.asteroids.length; i++) {
            const tag = $.asteroids[i];
            if (tag.name == obj.name)
              continue;
            const dx = Math.pow(obj.x - tag.x, 2);
            const dy = Math.pow(obj.y - tag.y, 2);
            const d = Math.pow(obj.radius + tag.radius, 2);
            if ($.Math.distance(obj, tag) <= 0.1) {
              obj.vX = obj.vX * reduce;
              obj.vY = obj.vY * reduce;
              if (obj.x - tag.x > 0) {
                obj.x = Math.abs(Math.sqrt(d - dy) + tag.x) + 2;
              } else {
                obj.x = tag.x - Math.abs(Math.sqrt(d - dy)) - 2;
              }

              tag.vX = tag.vX * reduce;
              tag.vY = tag.vY * reduce;
            }
          }

          //============================================
          //上下
          const totop = (obj.y - obj.radius),
              tobottom = (obj.y + obj.radius);
          if (totop < borderTop) {
            obj.y = obj.radius;
            obj.vY = obj.vY * reduce;
          } else if (tobottom > borderBottom) {
            obj.y = borderBottom - obj.radius;
            obj.vY = obj.vY * reduce;
          }
          //左右
          const toleft = (obj.x - obj.radius),
              toright = (obj.x + obj.radius);
          if (toleft < borderLeft) {
            obj.x = obj.radius;
            obj.vX = obj.vX * reduce;
          } else if (toright > borderRight) {
            obj.x = borderRight - obj.radius;
            obj.vX = obj.vX * reduce;
          }

        }
        $.bubble = class {
          constructor(x, y, radius, vX, vY) {
            this.name = $.Math.generateUUID();
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.vX = vX;
            this.vY = vY;
            this.color = new Color();
          }
        }
        $.draw = function (x, y, r, context, color) {
          //内部椭圆
          let grident = context.createRadialGradient(x, y - 15, r, x, y, r / 2 + 10);
          grident.addColorStop(0, "rgba(197,197,197,.15)");
          grident.addColorStop(1, "rgba(214,211,231,0)");
          context.fillStyle = grident;
          $.Math.BezierEllipse2(context, x, y - 35, r - 30, r - 40);

          //外切球体
          context.save();
          grident = context.createRadialGradient(x, y, r, x, y, r - 30);
          grident.addColorStop(0, color.instance);
          //此颜色和背景颜色相同
          grident.addColorStop(1, "rgba(4,78,140,0)");
          context.fillStyle = grident;
          context.strokeStyle = "#ffffff"
          context.shadowBlur = 0;
          context.shadowOffsetX = 0;
          context.shadowOffsetY = 0;
          context.shadowColor = "#f79be7";
          context.globalCompositeOperation = "destination-over";
          context.draw(x, y, r - 5)
          context.restore();

          //小光圈
          context.save();
          context.shadowBlur = 20; //模糊的距离
          context.shadowOffsetX = 0; //x轴偏移量
          context.shadowOffsetY = 0; //y轴偏移量
          context.shadowColor = "#ffffff"; // 阴影颜色
          context.fillStyle = "rgba(222,222,222,.9)"
          context.globalCompositeOperation = "source-over"
          context.transform(1, 0, 0, 1, x - 40, y - 50)
          context.rotate(-Math.PI / 4)
          $.Math.BezierEllipse2(context, 0, 0, 20, 7)
          context.restore()
        }
        $.loop = function () {
          $.clear.call();
          const asteroidsLength = $.asteroids.length;
          for (let i = 0; i < asteroidsLength; i++) {
            const tmpAsteroid = $.asteroids[i];
            tmpAsteroid.x += tmpAsteroid.vX;
            tmpAsteroid.y += tmpAsteroid.vY;

            tmpAsteroid.color.update();
            $.draw(tmpAsteroid.x, tmpAsteroid.y, tmpAsteroid.radius, $.context, tmpAsteroid.color)

            $.Math.impactDetection(tmpAsteroid)

          }
          requestAnimationFrame($.loop);

        }
        $.init = function (param) {
          $.resize.call($, null).configure(param);
          $.asteroids = [];
          for (let i = 0; i < $.config.number; i++) {
            const radius = $.config.size
            const x = Math.random() * ($.canvas.width - 2 * radius) + radius;
            const y = Math.random() * ($.canvas.height - 2 * radius) + radius;
            const vX = (Math.random() * 2 - 1) * $.config.speed;
            const vY = (Math.random() * 2 - 1) * $.config.speed;

            $.asteroids.push(new $.bubble(x, y, radius, vX, vY));

            $.loop.call()
          }
        }
        $.clear = function () {
          $.context.clearRect(0, 0, $.canvas.width, $.canvas.height);
        }
        $.resize = function () {
          $.canvas.width = window.innerWidth;
          $.canvas.height = window.innerHeight;
          return this
        }
        $.configure = function (...para) {
          return (function () {
            $.config = Object.assign($.config, para[0]);
          })()

        }

        window.onresize = $.resize
        window.$ = $;

      $.init({
        number: 5, //球个数
        speed: 3,	//初始速度
        lose: .8,	//能量损失
        size: 100	//球半径(不可用)
      })
    })

    return {}
  }
})
</script>

<style lang="scss" scoped>
#myCanvas {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
