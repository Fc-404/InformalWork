<template>
  <div id="blog">
    <div id="edit" @click="isEditing = true" :class="[isEditing ? 'editing' : '']">
      <div id="edit-icon"></div>
      <p>编辑</p>
      <div id="edit-panel" v-show="isEditing">
        <textarea id="edit-panel-title" v-model="editTitle" maxlength="20" placeholder="标题" wrap="off"></textarea>
        <textarea id="edit-panel-edit" v-model="editBody" maxlength="1000" placeholder="发表你的看法吧..."></textarea>
        <div id="edit-panel-func">
          <button @click.stop="isEditing = false">关闭</button>
          <button id="edit-panel-func-send" @click.stop="pushBlog">发表</button>
        </div>
      </div>
    </div>
    <div id="show">
      <div v-for="(it, i) in data.list" :key="i" class="card">
        <div v-if="it.auther == username" class="iremove" @click="rmBlog(it._id)">
          <img src="../assets/remove.svg">
        </div>
        <div class="ititle" :class="[data.have ? '' : 'loading']">
          {{ it.title }}
        </div>
        <div class="itime">
          {{ it.time }}
        </div>
        <div class="iauther">
          {{ it.auther }}
        </div>
        <div></div><br>
        <hr style="border: 1px solid var(--white-)">
        <div class="ibody" :class="[data.have ? '' : 'loading']">
          {{ it.body }}
        </div>
        <div @click="replyShow(i)" class="ireply">
          <img src="../assets/reply.svg">
          <span>评论</span>
          <input class="ireply-count" :value="it.reply ? it.reply.length : ''" disabled>
        </div>
        <div @click="like(i)" class="ilike">
          <img :class="[data.list[i].isLike ? '' : 'delike' ]" src="../assets/like.svg" style="user-select: none;">
          <span>
            {{ it.like }}
          </span>
        </div>
      </div>
      <div id="reply" v-if="data.have">
        <div id="reply-title">
          <div id="reply-close" @click="replyHide">关闭</div>
          {{ data.list[curBlog].title }}
        </div>
        <p id="reply-tip" v-if="!data.list[curBlog].reply.length">
          没有评论哦，请发一条善意的评论鼓励一下叭...</p>
        <div class="reply-item" v-for="(it, i) in data.list[curBlog].reply" :key="i">
          <p class="reply-auther">
            {{ it.auther }}
          </p>
          <span class="reply-time">
            {{ it.time }}
          </span>
          <div></div><br>
          <p class="reply-body" v-html="it.body">
          </p>
          <hr style="border: 1px solid var(--white-); margin-top: 24px;">
        </div>
        <div id="reply-func">
          <div style="height: 6px;"></div>
          <div id="reply-edit" contenteditable="true"></div>
          <button @click="reply(curBlog)">发表</button>
        </div>
      </div>
    </div>
    <div style="height: 100px;"></div>
  </div>
