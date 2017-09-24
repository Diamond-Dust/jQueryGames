var turnColour = 'W';
var currentPiece;
var didCastleMove = [0,0,0,0,0,0];

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
			
			//Move up
			var checkingSquare = $(this);
			while((!(checkingSquare.hasClass('I'))) && (checkingSquare.prev().attr('class').split(' ')[checkingSquare.prev().attr('class').split(' ').length-1].substring(1, checkingSquare.prev().attr('class').split(' ')[checkingSquare.prev().attr('class').split(' ').length-1].length)!='King') && (checkingSquare.prev().attr('class').split(' ')[1] == $(this).attr('class').split(' ')[1]) && (checkingSquare.prev().attr('class').split(' ')[checkingSquare.prev().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
			{
				checkingSquare = checkingSquare.prev();
				if(!(checkingSquare.hasClass('empty')))
				{
					checkingSquare.toggleClass('possible');
					break;
				}
				else
					checkingSquare.toggleClass('possible');
			}
			
			//Move down
			checkingSquare = $(this);
			while((!(checkingSquare.hasClass('P'))) && (checkingSquare.next().attr('class').split(' ')[checkingSquare.next().attr('class').split(' ').length-1].substring(1, checkingSquare.next().attr('class').split(' ')[checkingSquare.next().attr('class').split(' ').length-1].length)!='King') && (checkingSquare.next().attr('class').split(' ')[1] == $(this).attr('class').split(' ')[1]) && (checkingSquare.next().attr('class').split(' ')[checkingSquare.next().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
			{
				checkingSquare = checkingSquare.next();
				if(!(checkingSquare.hasClass('empty')))
				{
					checkingSquare.toggleClass('possible');
					break;
				}
				else
					checkingSquare.toggleClass('possible');
			}
			
			//Move right
			checkingSquare = $(this);
			while((!(checkingSquare.hasClass('H'))) && (checkingSquare.next().next().next().next().next().next().next().next().attr('class').split(' ')[checkingSquare.next().next().next().next().next().next().next().next().attr('class').split(' ').length-1].substring(1, checkingSquare.next().next().next().next().next().next().next().next().attr('class').split(' ')[checkingSquare.next().next().next().next().next().next().next().next().attr('class').split(' ').length-1].length)!='King') && (checkingSquare.next().next().next().next().next().next().next().next().attr('class').split(' ')[2] == $(this).attr('class').split(' ')[2]) && (checkingSquare.next().next().next().next().next().next().next().next().attr('class').split(' ')[checkingSquare.next().next().next().next().next().next().next().next().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
			{
				checkingSquare = checkingSquare.next().next().next().next().next().next().next().next();
				if(!(checkingSquare.hasClass('empty')))
				{
					checkingSquare.toggleClass('possible');
					break;
				}
				else
					checkingSquare.toggleClass('possible');
			}
			
			//Move left
			checkingSquare = $(this);
			while((!(checkingSquare.hasClass('A'))) && (checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].substring(1, checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].length)!='King') && (checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[2] == $(this).attr('class').split(' ')[2]) && (checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
			{
				checkingSquare = checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev();
				if(!(checkingSquare.hasClass('empty')))
				{
					checkingSquare.toggleClass('possible');
					break;
				}
				else
					checkingSquare.toggleClass('possible');
			}
			
			break;
			
		//Knights
		case 'Knight':
			
			//|/.
			if((!($(this).is('.A,.O,.P'))) && ($(this).prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].substring(1, $(this).prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].length)!='King') && ($(this).prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1][0] != $(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
				$(this).prev().prev().prev().prev().prev().prev().toggleClass('possible');
			
			//-/.
			if((!($(this).is('.A,.B,.P'))) && ($(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].substring(1, $(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].length)!='King') && ($(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1][0] != $(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
				$(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().toggleClass('possible');
			
			//.\|
			if((!($(this).is('.H,.O,.P'))) && ($(this).next().next().next().next().next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().next().next().next().next().attr('class').split(' ').length-1].substring(1, $(this).next().next().next().next().next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().next().next().next().next().attr('class').split(' ').length-1].length)!='King') && ($(this).next().next().next().next().next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().next().next().next().next().attr('class').split(' ').length-1][0] != $(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
				$(this).next().next().next().next().next().next().next().next().next().next().toggleClass('possible');
			
			//.\-
			if((!($(this).is('.H,.G,.P'))) && ($(this).next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().attr('class').split(' ').length-1].substring(1, $(this).next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().attr('class').split(' ').length-1].length)!='King') && ($(this).next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().attr('class').split(' ').length-1][0] != $(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
				$(this).next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().toggleClass('possible');
			
			//./|
			if((!($(this).is('.H,.I,.J'))) && ($(this).next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().attr('class').split(' ').length-1].substring(1, $(this).next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().attr('class').split(' ').length-1].length)!='King') && ($(this).next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().attr('class').split(' ').length-1][0] != $(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
				$(this).next().next().next().next().next().next().toggleClass('possible');
			
			//./-
			if((!($(this).is('.G,.H,.I'))) && ($(this).next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().attr('class').split(' ').length-1].substring(1, $(this).next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().attr('class').split(' ').length-1].length)!='King') && ($(this).next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().attr('class').split(' ').length-1][0] != $(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
				$(this).next().next().next().next().next().next().next().next().next().next().next().next().next().next().next().toggleClass('possible');
			
			//|\.
			if((!($(this).is('.A,.I,.J'))) && ($(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].substring(1, $(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].length)!='King') && ($(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1][0] != $(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
				$(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().toggleClass('possible');
			
			//-\.
			if((!($(this).is('.A,.B,.I'))) && ($(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].substring(1, $(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].length)!='King') && ($(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1][0] != $(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
				$(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().toggleClass('possible');
			
			break;
			
		//Bishops
		case 'Bishop':
			
			//Move right-up
			checkingSquare = $(this);
			while((!(checkingSquare.hasClass('I'))) && (!(checkingSquare.hasClass('H'))) && (checkingSquare.next().next().next().next().next().next().next().attr('class').split(' ')[checkingSquare.next().next().next().next().next().next().next().attr('class').split(' ').length-1].substring(1, checkingSquare.next().next().next().next().next().next().next().attr('class').split(' ')[checkingSquare.next().next().next().next().next().next().next().attr('class').split(' ').length-1].length)!='King') && (checkingSquare.next().next().next().next().next().next().next().attr('class').split(' ')[checkingSquare.next().next().next().next().next().next().next().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
			{
				checkingSquare = checkingSquare.next().next().next().next().next().next().next();
				if(!(checkingSquare.hasClass('empty')))
				{
					checkingSquare.toggleClass('possible');
					break;
				}
				else
					checkingSquare.toggleClass('possible');
			}
			
			//Move left-up
			checkingSquare = $(this);
			while((!(checkingSquare.hasClass('I'))) && (!(checkingSquare.hasClass('A'))) && (checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].substring(1, checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].length)!='King') && (checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
			{
				checkingSquare = checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().prev();
				if(!(checkingSquare.hasClass('empty')))
				{
					checkingSquare.toggleClass('possible');
					break;
				}
				else
					checkingSquare.toggleClass('possible');
			}
			
			//Move left-down
			checkingSquare = $(this);
			while((!(checkingSquare.hasClass('P'))) && (!(checkingSquare.hasClass('A'))) && (checkingSquare.prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[checkingSquare.prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].substring(1, checkingSquare.prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[checkingSquare.prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].length)!='King') && (checkingSquare.prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[checkingSquare.prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
			{
				checkingSquare = checkingSquare.prev().prev().prev().prev().prev().prev().prev();
				if(!(checkingSquare.hasClass('empty')))
				{
					checkingSquare.toggleClass('possible');
					break;
				}
				else
					checkingSquare.toggleClass('possible');
			}
			
			//Move right-down
			checkingSquare = $(this);
			while((!(checkingSquare.hasClass('P'))) && (!(checkingSquare.hasClass('H'))) && (checkingSquare.next().next().next().next().next().next().next().next().next().attr('class').split(' ')[checkingSquare.next().next().next().next().next().next().next().next().next().attr('class').split(' ').length-1].substring(1, checkingSquare.next().next().next().next().next().next().next().next().next().attr('class').split(' ')[checkingSquare.next().next().next().next().next().next().next().next().next().attr('class').split(' ').length-1].length)!='King') && (checkingSquare.next().next().next().next().next().next().next().next().next().attr('class').split(' ')[checkingSquare.next().next().next().next().next().next().next().next().next().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
			{
				checkingSquare = checkingSquare.next().next().next().next().next().next().next().next().next();
				if(!(checkingSquare.hasClass('empty')))
				{
					checkingSquare.toggleClass('possible');
					break;
				}
				else
					checkingSquare.toggleClass('possible');
			}
			
			break;
			
		//Queens
		case 'Queen':
		
			//Move up
			checkingSquare = $(this);
			while((!(checkingSquare.hasClass('I'))) && (checkingSquare.prev().attr('class').split(' ')[checkingSquare.prev().attr('class').split(' ').length-1].substring(1, checkingSquare.prev().attr('class').split(' ')[checkingSquare.prev().attr('class').split(' ').length-1].length)!='King') && (checkingSquare.prev().attr('class').split(' ')[1] == $(this).attr('class').split(' ')[1]) && (checkingSquare.prev().attr('class').split(' ')[checkingSquare.prev().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
			{
				checkingSquare = checkingSquare.prev();
				if(!(checkingSquare.hasClass('empty')))
				{
					checkingSquare.toggleClass('possible');
					break;
				}
				else
					checkingSquare.toggleClass('possible');
			}
			
			//Move down
			checkingSquare = $(this);
			while((!(checkingSquare.hasClass('P'))) && (checkingSquare.next().attr('class').split(' ')[checkingSquare.next().attr('class').split(' ').length-1].substring(1, checkingSquare.next().attr('class').split(' ')[checkingSquare.next().attr('class').split(' ').length-1].length)!='King') && (checkingSquare.next().attr('class').split(' ')[1] == $(this).attr('class').split(' ')[1]) && (checkingSquare.next().attr('class').split(' ')[checkingSquare.next().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
			{
				checkingSquare = checkingSquare.next();
				if(!(checkingSquare.hasClass('empty')))
				{
					checkingSquare.toggleClass('possible');
					break;
				}
				else
					checkingSquare.toggleClass('possible');
			}
			
			//Move right
			checkingSquare = $(this);
			while((!(checkingSquare.hasClass('H'))) && (checkingSquare.next().next().next().next().next().next().next().next().attr('class').split(' ')[checkingSquare.next().next().next().next().next().next().next().next().attr('class').split(' ').length-1].substring(1, checkingSquare.next().next().next().next().next().next().next().next().attr('class').split(' ')[checkingSquare.next().next().next().next().next().next().next().next().attr('class').split(' ').length-1].length)!='King') && (checkingSquare.next().next().next().next().next().next().next().next().attr('class').split(' ')[2] == $(this).attr('class').split(' ')[2]) && (checkingSquare.next().next().next().next().next().next().next().next().attr('class').split(' ')[checkingSquare.next().next().next().next().next().next().next().next().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
			{
				checkingSquare = checkingSquare.next().next().next().next().next().next().next().next();
				if(!(checkingSquare.hasClass('empty')))
				{
					checkingSquare.toggleClass('possible');
					break;
				}
				else
					checkingSquare.toggleClass('possible');
			}
			
			//Move left
			checkingSquare = $(this);
			while((!(checkingSquare.hasClass('A'))) && (checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].substring(1, checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].length)!='King') && (checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[2] == $(this).attr('class').split(' ')[2]) && (checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
			{
				checkingSquare = checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev();
				if(!(checkingSquare.hasClass('empty')))
				{
					checkingSquare.toggleClass('possible');
					break;
				}
				else
					checkingSquare.toggleClass('possible');
			}
			
			//Move right-up
			checkingSquare = $(this);
			while((!(checkingSquare.hasClass('I'))) && (!(checkingSquare.hasClass('H'))) && (checkingSquare.next().next().next().next().next().next().next().attr('class').split(' ')[checkingSquare.next().next().next().next().next().next().next().attr('class').split(' ').length-1].substring(1, checkingSquare.next().next().next().next().next().next().next().attr('class').split(' ')[checkingSquare.next().next().next().next().next().next().next().attr('class').split(' ').length-1].length)!='King') && (checkingSquare.next().next().next().next().next().next().next().attr('class').split(' ')[checkingSquare.next().next().next().next().next().next().next().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
			{
				checkingSquare = checkingSquare.next().next().next().next().next().next().next();
				if(!(checkingSquare.hasClass('empty')))
				{
					checkingSquare.toggleClass('possible');
					break;
				}
				else
					checkingSquare.toggleClass('possible');
			}
			
			//Move left-up
			checkingSquare = $(this);
			while((!(checkingSquare.hasClass('I'))) && (!(checkingSquare.hasClass('A'))) && (checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].substring(1, checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].length)!='King') && (checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
			{
				checkingSquare = checkingSquare.prev().prev().prev().prev().prev().prev().prev().prev().prev();
				if(!(checkingSquare.hasClass('empty')))
				{
					checkingSquare.toggleClass('possible');
					break;
				}
				else
					checkingSquare.toggleClass('possible');
			}
			
			//Move left-down
			checkingSquare = $(this);
			while((!(checkingSquare.hasClass('P'))) && (!(checkingSquare.hasClass('A'))) && (checkingSquare.prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[checkingSquare.prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].substring(1, checkingSquare.prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[checkingSquare.prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].length)!='King') && (checkingSquare.prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[checkingSquare.prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
			{
				checkingSquare = checkingSquare.prev().prev().prev().prev().prev().prev().prev();
				if(!(checkingSquare.hasClass('empty')))
				{
					checkingSquare.toggleClass('possible');
					break;
				}
				else
					checkingSquare.toggleClass('possible');
			}
			
			//Move right-down
			checkingSquare = $(this);
			while((!(checkingSquare.hasClass('P'))) && (!(checkingSquare.hasClass('H'))) && (checkingSquare.next().next().next().next().next().next().next().next().next().attr('class').split(' ')[checkingSquare.next().next().next().next().next().next().next().next().next().attr('class').split(' ').length-1].substring(1, checkingSquare.next().next().next().next().next().next().next().next().next().attr('class').split(' ')[checkingSquare.next().next().next().next().next().next().next().next().next().attr('class').split(' ').length-1].length)!='King') && (checkingSquare.next().next().next().next().next().next().next().next().next().attr('class').split(' ')[checkingSquare.next().next().next().next().next().next().next().next().next().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
			{
				checkingSquare = checkingSquare.next().next().next().next().next().next().next().next().next();
				if(!(checkingSquare.hasClass('empty')))
				{
					checkingSquare.toggleClass('possible');
					break;
				}
				else
					checkingSquare.toggleClass('possible');
			}
			
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
			
			//Marking whether castling is possible
			if(currentPiece.is('.A.I')) 
				didCastleMove[0]=1;
			else if(currentPiece.is('.E.I'))
				didCastleMove[1]=1;
			else if(currentPiece.is('.H.I'))
				didCastleMove[2]=1;
			else if(currentPiece.is('.H.P'))
				didCastleMove[3]=1;
			else if(currentPiece.is('.E.P'))
				didCastleMove[0]=1;
			else if(currentPiece.is('.A.P'))
				didCastleMove[5]=1;
			
			//Castling
			
			
			//enPassant pawn removal
			if((currentPiece.attr('class').split(' ')[currentPiece.attr('class').split(' ').length-1] == 'BPawn') && ($(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1]=='enPassantW'))
			{
				$(this).prev().toggleClass('WPawn');
				$(this).prev().toggleClass('empty');
				$(this).toggleClass('empty');
			}
			else if((currentPiece.attr('class').split(' ')[currentPiece.attr('class').split(' ').length-1] == 'WPawn') && ($(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1]=='enPassantB'))
			{
				$(this).next().toggleClass('BPawn');
				$(this).next().toggleClass('empty');
				$(this).toggleClass('empty');
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