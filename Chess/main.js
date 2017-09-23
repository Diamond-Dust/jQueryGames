var turnColour = 'W';
var currentPiece;

$('.container').click(function(){
	//Remove green orbs
	if(!($(this).is('.possible'))) {
		$('.possible').toggleClass('possible');
		currentPiece = $(this);
	}
	//Remove old enPassants
	if(!($(this).is('.possible')))
		$('.enPassant' + turnColour).toggleClass('enPassant' + turnColour);
	
	var Type = $(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1];
	
	//Check whose turn it is
	if((Type[0]!=turnColour) && (Type[0]!='p'))
		return;
	
	console.log(Type);
	//Setting possible moves
	switch(Type.slice(1)) {
		
		//Pawns
		case 'Pawn':
			//White pawn
			if(Type[0] == 'W') {
				//Double move
				if(($(this).hasClass('O')) && ($(this).prev().hasClass('empty')))  {
					$(this).prev().prev().toggleClass('possible');
				}
				//Moving forward
				if($(this).prev().hasClass('empty'))
					$(this).prev().toggleClass('possible');
				
				//Taking enemy pieces - enPassant
				if((!($(this).hasClass('H'))) && ($(this).next().next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().next().attr('class').split(' ').length-1]=='enPassantB') && ($(this).hasClass('L'))){
					$(this).next().next().next().next().next().next().next().toggleClass('possible');
				}
				if((!($(this).hasClass('A'))) &&($(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1]=='enPassantB') && ($(this).hasClass('L'))){
					$(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().toggleClass('possible');
				}
				//Taking non-enPassant pieces
				if((!($(this).hasClass('H'))) && ($(this).next().next().next().next().next().next().next().attr('class').split(' ')[$(this).attr('class').split(' ').length-1]!='BKing') && ($(this).next().next().next().next().next().next().next().attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]=='B') && (!($(this).hasClass('I')))){
					$(this).next().next().next().next().next().next().next().toggleClass('possible');
				}
				if((!($(this).hasClass('A'))) &&($(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).attr('class').split(' ').length-1]!='BKing') && ($(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]=='B') && (!($(this).hasClass('I')))){
					$(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().toggleClass('possible');
				}
			}
			//Black pawn
			else {
				//Double move
				if(($(this).hasClass('J')) && ($(this).next().hasClass('empty'))) {
					$(this).next().next().toggleClass('possible');
				}
				//Move forward
				if($(this).next().hasClass('empty'))
					$(this).next().toggleClass('possible');
				
				//Taking enemy pieces - enPassant
				if((!($(this).hasClass('A'))) && ($(this).prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1]=='enPassantW') && ($(this).hasClass('M'))){
					$(this).prev().prev().prev().prev().prev().prev().prev().toggleClass('possible');
				}
				if((!($(this).hasClass('H'))) && ($(this).next().next().next().next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().next().next().next().attr('class').split(' ').length-1]=='enPassantW') && ($(this).hasClass('M'))){
					$(this).next().next().next().next().next().next().next().next().next().toggleClass('possible');
				}
				//Taking non-enPassant pieces
				if((!($(this).hasClass('A'))) && ($(this).prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).attr('class').split(' ').length-1]!='WKing') && ($(this).prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1][0]=='W') && (!($(this).hasClass('P')))){
					$(this).prev().prev().prev().prev().prev().prev().prev().toggleClass('possible');
				}
				if((!($(this).hasClass('H'))) && ($(this).next().next().next().next().next().next().next().next().next().attr('class').split(' ')[$(this).attr('class').split(' ').length-1]!='WKing') && ($(this).next().next().next().next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().next().next().next().attr('class').split(' ').length-1][0]=='W') && (!($(this).hasClass('P')))){
					$(this).next().next().next().next().next().next().next().next().next().toggleClass('possible');
				}
			}
			break;
			
		//Rooks
		case 'Rook':
			
			break;
			
		//Knights
		case 'Knight':
			
			break;
			
		//Bishops
		case 'Bishop':
			
			break;
			
		//Queens
		case 'Queen':
			
			break;
			
		//Kings
		case 'King':
			
			break;
		
		//Second click - move
		case 'ossible':
			//Prevent capture of the King if I forgot about the move
			if(($(this).hasClass('BKing')) || ($(this).hasClass('WKing')))
				return;
			
			$('.possible').toggleClass('possible');
			
			//enPassant pawn removal
			if($(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1]=='enPassantW')
			{
				$(this).prev().toggleClass('WPawn');
				$(this).prev().toggleClass('empty');
			}
			else if($(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1]=='enPassantB')
			{
				$(this).next().toggleClass('BPawn');
				$(this).next().toggleClass('empty');
			}
			
			//enPassant setting 
			if((currentPiece.attr('class').split(' ')[currentPiece.attr('class').split(' ').length-1]=='BPawn') && (currentPiece.hasClass('J')) && ($(this).hasClass('L')))
				$(this).prev().toggleClass('enPassantB');
			else if((currentPiece.attr('class').split(' ')[currentPiece.attr('class').split(' ').length-1]=='WPawn') && (currentPiece.hasClass('O')) && ($(this).hasClass('M')))
				$(this).next().toggleClass('enPassantW');
			
			console.log($(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1])
			$(this).toggleClass($(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1]);
			$(this).toggleClass(currentPiece.attr('class').split(' ')[currentPiece.attr('class').split(' ').length-1]);
			
			//Pawn promotion
			if((currentPiece.attr('class').split(' ')[$(this).attr('class').split(' ').length-1] == 'WPawn') && ($(this).hasClass('I'))) {
				$('#myModalW').show();
				$('#WRimg').click(function() {$('#myModalW').hide(); $('.WPawn.I').toggleClass('WRook'); $('.WPawn.I').toggleClass('WPawn');});
				$('#WKimg').click(function() {$('#myModalW').hide(); $('.WPawn.I').toggleClass('WKnight'); $('.WPawn.I').toggleClass('WPawn');});
				$('#WBimg').click(function() {$('#myModalW').hide(); $('.WPawn.I').toggleClass('WBishop'); $('.WPawn.I').toggleClass('WPawn');});
				$('#WQimg').click(function() {$('#myModalW').hide(); $('.WPawn.I').toggleClass('WQueen'); $('.WPawn.I').toggleClass('WPawn');});
			}
			else if((currentPiece.attr('class').split(' ')[$(this).attr('class').split(' ').length-1] == 'BPawn') && ($(this).hasClass('P'))) {
				$('#myModalB').show();
				$('#BRimg').click(function() {$('#myModalB').hide(); $('.BPawn.P').toggleClass('BRook'); $('.BPawn.P').toggleClass('BPawn');});
				$('#BKimg').click(function() {$('#myModalB').hide(); $('.BPawn.P').toggleClass('BKnight'); $('.BPawn.P').toggleClass('BPawn');});
				$('#BBimg').click(function() {$('#myModalB').hide(); $('.BPawn.P').toggleClass('BBishop'); $('.BPawn.P').toggleClass('BPawn');});
				$('#BQimg').click(function() {$('#myModalB').hide(); $('.BPawn.P').toggleClass('BQueen'); $('.BPawn.P').toggleClass('BPawn');});
			}
			
			currentPiece.toggleClass(currentPiece.attr('class').split(' ')[currentPiece.attr('class').split(' ').length-1]);
			$(currentPiece).toggleClass('empty');
			currentPiece = null;
			//End turn
			if(turnColour=='W')
				turnColour='B';
			else
				turnColour='W';
			
			break;
		default:
			break;
	};
});
/*	// Get the modal
var modal = $('#myModal');

// Get the button that opens the modal
var btn = $("#myBtn");

// Get the <span> element that closes the modal
var span = $("#closer");

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
$("#closer").click(function() {
    modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {if (event.target == modal) {modal.style.display = "none";}}});*/