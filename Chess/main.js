var turnColour = 'W';
var currentPiece;
var didCastleMove = [0,0,0,0,0,0];
var notationLine ="";

var ClockB = {
    totalSeconds: 1200,
	time: "0",

    start: function () {
        var self = this;

        this.interval = setInterval(function () {
            self.totalSeconds -= 1;

			self.time = (Math.floor(self.totalSeconds / 3600) + ':' + Math.floor(self.totalSeconds / 60 % 60) + ':' + parseInt(self.totalSeconds % 60)).toString();
			console.log(self.time);
			$(".Bl.Timer").text(self.time);
		}, 1000);
    },

    pause: function () {
        clearInterval(this.interval);
        delete this.interval;
		$(".Bl.Timer").text(self.time);
    },

    resume: function () {
        if (!this.interval) this.start();
    }
};
ClockB.start();


var ClockW = {
    totalSeconds: 1200,
	time: "0",

    start: function () {
        var self = this;

        this.interval = setInterval(function () {
            self.totalSeconds -= 1;

			self.time = (Math.floor(self.totalSeconds / 3600) + ':' + Math.floor(self.totalSeconds / 60 % 60) + ':' + parseInt(self.totalSeconds % 60)).toString();
			console.log(self.time);
			$(".Wh.Timer").text(self.time);
		}, 1000);
    },

    pause: function () {
        clearInterval(this.interval);
        delete this.interval;
		$(".Wh.Timer").text(self.time);
    },

    resume: function () {
        if (!this.interval) this.start();
    }
};
ClockW.start();

