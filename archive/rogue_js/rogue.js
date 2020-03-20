var testData = {
	/* 
	 * For testing purposes, this data will not be loaded using proper methods
	 * and instead just hardcoded.
	 */

	"map1.txt": `####################
# S               #
################# #
                # #
                # #
                # #
                # #
                # #
                # #
 ################1#############
 #         D                  K#
 # ############################
 # #
 # #
 # #
 # ############################
 #                           2#
 # ############################
 # #
 # #
 # #
 # #
 # #
 # #
 # #
 # #
 # #
 # #
 # #
 # #
 # #
 #F#`,
 	"map1.json": `{"level":1,"levelName":"Test","actions":{"1":{"onWalk":["message","delete"],"messageContent":"Which way will it be?"},"2":{"onSight":["message","delete"],"messageContent":"It's a dead end!"},"D":{"onSight":["message"],"messageContent":"This door requires a key!"},"K":{"onSight":["pickup"],"pickupName":"key"}},"requirements":{"D":{"check": "onSight","inInventory":"key","onFailure":{"onWalk":["immovable"]},"onSuccess":{"onSight":["delete","message"],"messageContent":"The door opens."}}}}`,
 	"map2.txt": `
                  1

    S



            ###########
            #         #
            #         #
            D     F   #  4
    2       #         #
            #         #
            ###########
                         5

        3


               K`,
     "map2.json": `{"level":2,"levelName":"Test 2","actions":{"1":{"onWalk":["message"],"messageContent":"Which way will it be?"},"2":{"onSight":["message"],"messageContent":"It's a dead end!"},"3":{"onSight":["message"],"messageContent":"I can feel it, it's somewhere around here!"},"4":{"onSight":["message"],"messageContent":"Sorry, there's nothing back here"},"5":{"onSight":["message"],"messageContent":"This isn't funny anymore."},"D":{"onSight":["message"],"messageContent":"This door requires a key!"},"K":{"onSight":["pickup"],"pickupName":"key"}},"requirements":{"D":{"check":"onSight","inInventory":"key","onFailure":{"onWalk":["immovable"]},"onSuccess":{"onSight":["delete","message"],"messageContent":"The door opens."}}}}`
 };

var DEBUG_ENABLED = false;

var _debug = {
	printCharacterMatrix: function() {
		if (DEBUG_ENABLED == true) {
			console.log(`[DEBUG:printCharacterMatrix] ${characterMatrix[0][0]["char"]}\t${characterMatrix[0][1]["char"]}\t${characterMatrix[0][2]["char"]}`);
			console.log(`[DEBUG:printCharacterMatrix] ${characterMatrix[1][0]["char"]}\t${characterMatrix[1][1]["char"]}\t${characterMatrix[1][2]["char"]}`);
			console.log(`[DEBUG:printCharacterMatrix] ${characterMatrix[2][0]["char"]}\t${characterMatrix[2][1]["char"]}\t${characterMatrix[2][2]["char"]}`);
		}
	},
	printCharacterCoords: function() {
		if (DEBUG_ENABLED == true) {
			console.log(`[DEBUG:printCharacterCoords] ${characterCoords[0]},${characterCoords[1]}`)
		}
	}
};

var gameWindow = document.getElementById("gameWindow");
var levelInfo = document.getElementById("levelInfo");
var messageWindow = document.getElementById("messageWindow");

var constructedMap = [];
var revealedMap = [];
var characterMatrix = [];
var characterCoords = [];
var spawnpointCoords = [];
var characterMap = [];
var characterInventory = [];
var currentMapFile = testData["map1.txt"];
var currentMapActions = JSON.parse(testData["map1.json"]);
var freeToMove = false;
var messageCount = 0;
var keyTimeout = {};

levelInfo.innerHTML = `Level ${currentMapActions.level} - ${currentMapActions.levelName}`;

/*
 * Reserved characters -
 * S: spawnpoint
 * F: level completion
 * #: wall
 *  : space
 * @: player
 * OUT_OF_BOUNDS: internal character meaning a block in the matrix is out of bounds (32x32 map)
 */

var resevedCharacters = {
	"S": {"onStart":"spawn"},
	"F": {"onWalk":"finish"},
	"#": {"onWalk":"immovable"},
	" ": {},
	"OUT_OF_BOUNDS": {"onWalk": "immovable"}
}

var resevedCharactersArray = ['S', 'F', '#', ' ', '@', 'OUT_OF_BOUNDS'];

