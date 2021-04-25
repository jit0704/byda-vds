// publishing UI javascript
$(function(){
  if ($('[include-html]').length !== 0) {
    includeHTML(); // HTML include (퍼블리싱 확인용)
  }
  cmmnui();
  loginForm();
  // 210425 추가
  if ($('.list-table__bodyscroll', '.unit').length !== 0) {
    $(window).on('resize', unitBodyscrollHeight).resize();
  }
  // 210425 추가
  setTimeout(lnb, 50); // setTimeout()은 퍼블리싱 확인용으로 개발에서는 적용X, lnb함수만 적용해주시면 됩니다.
});

// 공통 UI
function cmmnui () {

  // 모달 팝업
  $('.btn__modal--open').on('click', function () {
    $(this).modal({
      closeExisting: false,
      clickClose: false
    });
    return false;
  });

  // gnb
  setTimeout(function () { // setTimeout()은 퍼블리싱 확인용으로 개발에서는 적용하지 마세요.
    var $gnb = $('.gnb');
    var $gnbItem = $('.gnb-list__item');
    var $gnbSelector = '.gnb-list > li';
    $(document).on('mouseenter', $gnbSelector, function () {
      if ($(this).find('.gnb-list__item').length !== 0) {
        $gnb.addClass('active');
        $gnbItem.stop().slideDown(280);
        $('.datepicker-container').addClass('zindex0');
      } else {
        return;
      }
    });
    $(document).on('mouseleave', $gnbSelector, function () {
      $gnb.removeClass('active');
      $gnbItem.stop().slideUp(280);
      $('.datepicker-container').removeClass('zindex0');
    });
  }, 100);

  // 200824 datepicker 추가
  $('[data-toggle="datepicker"]').datepicker({
    language: 'ko-KR',
    format: 'yyyy-mm-dd',
    autoHide: true,
    zIndex: 10
  });

  // 200826 input autocomplete 비활성화
  (function(){
    var inputTxt = $('[type="text"], [type="number"]');
    var inputCalendar = $('.input-calendar');
    inputTxt.not(inputCalendar).attr('autocomplete', 'off');
  })();

  // 200920 멀티셀렉트박스 드롭다운 효과 추가
  $('.multi-selectbox__btn').on('click', function(){
    $(this).next().slideToggle(200);
  });
  $('.multi-selectbox__confirm').on('click', function(){
    $('.multi-selectbox__btn').trigger('click');
  });
}

// 로그인 폼 영역 포커스
function loginForm () {
  var $txtInput = $('.loginbox__input input')
  $txtInput.on('focus', function(){
    $(this).parent().addClass('active');
  });
  $txtInput.on('blur', function(){
    $(this).parent().removeClass('active');
  });
}

// unit요소 안에 bodyscroll요소의 높이값 셋팅 (210425 추가)
function unitBodyscrollHeight () {
  var $tblEl = $('.list-table__inner');
  var $ancestorH;
  $tblEl.closest('.unit').addClass('is-bodyscroll');
  $ancestorH = $tblEl.closest('.is-bodyscroll').height();
  $tblEl.css('height', $ancestorH - 90);
}

// lnb (210425 추가)
function lnb () {
  if ($('.lnb').length !== 0) {
    $('.lnb__list li').each(function(){
      if ($(this).find('>ul').length > 0) {
        return;
      }
      $(this).addClass('no-depth');
    });

    $(document).on('click', '.lnb__list li a', function(e){
      e.stopPropagation();
      var $this = $(this);
      var $depthTarget = $this.next(); //ul
      var $siblings = $this.parent().siblings(); //li 형제 요소들

      $this.parent('li').find('ul li').removeClass('active');
      $siblings.removeClass('active');
      $siblings.find('ul').slideUp(200);

      if ($depthTarget.css('display') == 'none') {
        $this.parent().addClass('active');
        $depthTarget.slideDown(200);
      } else {
        $depthTarget.slideUp(200);
        $depthTarget.find('ul').slideUp(200);
        $this.parent().removeClass('active');
      }
    });
  }
}