</template>
<script>
  import $ from 'jquery'
  import Cookies from 'js-cookie'

  export default {
    name: 'Blog',
    data() {
      return {
        isEditing: false,
        editTitle: '',
        editBody: '',
        curBlog: 0,
        data: {
          have: false,
          count: 6,
          list: [
            {}, {}, {}, {}, {}, {},
          ],
        },
        username: '',
        // baseurl: 'http://localhost:3000/',
        baseurl: 'http://192.168.22.222:3000/',
      }
    },
    methods: {
      replyShow: function (i) {
        this.curBlog = i
        $('#reply').slideDown()
      },
      replyHide: function () {
        $('#reply').slideUp()
      },
      /**
       * API
       */
      pushBlog: function () {
        let _this = this
        let data = {
          title: this.editTitle,
          body: this.editBody,
          auther: this.username.toString()
        }
        $.ajax({
          url: this.baseurl + 'pushblog',
          type: 'post',
          data: data,
          beforeSend: function () {
            // $('#edit-panel-func-send').prop('disabled', 'true')
            if (data.title.length < 3) {
              alert('标题不少于三个字')
              return false
            }
            if (data.body.length < 15) {
              alert('正文不少于15个字')
              return false
            }
            if (!data.auther.length) {
              alert('无游客用户，请刷新')
              return false
            }
          },
          error: function () {
            alert('上传文章失败，请联系管理员')
          },
          success: function (m) {
            if (m.code === 0) {
              // TODO
              _this.data.list.unshift({
                _id: m.id,
                auther: data.auther,
                body: data.body,
                title: data.title,
                like: 0,
                reply: [],
                time: _this.getTime()
              })
              // _this.getBlog()
              _this.isEditing = false
              _this.editTitle = ''
              _this.editBody = ''
            } else {
              alert('上传文章失败，请检查格式')
            }
          }
        })
      },
      getBlog: function () {
        let _this = this
        $.ajax({
          url: this.baseurl + 'getblogs',
          success: function (m) {
            if (m.code === 0) {
              _this.data.list = m.list
              _this.data.count = m.list.length
              if (m.list.length == 0) {
                _this.data.list.push({
                  _id: null,
                  auther: '戏韵堂',
                  body: '还没有人发表文章哦\n点击编辑即可发表文章\n所有人都可以看到你的文章\n同时还可以评论互动',
                  title: '提示',
                  like: 0,
                  reply: [],
                  time: _this.getTime()
                })
                _this.data.count = 1
              }
              _this.data.have = true
            } else {
              alert('获取文章失败，请稍后再试')
            }
          },
          error: function () {
            alert('获取文章失败，请联系管理员')
          }
        })
      },
      rmBlog: function (id) {
        let _this = this
        let data = {
          auther: this.username,
          id: id,
        }

        $.ajax({
          url: this.baseurl + 'rmblog',
          data: data,
          success: function(m) {
            if(m.code === 0) {
              _this.data.list.shift()
            } else {
              alert('不能删除别人的文章')
            }
          }
        })
      },
      reply: function (i) {
        let _this = this
        let data = {
          id: this.data.list[i]._id,
          auther: this.username,
          body: $('#reply-edit').html()
        }

        $.ajax({
          url: this.baseurl + 'reply',
          data: data,
          beforeSend: function () {
            if (data.body.length < 5) {
              alert('不少于5个字符')
              return false
            }
          },
          success: function (m) {
            if (m.code === 0) {
              // TODO
              _this.data.list[i].reply.push({
                auther: data.auther,
                time: _this.getTime(),
                body: data.body
              })
              // _this.getBlog()
              $('#reply-edit').html('')
            } else {
              alert('评论失败')
            }
          },
          error: function () {
            alert('评论失败')
          }
        })
      },
      like: function (i) {
        let _this = this
        let data = {
          id: this.data.list[i]._id
        }

        $.ajax({
          url: this.baseurl + 'like',
          data: data,
          success: function (m) {
            _this.data.list[i].like++
            if (m.code === 0) {
              _this.data.list[i].isLike = true
            }
          }
        })

      },
      reloadCardLayout: function () {
        let sumHeight = 624
        $('.card').toArray().forEach(element => {
          sumHeight += $(element).outerHeight(true)
        })

        let culumn = parseInt($('#show').width() / 900)
        $('#show').css('height', sumHeight / culumn)
      },
      getTime: function () {
        let time = new Date()
        return time.getFullYear() + '-' +
          time.getMonth() + '-' +
          time.getDate() + ' ' +
          time.getHours() + ':' +
          time.getMinutes() + ':' +
          time.getSeconds() + ' 星期' +
          ['日', '一', '二', '三', '四', '五', '六'][time.getDay()]
      },
      getReplyC: function (e, i) {
        console.log(e);
      }
    },
    mounted() {
      this.username = Cookies.get('name')
      setTimeout(this.getBlog, 500)
      this.reloadCardLayout()
    },
    updated() {
      this.reloadCardLayout()
    },
  }
