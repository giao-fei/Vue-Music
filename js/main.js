var vm = new Vue({
       el: "#app",
       data: {
          query: '',
         // 歌曲清单
          musicList: [],
         // 歌曲地址
          musicUrl: '',
         // 歌曲图片
          musicCover: '',
         // 歌曲评论
          hotComments: '',
         // 动画播放状态
          isPlay: false,
         // 遮罩层的显示状态
          isShow: false,
         // mv地址
          mvUrl: "",
         // 单击li改变背景色
          number: -1,
         // 暂停播放
          isPlaying: false
       },
       methods: {
          searchMusic:function(){
              var that = this;
              axios.get("https://autumnfish.cn/search?keywords="+this.query)
              .then(function(response){
                 that.musicList = response.data.result.songs;
              },function(err){})
          },
          playMusic:function(musicId){
              var that = this;
              axios.get("https://autumnfish.cn/song/url?id="+musicId)
              .then(function(response){
                 that.musicUrl = response.data.data[0].url;
              },function (err){})
            // 歌曲图片
            axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
            .then(function(response) {
                 that.musicCover = response.data.songs[0].al.picUrl;
            },function(err){})
            // 歌曲评论获取
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
            .then(function(response){
                 that.hotComments = response.data.hotComments;
            },function(err){})
          },
          // 双击歌曲重新播放
          dblclick:function(){
          	this.musicUrl = '';          
          },
          // 图片旋转
          play:function(){
            this.isPlay = true;         
          },
          pause:function(){
            this.isPlay = false; 
          },
         // 播放mv
         playMV:function(mvid) {
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id="+mvid)
            .then(function(response){
              that.isShow = true;
              that.mvUrl = response.data.data.url;            
            },function(err){})
            
         },
         // 隐藏
         hide:function(){
            this.isShow = false;
            this.mvUrl = '';
         },
         // 双击歌单背景
         change:function(index){
         	this.number=index;
         }
        }
   });