/*
 * Level logic:
 * level: (int) level number
 * levelName: (str) level name
 * actions: (obj) actions per each non-reserved character
 * 	(str) character: (obj) action
 * requirements: (obj)
 *  (str) character: 
 *   (obj) check: (str) time,
 *   (obj) onFailure: (obj) action
 *   (obj) onSuccess: (obj) action
 *
 * Action logic:
 * (str) character:
 *  (str) [onWalk, onSight]: (arr) actions [message, delete, pickup, immovable]
 *  (str) messageContent: (str) message content
 *  (str) pickupName: (str) pickup name
 *
 * Actions:
 * message - (onSight, onWalk): shows a message from messageContent in parent
 * delete - (onSight, onWalk): deletes all character objects
 * pickup - (onWalk): picks up character into inventory with pickupName in parent
 * immovable - (onWalk): does not let player past character
 *
 * Map logic:
 * Map file is made in a .txt, 32x32
 * Generated is a 2D matrix with each character representing something
 * Generated matrix:
 * [
 *  [{}, {}, {}...x32 (term on \n)],
 *  [{}, {}, {}...x32 (term on \n)],
 *  ...x32
 * ]
 */

// ----- Import ------
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}
// -------------------

var generateEmptyMapMatrix = function(x, y) {
	var arr = createArray(x, y);
	for (var i = 0; i < x; i++) {
		for (var j = 0; j < y; j++) {
			arr[i][j] = {"char": " "}
		}
	}
	return arr;
}

// mapFile - map file
// return: a character map
var generateCharacterMap = function(mapFile) {
	var mapPrimitive = [];
	var mapFull = {};
	for (var i = 0; i < mapFile.length; i++) {
		if (!mapPrimitive.includes(mapFile.charAt(i)))
			mapPrimitive.push(mapFile.charAt(i));
	}
	if (!mapPrimitive.includes("S")) throwError("Map doesn't have spawnpoint!")
	for (var i = 0; i < mapPrimitive.length; i++) {
		if (mapPrimitive[i] == "\n") // Newline isn't used in-game
			continue;
		if (resevedCharactersArray.includes(mapPrimitive[i])) {
			mapFull[mapPrimitive[i]] = resevedCharacters[mapPrimitive[i]];
		} else {
			try {
				mapFull[mapPrimitive[i]] = currentMapActions["actions"][mapPrimitive[i]];
			} catch {
				throwError("Undefined character!");
			}

			if (currentMapActions["requirements"].hasOwnProperty(mapPrimitive[i]))
				mapFull[mapPrimitive[i]]["requirements"] = currentMapActions["requirements"][mapPrimitive[i]]
			
		}
	}
	mapFull["OUT_OF_BOUNDS"] = resevedCharacters["OUT_OF_BOUNDS"]
	return mapFull;
};

var updateRevealedMap = function() {
	var matrixBeginOffsets = [characterCoords[0]-1, characterCoords[1]-1];
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (characterMatrix[i][j]["char"] == "OUT_OF_BOUNDS") {
				// Out of bounds map doesn't exist
				continue;
			}
			if (characterMatrix[i][j]["char"] == "S") {
				// Spawnpoints should be ignored, and are only used for the engine.
				revealedMap[matrixBeginOffsets[0] + i][matrixBeginOffsets[1] + j] = {char: " "};
				continue;
			}
			revealedMap[matrixBeginOffsets[0] + i][matrixBeginOffsets[1] + j] = characterMatrix[i][j];
		}
	}
}