</script>
<style scoped>
  .loading {
    border-radius: 6px;
    background-color: #e5e5e5;
    overflow: hidden;
  }

  .loading::after {
    content: '';
    display: block;
    width: 100px;
    height: 100%;
    background-color: #f5f5f5;
    box-shadow: 0 0 64px 64px #f5f5f5;
    transform: skewX(-30deg);
    animation: bright 1s linear infinite;
  }

  @keyframes bright {
    from {
      margin-left: -100px;
    }

    to {
      margin-left: calc(100% + 100px);
    }
  }

  #blog {
    padding: 50px;
  }

  #edit {
    height: 40px;
    width: 95px;
    border-radius: 12px;
    background: var(--white);
    padding: 1px;
    float: right;
    user-select: none;
    transition: all .18s ease-in-out;
    overflow: hidden;
    box-shadow:
      2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
      6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
      12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
      22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
      41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
      100px 100px 80px rgba(0, 0, 0, 0.07);
    z-index: 9999;
    position: sticky;
    top: 100px;
  }

  #edit:hover {
    background: var(--yellow-);
  }

  #edit-icon {
    height: 24px;
    width: 24px;
    margin: 8px;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url(../assets/edit.svg);
    display: inline-block;
  }

  #edit>p {
    display: inline-block;
    font-size: 22px;
    font-weight: 900;
    font-family: 'song';
    line-height: 42px;
    color: var(--red-);
    vertical-align: top;
  }

  .editing {
    width: 400px !important;
    height: 50vh !important;
    max-height: 800px !important;
  }

  .editing:hover {
    background-color: var(--white) !important;
  }

  #edit-panel {
    height: calc(100% - 50px);
    width: calc(100% - 12px);
    padding: 0 6px;
    position: relative;
    /* background-color: red; */
    transition: all .2s ease-in-out;
  }

  #edit-panel-title {
    position: absolute;
    padding: 6px;
    height: 20px;
    width: 200px;
    border: 3px solid var(--red-);
    border-right: 2px solid var(--red-);
    font-size: 18px;
    outline: none;
    resize: none;
    right: 6px;
    top: -20px;
    overflow: hidden;
    text-align: right;
  }

  #edit-panel-edit {
    padding: 6px;
    padding-top: 20px;
    height: calc(100% - 66px);
    width: calc(100% - 16px);
    border: 2px solid var(--red-);
    resize: none;
    outline: none;
    font-size: 14px;
    line-height: 20px;
    white-space: pre;
    /* background-color: blue; */
  }

  #edit-panel-func {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  #edit-panel-func>button {
    height: 30px;
    width: 50%;
    border: none;
    font-size: 20px;
    transition: all .2s ease-in-out;
  }

  #edit-panel-func>button:nth-child(1) {
    color: var(--red);
  }

  #edit-panel-func>button:nth-child(1):hover {
    background-color: var(--red);
    color: var(--white);
  }

  #edit-panel-func>button:nth-child(2) {
    color: var(--green);
  }

  #edit-panel-func>button:nth-child(2):hover {
    background-color: var(--green);
    color: var(--white);
  }

  #show {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    height: 1734px;
  }

  .card {
    width: 576px;
    /* height: 300px; */
    margin: 12px;
    transition: all .4s ease-in-out;
    /* max-height: 600px; */
    border-radius: 6px;
    overflow: hidden;
    background-color: var(--white);
    color: var(--purple);
    position: relative;
  }

  .carding:nth-child(odd) {
    height: 600px;
  }

  .card>div {
    width: 100%;
    height: 10px;
  }

  .iremove {
    display: block;
    width: 24px !important;
    height: 24px !important;
    position: absolute;
    right: 12px;
    top: 12px;
    z-index: 99;
    border-radius: 6px;
    transition: all .2s ease-in-out;
  }
  .iremove>img {
    width: 20px;
    height: 20px;
    margin: 2px;
    user-select: none;
    transition: all .2s ease-in-out;
  }

  .iremove:hover {
    background-color: var(--red-);
  }

  .iremove>img:hover {
    filter: brightness(2.5);
  }

  .ititle {
    width: calc(100% - 50px) !important;
    height: 30px !important;
    margin: 12px;
    padding-right: 26px;
    font-size: 20px;
    font-weight: 900;
    line-height: 30px;
    border-radius: 3px;
    font-family: 'kai';
    opacity: .9;
  }

  .itime {
    width: auto !important;
    height: 20px !important;
    margin: 0 12px;
    font-size: 14px;
    line-height: 20px;
    float: left;
    color: var(--black);
    font-family: 'kai';
    opacity: .6;
  }

  .iauther {
    width: auto !important;
    height: 20px !important;
    margin: 0 12px;
    font-size: 14px;
    line-height: 20px;
    float: right;
    color: var(--black);
    font-family: 'kai';
    opacity: .6;
  }

  .ibody {
    width: calc(100% - 24px) !important;
    height: auto !important;
    min-height: 66px;
    margin-top: 12px;
    margin: 12px;
    display: block;
    font-size: 18px;
    white-space: pre-wrap;
    font-size: 16px;
    line-height: 24px;
  }

  .ireply {
    height: 32px !important;
    width: 88px !important;
    padding: 6px;
    float: left;
    transition: all .2s ease-in-out;
    color: var(--purple-);
    position: relative;
  }

  .ireply:hover {
    background-color: var(--yellow-);
    color: var(--black);
  }

  .ireply>img {
    width: 33px;
  }

  .ireply>span {
    font-size: 20px;
    font-weight: 900;
    line-height: 35px;
    text-align: center;
    user-select: none;
    margin-left: 6px;
    vertical-align: top;
  }

  .ireply-count {
    font-size: 12px !important;
    position: absolute;
    bottom: 10px;
    left: calc(100% + 12px);
    border: none;
    opacity: .6;

  }

  .ilike {
    height: 32px !important;
    width: 88px !important;
    padding: 6px;
    float: right;
    transition: all .2s ease-in-out;
    color: var(--red-);
  }

  .ilike:hover {
    background-color: var(--red-);
    color: var(--white) !important;
  }

  .delike {
    filter: grayscale(1);
    opacity: .4;
  }

  .ilike>img {
    height: 26px;
    height: 26px;
    margin-top: 4px;
    margin-left: 4px;
    display: inline-block;
  }

  .ilike>span {
    font-size: 20px;
    line-height: 36px;
    color: inherit;
    vertical-align: top;
    margin-left: 12px;
    user-select: none;
  }

  #reply {
    position: fixed;
    width: 600px;
    height: calc(100vh - 78px);
    max-height: 1000px;
    padding: 24px;
    background: var(--white);
    top: 12px;
    z-index: 99999;
    box-shadow:
      2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
      6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
      12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
      22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
      41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
      100px 100px 80px rgba(0, 0, 0, 0.07);
    border-radius: 12px;
    overflow-y: auto;
    color: var(--black);
    display: none;
  }

  #reply-tip {
    text-align: center;
    margin: 50px;
  }

  #reply-close {
    background: var(--red-);
    display: inline-block;
    position: absolute;
    top: 12px;
    left: 0;
    font-size: 20px;
    padding: 6px;
    border-radius: 6px;
    user-select: none;
    color: var(--white);
    font-family: 'song';
  }

  #reply-close:hover {
    background: var(--red);
  }

  .reply-item {
    margin: 24px;
  }

  #reply-title {
    padding: 12px 0;
    font-size: 32px;
    font-weight: 900;
    font-family: 'kai';
    text-align: center;
    margin-bottom: 32px;
    padding-left: 60px;
    color: var(--red-);
    position: sticky;
    top: -24px;
    background-color: var(--white);
    z-index: 99;
  }

  .reply-auther {
    font-size: 18px;
    font-weight: 900;
    float: left;
    opacity: .8;
    color: var(--orange-);
  }

  .reply-time {
    font-size: 14px;
    float: right;
    opacity: .6;
  }

  .reply-body {
    margin: 12px;
    color: var(--black-);
    white-space: pre-wrap;
  }

  #reply-func {
    position: sticky;
    bottom: -25px;
    height: auto;
    background: var(--white);
  }

  #reply-edit {
    max-height: 200px;
    padding: 6px;
    outline: 0;
    border: 1px solid var(--green-);
    border-radius: 6px;
    font-size: 16px;
    font-family: 'song';
    line-height: 24px;
    padding: 2px;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
    margin: 12px;
    width: 500px;
    display: inline-block;
  }

  #reply-func>button {
    height: 30px;
    width: 55px;
    vertical-align: top;
    margin-top: 12px;
    border: none;
    border-radius: 6px;
    background: var(--green-);
    color: var(--black-);
    font-size: 16px;
    font-weight: 900;
    transition: all .15s ease-in-out;
  }

  #reply-func>button:hover {
    background: var(--green);
    color: var(--white);
  }
</style>