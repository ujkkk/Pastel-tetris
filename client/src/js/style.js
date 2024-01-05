// 해당 위치에 터지는 애니메이션 생성
export function poptAnimation(pos, color){
    applyRandomButtonColor(color); 
    $(".fancy-block").eq(pos).bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(){
        $(".fancy-block").removeClass('active');
    }) 
     $(".fancy-block").eq(pos).addClass("active");
}


export function setColorOfBlock(index, color){
    $(".block").eq(index).css("background-color", color);
}

  // 색상 지정
function applyRandomButtonColor(color) {
    $(".frills").css("background-color", color);

    // JavaScript로 ::before와 ::after에 직접 스타일 적용
    $(".frills").each(function() {
        var beforeStyle = window.getComputedStyle(this, '::before');
        var afterStyle = window.getComputedStyle(this, '::after');

        $(this).css({
            '--before-bg-color': color,
            '--after-bg-color': color
        });
    });
  }
