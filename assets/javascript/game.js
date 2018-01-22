function character(hp, attackPower, counterPower, panel) {
	this.hp = hp;
	this.attackPower = attackPower;
	this.counterPower = counterPower;
	this.panel = panel;
}

var roster = [];

roster.push(new character(100, 10, 10, $('#fighter-1'))); //Luke
roster.push(new character(100, 10, 10, $('#fighter-2'))); //Anakin
roster.push(new character(100, 10, 10, $('#fighter-3'))); //Mace Windu
roster.push(new character(100, 10, 10, $('#fighter-4'))); //Darth Maul

var playerCharacter;
var defender;
var gameStarted = false;
var enemySelected = false;

//display health
for(var i = 0; i < roster.length; i++) {
	$('#health-' + (i + 1)).html(roster[i].hp);
}

//starting the game when a character is clicked
$('.character-panel').on('click', function() {
	if(!gameStarted) {
		gameStarted = true;
		//set the player character
		playerCharacter = getCharacterFromClick($(this));
		//move the character panels to the appropriate spots
		moveChosenCharacters();
		//make playing field visible and collapse "choose character" section
		$('.mode-1').css('visibility', 'collapse');
		$('.mode-2').css('visibility', 'visible');
	}
});

function getCharacterFromClick(clickedPanel) {
	for(var i = 0; i < roster.length; i++) {
		if(roster[i].panel.get(0) === clickedPanel.get(0)) {
			return roster[i];
		}
	}
}

function moveChosenCharacters() {
	$('#player-slot').html(playerCharacter.panel);
	for(var i = 0; i < roster.length; i++) {
		if(roster[i] != playerCharacter) {
			roster[i].panel.addClass("enemy-panel")
			$('#enemy-slots').append(roster[i].panel);
		}
	}
}

//move the selected enemy to the fight area when it's clicked
$('#enemy-slots').on('click', '.enemy-panel', function() {
	if(!enemySelected) {
		enemySelected = true;
		defender = getCharacterFromClick($(this));
		$('#defender-slot').html(defender.panel);
		defender.panel.addClass('defender-panel');
		defender.panel.children('h3').css('color', 'white');
	}
});

//
$('#attack-button').on('click', function() {
	if(enemySelected) {
		
	}
});