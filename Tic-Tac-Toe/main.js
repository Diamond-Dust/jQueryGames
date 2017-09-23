var currentPlayer = 'X';
var winWho = '-';

$('.empty').click(function(){
	$(this).removeClass("tempX");
	$(this).removeClass("tempO");
	$(this).toggleClass("empty");
	$(this).toggleClass(currentPlayer);
	for(let i=1; i<4; i++)
		if( $('.'+i+'.'+currentPlayer).length == 3 ) {
			$('.'+i+'.'+currentPlayer).css('background-color', '#FF0000');
			winWho = currentPlayer;
		}
	for(let i=1; i<4; i++)
		if( $('.-'+i+'.'+currentPlayer).length == 3 ) {
			$('.-'+i+'.'+currentPlayer).css('background-color', '#FF0000');
			winWho = currentPlayer;
		}
	if( ($('.-1.1.'+currentPlayer).length == 1) && ($('.-2.2.'+currentPlayer).length == 1) && ($('.-3.3.'+currentPlayer).length == 1)) {
		winWho = currentPlayer;
		$('.-1.1.'+currentPlayer).css('background-color', '#FF0000');
		$('.-2.2.'+currentPlayer).css('background-color', '#FF0000');
		$('.-3.3.'+currentPlayer).css('background-color', '#FF0000');
	}
	if( ($('.-3.1.'+currentPlayer).length == 1) && ($('.-2.2.'+currentPlayer).length == 1) && ($('.-1.3.'+currentPlayer).length == 1)) {
		winWho = currentPlayer;
		$('.-3.1.'+currentPlayer).css('background-color', '#FF0000');
		$('.-2.2.'+currentPlayer).css('background-color', '#FF0000');
		$('.-1.3.'+currentPlayer).css('background-color', '#FF0000');
	}
	if(winWho!='-')
		setTimeout(function() { alert(currentPlayer+' wygrał!'); location.reload(); }, 5);
	else if($('.empty').length == 0)
		setTimeout(function() { alert('Remis. Nikt nie wygrał.'); location.reload(); }, 5);
	setTimeout(function() { currentPlayer = (currentPlayer == 'X') ? 'O' : 'X'; }, 6);
	$(this).off();
});

$('.empty').hover(
	function(){if($(this).hasClass('empty'))$(this).toggleClass('temp'+currentPlayer);}, 
	function(){if($(this).hasClass('empty'))$(this).toggleClass('temp'+currentPlayer);
});


