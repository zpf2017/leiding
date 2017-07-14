/**
/**
/**
/**
 * Created by zhangpingfu on 2015/12/16.
 * main主模块
 */
define(function (require,exports,module) {

    require('zepto');require('swiper');require('shake');require('parallax');require('animate');
    module.exports = {
        init: function () {
            mainObject.loadImg();
        }
    };
    var mainObject = {
        imgArr:[
            //'images/game1.jpg',
            'images/game1_01.jpg',
            'images/game1_02.jpg',
            //'images/game1_1.png',
            //'images/game1_1_line.png',
            //'images/game1_2.png',
            //'images/game1_3.png',
            //'images/game1_3_line.png',
            'images/game1_4.png',
            'images/game1_5.png',
            'images/game1_6.png',
            'images/game1_7.png',
            'images/game1_9.png',
            'images/game1_10.png',
            'images/game1_11.png',
            'images/game1_12.png',
            'images/game1_13.png',
            'images/game1_li_1.png',
            'images/game1_li_2.png',
            'images/game1_li_3.png',
            'images/game1_li_4.png',
            'images/game1_li_5.png',
            'images/game1_li_5.png',
            'images/game1_li_6.png',
            'images/game1_li_7.png',
            'images/game1_li_8.png',
            'images/game1_li_9.png',
            'images/game1_li_10.png',
            'images/game1_li_11.png',
            'images/game1_li_12.png',
            'images/game1_li_13.png',
            'images/game1_li_14.png',
            'images/game1_li_15.png',
            'images/game1_li_16.png',
            'images/game1_li_17.png',
            'images/game1_li_18.png',
            'images/game2.jpg',
            'images/game2_1.png',
            'images/game2_1_.png',
            'images/game2_3.png',
            'images/game2_3_.png',
            'images/game2_4.png',
            'images/game2_5.png',
            'images/game2_6.png',
            'images/game2_7_.png',
            'images/game2_8.png',
            'images/game3.jpg',
        ],
        sum:0,
        loadImg: function () {
            var nImg = new Image();
            nImg.src = mainObject.imgArr[mainObject.sum];
            nImg.onload = function(){
                mainObject.sum++;
                if(mainObject.sum != mainObject.imgArr.length){
                    mainObject.loadImg();
                }
                if (mainObject.sum == 20) {
                    console.log('加载完成！');
                    $("#loading").css("display", "none");//loading页面结
                    $('#wrap').show();
                    mainObject.mainSwiper();//Swiper初始化
                    mainObject.touchStart();
                }
            }
        },
        mainSwiper: function () {
            //mySwiper为全局变量
            mySwiper = new Swiper('.swiper-container', {
                speed:600,
                effect : 'fade',
                fade: {
                    crossFade: false
                },
                noSwipingClass: 'stop-swiping',
                direction: 'vertical',
                mousewheelControl: true,
                onInit: function (swiper) {
                    swiperAnimateCache(swiper); //隐藏动画元素
                    swiperAnimate(swiper); //初始化完成开始动画
                },
                onSlideChangeStart: function(swiper){
                },
                onSlideChangeEnd: function (swiper) {
                    swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
                    if(mySwiper.activeIndex == 1){
                        mainObject.shake();//游戏页面
                    }
                }
            });
        },
        cout:0,
        shake: function () {
            //摇一摇监听
            var myShakeEvent = new Shake({threshold: 10,timeout : 10});//threshold越小，约灵敏，timeout事件发生频率
            myShakeEvent.start();
            window.addEventListener('shake', function (e) {
                e.preventDefault();
                e.stopPropagation();
                $('#bar').css('width',mainObject.cout+'%');
                $('#bar li').show();
                mainObject.cout = mainObject.cout + 5;
                if(mainObject.cout == 105){
                    //取消shake事件的监听
                    window.removeEventListener('shake',function(e){},false);
                    myShakeEvent.stop();
                    $('#deng').fadeIn(2000);
                    sound1.play();//播放音乐；
                }
            }, false);

        },
        touchStart: function () {
            //阻止默认事件
            $("#wrap").on("touchmove", function (ev) {
                ev.preventDefault();
            });

            //汽车轰鸣声
            sound1 = new Audio("music/1.mp3");
            sound1.preload = true;
            sound1.loop = false;
            sound1.autoplay = false;
            sound1.pause();
            var bgAudio = document.getElementById('chrmas_music');

            $(sound1).on({
                'play':function () {
                    bgAudio.pause();
                },
                'ended':function () {
                    bgAudio.play();
                },
                'pause': function () {
                    bgAudio.play();
                    mySwiper.slideNext();
                }
            });


            $('.game1_top').parallax({
                calibrateX: false,
                calibrateY: true,
                invertX: false,
                invertY: true,
                limitX: false,
                limitY: 10,
                scalarX: 2,
                scalarY: 8,
                frictionX: 0.2,
                frictionY: 0.8
            });

            $('.zhiwen').on('touchstart', function (e) {
                e.preventDefault();
                $('.game1_top,.game1_center,.game1_footer').fadeOut(500);
                $('.game1_bg').addClass('game1_bg_go');
                setTimeout(function () {
                    mySwiper.slideNext();
                },2000);
            });

            $(".car").on("webkitAnimationEnd",function(){
                //console.log(8888888888888)
                mySwiper.slideNext();
            },false);
        }

    }
});
