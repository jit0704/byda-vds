// publishing UI javascript
$(function(){
  if ($('[include-html]').length !== 0) {
    includeHTML(); // gnb include (퍼블리싱 확인용)
  }
  cmmnui();
  loginForm();
  if ($('.list-table__bodyscroll', '.unit').length !== 0) {
    $(window).on('resize', unitBodyscrollHeight).resize();
  }
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

  // datepicker
  // 200824 기존 datepicker삭제
  // $('.input-calendar').datepicker({
  //   dateFormat: 'yy-mm-dd', //Input Display Format 변경
  //   showMonthAfterYear: true, //년도 먼저 나오고, 뒤에 월 표시
  //   yearSuffix: "년", //달력의 년도 부분 뒤에 붙는 텍스트
  //   monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], //달력의 월 부분 텍스트
  //   monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], //달력의 월 부분 Tooltip 텍스트
  //   dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], //달력의 요일 부분 텍스트
  //   dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'] //달력의 요일 부분 Tooltip 텍스트
  // });

  // 모니터링 chart, 검지로그 컨텐츠 높이 체크 - 200802 추가
  // 200811 삭제
  // setTimeout(function(){
  //   $(window).resize(function(){
  //     var $defaultHeight = $('.monitering-content__ipcamera').height();
  //     $('.monitering-item__content').each(function(){
  //       if ( $(this).closest('.monitering-content__ipcamera').length === 0 ) {
  //         $(this).css('height', $defaultHeight - 35);
  //       }
  //     });
  //   }).resize();
  // }, 50);
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

// unit요소 안에 bodyscroll요소의 높이값 셋팅
function unitBodyscrollHeight () {
  var $tblEl = $('.list-table__inner');
  var $ancestorH;
  $tblEl.closest('.unit').addClass('is-bodyscroll');
  $ancestorH = $tblEl.closest('.is-bodyscroll').height();
  $tblEl.css('height', $ancestorH - 90);
}