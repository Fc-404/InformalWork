<template>
  <div id="main">
    <div id="bar">
      <img id="bar-title" alt="title" src="../assets/title.png">
      <img id="bar-logo" alt="logo" src="../assets/logo.svg">
      <div id="bar-menu">
        <router-link to="/main">
          <div @click="barItemClick(0)" :class="[barItemSelected == 0 ? 'bar-item-selected' : '']" class="bar-item">
            首页
          </div>
        </router-link>
        <router-link to="/video">
          <div @click="barItemClick(1)" :class="[barItemSelected == 1 ? 'bar-item-selected' : '']" class="bar-item">
            视频
          </div>
        </router-link>
        <router-link to="/blog">
          <div @click="barItemClick(2)" :class="[barItemSelected == 2 ? 'bar-item-selected' : '']" class="bar-item">
            论坛
          </div>
        </router-link>
        <router-link to="/about">
          <div @click="barItemClick(3)" :class="[barItemSelected == 3 ? 'bar-item-selected' : '']" class="bar-item">
            关于
          </div>
        </router-link>
        <div id="bar-mask"></div>
      </div>
      <div id="login">{{ visitorName }}</div>
    </div>
    <router-view></router-view>
    <div id="footer">
      <div id="footer-info">
        <dl id="footer-link">
          <p>友情链接</p>
          <dt><a href="http://www.xijucn.com/html/">戏剧网</a></dt>
          <dt><a href="http://www.xi-qu.com/">中国戏曲网</a></dt>
          <dt><a href="http://www.jingju.com/">京剧艺术网</a></dt>
          <dt><a href="https://tv.cctv.com/cctv11/">CCTV 11戏曲频道</a></dt>
          <dt><a href=""></a></dt>
        </dl>
        <dl id="footer-about">
          <p>关注我们</p>
          <dt><a href="#">抖音</a></dt>
          <dt><a href="#">微博</a></dt>
          <dt><a href="#">微信公众号</a></dt>
        </dl>
        <div id="footer-qrcode">
          <img alt="qrcode" src="../assets/qrcode.png">
        </div>
      </div>
      <p id="footer-copyright">Copyright©2023 | 戏韵堂 | 陕ICP备xxxxxxxx号</p>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import Cookies from 'js-cookie'

  export default {
    name: 'Main',
    components: {
    },
    data() {
      return {
        barItemSelected: 0,
        visitorName: 'null',
      }
    },
    methods: {
      barItemClick: function (i) {
        this.barItemSelected = i
      }
    },
    mounted() {
      !(function (_this) {
        switch (_this.$route.fullPath) {
          case '/main':
            _this.barItemSelected = 0
            break
          case '/video':
            _this.barItemSelected = 1
            break
          case '/blog':
            _this.barItemSelected = 2
            break
          case '/about':
            _this.barItemSelected = 3
            break
        }
      }(this))
      /**
       * ! 设置 pc 端菜单栏动效
       */
      !(function (_this) {
        let currentItemLeft = 0
        let currentItemWidth = 0

        $(function (__this) {
          let str = '#bar-menu .bar-item:eq(' + __this.barItemSelected + ')'
          currentItemLeft = $(str).position().left
          currentItemWidth = $(str).outerWidth(true)
          $('#bar-mask').css('left', currentItemLeft)
            .css('width', currentItemWidth)
        }(_this))

        $('.bar-item').mouseenter(function () {
          $('#bar-mask').css('left', $(this).position().left)
            .css('width', $(this).outerWidth(true))
        })

        $('.bar-item').mouseleave(function () {
          $('#bar-mask').css('left', currentItemLeft)
            .css('width', currentItemWidth)
        })

        $('.bar-item').click(function () {
          currentItemLeft = $(this).position().left
          currentItemWidth = $(this).outerWidth(true)
        })
      }(this))

      /**
       * ! 设置导航栏自动隐藏
       */
      !(function () {
        let stat = 1
        window.addEventListener('mousewheel', (e) => {
          let offsetop = $(document).scrollTop()
          if (offsetop < $('#bar').outerHeight(true)) {
            $('#bar').css('background-image', 'none')
          } else {
            $('#bar').css('background-image', 'var(--primary)')
          }
          if (e.deltaY > 0 && stat) {
            $('#bar').css('top', 0 - $('#bar').outerHeight(true))
            stat = 0
          } else if (e.deltaY < 0 && !stat) {
            $('#bar').css('top', '0')
            stat = 1
          }
        })
      }())

      /**
       * ! 用户码
       */
      !(function (_this) {
        let name = Cookies.get('name')
        if (!name) {
          let newName = '游客-' + Date.now().toString().substring(1) + parseInt(Math.random() * 10)
          Cookies.set('name', newName, 3650)
          _this.visitorName = newName
        }
        else {
          _this.visitorName = name
        }
      }(this))
    },
  }
</script>

<style scoped>
  #main {
    min-height: 100vh;
    min-width: 1000px;
    width: calc(100vw - 6px);
    background-image: var(--primary);
    font-family: 'song';
  }

  #bar {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: calc(100% - 24px);
    padding: 12px;
    position: sticky;
    top: 0;
    transition: all .5s ease-in-out;
    z-index: 99999;
  }

  #bar-logo,
  #bar-title {
    height: 66px;
  }

  #bar-menu {
    position: relative;
    display: flex;
    justify-content: space-around;
    width: 50%;
    vertical-align: top;
  }

  #bar-mask {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 66px;
    height: 6px;
    background-color: var(--yellow-);
    transition: all .5s ease-in-out;
  }

  .bar-item {
    margin: auto 12px;
    height: 66px;
    line-height: 66px;
    font-size: 22px;
    font-weight: 900;
    font-family: 'zhuan';
    color: var(--black);
    user-select: none;
    transition: all .5s ease-in-out;
  }

  .bar-item-selected {
    color: var(--yellow-);
    transition: all .2s ease-in-out;
  }

  #login {
    color: var(--white);
    width: 20%;
    height: 66px;
    font-size: 20px;
    line-height: 66px;
    text-align: right;
  }

  #footer {
    padding: 50px 100px;
    width: calc(100% - 200px);
    min-height: 200px;
    background-color: var(--black);
  }

  #footer-info {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  #footer-info>dl {
    font-size: 18px;
    color: var(--white);
  }

  #footer-info>dl>dt {
    font-size: 16px;
    margin: 12px auto;
  }

  #footer-qrcode>img {
    height: 150px;
    background-color: var(--white);
  }

  #footer a {
    text-decoration: none;
    color: var(--blue-);
  }

  #footer a:checked {
    color: var(--blue-);
  }

  #footer-copyright {
    text-align: center;
    margin-top: 32px;
    color: var(--white);
  }
</style>