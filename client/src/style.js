export function poptAnimation(pos, color){
    applyRandomButtonColor(color); 
    $(".fancy-block").eq(pos).bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(){
        $(".fancy-block").removeClass('active');
    }) 
     $(".fancy-block").eq(pos).addClass("active");
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
