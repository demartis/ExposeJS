/*
 *  jquery.expose.js - A jQuery plugin that can highlight your $.block
 *  Version: 1.0.1
 *
 *  Author: Riccardo De Martis <riccardodemartis@hotmail.com>
 *  Created: 31 March 2014
 *  Edited: 1 April 2014
 */

(function ($) {
    'use strict';

    $.fn.extend({
    	expose: function (options) {
        var defaults = {
          divClassOverlay:'overlay-expose',
          divClassHighlight:'exposeHighlight',
          initBoxZindex: 99000,
          overlayZindex: 98999,
          show:false,
        	reset:false
        },
      options = $.extend(defaults, options),
        
      createOverlay= function() {
	      // make sure the element doesn't exist in the DOM tree
	      if (typeof $('.'+options.divClassOverlay).get(0) === 'undefined') {
	
	          var html = [
	              '<div class="'+options.divClassOverlay+'">',
	              '</div>'
	          ].join('');
	
	          var $overlay = $(html);
	
	          $overlay
	          	.height($('body').height())
	          		//.width($(window).width())
	          		.css({
	          			zIndex: options.overlayZindex
	          			
	          		});
	
	          $('body').append($overlay);
	      };
	    },
	
	  	removeOverlay=function(){
				if($('.'+options.divClassOverlay)!=undefined && $('.'+options.divClassOverlay) && $('.'+options.divClassOverlay).length){
					$('.'+options.divClassOverlay).remove();
				}
			},

	    highlightBlock=function($box){
				if($box && $box.length){
					$box
						.css('z-index',options.initBoxZindex++)
						.addClass(options.divClassHighlight);
					setTimeout(function(){
						$('.'+options.divClassOverlay).fadeIn(500,function(){});
						},100);
				}else{
					
				}
			},
			hideHighlightBlock=function($box){
				if($box && $box.length){
					$('.'+options.divClassOverlay).fadeOut(300, function(){
						//$box.css('z-index','1');
						$box.prop('style').removeProperty('z-index');
						$box.removeClass(options.divClassHighlight);
						removeOverlay();
					});
				};
			};
	    
			if(options.reset){
				$('.'+options.divClassOverlay).fadeOut(300, function(){
					removeOverlay();
				});
				$('.'+options.divClassHighligh).removeClass(options.divClassHighligh);
				return true;
			}else{
				createOverlay();
		  	 return this.each(function () {
		  		 var $this  = $(this);
		  		 if(options.show){
		  			 highlightBlock($this);
		  		 }else{
	  				 hideHighlightBlock($this);
		  		 };
		  	 });
				}
    	}
    });
      
})(jQuery);
