<template>
  <div id="home">
    <div style="height: 44px;" id="top"></div>
    <div id="home-cards">
      <div id="card-l1" class="jy-card"></div>
      <div id="card-l2" class="jy-card"></div>
      <div id="card-r1" class="jy-card"></div>
      <div id="card-r2" class="jy-card"></div>
    </div>
    <section id="home-one"></section>
    <section id="home-two">
      <hr class="hr-down">
      <hr class="hr-up">
      <div id="home-two-text">
        <span>京剧</span>
        <span>越剧</span>
        <span>黄梅戏</span>
        <span>评剧</span>
        <span>豫剧</span>
        <span>秦腔</span>
        <h1>中国戏曲</h1>
        <p>中国戏曲主要是由民间歌舞、说唱和滑稽戏三种不同艺术形式综合而成。
          它起源于原始歌舞，是一种历史悠久的综合舞台艺术样式。</p><br>
        <p>经过汉、唐到宋、金才形成比较完整的戏曲艺术，它由文学、音乐、舞蹈、美术、武术、杂技以及表演艺术综合而成，约有三百六十多个种类。
          它的特点是将众多艺术形式以一种标准聚合在一起，在共同具有的性质中体现其各自的个性。</p><br>
        <p> 中国的戏曲与希腊悲剧和喜剧、印度梵剧并称为世界三大古老的戏剧文化，经过长期的发展演变，
          逐步形成了以“京剧、越剧、黄梅戏、评剧、豫剧”五大戏曲剧种为核心的中华戏曲百花苑。</p><br>
      </div>
      <div style="width: 200px;"></div>
      <div id="home-two-medi">
        <video controls autoplay loop preload>
          <source src="../assets/video/home.mp4" type="video/mp4">
        </video>
      </div>
      <div id="home-two-hr"></div>
    </section>
    <section id="home-three">
      <hr class="hr-down">
      <hr class="hr-up">
      <div id="home-three-menu">
        <div @click="threeMenuC(0)">京剧<div :class="[threeMenuI == 0 ? 'threeSelected' : '']"></div>
        </div>
        <div @click="threeMenuC(1)">越剧<div :class="[threeMenuI == 1 ? 'threeSelected' : '']"></div>
        </div>
        <div @click="threeMenuC(2)">黄梅戏<div :class="[threeMenuI == 2 ? 'threeSelected' : '']"></div>
        </div>
        <div @click="threeMenuC(3)">评剧<div :class="[threeMenuI == 3 ? 'threeSelected' : '']"></div>
        </div>
        <div @click="threeMenuC(4)">豫剧<div :class="[threeMenuI == 4 ? 'threeSelected' : '']"></div>
        </div>
        <div @click="threeMenuC(5)">秦腔<div :class="[threeMenuI == 5 ? 'threeSelected' : '']"></div>
        </div>
      </div>
      <div id="home-three-body">
        <div id="home-three-body-box">
          <div id="home-three-body-jing"></div>
          <div id="home-three-body-yue"></div>
          <div id="home-three-body-huang"></div>
          <div id="home-three-body-ping"></div>
          <div id="home-three-body-yu"></div>
          <div id="home-three-body-qin"></div>
        </div>
      </div>
    </section>
    <section id="home-four">
      <hr class="hr-down">
      <hr class="hr-up">
      <p id="home-four-mask">京剧</p>
      <h1>我们做什么？</h1>
      <div id="home-four-body">
        <p>我们提供京剧<span>相关视频</span></p>
        <p>我们提供京剧<span>交流论坛</span></p>
        <p>我们提供京剧<span>历史背景</span></p>
      </div>
    </section>
    <section id="home-five">
      <hr class="hr-down">
      <div id="home-five-to">
        <h1>更多信息请点击</h1>
        <a @click="toAbout" href="#">关于</a>
      </div>
      <div style="width: 20%;"></div>
      <img id="home-five-ico" alt="info" src="../assets/info.svg">
    </section>
    <img id="bottom-bg" src="../assets/img/jy_full.png">
    <div id="home-totop" @click="toTop"></div>
  </div>