var generateCharacterMatrix = function() {
	/* Matrix in relation to character position
	 * -1,-1	-1,0	-1,+1
	 * 0,-1		0,0		0,+1
	 * +1,-1	+1,0	+1,+1
	 *
	 * Matrix coordinates
	 * 0,0		0,1		0,2
	 * 1,0		1,1		1,2
	 * 2,0		2,1		2,2
	 *
	 * Character is always at 1,1
	 */

	 characterMatrix = generateEmptyMapMatrix(3, 3);

	 if (characterCoords[0] == 0) {
	 	// top row out of bounds
		characterMatrix[0][0] = {"char": "OUT_OF_BOUNDS"};
		characterMatrix[0][1] = {"char": "OUT_OF_BOUNDS"};
		characterMatrix[0][2] = {"char": "OUT_OF_BOUNDS"};
	 }

	 if (characterCoords[0] == 31) {
	 	// bottom row out of bounds
		characterMatrix[2][0] = {"char": "OUT_OF_BOUNDS"};
		characterMatrix[2][1] = {"char": "OUT_OF_BOUNDS"};
		characterMatrix[2][2] = {"char": "OUT_OF_BOUNDS"};
	 }

	 if (characterCoords[1] == 0) {
	 	// left column out of bounds
	 	characterMatrix[0][0] = {"char": "OUT_OF_BOUNDS"};
	 	characterMatrix[1][0] = {"char": "OUT_OF_BOUNDS"};
	 	characterMatrix[2][0] = {"char": "OUT_OF_BOUNDS"};
	 }

	 if (characterCoords[1] == 31) {
	 	// right column out of bounds
	 	characterMatrix[0][2] = {"char": "OUT_OF_BOUNDS"};
	 	characterMatrix[1][2] = {"char": "OUT_OF_BOUNDS"};
	 	characterMatrix[2][2] = {"char": "OUT_OF_BOUNDS"};
	 }

		characterMatrix[0][0] = characterMatrix[0][0]["char"] != "OUT_OF_BOUNDS" ? constructedMap[characterCoords[0]-1][characterCoords[1]-1] : {"char":"OUT_OF_BOUNDS"};
		characterMatrix[0][1] = characterMatrix[0][1]["char"] != "OUT_OF_BOUNDS" ? constructedMap[characterCoords[0]-1][characterCoords[1]] : {"char":"OUT_OF_BOUNDS"};
		characterMatrix[0][2] = characterMatrix[0][2]["char"] != "OUT_OF_BOUNDS" ? constructedMap[characterCoords[0]-1][characterCoords[1]+1] : {"char":"OUT_OF_BOUNDS"};
		characterMatrix[1][0] = characterMatrix[1][0]["char"] != "OUT_OF_BOUNDS" ? constructedMap[characterCoords[0]][characterCoords[1]-1] : {"char":"OUT_OF_BOUNDS"};

		characterMatrix[1][1] = {"char":"@"};

		characterMatrix[1][2] = characterMatrix[1][2]["char"] != "OUT_OF_BOUNDS" ? constructedMap[characterCoords[0]][characterCoords[1]+1] : {"char":"OUT_OF_BOUNDS"};
		characterMatrix[2][0] = characterMatrix[2][0]["char"] != "OUT_OF_BOUNDS" ? constructedMap[characterCoords[0]+1][characterCoords[1]-1] : {"char":"OUT_OF_BOUNDS"};
		characterMatrix[2][1] = characterMatrix[2][1]["char"] != "OUT_OF_BOUNDS" ? constructedMap[characterCoords[0]+1][characterCoords[1]+0] : {"char":"OUT_OF_BOUNDS"};
		characterMatrix[2][2] = characterMatrix[2][2]["char"] != "OUT_OF_BOUNDS" ? constructedMap[characterCoords[0]+1][characterCoords[1]+1] : {"char":"OUT_OF_BOUNDS"};
}

// mapFile - map file
// return: full map matrix from map file
var generateMapMatrix = function(mapFile) {
	var matrix = generateEmptyMapMatrix(32, 32);
	var x = 0;
	var y = 0;
	for (var i = 0; i < mapFile.length; i++) {
		if (mapFile.charAt(i) == "\n") {
			x++;
			y = 0;
		} else {
			matrix[x][y]["char"] = mapFile.charAt(i);
			if (mapFile.charAt(i) == "S") {
				spawnpointCoords = [x, y];
			}
			y++;
		}

	}
	return matrix;
};

var deleteBlock = function(block) {
	for (var i = 0; i < constructedMap.length; i++) {
		for (var j = 0; j < constructedMap[0].length; j++) {
			if (constructedMap[i][j]["char"] == block)
				constructedMap[i][j]["char"] = " ";
		}
	}
};

