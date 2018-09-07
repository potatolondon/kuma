
(function($) {
  'use strict';
  var FAQ = $("#contributions-page"),
  thumbsUp = FAQ.find(".thumbs-up"),
  thumbsDown = FAQ.find(".thumbs-down"),
  questionForms = FAQ.find("form.feedback"),
  faqFeedback = FAQ.find('#faq-feedback');

  function sendAnalyticsVoteEvent(action, label ,value) {
    var event = {
      category: 'FAQ Feedback',
      action: action,
      value: value,
    };
    if (label) event.label = label;
    mdn.analytics.trackEvent(event)
  }

  function onThumbsUp(ev) {
    var questionNumber = $(ev.target).attr('data-faq') || 0;
    sendAnalyticsVoteEvent('question_' + questionNumber, null, 1) 
    disbaleQuestionFeedback($(this).parents('.faq'));
  }

  function onThumbsDown() {
    var form = $(this).parent('.vote-button-group').next('form');
    toggleQuestionFeedback(form);
  }

  function disbaleQuestionFeedback(question) {
    question.find('.vote-button-group').addClass('hidden');
    question.find('.confirmation').removeClass('hidden');
    question.find('form').addClass('hidden');
  }

  function toggleQuestionFeedback(form) {
    form.toggleClass('hidden');
  }

  function onQuestionFeedback(ev) {
    ev.preventDefault();
    toggleQuestionFeedback($(this))
    var questionNumber = $(ev.target).attr('data-question') || 0,
    feedback = $(this).find('textarea').val() || '';
    sendAnalyticsVoteEvent('question_' + questionNumber, feedback, 0);
    disbaleQuestionFeedback($(this).parents('.faq'))
  }

  function onFeedback(ev) {
    ev.preventDefault();
    var feedback = $(this).find('textarea').val() || '';
    mdn.analytics.trackEvent({
      category: 'FAQ Feedback',
      action: 'Any other questions',
      label: feedback,
    });
  }

  thumbsUp.click(onThumbsUp);
  thumbsDown.click(onThumbsDown);
  questionForms.submit(onQuestionFeedback);
  faqFeedback.submit(onFeedback);
 
})(jQuery);