</template>
<script>
  import $ from 'jquery'

  export default {
    name: 'Name',
    data() {
      return {
        resetCards: null,
        threeMenuI: 0,
      }
    },
    components: {
    },
    methods: {
      toTop: function () {
        $('html,body').animate({ scrollTop: $('html').offset().top }, 1000)
        $('#home-totop').fadeOut()
        this.resetCards()
      },
      toAbout: function() {
        this.$router.push({
          name: 'About'
        })
      },
      threeMenuC: function (i) {
        $('#home-three-menu>div>div').css('width', '10%')
        this.threeMenuI = i
        $('#home-three-body-box').css('top', -(660 * i) + 'px')
      }
    },
    mounted() {
      /**
       * ! 纸片人移动
       */
      !(function (_this) {
        let domh = $('#home').height()
        let domw = $('#home').width()
        let cardsl = [$('#card-l1'), $('#card-l2')]
        let cardsr = [$('#card-r1'), $('#card-r2')]
        let cardsd = [0, -domw]
        let step = (domw * 2 / domh)

        let overturn = function (e) {
          e.css(
            'transform',
            e.css('transform') == 'none' ? 'rotateY(180deg)' : 'none'
          )
        }

        let d = false
        window.addEventListener('mousewheel', (e) => {
          if (d == (e.deltaY > 0 ? true : false)) {
            overturn(cardsl[0])
            overturn(cardsl[1])
            overturn(cardsr[0])
            overturn(cardsr[1])
            d = !d
          }
          cardsd[0] += (step * e.deltaY)
          cardsd[1] += (step * e.deltaY)
          // cardsd[0] += step
          // cardsd[1] += step
          cardsd[0] = cardsd[0] > 2 * domw ? 2 * domw : cardsd[0]
          cardsd[0] = cardsd[0] < 0 ? 0 : cardsd[0]
          cardsd[1] = cardsd[1] > domw ? domw : cardsd[1]
          cardsd[1] = cardsd[1] < 2 * -domw ? 2 * -domw : cardsd[1]
          cardsl[0].css('right', cardsd[0] + 'px')
          cardsl[1].css('right', cardsd[1] + 'px')
          cardsr[0].css('left', cardsd[0] + 'px')
          cardsr[1].css('left', cardsd[1] + 'px')
        })

        _this.resetCards = function () {
          let cardsd = [0, -domw]
          cardsl[0].css('right', cardsd[0] + 'px').css('transform', 'none')
          cardsl[1].css('right', cardsd[1] + 'px').css('transform', 'none')
          cardsr[0].css('left', cardsd[0] + 'px').css('transform', 'none')
          cardsr[1].css('left', cardsd[1] + 'px').css('transform', 'none')
        }
      }(this))

      /**
       * ! 顶部按钮
       */
      !(function () {
        window.addEventListener('mousewheel', () => {
          if ($(window).scrollTop() > $(window).height()) {
            $('#home-totop').fadeIn()
          } else {
            $('#home-totop').fadeOut()
          }
        })
      }())

      /**
       * ! Three 淡入
       */
      !(function () {
        $('#home-three-menu>div').mouseenter(function () {
          $(this).children('div').css('width', '100%')
        })
        $('#home-three-menu>div').mouseleave(function () {
          $(this).children('div').css('width', '10%')
        })
      }())
    },
  }
