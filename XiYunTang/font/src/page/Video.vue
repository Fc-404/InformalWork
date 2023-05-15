<template>
  <div id="mvideo">
    <div id="box">
      <div id="show">
        <h2>{{ videoList.group[selectedG].list[selectedL] }}</h2>
        <video :src="videoSrc" controls autoplay loop preload>
        </video>
      </div>
      <div id="list">
        <p v-for="(it, i) in videoList.group[selectedG].list" :key="i" @click="selectL(i)"
          :class="[selectedL == i ? 'selected-l' : '']">{{ it }}</p>
      </div>
      <div id="group">
        <p v-for="(it, i) in videoList.group" :key="i" @click="selectG(i)"
          :class="[selectedG == i ? 'selected-g' : '']">{{ it.title }}</p>
      </div>
    </div>
    <p id="copyright">视频资源来源于互联网，仅供个人学习，无商业用途<br>如有侵权，请联系管理员删除</p>
  </div>
</template>
<script>
  export default {
    name: 'mvideo',
    data() {
      return {
        selectedG: 0,
        selectedL: 0,
        videoSrc: '',
        videoList: {
          path: '/video/',
          suffix: '.mp4',
          group: [
            {
              title: '京剧念白',
              list: [
                "你点我唱-第二期",
                "你点我念-第四期",
                "你点我念-第五期",
                "你点我念-第六期",
                "你点我念-第七期",
                "你点我念-第八期",
                "你点我念-第九期",
                "你点我念-第十期",
                "你点我念-第十一期",
                "你点我念-第十三期",
                "你点我念-第十四期",
                "你点我念-第十六期",
                "你点我念-第十八期",
                "你点我念-第十九期",
                "你点我念-第二十期",
                "你点我念-第二十二期",
                "你点我念-第二十四期",
                "你点我念-第二十八期",
                "你点我念-第二十九期",
                "你点我念-第三十期",
                "你点我念-第三十二期",
                "你点我念-第三十五期",
                "你点我念-第三十六期",
                "你点我念-第三十七期",
                "你点我念-第三十八期",
                "你点我念-第三十九期"
              ]
            },
            {
              title: '京剧发展',
              list: [
                '京剧的起源',
                '京剧的表演特征',
                '京剧中的武术与杂技',
                '京剧发展史',
                '京剧服装',
                '同光十三绝介绍',
                '传统艺术京剧的发展史',
                '京剧发展历程-英语版',
                '王佩瑜讲解京剧起源',
              ]
            },
            {
              title: '京剧派别',
              list: [
                '程派《三堂会审》',
                '程派《春闺梦》',
                '[典藏]京剧女起解表演梅兰芳(1)',
                '[典藏]京剧女起解表演梅兰芳(2)',
                '谭派韩胜存珠帘寨名段欣赏两段',
                '京剧尚派剧目集锦',
                '京剧荀派传人许翠一曲金玉奴选段经典荀派唱段别样好听',
                '著名京剧表演艺术家言派艺术第三代嫡传人言兴朋曹操与杨修',
                '余派-文邵关'
              ]
            },
            {
              title: '京剧行当',
              list: [
                '丑角绝活京剧时迁偷鸡片段石晓亮',
                '丑角名家徐梦柯京剧游街选段数板念白摇板',
                '旦《穆桂英挂帅》',
                '旦《断桥》',
                '净《铡美案》',
                '常听的京剧选段(净角篇)',
                '常听的京剧选段(净角篇)(1)',
                '常听的京剧选段(净角篇)(2)',
                '生《潞安州》',
              ]
            },
          ]
        }
      }
    },
    methods: {
      selectG: function (i) {
        this.selectedG = i
        this.selectedL = 0
        this.formSrc(0)
      },
      selectL: function (i) {
        this.selectedL = i
        this.formSrc(i)
      },
      formSrc: function (i) {
        this.videoSrc = this.videoList.path + this.videoList.group[this.selectedG].list[i] + this.videoList.suffix
      }
    },
    mounted() {
      this.formSrc(0)
    },
  }
</script>
<style scoped>
  #mvideo {
    width: 100%;
  }

  #box {
    margin: 10vh auto;
    display: flex;
    justify-content: center;
  }

  #show {
    position: relative;
    width: 50vw;
    height: 30vw;
    background-color: red;
  }

  #show>h2 {
    font-size: 24px;
    line-height: 36px;
    height: 30px;
    padding: 6px;
    position: absolute;
    top: -42px;
    left: 0;
    color: var(--red-);
    background-color: var(--black-);
    border-radius: 6px 6px 0 0;
  }

  #show>video {
    width: 100%;
    height: 100%;
    background-color: black;
  }

  #list {
    height: calc(30vw - 24px);
    width: 176px;
    padding: 12px;
    background: var(--black-);
    overflow: auto;
  }

  #list>p {
    font-size: 15px;
    font-family: 'song';
    text-align: right;
    padding: 6px 12px;
    user-select: none;
    overflow: hidden;
    color: var(--white-);
  }

  #list>p:hover {
    background-color: var(--black);
  }

  #group {
    height: 30vw;
    width: 40px;
    background: var(--black);
    overflow: auto;
  }

  #group>p {
    font-size: 20px;
    line-height: 32px;
    font-family: 'kai';
    color: var(--white-);
    writing-mode: vertical-lr;
    user-select: none;
    padding: 12px 1px 16px 1px;
  }

  #group>p:hover {
    color: var(--yellow-);
  }

  .selected-g {
    background: var(--black-);
    color: var(--yellow-) !important;
  }

  .selected-l {
    background: var(--black);
    color: var(--yellow-) !important;
  }

  #copyright {
    text-align: center;
    margin-bottom: 100px;
    background-color: var(--yellow-);
    color: var(--red-);
    font-weight: 900;
    padding: 12px;
  }
</style>