// direction - direction to where the character should move to
var moveChar = function(direction) {


	switch (direction) {
		case "up":
			if (characterMap[characterMatrix[0][1]["char"]]["onWalk"] == "immovable") {
				sendMessage("You can't move there.");
				return;
			}
			if (characterCoords[0] > 0) characterCoords[0]--;
			break;
		case "left":
			if (characterMap[characterMatrix[1][0]["char"]]["onWalk"] == "immovable") {
				sendMessage("You can't move there.");
				return;
			}
			if (characterCoords[1] > 0) characterCoords[1]--;
			break;
		case "right":
			if (characterMap[characterMatrix[1][2]["char"]]["onWalk"] == "immovable") {
				sendMessage("You can't move there.");
				return;
			}
			if (characterCoords[1] < 31) characterCoords[1]++;
			break;
		case "down":
			if (characterMap[characterMatrix[2][1]["char"]]["onWalk"] == "immovable") {
				sendMessage("You can't move there.");
				return;
			}
			if (characterCoords[0] < 31) characterCoords[0]++;
			break;
	}
	generateCharacterMatrix();

	var actionQueue = [];

	// requirement checks

	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (i == 1 && j == 1) continue;
			if (characterMap[characterMatrix[i][j]["char"]].hasOwnProperty("requirements")) {
				if (characterMap[characterMatrix[i][j]["char"]]["requirements"]["check"] == "onSight") {
					if (characterMap[characterMatrix[i][j]["char"]]["requirements"].hasOwnProperty("inInventory")) {
						if (characterInventory.includes(characterMap[characterMatrix[i][j]["char"]]["requirements"]["inInventory"])) {
							if (characterMap[characterMatrix[i][j]["char"]]["requirements"]["onSuccess"].hasOwnProperty("onWalk")) {
								characterMap[characterMatrix[i][j]["char"]]["onWalk"] = characterMap[characterMatrix[i][j]["char"]]["requirements"]["onSuccess"]["onWalk"];
							} else if (characterMap[characterMatrix[i][j]["char"]]["requirements"]["onSuccess"].hasOwnProperty("onSight")) {
								characterMap[characterMatrix[i][j]["char"]]["onSight"] = characterMap[characterMatrix[i][j]["char"]]["requirements"]["onSuccess"]["onSight"];
							}
						} else {
							if (characterMap[characterMatrix[i][j]["char"]]["requirements"]["onFailure"].hasOwnProperty("onWalk")) {
								characterMap[characterMatrix[i][j]["char"]]["onWalk"] = characterMap[characterMatrix[i][j]["char"]]["requirements"]["onFailure"]["onWalk"];
							} else if (characterMap[characterMatrix[i][j]["char"]]["requirements"]["onFailure"].hasOwnProperty("onSight")) {
								characterMap[characterMatrix[i][j]["char"]]["onSight"] = characterMap[characterMatrix[i][j]["char"]]["requirements"]["onFailure"]["onSight"];
							}
						}
					}
				}
			}
		}
	}


	// onSight operations

	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (i == 1 && j == 1) continue;
			if (characterMap[characterMatrix[i][j]["char"]].hasOwnProperty("onSight")) {
				for (var x = 0; x < characterMap[characterMatrix[i][j]["char"]]["onSight"].length; x++) {
					if (characterMap[characterMatrix[i][j]["char"]]["onSight"][x] == "message") {
						actionQueue.push({"message": characterMap[characterMatrix[i][j]["char"]]["messageContent"]})
					} else if (characterMap[characterMatrix[i][j]["char"]]["onSight"][x] == "pickup") {
						actionQueue.push({"pickup": characterMatrix[i][j]["char"], "name": characterMap[characterMatrix[i][j]["char"]]["pickupName"]})
					} else if (characterMap[characterMatrix[i][j]["char"]]["onSight"][x] == "delete") {
						actionQueue.push({"delete": characterMatrix[i][j]["char"]});
					}
				}
			}
		}
	}

	// onWalk operations

	if (constructedMap[characterCoords[0]][characterCoords[1]]["char"] == "F") {
		levelFinish(currentMapActions["level"]);
		return;
	}

	if (characterMap[constructedMap[characterCoords[0]][characterCoords[1]]["char"]].hasOwnProperty("onWalk")) {
		for (var x = 0; x < characterMap[constructedMap[characterCoords[0]][characterCoords[1]]["char"]]["onWalk"].length; x++) {
			if (characterMap[constructedMap[characterCoords[0]][characterCoords[1]]["char"]]["onWalk"][x] == "message") {
				actionQueue.push({"message": characterMap[constructedMap[characterCoords[0]][characterCoords[1]]["char"]]["messageContent"]})
			} else if (characterMap[constructedMap[characterCoords[0]][characterCoords[1]]["char"]]["onWalk"][x] == "pickup") {
				actionQueue.push({"pickup": constructedMap[characterCoords[0]][characterCoords[1]]["char"], "name": characterMap[constructedMap[characterCoords[0]][characterCoords[1]]["char"]]["pickupName"]})
			} else if (characterMap[constructedMap[characterCoords[0]][characterCoords[1]]["char"]]["onWalk"][x] == "delete") {
				actionQueue.push({"delete": constructedMap[characterCoords[0]][characterCoords[1]]["char"]});
			}
		}
	}

	/*
	 * actionQueue: a queue of all actions that will need to be done, after encountering a block
	 * [
	 *  {"message": messageContent},
	 *  {"pickup": char, "name": pickupName},
	 *  {"delete": char}
	 * ]
	 */
	
	for (var i = 0; i < actionQueue.length; i++) {
		if (actionQueue[i].hasOwnProperty("message")) {
			sendMessage(actionQueue[i]["message"]);
		} else if (actionQueue[i].hasOwnProperty("pickup")) {
			characterInventory.push(actionQueue[i]["name"]);
			deleteBlock(actionQueue[i]["pickup"]);
			generateCharacterMatrix();
			sendMessage(`You picked up a ${actionQueue[i]["name"]}!`);
		} else if (actionQueue[i].hasOwnProperty("delete")) {
			deleteBlock(actionQueue[i]["delete"]);
			generateEmptyMapMatrix();
		}
	}

	updateRevealedMap();
	updateWindow();
	_debug.printCharacterMatrix();
	_debug.printCharacterCoords();
};

