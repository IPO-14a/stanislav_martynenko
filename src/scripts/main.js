"use strict";
var SPRITE_SIZE = 24;
var GRID_WIDTH = 30;
var GRID_HEIGHT = 20;
var TAIL_DIRECTIONS = [sprites.tailDown,sprites.tailLeft,
					sprites.tailUp,sprites.tailRight];
var HEAD_DIRECTIONS =[sprites.headUp,sprites.headRight,
					sprites.headDown,sprites.headLeft]; 
var BODY_DIRECTIONS = [
			[sprites.bodyUpDown,sprites.bodyRightDown,undefined,sprites.bodyDownLeft],
			[sprites.bodyLeftUp,sprites.bodyLeftRight,sprites.bodyDownLeft,undefined],
			[undefined,sprites.bodyUpRight,sprites.bodyUpDown,sprites.bodyLeftUp],
			[sprites.bodyUpRight,undefined,sprites.bodyRightDown,sprites.bodyLeftRight]
			];