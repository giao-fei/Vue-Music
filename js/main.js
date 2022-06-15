var vm = new Vue({
       el: "#app",
       data: {
         bodyHeight: document.documentElement.clientHeight || document.documentElement.bodyHeight,
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
          searchMusic() {
              var that = this;
              axios.get("https://netease-cloud-music-api-puce-five.vercel.app/cloudsearch?keywords="+this.query)
              .then(function(response){
                 that.musicList = response.data.result.songs;
              })
          },
          playMusic:function(musicId){
              var that = this;
              axios.get("https://netease-cloud-music-api-puce-five.vercel.app/song/url?id="+musicId)
              .then(function(response){
                 that.musicUrl = response.data.data[0].url;
              },function (err){})
            // 歌曲图片
            axios.get("https://netease-cloud-music-api-puce-five.vercel.app/song/detail?ids="+musicId)
            .then(function(response) {
                 that.musicCover = response.data.songs[0].al.picUrl;
            },function(err){})
            // 歌曲评论获取
            axios.get("https://netease-cloud-music-api-puce-five.vercel.app/comment/hot?type=0&id="+musicId)
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
         playMV(mvid) {
            var that = this;
            that.isPlaying = true;
            that.$refs.audio.pause();
           
            axios.get("https://netease-cloud-music-api-puce-five.vercel.app/mv/url?id="+mvid)
            .then(res => {
               if(res.data.data.code == 404) {
                 alert('当前歌曲木有MV~')
               } else {
                 that.isShow = true;
                 that.mvUrl = res.data.data.url;
               }      
            })
            
         },
         // 隐藏
         hide:function(){
            this.isShow = false;
            this.mvUrl = '';
         },
         // 双击歌单背景
         change:function(index){
         	this.number=index;
         },
         login() {
           axios.get('https://netease-cloud-music-api-puce-five.vercel.app/register/anonimous').then(res => {
              console.log(res);
           })
         }
        }
   });