
(function($) {
    'use strict';

    var faqContainer = $('#contributions-page'),
        thumbsUp = faqContainer.find('.thumbs-up'),
        thumbsDown = faqContainer.find('.thumbs-down'),
        faqFeedback = faqContainer.find('#faq-feedback');
    
    function sendAnalyticsVoteEvent(action, label ,value) {
        var event = {
            category: 'FAQ Feedback',
            action: action,
            value: value,
        };
        if (label) {
            event.label = label;
        }
        mdn.analytics.trackEvent(event);
    }
    
    function onThumbsUp(ev) {
        var questionNumber = $(ev.target).attr('data-faq') || 0;
        $(ev.target).next().removeClass('active');
        $(ev.target).addClass('active');
        sendAnalyticsVoteEvent('question_' + questionNumber, null, 1);
    }
    
    function onThumbsDown(ev) {
        var questionNumber = $(ev.target).attr('data-faq') || 0;
        $(ev.target).prev().removeClass('active');
        $(ev.target).addClass('active');

        sendAnalyticsVoteEvent('question_' + questionNumber, null, 0); 
    }

    function onFeedback(ev) {
        ev.preventDefault();
        var feedback = $(this).find('textarea').val() || '';
        var action = $(this).find('textarea').attr('data-action') || '';
        mdn.analytics.trackEvent({
            category: 'Contribution feedback',
            action: action,
            label: feedback,
        });
    }
    
    thumbsUp.click(onThumbsUp);
    thumbsDown.click(onThumbsDown);
    faqFeedback.submit(onFeedback);
    
})(jQuery);
