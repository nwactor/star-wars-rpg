function character(hp, attackPower, counterPower, panel) {
	this.hp = hp;
	this.attackPower = attackPower;
	this.counterPower = counterPower;
	this.panel = panel;
}

var roster = [];

roster.push(new character(150, 5, 15, $('#fighter-1'))); //Luke
roster.push(new character(150, 3, 20, $('#fighter-2'))); //Anakin
roster.push(new character(150, 3, 20, $('#fighter-3'))); //Mace Windu
roster.push(new character(200, 3, 15, $('#fighter-4'))); //Darth Maul

var playerCharacter;
var defender;
var gameStarted = false;
var enemySelected = false;

function updateHealth() {
	for(var i = 0; i < roster.length; i++) {
		$('#health-' + (i + 1)).html(roster[i].hp);
	}
}

updateHealth();

//starting the game when a character is clicked
$('.character-panel').on('click', function() {
	if(!gameStarted) {
		gameStarted = true;
		//set the player character
		playerCharacter = getCharacterFromClick($(this));
		//move the character panels to the appropriate spots
		moveChosenCharacters();
		//make playing field visible and collapse "choose character" section
		$('.mode-1').css('display', 'none');
		$('.mode-2').css('display', 'inline');
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

//have the two characters fight when the attack button is pressed
$('#attack-button').on('click', function() {
	$('#battle-message').css('visibility', 'visible');
	if(enemySelected) {
		fight();
	} else {
		$('#battle-message').html("No enemy here.");
	}
	//check for win
	if(playerCharacter.health != 0 && roster.every(function(fighter) {
		if(fighter != playerCharacter) { return fighter.hp === 0; } 
		else { return true; }
	})) {
		showWin();
	}

});

function fight() {
	//each attacks
	defender.hp -= playerCharacter.attackPower;
	if(defender.hp < 0) { defender.hp = 0; }
	
	playerCharacter.hp -= defender.counterPower;
	if(playerCharacter.hp < 0) { player.hp = 0; }

	updateHealth();	
	playerCharacter.attackPower *= 2;

	getBattleMessage();

	//check for someone being defeated
	if(playerCharacter.hp === 0) {
		showGameOver();
	} else if(defender.hp === 0) {
		defeatEnemy(defender);
	}
}

//remove defeated enemry from the game
function defeatEnemy(enemy) {
	$('#battle-message').append("<br>You defeated " + 
		defender.panel.children('.name').text() + "! Choose next opponent.");
	$(enemy.panel).remove();
	defender = null;
	enemySelected = false;
}

//Updates the battle message
function getBattleMessage() {
	$('#battle-message').html("You attacked " + 
		defender.panel.children('.name').text() + "for " + 
		(playerCharacter.attackPower / 2) + " damage.<br>" + 
		defender.panel.children('.name').text() +
		" attacked you for " + defender.counterPower + " damage.");
}

//Show game over message
function showGameOver() {
	$('#battle-message').append("<br>" +
		defender.panel.children('.name').text() + 
		" defeated you. Game over.");
	showResetButton();
}

//Show win message
function showWin() {
	$('#battle-message').append("<br>You won!!!!");
	showResetButton();
	// showFinalBoss();
}

function showResetButton() {
	$('#reset-button').css('visibility', 'visible');
}

$('#reset-button').on('click', function() {
	location.reload();
});

// function showFinalBoss() {
// 	var warning = $('<span>');
// 	warning.text('<br>But wait. A new challenger appears!');
// 	warning.css('color', 'red');
// 	warning.css('font-size', '20px');
// 	$('#battle-message').append(warning);
// 	showFinalBoss();
// }