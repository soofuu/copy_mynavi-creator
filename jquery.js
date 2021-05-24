$(function(){
    if(window.matchMedia("(max-width: 768px)").matches){
        //ウィンドウサイズが 768px以下の場合のコードをここに
        $('.burger-btn').on('click',function(){ //バーガーメニューをクリックした時
            var burger=$('.burger');
            var close=$('.close');
            if(burger.hasClass('no-display')==true){//バーガーメニューボタンが表示されていないとき
                burger.removeClass('no-display');//バーガーメニューを表示
                close.addClass('no-display');//closeボタンを隠す
                $('.header-fixed').animate({'opacity' : '0.9'}, '0.5s');//0.5sで背景を透過する
                $('.burger-menue-lists').fadeToggle(100);//menue-listsの表示切替
                $('.burger-menue-list').animate({'right' : '-100%'}, '0s');//位置をスライドイン前の位置に戻す
            }
            else{//バーガーメニューボタンが表示されているとき
                close.removeClass('no-display');//closeボタン表示
                burger.addClass('no-display');//バーガーメニューボタン表示
                $('.header-fixed').animate({'opacity' : '1'}, '0.5s');//header-fixcedの背景の透過を解除
                $('.burger-menue-lists').fadeToggle(100);//menue-listsの表示切替
                $('.burger-menue-lists li').each(function(i){
                    $(this).delay(10*i).animate({'right' : '0%'}, '0.02s');
                });
            }
        });
        
        
        //トップへ戻る押したらトップまでスムーススクロール
        $('.top').on('click',function(){
            $('html, body').animate({scrollTop:0}, 200, "swing");
        });

    }else
    {
        //ウィンドウサイズが 768px以上の場合のコードをここに
        //スムーススクロール
        $('a[href^="#"]').on('click',function(){
            //スクロールのスピード
            var speed = 500;
            //リンク元を取得
            var href= $(this).attr("href");
            //リンク先を取得
            var target = $(href == "#" || href == "" ? 'html' : href);
            //ヘッダーの高さを取得
            var header = $('header').height();
            //ヘッダーの高さを引く
            var position = target.offset().top - header;
            //スムーススクロール
            $("html, body").animate({scrollTop:position}, speed, "swing");
            return false;
        });
        //スクロールトップ
        $('.scroll-top').on('click',function(){
            $('html, body').animate({scrollTop:0}, 200, "swing");
        });
        $('.header-list').hover(
            function(){
                $(this).find('.header-hiddenLists').slideDown(500);
            },
            function(){
                $(this).find('.header-hiddenLists').slideUp(200);
            });  
        $(window).on('scroll load',function(){
            var scroll=$(window).scrollTop();
            var headerheight=$('header').height();
            var headerFixed=$('.header-fixed');
            //スクロールした時に、windowのtopがヘッダーよりも下にある、かつ、js-headerクラスが付与されているとき
            if(scroll>headerheight && headerFixed.hasClass('js-header') == false){
                $('header').addClass('height');//headerの高さを変更（低く）する
                $('.header-fixed').hide().addClass('js-header').slideDown(400);//header固定の高さを変更（低く）しposisionをfixedに変更
                $('.scroll-top').slideDown(400);
            }
            //スクロールした時に、windowのtopがヘッダーよりも上にある、かつ、js-headerクラスが付与されていない
            else if(scroll<headerheight && headerFixed.hasClass('js-header') == true){
                $('.header-fixed').removeClass('js-header');//js-headerクラスを消去
                $('header').removeClass('height');//headerの高さを変更（高く）する
                $('.scroll-top').slideUp(400);
            }
        });
    };
})

//ロードとリサイズの両方で同じ処理を付与する
window.onload = switchByWidth;
window.onresize = switchByWidth;