</script>
<style scoped>
  #home {
    position: relative;
  }

  section {
    min-height: 200px;
    /* overflow: hidden; */
    z-index: 99 !important;
  }

  .jy-card {
    height: 200px;
    width: 100px;
    background-repeat: no-repeat;
    background-size: cover;
    position: fixed;
    bottom: 0;
    z-index: 9 !important;
    transform: none;
    transition: all .4s ease-in-out;
  }

  #card-l1 {
    background-image: url('../assets/img/jyl1.png');
    right: 0;
  }

  #card-l2 {
    background-image: url('../assets/img/jyl2.png');
    right: -100px;
  }

  #card-r1 {
    background-image: url('../assets/img/jyr1.png');
    left: 0;
  }

  #card-r2 {
    background-image: url('../assets/img/jyr2.png');
    left: -100px;
  }

  #home-totop {
    display: none;
    width: 44px;
    height: 44px;
    position: fixed;
    bottom: 44px;
    right: 22px;
    background-color: var(--yellow-);
    z-index: 9999;
    box-shadow:
      2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
      6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
      12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
      22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
      41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
      100px 100px 80px rgba(0, 0, 0, 0.07);
    border-radius: 12px;
    background-image: url(../assets/up.svg);
    background-size: 30px;
    background-position: 7px;
    background-repeat: no-repeat;
  }

  #bottom-bg {
    width: 100%;
    filter: brightness(2);
    position: relative;
    bottom: 0;
  }

  .hr-up,
  .hr-down {
    background-image: url(../assets/wave.svg);
    height: 30%;
    width: 100%;
    border: none;
    z-index: -9 !important;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  
  .hr-down {
    top: 0 !important;
    transform: rotateX(180deg);
  }

  #home-one {
    width: 100%;
    min-height: calc(100vh - 100px);
    background-image: url('../assets/xitai.png');
    background-repeat: no-repeat;
    background-size: cover;
  }

  #home-two {
    padding: 200px 100px;
    display: flex;
    justify-content: center;
    position: relative;
  }

  #home-two-text {
    margin-left: 20px;
    flex: 2;
    position: relative;
  }

  #home-two-text>h1 {
    font-size: 44px;
    font-family: 'kai';
    text-align: right;
    margin-bottom: 24px;
    color: var(--red-);
  }

  #home-two-text>p {
    max-width: 330px;
    font-size: 20px;
    font-weight: 900;
    line-height: 32px;
    font-family: 'song';
    color: var(--yellow-);
    text-indent: 40px;
    float: right;
    position: relative;
    z-index: 99 !important;
  }

  #home-two-text>span {
    position: absolute;
    font-size: 32px;
    font-weight: 900;
    font-family: 'zhuan';
    color: var(--red-);
    z-index: 9 !important;
  }

  #home-two-text>span:nth-child(1) {
    left: 80vw;
    top: 20vh;
  }

  #home-two-text>span:nth-child(2) {
    left: 70vw;
    top: 30vh;
  }

  #home-two-text>span:nth-child(3) {
    left: 30vw;
    top: 40vh;
  }

  #home-two-text>span:nth-child(4) {
    left: 40vw;
    top: 50vh;
  }

  #home-two-text>span:nth-child(5) {
    left: 50vw;
    top: 60vh;
  }

  #home-two-text>span:nth-child(6) {
    left: 60vw;
    top: 70vh;
  }

  #home-two-medi {
    width: 300px;
    flex: 3;
  }

  #home-two-medi>video {
    width: 70%;
    margin-top: 100px;
    transition: all .2s ease-in-out;
    position: relative;
    z-index: 999 !important;
  }

  #home-two-medi>video:hover {
    width: 100%;
    transition: all .2s ease-in-out;
    transform: translateX(-30%);
  }

  #home-two-hr {
    position: absolute;
    right: 50px;
    bottom: -30px;
    height: 200px;
    width: 100px;
    background-image: url(../assets/img/jyh1.png);
    background-repeat: no-repeat;
    background-size: 100%;
    filter: invert(200%);
  }

  #home-three {
    display: flex;
    padding: 200px 100px;
    justify-content: space-around;
    z-index: 999 !important;
    position: relative;
  }

  #home-three-menu {
    max-width: 300px;
    z-index: 999 !important;
  }

  #home-three-menu>div {
    text-align: right;
    white-space: nowrap;
    padding: 44px 55px;
    user-select: none;
    font-size: 22px;
    font-weight: 900;
    height: 22px;
    line-height: 22px;
    color: var(--yellow-);
    font-family: 'zhuan';
    position: relative;
  }

  #home-three-menu>div>div {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 12px;
    width: 10%;
    background-color: var(--yellow-);
    transition: all .4s ease-in-out;
  }

  .threeSelected {
    width: 100% !important;
  }

  #home-three-body {
    width: 900px;
    padding: 22px;
    position: relative;
    height: 618px;
    overflow: hidden;
    z-index: 999 !important;
    border-bottom: 12px solid var(--yellow-);
  }

  #home-three-body-box {
    width: 100%;
    position: absolute;
    top: 0;
    transition: all .4s ease-in-out;
  }

  #home-three-body-box>div {
    height: 660px;
    overflow: hidden;
    width: 100%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  #home-three-hr {
    border: none;
    height: 44px;
    background-color: var(--yellow-);
    background-image: url(../assets/wave.svg);
    transform: rotateX(180deg);
  }

  #home-three-body-jing {
    background-image: url(../assets/img/jing.jpg);
  }

  #home-three-body-yue {
    background-image: url(../assets/img/yue.jpg);
  }

  #home-three-body-huang {
    background-image: url(../assets/img/huang.jpg);
  }

  #home-three-body-ping {
    background-image: url(../assets/img/ping.jpg);
  }

  #home-three-body-yu {
    background-image: url(../assets/img/yu.jpg);
  }

  #home-three-body-qin {
    background-image: url(../assets/img/qin.jpg);
  }

  #home-four {
    padding: 100px;
    width: calc(100% - 200px);
    min-height: 30vw;
    position: relative;
  }

  #home-four-mask {
    font-size: 30vw;
    line-height: 30vw;
    font-family: 'zhuan';
    font-weight: 900;
    color: var(--red-);
    position: absolute;
    user-select: none;
    z-index: -9;
  }

  #home-four>h1 {
    font-size: 10vw;
    font-family: 'kai';
    color: var(--white);
  }

  #home-four-body {
    width: 90%;
  }

  #home-four-body>p {
    font-size: 44px;
    font-weight: 900;
    font-family: 'kai';
    line-height: 128px;
    color: var(--green);
    text-align: right;
  }

  #home-four-body>p>span {
    font-size: 55px;
    font-weight: 900;
    font-family: 'zhuan';
    color: var(--green-);
  }

  #home-five {
    padding: 200px 100px;
    width: calc(100% - 200px);
    display: flex;
    justify-content: center;
    position: relative;
  }

  #home-five-ico {
    filter: brightness(.8);
  }

  #home-five-to>h1 {
    font-size: 44px;
    font-weight: 900;
    font-family: 'kai';
    padding: 44px 0;
    color: var(--orange-);
  }

  #home-five-to>a {
    font-size: 64px;
    font-family: 'zhuan';
    font-weight: 900;
    color: var(--yellow-);
  }

  #home-five-to>a:hover {
    color: var(--yellow);
  }
</style>