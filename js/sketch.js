
$(document).ready(function(){
	$('#onmousemve').on('click', function(){
		$('#onclck').prop('checked', false);
		$('#rndClrMve').prop('checked', false);
		$('#rndClrclck').prop('checked', false);
		$('#fadeOutEff').prop('checked', false);
		$('#incremental').prop('checked', false);
		$('#trail').prop('checked', false);
	});

	$('#onclck').on('click', function(){
		$('#onmousemve').prop('checked', false);
		$('#rndClrMve').prop('checked', false);
		$('#rndClrclck').prop('checked', false);
		$('#fadeOutEff').prop('checked', false);
		$('#incremental').prop('checked', false);
		$('#trail').prop('checked', false);
	});

	$('#rndClrMve').on('click', function(){
		$('#onmousemve').prop('checked', false);
		$('#onclck').prop('checked', false);
		$('#rndClrclck').prop('checked', false);
		$('#fadeOutEff').prop('checked', false);
		$('#incremental').prop('checked', false);
		$('#trail').prop('checked', false);
	});

	$('#rndClrclck').on('click', function(){
		$('#onmousemve').prop('checked', false);
		$('#rndClrMve').prop('checked', false);
		$('#onclck').prop('checked', false);
		$('#fadeOutEff').prop('checked', false);
		$('#incremental').prop('checked', false);
		$('#trail').prop('checked', false);
	});

	$('#fadeOutEff').on('click', function(){
		$('#onmousemve').prop('checked', false);
		$('#onclck').prop('checked', false);
		$('#rndClrclck').prop('checked', false);
		$('#rndClrMve').prop('checked', false);
		$('#incremental').prop('checked', false);
		$('#trail').prop('checked', false);
	});

	$('#incremental').on('click', function(){
		$('#onmousemve').prop('checked', false);
		$('#rndClrMve').prop('checked', false);
		$('#onclck').prop('checked', false);
		$('#fadeOutEff').prop('checked', false);
		$('#rndClrclck').prop('checked', false);
		$('#trail').prop('checked', false);
	});

	$('#trail').on('click', function(){
		$('#onmousemve').prop('checked', false);
		$('#rndClrMve').prop('checked', false);
		$('#onclck').prop('checked', false);
		$('#fadeOutEff').prop('checked', false);
		$('#rndClrclck').prop('checked', false);
		$('#incremental').prop('checked', false);
	});

	$('#gotoSketch').on('click', function(){
		var gridSize = $('#gridSize').val();
		var gridSizeErr = false;
		var optionErr = false;

		var museMove = $('#onmousemve').prop('checked');
		var rndMve = $('#rndClrMve').prop('checked');
		var onck = $('#onclck').prop('checked');
		var fadeout = $('#fadeOutEff').prop('checked');
		var rndclr = $('#rndClrclck').prop('checked');
		var increm = $('#incremental').prop('checked');
		var tril = $('#trail').prop('checked');

		if((gridSize == 0) || (gridSize > 128) || (gridSize < 1)) {
			gridSizeErr = true;
		}

		if (!(museMove || rndMve || onck || fadeout || rndclr || increm || tril)) {
			optionErr = true;
		} 

		if(gridSizeErr && optionErr) { 
			$('.instructions .errTxt').css('display','inline');
		} else if (gridSizeErr) {
			$('.instructions .grdErr').css('display','inline');
		} else if (optionErr) {
			$('.instructions .optErr').css('display','inline');
		} else {
			$('.instructions').hide();
			$('.sketchboard').show();

			populateGrid(gridSize);
		}
	});

	function populateGrid(gridSize) {
		var sktchbrdWdth = $('.sketchboard').width();
		var gridwidth = (sktchbrdWdth-5)/gridSize;
		var innerbrd = (gridwidth*gridSize);

		$('.sketchboard').append('<div class="innerbrd"></div>');
		for (var i=1; i<=gridSize * gridSize; i++) {
			$('.sketchboard .innerbrd').append('<div></div>');
		}
		$('.innerbrd').css({'width':innerbrd+'px',
							'height':innerbrd+'px',
							'margin-bottom': '20px'});
		$('.innerbrd div').css('width',gridwidth+'px');
		$('.innerbrd div').css('height',gridwidth+'px');
	}

	$('.sketchboard').on('mouseenter', '.innerbrd div', function(){
		var onmousemveval = '';
		var rndClrMveval = '';
		var fadeOutEffVal = '';
		var trailVal = '';

		onmousemveval = $('#onmousemve').prop('checked');
		rndClrMveval = $('#rndClrMve').prop('checked');
		fadeOutEffVal = $('#fadeOutEff').prop('checked');
		trailVal = $('#trail').prop('checked');

		if (onmousemveval) {
			$(this).css('background','#919191');
		} else if (rndClrMveval) {
			var colorme = '#' + Math.random().toString(16).substring(2, 8);
			$(this).css("background", colorme);
		} else if (fadeOutEffVal) {
			$(this).css("background", '#919191').fadeTo('500', '0.25', 'swing');
		} else if (trailVal) {
			$(this).css("opacity", 0);
			$(this).fadeTo('1500', '1', 'swing');
  		}
	});

	$('.sketchboard').on('click', '.innerbrd div', function(){
		var onclckval = '';
		var rndClrClckVal = '';
		var incrementalVal = '';

		onclckval = $('#onclck').prop('checked');
		rndClrClckVal =  $('#rndClrclck').prop('checked');
		incrementalVal = $('#incremental').prop('checked');

		if (onclckval) {
			$(this).css('background','#919191');
		} else if (rndClrClckVal) {
			var colorme = '#' + Math.random().toString(16).substring(2, 8);
			$(this).css("background", colorme);
		} else if (incrementalVal) {
			var currentOpacity = $(this).css('opacity');
			if(currentOpacity > 0){
				$(this).css('opacity', currentOpacity - 0.1);
			}
		}
	});

	$('.sketchboard').on('click', '#resetSketch', function() {
		$( ".innerbrd" ).remove();
		$('.sketchboard').hide();
		$('.instructions').show();

		$('#onmousemve').prop('checked', false);
		$('#rndClrMve').prop('checked', false);
		$('#onclck').prop('checked', false);
		$('#fadeOutEff').prop('checked', false);
		$('#rndClrclck').prop('checked', false);
		$('#incremental').prop('checked', false);	
		$('#trail').prop('checked', false);	

		$('#gridSize').val('');
		$('.instructions .errTxt').css('display','none');
	});

});