var updateWindow = function() {
	gameWindow.innerHTML = "";
	for (var i = 0; i < revealedMap.length; i++) {
		for (var j = 0; j < revealedMap[0].length; j++) {
			//if (i == characterCoords[0] && j == characterCoords[1]) {
			//	gameWindow.innerHTML += "@";
			//} else {
				gameWindow.innerHTML += revealedMap[i][j]["char"];
			//}
		}
		gameWindow.innerHTML += "<br>";
	}
};

var sendMessage = function(msg) {
	messageCount++;
	if (messageCount > 31) {
		messageWindow.innerHTML = messageWindow.innerHTML.substr(messageWindow.innerHTML.search("<br>")+4, messageWindow.innerHTML.length);
		messageCount--;
	}
	messageWindow.innerHTML += `${msg}<br>`;
};

var throwError = function(msg) {
	messageWindow.innerHTML += `[Engine error] ${msg}\n`;
	console.log(`[Engine error] ${msg}<br>`);
};

var loadNextLevel = function(lvl) {
	if (!testData.hasOwnProperty(`map${lvl}.txt`)) {
		sendMessage("Thanks for playing!");
		document.body.onkeydown = function(e) {}
		return;
	}

	constructedMap = [];
	revealedMap = [];
	characterMatrix = [];
	characterCoords = [];
	spawnpointCoords = [];
	characterMap = [];
	characterInventory = [];
	clearTimeout(keyTimeout);

	currentMapFile = testData[`map${lvl}.txt`];
	currentMapActions = JSON.parse(testData[`map${lvl}.json`]);
	revealedMap = generateEmptyMapMatrix(32, 32);
	characterMap = generateCharacterMap(currentMapFile);
	constructedMap = generateMapMatrix(currentMapFile);
	characterCoords = spawnpointCoords;
	characterMatrix = generateEmptyMapMatrix(3, 3);
	generateCharacterMatrix();
	updateRevealedMap();

	updateWindow();
	freeToMove = true;
	sendMessage(`Welcome to level ${lvl}!`);

	levelInfo.innerHTML = `Level ${currentMapActions.level} - ${currentMapActions.levelName}`;
};

var levelFinish = function(level) {
	sendMessage(`Finished level ${level}!`);
	loadNextLevel(level + 1);
};

document.body.onkeydown = function(e) {
	if (freeToMove == true) {
		switch (e.keyCode) {
			case 37:
				moveChar("left");
				break; 
			case 38:
				moveChar("up");
				break; 
			case 39:
				moveChar("right");
				break; 
			case 40:
				moveChar("down");
				break; 
		}
		keyTimeout = setTimeout(function() {
			freeToMove = true;
		}, 75);
		freeToMove = false;
	}
};

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

revealedMap = generateEmptyMapMatrix(32, 32);
characterMap = generateCharacterMap(currentMapFile);
constructedMap = generateMapMatrix(currentMapFile);
characterCoords = spawnpointCoords;
characterMatrix = generateEmptyMapMatrix(3, 3);
generateCharacterMatrix();
updateRevealedMap();

updateWindow();
freeToMove = true;
sendMessage("Game started.");