ClockB.pause();
ClockW.pause();
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
	
	//Setting possible moves
	switch(Type.slice(1)) {
		
		//Pawns
		case 'Pawn':
			//White pawn
			if(Type[0] == 'W') {
				//Double move
				if(($(this).hasClass('O')) && ($(this).prev().hasClass('empty')) && ($(this).prev().prev().hasClass('empty')))  {
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
				if(($(this).hasClass('J')) && ($(this).next().hasClass('empty')) && ($(this).next().next().hasClass('empty'))) {
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
			
			//Move up
			if((!($(this).hasClass('I'))) && ($(this).prev().attr('class').split(' ')[$(this).prev().attr('class').split(' ').length-1].substring(1, $(this).prev().attr('class').split(' ')[$(this).prev().attr('class').split(' ').length-1].length)!='King') && ($(this).prev().attr('class').split(' ')[1] == $(this).attr('class').split(' ')[1]) && ($(this).prev().attr('class').split(' ')[$(this).prev().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
				$(this).prev().toggleClass('possible');
			
			//Move down
			if((!($(this).hasClass('P'))) && ($(this).next().attr('class').split(' ')[$(this).next().attr('class').split(' ').length-1].substring(1, $(this).next().attr('class').split(' ')[$(this).next().attr('class').split(' ').length-1].length)!='King') && ($(this).next().attr('class').split(' ')[1] == $(this).attr('class').split(' ')[1]) && ($(this).next().attr('class').split(' ')[$(this).next().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
				$(this).next().toggleClass('possible');
			
			//Move right
			if((!($(this).hasClass('H'))) && ($(this).next().next().next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().next().next().attr('class').split(' ').length-1].substring(1, $(this).next().next().next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().next().next().attr('class').split(' ').length-1].length)!='King') && ($(this).next().next().next().next().next().next().next().next().attr('class').split(' ')[2] == $(this).attr('class').split(' ')[2]) && ($(this).next().next().next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().next().next().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
				$(this).next().next().next().next().next().next().next().next().toggleClass('possible');
			
			//Move left
			if((!($(this).hasClass('A'))) && ($(this).prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].substring(1, $(this).prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].length)!='King') && ($(this).prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[2] == $(this).attr('class').split(' ')[2]) && ($(this).prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
				$(this).prev().prev().prev().prev().prev().prev().prev().prev().toggleClass('possible');
			
			//Move right-up
			if((!($(this).hasClass('I'))) && (!($(this).hasClass('H'))) && ($(this).next().next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().next().attr('class').split(' ').length-1].substring(1, $(this).next().next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().next().attr('class').split(' ').length-1].length)!='King') && ($(this).next().next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().next().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
				$(this).next().next().next().next().next().next().next().toggleClass('possible');
			
			//Move left-up
			if((!($(this).hasClass('I'))) && (!($(this).hasClass('A'))) && ($(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].substring(1, $(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].length)!='King') && ($(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
				$(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().toggleClass('possible');
			
			//Move left-down
			if((!($(this).hasClass('P'))) && (!($(this).hasClass('A'))) && ($(this).prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].substring(1, $(this).prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1].length)!='King') && ($(this).prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ')[$(this).prev().prev().prev().prev().prev().prev().prev().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
				$(this).prev().prev().prev().prev().prev().prev().prev().toggleClass('possible');
			
			//Move right-down
			if((!($(this).hasClass('P'))) && (!($(this).hasClass('H'))) && ($(this).next().next().next().next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().next().next().next().attr('class').split(' ').length-1].substring(1, $(this).next().next().next().next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().next().next().next().attr('class').split(' ').length-1].length)!='King') && ($(this).next().next().next().next().next().next().next().next().next().attr('class').split(' ')[$(this).next().next().next().next().next().next().next().next().next().attr('class').split(' ').length-1][0]!=$(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-1][0]))
				$(this).next().next().next().next().next().next().next().next().next().toggleClass('possible');
			
			//Castling check
			if(Type[0] == 'W')
			{
				if((didCastleMove[5]==0) && (didCastleMove[4]==0) && $('.B.P').hasClass('empty')&& $('.C.P').hasClass('empty')&& $('.D.P').hasClass('empty'))
					$('.C.P').toggleClass('possible');
				if((didCastleMove[3]==0) && (didCastleMove[4]==0) && $('.F.P').hasClass('empty')&& $('.G.P').hasClass('empty'))
					$('.G.P').toggleClass('possible');
			}
			else
			{
				if((didCastleMove[0]==0) && (didCastleMove[1]==0) && $('.B.I').hasClass('empty')&& $('.C.I').hasClass('empty')&& $('.D.I').hasClass('empty'))
					$('.C.I').toggleClass('possible');
				if((didCastleMove[2]==0) && (didCastleMove[1]==0) && $('.F.I').hasClass('empty')&& $('.G.I').hasClass('empty'))
					$('.G.I').toggleClass('possible');
			}
			
			break;
		
		//Second click - move
		case 'ossible':
			//Prevent capture of the King if I forgot about the move
			if(($(this).hasClass('BKing')) || ($(this).hasClass('WKing')))
				return;
			
			//Notation
			notationLine = "";
			if(currentPiece.attr('class').split(' ')[currentPiece.attr('class').split(' ').length-1][1] != 'P')
				notationLine += currentPiece.attr('class').split(' ')[currentPiece.attr('class').split(' ').length-1][1];
			notationLine += currentPiece.attr('class').split(' ')[1].toLowerCase();
			notationLine += 9-((currentPiece.attr('class').split(' ')[2]).charCodeAt(0)-72);
			if($(this).attr('class').split(' ')[$(this).attr('class').split(' ').length-2] == 'empty')
				notationLine += '-';
			else
				notationLine += ':';
			notationLine += $(this).attr('class').split(' ')[1].toLowerCase();
			notationLine += 9-(($(this).attr('class').split(' ')[2]).charCodeAt(0)-72);
			console.log(notationLine);
			
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
				didCastleMove[4]=1;
			else if(currentPiece.is('.A.P'))
				didCastleMove[5]=1;
			
			//Castling
			if(currentPiece.hasClass("BKing"))
			{
				if($(this).is('.C.I'))
				{
					$('.D.I').toggleClass('empty');
					$('.D.I').toggleClass($('.A.I').attr('class').split(' ')[$('.A.I').attr('class').split(' ').length-1]);
					$('.A.I').toggleClass($('.A.I').attr('class').split(' ')[$('.A.I').attr('class').split(' ').length-1]);
					$('.A.I').toggleClass('empty');
					didCastleMove[0]=1;
					didCastleMove[1]=1;
				}
				else if($(this).is('.G.I'))
				{
					$('.F.I').toggleClass('empty');
					$('.F.I').toggleClass($('.H.I').attr('class').split(' ')[$('.H.I').attr('class').split(' ').length-1]);
					$('.H.I').toggleClass($('.H.I').attr('class').split(' ')[$('.H.I').attr('class').split(' ').length-1]);
					$('.H.I').toggleClass('empty');
					didCastleMove[2]=1;
					didCastleMove[1]=1;
				}
			}
			else if(currentPiece.hasClass('WKing'))
			{
				if($(this).is('.C.P'))
				{
					$('.D.P').toggleClass('empty');
					$('.D.P').toggleClass($('.A.P').attr('class').split(' ')[$('.A.P').attr('class').split(' ').length-1]);
					$('.A.P').toggleClass($('.A.P').attr('class').split(' ')[$('.A.P').attr('class').split(' ').length-1]);
					$('.A.P').toggleClass('empty');
					didCastleMove[5]=1;
					didCastleMove[4]=1;
				}
				else if($(this).is('.G.P'))
				{
					$('.F.P').toggleClass('empty');
					$('.F.P').toggleClass($('.H.P').attr('class').split(' ')[$('.H.P').attr('class').split(' ').length-1]);
					$('.H.P').toggleClass($('.H.P').attr('class').split(' ')[$('.H.P').attr('class').split(' ').length-1]);
					$('.H.P').toggleClass('empty');
					didCastleMove[3]=1;
					didCastleMove[4]=1;
				}
			}
			
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
			currentPiece.toggleClass('empty');
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