"use strict";

// preload.js

new Image().src = "img/welcome.png";
new Image().src = "img/avatars.png";
new Image().src = "img/home.png";
new Image().src = "img/ice.png";
new Image().src = "img/items.png";
new Image().src = "img/nodeMisc.png";
new Image().src = "img/software.png";
new Image().src = "img/nodeBgCOP.png";
new Image().src = "img/nodeBgCPU.png";
new Image().src = "img/nodeBgDS.png";
new Image().src = "img/nodeBgIO.png";
new Image().src = "img/nodeBgJunc.png";
new Image().src = "img/nodeBgPortal.png";
new Image().src = "img/nodeBgSPU.png";

// random.js


// Decker's RNG functions
function Random(nMax) {
	return Rand(nMax);
}

function Random2(nCount, nMax) {
	var nData = 0;
	while (nCount--)
		nData += Random(nMax);
	return nData;
}
function ChooseRot() {
	return Random(2)*2-1; // 1:Clockwise, -1:Counterclockwise
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Seedable and Feedable PRNG
var Rand = function(p1,p2) {
	if (p2 === undefined)
		return Rand.next() % p1;
	else
		return p1 + (Rand.next() % (p2 - p1 + 1));
}

{
	let food = [];

	Rand.seed = function(s) {
		if (s === undefined)
			s = new Date().getTime();
		s = Math.floor(s);
		if (Number.isNaN(s)) s = 0;
		if (s < 0) s = -s;
		s %= 0x7fffffff;
		if (s < 0) s = 0;
		console.info("random seed: "+s);

		Rand._seed = s;
	}
	Rand.getSeed = function() {
		return Rand._seed;
	}

	Rand.feed = function(arr) {
		food = arr;
	}

	Rand.next = function() {
		if (food.length) return food.shift();
		return (Rand._seed = (Rand._seed * 1000003 + 1) % 0x7fffffff);
	}

	Rand.seed();
}

// basics.js


// Class to simulate pass by reference
function Numero(n) {
	this.value = n;
}
Numero.prototype.get = function() {
	return this.value;
}
Numero.prototype.set = function(n) {
	this.value = n;
}
Numero.prototype.inc = function(n) {
	this.value++;
}



function Point(x,y) {
	this.x = x;
	this.y = y;
}
Point.dirCoord = [
	new Point( 0,-1), // 0 = North (Coordinate plane is from upper left)
	new Point( 1, 0), // 1 = East
	new Point( 0, 1), // 2 = South
	new Point(-1, 0), // 3 = West
];
Point.prototype.move = function(dir) {
	let p = Point.dirCoord[dir];
	return new Point( this.x+p.x, this.y+p.y );
}
Point.prototype.sameAs = function(p) {
	return this.x===p.x && this.y===p.y;
}
Point.prototype.copy = function() {
	return new Point(this.x,this.y);
}



function escapeHTML(txt) {
	return (""+txt).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}



// remove item from array, by value
Array.prototype.remove = function(elem) {
	for (let i=0; i<this.length; i++) {
		if (this[i] !== elem) continue;
		this.splice(i,1);
		return true;
	}
	return false;
}

// shuffle elements of an array. Fisher-Yates algorithm
Array.prototype.shuffle = function() {
	for (let i = this.length-1; i>0; i--) {
		let j = Random(i+1);
		[ this[i],this[j] ] = [ this[j],this[i] ];
	}
}

// const.js


/* MY GLOBALS *************************************************/

const DBLCLICK_DELAY = 500;  // how much to wait for a second click to consider it a double click. Used in tableList
const CHARNAME_MAXSIZE = 30; // maximum amount of characters for the player's name
const PROGNAME_MAXSIZE = 30; // maximum amount of characters for a program's name
const ICE_PER_ROW = 10;      // images per row on ice.png
const MAX_MESSAGES = 100;    // maximum amount of messages in Matrix (0 for no messages, -1 for no limit)
const MAX_AVATAR = 17;



/* Globals.h **************************************************/

// colors
const BLACK    = "#000000";
const BLUE     = "#0000FF";
const GREEN    = "#00FF00";
const RED      = "#FF0000";
const YELLOW   = "#FFFF00";
const DK_BLUE  = "#000080";
const DK_GREEN = "#008000";
const ORANGE   = "#FF8000";
const PURPLE   = "#FF00FF";

// Reputation level factor - # points to gain level (relative)
const REP_LEVEL_FACTOR = 5;
const LIFESTYLE_UPGRADE_FACTOR = 3;

// Maximum health
const MAX_HEALTH = 20;
const HEALTH_INCREMENT = 5;

// Global Variables
const g_szMonthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
const g_nDaysPerMonth = [
	31,	//"January",
	28,	//"February",
	31,	//"March",
	30,	//"April",
	31,	//"May",
	30,	//"June",
	31,	//"July",
	31,	//"August",
	30,	//"September",
	31,	//"October",
	30,	//"November",
	31,	//"December"
];
const g_szLifestyleString = [
	"Poverty","Lower Class","Middle Class","Upper Class","Elite"
];
const g_nLifestyleMonthlyCost = [
	500,1000,2000,4000,10000
];


const g_szRepLevelString = [
	"Nobody",
	"Wannabe",
	"Cyber Surfer",
	"Matrix Runner",
	"Newbie Hacker",
	"Journeyman Hacker",
	"Competent Hacker",
	"Experienced Hacker",
	"Hacker Extraordinaire",
	"Cyber Thief",
	"Cyber Sleuth",
	"Cyber Warrior",
	"Cyber Wizard",
	"Ice Crusher",
	"Node Master",
	"System Master",
	"Ghost in the Machine",
	"Digital Dream",
	"Digital Nightmare",
	"Master of the Matrix",
	"Matrix God",
];


/* Character.h **************************************************/

// Lifestyles
const LS_STREET			= 0;
const LS_LOW			= 1;
const LS_MED			= 2;
const LS_HIGH			= 3;
const LS_ELITE			= 4;

const MAX_LIFESTYLE		= 4;

// Item Types
const IT_SOFTWARE		= 0;
const IT_CHIP			= 1;
const IT_HARDWARE		= 2;

// Chip types
const CHIP_CPU			= 0;
const CHIP_ATTACK		= 1;
const CHIP_DEFENSE		= 2;
const CHIP_STEALTH		= 3;
const CHIP_ANALYSIS		= 4;
const CHIP_COPROCESSOR	= 5;

const NUM_CHIPS			= 6;

// Hardware types
const HW_CHIP_BURNER	= 0;
const HW_SURGE_SUPP		= 1;
const HW_NEURAL_DAMPER	= 2;
const HW_TRACE_MONITOR	= 3;
const HW_BIO_MONITOR	= 4;
const HW_HIGH_BW_BUS	= 5;
const HW_MAPPER			= 6;
const HW_DESIGN_ASSIST	= 7;
const HW_PROXY			= 8;

const NUM_HW			= 9;
const NUM_HW_RESERVED	= 20; // Reserved space for future expansion

const NUM_HW_0_1		= 6; // Hardware in version 0.1

// Ratings for GetEffectiveRating
const RATING_ATTACK		= 0;
const RATING_DEFENSE	= 1;
const RATING_STEALTH	= 2;
const RATING_ANALYSIS	= 3;

// Load status
const LS_LIGHT			= 0;
const LS_NORMAL			= 1;
const LS_HEAVY			= 2;

// Maximum decoys
const MAX_DECOYS		= 5;

// Starting Bonus
const BONUS_NONE		= 0;
const BONUS_SKILLS		= 1;
const BONUS_HARDWARE	= 2;
const BONUS_SOFTWARE	= 3;
const BONUS_MONEY		= 4;

// Run flags
const CRF_ALARMS_SET	= 0x00000001; // Alarms have been set


/* Contract.h **************************************************/

// Number of corporation defined in the database
const NUM_CORP = 100;

// Contract Types
const CONT_STEAL			= 0;
const CONT_STEAL_ERASE		= 1;
const CONT_ERASE			= 2;
const CONT_EDIT				= 3;
const CONT_DEACTIVATE_IO	= 4;
const CONT_ACTIVATE_IO		= 5;
const CONT_SABOTAGE_IO		= 6;
const CONT_CRASH_SYS		= 7;
const CONT_BACKDOOR			= 8;
const CONT_RUN_PROGRAM		= 9;

// Contract Targets
// Datastore targets
const CT_RESEARCH_DATA		= 0;
const CT_CHEM_FORMULA		= 1;
const CT_PERSONNEL_FILES	= 2;
const CT_FINANCIAL_DATA		= 3;
const CT_GRADE_REPORTS		= 4;
const CT_SECURITY_FILES		= 5;
const CT_SECURITY_CAM_REC	= 6;
const CT_BLUEPRINTS			= 7;
const CT_EMPLOYEE_EVAL		= 8;
const CT_PRODUCT_INFO		= 9;
const CT_MEDICAL_RECORDS	= 10;
const CT_ILLEGAL_ACTIVITY	= 11;
const CT_TEST_RESULTS		= 12;
const CT_INVENTORY_DATA		= 13;
// Deactivate IO targets
const CT_DOORLOCKS			= 14;
const CT_SECURITY_CAMERAS	= 15;
const CT_ALARM_SYSTEMS		= 16;
// Activate IO targets
const CT_FIRE_ALARMS		= 17;
const CT_SECURITY_ALARMS	= 18;
const CT_RADIATION_ALARMS	= 19;
const CT_BIOHAZARD_ALARMS	= 20;
const CT_CHEM_ALARMS		= 21;
// Sabotage targets
const CT_MANUF_CONTROLS		= 22;
const CT_CHEM_PRODUCTION	= 23;
const CT_VAULT_CONTROLS		= 24;
// Crash system, backdoor target
const CT_CPU				= 25;
// Run Program targets
const CT_NODE_IO			= 26;
const CT_NODE_DS			= 27;
const CT_NODE_CPU			= 28;

// Contract flags
const CF_NO_ALARMS	= 0x00000001; // Can't set off an alarm
const CF_TIMED		= 0x00000002; // Limited time to complete


/* DSFile.h **************************************************/

// File types
const FT_USELESS	= 0;
const FT_VALUABLE	= 1;
const FT_PASSCODE	= 2;
const FT_CLUE		= 3;
const FT_QUEST		= 4;
const FT_PROGRAM	= 5;
const FT_P_SOURCE	= 6;
const FT_C_SOURCE	= 7;

// States (flags)
const STATE_IN_NODE		= 0x01;	// It is in the node
const STATE_IN_DECK		= 0x02;	// It is in the deck (downloaded)
const STATE_EDITED_N	= 0x04;	// It has been edited in the node
const STATE_EDITED_D	= 0x08;	// It has been edited in the deck (useless)
const STATE_SCAN		= 0x10;	// It has been scanned (contents known)
const STATE_EVAL		= 0x20;	// It has been evaluated (value known)


/* FileAccessDlg.h **************************************************/

// Types of operations for this window
const FO_VIEW	= 0;	// Just show the files
const FO_GET	= 1;	// Get (download) a file
const FO_EDIT	= 2;	// Edit a file
const FO_ERASE	= 3;	// Erase a file


/* Ice.h **************************************************/

// ICE Classes
// White
const ICE_GATEWAY	= 0;
const ICE_PROBE		= 1;
const ICE_GUARDIAN	= 2;
const ICE_TAPEWORM	= 3;
// Black
const ICE_ATTACK	= 4;
const ICE_TRACE		= 5;

// Maximum white ice number
const MAX_WHITE		= 3;

// Attack ice sub-types
// Attacks deck
const AST_NORMAL			= 0x0000;
const AST_HARDENED			= 0x0001;
const AST_PHASING			= 0x0002;
const AST_CRASH				= 0x0004;
// Attacks decker
const AST_KILLER			= 0x1000;
const AST_KILLER_H			= 0x1001;
const AST_KILLER_P			= 0x1002;
const AST_KILLER_C			= 0x1004;

const AST_MASK_KILLER		= 0x1000;
const AST_MASK_HARDENED		= 0x0001;
const AST_MASK_PHASING		= 0x0002;
const AST_MASK_CRASH		= 0x0004;

// Trace ice sub-types
const TST_NORMAL		= 0;	// Normal trace
const TST_DUMP			= 1;	// Extended trace & dump
const TST_FRY			= 2;	// Extended trace & dump & fry

// Tapeworm ice subtypes
const TWST_NORMAL		= 0;	// Normal tapeworm
const TWST_DATABOMB		= 1;	// Data bomb

// Rating Types
const RATING_NORMAL		= 0;	// Base rating
const RATING_COMBAT		= 1;	// Combat rating
const RATING_SENSORS	= 2;	// Sensor rating

// ICE States
// Non-hostile
const STATE_INACTIVE		= 0x00;	// Black ice which is not active
const STATE_GUARDING		= 0x01;	// Normal ice which are sitting in their home node
const STATE_FOLLOWING		= 0x02;	// Following player to query
const STATE_MOVING			= 0x03;	// Going to a target node. (Black only)
									//  Response: Going to search.
									//  Other: Going home to guard.
const STATE_SEARCHING		= 0x04;	// Searching for intruders (Black/Probe)
const STATE_DESTROYING		= 0x05;	// Destroying a datafile - tapeworm only
const STATE_QUERIED1		= 0x06;	// Queried player, waiting for response
const STATE_QUERIED2		= 0x07;	// Queried player, waiting for response
const STATE_QUERIED3		= 0x08;	// Queried player, waiting for response
// Hostile
const STATE_GUARDING_H		= 0x11;	// Guarding, but knows hostile
const STATE_ATTACKING		= 0x12;	// Black ice attacking/chasing the player,
const STATE_MOVING_H		= 0x13;	// White ice returning to home node

const STATE_MASK_HOSTILE	= 0x10;	// Mask to show hostility


/* MatrixView.h **************************************************/

// Reasons for player dumping
const DUMP_DECK_DAMAGE		= 0;	// Dumped due to normal (deck) damage
const DUMP_UNCONS			= 1;	// Dumped due to unconsciousness
const DUMP_DEATH			= 2;	// Dumped due to death
const DUMP_TRACE			= 3;	// Dumped due to a trace completing
const DUMP_TRACE_FRY		= 4;	// Dumped due to a trace completing, get to fry a chip
const DUMP_SYS_CRASH		= 5;	// Dumped due to the decker crashing the system
const DUMP_SYS_OFFLINE		= 6;	// Dumped due to system going offline from a red alert
const DUMP_DISCONNECT		= 7;	// Decker disconnected

// Health bars to update
const BAR_ALL				= 100;
const BAR_DECK				= 0;	// Deck damage
const BAR_MENTAL			= 1;	// Stun damage
const BAR_LETHAL			= 2;	// Lethal damage
const BAR_SHIELD			= 3;	// Shield bar
const BAR_TRANSFER			= 4;	// Upload/download completion bar
const BAR_TRACE				= 5;	// Trace completion bar
const BAR_ICE				= 6;	// Ice health


/* Node.h **************************************************/

// Node Types
const NT_CPU		= 0;	// Central Processing Unit
const NT_SPU		= 1;	// Sub Processing Unit
const NT_COP		= 2;	// Coprocessor
const NT_DS			= 3;	// Data store
const NT_IO			= 4;	// I/O Controller
const NT_JUNC		= 5;	// Junction
const NT_PORTAL_IN	= 6;	// Portal
const NT_PORTAL_OUT	= 7;	// Portal

// Directions
const DIR_NORTH		= 0;
const DIR_EAST		= 1;
const DIR_SOUTH		= 2;
const DIR_WEST		= 3;

const DIR_NONE		= -1;
const DIR_CENTER	= -2;

// Macro to get the opposite direction
function OppDir(n) { return ((n+2)%4); }

// Node subtypes
const NST_IO_USELESS	= 0;	// Useless IO node
const NST_IO_QUEST_NODE	= 1;	// This is the quest node
const NST_IO_ALARM		= 2;	// IO Node - alarm
const NST_IO_ICE_PORT	= 3;	// IO Node - ICE port - ice respawn here (not impl.)
const NST_IO_MATRIX		= 4;	// High-speed matrix port

const NST_DS_NORMAL		= 0;
const NST_DS_QUEST_NODE	= 1;

const NST_COP_NORMAL	= 0;
const NST_COP_SECURITY	= 1;	// FSO 12-17-01

// Node special images
const NSI_COP_SECURITY	= 0;
const NSI_DS_QUEST		= 0;
const NSI_IO_QUEST		= 0;
const NSI_IO_ALARM		= 1;
const NSI_IO_ICE_PORT	= 2;
const NSI_IO_MATRIX		= 3;


/* Program.h **************************************************/

// Program Types
const PROGRAM_ATTACK			= 0;
const PROGRAM_ATTACK_A			= 1;
const PROGRAM_ATTACK_P			= 2;
const PROGRAM_SLOW				= 3;
const PROGRAM_VIRUS				= 4;
const PROGRAM_SILENCE			= 5;
const PROGRAM_CONFUSE			= 6;
const PROGRAM_WEAKEN			= 7;
const PROGRAM_SHIELD			= 8;
const PROGRAM_SMOKE				= 9;
const PROGRAM_DECOY				= 10;
const PROGRAM_MEDIC				= 11;
const PROGRAM_ARMOR				= 12;
const PROGRAM_HIDE				= 13;
const PROGRAM_DECEIVE			= 14;
const PROGRAM_RELOCATE			= 15;
const PROGRAM_ANALYZE			= 16;
const PROGRAM_SCAN				= 17;
const PROGRAM_EVALUATE			= 18;
const PROGRAM_DECRYPT			= 19;
const PROGRAM_REFLECT			= 20;
const PROGRAM_ATTACK_BOOST		= 21;
const PROGRAM_DEFENSE_BOOST		= 22;
const PROGRAM_STEALTH_BOOST		= 23;
const PROGRAM_ANALYSIS_BOOST	= 24;
const PROGRAM_CLIENT			= 25;	// Special program for missions only

const NUM_PROGRAMS				= 26;


/* System.h **************************************************/

// Alert Levels
const ALERT_GREEN	= 0;
const ALERT_YELLOW	= 1;
const ALERT_RED		= 2;

// globals.js


// Note on this function:
// It returns the success level of running a program.
// -1 = Catastrophic failure
// 0 = Failure
// 1+ = Success level
function DoDieRoll(iTargetNumber) {

	// Clamp off the target value
	if (iTargetNumber > 20) iTargetNumber = 20;
	//else if (iTargetNumber < 2) iTargetNumber = 2;

	// Roll the die
	let iRoll = Rand(1,20);

	// Check for critical failure
	if (iRoll === 1)
		return -1;

	// Calculate the success level and return it
	let iDiff = iRoll - iTargetNumber;
	if (iDiff < 0)
		return 0; // Failure

	// FSO Changing the way success is calculated
	//if (iDiff <= 1)
	//	return 1;
	//else if (iDiff <= 4)
	//	return 2;
	//else if (iDiff <= 8)
	//	return 3;
	//else if (iDiff <= 13)
	//	return 4;
	//else // iDiff <= 19
	//	return 5;
	let iSuccess = Math.floor( (iDiff+4) / 4 );
	if (iSuccess > 5)
		iSuccess = 5;

	return iSuccess;
}


function GetConditionModifier(nCondition) {
	//if (nCondition<=4)
	//	return -6;
	//else if (nCondition<=7)
	//	return -4;
	//else if (nCondition<=9)
	//	return -2;
	//else
	//	return 0;
	return Math.floor( (nCondition - MAX_HEALTH) / 4 );
}


function CalcRepPointsForNextLevel(nCurrentLevel) {
	let x = (nCurrentLevel+1);
	x = REP_LEVEL_FACTOR * x * (x+1);
	return Math.floor(x/2);
}


function GetDays(nMonth, nYear) {
	let nDays = g_nDaysPerMonth[nMonth];

	// Check for leap year
	if (nMonth === 1 && (nYear%4)===0)
		nDays++;
	return nDays;
}


function ComputeDamage(iSuccess) {
	// Original: Damage = success (too low)
	// Now: Damage = success squared (too high)
	return (iSuccess * iSuccess);
}

// tableList.js

/*
	var X = new tableList(div_node, height, className, allowDeselect=true);
	X.onClick = function : called with row number as parameter, starting at 1. Second parameter if it was a 'true' click
	X.onDblClick = function : called with row number as parameter, starting at 1
	X.onSort  = function : called with column number as parameter, starting at 0
	X.markRow(i) : colorizes the row and scrolls if necessary to make it visible
	X.setColumns(arr) : configures columns. Each 'arr' element is a pair (column_name/function)
		the function is called for each row, each column, and prints the result
		if the column name is null, it represents an icon for the next column. In this case, the value can be an array, with the second element being the outline color
	X.setIgnoreColumns(...columns): ignores the indicated columns
	X.setContents(arr) : fills the table with the data, using the columns information
	X.redraw() : redraws table, keeping the selected value. Use only if the elements haven't changed; just their display
*/


function tableList(obj, height, className, allowDeselect=true) {
	let mainTable = document.createElement("table");
	mainTable.className = className;

	this.tHead = document.createElement("thead");
	this.tBody = document.createElement("tbody");
	mainTable.appendChild(this.tHead);
	mainTable.appendChild(this.tBody);

	let heightDiv = document.createElement("div");
	if (height !== null)
		heightDiv.style.height = height+"px";
	else
		heightDiv.style.height = "100%";
	heightDiv.appendChild(mainTable);

	obj.appendChild(heightDiv);


	if (allowDeselect) {
		Popup.onclick(heightDiv, e => {
			if (e.target === heightDiv)
				this.markRow(0, true, true);
		});
	}
	let dblClickTimer = null;
	this.onClick = function(){};
	this.onDblClick = null;
	Popup.onclick(this.tBody, e => {
		e.stopPropagation();
		let tr = e.target.parentNode;
		if (tr.parentNode !== this.tBody) return; // shouldn't happen, but just in case...

		let row = 0;
		while ( (tr = tr.previousSibling) !== null )
			row++;

		// if desired, find out if it is a double click
		if (this.onDblClick !== null) {
			if (row === this.selected && dblClickTimer) {
				clearTimeout(dblClickTimer);
				dblClickTimer = null;
				// double click!
				this.onDblClick(row);
				return;
			} else {
				clearTimeout(dblClickTimer);
				dblClickTimer = setTimeout( () => dblClickTimer=null, DBLCLICK_DELAY);
			}
		}

		this.markRow(row, true, true);
	});

	this.onSort = null;
	Popup.onclick(this.tHead, e => {
		e.stopPropagation();
		if (!this.onSort) return;

		let th = e.target;
		if (th.parentNode.parentNode !== this.tHead) return; // shouldn't happen, but just in case...

		let column = 0;
		while ( (th = th.previousSibling) !== null )
			column++;

		this.onSort(column);
	});

	this.selected = 0;
	this.data = [];
	this.ignore = []; // columns to ignore
}

tableList.prototype.has = function(p) {
	return this.data.indexOf(p) >= 0;
}

tableList.prototype.clear = function() {
	this.data = [];
	this.selected = 0;
	// doesn't redraw, since this is called only for the date to be refilled
}
tableList.prototype.markRow = function(i, call_onclick=true, was_true_click=false) {
	// remove color from the previously selected row, if any
	if (this.selected !== 0)
		this.tBody.children[this.selected].classList.remove("marked");

	// store new selection
	this.selected = i;

	// if something is selected, mark it
	if (i > 0) {
		// pick the corresponding row
		let row = this.tBody.children[i];

		// colorize it
		row.className = "marked";

		// scroll if necessary to ensure the row is fully visible
		this.scrollIfNeeded(i);
	}

	if (call_onclick)
		this.onClick(i ? this.data[i-1] : null, was_true_click);
}
tableList.prototype.visibles = function() {
	let boxRect = this.tBody.parentNode.parentNode.getBoundingClientRect();
	let headerSize = this.tHead.children[0].clientHeight; // beware of the header!

	let first = null, last = null;
	for (let r=1; r<=this.data.length; r++) {
		let row = this.tBody.children[r];
		if ( first === null && row.getBoundingClientRect().top >= boxRect.top + headerSize )
			first = r;
		if ( row.getBoundingClientRect().bottom <= boxRect.bottom+2 ) // +2 : weird fix
			last = r;
	}
	return [first,last];
}
tableList.prototype.scrollIfNeeded = function(i, measureOnly) {
	// pick the corresponding row
	let row = this.tBody.children[i];

	// check if scroll is necessary
	let box = row.parentNode.parentNode.parentNode;
	let rowRect = row.getBoundingClientRect();
	let boxRect = box.getBoundingClientRect();
	let headerSize = this.tHead.children[0].clientHeight; // beware of the header!

	let R = 0;
	if (rowRect.bottom > boxRect.bottom)
		R = boxRect.bottom - rowRect.bottom;
	if (rowRect.top < boxRect.top + headerSize)
		R = boxRect.top - rowRect.top + headerSize;

	let oldScroll = box.scrollTop;
	box.scrollTop -= R;
	R = oldScroll - box.scrollTop;
	if (measureOnly) box.scrollTop = oldScroll;

	return R;
}

tableList.prototype.setColumns = function(arr) { // each element is a pair column_name/function
	this.cols = arr;
}
tableList.prototype.setIgnoreColumns = function(...ignore) {
	this.ignore = ignore;
}
tableList.prototype.setContents = function(data, call_onclick=true) {
	let oldSelected = this.selected ? this.data[this.selected-1] : null;

	this.data = data.slice(0);

	this.selected = 0;
	this.redraw();

	if (oldSelected)
		this.markRow( this.data.indexOf(oldSelected) + 1, call_onclick );
}
tableList.prototype.redraw = function() {
	let html = "";
	html += "<tr>";
	this.cols.forEach((col,i) => {
		if (this.ignore.indexOf(i) >= 0) return; // ignore this column number
		if (col[0] === null) return; // icon
		html += "<th>" + escapeHTML(col[0]) + "</th>";
	});
	html += "</tr>";

	this.data.forEach(row => {
		html += "<tr>";
		let icon = "";
		this.cols.forEach((col,i) => {
			if (this.ignore.indexOf(i) >= 0) return; // ignore this column number
			let content = col[1](row);
			if (col[0] === null) {
				if (Array.isArray(content)) {
					let color = content[1]+" 1px, transparent 1px";
					icon  = "<icon style='margin-left:2px;background:linear-gradient(0deg, "+color+"), linear-gradient(90deg, "+color+"), linear-gradient(180deg, "+color+"), linear-gradient(270deg, "+color+")'>";
						icon += "<icon style='background-position-x:"+(-content[0]*16)+"px'></icon>";
					icon += "</icon>";
				} else {
					icon = "<icon style='margin-left:2px;background-position-x:"+(-content*16)+"px'></icon>";
				}
			} else {
				html += "<td>" + icon + escapeHTML(content) + "</td>";
				icon = "";
			}
		});
		html += "</tr>";
	});

	this.tHead.innerHTML = html;
	this.tBody.innerHTML = html;

	this.markRow(this.selected, false);
}

tableList.prototype.getSelected = function() {
	if (!this.selected) return null;
	return this.data[this.selected-1];
}





tableList.prototype.keyBindings = function() {
	return {
		"ArrowUp":   this.keyUp.bind(this),
		"ArrowDown": this.keyDown.bind(this),
		"PageUp":    this.keyPUp.bind(this),
		"PageDown":  this.keyPDown.bind(this),
		"Home":      this.keyHome.bind(this),
		"End":       this.keyEnd.bind(this),
	};
}

tableList.prototype.keyUp = function(event) {
	event.preventDefault();
	if (!this.data.length) return; // table empty
	if (!this.selected) this.markRow(this.data.length);
	else if (this.selected > 1) this.markRow(this.selected-1);
	else this.markRow(this.selected);
}
tableList.prototype.keyDown = function(event) {
	event.preventDefault();
	if (!this.data.length) return; // table empty
	if (!this.selected) this.markRow(1);
	else if (this.selected < this.data.length) this.markRow(this.selected+1);
	else this.markRow(this.selected);
}
tableList.prototype.keyHome = function(event) {
	event.preventDefault();
	if (!this.data.length) return; // table empty
	this.markRow(1);
}
tableList.prototype.keyEnd = function(event) {
	event.preventDefault();
	if (!this.data.length) return; // table empty
	this.markRow(this.data.length);
}

tableList.prototype.keyPUp = function(event) {
	event.preventDefault();
	if (!this.data.length) return; // table empty

	if (!this.selected) return this.markRow(this.data.length); // nothing selected, so select last

	if (this.selected === 1) return this.markRow(this.selected); // first row already selected. Scroll to it if needed, and done

	let [first,last] = this.visibles();

	// unless selected row is fully visible, and is not the first one visible, scroll so that the selected row is at the bottom
	if ( !(this.selected > first && this.selected <= last) ) {
		this.scrollIfNeeded(0); // scroll to the first...
		this.scrollIfNeeded(this.selected); // then to the row...
	}

	// and select the first visible row
	[first,last] = this.visibles();
	this.markRow(first);
}
tableList.prototype.keyPDown = function(event) {
	event.preventDefault();
	if (!this.data.length) return; // table empty

	if (!this.selected) return this.markRow(1); // nothing selected, so select first

	if (this.selected === this.data.length) return this.markRow(this.selected); // last row already selected. Scroll to it if needed, and done

	let [first,last] = this.visibles();

	// unless selected row is fully visible, and is not the last one visible, scroll so that the selected row is at the top
	if ( !(this.selected >= first && this.selected < last) ) {
		this.scrollIfNeeded(this.data.length); // scroll to the last...
		this.scrollIfNeeded(this.selected); // then to the row...
	}

	// and select the last visible row
	[first,last] = this.visibles();
	this.markRow(last);
}

// config.js


var Config = {};


{
	//            property     savename  range  default
	addConfigBool("mute",       "Mute",          true);
	addConfigInt( "volume",     "Vol",  [0,100], 20);
	addConfigInt( "difficulty", "Diff", [0,1],    0);
	addConfigBool("viewice",    "VIce",          true); // show popup when analyzing an ICE
	addConfigBool("warnclose",  "WCl",           true); // show warning when closing the game

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	let Callbacks = {};

	Config.onchange = function(propName, cb) {
		Callbacks[propName] = cb;
	}

	function addConfigBool(propName, cfgName, def) {
		cfgName = "DeckerCfg" + cfgName;
		let value = localStorage.getItem(cfgName);
		if (value === null) value = def;
		else value = (value !== "");

		Object.defineProperty(Config, propName, {
			get: function() {
				return value;
			},
			set: function(val) {
				value = !!val;
				localStorage.setItem(cfgName, value ? "1" : "");
				if (Callbacks[propName]) Callbacks[propName](value);
			},
		});
	}

	function addConfigInt(propName, cfgName, [min,max], def) {
		cfgName = "DeckerCfg" + cfgName;
		let value = localStorage.getItem(cfgName);
		if (value === null) value = def;
		else {
			value = +value;
			if ( Number.isNaN(value) ) value = def;
			if (value < min) value = min;
			if (value > max) value = max;
		}

		Object.defineProperty(Config, propName, {
			get: function() {
				return value;
			},
			set: function(val) {
				value = +val;
				if ( Number.isNaN(value) ) value = def;
				if (value < min) value = min;
				if (value > max) value = max;
				localStorage.setItem(cfgName, value);
				if (Callbacks[propName]) Callbacks[propName](value);
			},
		});
	}
}

// popup.js


//	Popup.create(name, obj).onInit(f).onKey(f);
//		prepares a popup with a name and an associated html object.
//		The popup can then be called by 'Popup.name()'
//		extra calls:
//			.onInit(f)
//				provides an initialization function, called whenever the popup is shown.
//			.onKey(m)
//				receives an object mapping keys to a function to be called.
//				if a key is null, that function is called if no other is.
//				all calls will include the keyboard event as parameter.
//				can be called more than once, the bindings are added.
//
//	Popup.name(params).then(callback).onYes(callback);
//		shows the popup of the specified name. Calls the onInit function defined on popup creation, with optional parameters
//		Optionally, can be added a single callback ('then' or 'onYes') to call to when the popup closes
//
//	Popup.close(value);
//		close the most recent popup, passing 'value' to its callback.
//
//	Popup.closeAll();
//		close all popups, don't call any callbacks.
//
//	Popup.onclick(obj, func, param);
//		buttons' onclick should not be used directly. Use this instead.
//		First parameter is the button to be assigned the onclick, second parameter is the function to be called when clicked
//		Third, optional parameter, is a parameter to be passed to the function.
//		The function is called with a first parameter being the event; second parameter is the parameter given
//		This way, if the button is not on the top popup, the click is ignored.



{
	let block = document.createElement("div");
	block.id = "popups";
	document.body.appendChild(block);
}



var Popup = function(name,obj,nodiv) {
	this.wrapper = document.createElement(nodiv ? "span" : "div");
	this.wrapper.className = "popupWrapper";
	this.wrapper.appendChild(obj);

	this.initFunc = null;
	this.keyFunc = {};
}
Popup.create = function(name,obj,nodiv) {
	let N = new Popup(name,obj,nodiv);
	Popup.popupList[name] = N;
	Popup[name] = (...p) => Popup._show(name, ...p);

	if (obj.children.length)
		N.setDrag(obj.children[0]);
	return N;
}
Popup.checkAllBounds = function() {
	Popup.activeList.forEach(data => {
		let popup = Popup.popupList[data.name];
		popup.checkBounds();
	});
}
window.addEventListener("resize", Popup.checkAllBounds);

Popup.prototype.checkBounds = function() {
	let div = this.wrapper.children[0];
	let obj = this.wrapper.children[0].children[0];
	if (!obj) return;

	if (div.offsetLeft+20 > window.innerWidth)
		div.style.left = parseInt(div.style.left) - (div.offsetLeft+20 - window.innerWidth) + "px";
	if (div.offsetTop+20 > window.innerHeight)
		div.style.top = parseInt(div.style.top) - (div.offsetTop+20 - window.innerHeight) + "px";

	if (div.offsetLeft-20 < -div.clientWidth)
		div.style.left = parseInt(div.style.left) - (div.offsetLeft-20 + div.clientWidth) + "px";
	if (div.offsetTop-20 < -obj.clientHeight)
		div.style.top  = parseInt(div.style.top)  - (div.offsetTop-20 + obj.clientHeight)  + "px";
}
Popup.prototype.setDrag = function(obj) {
	let div = this.wrapper.children[0];
	div.style.position = "relative";
	div.style.left = 0;
	div.style.top = 0;
	let dragX, dragY;

	let divMove = e => {
		div.style.left = parseInt(div.style.left) + e.clientX - dragX + "px";
		div.style.top  = parseInt(div.style.top)  + e.clientY - dragY + "px";
		dragX = e.clientX;
		dragY = e.clientY;
	}

	let dragging = false;
	obj.onmousedown = e => {
		dragging = true;
		window.addEventListener("mousemove", divMove, true);
		dragX = e.clientX;
		dragY = e.clientY;
	}
	window.addEventListener("mouseup", () => {
		if (!dragging) return;
		dragging = false;
		window.removeEventListener("mousemove", divMove, true);

		// ensure the window doesn't go outside the screen
		this.checkBounds();
	}, true);

	return this;
}

Popup.prototype.onInit = function(f) {
	this.initFunc = f;
	return this;
}
Popup.prototype.onKey = function(binds) {
	for (let key in binds) {
		if (binds.hasOwnProperty(key))
			this.keyFunc[key] = binds[key];
	}
	return this;
}


Popup.popupList = {}; // internal use only. format: {name:Popup, ...}
Popup.activeList = []; // internal use only. Array of {name,callback}

// only call func(params) if the object is in the topmost popup
Popup._but = function(obj, func, param, event) {
	// find the object's popup
	while (true) {
		if ( obj === null ) return;
		if ( obj === document.body ) return;
		if ( obj.parentNode.id === "popups" ) break;
		obj = obj.parentNode;
	}

	// only the topmost popup has working buttons
	if (obj !== document.getElementById("popups").lastElementChild)
		return;

	func(event, param);
}


Popup._show = function(id, ...p) {
	let popup = Popup.popupList[id];
	let obj = popup.wrapper;
	document.activeElement.blur();
	document.getElementById("popups").appendChild(obj);
	popup.checkBounds();
	if ( popup.initFunc ) popup.initFunc(...p);

	let active = {name:id,callback:null};
	Popup.activeList.push(active);
	return {
		then: function(f){ active.callback = f },
		onYes: function(f){ active.callback = function(R){if(R!==undefined&&R!==null&&R!==false)f(R)} },
	};
}

Popup.close = function(val) {
	let popups = document.getElementById("popups");
	let toClose = popups.lastElementChild;
	popups.removeChild(toClose);

	let cb = Popup.activeList[Popup.activeList.length-1].callback;
	Popup.activeList.pop();
	if (cb)
		cb(val);
}

Popup.closeAll = function() {
	let popups = document.getElementById("popups");
	while (popups.children.length)
		popups.removeChild(popups.lastElementChild);
	Popup.activeList = [];
}

Popup.onclick = function(obj, func, param) {
	obj.onclick = Popup._but.bind(null, obj, func, param);
}

document.addEventListener("keydown", function(event){
	if (Popup.activeList.length > 0) {
		let lastPopup = Popup.popupList[ Popup.activeList[Popup.activeList.length-1].name ];

		let key = event.key;
		if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
			key = (event.shiftKey?"S":"") + (event.ctrlKey?"C":"") + (event.altKey?"A":"") + (event.metaKey?"M":"") + "+" + event.key;
		}

		let bindings = lastPopup.keyFunc;
		if ( bindings.hasOwnProperty(key) )
			bindings[key](event);
		else if (bindings.hasOwnProperty(null))
			bindings[null](event);
		return;
	} else {
		console.error("NO POPUP");
	}
});

// tooltip.js


let tooltip = (function(){
	let block = document.createElement("div");
	block.id = "tooltip";
	document.body.appendChild(block);

	let last = null;

	function show(txt) {
		last = txt;
		if (!g_pChar.m_bTooltips) return hide();
		if (typeof txt === "function")
			txt = txt();
		if (!txt) {
			block.style.visibility = "hidden";
		} else {
			block.textContent = txt;
			block.style.visibility = "visible";
		}
	}
	function hide() {
		last = null;
		block.style.visibility = "hidden";
	}
	function redraw() {
		if (last !== null) show(last);
		else hide();
	}
	function set(elem, txt) {
		elem.onmouseenter = show.bind(null,txt);
		elem.onmouseleave = hide.bind(null,txt);
	}

	return {
		set : set,
		redraw : redraw,
	};
})();

// DSfile.js


const g_szValuableFileContents = [
	"Research data",
	"Chemical formulae",
	"Personnel files",
	"Financial data",
	"Grade reports",
	"Security files",
	"Security camera recordings",
	"Blueprints",
	"Employee evaluation records",
	"Product information",
	"Medical records",
	"Records of illegal activity",
	"Test results",
	"Inventory records",
];
const g_szUselessFileContents = [
	"Employee timesheets",
	"Sales brochures",
	"Employee mail",
	"Someone's poetry attempts",
	"A Christmas list",
	"Office party supply list",
	"Public service sign-up list",
	"Recording of the big game",
	"Garbage",
	"To-do list",
	"Outdated files",
	"Wedding guest list",
	"Bridal registry",
	"Grocery list",
	"Pictures of the family",
	"Pictures from office party",
	"Recordings from promotional event",
	"Yesterday's news",
	"Rejected ideas",
	"Someone's budget",
	"Garbled file",
	"Country music recordings",
	"Rock & Roll music recordings",
	"Easy listening music recordings",
	"Jazz music recordings",
	"Recording of Superbowl LXXXII",
	"Editorials",
	"Company history",
	"Educational media",
	"Hardware manual",
	"Software manual",
	"Motivational video",
	"A romance novel",
	"A sci-fi novel",
	"A mystery novel",
	"A thriller novel",
	"A romance holovid",
	"A sci-fi holovid",
	"A thriller holovid",
	"An action holovid",
	"A horror holovid",
	"Pirate copy of Starcraft 7",
	"A love letter",
	"Hate mail",
	"Joke of the day",
	"Top 10 list",
	"Letter to a relative",
	"Phonebook",
	"Travel brochures",
	"Junk mail",
	"Incomprehensible data",
	"Ramblings of a lunatic",
	"Recipe book",
	"A family tree",
];
const NUM_USELESS_FILES = g_szUselessFileContents.length;

const g_szClueString = "<Clue>";
const g_szPasscodeString = "<Passcode File>";
const g_szProgramString = "<Program>";
const g_szSourceString = "<Source Code>";


// File scan strings
const g_szScanString = [
	"Worthless",
	"Valuable",
	"*Passcode*",
	"*Clue*",
	"*Contract*",
	"*Program*",
	"*Source Code*",
	"*Source Code*",
];



function DSfile() {
	this.m_szName = "";				// File name
	this.m_nType = FT_USELESS;		// Type (Valuable, quest, useless, etc.)
	this.m_nValue = 0;				// Value of file (or type for programs)
	this.m_nContents = 0;			// Contents
	this.m_nState = STATE_IN_NODE;	// Current state
	this.m_pTapeworm = null;		// Guardian tapeworm
	this.m_nSize = 0;				// Size of file (MP)
}

DSfile.prototype.GetContentString = function() {
	switch (this.m_nType) {
		case FT_USELESS:  return g_szUselessFileContents[this.m_nContents];
		case FT_CLUE:     return g_szClueString;
		case FT_PASSCODE: return g_szPasscodeString;
		case FT_PROGRAM:  return g_szProgramString;
		case FT_P_SOURCE: return g_szSourceString;
		case FT_C_SOURCE: return g_szSourceString;
		case FT_VALUABLE: return g_szValuableFileContents[this.m_nContents];
		case FT_QUEST:    return g_szValuableFileContents[this.m_nContents];
		default:          return g_szValuableFileContents[this.m_nContents];
	}
}
DSfile.prototype.GetScanString = function() {
	return g_szScanString[this.m_nType];
}

DSfile.prototype.GetLoadTime = function() {
	// If have a high-speed connection, time is one turn
	if (g_pChar.m_pCurrentNode.m_pParentArea.m_pHighSpeedIONode !== null && g_pChar.m_pCurrentNode.m_pParentArea.m_pHighSpeedIONode.m_bActivated) {
		return 1;
	}

	// Time is size / (2^(bus size))
	let nRate = 1 << (g_pChar.m_nHardware[HW_HIGH_BW_BUS]);
	let nTime = Math.ceil(this.m_nSize / nRate);
	if (nTime < 1)
		nTime = 1;
	return nTime;
}
DSfile.prototype.IsValidForScanEval = function(nProgramClass) {
	if (nProgramClass === PROGRAM_SCAN) {
		if ( this.m_nState & STATE_SCAN ) return false; // if already scanned, invalid
		if ( !(this.m_nState & STATE_IN_NODE) ) return false; // if not in the node, invalid
		if ( this.m_pTapeworm !== null && !this.m_pTapeworm.m_bBypassed ) return false; // if with not-bypassed tapeworm, invalid
		return true;
	} else if (nProgramClass === PROGRAM_EVALUATE) {
		if ( !(this.m_nState & STATE_SCAN) ) return false; // if not scanned, invalid
		if ( this.m_nState & STATE_EVAL ) return false; // if already evaluated, invalid
		if ( !(this.m_nState & STATE_IN_NODE) ) return false; // if not in the node, invalid
		if ( this.m_nType === FT_USELESS ) return false; // if useless, invalid
		if ( this.m_nType === FT_QUEST ) return false; // if quest, invalid
		if ( this.m_pTapeworm !== null ) return false; // if with tapeworm, invalid
		return true;
	}

	return false; // shouldn't happen
}




DSfile.prototype.Generate = function(pParentNode) {
	// Choose contents
	switch (this.m_nType) {
		case FT_USELESS:
			// There is a 25% chance that this is a valuable file type with no value
			if (Random(4)===0) {
				// Change type to valuable
				this.m_nType = FT_VALUABLE;
				this.m_nContents = GetFileTypePerCorp();
			} else {
				this.m_nContents = Random(NUM_USELESS_FILES);
			}
			break;
		case FT_VALUABLE:
			this.m_nContents = GetFileTypePerCorp();

			// Set value according to difficulty (5d9 + (10*Diff), +/- 15%) Averages to 25+(10*Diff)
			this.m_nValue = (5+Random2(5,9)) + (10 * g_pChar.m_pSystem.m_nRating);
			this.m_nValue += Math.floor( (this.m_nValue * (Random(31)-15)) / 100 );
			break;
		case FT_QUEST:
			this.m_nContents = g_pChar.m_pCurrentContract.m_nTargetObject;
			break;
		case FT_CLUE:
			// No value here
			break;
		case FT_PROGRAM:
		case FT_P_SOURCE:
		case FT_C_SOURCE:
			if (this.m_nType === FT_C_SOURCE) {
				// Contents is actually chip type
				this.m_nContents = Random(NUM_CHIPS);
			} else {
				// Contents is actually program type
				// (no client programs allowed)
				do {
					this.m_nContents = Random(NUM_PROGRAMS);
				} while (this.m_nContents === PROGRAM_CLIENT);
			}
			// Value is rating
			let nRoll = Random(100);
			if (nRoll < 15)
				this.m_nValue = g_pChar.m_pSystem.m_nRating - 2;
			else if (nRoll < 45)
				this.m_nValue = g_pChar.m_pSystem.m_nRating - 1;
			else if (nRoll < 85)
				this.m_nValue = g_pChar.m_pSystem.m_nRating;
			else if (nRoll < 95)
				this.m_nValue = g_pChar.m_pSystem.m_nRating + 1;
			else //if (nRoll < 100)
				this.m_nValue = g_pChar.m_pSystem.m_nRating + 2;

			if (this.m_nValue < 1)
				this.m_nValue = 1;
			// No maximum size
			break;
	}

	// Compute size
	if (this.m_nType === FT_PROGRAM)
		this.m_nSize = GetProgramSize(this.m_nContents, this.m_nValue);
	else if (this.m_nType === FT_P_SOURCE)
		this.m_nSize = 2 * GetProgramSize(this.m_nContents, this.m_nValue);
	else if (this.m_nType === FT_C_SOURCE)
		this.m_nSize = 2 * GetChipComplexity(this.m_nContents) * this.m_nValue;
	else {
		let nBase = 2 * g_pChar.m_pSystem.m_nRating;
		this.m_nSize = nBase + Random2(nBase,4);
	}

	// Generate the file name
	let num = Random(0x10000).toString(16).toUpperCase();
	while (num.length < 4) num = "0" + num;

	this.m_szName = pParentNode.m_szName + "-" + num;
}


DSfile.prototype.Save = function(Buffer) {
	Buffer.addString(this.m_szName);
	Buffer.addInteger(this.m_nType);
	Buffer.addInteger(this.m_nValue);
	Buffer.addInteger(this.m_nContents);
	Buffer.addInteger(this.m_nState);
	// Note, we skip the tapeworm. It will be handled when ice is saved
	Buffer.addInteger(this.m_nSize);
}
DSfile.prototype.Load = function(Buffer, version) {
	this.m_szName = Buffer.getString();
	this.m_nType = Buffer.getInteger();
	this.m_nValue = Buffer.getInteger();
	this.m_nContents = Buffer.getInteger();
	this.m_nState = Buffer.getInteger();
	// Note, we skip the tapeworm. It will be handled when ice is saved
	this.m_nSize = Buffer.getInteger();
}

// program.js



const g_nProgramComplexity = [
	2,	// PROGRAM_ATTACK
	3,	// PROGRAM_ATTACK_A
	3,	// PROGRAM_ATTACK_P
	2,	// PROGRAM_SLOW
	3,	// PROGRAM_VIRUS
	3,	// PROGRAM_SILENCE
	4,	// PROGRAM_CONFUSE
	2,	// PROGRAM_WEAKEN
	3,	// PROGRAM_SHIELD
	1,	// PROGRAM_SMOKE
	4,	// PROGRAM_DECOY
	4,	// PROGRAM_MEDIC
	3,	// PROGRAM_ARMOR
	3,	// PROGRAM_HIDE
	2,	// PROGRAM_DECEIVE
	2,	// PROGRAM_RELOCATE
	1,	// PROGRAM_ANALYZE
	1,	// PROGRAM_SCAN
	1,	// PROGRAM_EVALUATE
	2,	// PROGRAM_DECRYPT
	4,	// PROGRAM_REFLECT
	3,	// PROGRAM_ATTACK_BOOST
	3,	// PROGRAM_DEFENSE_BOOST
	3,	// PROGRAM_STEALTH_BOOST
	3,	// PROGRAM_ANALYSIS_BOOST
	4,	// PROGRAM_CLIENT
];

const g_szProgramClassName = [
	"Attack",
	"Area Attack",
	"Piercing Attack",
	"Slow",
	"Virus",
	"Silence",
	"Confuse",
	"Weaken",
	"Shield",
	"Smoke",
	"Decoy",
	"Medic",
	"Armor",
	"Hide",
	"Deceive",
	"Relocate",
	"Analyze",
	"Scan",
	"Evaluate",
	"Decrypt",
	"Reflect",
	"Attack Boost",
	"Defense Boost",
	"Stealth Boost",
	"Analysis Boost",
	"Client Program",
];

// Predefined Programs Tables
const g_szAttackPrograms = [
	"Zap 1.0",
	"Zap 2.1",
	"IceBreaker Mk1",
	"Magnum",
	"AK 4.7",
	"Blaster",
	"IceBreaker Mk2",
	"Bazooka",
	"Magnum II",
	"Zap 4.2",
	"Bazooka",
	"CyberDagger",
	"SuperBlaster",
	"Zap 5.0",
	"CyberSword",
	"MegaBlaster",
	"DigiUzi",
	"CyberKatana",
	"IceBreaker Mk3",
	"GigaBlaster",
];

const g_szAttackAPrograms = [
	"Grenade 1.0",
	"Logic Bomb I",
	"Grenade 1.5",
	"BugSwarm",
	"Shrapnel 1.0",
	"Fireball 1.2",
	"Scattergun",
	"Grenade 2.0",
	"BugSwarm II",
	"Logic Bomb II",
	"Shrapnel 3.0",
	"Grenade 3.0",
	"Fireball 3.1",
	"Logic Bomb III",
	"BugSwarm III",
	"Grenade 4.0",
	"Logic Bomb IV",
	"EMP",
	"Logic Bomb V",
	"Nuke",
];

const g_szAttackPPrograms = [
	"Spear 1.0a",
	"Crossbow",
	"Laser 1.1",
	"Javelin 1.0",
	"Scalpel",
	"Drill 2.2",
	"IcePick 1.3",
	"FMJ",
	"Teflon",
	"Stiletto 1.1.0",
	"Awl 1.0",
	"Drill 3.1",
	"Scalpel II",
	"IcePick 2.0",
	"Laser 4.0",
	"IcePick 2.3",
	"Drill 4.0",
	"Laser 5.1",
	"IcePick 3.0",
	"Shredder",
];

const g_szSlowPrograms = [
	"Slow",
	"Bind 1.0",
	"Goo 1.2",
	"Limpets 1.0",
	"Quicksand 2.3",
	"Glue",
	"Flypaper 1.7a",
	"Goo 2.2",
	"Limpets 2.0",
	"Goo 3.0",
	"Quicksand 3.0",
	"Flypaper 2.2b",
	"SuperGlue",
	"Freeze 1.0",
	"Quicksand",
	"Bind 3.1",
	"Limpets 3.0",
	"KrazyGlue",
	"Bind 4.1",
	"TimeStop",
];

const g_szVirusPrograms = [
	"Flu 1.0",
	"Flu 2.0",
	"Pneumonia 1.2",
	"Arsenic",
	"Strep 1.0",
	"BrainBugs 1.2",
	"RotWorms Mk1",
	"Cancer 2.3",
	"BedBugs",
	"Flu 10.0",
	"Pneumonia 3.1",
	"RotWorms Mk2",
	"Cancer 3.0",
	"More Bedbugs",
	"Cyanide",
	"Pneumonia 4.0",
	"RotWorms Mk2",
	"Cancer 4.0",
	"BrainBugs 3.1",
	"Ebola",
];

const g_szSilencePrograms = [
	"Silence",
	"QuietYou",
	"Gag 3.3",
	"ZipIt 1.0",
	"Muffler 2.1",
	"Shhhh!",
	"Laryngitis 2.3",
	"MouthClamp 2.1",
	"Hush 1.0",
	"QuietYou 2.0",
	"Muffler 3.0",
	"Laryngitis 3.3a",
	"QuietYou 3.0",
	"Hush 2.0",
	"Shhhh! II",
	"Muffler 4.0",
	"QuietYou 4.1",
	"Laryngitis 4.02",
	"ZipIt 2.1",
	"MegaMute",
];

const g_szConfusionPrograms = [
	"Confusion",
	"Duh? 12.3",
	"Gremlins",
	"Gremlins II",
	"LSD 4.1",
	"Duh? 192.334",
	"Lobotomy 1.0",
	"Duh? 3.14159",
	"LSD 5.0",
	"Fermat's Theorem",
	"Lobotomy 2.0",
	"Gump 2.3",
	"BrainFry 1.0",
	"Gremlins III",
	"Lobotomy 3.0",
	"Gump 3.1",
	"BrainFry 2.1",
	"Psychadelicious",
	"Lobotomy 4.0",
	"DanQuayle",
];

const g_szWeakenPrograms = [
	"Weaken",
	"WussyBoy 2.0",
	"Shrink 1.0",
	"Hamstring 1.2",
	"WussyBoy 2.3a",
	"Decrepify Mk1",
	"Soften",
	"Shrink 2.0",
	"Weinee 1.0",
	"GirlyMan 1.0",
	"YouPansy 1.0",
	"Nausea 3.2",
	"Decrepify Mk2",
	"Tenderize",
	"Hamstring 2.2",
	"Decrepify Mk3",
	"GirlyMan 3.2",
	"Weinee 2.0",
	"Sap",
	"Impotence",
];

const g_szShieldPrograms = [
	"Shield",
	"Buckler 1.1a",
	"Umbrella 1.0",
	"Shield Mk2",
	"Blocker 1.0",
	"Bumper",
	"Airbag 1.0",
	"Blocker 2.0",
	"Shield Mk3",
	"Buckler 2.3",
	"Airbag 2.0",
	"Umbrella 3.0",
	"ForceField 1.0",
	"Buckler 3.0",
	"Shield Mk4",
	"Airbag 3.0",
	"Buckler 3.2c",
	"ForceField 2.0",
	"Blocker 7.0",
	"Aegis",
];

const g_szSmokePrograms = [
	"Smoke",
	"Blind 1.0",
	"Darkness 1.1",
	"Distraction 1.1",
	"Escape! 1.2",
	"Fog",
	"Smog",
	"Blind 2.1",
	"Sandstorm",
	"Distraction 2.0",
	"ECM 1.0",
	"Flashbang 1.0",
	"Blind 3.2",
	"Distraction 3.0",
	"WhereDidHeGo?",
	"Blind 3.7",
	"Flashbang 2.0",
	"Distraction 4.1",
	"Blind 4.0a",
	"Houdini",
];

const g_szDecoyPrograms = [
	"Decoy",
	"MirrorImage 1.0",
	"MyBuddy 1.0",
	"StandIn 1.0",
	"Twins 2.0",
	"BodyDouble 1.3",
	"MirrorImage 2.0",
	"Mitosis 1.02",
	"StandIn 2.0",
	"Clone 1.2",
	"MyBuddy 2.0",
	"BodyDouble 2.1",
	"MirrorImage 3.0",
	"Clone 2.0",
	"Mitosis 1.3",
	"Clone 2.21",
	"MirrorImage 4.0",
	"BodyDouble 3.2",
	"StandIn 4.1",
	"Simulacrum",
];

const g_szMedicPrograms = [
	"Medic",
	"FirstAid 1.0",
	"VirtualEMT",
	"Bandage 1.0",
	"Tourniquet 2.2",
	"VirtualNurse",
	"FirstAid 2.4d",
	"MedKit 1.0",
	"Restoration",
	"Succor 1.0",
	"Bandage 2.30",
	"VirtualDoctor",
	"Restoration II",
	"Succor 2.01",
	"Bandage 4.1",
	"Restoration III",
	"Succor 3.2",
	"Restoration IV",
	"VirtualSurgeon",
	"M.A.S.H",
];

const g_szArmorPrograms = [
	"Armor",
	"StoneSkin 1.0",
	"ChainMail",
	"SteelPlate 1.2",
	"Protector 1.2",
	"Kevlar 2.0",
	"Protector 2.3a",
	"SteelPlate 2.1",
	"Kevlar 3.0",
	"StoneSkin 2.0",
	"PlateMail",
	"Kevlar 4.1",
	"Mithril",
	"SteelPlate 3.1",
	"StoneSkin 3.0",
	"Titanium",
	"Mithril II",
	"Titanium Mk2",
	"StoneSkin 4.0",
	"Adamantium",
];

const g_szHidePrograms = [
	"Hide",
	"IgnoreMe 1.0",
	"Cloak",
	"Chameleon 1.0",
	"Hide Mk2",
	"Camouflage 2.1",
	"IgnoreMe 2.0",
	"Inviso",
	"IgnoreMe 2.2a",
	"Camouflage 3.0",
	"Inviso II",
	"Chameleon 2.1",
	"IgnoreMe 3.02",
	"Camouflage 4.1",
	"Inviso III",
	"Enhanced Cloak",
	"IgnoreMe 4.1",
	"Hide Mk5",
	"SuperCloak",
	"HollowMan",
];

const g_szDeceivePrograms = [
	"Deceive",
	"PassGen 2.0",
	"LiarLiar 1.02",
	"FakeOut 3.1",
	"MistakenID 1.2",
	"Masquerade",
	"Costume 2.1",
	"Passport 3.1",
	"Masquerade III",
	"PassGen 3.0",
	"FakeOut 3.2",
	"Masquerade IV",
	"LiarLiar 2.11",
	"Forge 1.0",
	"Costume 3.2",
	"PassGen 4.0",
	"Masquerade VI",
	"Forge 2.0",
	"Forge 2.3a",
	"Politician",
];

const g_szRelocatePrograms = [
	"Relocate",
	"ImGone 1.1",
	"Misdirect 1.0a",
	"WildGooseChase 1.31",
	"TraceBuster 1.0",
	"WrongNumber 1.3",
	"Mislead 1.0",
	"ImGone 2.0",
	"LineSwitch 9.0",
	"Loopback 10.0",
	"WildGooseChase 2.03",
	"Misdirect 2.3b",
	"Mislead 2.0",
	"TraceBuster 2.0",
	"WrongNumber 2.1",
	"RedHerring",
	"Misdirect 3.1a",
	"RedHerring II",
	"TraceBuster 3.0",
	"Trail-B-Gone",
];

const g_szAnalyzePrograms = [
	"Analyze",
	"WhatzIt 1.0",
	"Encyclopedia",
	"Identify 1.0.1",
	"Classify 1.0",
	"Taxonomy 3.0",
	"Autopsy",
	"Classify 2.0",
	"WhatzIt 2.0",
	"Identify 2.1.1",
	"Microscope 1.0",
	"Enhanced Analyze",
	"Taxonomy 5.0",
	"Identify 2.2.0",
	"WhatzIt 3.0",
	"Microscope 3.0",
	"Taxonomy 7.0",
	"WhatzIt 3.2",
	"Identify 3.0.3",
	"Forensics",
];

const g_szScanPrograms = [
	"Scan",
	"FindIt 1.0",
	"NodeSearch 1.2",
	"FindIt 2.0",
	"Detective 1.3",
	"Sherlock 1.1",
	"Flashlight Mk1",
	"FindIt 3.0",
	"NodeSearch 2.0",
	"FindIt 4.0",
	"Snoopy 1.0",
	"Detective 3.1",
	"Flashlight Mk2",
	"NodeSearch 3.1",
	"Snoopy 2.0",
	"Detective 3.5",
	"Sherlock 3.1",
	"Flashlight Mk3",
	"Snoopy 3.0",
	"SuperScan",
];

const g_szEvaluatePrograms = [
	"Evaluate",
	"Priceless 1.0",
	"Divine",
	"BlueBook 1.0",
	"ValueSoft 1.0",
	"Evaluate Mk2",
	"GoldDigger",
	"Priceless 2.0",
	"BlueBook 2.1",
	"Priceless 2.1",
	"Peruse 1.0",
	"Appraise 1.0",
	"Evaluate Mk3",
	"BlueBook 3.0",
	"Priceless 3.0",
	"ValueSoft 7.0",
	"GoldDigger II",
	"Evaluate Mk4",
	"BlueBook 4.0a",
	"ShowMeTheMoney",
];

const g_szDecryptPrograms = [
	"Decrypt",
	"SolveIt 2.0",
	"CodeBreaker 1.1",
	"Descramble",
	"WormKiller 1.2",
	"Untangle",
	"SolveIt 3.0",
	"Decrypt II",
	"CodeBreaker 2.2",
	"WormKiller 1.7",
	"Descramble 95",
	"SolveIt 4.0",
	"Untangle Mk2",
	"WormKiller 2.1",
	"Decrypt III",
	"Descramble 98",
	"CodeBreaker 3.4",
	"SolveIt 6.0",
	"Decrypt IV",
	"SuperCracker",
];

const g_szReflectPrograms = [
	"Reflect",
	"ImRubber 1.1",
	"Reflect Mk2",
	"BounceBack",
	"Reflect Mk3",
	"ImRubber 2.1",
	"Reflect Mk4",
	"ImRubber 3.0",
	"BounceBackEx",
	"Deflector I",
	"Reflect Mk5",
	"BounceBackDeluxe",
	"ImRubber 3.4",
	"Deflector II",
	"ImRubber 4.2",
	"Deflector III",
	"BounceBackPremium",
	"Deflector IV",
	"BounceBackSupreme",
	"Trampoline",
];

const g_szAttackBoostPrograms = [
	"Attack Boost 1.0",
	"Attack Boost 1.1",
	"Attack Boost 1.2",
	"Attack Boost 1.3",
	"Attack Boost 1.4",
	"Attack Boost 1.5",
	"Attack Boost 2.0",
	"Attack Boost 2.1",
	"Attack Boost 2.2",
	"Attack Boost 2.3",
	"Attack Boost 3.1",
	"Attack Boost 3.2",
	"Attack Boost 3.3",
	"Attack Boost 3.4",
	"Attack Boost 4.1",
	"Attack Boost 4.2",
	"Attack Boost 4.3",
	"Attack Boost 5.0",
	"Attack Boost 5.1",
	"Attack Boost 6.0",
];

const g_szDefenseBoostPrograms = [
	"Defense Boost 1.0",
	"Defense Boost 1.1",
	"Defense Boost 1.2",
	"Defense Boost 1.3",
	"Defense Boost 1.4",
	"Defense Boost 1.5",
	"Defense Boost 2.0",
	"Defense Boost 2.1",
	"Defense Boost 2.2",
	"Defense Boost 2.3",
	"Defense Boost 3.1",
	"Defense Boost 3.2",
	"Defense Boost 3.3",
	"Defense Boost 3.4",
	"Defense Boost 4.1",
	"Defense Boost 4.2",
	"Defense Boost 4.3",
	"Defense Boost 5.0",
	"Defense Boost 5.1",
	"Defense Boost 6.0",
];

const g_szStealthBoostPrograms = [
	"Stealth Boost 1.0",
	"Stealth Boost 1.1",
	"Stealth Boost 1.2",
	"Stealth Boost 1.3",
	"Stealth Boost 1.4",
	"Stealth Boost 1.5",
	"Stealth Boost 2.0",
	"Stealth Boost 2.1",
	"Stealth Boost 2.2",
	"Stealth Boost 2.3",
	"Stealth Boost 3.1",
	"Stealth Boost 3.2",
	"Stealth Boost 3.3",
	"Stealth Boost 3.4",
	"Stealth Boost 4.1",
	"Stealth Boost 4.2",
	"Stealth Boost 4.3",
	"Stealth Boost 5.0",
	"Stealth Boost 5.1",
	"Stealth Boost 6.0",
];

const g_szAnalysisBoostPrograms = [
	"Analysis Boost 1.0",
	"Analysis Boost 1.1",
	"Analysis Boost 1.2",
	"Analysis Boost 1.3",
	"Analysis Boost 1.4",
	"Analysis Boost 1.5",
	"Analysis Boost 2.0",
	"Analysis Boost 2.1",
	"Analysis Boost 2.2",
	"Analysis Boost 2.3",
	"Analysis Boost 3.1",
	"Analysis Boost 3.2",
	"Analysis Boost 3.3",
	"Analysis Boost 3.4",
	"Analysis Boost 4.1",
	"Analysis Boost 4.2",
	"Analysis Boost 4.3",
	"Analysis Boost 5.0",
	"Analysis Boost 5.1",
	"Analysis Boost 6.0",
];

const g_ProgramNames = [
	g_szAttackPrograms,
	g_szAttackAPrograms,
	g_szAttackPPrograms,
	g_szSlowPrograms,
	g_szVirusPrograms,
	g_szSilencePrograms,
	g_szConfusionPrograms,
	g_szWeakenPrograms,
	g_szShieldPrograms,
	g_szSmokePrograms,
	g_szDecoyPrograms,
	g_szMedicPrograms,
	g_szArmorPrograms,
	g_szHidePrograms,
	g_szDeceivePrograms,
	g_szRelocatePrograms,
	g_szAnalyzePrograms,
	g_szScanPrograms,
	g_szEvaluatePrograms,
	g_szDecryptPrograms,
	g_szReflectPrograms,
	g_szAttackBoostPrograms,
	g_szDefenseBoostPrograms,
	g_szStealthBoostPrograms,
	g_szAnalysisBoostPrograms,
];

function GetProgramClassName(nClass) {
	return g_szProgramClassName[nClass];
}






var Program = function() {
	// Data Members
	this.m_szName = "";
	this.m_nClass = 0;
	this.m_nRating = 0;
	this.m_bLoadByDefault = false;
	this.m_nLoadedRating = 0;
	this.m_nSound = 0;
};

Program.create = function(nClass, nRating) {
	let pProgram = new Program;

	if (nClass === PROGRAM_CLIENT) {
		pProgram.m_szName = "Client Supplied Program";
		pProgram.m_nSound = SOUND_DEFAULTCLIENT;
	} else {
		if (nRating > 20)
			pProgram.m_szName = g_ProgramNames[nClass][19];
		else
			pProgram.m_szName = g_ProgramNames[nClass][nRating-1];
		pProgram.m_nSound = nClass;
	}
	pProgram.m_nClass = nClass;
	pProgram.m_nRating = nRating;

	return pProgram;
}


// Member Functions
Program.prototype.GetLoadTime = function() {
	// If have a high-speed connection, time is 1 turn
	if ( g_pChar.m_pCurrentNode.m_pParentArea.m_pHighSpeedIONode !== null && g_pChar.m_pCurrentNode.m_pParentArea.m_pHighSpeedIONode.m_bActivated )
		return 1;

	// Time is size / (2^(bus size))
	let nRate = (1 << (g_pChar.m_nHardware[HW_HIGH_BW_BUS]));
	let nTime = Math.ceil(this.GetSize() / nRate);
	if (nTime < 1)
		nTime = 1;
	return nTime;
}

Program.prototype.GetSize = function() {
	return GetProgramSize(this.m_nClass, this.m_nRating);
}


// Global functions
function GetSoftwarePrice(nClass, nRating) {
	return g_nProgramComplexity[nClass] * nRating * nRating * 25;
}
function GetSoftwareText(nClass, nRating) {
	let nIndex;
	if (nRating > 20)
		nIndex = 19;
	else
		nIndex = nRating-1;

	return g_ProgramNames[nClass][nIndex] + " (" + g_szProgramClassName[nClass] + " " + nRating + ")";
}
function GetProgramComplexity(nClass) {
	return g_nProgramComplexity[nClass];
}
function GetProgramSize(nClass, nRating) {
	return g_nProgramComplexity[nClass] * nRating;
}



function DoAttackVsIce(pProgram, pIce) {
	let bLessDamage = false;

	// Get the target number
	let iTargetNumber = 10 + (2*g_pChar.m_pSystem.m_nRating + pIce.GetEffectiveRating(RATING_COMBAT)) - (g_pChar.GetEffectiveRating(RATING_ATTACK) + pProgram.m_nLoadedRating);

	if ( pProgram.m_nClass === PROGRAM_ATTACK ) {
		// Modify if ice is hardened/area/etc
		if ( pIce.m_nType === ICE_ATTACK && ( (pIce.m_nSubType&AST_MASK_HARDENED) || (pIce.m_nSubType&AST_MASK_PHASING) ) )
			iTargetNumber += 3;
	} else if ( pProgram.m_nClass === PROGRAM_ATTACK_A ) {
		// Modify if ice is hardened/area/etc
		if (pIce.m_nType === ICE_ATTACK) {
			if (pIce.m_nSubType&AST_MASK_HARDENED) {
				// Area attacks sucks against hardened
				iTargetNumber += 6;
				bLessDamage = true;
			}
			else if (!(pIce.m_nSubType&AST_MASK_PHASING)) {
				// Against normal targets, target number is increased by 2
				iTargetNumber += 2;
			}
		} else {
			// Against normal targets, target number is increased by 2
			iTargetNumber += 2;
		}
	} else if ( pProgram.m_nClass === PROGRAM_ATTACK_P ) {
		// Modify if ice is hardened/area/etc
		if (pIce.m_nType === ICE_ATTACK) {
			if (pIce.m_nSubType&AST_MASK_PHASING) {
				// Piercing sucks against phasing
				iTargetNumber += 6;
				bLessDamage = true;
			} else if (!(pIce.m_nSubType&AST_MASK_HARDENED)) {
				// Against normal targets, target number is reduced by 2, but damage is also reduced // FIXME: it says 2, but does 3
				iTargetNumber -= 3;
				bLessDamage = true;
			}
		} else {
			// Against normal targets, target number is reduced by 2, but damage is also reduced // FIXME: it says 2, but does 3
			iTargetNumber -= 3;
			bLessDamage = true;
		}
	}

	// Roll the die
	let iSuccess = DoDieRoll(iTargetNumber);

	if (iSuccess>0) {
		// We hit. Compute damage
		let iDamage = ComputeDamage(iSuccess);

		// If we are reducing damage, do it
		if (bLessDamage) {
			// Divide damage in half (round up)
			iDamage = Math.ceil(iDamage/2);
		}

		// Play the program sound effect
		MV.PlayGameSound(pProgram.m_nSound);

		// Print out a message saying so
		MV.l_MessageView.AddMessage(pProgram.m_szName+" program does "+(iDamage*5)+"% damage to "+pIce.m_szName+".", BLACK);

		// Draw the damage
		MV.l_NodeView.DrawDamage(pIce);

		// Modify the Ice's health
		pIce.m_nHealth -= iDamage;
		if (pIce.m_nHealth<=0)
			pIce.Crash();
	} else {
		// We missed. Print out a message saying so
		MV.l_MessageView.AddMessage(pProgram.m_szName+" program missed.", BLACK);
	}

	// It this is a tapeworm set it to destroy the file
	if (pIce.m_nType === ICE_TAPEWORM)
		pIce.m_nState = STATE_DESTROYING;
}

function DoRunProgram(pProgram) {
	let iTargetNumber;
	let iSuccess;

	// Process according to what type of program it is
	switch (pProgram.m_nClass) {
		case PROGRAM_ATTACK:
		case PROGRAM_ATTACK_P:
		case PROGRAM_VIRUS:
		case PROGRAM_CONFUSE:
		case PROGRAM_WEAKEN:
		case PROGRAM_DECEIVE:
		case PROGRAM_DECRYPT:
			// Just make sure we have a target ice
			if (g_pChar.m_pTargettedIce === null) {
				MV.l_MessageView.AddMessage(pProgram.m_szName+" cannot run without a target selected.", BLACK);
				Anim.run();
				return;
			}

		// These are area-effect
		case PROGRAM_ATTACK_A:
		case PROGRAM_SLOW:
			// Run the program
			DoRunProgramVsIce(pProgram, g_pChar.m_pTargettedIce);
			break;

		case PROGRAM_RELOCATE:
			// Make sure we have a trace going
			if (g_pChar.m_pTraceIce === null) {
				// No trace active
				MV.l_MessageView.AddMessage(pProgram.m_szName+" cannot run without an active trace.", BLACK);
				Anim.run();
				return;
			} else {
				// Run the program
				DoRunProgramVsIce(pProgram, g_pChar.m_pTraceIce);
			}
			break;

		case PROGRAM_ANALYZE:
			// Just make sure we have a target ice
			if (g_pChar.m_pTargettedIce === null) {
				MV.l_MessageView.AddMessage(pProgram.m_szName+" cannot run without a target selected.", BLACK);
				Anim.run();
				return;
			}

			// Run the program
			if (!DoRunProgramVsIce(pProgram, g_pChar.m_pTargettedIce)) {
				// Analyze failed
				break;
			}

			if (Config.viewice) {
				Anim.run(() => {
					Popup.icedata().then(DoEndPlayerTurn);
				});
				return;
			}
			break;

		case PROGRAM_SHIELD:
			// See if this is the active shield
			if (pProgram === g_pChar.m_pActiveShield) {
				MV.l_MessageView.AddMessage(pProgram.m_szName+" already active.", BLACK);
			} else {
				// Play the program sound effect
				MV.PlayGameSound(pProgram.m_nSound);

				// Set the new program as the default
				g_pChar.m_pActiveShield = pProgram;

				// redraw icons
				MV.l_tProgramList.redraw();

				MV.l_MessageView.AddMessage(pProgram.m_szName+" activated.", BLUE);

				// Show the 'Shield Active' symbol
				MV.UpdateBar(BAR_SHIELD);
				MV.UpdateActiveBar();
			}
			break;

		case PROGRAM_SILENCE:
			// Get the target number
			iTargetNumber = 10 + 3*g_pChar.m_pSystem.m_nRating - (g_pChar.GetEffectiveRating(RATING_STEALTH) + pProgram.m_nLoadedRating);

			// Roll the die
			iSuccess = DoDieRoll(iTargetNumber);

			if (iSuccess>=0) { // Note - only fails on critical failure, but may only last one round
				// Play the program sound effect
				MV.PlayGameSound(pProgram.m_nSound);

				// Success. Print out a message saying so
				MV.l_MessageView.AddMessage(pProgram.m_szName+" program succeeds. Node is silenced.", BLUE);

				// Set the node's silence level (At least 2 turns)
				g_pChar.m_pCurrentNode.m_nActiveSilenceLevel = 2 + (2*iSuccess);
				MV.UpdateNodeIcons();
			} else {
				// We missed. Print out a message saying so
				MV.l_MessageView.AddMessage(pProgram.m_szName+" program failed.", RED);
			}
			break;

		case PROGRAM_SMOKE:
			// Get the target number
			iTargetNumber = 10 + 3*g_pChar.m_pSystem.m_nRating - (g_pChar.GetEffectiveRating(RATING_STEALTH) + pProgram.m_nLoadedRating);

			// Roll the die
			iSuccess = DoDieRoll(iTargetNumber);

			if (iSuccess>=0) { //Note - only fails on critical failure, but may only last one round
				// Play the program sound effect
				MV.PlayGameSound(pProgram.m_nSound);

				// Success. Print out a message saying so
				MV.l_MessageView.AddMessage(pProgram.m_szName+" program succeeds. Node is smoked.", BLUE);

				// Set the node's silence level (At least two turns)
				g_pChar.m_pCurrentNode.m_nActiveSmokeLevel = 2 + (2*iSuccess);
				MV.UpdateNodeIcons();
			} else {
				// We missed. Print out a message saying so
				MV.l_MessageView.AddMessage(pProgram.m_szName+" program failed.", RED);
			}
			break;

		case PROGRAM_DECOY:
			// Get the target number
			iTargetNumber = 8 + (3*g_pChar.m_pSystem.m_nRating) - (g_pChar.GetEffectiveRating(RATING_STEALTH) + pProgram.m_nLoadedRating);

			// Roll the die
			iSuccess = DoDieRoll(iTargetNumber);

			if (iSuccess>0) {
				// Set the number of decoys
				if (iSuccess > MAX_DECOYS)
					iSuccess = MAX_DECOYS;

				// Play the program sound effect
				MV.PlayGameSound(pProgram.m_nSound);

				// Success. Print out a message saying so
				MV.l_MessageView.AddMessage(pProgram.m_szName+" program succeeds. "+iSuccess+" duplicates created.", BLACK);

				// Add the decoys (keep ones already active)
				while (g_pChar.m_nDecoyCount < iSuccess) {
					// Choose a location
					g_pChar.m_ptDecoyLocation[g_pChar.m_nDecoyCount] = g_pChar.m_pCurrentNode.ChooseLocation(DIR_NONE);

					// Draw a decoy
					MV.l_NodeView.DrawDecoy(g_pChar.m_ptDecoyLocation[g_pChar.m_nDecoyCount]);

					// Increment the decoy count
					g_pChar.m_nDecoyCount++;
				}

			} else {
				// We missed. Print out a message saying so
				MV.l_MessageView.AddMessage(pProgram.m_szName+" program failed.", BLUE);
			}
			break;

		case PROGRAM_MEDIC:
			// Medic automatically works, but loses effectiveness
			if (g_pChar.m_nHealthDeck === MAX_HEALTH) {
				MV.l_MessageView.AddMessage(pProgram.m_szName+" failed because you are not damaged.", BLACK);
			} else {
				// Get target number
				iTargetNumber = 8 + (3*g_pChar.m_pSystem.m_nRating) - (pProgram.m_nLoadedRating + g_pChar.GetEffectiveRating(RATING_DEFENSE));

				// Roll the die
				iSuccess = DoDieRoll(iTargetNumber);

				// Did we succeed?
				if (iSuccess>0) {
					// Play the program sound effect
					MV.PlayGameSound(pProgram.m_nSound);

					// Heal 4*success (4..20)
					g_pChar.m_nHealthDeck += iSuccess*4;
					if (g_pChar.m_nHealthDeck > MAX_HEALTH)
						g_pChar.m_nHealthDeck = MAX_HEALTH;

					// Print a message
					MV.l_MessageView.AddMessage(pProgram.m_szName+" restored your deck to "+(100/MAX_HEALTH*g_pChar.m_nHealthDeck)+"% health.", BLACK);

					// Succeeded. Just reduce the rating by 1
					pProgram.m_nLoadedRating--;
				} else if (iSuccess === -1) {
					// Crash on catastrophic failure
					pProgram.m_nLoadedRating = 0;
				} else {
					// Print a message
					MV.l_MessageView.AddMessage(pProgram.m_szName+" failed.", BLACK);
				}

				// Crash the program if necessary
				if (pProgram.m_nLoadedRating === 0) {
					MV.l_MessageView.AddMessage(pProgram.m_szName+" has crashed.", BLACK);
					DoRemoveProgram(pProgram);
				} else {
					// Update the program's rating in the view
					MV.l_tProgramList.redraw();
				}

				MV.UpdateBar(BAR_DECK);
			}
			break;

		case PROGRAM_ARMOR:
			// See if this is the active armor
			if (pProgram === g_pChar.m_pActiveArmor) {
				MV.l_MessageView.AddMessage(pProgram.m_szName+" already active.", BLACK);
			} else {
				// Play the program sound effect
				MV.PlayGameSound(pProgram.m_nSound);

				// set the new program as the default
				g_pChar.m_pActiveArmor = pProgram;

				// redraw icons
				MV.l_tProgramList.redraw();

				MV.l_MessageView.AddMessage(pProgram.m_szName+" activated.", BLUE);

				// Show the 'Armor Active' symbol
				MV.UpdateActiveBar();
			}
			break;

		case PROGRAM_HIDE:
			// See if this is the active hide
			if (pProgram === g_pChar.m_pActiveHide) {
				MV.l_MessageView.AddMessage(pProgram.m_szName+" already active.", BLACK);
			} else {
				// Play the program sound effect
				MV.PlayGameSound(pProgram.m_nSound);

				// set the new program as the default
				g_pChar.m_pActiveHide = pProgram;

				// redraw icons
				MV.l_tProgramList.redraw();

				MV.l_MessageView.AddMessage(pProgram.m_szName+" activated.", BLUE);

				// Show the 'Hide Active' symbol
				MV.UpdateActiveBar();
			}
			break;

		case PROGRAM_SCAN:
			// What type of node is this
			if (g_pChar.m_pCurrentNode.m_nType === NT_DS) {
				// Get the first program to scan
				g_pChar.m_posScanFile = g_pChar.m_pCurrentNode.m_olFileList.find(pFile => pFile.IsValidForScanEval(PROGRAM_SCAN));
				if (!g_pChar.m_posScanFile) {
					// No scannable files
					g_pChar.m_posScanFile = null;
					g_pChar.m_pActiveScan = null;
					MV.l_MessageView.AddMessage("There are no valid targets for the "+pProgram.m_szName+" program in this node.", BLACK);
					MV.UpdateNodeIcons();
				} else {
					// Start a scan
					g_pChar.m_pActiveScan = pProgram;
					g_pChar.m_nCurrentScanMP = 0;

					// Play the program sound effect
					MV.PlayGameSound(pProgram.m_nSound);

					MV.l_MessageView.AddMessage("Scan started.", BLACK);
					MV.UpdateNodeIcons();
				}
				MV.SoftwareListUpdate();
			} else if (g_pChar.m_pCurrentNode.m_nType === NT_IO) {
				// Play the program sound effect
				MV.PlayGameSound(pProgram.m_nSound);

				switch (g_pChar.m_pCurrentNode.m_nSubType) {
					case NST_IO_QUEST_NODE:
						if (g_pChar.m_pCurrentContract.m_nType !== CONT_RUN_PROGRAM) {
							g_pChar.m_pCurrentNode.m_nSpecialImage = NSI_IO_QUEST;
							MV.l_MapView.RedrawWindow();
							MV.l_MessageView.AddMessage("This node controls the "+g_pChar.m_pCurrentContract.GetTargetObjectText()+" you are searching for.", BLACK);
							break;
						}
						// For Run Program contracts, fall through
					case NST_IO_USELESS:
						MV.l_MessageView.AddMessage("This node controls unimportant IO.", BLACK);
						break;
					case NST_IO_ALARM:
						MV.l_MessageView.AddMessage("This node handles system administrator alarm notification.", BLACK);
						g_pChar.m_pCurrentNode.m_nSpecialImage = NSI_IO_ALARM;
						MV.l_MapView.RedrawWindow();
						break;
					case NST_IO_ICE_PORT:
						MV.l_MessageView.AddMessage("This node is the entry point for ICE into the system.", BLACK);
						g_pChar.m_pCurrentNode.m_nSpecialImage = NSI_IO_ICE_PORT;
						MV.l_MapView.RedrawWindow();
						break;
					case NST_IO_MATRIX:
						MV.l_MessageView.AddMessage("This node contains a high-speed connection to cyberspace.", BLACK);
						g_pChar.m_pCurrentNode.m_nSpecialImage = NSI_IO_MATRIX;
						MV.l_MapView.RedrawWindow();
						break;
				}
			} else if (g_pChar.m_pCurrentNode.m_nType === NT_COP) {
				// Play the program sound effect
				MV.PlayGameSound(pProgram.m_nSound);

				switch (g_pChar.m_pCurrentNode.m_nSubType) {
					case NST_COP_NORMAL:
						MV.l_MessageView.AddMessage("This is a standard coprocessor.", BLACK);
						break;
					case NST_COP_SECURITY:
						MV.l_MessageView.AddMessage("This is the area security node.", BLACK);
						g_pChar.m_pCurrentNode.m_nSpecialImage = NSI_COP_SECURITY;
						MV.UpdateNodeAccessButtons(); // knowing this node subtype may change the available options
						MV.l_MapView.RedrawWindow();
						break;
				}
			} else {
				// Play the program sound effect
				MV.PlayGameSound(pProgram.m_nSound);

				MV.l_MessageView.AddMessage("There is nothing in this node to scan.", BLACK);
			}
			break;

		case PROGRAM_EVALUATE:
			// Get the first program to evaluate
			g_pChar.m_posScanFile = g_pChar.m_pCurrentNode.m_olFileList.find(pFile => pFile.IsValidForScanEval(PROGRAM_EVALUATE));
			if (!g_pChar.m_posScanFile) {
				// No scannable files
				g_pChar.m_posScanFile = null;
				MV.l_MessageView.AddMessage("There are no valid targets for the "+pProgram.m_szName+" program in this node.", BLACK);
				g_pChar.m_pActiveScan = null;
				MV.UpdateNodeIcons();
			} else {
				// Start a scan
				g_pChar.m_pActiveScan = pProgram;
				g_pChar.m_nCurrentScanMP = 0;

				// Play the program sound effect
				MV.PlayGameSound(pProgram.m_nSound);

				MV.l_MessageView.AddMessage("Evaluation started.", BLACK);
			}
			MV.SoftwareListUpdate();
			break;

		case PROGRAM_REFLECT:
			// See if this is the active reflect
			if (pProgram === g_pChar.m_pActiveReflect) {
				MV.l_MessageView.AddMessage(pProgram.m_szName+" already active.", BLACK);
			} else {
				// Play the program sound effect
				MV.PlayGameSound(pProgram.m_nSound);

				// set the new program as the default
				g_pChar.m_pActiveReflect = pProgram;

				// redraw icons
				MV.l_tProgramList.redraw();

				MV.l_MessageView.AddMessage(pProgram.m_szName+" activated.", BLUE);

				// Show the 'Reflect Active' symbol
				MV.UpdateActiveBar();
			}
			break;

		case PROGRAM_ATTACK_BOOST:
		case PROGRAM_DEFENSE_BOOST:
		case PROGRAM_STEALTH_BOOST:
		case PROGRAM_ANALYSIS_BOOST:
			// See if this is the active boost
			if (pProgram === g_pChar.m_pActiveBoost) {
				MV.l_MessageView.AddMessage(pProgram.m_szName+" already active.", BLACK);
			} else {
				// Play the program sound effect
				MV.PlayGameSound(pProgram.m_nSound);

				// set the new program as the default
				g_pChar.m_pActiveBoost = pProgram;

				// redraw icons
				MV.l_tProgramList.redraw();

				MV.l_MessageView.AddMessage(pProgram.m_szName+" activated.", BLUE);

				// Show the 'Boost Active' symbol
				MV.UpdateActiveBar();
			}
			break;

		case PROGRAM_CLIENT:
			// Are we in a target node?
			let inTargetNode = false;
			if (g_pChar.m_pCurrentContract.m_nTargetObject === CT_NODE_CPU && g_pChar.m_pCurrentNode.m_nType === NT_CPU) inTargetNode = true;
			if (g_pChar.m_pCurrentContract.m_nTargetObject === CT_NODE_IO && g_pChar.m_pCurrentNode.m_nType === NT_IO && g_pChar.m_pCurrentNode.m_nSubType === NST_IO_QUEST_NODE) inTargetNode = true;
			if (g_pChar.m_pCurrentContract.m_nTargetObject === CT_NODE_DS && g_pChar.m_pCurrentNode.m_nType === NT_DS && g_pChar.m_pCurrentNode.m_nSubType === NST_DS_QUEST_NODE) inTargetNode = true;

			if (inTargetNode) {
				// We are in the correct node.
				// Is the program already running?
				if (g_pChar.m_nClientProgramStatus !== 0) {
					// Program is already running.
					MV.l_MessageView.AddMessage("Client program is already running.", BLUE);
				} else {
					// Start program running.
					g_pChar.m_nClientProgramStatus = 6 + Math.floor(pProgram.m_nRating/2);

					// redraw icons
					MV.l_tProgramList.redraw();

					// Play the program sound effect
					MV.PlayGameSound(pProgram.m_nSound);

					MV.l_MessageView.AddMessage("Client program activated. "+(g_pChar.m_nClientProgramStatus-1)+" seconds until completion.", BLUE);

					// Show the 'Special Active' symbol
					MV.UpdateNodeIcons();
				}
			} else {
				// Show where the correct nodes are
				let olNodes;

				if (g_pChar.m_pCurrentContract.m_nTargetObject === CT_NODE_IO)
					olNodes = g_pChar.m_pSystem.BuildNodeList(NT_IO, true);
				else if (g_pChar.m_pCurrentContract.m_nTargetObject === CT_NODE_DS)
					olNodes = g_pChar.m_pSystem.BuildNodeList(NT_DS, true);
				else // if (g_pChar.m_pCurrentContract.m_nTargetObject === CT_NODE_CPU)
					olNodes = [ g_pChar.m_pSystem.m_pSystemCPU ];

				// Go through the list of nodes, looking for the IO node
				olNodes.forEach(pNode => {
					if (!pNode.m_bActivated) {
						// This node has not been activated. Let the user know
						MV.l_MessageView.AddMessage("Target node "+pNode.m_szName+" located.", BLUE);
					}

					pNode.m_bMapped = true;

					if (pNode.m_nType === NT_IO)
						pNode.m_nSpecialImage = NSI_IO_QUEST;
					else if (pNode.m_nType === NT_DS)
						pNode.m_nSpecialImage = NSI_DS_QUEST;
				});

				MV.l_MapView.RedrawWindow();
			}
	}

	// End the turn
	DoEndPlayerTurn();
}

function DoRunProgramVsIce(pProgram, pIce) {
	let iTargetNumber;
	let iSuccess;
	let iDamage;
	let bLessDamage = false;

	// Process according to program type
	switch (pProgram.m_nClass) {
		//-----------------
		// Attack Programs
		//-----------------
		case PROGRAM_ATTACK:
		case PROGRAM_ATTACK_P:
			DoAttackVsIce(pProgram, pIce);

			// Need to mark all ice as hostile
			MarkIceAsHostile();
			break;

		case PROGRAM_ATTACK_A:
			// Area attack affects everyone in node
			g_pChar.m_olCurrentIceList.slice(0).forEach(pIce => { // work on a copy, since we may remove elements
				DoAttackVsIce(pProgram, pIce);
			});

			// Need to mark all ice as hostile
			MarkIceAsHostile();
			break;

		case PROGRAM_SLOW:
			g_pChar.m_olCurrentIceList.forEach(pIce => {
				// Get the target number
				iTargetNumber = 10 + (2*g_pChar.m_pSystem.m_nRating + pIce.GetEffectiveRating(RATING_COMBAT)) - (g_pChar.GetEffectiveRating(RATING_ATTACK) + pProgram.m_nLoadedRating);

				// Roll the die
				iSuccess = DoDieRoll(iTargetNumber);

				if (iSuccess>0) {
					// Slow lasts for 4 turns per success
					iSuccess *= 4;

					// Play the program sound effect
					MV.PlayGameSound(pProgram.m_nSound);

					// Success. Print out a message saying so
					MV.l_MessageView.AddMessage(pProgram.m_szName+" program succeeds. "+pIce.m_szName+" is slowed for "+iSuccess+" seconds.", BLACK);

					// Add one to the slow level because it is reduced at the end of the turn
					iSuccess++;

					// Modify the Ice's status only if higher
					if (iSuccess > pIce.m_nSlowLevel)
						pIce.m_nSlowLevel = iSuccess;
				} else {
					// We missed. Print out a message saying so
					MV.l_MessageView.AddMessage(pIce.m_szName+" is unaffected by "+pProgram.m_szName+".", BLACK);
				}

				// It this is a tapeworm set it to destroy the file
				if (pIce.m_nType === ICE_TAPEWORM)
					pIce.m_nState = STATE_DESTROYING;
			});

			// Need to mark all ice as hostile
			MarkIceAsHostile();
			break;

		case PROGRAM_VIRUS:
			// Get the target number
			iTargetNumber = 10 + (2*g_pChar.m_pSystem.m_nRating + pIce.GetEffectiveRating(RATING_COMBAT)) - (g_pChar.GetEffectiveRating(RATING_ATTACK) + pProgram.m_nRating);

			// Roll the die
			iSuccess = DoDieRoll(iTargetNumber);

			if (iSuccess>0) {
				// Virus level is success level * 4
				iSuccess *= 4;

				// Play the program sound effect
				MV.PlayGameSound(pProgram.m_nSound);

				// Success. Print out a message saying so
				MV.l_MessageView.AddMessage(pProgram.m_szName+" program succeeds. "+pIce.m_szName+" is infected for "+iSuccess+" seconds.", BLACK);

				// Add one to the virus level because it is reduced at the end of the turn
				iSuccess++;

				// Modify the Ice's status only if higher
				if (iSuccess > pIce.m_nVirusLevel)
					pIce.m_nVirusLevel = iSuccess;
			} else {
				// We missed. Print out a message saying so
				MV.l_MessageView.AddMessage(pProgram.m_szName+" program failed.", BLACK);
			}

			// Make a second roll versus stealth to see if the ice noticed it
			if (!(pIce.m_nState & STATE_MASK_HOSTILE)) {
				iTargetNumber = 10 + (2*g_pChar.m_pSystem.m_nRating + pIce.GetEffectiveRating(RATING_SENSORS)) - (g_pChar.GetEffectiveRating(RATING_STEALTH) + pProgram.m_nLoadedRating);

				// Roll the die
				iSuccess = DoDieRoll(iTargetNumber);

				if (iSuccess>0)
					MV.l_MessageView.AddMessage("The virus attack goes unnoticed.", BLACK);
				else {
					MV.l_MessageView.AddMessage("The virus attack is noticed!", BLACK);

					// It this is a tapeworm set it to destroy the file
					if (pIce.m_nType === ICE_TAPEWORM)
						pIce.m_nState = STATE_DESTROYING;

					// Need to mark all ice as hostile
					MarkIceAsHostile();
				}
			}
			break;

		case PROGRAM_CONFUSE:
			// Get the target number
			iTargetNumber = 10 + (2*g_pChar.m_pSystem.m_nRating + pIce.GetEffectiveRating(RATING_COMBAT)) - (g_pChar.GetEffectiveRating(RATING_ATTACK) + pProgram.m_nLoadedRating);

			// Roll the die
			iSuccess = DoDieRoll(iTargetNumber);

			if (iSuccess>0) {
				// Confusion lasts for 4 turns per success
				iSuccess *= 4;

				// Play the program sound effect
				MV.PlayGameSound(pProgram.m_nSound);

				// Success. Print out a message saying so
				MV.l_MessageView.AddMessage(pProgram.m_szName+" program succeeds. "+pIce.m_szName+" is confused for "+iSuccess+" seconds.", BLACK);

				// Add one to the confusion level because it is reduced at the end of the turn
				iSuccess++;

				// Modify the Ice's status only if higher
				if (iSuccess > pIce.m_nConfusionLevel)
					pIce.m_nConfusionLevel = iSuccess;
			} else {
				// We missed. Print out a message saying so
				MV.l_MessageView.AddMessage(pProgram.m_szName+" program failed.", BLACK);
			}

			// Only mark ice as hostile if other programs were in the node, or the attack failed
			if (g_pChar.m_olCurrentIceList.length > 1 || iSuccess<1) {
				// It this is a tapeworm set it to destroy the file
				if (pIce.m_nType === ICE_TAPEWORM)
					pIce.m_nState = STATE_DESTROYING;

				// Need to mark all ice as hostile
				MarkIceAsHostile();
			}
			break;

		case PROGRAM_WEAKEN:
			// Get the target number
			iTargetNumber = 10 + (2*g_pChar.m_pSystem.m_nRating + pIce.GetEffectiveRating(RATING_COMBAT)) - (g_pChar.GetEffectiveRating(RATING_ATTACK) + pProgram.m_nLoadedRating);

			// Roll the die
			iSuccess = DoDieRoll(iTargetNumber);

			if (iSuccess>0) {
				// Weaken lasts for 4 turns per success
				iSuccess *= 4;

				// Play the program sound effect
				MV.PlayGameSound(pProgram.m_nSound);

				// Success. Print out a message saying so
				MV.l_MessageView.AddMessage(pProgram.m_szName+" program succeeds. "+pIce.m_szName+" is weakened for "+iSuccess+" seconds.", BLACK);

				// Add one to the weaken level because it is reduced at the end of the turn
				iSuccess++;

				// Modify the Ice's status only if higher
				if (iSuccess > pIce.m_nWeakenLevel)
					pIce.m_nWeakenLevel = iSuccess;
			} else {
				// We missed. Print out a message saying so
				MV.l_MessageView.AddMessage(pProgram.m_szName+" program failed.", BLACK);
			}

			// It this is a tapeworm set it to destroy the file
			if (pIce.m_nType === ICE_TAPEWORM)
				pIce.m_nState = STATE_DESTROYING;

			// Need to mark all ice as hostile
			MarkIceAsHostile();
			break;

		//------------------
		// Stealth Programs
		//------------------
		case PROGRAM_HIDE:
			// Special Case: This is an always active program, so if this function is being called,
			// we must be trying to bypass a gateway/guardian with a hide program active,
			// or else a piece of ice is trying to notice us.
			iTargetNumber = 10 + (2*g_pChar.m_pSystem.m_nRating + pIce.GetEffectiveRating(RATING_SENSORS)) - (g_pChar.GetEffectiveRating(RATING_STEALTH) + pProgram.m_nLoadedRating);

			// If decoys are in use, big penalty
			if (g_pChar.m_nDecoyCount>0)
				iTargetNumber += 4;

			iSuccess = DoDieRoll(iTargetNumber);

			if (iSuccess>0) {
				// Play the program sound effect
				MV.PlayGameSound(pProgram.m_nSound);
				return true;
			} else {
				return false;
			}
			break;

		case PROGRAM_DECEIVE:
			// If the ICE is hostile, it automatically fails
			if (pIce.m_nState & STATE_MASK_HOSTILE) {
				MV.l_MessageView.AddMessage(pIce.m_szName+" already knows you are hostile. Program "+pProgram.m_szName+" has no effect.", BLUE);
				return false;
			}

			// Get the target number
			iTargetNumber = 10 + (2*g_pChar.m_pSystem.m_nRating + pIce.GetEffectiveRating(RATING_SENSORS)) - (g_pChar.GetEffectiveRating(RATING_STEALTH) + pProgram.m_nLoadedRating);
			// If the user has accessed a passcode file, reduce by 4 (20%)
			if (g_pChar.m_pSystem.m_bPasscodeAccessed)
				iTargetNumber -= 4;

			// Roll the die
			iSuccess = DoDieRoll(iTargetNumber);

			if (iSuccess>0) {
				// Play the program sound effect
				MV.PlayGameSound(pProgram.m_nSound);

				// Success. Print out a message saying so
				MV.l_MessageView.AddMessage(pProgram.m_szName+" program succeeds. "+pIce.m_szName+" is deceived.", BLACK);

				MV.l_NodeView.DrawBypass(pIce);

				// Modify the Ice's status
				pIce.m_bBypassed = true;

				// Set the highest deceived level
				if (pIce.m_nRating > g_pChar.m_nHighestDeceivedIce)
					g_pChar.m_nHighestDeceivedIce = pIce.m_nRating;

				// Now, mark everyone at a lower or same rating as deceived
				g_pChar.m_olCurrentIceList.forEach(pTmpIce => {
					// Only mark if rating is same or higher
					if (pTmpIce.m_nRating <= pIce.m_nRating)
						pTmpIce.m_bBypassed = true;
				});

				return true;
			} else {
				// We missed. Print out a message saying so
				MV.l_MessageView.AddMessage(pProgram.m_szName+" program failed. "+pIce.m_szName+" was not deceived.", BLACK);

				// Trigger an alert - only if the ice is not in the query state. If it is in
				// the query state, it will trigger an alert on its next action.
				if (pIce.HasQueried())
					pIce.m_nState = STATE_QUERIED3;
				else {
					DoSetAlert(pIce, ALERT_YELLOW);
					// It this is a tapeworm set it to destroy the file
					if (g_pChar.m_pSystem.m_nAlert === ALERT_RED && pIce.m_nType === ICE_TAPEWORM)
						pIce.m_nState = STATE_DESTROYING;
				}
			}
			break;

		case PROGRAM_RELOCATE:
			// Note - At this point, should have already checked to see
			//        that a trace is actually occurring.

			// Get the target number
			iTargetNumber = 10 + (2*g_pChar.m_pSystem.m_nRating + pIce.GetEffectiveRating(RATING_COMBAT)) - (g_pChar.GetEffectiveRating(RATING_STEALTH) + pProgram.m_nLoadedRating);

			// Roll the die
			iSuccess = DoDieRoll(iTargetNumber);

			if (iSuccess>0) {
				// Play the program sound effect
				MV.PlayGameSound(pProgram.m_nSound);

				// Success. Print out a message saying so
				MV.l_MessageView.AddMessage(pProgram.m_szName+" program succeeds.", BLACK);

				// Remove the trace
				DoClearTrace();

				return true;
			} else {
				// We missed. Print out a message saying so
				MV.l_MessageView.AddMessage(pProgram.m_szName+" program failed.", BLACK);
			}
			break;

		//-------------------
		// Analysis Programs
		//-------------------
		case PROGRAM_ANALYZE:
			// Get the target number (low for analyze)
			iTargetNumber = 8 + (2*g_pChar.m_pSystem.m_nRating + pIce.GetEffectiveRating(RATING_NORMAL)) - (g_pChar.GetEffectiveRating(RATING_ANALYSIS) + pProgram.m_nLoadedRating);

			// Roll the die
			iSuccess = DoDieRoll(iTargetNumber);

			if (iSuccess > pIce.m_nAnalyzed) {
				// Play the program sound effect
				MV.PlayGameSound(pProgram.m_nSound);

				// Success. Print out a message saying so
				MV.l_MessageView.AddMessage(pIce.m_szName+" analyzed ("+(iSuccess*20)+"%)", BLACK);

				pIce.m_nAnalyzed = iSuccess;

				return true;
			} else {
				// We missed. Print out a message saying so
				MV.l_MessageView.AddMessage(pProgram.m_szName+" program failed.", BLACK);

				return false;
			}
			break;

		case PROGRAM_DECRYPT:
			// Make sure this is a tapeworm (should have already been done)
			if (pIce.m_nType !== ICE_TAPEWORM) {
				MV.l_MessageView.AddMessage(pProgram.m_szName+" program only works against tapeworms.", BLACK);
				return false;
			}

			// Get the target number - Decrypt has a base 60% chance of working.
			//   Lower target number so player will want to use this program over deceive.
			// NOPE, same as deceive. But better, tough: grants more access, and if it fails, the worm may not destroy the file
			iTargetNumber = 10 + (2*g_pChar.m_pSystem.m_nRating + pIce.GetEffectiveRating(RATING_NORMAL)) - (g_pChar.GetEffectiveRating(RATING_ANALYSIS) + pProgram.m_nLoadedRating);
			// If the user has accessed a passcode file, reduce by 2 (10%)
			if (g_pChar.m_pSystem.m_bPasscodeAccessed)
				iTargetNumber -= 2;

			// Roll the die
			iSuccess = DoDieRoll(iTargetNumber);

			if (iSuccess>0) {
				// Play the program sound effect
				MV.PlayGameSound(pProgram.m_nSound);

				// Success. Print out a message saying so
				MV.l_MessageView.AddMessage(pProgram.m_szName+" program succeeds. "+pIce.m_szName+" decrypted.", BLACK);

				pIce.Crash();

				return true;
			} else {
				// We missed. Print out a message saying so
				MV.l_MessageView.AddMessage(pProgram.m_szName+" program failed.", BLACK);

				// Make a second roll versus stealth to see if the ice noticed it
				iTargetNumber = 8 + (2*g_pChar.m_pSystem.m_nRating + pIce.GetEffectiveRating(RATING_SENSORS)) - (g_pChar.GetEffectiveRating(RATING_STEALTH) + pProgram.m_nLoadedRating);

				// Roll the die
				iSuccess = DoDieRoll(iTargetNumber);

				if (iSuccess<=0) {
					MV.l_MessageView.AddMessage(pIce.m_szName+" noticed the decrypt attempt!", RED);

					// Need to mark all ice as hostile
					MarkIceAsHostile();
					pIce.m_nState = STATE_DESTROYING;
				}

				return false;
			}
			break;

		//---------------------------------------------
		// These do not target ice, and so are illegal
		//---------------------------------------------
		//case PROGRAM_SILENCE:
		//case PROGRAM_SHIELD:
		//case PROGRAM_SMOKE:
		//case PROGRAM_DECOY:
		//case PROGRAM_MEDIC:
		//case PROGRAM_ARMOR:
		//case PROGRAM_SCAN:
		//case PROGRAM_EVALUATE:
	}

	// Done
	return false;
}




Program.prototype.Save = function(Buffer) {
	Buffer.addString(this.m_szName);
	Buffer.addInteger(this.m_nClass);
	Buffer.addInteger(this.m_nRating);
	Buffer.addInteger(this.m_bLoadByDefault);
	Buffer.addInteger(this.m_nLoadedRating);
	Buffer.addInteger(this.m_nSound);
}
Program.Load = function(Buffer, version) {
	let pProgram = new Program;

	pProgram.m_szName = Buffer.getString();
	pProgram.m_nClass = Buffer.getInteger();
	pProgram.m_nRating = Buffer.getInteger();
	pProgram.m_bLoadByDefault = Buffer.getInteger();
	pProgram.m_nLoadedRating = Buffer.getInteger();
	if (version < 1000)
		pProgram.m_nSound = this.m_nClass;
	else
		pProgram.m_nSound = Buffer.getInteger();

	return pProgram;
}

// character.js


const g_szHardwareName = [
	"Chip Burner",
	"Surge Suppressor",
	"Neural Damper",
	"Trace Monitor",
	"Bio Monitor",
	"High Bandwidth Bus",
	"Proximity Mapper",
	"Design Assistant",
	"AntiTrace Proxy",
];

const g_bInitialProgramFlag = [
	true,	// PROGRAM_ATTACK
	false,	// PROGRAM_ATTACK_A
	false,	// PROGRAM_ATTACK_P
	false,	// PROGRAM_SLOW
	false,	// PROGRAM_VIRUS
	true,	// PROGRAM_SILENCE
	false,	// PROGRAM_CONFUSE
	false,	// PROGRAM_WEAKEN
	false,	// PROGRAM_SHIELD
	true,	// PROGRAM_SMOKE
	false,	// PROGRAM_DECOY
	true,	// PROGRAM_MEDIC
	true,	// PROGRAM_ARMOR
	true,	// PROGRAM_HIDE
	true,	// PROGRAM_DECEIVE
	false,	// PROGRAM_RELOCATE
	true,	// PROGRAM_ANALYZE
	true,	// PROGRAM_SCAN
	true,	// PROGRAM_EVALUATE
	true,	// PROGRAM_DECRYPT
	false,	// PROGRAM_REFLECT
];



function Character() {

	// Game settings
	this.m_bTooltips = false; // Tooltips enabled
	this.m_bIronMan = false; // Ironman Mode

	//------------------
	// Basic Attributes
	//------------------
	this.m_szName = "";				// Name
	this.m_nCredits = 100;			// Money
	this.m_nLifestyle = LS_STREET;	// Lifestyle
	this.m_nRepLevel = 0;			// Reputation Level
	this.m_nRepPoints = 0;			// Reputation Points

	// Character Skills
	this.m_nAttackSkill = 1;
	this.m_nDefenseSkill = 1;
	this.m_nStealthSkill = 1;
	this.m_nAnalysisSkill = 1;
	this.m_nProgrammingSkill = 1;
	this.m_nChipDesignSkill = 1;
	this.m_nSkillPoints = 0; // Skill points to increase skills

	// Other Attributes
	this.m_nImage = 0; // Image in matrix (avatar)
	this.m_bBackdoor = []; // Backdoors
	this.m_bSystemAlerts = []; // Systems in alert


	//------------------
	// Deck Components
	//------------------
	this.m_nChip = []; // Chips
	this.m_nChip[CHIP_CPU] = 1;
	this.m_nChip[CHIP_ATTACK] = 1;
	this.m_nChip[CHIP_DEFENSE] = 1;
	this.m_nChip[CHIP_STEALTH] = 1;
	this.m_nChip[CHIP_ANALYSIS] = 1;
	this.m_nChip[CHIP_COPROCESSOR] = 1;
	this.m_nHardware = []; // Hardware
	this.m_nHardware[HW_CHIP_BURNER	] = 0;
	this.m_nHardware[HW_SURGE_SUPP	] = 0;
	this.m_nHardware[HW_NEURAL_DAMPER] = 0;
	this.m_nHardware[HW_TRACE_MONITOR] = 0;
	this.m_nHardware[HW_BIO_MONITOR	] = 0;
	this.m_nHardware[HW_HIGH_BW_BUS	] = 0;
	for (let i = 0; i<NUM_HW_RESERVED; i++)
		this.m_nHardware[i] = 0;

	// Software
	this.m_olSoftware = [];
	this.m_nCurrentLoad = 0;
	this.m_nLoadStatus = 0;

	// Default Programs
	this.m_pDefAttackProgram = null;	// Default attack program
	this.m_pDefArmorProgram = null;		// Default armor program
	this.m_pDefShieldProgram = null;	// Default shield program
	this.m_pDefHideProgram = null;		// Default hide program
	this.m_pDefReflectProgram = null;	// Default reflect program

	//----------------------
	// Contract Information
	//----------------------
	this.m_olContracts = []; // Available Contracts
	this.m_pCurrentContract = null; // Current Contract

	//------------------
	// Projects
	//------------------
	this.m_olSourceCode = []; // Source Code

	// Current project
	this.m_nProjectType = -1;
	this.m_nProjectClass = 0;
	this.m_nProjectRating = 0;
	this.m_nProjectInitialTime = 0;
	this.m_nProjectTimeLeft = 0;

	// Chip being burned
	this.m_pChipBurning = null;
	this.m_nChipBurnTimeLeft = 0;

	//---------------
	// Items at Shop
	//---------------
	this.m_olShopList = [];

	// Item on order
	this.m_nOrderItemType = -1;
	this.m_nOrderItemClass = 0;
	this.m_nOrderItemRating = 0;
	this.m_nOrderTimeLeft = 0;

	//------------------
	// Game State
	//------------------
	// Game time
	this.m_nDayOfMonth = 0;
	this.m_nMonth = 0;
	this.m_nYear = 2132;
	this.m_nDayOfWeek = 0;

	this.m_bOnRun = false;	// Are we on a run?
	this.m_nRunTime = 0;	// Current time in the run (seconds)
	this.m_dwRunFlags = 0;	// Flags for use during run

	// Current health
	this.m_nHealthPhysical = MAX_HEALTH;
	this.m_nHealthMental = 0;
	this.m_nHealthDeck = 0;

	// Damage (temporary)
	this.m_nDamageMental = 0;
	this.m_nDamageDeck = 0;

	this.m_pSystem = null;					// Current System
	this.m_pCurrentNode = null;				// The node we are in
	this.m_ptNodeLoc = new Point(0,0);		// Location within the node

	this.m_pTargettedIce = null;	// ICE which is targetted
	this.m_olCurrentIceList = [];	// ICE list for current node
	this.m_nHighestDeceivedIce = 0;	// Highest rating of ICE deceived

	// Active Programs
	this.m_pActiveArmor = null;
	this.m_pActiveShield = null;
	this.m_pActiveHide = null;
	this.m_pActiveScan = null;
	this.m_pActiveReflect = null;
	this.m_pActiveBoost = null;
	this.m_nDecoyCount = 0;
	this.m_ptDecoyLocation = [];
	this.m_nClientProgramStatus = 0;

	// Trace information
	this.m_pTraceIce = null;		// The ice that started the trace
	this.m_nTraceInitialTime = 0;	// Total time for the trace to complete
	this.m_nTraceTurnsLeft = 0;		// Number of turns left on trace
	this.m_nTraceType = 0;			// Type of trace (Use trace sub-types)
	this.m_bTraced = false;			// Have we been traced

	// Transfer details
	this.m_pTransferProgram = null;
	this.m_pTransferFile = null;
	this.m_nTransferInitialTime = 0;
	this.m_nTransferTurnsLeft = 0;
	this.m_nFileTransferType = 0; // Download or edit

	// Scan/Eval status
	this.m_nCurrentScanMP = 0;
	this.m_posScanFile = null;

	this.calcCurrentLoad();
};

Character.prototype.CreateNew = function(nBonus) {
	// Adjust for bonuses
	if (nBonus === BONUS_SKILLS) {
		this.m_nAttackSkill = 2;
		this.m_nDefenseSkill = 2;
		this.m_nStealthSkill = 2;
		this.m_nAnalysisSkill = 2;
		this.m_nProgrammingSkill = 2;
		this.m_nChipDesignSkill = 2;
	} else if (nBonus === BONUS_HARDWARE) {
		this.m_nChip[CHIP_CPU] = 2;
		this.m_nChip[CHIP_ATTACK] = 2;
		this.m_nChip[CHIP_DEFENSE] = 2;
		this.m_nChip[CHIP_STEALTH] = 2;
		this.m_nChip[CHIP_ANALYSIS] = 2;
		this.m_nChip[CHIP_COPROCESSOR] = 2;
	} else if (nBonus === BONUS_MONEY) {
		this.m_nCredits = 2000;
	}

	// Create initial programs
	for (let nType = 0; nType < NUM_PROGRAMS; nType++) {
		if (!g_bInitialProgramFlag[nType]) continue;

		let pProgram = Program.create(nType, (nBonus === BONUS_SOFTWARE) ? 2 : 1);

		pProgram.m_bLoadByDefault = true;
		this.m_olSoftware.push(pProgram);

		if (nType === PROGRAM_ATTACK)
			this.m_pDefAttackProgram = pProgram;
		else if (nType === PROGRAM_ARMOR)
			this.m_pDefArmorProgram = pProgram;
		else if (nType === PROGRAM_SHIELD)
			this.m_pDefShieldProgram = pProgram;
		else if (nType === PROGRAM_HIDE)
			this.m_pDefHideProgram = pProgram;
		else if (nType === PROGRAM_REFLECT)
			this.m_pDefReflectProgram = pProgram;
	}

	// Generate initial contracts
	this.GenerateContracts(true);

	// Generate initial shop items
	this.GenerateShopItems();
}

Character.prototype.GetLifestyleString = function() {
	return g_szLifestyleString[this.m_nLifestyle];
}

Character.prototype.calcCurrentLoad = function() {
	this.m_nCurrentLoad = 0;

	this.m_olSoftware.forEach(pProgram => {
		if (!this.m_bOnRun) {
			// Update loaded rating
			if (pProgram.m_bLoadByDefault) {
				pProgram.m_nLoadedRating = pProgram.m_nRating;
			} else {
				pProgram.m_nLoadedRating = 0;
			}
		}
		if (pProgram.m_nLoadedRating!=0) {
			this.m_nCurrentLoad += pProgram.GetSize();
		}
	});

	// Get the load modifier
	let [nLight, nHeavy, nMax] = this.GetLoadRatings();

	if (this.m_nCurrentLoad < nLight)
		this.m_nLoadStatus = LS_LIGHT;
	else if (this.m_nCurrentLoad > nHeavy)
		this.m_nLoadStatus = LS_HEAVY;
	else
		this.m_nLoadStatus = LS_NORMAL;
}

// returns load ratings. Array [light, normal, heavy]
Character.prototype.GetLoadRatings = function() {
	let nSum = this.m_nChip[CHIP_CPU] + Math.min(this.m_nChip[CHIP_COPROCESSOR], this.m_nChip[CHIP_CPU]);

	return [ 10*nSum, 20*nSum, 30*nSum ];
}


// bFirst: if true, generates one extra contract, as easy as possible
Character.prototype.GenerateContracts = function(bFirst) {
	// Generate 1..3+(Rep/5) contracts (1 = 1..3, 5 = 1..4, etc.)
	let nMax = 3 + Math.floor(this.m_nRepLevel/5);
	let nCount = 1 + Random(nMax);

	// Generate up to the maximum number
	if (nCount + this.m_olContracts.length > nMax)
		nCount = nMax - this.m_olContracts.length;

	if (bFirst) {
		let pContract = new Contract;
		pContract.Generate(true);
		this.m_olContracts.push(pContract);
	}
	while (nCount-- > 0) {
		let pContract = new Contract;
		pContract.Generate();
		this.m_olContracts.push(pContract);
	}
}

Character.prototype.ClearContracts = function() {
	this.m_olContracts = [];
}

Character.prototype.ClearCurrentContract = function() {
	// If no contract, nothing to do
	if (this.m_pCurrentContract === null) return;

	// If this is a 'run program' contract, delete the client program(s)
	if (this.m_pCurrentContract.m_nType === CONT_RUN_PROGRAM) {
		for (let i=this.m_olSoftware.length-1; i>=0; i--) {
			if (this.m_olSoftware[i].m_nClass === PROGRAM_CLIENT)
				this.m_olSoftware.splice(i,1);
		}
		this.calcCurrentLoad();
	}

	// Delete the contract
	this.m_pCurrentContract = null;
}



// Generate initial shop items
Character.prototype.GenerateShopItems = function() {
	let iCount;

	// Clear out the old items
	this.ClearShopItems();

	//-------------------
	// Generate software
	//-------------------
	// Get number to have on sale (3d4)
	iCount = 3 + Random(4) + Random(4) + Random(4);

	// Create the items
	for (let i=0; i<iCount; i++) {
		// Allocate a new item
		let pItem = new ShopItem;

		// Generate until we get a non-duplicate
		do {
			pItem.Generate(IT_SOFTWARE);
		} while (this.FindShopItem(pItem));

		// Add the item to the list
		this.m_olShopList.push(pItem);
	}

	//-------------------
	// Generate hardware
	//-------------------
	// Get number to have on sale (1d4)
	iCount = 1 + Random(4);

	// Create the items
	for (let i=0; i<iCount; i++) {
		// Allocate a new item
		let pItem = new ShopItem;

		// Generate until we get a non-duplicate
		do {
			pItem.Generate(IT_HARDWARE);
		} while (this.FindShopItem(pItem));

		// Add the item to the list
		this.m_olShopList.push(pItem);
	}

	//-------------------
	// Generate chips
	//-------------------
	// Get number to have on sale (2d4)
	iCount = 2 + Random(4) + Random(4);

	// Create the items
	for (let i=0; i<iCount; i++) {
		// Allocate a new item
		let pItem = new ShopItem;

		// Generate until we get a non-duplicate
		do  {
			pItem.Generate(IT_CHIP);
		} while (this.FindShopItem(pItem));

		// Add the item to the list
		this.m_olShopList.push(pItem);
	}
}

Character.prototype.ClearShopItems = function() {
	this.m_olShopList = [];
}

Character.prototype.FindShopItem = function(pItem) {
	let bFound = false;
	this.m_olShopList.forEach(pListItem => {
		if ( pItem.m_nType === pListItem.m_nType && pItem.m_nSubType === pListItem.m_nSubType && pItem.m_nRating === pListItem.m_nRating )
			bFound = true;
	});

	return bFound;
}

Character.prototype.FindProgram = function(nType, bLoaded=true) {
	let pHighestProgram = null;

	// Scan the software list
	// Look for the highest rated program of this type
	this.m_olSoftware.forEach(pProgram => {
		if (pProgram.m_nClass !== nType) return;

		if (bLoaded) { // Only consider loaded programs
			if (pProgram.m_nLoadedRating <= 0) return;
			if ( pHighestProgram === null || pProgram.m_nLoadedRating > pHighestProgram.m_nLoadedRating )
				pHighestProgram = pProgram;
		} else { // Consider all programs
			if ( pHighestProgram === null || pProgram.m_nRating > pHighestProgram.m_nRating )
				pHighestProgram = pProgram;
		}
	});

	return pHighestProgram;
}


Character.prototype.GetEffectiveRating = function(nType) {
	let nRating = 0;

	switch (nType) {
		case RATING_ATTACK:
			nRating = Math.min(this.m_nChip[CHIP_ATTACK], this.m_nChip[CHIP_CPU]) + this.m_nAttackSkill;
			if (this.m_pCurrentNode.m_nActiveSmokeLevel)
				nRating -= 4;
			if (this.m_pActiveBoost !== null && this.m_pActiveBoost.m_nClass === PROGRAM_ATTACK_BOOST)
				nRating += 3;
			break;
		case RATING_DEFENSE:
			nRating = Math.min(this.m_nChip[CHIP_DEFENSE], this.m_nChip[CHIP_CPU]) + this.m_nDefenseSkill;
			if (this.m_pCurrentNode.m_nActiveSmokeLevel)
				nRating += 4;
			if (this.m_pActiveBoost !== null && this.m_pActiveBoost.m_nClass === PROGRAM_DEFENSE_BOOST)
				nRating += 3;
			break;
		case RATING_STEALTH:
			nRating = Math.min(this.m_nChip[CHIP_STEALTH], this.m_nChip[CHIP_CPU]) + this.m_nStealthSkill;
			if (this.m_pCurrentNode.m_nActiveSmokeLevel)
				nRating += 4;
			if (this.m_pActiveBoost !== null && this.m_pActiveBoost.m_nClass === PROGRAM_STEALTH_BOOST)
				nRating += 3;
			if (this.m_bTraced) nRating -= 4; // If traced, reduce the rating
			break;
		case RATING_ANALYSIS:
			nRating = Math.min(this.m_nChip[CHIP_ANALYSIS], this.m_nChip[CHIP_CPU]) + this.m_nAnalysisSkill;
			if (this.m_pCurrentNode.m_nActiveSmokeLevel)
				nRating -= 4;
			if (this.m_pActiveBoost !== null && this.m_pActiveBoost.m_nClass === PROGRAM_ANALYSIS_BOOST)
				nRating += 3;
			break;
	}

	// Modify by deck load
	if (this.m_nLoadStatus === LS_LIGHT)
		nRating += 1;
	else if (this.m_nLoadStatus === LS_HEAVY)
		nRating -= 2;

	// If running a client program, reduce all ratings
	if (this.m_nClientProgramStatus !== 0)
		nRating -= 3;

	// Modify by deck condition - half normal
	nRating += Math.floor( GetConditionModifier(this.m_nHealthDeck) / 2 );

	// Modify by physical condition (Use lower of stun/lethal)
	nRating += GetConditionModifier( Math.min(this.m_nHealthMental, this.m_nHealthPhysical) );

	return nRating;
}

function TotalPoints(nSkill) {
	return (nSkill * (nSkill-1)) / 2;
}

Character.prototype.GetEffectiveLevel = function() {
	// Compute the total skill points earned
	let nTotal = this.m_nSkillPoints;
	nTotal += TotalPoints(this.m_nAttackSkill);
	nTotal += TotalPoints(this.m_nDefenseSkill);
	nTotal += TotalPoints(this.m_nStealthSkill);
	nTotal += TotalPoints(this.m_nAnalysisSkill);
	nTotal += TotalPoints(this.m_nProgrammingSkill);
	nTotal += TotalPoints(this.m_nChipDesignSkill);

	// Divide the total by 6 to get average
	nTotal = Math.floor( nTotal/6 );

	// Now, compute the average skill level if we divided the skills evenly
	let nLevel = 1;
	while (nTotal >= nLevel) {
		nTotal -= nLevel;
		nLevel++;
	}

	return nLevel;
}

Character.prototype.GetCurrentItemLevel = function(nType, nSubType) {
	if (nType === IT_SOFTWARE) {
		// Look for the highest rated program of this type
		let nMax = 0;
		this.m_olSoftware.forEach(pProgram => {
			if ( pProgram.m_nClass === nSubType && pProgram.m_nRating > nMax )
				nMax = pProgram.m_nRating;
		});
		return nMax;
	} else if (nType === IT_HARDWARE) {
		return this.m_nHardware[nSubType];
	} else if (nType === IT_CHIP) {
		return this.m_nChip[nSubType];
	} else {
		return 0; // shouldn't happen
	}
}


// Executes "then" if player survives. Closes everything and restarts if they die.
Character.prototype.PassTime = function(nDays, then) {
	let endGame = false;
	let msgs = [];

	// Update the current game time
	this.m_nDayOfMonth += nDays;
	while ( this.m_nDayOfMonth >= GetDays(this.m_nMonth,this.m_nYear) ) {
		this.m_nDayOfMonth -= GetDays(this.m_nMonth,this.m_nYear);
		this.m_nMonth++;
		if (this.m_nMonth === 12) {
			this.m_nMonth = 0;
			this.m_nYear++;
		}

		// Reduce system backdoor times
		this.m_bBackdoor.forEach((val,idx,arr) => {
			if (val > 0)
				arr[idx]--;
		});

		// Collect rent
		let txtMonth = "-- End of "+g_szMonthNames[(g_pChar.m_nMonth+11)%12]+" --\n\n";
		if (this.m_nCredits >= g_nLifestyleMonthlyCost[this.m_nLifestyle]) {
			this.m_nCredits -= g_nLifestyleMonthlyCost[this.m_nLifestyle];

			msgs.push(txtMonth+"Your monthly rent of "+g_nLifestyleMonthlyCost[this.m_nLifestyle]+"cr has been collected.");
		} else {
			while (this.m_nCredits < g_nLifestyleMonthlyCost[this.m_nLifestyle]) {
				if (this.m_nLifestyle === 0) {
					msgs.push(txtMonth+"You are broke. Some thugs come to 'repossess' all of your possessions, including your cyberdeck.\nGame over.");
					endGame = true;
					break;
				} else {
					this.m_nLifestyle--;
				}
			}
			if (endGame) break;

			this.m_nCredits -= g_nLifestyleMonthlyCost[this.m_nLifestyle];
			msgs.push(txtMonth+"You do not have enough money for rent. Your lifestyle has been downgraded to "+this.GetLifestyleString()+".\n\nYour new monthly rent of "+g_nLifestyleMonthlyCost[this.m_nLifestyle]+"cr has been collected.");
		}
	}

	if (msgs.length) {
		Popup.alert(msgs).then(() => {
			if (endGame) {
				Popup.closeAll();
				Popup.welcome();
				return;
			}
			this.PassTime2(nDays, then);
		});
	} else {
		this.PassTime2(nDays, then);
	}
}

Character.prototype.PassTime2 = function(nDays, then) {
	let msgs = [];

	// Update available contract times
	let toRemove = [];
	this.m_olContracts.forEach((pContract,i,arr) => {
		if (pContract.m_nDaysLeft <= nDays) {
			// Contract expired. Possibly create a new one to replace it
			if (Random(2)===0) {
				let pCont = new Contract;
				pCont.Generate();
				arr[i] = pCont;
			} else {
				// Delete it
				toRemove.unshift(i);
			}
		} else {
			pContract.m_nDaysLeft -= nDays;

			// Increase pay by 10% per day
			for (let i=0; i<nDays; i++)
				pContract.m_nPay += Math.floor(pContract.m_nPay / 10);
		}
	});
	toRemove.forEach(i => g_pChar.m_olContracts.splice(i,1));

	// Update current contract deadline
	if (this.m_pCurrentContract !== null) {
		if (this.m_pCurrentContract.m_nDaysLeft <= nDays) {
			// Contract failed
			let szTxt = "The deadline for your contract has passed. Your reputation has suffered as a result.";

			this.m_nRepPoints -= this.m_pCurrentContract.m_nDifficulty;
			if (this.m_nRepPoints < 0)
				this.m_nRepPoints = 0;

			if ( this.m_nRepLevel > 0 && this.m_nRepPoints < CalcRepPointsForNextLevel(this.m_nRepLevel-1) ) {
				this.m_nRepLevel--;
				szTxt += "\n\nFalls to " + g_szRepLevelString[g_pChar.m_nRepLevel] + ".";
			}

			msgs.push(szTxt);

			// Remove the contract
			this.ClearCurrentContract();
		} else {
			this.m_pCurrentContract.m_nDaysLeft -= nDays;
		}
	}

	// Update day of week
	this.m_nDayOfWeek += nDays;

	// If new week, generate new contracts and shop items
	if (this.m_nDayOfWeek >= 7) {
		this.m_nDayOfWeek %= 7;

		this.GenerateShopItems();
		this.GenerateContracts();

		msgs.push("New contracts and shop items available.");
	}

	if (msgs.length) {
		Popup.alert(msgs).then(() => {
			this.PassTime3(nDays, then);
		});
	} else {
		this.PassTime3(nDays, then);
	}
}

Character.prototype.PassTime3 = function(nDays, then) {
	// Update cooking chip
	if (this.m_pChipBurning !== null) {
		this.m_nChipBurnTimeLeft -= (nDays * this.m_nHardware[HW_CHIP_BURNER]);
		if (this.m_nChipBurnTimeLeft <= 0) {
			// Chip burn complete
			let szTxt = "Your new Rating "+this.m_pChipBurning.m_nRating+" "+GetChipName(this.m_pChipBurning.m_nClass)+" chip is done. Do you wish to install it? (Old chip is rating "+this.m_nChip[this.m_pChipBurning.m_nClass]+")";

			Popup.confirm(szTxt).then(R => {
				if (R) {
					this.m_nChip[this.m_pChipBurning.m_nClass] = this.m_pChipBurning.m_nRating;
					szTxt = "Chip has been installed.";
				} else {
					szTxt = "Chip has been discarded.";
				}
				Popup.alert(szTxt).then(() => {
					this.m_pChipBurning = null;
					this.PassTime4(nDays, then);
				});
				return;
			});
			return;
		}
	}
	this.PassTime4(nDays, then);
}

Character.prototype.PassTime4 = function(nDays, then) {
	let msg = null;

	// Update any shop orders
	if (this.m_nOrderItemType !== -1) {
		this.m_nOrderTimeLeft -= nDays;

		if (this.m_nOrderTimeLeft <= 0) {
			msg = "Your order has arrived.";

			if (this.m_nOrderItemType === IT_SOFTWARE) {
				// Create a new program
				let pProgram = Program.create(this.m_nOrderItemClass, this.m_nOrderItemRating);
				this.m_olSoftware.push(pProgram);
			} else if (this.m_nOrderItemType === IT_CHIP) {
				this.m_nChip[this.m_nOrderItemClass] = this.m_nOrderItemRating;
			} else { //IT_HARDWARE
				this.m_nHardware[this.m_nOrderItemClass] = this.m_nOrderItemRating;
			}

			// Clear the order
			this.m_nOrderItemType = -1;
		}
	}

	// Update system alerts
	this.m_bSystemAlerts.forEach((val,idx,arr) => {
		if (val > nDays)
			arr[idx] -= nDays;
		else
			arr[idx] = 0;
	});

	if (msg) {
		Popup.alert(msg).then(() => {
			if (then) then();
		});
	} else {
		if (then) then();
	}
}




Character.prototype.Save = function(Buffer) {
	// Basic Attributes
	Buffer.addString(this.m_szName);
	Buffer.addInteger(this.m_bIronMan);
	Buffer.addInteger(this.m_bTooltips);
	Buffer.addInteger(this.m_nCredits);
	Buffer.addInteger(this.m_nLifestyle);
	Buffer.addInteger(this.m_nRepLevel);
	Buffer.addInteger(this.m_nRepPoints);
	Buffer.addInteger(this.m_nAttackSkill);
	Buffer.addInteger(this.m_nDefenseSkill);
	Buffer.addInteger(this.m_nStealthSkill);
	Buffer.addInteger(this.m_nAnalysisSkill);
	Buffer.addInteger(this.m_nProgrammingSkill);
	Buffer.addInteger(this.m_nChipDesignSkill);
	Buffer.addInteger(this.m_nSkillPoints);
	Buffer.addInteger(this.m_nImage);
	Buffer.addByteArray(this.m_bBackdoor, NUM_CORP);
	Buffer.addByteArray(this.m_bSystemAlerts, NUM_CORP);

	// Chips
	for (let i=0; i<NUM_CHIPS; i++)
		Buffer.addInteger(this.m_nChip[i]);

	// Hardware
	for (let i=0; i<NUM_HW_RESERVED; i++)
		Buffer.addInteger(this.m_nHardware[i]);

	// Software
	Buffer.addWord(this.m_olSoftware.length);
	this.m_olSoftware.forEach(pProgram => {
		// Write the program
		pProgram.Save(Buffer);
	});
	// No need to write current load or load status

	// Default Programs
	Buffer.addElement(this.m_pDefAttackProgram, this.m_olSoftware);
	Buffer.addElement(this.m_pDefArmorProgram, this.m_olSoftware);
	Buffer.addElement(this.m_pDefShieldProgram, this.m_olSoftware);
	Buffer.addElement(this.m_pDefHideProgram, this.m_olSoftware);
	Buffer.addElement(this.m_pDefReflectProgram, this.m_olSoftware);

	// Contracts
	Buffer.addWord(this.m_olContracts.length);
	this.m_olContracts.forEach(pContract => {
		// Write the program
		pContract.Save(Buffer);
	});
	if (this.m_pCurrentContract === null)
		Buffer.addBoolean(false);
	else {
		Buffer.addBoolean(true);
		this.m_pCurrentContract.Save(Buffer);
	}

	// Source code
	Buffer.addWord(this.m_olSourceCode.length);
	this.m_olSourceCode.forEach(pSource => {
		// Write the source
		pSource.Save(Buffer);
	});

	// Current Project
	Buffer.addInteger(this.m_nProjectType);
	Buffer.addInteger(this.m_nProjectClass);
	Buffer.addInteger(this.m_nProjectRating);
	Buffer.addInteger(this.m_nProjectInitialTime);
	Buffer.addInteger(this.m_nProjectTimeLeft);

	// Chip being burned
	Buffer.addElement(this.m_pChipBurning, this.m_olSourceCode);
	Buffer.addInteger(this.m_nChipBurnTimeLeft);

	// Shop items
	Buffer.addWord(this.m_olShopList.length);
	this.m_olShopList.forEach(pItem => {
		// Write the source
		pItem.Save(Buffer);
	});

	// Item on order
	Buffer.addInteger(this.m_nOrderItemType);
	Buffer.addInteger(this.m_nOrderItemClass);
	Buffer.addInteger(this.m_nOrderItemRating);
	Buffer.addInteger(this.m_nOrderTimeLeft);

	// Game State
	Buffer.addInteger(this.m_nDayOfMonth);
	Buffer.addInteger(this.m_nMonth);
	Buffer.addInteger(this.m_nYear);
	Buffer.addInteger(this.m_nDayOfWeek);

	Buffer.addInteger(this.m_bOnRun);
	Buffer.addInteger(this.m_nRunTime);

	Buffer.addInteger(this.m_nHealthPhysical);
	Buffer.addInteger(this.m_nHealthMental);
	Buffer.addInteger(this.m_nHealthDeck);
	// Skip damage

	// System
	if (this.m_bOnRun) {
		this.m_pSystem.Save(Buffer);

		Buffer.addInteger(this.m_dwRunFlags);

		// Current node
		Buffer.addElement(this.m_pCurrentNode, this.m_pSystem.m_olNodeList);

		// Location in node
		Buffer.addPoint(this.m_ptNodeLoc);

		// Targetted Ice
		Buffer.addElement(this.m_pTargettedIce, this.m_pSystem.m_olIceList);

		Buffer.addInteger(this.m_nHighestDeceivedIce);

		// Skip current ice list - can rebuild

		// Active Programs
		Buffer.addElement(this.m_pActiveArmor, this.m_olSoftware);
		Buffer.addElement(this.m_pActiveShield, this.m_olSoftware);
		Buffer.addElement(this.m_pActiveHide, this.m_olSoftware);
		Buffer.addElement(this.m_pActiveScan, this.m_olSoftware);
		Buffer.addElement(this.m_pActiveReflect, this.m_olSoftware);
		Buffer.addElement(this.m_pActiveBoost, this.m_olSoftware);

		Buffer.addInteger(this.m_nDecoyCount);
		for (let i=0; i < this.m_nDecoyCount; i++)
			Buffer.addPoint(this.m_ptDecoyLocation[i]);

		Buffer.addInteger(this.m_nClientProgramStatus);

		// Trace information
		Buffer.addElement(this.m_pTraceIce, this.m_pSystem.m_olIceList);
		Buffer.addInteger(this.m_nTraceInitialTime);
		Buffer.addInteger(this.m_nTraceTurnsLeft);
		Buffer.addInteger(this.m_nTraceType);
		Buffer.addInteger(this.m_bTraced);

		// Transfer details
		Buffer.addElement(this.m_pTransferProgram, this.m_olSoftware);
		Buffer.addElement(this.m_pTransferFile, this.m_pCurrentNode.m_olFileList);
		Buffer.addInteger(this.m_nTransferInitialTime);
		Buffer.addInteger(this.m_nTransferTurnsLeft);
		Buffer.addInteger(this.m_nFileTransferType);

		// Scan/Eval status
		Buffer.addInteger(this.m_nCurrentScanMP);
		Buffer.addElement(this.m_posScanFile, this.m_pCurrentNode.m_olFileList);
	}
}


Character.prototype.Load = function(Buffer, version) {
	// Basic Attributes
	this.m_szName = Buffer.getString();
	if (version >= 10) {
		this.m_bIronMan = !!Buffer.getInteger();
		this.m_bTooltips = !!Buffer.getInteger();
	}
	this.m_nCredits = Buffer.getInteger();
	this.m_nLifestyle = Buffer.getInteger();
	this.m_nRepLevel = Buffer.getInteger();
	this.m_nRepPoints = Buffer.getInteger();
	this.m_nAttackSkill = Buffer.getInteger();
	this.m_nDefenseSkill = Buffer.getInteger();
	this.m_nStealthSkill = Buffer.getInteger();
	this.m_nAnalysisSkill = Buffer.getInteger();
	this.m_nProgrammingSkill = Buffer.getInteger();
	this.m_nChipDesignSkill = Buffer.getInteger();
	this.m_nSkillPoints = Buffer.getInteger();
	this.m_nImage = Buffer.getInteger();
	if (this.m_nImage >= MAX_AVATAR) this.m_nImage = 0; // Make sure image is valid
	this.m_bBackdoor = Buffer.getByteArray(NUM_CORP);
	if (version >= 6)
		this.m_bSystemAlerts = Buffer.getByteArray(NUM_CORP);

	// Chips
	for (let i=0; i<NUM_CHIPS; i++)
		this.m_nChip[i] = Buffer.getInteger();

	// Hardware
	if (version <= 1) {
		let i;
		for (i=0; i<NUM_HW_0_1; i++)
			this.m_nHardware[i] = Buffer.getInteger();
		while (i<NUM_HW_RESERVED)
			this.m_nHardware[i++] = 0;
	} else {
		for (let i=0; i<NUM_HW_RESERVED; i++)
			this.m_nHardware[i] = Buffer.getInteger();
	}

	// Software
	for (let i = Buffer.getWord(); i > 0; i--)
		this.m_olSoftware.push( Program.Load(Buffer, version) );

	// Default Programs
	this.m_pDefAttackProgram = Buffer.getElement(this.m_olSoftware);
	this.m_pDefArmorProgram = Buffer.getElement(this.m_olSoftware);
	this.m_pDefShieldProgram = Buffer.getElement(this.m_olSoftware);
	this.m_pDefHideProgram = Buffer.getElement(this.m_olSoftware);
	if (version < 10)
		this.m_pDefReflectProgram = null;
	else
		this.m_pDefReflectProgram = Buffer.getElement(this.m_olSoftware);

	// Contracts
	for (let i = Buffer.getWord(); i > 0; i--) {
		let pContract = new Contract();
		pContract.Load(Buffer, version);
		this.m_olContracts.push(pContract);
	}
	if (Buffer.getBoolean() === false)
		this.m_pCurrentContract = null;
	else {
		this.m_pCurrentContract = new Contract();
		this.m_pCurrentContract.Load(Buffer, version);
	}

	// Source Code
	for (let i = Buffer.getWord(); i > 0; i--) {
		let pSource = new Source();
		pSource.Load(Buffer, version);
		this.m_olSourceCode.push(pSource);
	}

	// Current Project
	this.m_nProjectType = Buffer.getInteger();
	this.m_nProjectClass = Buffer.getInteger();
	this.m_nProjectRating = Buffer.getInteger();
	this.m_nProjectInitialTime = Buffer.getInteger();
	this.m_nProjectTimeLeft = Buffer.getInteger();

	// Chip being burned
	this.m_pChipBurning = Buffer.getElement(this.m_olSourceCode);
	this.m_nChipBurnTimeLeft = Buffer.getInteger();

	// Shop items
	for (let i = Buffer.getWord(); i > 0; i--) {
		let pItem = new ShopItem();
		pItem.Load(Buffer, version);
		this.m_olShopList.push(pItem);
	}

	// Item on order
	this.m_nOrderItemType = Buffer.getInteger();
	this.m_nOrderItemClass = Buffer.getInteger();
	this.m_nOrderItemRating = Buffer.getInteger();
	this.m_nOrderTimeLeft = Buffer.getInteger();

	// Game State
	this.m_nDayOfMonth = Buffer.getInteger();
	this.m_nMonth = Buffer.getInteger();
	this.m_nYear = Buffer.getInteger();
	this.m_nDayOfWeek = Buffer.getInteger();

	this.m_bOnRun = !!Buffer.getInteger();
	this.m_nRunTime = Buffer.getInteger();

	this.m_nHealthPhysical = Buffer.getInteger();
	this.m_nHealthMental = Buffer.getInteger();
	this.m_nHealthDeck = Buffer.getInteger();
	// Skip damage

	// Check version - prior to 0.6, System was created at contract creation.
	//                 On version 0.6 and later, only create when on run.
	// System
	let bThere;
	if (version < 6)
		bThere = Buffer.getBoolean();
	else
		bThere = this.m_bOnRun;

	if (!bThere) {
		this.m_pSystem = null;
	} else {
		this.m_pSystem = new System();
		this.m_pSystem.Load(Buffer, version, this);

		if (version >= 1006)
			this.m_dwRunFlags = Buffer.getInteger();
		else {
			if (this.m_pSystem.m_nAlert === ALERT_RED) {
				// Set flag that alert was set
				this.m_dwRunFlags |= CRF_ALARMS_SET;
			}
		}

		// Current area/node
		this.m_pCurrentNode = Buffer.getElement(this.m_pSystem.m_olNodeList);

		// Location in node
		this.m_ptNodeLoc = Buffer.getPoint();

		// Targetted Ice
		this.m_pTargettedIce = Buffer.getElement(this.m_pSystem.m_olIceList);

		// Rebuild current ice list
		this.m_pSystem.m_olIceList.forEach(pIce => {
			if (pIce.m_pCurrentNode === this.m_pCurrentNode)
				this.m_olCurrentIceList.push(pIce);
		});

		this.m_nHighestDeceivedIce = Buffer.getInteger();

		// Active Programs
		this.m_pActiveArmor = Buffer.getElement(this.m_olSoftware);
		this.m_pActiveShield = Buffer.getElement(this.m_olSoftware);
		this.m_pActiveHide = Buffer.getElement(this.m_olSoftware);
		this.m_pActiveScan = Buffer.getElement(this.m_olSoftware);
		if (version < 10) {
			this.m_pActiveReflect = null;
			this.m_pActiveBoost = null;
		} else {
			this.m_pActiveReflect = Buffer.getElement(this.m_olSoftware);
			this.m_pActiveBoost = Buffer.getElement(this.m_olSoftware);
		}

		this.m_nDecoyCount = Buffer.getInteger();
		for (let i=0; i < this.m_nDecoyCount; i++)
			this.m_ptDecoyLocation[i] = Buffer.getPoint();

		if (version < 1010)
			this.m_nClientProgramStatus = 0;
		else
			this.m_nClientProgramStatus = Buffer.getInteger();

		// Trace information
		this.m_pTraceIce = Buffer.getElement(this.m_pSystem.m_olIceList);
		this.m_nTraceInitialTime = Buffer.getInteger();
		this.m_nTraceTurnsLeft = Buffer.getInteger();
		this.m_nTraceType = Buffer.getInteger();
		this.m_bTraced = !!Buffer.getInteger();

		// Transfer details
		this.m_pTransferProgram = Buffer.getElement(this.m_olSoftware);
		this.m_pTransferFile = Buffer.getElement(this.m_pCurrentNode.m_olFileList);
		this.m_nTransferInitialTime = Buffer.getInteger();
		this.m_nTransferTurnsLeft = Buffer.getInteger();
		this.m_nFileTransferType = Buffer.getInteger();

		// Scan/Eval status
		this.m_nCurrentScanMP = Buffer.getInteger();
		this.m_posScanFile = Buffer.getElement(this.m_pCurrentNode.m_olFileList);

		// Fix for previous versions
		if (version < 6 && !this.m_bOnRun) {
			// Delete the current system
			this.m_pSystem = null;
		}
	}

	// Calculate the current load
	this.calcCurrentLoad();
}

// contract.js



const g_szContractTypeText = [
	"Steal Files",
	"Steal & Erase Files",
	"Erase Files",
	"Alter Files",
	"Deactivate I/O",
	"Activate I/O",
	"Sabotage",
	"Crash System",
	"Create Backdoor",
	"Run Program",
];

// Target Set Limits
const CT_MIN_DS			= CT_RESEARCH_DATA;
const CT_MAX_DS			= CT_INVENTORY_DATA;
const CT_MIN_DEACT		= CT_DOORLOCKS;
const CT_MAX_DEACT		= CT_ALARM_SYSTEMS;
const CT_MIN_ACT		= CT_FIRE_ALARMS;
const CT_MAX_ACT		= CT_CHEM_ALARMS;
const CT_MIN_SAB		= CT_DOORLOCKS;
const CT_MAX_SAB		= CT_VAULT_CONTROLS;
const CT_MIN_RUNPROG	= CT_NODE_IO;
const CT_MAX_RUNPROG	= CT_NODE_CPU;

// Contract Target Object Strings
const g_szTargetObjectText = [
	"valuable research data",
	"chemical formulae",
	"personnel files",
	"financial data",
	"grade reports",
	"security files",
	"security camera recordings",
	"blueprints",
	"employee evaluation records",
	"product information",
	"medical records",
	"records of illegal activity",
	"test results",
	"inventory records",
	"electronic doorlocks",
	"security cameras",
	"alarm systems",
	"fire alarms",
	"security alarms",
	"radiation leak alarms",
	"biohazard alarms",
	"hazardous chemical alarms",
	"manufacturing controls",
	"chemical production",
	"vault controls",
	"CPU",
	"an I/O node",
	"a datastore",
	"the CPU",
];

// Flags for the above
// Datastore targets
const CTF_RESEARCH_DATA		= 0x00000001;
const CTF_CHEM_FORMULA		= 0x00000002;
const CTF_PERSONNEL_FILES	= 0x00000004;	// Common
const CTF_FINANCIAL_DATA	= 0x00000008;	// Common
const CTF_GRADE_REPORTS		= 0x00000010;
const CTF_SECURITY_FILES	= 0x00000020;	// Common
const CTF_SECURITY_CAM_REC	= 0x00000040;	// Common
const CTF_BLUEPRINTS		= 0x00000080;
const CTF_EMPLOYEE_EVAL		= 0x00000100;	// Common
const CTF_PRODUCT_INFO		= 0x00000200;
const CTF_MEDICAL_RECORDS	= 0x00000400;
const CTF_ILLEGAL_ACTIVITY	= 0x00000800;	// Common
const CTF_TEST_RESULTS		= 0x00001000;
const CTF_INVENTORY_DATA	= 0x00002000;
// Deactive IO targets
const CTF_DOORLOCKS			= 0x00004000;	// Common
const CTF_SECURITY_CAMERAS	= 0x00008000;	// Common
const CTF_ALARM_SYSTEMS		= 0x00010000;	// Common
// Activate IO targets
const CTF_FIRE_ALARMS		= 0x00020000;	// Common
const CTF_SECURITY_ALARMS	= 0x00040000;	// Common
const CTF_RADIATION_ALARMS	= 0x00080000;
const CTF_BIOHAZARD_ALARMS	= 0x00100000;
const CTF_CHEM_ALARMS		= 0x00200000;
// Sabotage (only) targets
const CTF_MANUF_CONTROLS	= 0x00400000;
const CTF_CHEM_PRODUCTION	= 0x00800000;
const CTF_VAULT_CONTROLS	= 0x01000000;
// All other mission types are common to all corporations

//--------------------------
// Corporation Information
//--------------------------
// Corporation types (determines missions available)
const CT_MEGACORP		= 0;	// Mega-corporation. Anything possible.
const CT_ELECTRONICS	= 1;	// Electronics design/production
const CT_BANK			= 2;	// Banking
const CT_LAB			= 3;	// Laboratories
const CT_CONSUMER		= 4;	// Consumer goods
const CT_MEDICAL		= 5;	// Any medical
const CT_OIL			= 6;	// Petrolium
const CT_MFG			= 7;	// Manufacturing
const CT_SCHOOL			= 8;	// College/University
const CT_ENVIRON		= 9;	// Environmental

const NUM_CORP_TYPES	= 10;

// Missions available to all
const CTF_COMMON = (CTF_PERSONNEL_FILES|CTF_FINANCIAL_DATA|CTF_SECURITY_FILES|CTF_SECURITY_CAM_REC|CTF_EMPLOYEE_EVAL|CTF_ILLEGAL_ACTIVITY|CTF_DOORLOCKS|CTF_SECURITY_CAMERAS|CTF_ALARM_SYSTEMS|CTF_FIRE_ALARMS|CTF_SECURITY_ALARMS);

// Valid contract targets per corporation type
const g_dwValidTarget = [
/* CT_MEGACORP */	CTF_COMMON|CTF_RESEARCH_DATA|CTF_CHEM_FORMULA|CTF_BLUEPRINTS|CTF_PRODUCT_INFO|CTF_MEDICAL_RECORDS|CTF_TEST_RESULTS|CTF_INVENTORY_DATA,
/* CT_ELECT */		CTF_COMMON|CTF_RESEARCH_DATA|CTF_BLUEPRINTS|CTF_PRODUCT_INFO|CTF_TEST_RESULTS|CTF_INVENTORY_DATA|CTF_CHEM_ALARMS|CTF_MANUF_CONTROLS,
/* CT_BANK */		CTF_COMMON,
/* CT_LAB */		CTF_COMMON|CTF_RESEARCH_DATA|CTF_CHEM_FORMULA|CTF_PRODUCT_INFO|CTF_MEDICAL_RECORDS|CTF_TEST_RESULTS|CTF_INVENTORY_DATA|CTF_RADIATION_ALARMS|CTF_BIOHAZARD_ALARMS|CTF_CHEM_ALARMS|CTF_CHEM_PRODUCTION,
/* CT_CONSUMER */	CTF_COMMON|CTF_PRODUCT_INFO|CTF_INVENTORY_DATA,
/* CT_MEDICAL */	CTF_COMMON|CTF_RESEARCH_DATA|CTF_CHEM_FORMULA|CTF_MEDICAL_RECORDS|CTF_TEST_RESULTS|CTF_RADIATION_ALARMS|CTF_BIOHAZARD_ALARMS|CTF_CHEM_PRODUCTION,
/* CT_OIL */		CTF_COMMON|CTF_CHEM_FORMULA|CTF_TEST_RESULTS|CTF_CHEM_ALARMS|CTF_CHEM_PRODUCTION,
/* CT_MFG */		CTF_COMMON|CTF_BLUEPRINTS|CTF_PRODUCT_INFO|CTF_INVENTORY_DATA|CTF_MANUF_CONTROLS,
/* CT_SCHOOL */		CTF_COMMON|CTF_RESEARCH_DATA|CTF_CHEM_FORMULA|CTF_GRADE_REPORTS|CTF_BLUEPRINTS|CTF_MEDICAL_RECORDS|CTF_TEST_RESULTS|CTF_RADIATION_ALARMS|CTF_BIOHAZARD_ALARMS|CTF_CHEM_ALARMS,
/* CT_ENVIRON */	CTF_COMMON|CTF_TEST_RESULTS|CTF_BIOHAZARD_ALARMS|CTF_CHEM_ALARMS,
];

// Default contract targets per corporation type
const g_nDefaultTarget = [
/* CT_MEGACORP */	CT_FINANCIAL_DATA,
/* CT_ELECT */		CT_BLUEPRINTS,
/* CT_BANK */		CT_FINANCIAL_DATA,
/* CT_LAB */		CT_RESEARCH_DATA,
/* CT_CONSUMER */	CT_INVENTORY_DATA,
/* CT_MEDICAL */	CT_MEDICAL_RECORDS,
/* CT_OIL */		CT_CHEM_PRODUCTION,
/* CT_MFG */		CT_MANUF_CONTROLS,
/* CT_SCHOOL */		CT_GRADE_REPORTS,
/* CT_ENVIRON */	CT_TEST_RESULTS,
];


// The corporation database (In order of size)
const g_CorpDB = [
	{ szName:"Generic Genetics",						nCorpType:CT_MEDICAL},
	{ szName:"Radio Shack",								nCorpType:CT_CONSUMER },
	{ szName:"Digital Systems",							nCorpType:CT_ELECTRONICS },
	{ szName:"Ron's Repos",								nCorpType:CT_CONSUMER },
	{ szName:"Bubba's Discount Bait & Tackle",			nCorpType:CT_CONSUMER },
	{ szName:"North Carolina State University",			nCorpType:CT_SCHOOL },
	{ szName:"Sperm & Ova Superstore",					nCorpType:CT_CONSUMER },
	{ szName:"Ahab's Quickie Mart",						nCorpType:CT_CONSUMER },
	{ szName:"Kellog-Post",								nCorpType:CT_CONSUMER },
	{ szName:"Smith & Wesson",							nCorpType:CT_MFG },
	{ szName:"Meg-Lo-Mart",								nCorpType:CT_CONSUMER },
	{ szName:"ACME Industries",							nCorpType:CT_MFG },
	{ szName:"PETA's Flaky Granolas",					nCorpType:CT_CONSUMER },
	{ szName:"SAAB",									nCorpType:CT_MFG },
	{ szName:"Winchester",								nCorpType:CT_MFG },
	{ szName:"Limbs-R-Us",								nCorpType:CT_MEDICAL },
	{ szName:"Oxford University",						nCorpType:CT_SCHOOL },
	{ szName:"Little Robot Factory",					nCorpType:CT_ELECTRONICS },
	{ szName:"Henson's Toxic Waste Disposal",			nCorpType:CT_ENVIRON },
	{ szName:"Kraft",									nCorpType:CT_CONSUMER },
	{ szName:"Nike-Adidas",								nCorpType:CT_MFG },
	{ szName:"Me, Myself, & I Cloning",					nCorpType:CT_LAB },
	{ szName:"Luke's 'Danger Boy' RV's",				nCorpType:CT_MFG },
	{ szName:"Kentucky Fried Rodents",					nCorpType:CT_CONSUMER },
	{ szName:"Remington",								nCorpType:CT_MFG },
	{ szName:"Antarctica Bank & Trust",					nCorpType:CT_BANK },
	{ szName:"CalTech",									nCorpType:CT_SCHOOL },
	{ szName:"Noah's Livestock Engineering",			nCorpType:CT_MEDICAL },
	{ szName:"Mueller-Schluter Infotech",				nCorpType:CT_ELECTRONICS },
	{ szName:"Microdeck Technologies",					nCorpType:CT_ELECTRONICS },
	{ szName:"McWendys",								nCorpType:CT_CONSUMER },
	{ szName:"Multiplicity Cloning",					nCorpType:CT_MEDICAL },
	{ szName:"Spacely's Sprockets",						nCorpType:CT_MFG },
	{ szName:"Cross Applied Technologies",				nCorpType:CT_ELECTRONICS },
	{ szName:"SAAB",									nCorpType:CT_MFG },
	{ szName:"Walt Disney",								nCorpType:CT_CONSUMER },
	{ szName:"Watson Electronics",						nCorpType:CT_ELECTRONICS },
	{ szName:"Transys Neuronet",						nCorpType:CT_ELECTRONICS },
	{ szName:"Chevron",									nCorpType:CT_OIL },
	{ szName:"Harley-Davidson",							nCorpType:CT_MFG },
	{ szName:"Texaco",									nCorpType:CT_OIL },
	{ szName:"Shockwave Behavior Management",			nCorpType:CT_MEDICAL },
	{ szName:"Black Mesa Research Facilities",			nCorpType:CT_LAB },
	{ szName:"Shiawise",								nCorpType:CT_ELECTRONICS },
	{ szName:"Kurita Labs",								nCorpType:CT_LAB },
	{ szName:"Intel-TI",								nCorpType:CT_ELECTRONICS },
	{ szName:"Cybernetic Prosthetics",					nCorpType:CT_MEDICAL },
	{ szName:"Envirocon",								nCorpType:CT_ENVIRON },
	{ szName:"Steiner-Davion Robotics",					nCorpType:CT_MFG },
	{ szName:"Yamatetsu",								nCorpType:CT_ELECTRONICS },
	{ szName:"Yamaha",									nCorpType:CT_MFG },
	{ szName:"Warren Pharmaceuticals",					nCorpType:CT_LAB },
	{ szName:"Sara Lee",								nCorpType:CT_MEGACORP },
	{ szName:"Heckler & Koch",							nCorpType:CT_MFG },
	{ szName:"Consolidated Asteroid Mining",			nCorpType:CT_MFG },
	{ szName:"Exxon",									nCorpType:CT_OIL },
	{ szName:"NASA Spaceyachts",						nCorpType:CT_MFG },
	{ szName:"Soilant Products",						nCorpType:CT_LAB },
	{ szName:"Corning",									nCorpType:CT_MFG },
	{ szName:"Lear",									nCorpType:CT_MFG },
	{ szName:"Ewing Oil",								nCorpType:CT_OIL },
	{ szName:"New Earth Terraforming",					nCorpType:CT_ENVIRON },
	{ szName:"Procter & Gamble",						nCorpType:CT_LAB },
	{ szName:"Cessna",									nCorpType:CT_MFG },
	{ szName:"Sendanku",								nCorpType:CT_MFG },
	{ szName:"Sony",									nCorpType:CT_ELECTRONICS },
	{ szName:"Bayer Pharmaceuticals",					nCorpType:CT_LAB },
	{ szName:"Lunar Waste Disposal",					nCorpType:CT_ENVIRON },
	{ szName:"Fisher-Rosemont",							nCorpType:CT_ELECTRONICS },
	{ szName:"Motorola",								nCorpType:CT_ELECTRONICS },
	{ szName:"Bank of AmeriCanada",						nCorpType:CT_BANK },
	{ szName:"CytoTech Labs",							nCorpType:CT_LAB },
	{ szName:"Siemens",									nCorpType:CT_ELECTRONICS },
	{ szName:"Fuchi",									nCorpType:CT_MEGACORP },
	{ szName:"Federated Boeing",						nCorpType:CT_MFG },
	{ szName:"Ford",									nCorpType:CT_MFG },
	{ szName:"Massachussets Institute of Technology",	nCorpType:CT_SCHOOL },
	{ szName:"Johnson & Johnson",						nCorpType:CT_MEGACORP },
	{ szName:"Phillip-Morris Pharmaceuticals",			nCorpType:CT_MEDICAL },
	{ szName:"Integrated Matrix Systems",				nCorpType:CT_ELECTRONICS },
	{ szName:"Cyberdine",								nCorpType:CT_ELECTRONICS },
	{ szName:"IBM",										nCorpType:CT_ELECTRONICS },
	{ szName:"European Financial Conglomeration",		nCorpType:CT_BANK },
	{ szName:"Aztechnology",							nCorpType:CT_ELECTRONICS },
	{ szName:"Chrysler-Nissan",							nCorpType:CT_MFG },
	{ szName:"Toyota",									nCorpType:CT_MFG },
	{ szName:"Gaeatronics",								nCorpType:CT_ELECTRONICS },
	{ szName:"Pepsi Cola",								nCorpType:CT_MFG },
	{ szName:"CryoTech",								nCorpType:CT_MEDICAL },
	{ szName:"Ares Macrotechnology",					nCorpType:CT_ELECTRONICS },
	{ szName:"Weyland-Yutani",							nCorpType:CT_MEGACORP },
	{ szName:"ChildVision Embryonic Design",			nCorpType:CT_MEDICAL },
	{ szName:"Coca Cola",								nCorpType:CT_CONSUMER },
	{ szName:"Zurich Orbital Gemeinschaft Bank",		nCorpType:CT_BANK },
	{ szName:"Renraku",									nCorpType:CT_MEGACORP },
	{ szName:"Novatech",								nCorpType:CT_MEGACORP },
	{ szName:"Mitsuhama",								nCorpType:CT_MEGACORP },
	{ szName:"Bell Labs",								nCorpType:CT_LAB },
	{ szName:"World Banking Consortium",				nCorpType:CT_BANK },
	{ szName:"Saeder-Krupp",							nCorpType:CT_MEGACORP },
];



function Contract() {
	this.m_nCorporation = 0;	// Target corporation
	this.m_szSystemName = "";	// Target corporation name
	this.m_nSystemSize = 0;		// Size of system
	this.m_dwTargetFlags = 0;	// Flags (for file types)
	this.m_nType = 0;			// Type of contract
	this.m_nTargetObject = 0;	// Target object
	this.m_nDifficulty = 0;		// Difficulty level
	this.m_nPay = 0;			// Completion pay
	this.m_dwFlags = 0;			// Miscellaneous flags
	this.m_dwTime = 0;			// Time variable for timed missions (minutes)
	this.m_nDaysLeft = 0;		// Days left to complete
	this.m_nNumTargets = 1;		// Number of target objects
}

Contract.prototype.GetDescriptiveText = function() {
	let szText;

	// Each mission type has its own text
	switch (this.m_nType) {
		case CONT_STEAL:
			szText = "A client needs access to "+g_szTargetObjectText[this.m_nTargetObject]+" from the "+this.m_szSystemName+" system. You must recover a copy of this data.";
			break;
		case CONT_STEAL_ERASE:
			szText = "A client desires sole access to "+g_szTargetObjectText[this.m_nTargetObject]+" from the "+this.m_szSystemName+" system. You must recover a copy of this data and erase it from the system.";
			break;
		case CONT_ERASE:
			szText = "A client wishes to destroy "+g_szTargetObjectText[this.m_nTargetObject]+" located on the "+this.m_szSystemName+" system. You must locate this data and erase it from the system.";
			break;
		case CONT_EDIT:
			szText = "A client wishes to alter "+g_szTargetObjectText[this.m_nTargetObject]+" located on the "+this.m_szSystemName+" system. You must locate this data in the system and edit it to the client's specifications.";
			break;
		case CONT_DEACTIVATE_IO:
			szText = "A client wishes to deactivate "+g_szTargetObjectText[this.m_nTargetObject]+" from the "+this.m_szSystemName+" system. You must locate the I/O node controlling this and deactivate it.";
			break;
		case CONT_ACTIVATE_IO:
			szText = "A client wishes to activate "+g_szTargetObjectText[this.m_nTargetObject]+" from the "+this.m_szSystemName+" system. You must locate the I/O node controlling this and activate it.";
			break;
		case CONT_SABOTAGE_IO:
			szText = "A client wishes to sabotage "+g_szTargetObjectText[this.m_nTargetObject]+" at the "+this.m_szSystemName+" system. You must locate the I/O node controlling this and sabotage it.";
			break;
		case CONT_CRASH_SYS:
			szText = "A client wishes to crash the "+this.m_szSystemName+" system. You must locate the CPU for the system and initiate a system failure.";
			break;
		case CONT_BACKDOOR:
			szText = "A client wishes for a backdoor to be created into the "+this.m_szSystemName+" system. You must locate the CPU for the system and create this back door. The client's decker will take care of the rest.";
			break;
		case CONT_RUN_PROGRAM:
			szText = "A client needs a special program activated on the "+this.m_szSystemName+" system. Locate the target node(s) by running the program, then activate the program within the node. You must remain in the node until the program finishes running.";
			break;
	}

	// Add additional lines for various mission options
	if (this.m_nNumTargets > 1)
		szText += "("+this.m_nNumTargets+" targets)";
	if (this.m_dwFlags&CF_NO_ALARMS)
		szText += " The target system must not become aware of any tampering.";
	if (this.m_dwFlags&CF_TIMED)
		szText += " The mission must be completed within "+this.m_dwTime+" minutes of system entry";

	return szText;
}

Contract.prototype.GetTypeText = function() {
	let szTmp = "";

	// Get the basic text
	let szTypeText = g_szContractTypeText[this.m_nType];

	// Add qualifiers
	if (this.m_nNumTargets !== 1)
		szTmp += this.m_nNumTargets;
	if (this.m_dwFlags & CF_NO_ALARMS)
		szTmp += "N";
	if (this.m_dwFlags & CF_TIMED)
		szTmp += "T";

	if (szTmp !== "")
		szTypeText += " (" + szTmp + ")";

	return szTypeText;
}

Contract.prototype.GetTargetObjectText = function() {
	return g_szTargetObjectText[this.m_nTargetObject];
}

Contract.prototype.HintAvailable = function() {
	switch(this.m_nType) {
		case CONT_STEAL:
		case CONT_STEAL_ERASE:
		case CONT_ERASE:
		case CONT_EDIT:
		case CONT_DEACTIVATE_IO:
		case CONT_ACTIVATE_IO:
		case CONT_SABOTAGE_IO:
			return true;
		//case CONT_CRASH_SYS:
		//case CONT_BACKDOOR:
		//case CONT_RUN_PROGRAM:
		default:
			return false;
	}
}

Contract.prototype.Generate = function(bEasy) {

	// Get the base difficulty
	let nBaseDifficulty;
	if (g_pChar.m_nRepLevel > (g_pChar.m_nLifestyle + 1) * 4)
		nBaseDifficulty = (g_pChar.m_nLifestyle + 1) * 4;
	else
		nBaseDifficulty = g_pChar.m_nRepLevel;

	// Set minimum difficulty to 1
	if (nBaseDifficulty < 1)
		nBaseDifficulty = 1;

	// Set the actual difficulty to the base difficulty.
	// This will be adjusted as we go
	this.m_nDifficulty = nBaseDifficulty;

	// Choose a system size around the target difficulty
	// 10% -2, 20% -1, 40% 0, 20% +1, 10% +2
	if (!bEasy) {
		switch (Random(10)) {
			case 0:	// -2
				if (this.m_nDifficulty!=1)
					this.m_nDifficulty--;
				// Fall through
			case 1:	//-1
			case 2:
				if (this.m_nDifficulty!=1)
					this.m_nDifficulty--;
				break;
			case 3:	// +2
				if (this.m_nDifficulty!=20)
					this.m_nDifficulty++;
				// Fall through
			case 4:	// +1
			case 5:
				if (this.m_nDifficulty!=20)
					this.m_nDifficulty++;
				break;
		}
	}

	//------------------------------------
	// Choose the system to attack
	//------------------------------------
	// Set the initial system size to be the difficulty
	this.m_nSystemSize = this.m_nDifficulty;

	// Choose one of the five corps at this size
	this.m_nCorporation = ((this.m_nSystemSize-1)*5) + Random(5);

	// Get the name
	this.m_szSystemName = g_CorpDB[this.m_nCorporation].szName;

	//FSO 3-30-04	Changing the way contract targets are generated. Previously, we chose a target and got the
	//				mission type from the target type (backwards). Now, we are going to choose a mission type first
	//				and then choose a target.
	//
	//	Breakdown:
	//		Steal files - 15%
	//		Steal and erase - 10%
	//		Erase - 10%
	//		Edit - 10%						DataStore: 45%
	//		Deactivate - 15%
	//		Activate - 15%
	//		Sabotage - 10%					I/O Node: 40
	//		Crash - 5%
	//		Backdoor - 5%					CPU: 10%
	//		Run Program - 5%				Steal Files: 5%
	//
	// Choose a mission type
	let i = Random(bEasy ? 40 : 100);
	if      (i < 15) this.m_nType = CONT_DEACTIVATE_IO;	// Deactivate - 15%
	else if (i < 30) this.m_nType = CONT_ACTIVATE_IO;	// Activate - 15%
	else if (i < 40) this.m_nType = CONT_SABOTAGE_IO;	// Sabotage - 10%
	else if (i < 55) this.m_nType = CONT_STEAL;			// Steal files - 15%
	else if (i < 65) this.m_nType = CONT_STEAL_ERASE;	// Steal and erase - 10%
	else if (i < 75) this.m_nType = CONT_ERASE;			// Erase - 10%
	else if (i < 85) this.m_nType = CONT_EDIT;			// Edit - 10%
	else if (i < 90) this.m_nType = CONT_CRASH_SYS;		// Crash - 5%
	else if (i < 95) this.m_nType = CONT_BACKDOOR;		// Backdoor - 5%
	else             this.m_nType = CONT_RUN_PROGRAM;	// Run Program - 5%

	// Generate the valid target flags for the corporation. Note that this is used later for
	// generating file types for datastores in the matrix.
	this.m_dwTargetFlags = g_dwValidTarget[g_CorpDB[this.m_nCorporation].nCorpType];

	// Choose a target based on mission type
	let nMinType;
	let nMaxType;
	let bDone = false;
	switch (this.m_nType) {
		case CONT_STEAL			:
		case CONT_STEAL_ERASE	:
		case CONT_ERASE			:
		case CONT_EDIT			:
			nMinType = CT_MIN_DS;
			nMaxType = CT_MAX_DS;
			break;
		case CONT_DEACTIVATE_IO	:
			nMinType = CT_MIN_DEACT;
			nMaxType = CT_MAX_DEACT;
			break;
		case CONT_ACTIVATE_IO	:
			nMinType = CT_MIN_ACT;
			nMaxType = CT_MAX_ACT;
			break;
		case CONT_SABOTAGE_IO	:
			nMinType = CT_MIN_SAB;
			nMaxType = CT_MAX_SAB;
			break;
		case CONT_CRASH_SYS		:
		case CONT_BACKDOOR		:
			this.m_nTargetObject = CT_CPU;
			bDone = true;
			break;
		case CONT_RUN_PROGRAM	:
			this.m_nTargetObject = CT_MIN_RUNPROG + Random(1 + CT_MAX_RUNPROG - CT_MIN_RUNPROG);
			bDone = true;
			break;
	}

	// Choose until we get a valid one
	while (!bDone) {
		this.m_nTargetObject = nMinType + Random(1 + nMaxType - nMinType);
		if (this.m_dwTargetFlags & (1<<this.m_nTargetObject))
			bDone = true;
	}

	if (!bEasy) {
		// Check for mission enhancers
		// Check for no alarms (20% chance, 40% for edit, 50% for backdoor, no chance for crash)
		let nChance;
		switch (this.m_nType) {
			case CONT_CRASH_SYS:
				nChance = 0;
				break;
			case CONT_EDIT:
				nChance = 4;
				break;
			case CONT_BACKDOOR:
				nChance = 5;
				break;
			default:
				nChance = 2;
				break;
		}
		if (Random(10) < nChance) {
			this.m_dwFlags |= CF_NO_ALARMS;
			this.m_nDifficulty++;
		}

		// Check for timed mission (10% chance)
		if (nBaseDifficulty>4) { // Not until base level 5
			if (Random(10)===0) {
				// Time is three minutes per area (3..15)
				this.m_dwFlags |= CF_TIMED;
				this.m_dwTime = 3 * Math.ceil(this.m_nSystemSize / 4);
				this.m_nDifficulty += 2;
			}
		}

		// Check for multiple targets
		if ( this.m_nTargetObject !== CT_CPU && this.m_nTargetObject !== CT_NODE_CPU ) {
			// 2.5% at level 1. 50% chance at level 20.
			if (Random(40) < nBaseDifficulty) {
				// 2 to 5 targets
				this.m_nNumTargets = 2 + Random(4);
				this.m_nDifficulty += Math.floor(this.m_nNumTargets/2);
			}
		}
	}

	// Generate the days allowed
	if (this.m_dwFlags & CF_TIMED) {
		// Timed missions happen immediately
		this.m_nDaysLeft = 1;
	} else {
		// Others have 1 to 5 days
		this.m_nDaysLeft = bEasy ? 5 : (Random(5) + 1);
	}

	// Generate the pay
	// Base pay is 100 * (difficulty + lifestyle))
	this.m_nPay = 100 * (this.m_nDifficulty + g_pChar.m_nLifestyle);

	// Modify for length of time allowed, with 3 being average (-20%..+20%)
	this.m_nPay += Math.floor( (this.m_nPay * (3-this.m_nDaysLeft)) / 10 );

	// Modify by a random factor (+/- 1..15%), which represents client's cheapness/generosity
	this.m_nPay += Math.floor( ( this.m_nPay * (Random(31)-15) ) / 100 );

	if (bEasy)
		this.m_nPay = Math.floor(this.m_nPay * 1.2);
}




// Global functions
function GetFileTypePerCorp() {
	let nFileType;

	// Generate until we get a valid one
	while (1) {
		// Generate a random file type
		nFileType = Random(1 + CT_MAX_DS);

		// And see if it is valid
		if (g_pChar.m_pCurrentContract.m_dwTargetFlags & (1<<nFileType)) break;
	}

	return nFileType;
}


function GetContractStatus(bInProgress, bCrash) {
	let szBreakdown = "";

	let bFailed = false;
	let bIncomplete = false;

	switch (g_pChar.m_pCurrentContract.m_nType) {
		case CONT_STEAL			:
			//szBreakdown += "Steal Files:\n";

			// Find the quest files
			g_pChar.m_pSystem.BuildFileList(true).forEach(pFile => {
				// Is it in the deck?
				if (pFile.m_nState & STATE_IN_DECK) {
					// Is it edited?
					if (pFile.m_nState & STATE_EDITED_D) {
						bFailed = true;
						szBreakdown += "(F) File "+pFile.m_szName+" was edited before download, making it useless.\n";
					} else {
						szBreakdown += "(C) File "+pFile.m_szName+" was downloaded.\n";
					}
				} else {
					bIncomplete = true;
					if (bInProgress) {
						if (pFile.m_nState & STATE_SCAN) {
							szBreakdown += "(I) File "+pFile.m_szName+" has not been downloaded.\n";
						} else {
							szBreakdown += "(I) File ??? has not been downloaded.\n";
						}
					} else {
						szBreakdown += "(I) File "+pFile.m_szName+" was not downloaded.\n";
					}
				}
			});
			break;

		case CONT_STEAL_ERASE	:
			//szBreakdown += "Steal & Erase Files:\n";

			// Find the quest files
			g_pChar.m_pSystem.BuildFileList(true).forEach(pFile => {
				// Is it in the deck?
				if (pFile.m_nState & STATE_IN_DECK) {
					// Is it edited?
					if (pFile.m_nState & STATE_EDITED_D) {
						bFailed = true;
						szBreakdown += "(F) File "+pFile.m_szName+" was edited before download, making it useless.\n";
					} else {
						szBreakdown += "(C) File "+pFile.m_szName+" was successfully downloaded.\n";
					}
				} else {
					bIncomplete = true;
					if (bInProgress) {
						if (pFile.m_nState & STATE_SCAN) {
							szBreakdown += "(I) File "+pFile.m_szName+" has not been downloaded.\n";
						} else {
							szBreakdown += "(I) File ??? has not been downloaded.\n";
						}
					} else {
						szBreakdown += "(I) File "+pFile.m_szName+" was not downloaded.\n";
					}
				}

				// Is it erased?
				if (pFile.m_nState & STATE_IN_NODE) {
					bIncomplete = true;
					if (bInProgress) {
						if (pFile.m_nState & STATE_SCAN) {
							szBreakdown += "(I) File "+pFile.m_szName+" has not been erased.\n";
						} else {
							szBreakdown += "(I) File ??? has not been erased.\n";
						}
					} else {
						szBreakdown += "(I) File "+pFile.m_szName+" was not erased.\n";
					}
				} else {
					szBreakdown += "(C) Mission file "+pFile.m_szName+" was erased.\n";
				}
			});
			break;

		case CONT_ERASE			:
			//szBreakdown += "Erase Files:\n";

			// Find the quest files
			g_pChar.m_pSystem.BuildFileList(true).forEach(pFile => {
				// Is it erased?
				if (pFile.m_nState & STATE_IN_NODE) {
					bIncomplete = true;
					if (bInProgress) {
						if (pFile.m_nState & STATE_SCAN) {
							szBreakdown += "(I) File "+pFile.m_szName+" has not been erased.\n";
						} else {
							szBreakdown += "(I) File ??? has not been erased.\n";
						}
					} else {
						szBreakdown += "(I) File "+pFile.m_szName+" was not erased.\n";
					}
				} else {
					szBreakdown += "(C) Mission file "+pFile.m_szName+" was erased.\n";
				}
			});
			break;

		case CONT_EDIT			:
			//szBreakdown += "Edit Files:\n";

			// Find the quest files
			g_pChar.m_pSystem.BuildFileList(true).forEach(pFile => {
				// Is it erased?
				if (pFile.m_nState & STATE_IN_NODE) {
					// Was it edited
					if (pFile.m_nState & STATE_EDITED_N) {
						szBreakdown += "(C) File "+pFile.m_szName+" was edited.\n";
					} else {
						bIncomplete = true;
						if (bInProgress) {
							if (pFile.m_nState & STATE_SCAN) {
								szBreakdown += "(I) File "+pFile.m_szName+" has not been edited.\n";
							} else {
								szBreakdown += "(I) File ??? has not been edited.\n";
							}
						} else {
							szBreakdown += "(I) File "+pFile.m_szName+" was not edited.\n";
						}
					}
				} else {
					bFailed = true;
					szBreakdown += "(F)File "+pFile.m_szName+" was erased.\n";
				}
			});
			break;

		case CONT_DEACTIVATE_IO	:
			//szBreakdown += "Deactivate IO:\n";

			// Go through the list of nodes, looking for the IO node
			g_pChar.m_pSystem.BuildNodeList(NT_IO, true).forEach(pNode => {
				if (pNode.m_bActivated) {
					szBreakdown += "(C) IO node "+pNode.m_szName+" was deactivated\n";
				} else {
					bIncomplete = true;
					if (bInProgress) {
						if (pNode.m_nSpecialImage === -1) {
							szBreakdown += "(I) IO node ??? has not been deactivated\n";
						} else {
							szBreakdown += "(I) IO node "+pNode.m_szName+" has not been deactivated\n";
						}
					} else {
						szBreakdown += "(I) IO node "+pNode.m_szName+" was not deactivated\n";
					}
				}
			});
			break;

		case CONT_ACTIVATE_IO	:
			//szBreakdown += "Activate IO:\n";

			// Go through the list of nodes, looking for the IO node
			g_pChar.m_pSystem.BuildNodeList(NT_IO, true).forEach(pNode => {
				if (pNode.m_bActivated) {
					szBreakdown += "(C) IO node "+pNode.m_szName+" was activated\n";
				} else {
					bIncomplete = true;
					if (bInProgress) {
						if (pNode.m_nSpecialImage === -1) {
							szBreakdown += "(I) IO node ??? has not been activated\n";
						} else {
							szBreakdown += "(I) IO node "+pNode.m_szName+" has not been activated\n";
						}
					} else {
						szBreakdown += "(I) IO node "+pNode.m_szName+" was not activated\n";
					}
				}
			});
			break;

		case CONT_SABOTAGE_IO	:
			//szBreakdown += "Sabotage IO:\n";

			// Go through the list of nodes, looking for the IO node
			g_pChar.m_pSystem.BuildNodeList(NT_IO, true).forEach(pNode => {
				if (pNode.m_bActivated) {
					szBreakdown += "(C) IO node "+pNode.m_szName+" was sabotaged\n";
				} else {
					bIncomplete = true;
					if (bInProgress) {
						if (pNode.m_nSpecialImage === -1) {
							szBreakdown += "(I) IO node ??? has not been sabotaged\n";
						} else {
							szBreakdown += "(I) IO node "+pNode.m_szName+" has not been sabotaged\n";
						}
					} else {
						szBreakdown += "(I) IO node "+pNode.m_szName+" was not sabotaged\n";
					}
				}
			});
			break;

		case CONT_CRASH_SYS		:
			if (bCrash) {
				szBreakdown += "(C) System was crashed.\n";
			} else {
				bIncomplete = true;
				if (bInProgress)
					szBreakdown += "(I) System has not been crashed.\n";
				else
					szBreakdown += "(I) System was not crashed.\n";
			}
			break;

		case CONT_BACKDOOR		:
			if (g_pChar.m_pSystem.m_bBackdoor) {
				szBreakdown += "(C) Backdoor was created.\n";
			} else {
				bIncomplete = true;
				if (bInProgress)
					szBreakdown += "(I) Backdoor has not been created.\n";
				else
					szBreakdown += "(I) Backdoor was not created.\n";
			}
			break;

		case CONT_RUN_PROGRAM		:
			// Build a list of quest nodes
			let olNodes = [];
			if (g_pChar.m_pCurrentContract.m_nTargetObject === CT_NODE_IO)
				olNodes = g_pChar.m_pSystem.BuildNodeList(NT_IO, true);
			else if (g_pChar.m_pCurrentContract.m_nTargetObject === CT_NODE_DS)
				olNodes = g_pChar.m_pSystem.BuildNodeList(NT_DS, true);
			else //if (g_pChar.m_pCurrentContract.m_nTargetObject === CT_NODE_CPU)
				olNodes.push(g_pChar.m_pSystem.m_pSystemCPU);

			// Go through the list of nodes, looking for the IO node
			olNodes.forEach(pNode => {
				if (pNode.m_bActivated) {
					szBreakdown += "(C) Program was successfully run in node "+pNode.m_szName+"\n";
				} else {
					bIncomplete = true;
					if (bInProgress) {
						if (pNode.m_nSpecialImage === -1)
							szBreakdown += "(I) Program has not been run in node ???\n";
						else
							szBreakdown += "(I) Program has not been run in node "+pNode.m_szName+"\n";
					} else {
						szBreakdown += "(I) Program was not run in node "+pNode.m_szName+"\n";
					}
				}
			});
			break;
	}

	// Check for no alarms
	if (g_pChar.m_pCurrentContract.m_dwFlags & CF_NO_ALARMS) {
		// See if alarms were set
		if (g_pChar.m_dwRunFlags & CRF_ALARMS_SET) {
			bFailed = true;
			szBreakdown += "(F) A red alert was triggered.\n";
		} else {
			if (bInProgress)
				szBreakdown += "(C) No red alerts have been detected.\n";
			else
				szBreakdown += "(C) No red alerts were detected.\n";
		}
	}

	// Check timer
	if (g_pChar.m_pCurrentContract.m_dwFlags & CF_TIMED) {
		// See if the time was ok (Contract time is in minutes)
		if (g_pChar.m_nRunTime <= g_pChar.m_pCurrentContract.m_dwTime*60) {
			if (bInProgress)
				szBreakdown += "(I) Time limit has not expired.\n";
			else
				szBreakdown += "(C) Time limit did not expire.\n";
		} else {
			bFailed = true;
			szBreakdown += "(F) Time limit expired.\n";
		}
	}

	// Check deadline
	if ( !bInProgress && !bFailed && bIncomplete ) {
		if (g_pChar.m_pCurrentContract.m_nDaysLeft === 1) {
			bFailed = true;
			szBreakdown += "Mission was not completed before deadline.\n";
		} else {
			szBreakdown += "You have "+(g_pChar.m_pCurrentContract.m_nDaysLeft-1)+" days left before deadline.\n";
		}
	}

	// Now, compute overall success/failure
	if (bFailed)
		return ["Failed", szBreakdown, -1];
	else if (bIncomplete)
		return ["Incomplete", szBreakdown, 0];
	else
		return ["Complete", szBreakdown, 1];
}



Contract.prototype.Save = function(Buffer) {
	Buffer.addInteger(this.m_nCorporation);
	Buffer.addString(this.m_szSystemName);
	Buffer.addInteger(this.m_nSystemSize);
	Buffer.addInteger(this.m_dwTargetFlags);
	Buffer.addInteger(this.m_nType);
	Buffer.addInteger(this.m_nTargetObject);
	Buffer.addInteger(this.m_nDifficulty);
	Buffer.addInteger(this.m_nPay);
	Buffer.addInteger(this.m_dwFlags);
	Buffer.addInteger(this.m_dwTime);
	Buffer.addInteger(0); // Not used (this.m_nCompletionTime)
	Buffer.addInteger(this.m_nDaysLeft);
	Buffer.addInteger(this.m_nNumTargets);
}
Contract.prototype.Load = function(Buffer, version) {
	this.m_nCorporation = Buffer.getInteger();
	this.m_szSystemName = Buffer.getString();
	this.m_nSystemSize = Buffer.getInteger();
	this.m_dwTargetFlags = Buffer.getInteger();
	this.m_nType = Buffer.getInteger();
	this.m_nTargetObject = Buffer.getInteger();
	this.m_nDifficulty = Buffer.getInteger();
	this.m_nPay = Buffer.getInteger();
	this.m_dwFlags = Buffer.getInteger();
	this.m_dwTime = Buffer.getInteger();
	Buffer.getInteger(); // Not used (this.m_nCompletionTime)
	if (version < 6)
		this.m_nDaysLeft = 3;
	else
		this.m_nDaysLeft = Buffer.getInteger();
	if (version >= 1006)
		this.m_nNumTargets = Buffer.getInteger();
}

// shopitem.js



// Maximum levels of hardware
const g_nMaxHWLevel = [
	4, // HW_CHIP_BURNER
	5, // HW_SURGE_SUPP
	5, // HW_NEURAL_DAMPER
	3, // HW_TRACE_MONITOR
	2, // HW_BIO_MONITOR
	5, // HW_HIGH_BW_BUS
	1, // HW_MAPPER
	3, // HW_DESIGN_ASSIST
	1, // HW_PROXY
];

// Base cost of level 1 hardware. Actual cost is Base * 2^(Rating-1)
const g_nHWBaseCost = [
	1000,	// HW_CHIP_BURNER
	500,	// HW_SURGE_SUPP
	1000,	// HW_NEURAL_DAMPER
	250,	// HW_TRACE_MONITOR
	500,	// HW_BIO_MONITOR
	500,	// HW_HIGH_BW_BUS
	2000,	// HW_MAPPER
	2000,	// HW_DESIGN_ASSIST
	1500,	// HW_PROXY
];

// Base cost of level 1 chip. Actual cost is Base * Rating^2
const g_nChipBaseCost = [
	150,	// CHIP_CPU
	100,	// CHIP_ATTACK
	100,	// CHIP_DEFENSE
	100,	// CHIP_STEALTH
	100,	// CHIP_ANALYSIS
	125,	// CHIP_COPROCESSOR
];

// Names of chips
const g_szChipNames = [
	"CPU",
	"Attack Firmware",
	"Defense Firmware",
	"Stealth Firmware",
	"Analysis Firmware",
	"Coprocessor",
];



function ShopItem() {
	// Member Data
	this.m_szText = "";		// Item description
	this.m_nType = 0;		// Item type
	this.m_nSubType = 0;	// Item subtype
	this.m_nRating = 0;		// Item rating
	this.m_nPrice = 0;		// Price type
};

// Member Functions
ShopItem.prototype.Generate = function(nType) {
	// Set the type
	this.m_nType = nType;

	switch (nType) {
		case IT_SOFTWARE:
			// Type is random. Make sure it is not 'special'
			do {
				this.m_nSubType = Random(NUM_PROGRAMS);
			} while (this.m_nSubType === PROGRAM_CLIENT);

			// Rating is 1..6 + 2*lifestyle (0..4)
			this.m_nRating = (2*g_pChar.m_nLifestyle) + Random(6) + 1;

			// Alternate method: Rating = 1..4 + 4*LS
			// Base = Random(11)
			//   0..3 = 1
			//   4..6 = 2
			//   7..8 = 3
			//   9 = 4
			//   10 = Random(LS*4), or 1 if LS = 1 (Lower value programs)

			// Get the price
			this.m_nPrice = GetSoftwarePrice(this.m_nSubType, this.m_nRating);

			// Get the text
			this.m_szText = GetSoftwareText(this.m_nSubType,this.m_nRating);
			break;
		case IT_HARDWARE:
			// Type is random
			this.m_nSubType = Random(NUM_HW);

			// Generate the rating (1..1+LS)
			this.m_nRating = 1 + Random(g_pChar.m_nLifestyle+1);
			if (this.m_nRating > g_nMaxHWLevel[this.m_nSubType])
				this.m_nRating = g_nMaxHWLevel[this.m_nSubType];

			// Get the cost
			this.m_nPrice = GetHardwarePrice(this.m_nSubType,this.m_nRating);

			// Get the description
			this.m_szText = GetHardwareString(this.m_nSubType, this.m_nRating);

			break;
		case IT_CHIP:
			// Choose random type
			this.m_nSubType = Random(NUM_CHIPS);

			// Rating is 2..7 + 2*lifestyle (0..4)
			// Minimum is 2 because everyone already has at least rating 1 installed.
			this.m_nRating = (2*g_pChar.m_nLifestyle) + Random(6) + 2;

			// Get the price according to type
			this.m_nPrice = GetChipPrice(this.m_nSubType, this.m_nRating);

			// Get the description
			this.m_szText = g_szChipNames[this.m_nSubType]+"  Level "+this.m_nRating;
			break;
	}

	// Modify the price by a random factor (+/- 0..15%)
	this.m_nPrice += Math.floor( (this.m_nPrice * (Random(31)-15)) / 100 );
}


// Global Functions
function GetHardwarePrice(nType, nRating) {
	return (g_nHWBaseCost[nType] * (1<<(nRating-1)));
}

function GetChipName(nType) {
	return g_szChipNames[nType];
}

function GetChipPrice(nType, nRating) {
	return (nRating * nRating * g_nChipBaseCost[nType]);
}

function GetMaxHardwareRating(nType) {
	return g_nMaxHWLevel[nType];
}

function GetHardwareString(nHardware, nRating) {
	let szStr;

	switch (nHardware) {
		case HW_CHIP_BURNER	:
			szStr = "Chip Burner";
			if (nRating===2)
				szStr += " (Double Speed)";
			else if (nRating===3)
				szStr += " (Triple Speed)";
			else if (nRating===4)
				szStr += " (Quad Speed)";
			break;
		case HW_SURGE_SUPP	:
			szStr = "Surge Suppressor Level "+nRating;
			break;
		case HW_NEURAL_DAMPER:
			szStr = "Neural Damper Level "+nRating;
			break;
		case HW_TRACE_MONITOR:
			szStr = "Trace Monitor Level "+nRating;
			break;
		case HW_BIO_MONITOR	:
			szStr = "Bio Monitor";
			if (nRating === 2)
				szStr += " w/AutoDump";
			break;
		case HW_HIGH_BW_BUS	:
			szStr = "High Bandwidth Bus Level "+nRating;
			break;
		case HW_MAPPER	:
			szStr = "Proximity Mapper";
			break;
		case HW_DESIGN_ASSIST:
			szStr = "Design Assistant Level "+nRating;
			break;
		case HW_PROXY:
			szStr = "AntiTrace Proxy";
			break;
	}
	return szStr;
}

function GetHardwareName(nType) {
	return g_szHardwareName[nType];
}

function GetChipComplexity(nClass) {
	switch (nClass) {
		case CHIP_CPU:
		case CHIP_COPROCESSOR:
			return 5;
		default:
			return 4;
	}
}


ShopItem.prototype.Save = function(Buffer) {
	Buffer.addString(this.m_szText);
	Buffer.addInteger(this.m_nType);
	Buffer.addInteger(this.m_nSubType);
	Buffer.addInteger(this.m_nRating);
	Buffer.addInteger(this.m_nPrice);
}
ShopItem.prototype.Load = function(Buffer, version) {
	this.m_szText = Buffer.getString();
	this.m_nType = Buffer.getInteger();
	this.m_nSubType = Buffer.getInteger();
	this.m_nRating = Buffer.getInteger();
	this.m_nPrice = Buffer.getInteger();
}

// system.js

function System() {
	this.m_olAreaList = [];
	this.m_pSystemCPU = null;
	this.m_pSystemPortalOut = null;
	this.m_nRating = 0;

	this.m_olIceList = [];
	this.m_olDeadIceList = [];
	this.m_olNodeList = [];
	this.m_nAlert = ALERT_GREEN;
	this.m_nTurnsUntilCrash = 0;
	this.m_bExternalAlarmsDeactivated = false;
	this.m_bBackdoor = false;
	this.m_nIceReactivateTime = 0;
	this.m_nCorporation = null;
	this.m_bPasscodeAccessed = false;
}

System.prototype.Generate = function(nCorporation, nSystemSize, dwFlags) {
	this.m_nCorporation = nCorporation;
	this.m_nRating = nSystemSize;

	if (g_pChar.m_bSystemAlerts[g_pChar.m_pSystem.m_nCorporation]) {
		// Set yellow alert
		this.m_nAlert = ALERT_YELLOW;
	}

	let pArea;
	Node.prototype.numNode = 0; // restart node numbering

	//------------------------------------
	// Calculate basic stats for each area
	//------------------------------------
	let nAreaCount = Math.ceil(nSystemSize/4);      // 1 1 1 1 2 2 2 2 3 3 3 3 4 4 4 4 5 5 5 5
	let nAreaSize = (nSystemSize-1)%4 + nAreaCount; // 1 2 3 4 2 3 4 5 3 4 5 6 4 5 6 7 5 6 7 8 (initial size)
	let nAreaNumber = 0;
	let aAreaData = [];
	while (nAreaCount--)
		aAreaData.push([nAreaSize++, nAreaNumber++, 0]); // params for generate area

	// ensure areas have enough nodes for our current quest
	switch (g_pChar.m_pCurrentContract.m_nType) {
		// IO Quests
		case CONT_DEACTIVATE_IO:
		case CONT_ACTIVATE_IO:
		case CONT_SABOTAGE_IO:
			for (let nTarget = 0; nTarget < g_pChar.m_pCurrentContract.m_nNumTargets; nTarget++) {
				// Select a random area, increase its minimum IO number
				aAreaData[ Random(aAreaData.length) ][2]++;
			}
			break;
	}

	//-------------------------
	// Generate the actual map
	//-------------------------
	let oldNumNode = Node.prototype.numNode;
	aAreaData.forEach(params => {
		// Create an area. On a try block, in case it fails:
		let bTryAgain = true;
		while (bTryAgain) {
			pArea = new Area(this);
			bTryAgain = false;
			try {
				pArea.GenerateArea(...params);
			} catch(e) {
				if (e !== null) throw e;
				// it failed gracefully; we only need to restore node number
				bTryAgain = true;
				Node.prototype.numNode = oldNumNode;
			}
		}
		oldNumNode = Node.prototype.numNode;
		this.m_olAreaList.push(pArea);
		this.m_olNodeList = this.m_olNodeList.concat(pArea.m_olNodeList);
	});

	// Save the system portal
	this.m_pSystemPortalOut = pArea.m_pAreaPortalOut;


	//--------------------
	// Add the Quest data
	//--------------------

	// Process according to quest type
	switch (g_pChar.m_pCurrentContract.m_nType) {
		// Data Store quests
		case CONT_STEAL:
		case CONT_STEAL_ERASE:
		case CONT_ERASE:
		case CONT_EDIT:
			for (let nTarget = 0; nTarget < g_pChar.m_pCurrentContract.m_nNumTargets; nTarget++) {
				// Select a random area
				let pArea = this.m_olAreaList[ Random(this.m_olAreaList.length) ];

				// Create a list of DS nodes
				let olNodeList = [];
				pArea.m_olNodeList.forEach(pNode => {
					if (pNode.m_nType === NT_DS) {
						// Add the node to the list
						olNodeList.push(pNode);
					}
				});

				// Choose a random node
				let pNode = olNodeList[ Random(olNodeList.length) ];

				// Create a quest file
				let pFile = new DSfile;
				pFile.m_nType = FT_QUEST;
				pFile.Generate(pNode);

				// Add it to a random position in the file list for the node
				pNode.m_olFileList.splice( Random(pNode.m_olFileList.length+1), 0, pFile );

				// Set the node subtype
				pNode.m_nSubType = NST_DS_QUEST_NODE;
			}
			break;

		// IO Quests
		case CONT_DEACTIVATE_IO:
		case CONT_ACTIVATE_IO:
		case CONT_SABOTAGE_IO:
			// we already told each area how many quest nodes we need there.
			break;

		// CPU Quests
		case CONT_CRASH_SYS:
		case CONT_BACKDOOR:
			// The CPU is the node
			// No need to mark anything
			break;

		case CONT_RUN_PROGRAM:
			if (g_pChar.m_pCurrentContract.m_nTargetObject !== CT_NODE_CPU) {
				let nNodeType;
				if (g_pChar.m_pCurrentContract.m_nTargetObject === CT_NODE_IO)
					nNodeType = NT_IO;
				else
					nNodeType = NT_DS;

				for (let nTarget = 0; nTarget < g_pChar.m_pCurrentContract.m_nNumTargets; nTarget++) {
					// Select a random area
					let pArea = this.m_olAreaList[ Random(this.m_olAreaList.length) ];

					// Create a list of nodes
					let olNodeList = [];
					pArea.m_olNodeList.forEach(pNode => {
						if (pNode.m_nType === nNodeType && pNode.m_nSubType === 0) {
							// Add the node to the list
							olNodeList.push(pNode);
						}
					});

					// If no nodes left, we have a problem
					if (olNodeList.length === 0) {
						// shouldn't happen, since at least one IO and one DS are sure to exist in each area.
						console.error("This should never happen.");
						throw null;
					}

					// Choose a random node, set the quest flag for this node
					olNodeList[ Random(olNodeList.length) ].m_nSubType = 1; // NST_IO_QUEST_NODE or NST_DS_QUEST_NODE
				}
			}
			break;
	}

	//--------------
	// Generate ICE
	//--------------
	this.m_olNodeList.forEach(pNode => pNode.GenerateICE());
}




System.prototype.RouteResponseIC = function(pNode) {
	this.m_olIceList.forEach(pIce => {
		// Is this response IC?
		if (!pIce.m_bResponse) return;

		// If this ice is hostile, it has already found the player
		if (pIce.m_nState & STATE_MASK_HOSTILE) return;

		// Is it in the same area
		if (pIce.m_pCurrentNode.m_pParentArea === pNode.m_pParentArea) {
			// Is it already in this node?
			if (pIce.m_pCurrentNode !== pNode) {
				// Send it to the target node
				pIce.m_nState = STATE_MOVING;
				pIce.m_pTargetNode = pNode;
			} else {
				// Ice is in the same node. If player is here, attack
				if (pIce.m_pCurrentNode === g_pChar.m_pCurrentNode) {
					pIce.m_nState = STATE_ATTACKING;
				} else {
					// Not here, so set to wander
					pIce.m_nState = STATE_SEARCHING;
				}
			}
		} else {
			// Activate, but set to wander
			pIce.m_nState = STATE_SEARCHING;
		}

	});
}

System.prototype.SetReactivateTime = function(bAlreadyActive) {
	// Set the time that it takes to actually rebuild and activate the ice
	this.m_nIceReactivateTime = (10 - (this.m_nRating>>2)); // 10..5 turns

	// If we are not currently activating ICE, the system is assumed
	// to be scanning for crashed ice only occasionally, so add a random
	// amount to the total.
	if (!bAlreadyActive) {
		let nScanTime;

		// First, compute the dead ice scan time according to alert status.
		if (this.m_nAlert === ALERT_RED) {
			// For red alert, check for dead ice often
			nScanTime = (21 - this.m_nRating); // 20..1 turns
		} else {
			// For green/yellow alert, check for dead ice occasionally
			nScanTime = (31 - this.m_nRating); // 30..11 turns
		}

		// Now, assume that a random amount of the scan time is already gone.
		nScanTime -= Random(nScanTime);

		// Add the scan time to the reactivation time
		this.m_nIceReactivateTime += nScanTime;
	}
}

System.prototype.BuildFileList = function(bContractOnly) {
	let olFiles = [];
	this.m_olAreaList.forEach(pArea => {
		pArea.m_olNodeList.forEach(pNode => {
			pNode.m_olFileList.forEach(pFile => {
				if (!bContractOnly || pFile.m_nType === FT_QUEST)
					olFiles.push(pFile);
			});
		});
	});
	return olFiles;
}

System.prototype.BuildNodeList = function(nType, bContractOnly) {
	let olNodes = [];
	this.m_olAreaList.forEach(pArea => {
		pArea.m_olNodeList.forEach(pNode => {
			if (pNode.m_nType === nType) {
				if (bContractOnly) {
					if (nType === NT_IO && pNode.m_nSubType === NST_IO_QUEST_NODE)
						olNodes.push(pNode);
					else if (nType === NT_DS && pNode.m_nSubType === NST_DS_QUEST_NODE)
						olNodes.push(pNode);
					// Add other nodes as needed
				} else {
					olNodes.push(pNode);
				}
			}
		});
	});
	return olNodes;
}


System.prototype.MarkContractNodes = function() {
	let MSGs = [];
	let contType = g_pChar.m_pCurrentContract.m_nType;

	if (contType === CONT_STEAL || contType === CONT_STEAL_ERASE || contType === CONT_ERASE || contType === CONT_EDIT || (contType === CONT_RUN_PROGRAM && g_pChar.m_pCurrentContract.m_nTargetObject === CT_NODE_DS)) {
		this.m_olNodeList.forEach(pNode => {
			if (pNode.m_nType === NT_DS && pNode.m_nSubType === NST_DS_QUEST_NODE) {
				// Mark this node
				pNode.m_bMapped = true;
				pNode.m_nSpecialImage = NSI_DS_QUEST;

				MSGs.push("Contract Node: Area "+pNode.m_pParentArea.m_nAreaNumber+" Node "+pNode.m_szName);
			}
		});
	} else if (contType === CONT_DEACTIVATE_IO || contType === CONT_ACTIVATE_IO || contType === CONT_SABOTAGE_IO || (contType === CONT_RUN_PROGRAM && g_pChar.m_pCurrentContract.m_nTargetObject === CT_NODE_IO)) {
		this.m_olNodeList.forEach(pNode => {
			if (pNode.m_nType === NT_IO && pNode.m_nSubType === NST_IO_QUEST_NODE) {
				// Mark this node
				pNode.m_bMapped = true;
				pNode.m_nSpecialImage = NSI_IO_QUEST;

				MSGs.push("Contract Node: Area "+pNode.m_pParentArea.m_nAreaNumber+" Node "+pNode.m_szName);
			}
		});
	}

	return MSGs;
}



System.prototype.Save = function(Buffer) {
	// Write the corporation
	Buffer.addInteger(this.m_nCorporation);

	// Write the area list
	Buffer.addWord(this.m_olAreaList.length);
	this.m_olAreaList.forEach(pArea => {
		// Write the item
		pArea.Save(Buffer);
	});

	// Skip the CPU. It is always the first node

	// Write the system portal (it will be in the last area)
	Buffer.addElement(this.m_pSystemPortalOut, this.m_olAreaList[this.m_olAreaList.length-1].m_olNodeList);

	// Write the ice list
	Buffer.addWord(this.m_olIceList.length);
	this.m_olIceList.forEach(pIce => {
		// Write the item
		pIce.Save(Buffer, this);
	});

	// Write the dead ice list
	Buffer.addWord(this.m_olDeadIceList.length);
	this.m_olDeadIceList.forEach(pIce => {
		// Write the item
		pIce.Save(Buffer, this);
	});

	// Write the basic properties
	Buffer.addInteger(this.m_nAlert);
	Buffer.addInteger(this.m_nRating);
	Buffer.addInteger(this.m_nTurnsUntilCrash);
	Buffer.addInteger(this.m_bExternalAlarmsDeactivated);
	Buffer.addInteger(this.m_bBackdoor);
	Buffer.addInteger(this.m_nIceReactivateTime);
	Buffer.addInteger(this.m_bPasscodeAccessed);
}

System.prototype.Load = function(Buffer, version, pChar) {
	// Read the corporation
	if (version < 6)
		this.m_nCorporation = pChar.m_pCurrentContract.m_nCorporation;
	else
		this.m_nCorporation = Buffer.getInteger();

	// Read the area list
	for (let i = Buffer.getWord(); i > 0; i--) {
		let pArea = new Area(this);
		pArea.Load(Buffer, version);
		this.m_olAreaList.push(pArea);

		// Add this area's nodes to our list
		this.m_olNodeList = this.m_olNodeList.concat(pArea.m_olNodeList);
	}

	// Get the CPU. It is always the first node of the first area
	this.m_pSystemCPU = this.m_olAreaList[0].m_olNodeList[0];

	// Read the system portal (it will be in the last area)
	this.m_pSystemPortalOut = Buffer.getElement( this.m_olAreaList[this.m_olAreaList.length-1].m_olNodeList );

	// Read the ice list
	for (let i = Buffer.getWord(); i > 0; i--) {
		let pIce = new Ice;
		pIce.Load(Buffer, version, this);
		this.m_olIceList.push(pIce);
	}

	// Read the dead ice list
	for (let i = Buffer.getWord(); i > 0; i--) {
		let pIce = new Ice;
		pIce.Load(Buffer, version, this);
		this.m_olDeadIceList.push(pIce);
	}

	// Read the basic properties
	this.m_nAlert = Buffer.getInteger();
	this.m_nRating = Buffer.getInteger();
	this.m_nTurnsUntilCrash = Buffer.getInteger();
	this.m_bExternalAlarmsDeactivated = !!Buffer.getInteger();
	this.m_bBackdoor = !!Buffer.getInteger();
	this.m_nIceReactivateTime = Buffer.getInteger();
	if (version >= 10)
		this.m_bPasscodeAccessed = !!Buffer.getInteger();
}

// area.js

function Area(pParentSystem) {
	this.m_pSystem = pParentSystem; // parent system
	this.m_olNodeList = [];
	this.m_nAreaNumber = 0;
	this.m_pAreaSPU = null;
	this.m_pAreaPortalIn = null;
	this.m_pAreaPortalOut = null;
	this.m_pIceIONode = null;
	this.m_pHighSpeedIONode = null;
	this.m_nSizeX = 0;
	this.m_nSizeY = 0;
}

Area.prototype.GenerateArea = function(nAreaSize, nAreaNumber, nQuestIO=0) {
	// Save our area number
	this.m_nAreaNumber = nAreaNumber;

	//------------------
	// Create the Nodes
	//------------------
	// Create the CPU/SPU
	if (nAreaNumber === 0) {
		this.m_pAreaSPU = new Node(this, NT_CPU);
		this.m_pSystem.m_pSystemCPU = this.m_pAreaSPU;
	} else {
		this.m_pAreaSPU = new Node(this, NT_SPU);
	}
	this.m_olNodeList.push(this.m_pAreaSPU);

	// Add security node
	if (1) {
		let pNode = new Node(this, NT_COP, NST_COP_SECURITY);
		this.AddNode(this.m_pAreaSPU, pNode);
	}

	// Add basic nodes
	{
		let nodes = [];

		// Datastores
		for (let i = 1 + Random2(2,nAreaSize+1); i>0; i--)
			nodes.push( new Node(this, NT_DS) );

		// Quest I/O
		for (let i=nQuestIO; i>0; i--)
			nodes.push(new Node(this, NT_IO, NST_IO_QUEST_NODE));
		// Useless I/O
		for (let i = 1 + Random2(2,nAreaSize+1) - nQuestIO; i>0; i--)
			nodes.push(new Node(this, NT_IO));

		// ICE port I/O node
		this.m_pIceIONode = new Node(this, NT_IO, NST_IO_ICE_PORT);
		nodes.push(this.m_pIceIONode);

		// External alarm I/O node if this is the innermost area.
		if (nAreaNumber === 0)
			nodes.push(new Node(this, NT_IO, NST_IO_ALARM));

		// High-speed I/O node, maybe
		if (Random(30) < this.m_pSystem.m_nRating) {
			this.m_pHighSpeedIONode = new Node(this, NT_IO, NST_IO_MATRIX);
			nodes.push(this.m_pHighSpeedIONode);
		}

		//	nodes.shuffle(); // TODO: would it be better with this?

		// Add the basic nodes
		let nBasicNodes = 0;
		nodes.forEach(pNode => {
			this.AddNode(this.m_pAreaSPU, pNode);

			// Add a coprocessor every fourth node
			nBasicNodes++;
			if (nBasicNodes%4 === 0)
				this.AddNode(pNode, new Node(this, NT_COP));
		});
	}

	// Add the portal in
	if (this.m_nAreaNumber!=0) {
		this.m_pAreaPortalIn = this.AddNode(this.m_pAreaSPU, new Node(this, NT_PORTAL_IN));
	}
	// Add the portal out
	if (1) {
		this.m_pAreaPortalOut = this.AddNode(this.m_pAreaSPU, new Node(this, NT_PORTAL_OUT));
	}

	//-------------------------------
	// Divide the area into clusters
	//-------------------------------
	let nClusterNumber = new Numero(1);
	for (let nDir = 0; nDir<4; nDir++) {
		if (this.m_pAreaSPU.m_pAdjNode[nDir] !== null) {
			let nSubNodes = new Numero(0);
			let bHasCOP = new Numero(false);
			this.m_pAreaSPU.m_pAdjNode[nDir].CreateClusters(nClusterNumber, OppDir(nDir), nSubNodes, bHasCOP);
		}
	}

	//----------------------------
	// Make auxiliary connections
	//----------------------------
	// Go through and make connections to DS's and COP's
	this.m_olNodeList.forEach(pNode => {
		if (pNode.m_nType === NT_DS || pNode.m_nType === NT_COP) {
			for (let nDir = 0; nDir<4; nDir++) {
				// If already a node connected there, ignore
				if (pNode.m_pAdjNode[nDir] !== null) continue;

				// See if there is an unconnected node there
				let ptLoc = pNode.m_ptLocation.move(nDir);
				let pOtherNode = this.FindNode(ptLoc);
				if (!pOtherNode) continue; // Node must be present

				if (pOtherNode.m_nType === NT_PORTAL_IN) continue; // Auxiliary connections not allowed with portals
				if (pOtherNode.m_nType === NT_PORTAL_OUT)continue; // Auxiliary connections not allowed with portals

				if (Random(2) === 1) { // 50% chance of connection
					// Link the two nodes
					pNode.m_pAdjNode[nDir] = pOtherNode;
					pOtherNode.m_pAdjNode[OppDir(nDir)] = pNode;
				}
			}
		}
	});

	//-------------------
	// Create Files
	//-------------------
	this.m_olNodeList.forEach(pNode => {
		if (pNode.m_nType === NT_DS)
			pNode.CreateFileList();
	});

	//-----------------------------
	// Adjust the coordinate space
	//-----------------------------
	this.adjustCoords();
}
Area.prototype.adjustCoords = function() {
	// adjust the coordinates and get the min/max
	let iMinX = 0, iMaxX = 0, iMinY = 0, iMaxY = 0;
	this.m_olNodeList.forEach(pNode => {
		iMinX = Math.min(iMinX, pNode.m_ptLocation.x);
		iMaxX = Math.max(iMaxX, pNode.m_ptLocation.x);
		iMinY = Math.min(iMinY, pNode.m_ptLocation.y);
		iMaxY = Math.max(iMaxY, pNode.m_ptLocation.y);
	});

	// Adjust all to positive range
	let iAdjustX = -iMinX;
	let iAdjustY = -iMinY;

	this.m_olNodeList.forEach(pNode => {
		pNode.m_ptLocation.x += iAdjustX;
		pNode.m_ptLocation.y += iAdjustY;
	});

	this.m_nSizeX = iMaxX + iAdjustX + 1;
	this.m_nSizeY = iMaxY + iAdjustY + 1;
}

Area.prototype.AddNode = function(pParentNode, pNewNode) {
	// Add node to the list
	this.m_olNodeList.push(pNewNode);

	// Find a place to put it
	let nDir = Random(4);
	let nRot = ChooseRot();

	let bDone = false;
	for (let iCount = 0; iCount<4; iCount++) {
		if (this.AddNodeDir(pParentNode, pNewNode, nDir)) {
			bDone = true;
			break;
		}
		nDir += nRot;
		nDir &= 3;
	}

	if (!bDone) {
		console.warn("Warning - Could not add node");
		throw null;
	}

	return pNewNode;
}

// returns success
Area.prototype.AddNodeDir = function(pParentNode, pNewNode, nDir) {
	let nOppositeDir = OppDir(nDir); // Opposite direction

	// See if this direction is empty
	if (pParentNode.m_pAdjNode[nDir] === null) {
		// See if there is a node in this location
		let ptNewLoc = pParentNode.m_ptLocation.move(nDir);
		if (this.FindNode(ptNewLoc))
			return false;

		// Put it here
		pParentNode.m_pAdjNode[nDir] = pNewNode;
		pNewNode.m_pAdjNode[nOppositeDir] = pParentNode;
		pNewNode.m_ptLocation = ptNewLoc;

		return true;
	}

	// direction is occupied. See if it is a junction.
	if (pParentNode.m_pAdjNode[nDir].m_nType === NT_JUNC) {
		// Try to add it to the junction
		let nNewDir = Random(4);
		let nRot = ChooseRot();

		for (let nCount = 0; nCount<4; nCount++) {
			if (nNewDir !== nOppositeDir) {
				if (this.AddNodeDir(pParentNode.m_pAdjNode[nDir], pNewNode, nNewDir) === true)
					return true;
			}
			nNewDir += nRot;
			nNewDir &= 3;
		}
		return false;
	}

	// We will have to try to create a junction at this location
	if (1) {
		// See if there are at least two open locations

		// Get the old node
		let pOldNode = pParentNode.m_pAdjNode[nDir];
		let ptNewLoc = pOldNode.m_ptLocation;
		let bOpen = [null,null,null,null];
		let ptLoc = [null,null,null,null];

		let nCount = 0;
		for (let nNewDir = 0; nNewDir<4; nNewDir++) {
			// If opposite direction, closed
			if (nNewDir === nOppositeDir) {
				bOpen[nNewDir] = false;
				continue;
			}

			// Get location
			ptLoc[nNewDir] = ptNewLoc.move(nNewDir);

			// If node here, closed
			if (this.FindNode(ptLoc[nNewDir])) {
				bOpen[nNewDir] = false;
				continue;
			}

			// This is open
			bOpen[nNewDir] = true;
			nCount++;
		}

		if (nCount<2) {
			// No room to add
			return false;
		}

		// Create the junction and link it to the parent node in the place of the old node
		let pJunction = new Node(this, NT_JUNC);
		this.m_olNodeList.push(pJunction);
		pJunction.m_ptLocation = ptNewLoc;

		for (nCount = 0; nCount<4; nCount++) {
			pJunction.m_pAdjNode[nCount] = pOldNode.m_pAdjNode[nCount];
			if (pOldNode.m_pAdjNode[nCount] !== null) {
				pOldNode.m_pAdjNode[nCount].m_pAdjNode[OppDir(nCount)] = pJunction;
				pOldNode.m_pAdjNode[nCount] = null;
			}
		}

		// Link the old node to a random direction
		nDir = Random(4);
		let nRot = ChooseRot();
		while (!bOpen[nDir]) {
			nDir += nRot;
			nDir &= 3;
		}
		nOppositeDir = OppDir(nDir);

		pOldNode.m_ptLocation = ptLoc[nDir];
		pJunction.m_pAdjNode[nDir] = pOldNode;
		pOldNode.m_pAdjNode[nOppositeDir] = pJunction;

		// Set this location to not available for next one
		bOpen[nDir] = false;

		// Link the new node
		nDir = Random(4);
		nRot = ChooseRot();
		while (!bOpen[nDir]) {
			nDir += nRot;
			nDir &= 3;
		}
		nOppositeDir = OppDir(nDir);

		pNewNode.m_ptLocation = ptLoc[nDir];
		pJunction.m_pAdjNode[nDir] = pNewNode;
		pNewNode.m_pAdjNode[nOppositeDir] = pJunction;

		return true;
	}
}

// returns node at coordinates, or undefined if no node there
Area.prototype.FindNode = function(ptLoc) {
	return this.m_olNodeList.find(pNode => pNode.m_ptLocation.sameAs(ptLoc));
}

Area.prototype.CalculatePathsToNode = function(pTargetNode) {
	// Reset the processed flags
	this.m_olNodeList.forEach(pNode => {
		pNode.m_bProcessed = 255;
	});

	// Mark the target node as processed
	pTargetNode.m_bProcessed = 0;

	for (let nDir = 0; nDir<4; nDir++) {
		// If no node, ignore
		if (pTargetNode.m_pAdjNode[nDir] !== null)
			pTargetNode.m_pAdjNode[nDir].MarkPaths(OppDir(nDir));
	}
}




Area.prototype.Save = function(Buffer) {
	// Write the node list
	Buffer.addWord(this.m_olNodeList.length);
	this.m_olNodeList.forEach(pNode => {
		// Write the item
		pNode.Save(Buffer);
	});

	// Write the area number
	Buffer.addInteger(this.m_nAreaNumber);

	// Write the area node pointers
	Buffer.addElement(this.m_pAreaSPU, this.m_olNodeList);
	Buffer.addElement(this.m_pAreaPortalIn, this.m_olNodeList);
	Buffer.addElement(this.m_pAreaPortalOut, this.m_olNodeList);
	Buffer.addElement(this.m_pIceIONode, this.m_olNodeList);
	Buffer.addElement(this.m_pHighSpeedIONode, this.m_olNodeList);

	// Write the size
	Buffer.addInteger(this.m_nSizeX);
	Buffer.addInteger(this.m_nSizeY);
}
Area.prototype.Load = function(Buffer, version) {
	// Read the node list

	// Create the nodes first so we can fill in the adjacent node list
	for (let i = Buffer.getWord(); i > 0; i--) {
		this.m_olNodeList.push( new Node(this) );
	}

	// Now, actually read the nodes in
	this.m_olNodeList.forEach(pNode => {
		// Read the item
		pNode.Load(Buffer, version);
	});

	// Read the area number
	this.m_nAreaNumber = Buffer.getInteger();

	// Read the area node pointers
	this.m_pAreaSPU = Buffer.getElement(this.m_olNodeList);
	this.m_pAreaPortalIn = Buffer.getElement(this.m_olNodeList);
	this.m_pAreaPortalOut = Buffer.getElement(this.m_olNodeList);
	this.m_pIceIONode = Buffer.getElement(this.m_olNodeList);
	this.m_pHighSpeedIONode = Buffer.getElement(this.m_olNodeList);

	// Read the size
	this.m_nSizeX = Buffer.getInteger();
	this.m_nSizeY = Buffer.getInteger();
}

// node.js



// Node grid template data
const g_nGridTemplateCPU = [
	[1,1,1,0,0,0,1,1,1],
	[1,1,0,0,0,0,0,1,1],
	[1,0,0,0,0,0,0,0,1],
	[0,0,0,1,1,1,0,0,0],
	[0,0,0,1,1,1,0,0,0],
	[0,0,0,1,1,1,0,0,0],
	[1,0,0,0,0,0,0,0,1],
	[1,1,0,0,0,0,0,1,1],
	[1,1,1,0,0,0,1,1,1],
];
const g_nGridTemplateSPU = [
	[1,1,1,0,0,0,1,1,1],
	[1,1,0,0,0,0,0,1,1],
	[1,0,0,0,0,0,0,0,1],
	[0,0,0,1,0,1,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,1,0,1,0,0,0],
	[1,0,0,0,0,0,0,0,1],
	[1,1,0,0,0,0,0,1,1],
	[1,1,1,0,0,0,1,1,1],
];
const g_nGridTemplateCOP = [
	[1,1,1,0,0,0,1,1,1],
	[1,1,1,0,0,0,1,1,1],
	[1,1,0,0,0,0,0,1,1],
	[1,0,0,0,0,0,0,0,1],
	[0,0,0,0,1,0,0,0,0],
	[1,0,0,0,0,0,0,0,1],
	[1,1,0,0,0,0,0,1,1],
	[1,1,1,0,0,0,1,1,1],
	[1,1,1,0,0,0,1,1,1],
];
const g_nGridTemplatePortal = [
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,1,0,0,0,0],
	[0,0,0,0,1,0,0,0,0],
	[0,0,0,0,1,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
];
const g_nGridTemplateDS = [
	[1,1,0,0,0,0,0,0,1],
	[0,0,0,0,0,0,0,0,0],
	[0,1,0,1,0,0,1,0,0],
	[0,0,0,1,1,0,0,0,0],
	[0,0,0,0,1,0,1,0,0],
	[0,0,0,1,0,0,0,0,0],
	[1,0,0,0,0,1,0,0,0],
	[0,0,0,0,0,0,0,1,1],
	[0,1,0,0,0,0,0,1,1],
];
const g_nGridTemplateIO = [
	[1,1,1,0,0,0,1,1,1],
	[1,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,1],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0],
	[1,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,1],
	[1,1,1,0,0,0,1,1,1],
];
const g_nGridTemplateJunction = [
	[1,1,1,1,0,1,1,1,1],
	[1,1,1,0,0,0,1,1,1],
	[1,1,0,0,0,0,0,1,1],
	[1,0,0,0,0,0,0,0,1],
	[0,0,0,0,0,0,0,0,0],
	[1,0,0,0,0,0,0,0,1],
	[1,1,0,0,0,0,0,1,1],
	[1,1,1,0,0,0,1,1,1],
	[1,1,1,1,0,1,1,1,1],
];
const g_NodeGridTemplate = [
	g_nGridTemplateCPU,
	g_nGridTemplateSPU,
	g_nGridTemplateCOP,
	g_nGridTemplateDS,
	g_nGridTemplateIO,
	g_nGridTemplateJunction,
	g_nGridTemplatePortal,
	g_nGridTemplatePortal,
];




function Node(pParentArea, nNodeType, nSubType=0) {
	this.m_pParentArea = pParentArea;			// Parent area
	this.m_nType = nNodeType;					// Node Type
	this.m_nSubType = nSubType;					// Sub Type
	this.m_nCluster = 0;						// Cluster #
	this.m_pAdjNode = [null,null,null,null];	// Adjacent nodes
	this.m_ptLocation = new Point(0,0);			// Current location
	this.m_olFileList = [];						// File list for datastores
	this.m_nActiveSmokeLevel = 0;				// Level of active smoke program
	this.m_nActiveSilenceLevel = 0;				// Level of active silence program
	this.m_bActivated = false;					// Has it been activated?
	this.m_bMapped = false;						// Has this node been mapped?
	this.m_nSpecialImage = -1;					// Special image on the map

	this.m_nNodeNumber = Node.prototype.numNode++;

	// Temporary data
	this.m_bProcessed = 0;
}
Node.prototype.numNode = 0;



// Choose a location dependant on desired direction. Returns null if there is no space
Node.prototype.ChooseLocation = function(nDir) {
	switch (nDir) {
		case DIR_NORTH	:
			return this.ChooseClosestLocation(new Point(4,0));
		case DIR_EAST	:
			return this.ChooseClosestLocation(new Point(8,4));
		case DIR_SOUTH	:
			return this.ChooseClosestLocation(new Point(4,8));
		case DIR_WEST	:
			return this.ChooseClosestLocation(new Point(0,4));
		case DIR_CENTER	:
			return this.ChooseClosestLocation(new Point(4,4));
		case DIR_NONE	:
		default:
			return this.ChooseAnyLocation(); // Choose any location
	}
}

// Returns null if there is no space
Node.prototype.ChooseClosestLocation = function(pt) {
	let ptLoc = new Point(pt.x,pt.y);

	// Get a pointer to the background map for this node
	let pGrid = g_NodeGridTemplate[this.m_nType];

	// Try for the target location
	if ( pGrid[ptLoc.y][ptLoc.x]===0 && this.IsEmptyLocation(ptLoc) )
		return ptLoc;

	// Target is not empty, so try expanding radius until one is found
	let nMinX = ptLoc.x;
	let nMaxX = ptLoc.x;
	let nMinY = ptLoc.y;
	let nMaxY = ptLoc.y;
	while ( nMinX!==0 || nMaxX!==8 || nMinY!==0 || nMaxY!==8 ) {
		// Expand the range of locations
		if ( nMinX !== 0 ) nMinX--;
		if ( nMaxX !== 8 ) nMaxX++;
		if ( nMinY !== 0 ) nMinY--;
		if ( nMaxY !== 8 ) nMaxY++;

		// Set the tries
		let nTries = 100;

		let nRangeX = 1 + nMaxX - nMinX;
		let nRangeY = 1 + nMaxY - nMinY;

		while (nTries--) {
			// Choose a random point in range
			ptLoc.x = Random(nRangeX) + nMinX;
			ptLoc.y = Random(nRangeY) + nMinY;

			if ( pGrid[ptLoc.y][ptLoc.x]===0 && this.IsEmptyLocation(ptLoc) )
				return ptLoc;
		}
	}

	// Node seems full. Try again, at any location
	return this.ChooseAnyLocation();
}

// Returns null if there is no space
Node.prototype.ChooseAnyLocation = function() {
	// Get a pointer to the background map for this node
	let pGrid = g_NodeGridTemplate[this.m_nType];

	// Set the tries
	let nTries = 100;

	while (nTries--) {
		// Choose a random point in range
		let ptLoc = new Point( Random(9), Random(9) );
		if ( pGrid[ptLoc.y][ptLoc.x]===0 && this.IsEmptyLocation(ptLoc) )
			return ptLoc;
	}

	// Node seems full. Try again, at every single location
	for (let y=0; y<=8; y++) for (let x=0; x<=8; x++) {
		let ptLoc = new Point(x,y);
		if ( pGrid[ptLoc.y][ptLoc.x]===0 && this.IsEmptyLocation(ptLoc) )
			return ptLoc;
	}

	// Node is completely full. FIXME: what to do?
	return null;
}

Node.prototype.IsEmptyLocation = function(ptLoc) {
	// Is the character at this location
	if (g_pChar.m_pCurrentNode === this) {
		// Is character at this spot?
		if ( ptLoc.sameAs(g_pChar.m_ptNodeLoc) )
			return false;

		// Is a decoy at this location
		for (let i=0; i < g_pChar.m_nDecoyCount; i++) {
			if ( ptLoc.sameAs(g_pChar.m_ptDecoyLocation[i]) )
				return false;
		}
	}

	// Look for ICE at this location
	return !g_pChar.m_pSystem.m_olIceList.find(pIce => {
		return ( pIce.m_pCurrentNode===this && ptLoc.sameAs(pIce.m_ptNodeLoc) );
	});
}



// nClusterNumber = Numero
// nDirFrom = integer
// nSubNodes = Numero
// bHasCOP = Numero (bool)
Node.prototype.CreateClusters = function(nClusterNumber, nDirFrom, nSubNodes, bHasCOP) {
	// If this is a junction, process the sub nodes, and decide on gateway.
	// This is because at this point, only junctions and the CPU/SPU have multiple connections.
	if (this.m_nType === NT_JUNC) {
		for (let nDir = 0; nDir < 4; nDir++) {
			// Ignore the direction we just came from
			if (nDir === nDirFrom) continue;

			// Process if there is a connection
			if (this.m_pAdjNode[nDir] !== null)
				this.m_pAdjNode[nDir].CreateClusters( nClusterNumber, OppDir(nDir), nSubNodes, bHasCOP);
		}

		// Decide if we need to create a cluster.
		// Basically, we must have at least 1 coprocessor and 4 other nodes total
		if (bHasCOP.get() && nSubNodes.get() >= 4) {
			// Set the cluster numbers for all the the nodes
			this.MarkNewCluster(nClusterNumber, nDirFrom);
			nClusterNumber.inc();

			// Reset the pertinent information
			bHasCOP.set(false);
			nSubNodes.set(0);
		}
	}
	// Is this a portal?
	if (this.m_nType === NT_PORTAL_IN || this.m_nType === NT_PORTAL_OUT) {
		// Portal automatically qualifies as a cluster unto itself
		this.m_nCluster = nClusterNumber.get();
		nClusterNumber.inc();
	}
	// Is this a coprocessor?
	if (this.m_nType === NT_COP) {
		bHasCOP.set(true);
	}

	nSubNodes.inc();
}

// nClusterNumber = Numero
// nDirFrom = integer
Node.prototype.MarkNewCluster = function(nClusterNumber, nDirFrom) {
	// Set the sub-nodes cluster number
	for (let nDir = 0; nDir < 4; nDir++) {
		// Ignore parent direction
		if (nDir === nDirFrom) continue;

		// Mark if there is a connection and the connected node is in the same cluster as us
		if (this.m_pAdjNode[nDir] !== null && this.m_pAdjNode[nDir].m_nCluster === this.m_nCluster)
			this.m_pAdjNode[nDir].MarkNewCluster(nClusterNumber, OppDir(nDir));
	}

	// Set our cluster number;
	this.m_nCluster = nClusterNumber.get();
}

// nDirFrom = integer
Node.prototype.MarkPaths = function(nDirFrom) {
	// Mark this node
	this.m_bProcessed = this.m_pAdjNode[nDirFrom].m_bProcessed+1;

	// Mark adjacent nodes
	for (let nDir = 0; nDir<4; nDir++) {
		// Ignore parent node
		if (nDir === nDirFrom) continue;

		// If no node, ignore
		if (this.m_pAdjNode[nDir] === null) continue;

		// If sibling node value is higher, process it
		if (this.m_pAdjNode[nDir].m_bProcessed > this.m_bProcessed+1)
			this.m_pAdjNode[nDir].MarkPaths(OppDir(nDir));
	}
}

Node.prototype.CreateFileList = function() {
	// Generate the number of files (5d4)
	let nNumFiles = 5 + Random2(5,4);

	//FSO 12-17-01 Change chance of valuable file.
	//nAreas = Math.ceil(this.m_pParentArea.m_pSystem.m_nRating / 4);
	//nChance = 12 - (nAreas*2);
	let nChance = 10;

	// Add each file
	for (let nFile = 0; nFile < nNumFiles; nFile++) {
		// Create a file
		let pFile = new DSfile;

		// Generate the type (Chance of valuable computed above)
		let nRoll = Random(100);
		if (nRoll < nChance) {
			// Valuable file
			pFile.m_nType = FT_VALUABLE;
		} else if (g_pChar.m_pCurrentContract.HintAvailable() && nRoll === 99) {
			// 1% chance of hint file
			pFile.m_nType = FT_CLUE;
		} else if (nRoll === 98) {
			// 1% chance of a passcode file
			pFile.m_nType = FT_PASSCODE;
		} else if (nRoll === 97) {
			// 1% chance of a program/source

			// Roll again to determine type (70% program, 20% source, 10% chip source)
			nRoll = Random(100);
			if (nRoll < 70)
				pFile.m_nType = FT_PROGRAM;
			else if (nRoll < 90)
				pFile.m_nType = FT_P_SOURCE;
			else
				pFile.m_nType = FT_C_SOURCE;
		}

		// Generate the file contents based on type
		pFile.Generate(this);

		// Add the file to the list
		this.m_olFileList.push(pFile);
	}
}



Node.prototype.GenerateICE = function() {
	let nRoll;

	// Get the difficulty level of this mission. This will be the base ICE difficulty
	let nDifficulty = g_pChar.m_pSystem.m_nRating;

	//--------------------------
	// Generate the GATEWAY ice
	//--------------------------
	// Gateway is generated at any entry which crosses a cluster boundary
	for (let nDir = 0; nDir<4; nDir++) {
		if ( this.m_pAdjNode[nDir] === null || this.m_pAdjNode[nDir].m_nCluster === this.m_nCluster ) continue;

			// Generate a gateway ice here
			let pIce = new Ice;
			pIce.m_nType = ICE_GATEWAY;
			pIce.m_nSubType = nDir;
			pIce.m_nRating = nDifficulty;
			pIce.m_pHomeNode = this;
			pIce.m_nState = STATE_GUARDING;

			// Adjust the rating if this is a CPU/SPU, or if we are connecting to one.
			nRoll = Random(20);
			if ( this.m_nType === NT_CPU || this.m_nType === NT_SPU || this.m_pAdjNode[nDir].m_nType === NT_CPU || this.m_pAdjNode[nDir].m_nType === NT_SPU )
				pIce.m_nRating++;

			// Now, do a random adjustment to rating. (10% +1, 5% +2) FIXME: either comment or code is wrong
			nRoll = Random(20);
			if (nRoll===0) {
				// Must be at least Lv 2
				if (nDifficulty >= 2)
					pIce.m_nRating++;
			} else if (nRoll<=2) {
				// Must be at least Lv 4
				if (nDifficulty >= 4)
					pIce.m_nRating += 2;
			}

			// Load the ICE data
			pIce.LoadInitData();

			// Put the ICE in the node. Since gateway is the first ICE to go into a node,
			// we can automatically assign a location at the doorway.
			pIce.m_pCurrentNode = this;
			if (nDir===DIR_NORTH)
				pIce.m_ptNodeLoc = new Point(4,0);
			else if (nDir===DIR_EAST)
				pIce.m_ptNodeLoc = new Point(8,4);
			else if (nDir===DIR_WEST)
				pIce.m_ptNodeLoc = new Point(0,4);
			else //if (nDir===DIR_SOUTH)
				pIce.m_ptNodeLoc = new Point(4,8);

			// Add the ICE to the system's ICE list
			g_pChar.m_pSystem.m_olIceList.push(pIce);
	}

	//-------------------------------------
	// Generate the other ICE
	//-------------------------------------
	// No ICE in a junction
	if (this.m_nType === NT_JUNC)
		return;

	// Get the number of ICE.
	// This is a roll 0..4, +1 for SPU/Portal IN, +2 for CPU/COP/Security
	// 0 = no ice. 1 = 1 ice. 2,3 = 2 ice. 4,5 = 3 ice
	nRoll = Random(4);
	if ( this.m_nType === NT_SPU || this.m_nType === NT_PORTAL_IN || this.m_nType === NT_PORTAL_OUT )
		nRoll++;
	else if ( this.m_nType === NT_CPU || this.m_nType === NT_COP || (this.m_nType === NT_COP && this.m_nSubType === NST_COP_SECURITY) ) // FIXME: redundant? or not intended for a standard COP?
		nRoll += 2;

	let nNumIce;
	if (nRoll===0)
		nNumIce = 0;
	else if (nRoll === 1)
		nNumIce = 1;
	else if (nRoll <= 3)
		nNumIce = 2;
	else
		nNumIce = 3;

	if (nNumIce > 2 && Config.difficulty < 1) nNumIce = 2;

	// If this is the system portal, max at 1 ice to make it a little easier to get in
	if ( this.m_pParentArea.m_pSystem.m_pSystemPortalOut === this && nNumIce > 1 )
		nNumIce = 1;

	// Create the ICEs
	while (nNumIce--) {
		let pIce = new Ice;
		let nDir = DIR_NONE;

		// Set the type.
		if (nNumIce===0) {
			// First ice is always white. For COP, it is probe. For all others, it is guardian.
			if ( this.m_nType === NT_COP && this.m_nSubType !== NST_COP_SECURITY ) {
				pIce.m_nType = ICE_PROBE;
				pIce.m_nState = STATE_SEARCHING;
			} else if ( this === this.m_pParentArea.m_pAreaPortalOut ) {
				// This is the system portal. Guardian is useless.
				// Make this a response attack ice.
				pIce.m_nType = ICE_ATTACK;
				pIce.m_nState = STATE_INACTIVE;
				pIce.m_bResponse = true;
			} else {
				// For all other nodes, first ICE is guardian
				pIce.m_nType = ICE_GUARDIAN;
				pIce.m_nState = STATE_GUARDING;
				nDir = DIR_CENTER;
			}
		} else if (nNumIce===1) {
			// Second ice is random black ice. (75% attack, 25% trace)
			// No Trace ice on L1 and L2
			if ( nDifficulty > 2 && Random(4) === 0 )
				pIce.m_nType = ICE_TRACE;
			else
				pIce.m_nType = ICE_ATTACK;

			// Ice is response if it is in a coprocessor
			if ( this.m_nType === NT_COP && this.m_nSubType !== NST_COP_SECURITY )
				pIce.m_bResponse = true;
			pIce.m_nState = STATE_INACTIVE;
		} else {
			// Third ice is always attack
			pIce.m_nType = ICE_ATTACK;

			// Ice is response if it is in a coprocessor
			if ( this.m_nType === NT_COP && this.m_nSubType !== NST_COP_SECURITY )
				pIce.m_bResponse = true;
			pIce.m_nState = STATE_INACTIVE;
		}

		// If this is attack/trace, we have to determine a sub-type
		if (pIce.m_nType === ICE_ATTACK) {
			// Determine if normal/lethal
			if ( Random(100)+1 < (nDifficulty-10)*5 )
				pIce.m_nSubType = AST_KILLER;
			else
				pIce.m_nSubType = AST_NORMAL;

			// Determine if hardened/phasing/c+b (3% per level over 5)
			if ( Random(100)+1 < (nDifficulty-5)*3 ) {
				// Ice has options. Choose which
				switch (Random(5)) {
					case 0:
					case 1:
						// Hardened
						pIce.m_nSubType |= AST_HARDENED;
						break;
					case 2:
					case 3:
						// Phasing
						pIce.m_nSubType |= AST_PHASING;
						break;
					case 4:
						// Crash & Burn
						pIce.m_nSubType |= AST_CRASH;
						break;
				}
			}
		} else if (pIce.m_nType === ICE_TRACE) {
			// Distribution is as follows:
			// Normal: 100% up to L5, -5% each, 25% @20
			// Fry: 0% up to L10, 2% each, 20% @ 20
			// Dump: Non linear. Whatever is left.
			let nChanceNormal = 5 * (25 - nDifficulty);
			let nChanceFry = 2 * (nDifficulty-10);

			nRoll = Random(100);
			if (nRoll<nChanceNormal) {
				// Most common at lower levels
				pIce.m_nSubType = TST_NORMAL;
			} else if (nRoll < (nChanceFry+nChanceNormal)) {
				// Only at upper levels
				pIce.m_nSubType = TST_FRY;
			} else {
				// Most common at mid to upper levels
				pIce.m_nSubType = TST_DUMP;
			}
		}

		pIce.m_pHomeNode = this;
		pIce.m_nRating = nDifficulty;

		// Adjust the rating if this is a CPU/SPU/Security
		if ( this.m_nType === NT_CPU || this.m_nType === NT_SPU || (this.m_nType === NT_COP && this.m_nSubType === NST_COP_SECURITY) )
			pIce.m_nRating++;

		// Now, do a random adjustment to rating. (10% +1, 5% +2)
		nRoll = Random(20);
		if (nRoll===0) {
			// Must be at least Lv 2
			if (nDifficulty >= 2)
				pIce.m_nRating++;
		} else if (nRoll<=2) {
			// Must be at least Lv 4
			if (nDifficulty >= 4)
				pIce.m_nRating += 2;
		}

		// Load the ICE data
		pIce.LoadInitData();

		// Place the ice in the node
		pIce.m_ptNodeLoc = this.ChooseLocation(nDir);
		if (pIce.m_ptNodeLoc === null) {
			// This should never happen
			alert("Error placing initial ice!");
			console.error("Error placing initial ice!");
			break;
		}

		pIce.m_pCurrentNode = this;

		// Add the ICE to the system's ICE list
		g_pChar.m_pSystem.m_olIceList.push(pIce);
	}

	//------------------
	// Create Tapeworms
	//------------------
	if (this.m_nType === NT_DS) {
		// Go through the list of files
		this.m_olFileList.forEach(pFile => {
			// Get the chance of a tapeworm based on contents
			let iTarget;
			switch (pFile.m_nType) {
				case FT_USELESS:
					// 5%
					iTarget = 1;
					break;
				case FT_VALUABLE:
					// 20%
					iTarget = 4;
					break;
				case FT_QUEST:
					// 30%
					iTarget = 6;
					break;
				case FT_CLUE:
					// 75%
					iTarget = 15;
					break;
				case FT_PASSCODE:
					// 100%
					iTarget = 20;
					break;
			}

			if (Random(20) < iTarget) {
				// Create an ICE to guard this file
				pFile.m_pTapeworm = new Ice;
				pFile.m_pTapeworm.m_nType = ICE_TAPEWORM;

				if ( Random(100)+1 < (nDifficulty-10)*5 )
					pFile.m_pTapeworm.m_nSubType = TWST_DATABOMB;
				else
					pFile.m_pTapeworm.m_nSubType = TWST_NORMAL;

				pFile.m_pTapeworm.m_nRating = nDifficulty;
				pFile.m_pTapeworm.m_pHomeNode = this;
				pFile.m_pTapeworm.m_nState = STATE_GUARDING;
				pFile.m_pTapeworm.m_pFile = pFile;

				// Now, do a random adjustment to rating. (10% +1, 5% +2)
				nRoll = Random(20);
				if (nRoll===0) {
					// Must be at least Lv 2
					if (nDifficulty >= 2)
						pFile.m_pTapeworm.m_nRating++;
				} else if (nRoll<=2) {
					// Must be at least Lv 4
					if (nDifficulty >= 4)
						pFile.m_pTapeworm.m_nRating += 2;
				}

				// Load the ICE data
				pFile.m_pTapeworm.LoadInitData();

				// Place the ice in the node
				pFile.m_pTapeworm.m_ptNodeLoc = this.ChooseLocation(DIR_NONE);
				if (pFile.m_pTapeworm.m_ptNodeLoc === null) {
					// This should never happen
					alert("Error placing initial ice!");
					console.error("Error placing initial ice!");
					return;
				}
				pFile.m_pTapeworm.m_pCurrentNode = this;

				// Add the ICE to the system's ICE list
				g_pChar.m_pSystem.m_olIceList.push(pFile.m_pTapeworm);
			}
		});
	}
}


Object.defineProperty(Node.prototype, "m_szName", {
	get: function() {
		const g_szNodeAbbrev = ["CPU","SPU","COP","DS","IO","JN","PI","PO"];

		let prefix = g_szNodeAbbrev[this.m_nType];
		let area = this.m_pParentArea.m_nAreaNumber.toString(16).toUpperCase();
		let cluster = this.m_nCluster.toString(16).toUpperCase();
		let num = this.m_nNodeNumber.toString(16).toUpperCase();
		while (num.length < 3) num = "0" + num;

		return prefix+"-"+area+cluster+num;
	}
});




Node.prototype.Save = function(Buffer) {
	// Skip parent area
	// Write basic info
	Buffer.addString(this.m_szName); // this.m_szName no longer necessary
	Buffer.addInteger(this.m_nType);
	Buffer.addInteger(this.m_nSubType);
	Buffer.addInteger(this.m_nCluster);
	Buffer.addInteger(this.m_nNodeNumber);

	// Write adjacent node list
	for (let i = 0; i < 4; i++) {
		Buffer.addElement(this.m_pAdjNode[i], this.m_pParentArea.m_olNodeList);
	}

	// Write location
	Buffer.addPoint(this.m_ptLocation);

	// Write file list
	Buffer.addWord(this.m_olFileList.length);
	this.m_olFileList.forEach(pFile => {
		// Write the item
		pFile.Save(Buffer);
	});

	// Write misc
	Buffer.addInteger(this.m_nActiveSmokeLevel);
	Buffer.addInteger(this.m_nActiveSilenceLevel);
	Buffer.addInteger(this.m_bActivated);
	Buffer.addInteger(this.m_bMapped);

	// Special image works different, compared to the original
	if (this.m_nSpecialImage < 0)
		Buffer.addInteger(this.m_nSpecialImage);
	else if (this.m_nType === NT_DS)
		Buffer.addInteger(0);
	else if (this.m_nType === NT_IO)
		Buffer.addInteger(this.m_nSpecialImage+1);
	else if (this.m_nType === NT_COP)
		Buffer.addInteger(5);
}
Node.prototype.Load = function(Buffer, version) {
	// Skip parent area
	// Read basic info
	Buffer.getString(); // this.m_szName no longer necessary
	this.m_nType = Buffer.getInteger();
	this.m_nSubType = Buffer.getInteger();
	this.m_nCluster = Buffer.getInteger();
	this.m_nNodeNumber = Buffer.getInteger();

	// Read adjacent node list
	for (let i = 0; i < 4; i++)
		this.m_pAdjNode[i] = Buffer.getElement(this.m_pParentArea.m_olNodeList);

	// Read location
	this.m_ptLocation = Buffer.getPoint();

	// Read file list
	for (let i = Buffer.getWord(); i > 0; i--) {
		let pFile = new DSfile;
		pFile.Load(Buffer, version);
		this.m_olFileList.push(pFile);
	}

	// Read misc
	this.m_nActiveSmokeLevel = Buffer.getInteger();
	this.m_nActiveSilenceLevel = Buffer.getInteger();
	this.m_bActivated = !!Buffer.getInteger();
	this.m_bMapped = !!Buffer.getInteger();
	if (version >= 4) {
		this.m_nSpecialImage = Buffer.getInteger();

		// Special image works different, compared to the original
		if (this.m_nSpecialImage >= 0) {
			if (this.m_nType === NT_IO)
				this.m_nSpecialImage -= 1;
			else
				this.m_nSpecialImage = 0;
		}
	}
}

// ice.js



// Image list indices
const IG_GEN_GATEWAY	= 0;
const IG_GEN_PROBE		= 1;
const IG_GEN_GUARDIAN	= 2;
const IG_GEN_TAPEWORM	= 3;
const IG_GEN_ATTACK		= 4;
const IG_GEN_TRACE		= 5;
const IG_GHOST1			= 6;
const IG_GHOST2			= 7;
const IG_GHOST3			= 8;
const IG_GHOST4			= 9;
const IG_GENIE			= 10;
const IG_WHIRLWIND		= 11;
const IG_BIG_GUY		= 12;
const IG_NINJA			= 13;
const IG_MONK			= 14;
const IG_SPHINX			= 15;
const IG_GOLEM			= 16;
const IG_EUNOCH			= 17;
const IG_TOUGHGUY1		= 18;
const IG_GARGOYLE		= 19;
const IG_DOG1			= 20;
const IG_DOG2			= 21;
const IG_EYE			= 22;
const IG_DRAGON			= 23;
const IG_KNIGHT1		= 24;
const IG_KNIGHT2		= 25;
const IG_TURTLE			= 26;
const IG_SPIDER1		= 27;
const IG_SPIDER2		= 28;
const IG_SCORPION		= 29;
const IG_GAZER1			= 30;
const IG_GAZER2			= 31;
const IG_GAZER3			= 32;
const IG_GAZER4			= 33;
const IG_SCOUT			= 34;
const IG_VINES			= 35;
const IG_SNAKE1			= 36;
const IG_SNAKE2			= 37;
const IG_FIREWALL		= 38;
const IG_GATE1			= 39;
const IG_FENCE			= 40;
const IG_GATE2			= 41;
const IG_BARRIER		= 42;
const IG_TOUGHGUY2		= 43;
const IG_DOORMAN		= 44;
const IG_POLICE1		= 45;
const IG_POLICE2		= 46;
const IG_RANGER			= 47;
const IG_FAIRY			= 48;
const IG_SHERLOCK		= 49;
const IG_GUARD			= 50;
const IG_PRIVATE_I		= 51;
const IG_CENTURION		= 52;
const IG_HIGHLANDER		= 53;
const IG_MARINE			= 54;
const IG_COWBOY			= 55;
const IG_SHERIFF		= 56;
const IG_CAVALRY		= 57;
const IG_BEES			= 58;
const IG_TANK			= 59;
const IG_MANTIS			= 60;
const IG_SAMURAI		= 61;
const IG_ROBOT			= 62;
const IG_VADER			= 63;
const IG_MOUTH			= 64;
const IG_GHOST5			= 65;
const IG_ATTACK_H		= 66;
const IG_ATTACK_P		= 67;
const IG_ATTACK_C		= 68;
const IG_DETECTIVE		= 69;
const IG_WORM			= 70;
const IG_ELECTRIC		= 71;
const IG_DYNAMITE		= 72;
const IG_BOMB			= 73;
const IG_TRAP			= 74;
const IG_TRAP_FILE		= 75;
const IG_DYNAMITE_FILE	= 76;
const IG_BOMB_FILE		= 77;
const IG_SNAKE3			= 78;


//--------------
// ICE database
//--------------
const g_idGateway = [
	{ szName:"Gateway",			nGraphic:IG_GEN_GATEWAY },
	{ szName:"Fence",			nGraphic:IG_FENCE },
	{ szName:"Barrier",			nGraphic:IG_BARRIER },
	{ szName:"Doorway",			nGraphic:IG_GATE1 },
	{ szName:"Blockade",		nGraphic:IG_BARRIER },
	{ szName:"Checkpoint",		nGraphic:IG_GATE2 },
	{ szName:"Bouncer",			nGraphic:IG_TOUGHGUY2 },
	{ szName:"Doorman",			nGraphic:IG_DOORMAN },
	{ szName:"Gateway Mk2",		nGraphic:IG_GEN_GATEWAY },
	{ szName:"Reinforced Fence",nGraphic:IG_FENCE },
	{ szName:"Roadblock",		nGraphic:IG_BARRIER },
	{ szName:"Gate",			nGraphic:IG_GATE1 },
	{ szName:"Barrier II",		nGraphic:IG_BARRIER },
	{ szName:"Checkpoint",		nGraphic:IG_GATE2 },
	{ szName:"BouncerEx",		nGraphic:IG_TOUGHGUY2 },
	{ szName:"Doorman 2.0",		nGraphic:IG_DOORMAN },
	{ szName:"Gateway Mk 3",	nGraphic:IG_GEN_GATEWAY },
	{ szName:"Reinforced Door",	nGraphic:IG_GATE1 },
	{ szName:"Electric Fence",	nGraphic:IG_FENCE },
	{ szName:"Big Bouncer",		nGraphic:IG_TOUGHGUY1 },
];

const g_idProbe = [
	{ szName:"Probe",			nGraphic:IG_GEN_PROBE },
	{ szName:"Gazer",			nGraphic:IG_GAZER1 },
	{ szName:"Bobby",			nGraphic:IG_POLICE2 },
	{ szName:"Snooper",			nGraphic:IG_GEN_PROBE },
	{ szName:"Inquisitor",		nGraphic:IG_GEN_PROBE },
	{ szName:"Gazer II",		nGraphic:IG_GAZER2 },
	{ szName:"Cop",				nGraphic:IG_POLICE1 },
	{ szName:"Probe Mk2",		nGraphic:IG_GEN_PROBE },
	{ szName:"Mystic Eye",		nGraphic:IG_EYE },
	{ szName:"Scout",			nGraphic:IG_SCOUT },
	{ szName:"Bobby 2.0",		nGraphic:IG_POLICE2 },
	{ szName:"Scout II",		nGraphic:IG_SCOUT },
	{ szName:"Police",			nGraphic:IG_POLICE1 },
	{ szName:"Magic Eye",		nGraphic:IG_EYE },
	{ szName:"Gazer III",		nGraphic:IG_GAZER3 },
	{ szName:"Probe Mk3",		nGraphic:IG_GEN_PROBE },
	{ szName:"Scout III",		nGraphic:IG_SCOUT },
	{ szName:"SuperFuzz",		nGraphic:IG_POLICE1 },
	{ szName:"Wizard Eye",		nGraphic:IG_EYE },
	{ szName:"Beholder",		nGraphic:IG_GAZER4 },
];

const g_idGuardian = [
	{ szName:"Guardian",		nGraphic:IG_GEN_GUARDIAN },
	{ szName:"Protector",		nGraphic:IG_TOUGHGUY1 },
	{ szName:"Sentry",			nGraphic:IG_GOLEM },
	{ szName:"Gargoyle",		nGraphic:IG_GARGOYLE },
	{ szName:"Guardian Mk2",	nGraphic:IG_GEN_GUARDIAN },
	{ szName:"Sphinx",			nGraphic:IG_SPHINX },
	{ szName:"Golem",			nGraphic:IG_GOLEM },
	{ szName:"Eunoch",			nGraphic:IG_EUNOCH },
	{ szName:"Protector 2",		nGraphic:IG_TOUGHGUY1 },
	{ szName:"Guardian Mk3",	nGraphic:IG_GEN_GUARDIAN },
	{ szName:"GynoSphinx",		nGraphic:IG_SPHINX },
	{ szName:"Gargoyle 2.0",	nGraphic:IG_GARGOYLE },
	{ szName:"Golem II",		nGraphic:IG_GOLEM },
	{ szName:"Protector 3",		nGraphic:IG_TOUGHGUY1 },
	{ szName:"Guardian Mk4",	nGraphic:IG_GEN_GUARDIAN },
	{ szName:"Protector 3",		nGraphic:IG_TOUGHGUY1 },
	{ szName:"EunochEx",		nGraphic:IG_EUNOCH },
	{ szName:"Guardian Mk5",	nGraphic:IG_GEN_GUARDIAN },
	{ szName:"Golem III",		nGraphic:IG_GOLEM },
	{ szName:"AndroSphinx",		nGraphic:IG_SPHINX },
];

const g_idTapeworm = [
	{ szName:"Tapeworm",		nGraphic:IG_GEN_TAPEWORM },
	{ szName:"Boa",				nGraphic:IG_SNAKE2 },
	{ szName:"Kudzu",			nGraphic:IG_VINES },
	{ szName:"Anaconda",		nGraphic:IG_SNAKE1 },
	{ szName:"Boa 2.0",			nGraphic:IG_SNAKE2 },
	{ szName:"Tapeworm Mk2",	nGraphic:IG_GEN_TAPEWORM },
	{ szName:"Kudzu II",		nGraphic:IG_VINES },
	{ szName:"Anaconda 2.1",	nGraphic:IG_SNAKE1 },
	{ szName:"Boa 3.0",			nGraphic:IG_SNAKE2 },
	{ szName:"Tapeworm Mk3",	nGraphic:IG_GEN_TAPEWORM },
	{ szName:"Boa 3.1a",		nGraphic:IG_SNAKE2 },
	{ szName:"Kudzu III",		nGraphic:IG_VINES },
	{ szName:"Anaconda 3.0",	nGraphic:IG_SNAKE1 },
	{ szName:"Boa 3.1",			nGraphic:IG_SNAKE2 },
	{ szName:"Tapeworm Mk4",	nGraphic:IG_GEN_TAPEWORM },
	{ szName:"StrangleVine",	nGraphic:IG_VINES },
	{ szName:"Anaconda 4.2",	nGraphic:IG_SNAKE1 },
	{ szName:"Boa 4.0",			nGraphic:IG_SNAKE2 },
	{ szName:"Tapeworm Mk5",	nGraphic:IG_GEN_TAPEWORM },
	{ szName:"StrangleVine II",	nGraphic:IG_VINES },
];

const g_idDataBomb = [
	{ szName:"Data Bomb",		nGraphic:IG_BOMB_FILE },
	{ szName:"Dynamyte 1.0",	nGraphic:IG_DYNAMITE_FILE },
	{ szName:"Trap",			nGraphic:IG_TRAP_FILE },
	{ szName:"Data Bomb Mk2",	nGraphic:IG_BOMB_FILE },
	{ szName:"Dynamyte 2.0",	nGraphic:IG_DYNAMITE_FILE },
	{ szName:"Trap II",			nGraphic:IG_TRAP_FILE },
	{ szName:"Dynamyte 2.1",	nGraphic:IG_DYNAMITE_FILE },
	{ szName:"Data Bomb Mk3",	nGraphic:IG_BOMB_FILE },
	{ szName:"Trap III",		nGraphic:IG_TRAP_FILE },
	{ szName:"Da Bomb",			nGraphic:IG_BOMB_FILE },
];

const g_idAttack = [
	{ szName:"Attack",			nGraphic:IG_GEN_ATTACK },
	{ szName:"Brute",			nGraphic:IG_BIG_GUY },
	{ szName:"Grunt",			nGraphic:IG_MARINE },
	{ szName:"Centurion",		nGraphic:IG_CENTURION },
	{ szName:"Attack Mk2",		nGraphic:IG_GEN_ATTACK },
	{ szName:"Enforcer",		nGraphic:IG_BIG_GUY },
	{ szName:"Wolf",			nGraphic:IG_DOG2 },
	{ szName:"Soldier",			nGraphic:IG_MARINE },
	{ szName:"Attack Mk3",		nGraphic:IG_GEN_ATTACK },
	{ szName:"Centurion II",	nGraphic:IG_CENTURION },
	{ szName:"Dire Wolf",		nGraphic:IG_DOG2 },
	{ szName:"Attack Mk4",		nGraphic:IG_GEN_ATTACK },
	{ szName:"Marine",			nGraphic:IG_MARINE },
	{ szName:"Worg",			nGraphic:IG_DOG2 },
	{ szName:"Centurion III",	nGraphic:IG_CENTURION },
	{ szName:"Barbarian",		nGraphic:IG_BIG_GUY },
	{ szName:"Werewolf",		nGraphic:IG_DOG2 },
	{ szName:"Attack Mk5",		nGraphic:IG_GEN_ATTACK },
	{ szName:"Centurion IV",	nGraphic:IG_CENTURION },
	{ szName:"Green Beret",		nGraphic:IG_MARINE },
];

const g_idAttackHardened = [
	{ szName:"Attack-H",		nGraphic:IG_ATTACK_H },
	{ szName:"Knight",			nGraphic:IG_KNIGHT1 },
	{ szName:"Tank",			nGraphic:IG_TANK },
	{ szName:"Turtle",			nGraphic:IG_TURTLE },
	{ szName:"Attack-H Mk2",	nGraphic:IG_ATTACK_H },
	{ szName:"Knight II",		nGraphic:IG_KNIGHT1 },
	{ szName:"Terrapin",		nGraphic:IG_TURTLE },
	{ szName:"Sherman",			nGraphic:IG_TANK },
	{ szName:"Attack-H Mk3",	nGraphic:IG_ATTACK_H },
	{ szName:"Knight III",		nGraphic:IG_KNIGHT1 },
	{ szName:"Tortoise",		nGraphic:IG_TURTLE },
	{ szName:"Attack-H Mk4",	nGraphic:IG_ATTACK_H },
	{ szName:"Dragon Turtle",	nGraphic:IG_TURTLE },
	{ szName:"Knight IV",		nGraphic:IG_KNIGHT1 },
	{ szName:"Bradley",			nGraphic:IG_TANK },
];

const g_idAttackPhasing = [
	{ szName:"Attack-P",		nGraphic:IG_ATTACK_P },
	{ szName:"Bugs",			nGraphic:IG_BEES },
	{ szName:"Spook",			nGraphic:IG_GHOST3 },
	{ szName:"Neophyte",		nGraphic:IG_MONK },
	{ szName:"Attack-P Mk2",	nGraphic:IG_ATTACK_P },
	{ szName:"Bees",			nGraphic:IG_BEES },
	{ szName:"Ghost",			nGraphic:IG_GHOST2 },
	{ szName:"Disciple",		nGraphic:IG_MONK },
	{ szName:"Shade",			nGraphic:IG_GHOST4 },
	{ szName:"Wasps",			nGraphic:IG_BEES },
	{ szName:"Attack-P Mk3",	nGraphic:IG_ATTACK_P },
	{ szName:"Monk",			nGraphic:IG_MONK },
	{ szName:"Phantom",			nGraphic:IG_GHOST4 },
	{ szName:"Hornets",			nGraphic:IG_BEES },
	{ szName:"Quai Chang Kain",	nGraphic:IG_MONK },
];

const g_idAttackCrash = [
	{ szName:"Attack-C",		nGraphic:IG_ATTACK_C },
	{ szName:"Spider",			nGraphic:IG_SPIDER1 },
	{ szName:"Scorpion",		nGraphic:IG_SCORPION },
	{ szName:"Rattler",			nGraphic:IG_SNAKE2 },
	{ szName:"Attack-C Mk2",	nGraphic:IG_ATTACK_C },
	{ szName:"Copperhead",		nGraphic:IG_SNAKE3 },
	{ szName:"Scorpion 2.0",	nGraphic:IG_SCORPION },
	{ szName:"Attack-C Mk3",	nGraphic:IG_ATTACK_C },
	{ szName:"Spider II",		nGraphic:IG_SPIDER1 },
	{ szName:"Scorpion 2.3",	nGraphic:IG_SCORPION },
	{ szName:"Cottonmouth",		nGraphic:IG_SNAKE3 },
	{ szName:"Spider III",		nGraphic:IG_SPIDER1 },
	{ szName:"Attack-C Mk4",	nGraphic:IG_ATTACK_C },
	{ szName:"Scorpion 3.0",	nGraphic:IG_SCORPION },
	{ szName:"Black Widow",		nGraphic:IG_SPIDER1 },
];

const g_idAttackLethal = [
	{ szName:"Attack-L",		nGraphic:IG_GEN_ATTACK },
	{ szName:"Cowboy",			nGraphic:IG_COWBOY },
	{ szName:"Attack-L Mk2",	nGraphic:IG_GEN_ATTACK },
	{ szName:"Wrangler",		nGraphic:IG_COWBOY },
	{ szName:"Executioner",		nGraphic:IG_BIG_GUY },
	{ szName:"Sheriff",			nGraphic:IG_SHERIFF },
	{ szName:"Attack-L Mk3",	nGraphic:IG_GEN_ATTACK },
	{ szName:"Executioner II",	nGraphic:IG_BIG_GUY },
	{ szName:"Marshal",			nGraphic:IG_SHERIFF },
	{ szName:"Highlander",		nGraphic:IG_HIGHLANDER },
];

const g_idAttackLethalHardened = [
	{ szName:"Attack-LH",		nGraphic:IG_ATTACK_H },
	{ szName:"Killbot",			nGraphic:IG_ROBOT },
	{ szName:"Mantis",			nGraphic:IG_MANTIS },
	{ szName:"Attack-LH Mk2",	nGraphic:IG_ATTACK_H },
	{ szName:"Mantis II",		nGraphic:IG_MANTIS },
	{ szName:"Crusader",		nGraphic:IG_KNIGHT2 },
	{ szName:"Attack-LH Mk3",	nGraphic:IG_ATTACK_H },
	{ szName:"Mantis II",		nGraphic:IG_MANTIS },
	{ szName:"Paladin",			nGraphic:IG_KNIGHT2 },
	{ szName:"Vader",			nGraphic:IG_VADER },
];

const g_idAttackLethalPhasing = [
	{ szName:"Attack-LP",		nGraphic:IG_ATTACK_P },
	{ szName:"Wraith",			nGraphic:IG_GHOST1 },
	{ szName:"Phase Spider",	nGraphic:IG_SPIDER2 },
	{ szName:"Twister",			nGraphic:IG_WHIRLWIND },
	{ szName:"Attack-LP Mk2",	nGraphic:IG_ATTACK_P },
	{ szName:"Killer Bees",		nGraphic:IG_BEES },
	{ szName:"Spectre",			nGraphic:IG_GHOST5 },
	{ szName:"Attack-LP Mk3",	nGraphic:IG_ATTACK_P },
	{ szName:"Cyclone",			nGraphic:IG_WHIRLWIND },
	{ szName:"Ninja",			nGraphic:IG_NINJA },
];

const g_idAttackLethalCrash = [
	{ szName:"Attack-LC",		nGraphic:IG_ATTACK_C },
	{ szName:"Two-Step",		nGraphic:IG_SNAKE3 },
	{ szName:"Wyvern",			nGraphic:IG_DRAGON },
	{ szName:"Genie",			nGraphic:IG_GENIE },
	{ szName:"Attack-LC Mk2",	nGraphic:IG_ATTACK_C },
	{ szName:"Black Widow",		nGraphic:IG_SPIDER2 },
	{ szName:"Efreet",			nGraphic:IG_GENIE },
	{ szName:"Mamba",			nGraphic:IG_SNAKE3 },
	{ szName:"Attack-LC Mk3",	nGraphic:IG_ATTACK_C },
	{ szName:"Dragon",			nGraphic:IG_DRAGON },
];

const g_idTrace = [
	{ szName:"Trace",			nGraphic:IG_GEN_TRACE },
	{ szName:"Hound",			nGraphic:IG_DOG1 },
	{ szName:"Tracker",			nGraphic:IG_SCOUT },
	{ szName:"Private Eye",		nGraphic:IG_PRIVATE_I },
	{ szName:"Trace Mk2",		nGraphic:IG_GEN_TRACE },
	{ szName:"Tracker II",		nGraphic:IG_SCOUT },
	{ szName:"Blue Tick Hound",	nGraphic:IG_DOG1 },
	{ szName:"Private Eye 2.0",	nGraphic:IG_PRIVATE_I },
	{ szName:"Sherlock",		nGraphic:IG_SHERLOCK },
	{ szName:"Trace Mk3",		nGraphic:IG_GEN_TRACE },
	{ szName:"Tracker III",		nGraphic:IG_SCOUT },
	{ szName:"Bloodhound",		nGraphic:IG_DOG1 },
	{ szName:"Sherlock II",		nGraphic:IG_SHERLOCK },
	{ szName:"Private Eye 3.0",	nGraphic:IG_PRIVATE_I },
	{ szName:"Trace Mk4",		nGraphic:IG_GEN_TRACE },
	{ szName:"Mastiff",			nGraphic:IG_DOG2 },
	{ szName:"Tracker IV",		nGraphic:IG_SCOUT },
	{ szName:"Sherlock III",	nGraphic:IG_SHERLOCK },
	{ szName:"Trace Mk5",		nGraphic:IG_GEN_TRACE },
	{ szName:"Hound of the Baskervilles",	nGraphic:IG_DOG2 },
];

const g_idTraceDump = [
	{ szName:"Trace & Dump",	nGraphic:IG_GEN_TRACE },
	{ szName:"Detective",		nGraphic:IG_DETECTIVE },
	{ szName:"Ranger",			nGraphic:IG_RANGER },
	{ szName:"Investigator",	nGraphic:IG_PRIVATE_I },
	{ szName:"Trace & Dump Mk2",nGraphic:IG_GEN_TRACE },
	{ szName:"Detective 2.2",	nGraphic:IG_DETECTIVE },
	{ szName:"Ranger II",		nGraphic:IG_RANGER },
	{ szName:"Investigator",	nGraphic:IG_PRIVATE_I },
	{ szName:"Trace & Dump Mk3",nGraphic:IG_GEN_TRACE },
	{ szName:"Detective 3.1",	nGraphic:IG_DETECTIVE },
	{ szName:"Ranger III",		nGraphic:IG_RANGER },
	{ szName:"Investigator",	nGraphic:IG_PRIVATE_I },
	{ szName:"Trace & Dump Mk4",nGraphic:IG_GEN_TRACE },
	{ szName:"Detective 4.0",	nGraphic:IG_DETECTIVE },
	{ szName:"Ranger IV",		nGraphic:IG_RANGER },
];

const g_idTraceFry = [
	{ szName:"Trace & Fry",		nGraphic:IG_GEN_TRACE },
	{ szName:"Mindworm",		nGraphic:IG_WORM },
	{ szName:"Zapp",			nGraphic:IG_ELECTRIC },
	{ szName:"Trace & Fry Mk2",	nGraphic:IG_GEN_TRACE },
	{ szName:"Mindworm 2.0",	nGraphic:IG_WORM },
	{ szName:"SuperZapp",		nGraphic:IG_ELECTRIC },
	{ szName:"Mindworm 3.1",	nGraphic:IG_WORM },
	{ szName:"Trace & Fry Mk3",	nGraphic:IG_GEN_TRACE },
	{ szName:"Mindworm 4.0",	nGraphic:IG_WORM },
	{ szName:"MegaZapp",		nGraphic:IG_ELECTRIC },
];

// Type strings
const g_szType = [
	"Gateway",
	"Probe",
	"Guardian",
	"Tapeworm",
	"Attack",
	"Trace",
];

const g_szAttackType = [
	"Attack",
	"Attack (Hardened)",
	"Attack (Phasing)",
	"Attack (Crash)",
];

const g_szKillerAttackType = [
	"Killer",
	"Killer (Hardened)",
	"Killer (Phasing)",
	"Killer (Crash)",
];

const g_szTraceType = [
	"Trace",
	"Trace & Dump",
	"Trace & Fry",
];

const g_szTapewormType = [
	"Tapeworm",
	"DataBomb",
];


function Ice() {
	// Fixed data
	this.m_szName = "";
	this.m_nType = 0;
	this.m_nSubType = 0;			// For gateway, gives direction
	this.m_nRating = 0;
	this.m_nImage = 0;
	this.m_bResponse = false;		// Response IC flag for black ice
	this.m_pHomeNode = null;		// The home node for this ICE
	this.m_pFile = null;			// File for tapeworms

	// Health status
	this.m_nHealth = MAX_HEALTH;
	this.m_nSlowLevel = 0;			// Affected by slow program - level is # turns slowed
	this.m_bSkippedLastTurn = false;// Did we skip the last turn because of the slow?
	this.m_nConfusionLevel = 0;		// Affected by confusion program - level is # turns confused
	this.m_nWeakenLevel = 0;		// Affected by weaken program - level is # turns weakened
	this.m_nVirusLevel = 0;			// Affected by virus program - level is number of turns to take damage
	this.m_nAnalyzed = 0;			// Has this ice been analyzed?

	// Location
	this.m_pCurrentNode = null;
	this.m_ptNodeLoc = new Point(0,0);

	// Behavior flags
	this.m_nState = 0;				// Current state
	this.m_bBypassed = false;		// Was this ice bypassed?
	this.m_bWasAccessed = false;	// Was this ice accessed by the player
	this.m_pTargetNode = null;		// Node we are moving to
	this.m_nLastDir = DIR_NONE;		// Direction we moved last time
}


Ice.prototype.GetTypeString = function() {
	if (this.m_nAnalyzed) {
		if (this.m_nType === ICE_ATTACK) {
			if (this.m_nSubType & AST_MASK_KILLER)
				return g_szKillerAttackType[this.m_nSubType - AST_MASK_KILLER];
			else
				return g_szAttackType[this.m_nSubType];
		} else if (this.m_nType === ICE_TRACE) {
			return g_szTraceType[this.m_nSubType];
		} else if (this.m_nType === ICE_TAPEWORM) {
			return g_szTapewormType[this.m_nSubType];
		}
	}

	// Return only basic information
	return g_szType[this.m_nType];
}

Ice.prototype.GetNotes = function() {
	let szStr = "";

	switch (this.m_nType) {
		case ICE_GATEWAY:
			szStr = "Bars passageway to another node.";
			break;
		case ICE_PROBE:
			szStr = "Searches for intruders in the system.";
			break;
		case ICE_GUARDIAN:
			szStr = "Guards access to the node.";
			break;
		case ICE_TAPEWORM:
			szStr = "Guards a file. Will self-destruct on illegal access, taking the file with it.";
			if (this.m_nAnalyzed) {
				if (this.m_nSubType === TWST_DATABOMB)
					szStr += " Will attack on self destruct.";
			}
			break;
		case ICE_ATTACK:
			if (!this.m_nAnalyzed)
				szStr = "Attacks intruders.";
			else {
				if (this.m_nSubType & AST_MASK_KILLER)
					szStr = "Attacks intruders lethally.";
				else
					szStr = "Attacks intruders normally.";

				if (this.m_nSubType & AST_MASK_HARDENED)
					szStr += " Resistant to non-piercing attacks.";
				else if (this.m_nSubType & AST_MASK_PHASING)
					szStr += " Resistant to non-area attacks.";
				else if (this.m_nSubType & AST_MASK_CRASH)
					szStr += " Can crash programs on successful hits.";
			}
			break;
		case ICE_TRACE:
			szStr = "Attempts to trace an intruder's signal in the system.";
			if (this.m_nAnalyzed) {
				if (this.m_nSubType === TST_DUMP)
					szStr += " Can attempt an extended trace in order to dump the decker.";
				else if (this.m_nSubType === TST_FRY)
					szStr += " Can attempt an extended trace in order to dump the decker and attempt to fry a chip.";
			}
			break;
	}

	return szStr;
}

Ice.prototype.LoadInitData = function() {
	// Get the index of the name/graphic to use
	let nInitDataIndex;
	if (this.m_nRating >=20)
		nInitDataIndex = 19;
	else
		nInitDataIndex = (this.m_nRating - 1);

	// Get the appropriate database entry
	let pIceData = null;
	switch (this.m_nType) {
		case ICE_GATEWAY:
			pIceData = g_idGateway[nInitDataIndex];
			break;
		case ICE_PROBE:
			pIceData = g_idProbe[nInitDataIndex];
			break;
		case ICE_GUARDIAN:
			pIceData = g_idGuardian[nInitDataIndex];
			break;
		case ICE_TAPEWORM:
			switch (this.m_nSubType) {
				case TWST_NORMAL:
					pIceData = g_idTapeworm[nInitDataIndex];
					break;
				case TWST_DATABOMB:
					pIceData = g_idDataBomb[nInitDataIndex-10];
					break;
			}
			break;
		case ICE_ATTACK:
			switch (this.m_nSubType) {
				case AST_NORMAL:
					pIceData = g_idAttack[nInitDataIndex];
					break;
				case AST_HARDENED:
					pIceData = g_idAttackHardened[nInitDataIndex-5];
					break;
				case AST_PHASING:
					pIceData = g_idAttackPhasing[nInitDataIndex-5];
					break;
				case AST_CRASH:
					pIceData = g_idAttackCrash[nInitDataIndex-5];
					break;
				case AST_KILLER:
					pIceData = g_idAttackLethal[nInitDataIndex-10];
					break;
				case AST_KILLER_H:
					pIceData = g_idAttackLethalHardened[nInitDataIndex-10];
					break;
				case AST_KILLER_P:
					pIceData = g_idAttackLethalPhasing[nInitDataIndex-10];
					break;
				case AST_KILLER_C:
					pIceData = g_idAttackLethalCrash[nInitDataIndex-10];
					break;
			}
			break;
		case ICE_TRACE:
			switch (this.m_nSubType) {
				case TST_NORMAL:
					pIceData = g_idTrace[nInitDataIndex];
					break;
				case TST_DUMP:
					pIceData = g_idTraceDump[nInitDataIndex-5];
					break;
				case TST_FRY:
					pIceData = g_idTraceFry[nInitDataIndex-10];
					break;
			}
			break;
	}

	// Load the necessary items
	let num = Random(0x10000).toString(16).toUpperCase();
	while (num.length < 4) num = "0" + num;

	this.m_szName = pIceData.szName+" "+num;
	this.m_nImage = pIceData.nGraphic;
}

Ice.prototype.GetEffectiveRating = function(nType, bIncludeAnalyze=true) {
	// Start with base rating
	let nRating = this.m_nRating;

	// Modify by condition
	nRating += GetConditionModifier(this.m_nHealth);

	// Modify by weaken level
	if (this.m_nWeakenLevel > 0)
		nRating -= 4;

	// If scanned, reduce rating
	if (this.bIncludeAnalyze)
		nRating -= this.m_nAnalyzed;

	// Modify according to rating type
	if (nType === RATING_COMBAT) {
		// White ice has a penalty to combat
		if (this.m_nType <= MAX_WHITE)
			nRating -= 2;
	} else if (nType === RATING_SENSORS) {
		// White ice gets bonus to sensors if alarm set
		if (this.m_nType <= MAX_WHITE) {
			if (g_pChar.m_pSystem.m_nAlert !== ALERT_GREEN)
				nRating += 2;
		}
	}

	return nRating;
}

Ice.prototype.HasQueried = function() {
	if ( this.m_nState === STATE_QUERIED1 || this.m_nState === STATE_QUERIED2 || this.m_nState === STATE_QUERIED3 )
		return true;
	else
		return false;
}


Ice.prototype.NoticedPlayer = function() {
	// See if a hide program is active
	if (g_pChar.m_pActiveHide !== null) {
		if (DoRunProgramVsIce(g_pChar.m_pActiveHide, this)) {
			// Not noticed
			MV.l_MessageView.AddMessage(this.m_szName+" fails to notice you.", BLACK);
			return false;
		}
	}

	return true;
}

Ice.prototype.DoWander = function() {
	let nDirOpen = [];

	// Get the directions available
	for (let nDir = 0; nDir < 4; nDir++) {
		// Skip last direction
		if (this.m_nLastDir === OppDir(nDir)) continue;

		// If open, go
		if (this.m_pCurrentNode.m_pAdjNode[nDir] !== null)
			nDirOpen.push(nDir);
	}

	// If nothing open, go back where we came from
	if ( !nDirOpen.length ) {
		// Last direction is only direction
		this.DoMove(OppDir(this.m_nLastDir));
	} else {
		// Choose a random direction from the ones available
		let nDir = nDirOpen[Random(nDirOpen.length)];

		// Move to this node
		this.DoMove(nDir);
	}
}

Ice.prototype.DoQuery = function() {
	let p;

	// If we have been bypassed, ignore
	if (this.m_bBypassed) return false;

	// If the player has already deceived in this node, ignore
	if (this.m_nRating <= g_pChar.m_nHighestDeceivedIce) {
		this.m_bBypassed = true;
		return false;
	}

	// Look for a higher-rated ice who has queried
	for (p = 0; ; p++) {
		let pIce = g_pChar.m_pSystem.m_olIceList[p];

		// If this is us, we will do it (because ice are sorted by rating)
		if (pIce === this) break;

		if (pIce.HasQueried()) {
			// Wait for the other one to get an answer
			// Keep the same state
			return true;
		}
	}

	// If the decker has a decoy active, set an alert
	if (g_pChar.m_nDecoyCount > 0) {
		// Try to signal an alarm, because we are hostile
		DoSetAlert(this, ALERT_RED);
		return true;
	}

	MV.PlayGameSound(SOUND_QUERIED);

	// Do the query
	MV.DoQuery(this);
	this.m_nState = STATE_QUERIED1;

	// Set all below us who have queried to not queried, so that we only have one at a time who are querying
	// Due to the reordering, the querying one should always be first, so this should be useless and never happen
	for (p++; p < g_pChar.m_pSystem.m_olIceList.length; p++) {
		let pIce = g_pChar.m_pSystem.m_olIceList[p];

		if (pIce.HasQueried()) {
			console.log("DOES THIS _EVER_ HAPPEN?");
			// Change the state
			if (pIce.m_nType === ICE_GATEWAY || pIce.m_nType === ICE_GUARDIAN || pIce.m_nType === ICE_TAPEWORM)
				pIce.m_nState = STATE_GUARDING;
			else
				pIce.m_nState = STATE_FOLLOWING;
		}
	}

	return true;
}


Ice.prototype.DoMove = function(nDir) {
	// Special case for ice being re-entered into the system
	if (nDir !== DIR_NONE && nDir !== DIR_CENTER) {
		// Are we leaving the player's node?
		if (this.m_pCurrentNode === g_pChar.m_pCurrentNode) {
			// Remove us from the ICE list
			g_pChar.m_olCurrentIceList.remove(this);

			// If this was the last ICE to leave the node, clear the 'highest deceived level'
			if (g_pChar.m_olCurrentIceList.length === 0)
				g_pChar.m_nHighestDeceivedIce = 0;

			MV.PlayGameSound(SOUND_ICELEAVENODE);

			// Send a message
			MV.l_MessageView.AddMessage(this.m_szName+" has left the node.", BLACK);

			// Were we the targetted ice?
			if (g_pChar.m_pTargettedIce === this) {
				g_pChar.m_pTargettedIce = null;
				MV.UpdateControls();
			}

			// Erase the ice
			MV.l_NodeView.EraseIce(this);
		}

		// Change our node
		this.m_pCurrentNode = this.m_pCurrentNode.m_pAdjNode[nDir];
	}

	// Save our direction
	this.m_nLastDir = nDir;

	// Choose a location
	if (this.m_pCurrentNode === this.m_pHomeNode) {
		// If this is an ice returning to its home node, put it in the correct place
		// Put gateways at the door they will guard, others in the middle
		if (this.m_nType === ICE_GATEWAY)
			this.m_ptNodeLoc = this.m_pCurrentNode.ChooseLocation(this.m_nSubType);
		else
			this.m_ptNodeLoc = this.m_pCurrentNode.ChooseLocation(DIR_CENTER);
	} else if (nDir === DIR_NONE || nDir === DIR_CENTER) {
		// Check for entering by non-standard method (i.e. reactivation)
		this.m_ptNodeLoc = this.m_pCurrentNode.ChooseLocation(nDir);
	} else {
		// Normal entry
		this.m_ptNodeLoc = this.m_pCurrentNode.ChooseLocation(OppDir(nDir));
	}

	// Are we now in the player's node?
	if (this.m_pCurrentNode === g_pChar.m_pCurrentNode) {
		MV.PlayGameSound(SOUND_ICEENTERNODE);

		// Send a message
		MV.l_MessageView.AddMessage(this.m_szName+" has entered the node.", BLACK);

		// Add us to the current ice list
		g_pChar.m_olCurrentIceList.push(this);

		// Draw the picture
		MV.l_NodeView.DrawIce(this);

		if ( (this.m_nState & STATE_MASK_HOSTILE) || g_pChar.m_bTraced ) {
			// If this is a hostile ice, mark all ice in node as hostile
			MarkIceAsHostile();
		} else  {
			// If there are hostile ice in the node, mark this one as hostile
			let bHostile = false;
			g_pChar.m_olCurrentIceList.forEach(pTmpIce => {
				if (pTmpIce.m_nState & STATE_MASK_HOSTILE)
					bHostile = true;
			});

			if (bHostile) {
				// Mark us as hostile
				if ( this.m_nType === ICE_PROBE || this.m_nType === ICE_ATTACK || this.m_nType === ICE_TRACE )
					this.m_nState = STATE_ATTACKING;
				else
					this.m_nState = STATE_MOVING_H; // We must be guardian or gateway moving into position
			} else {
				// If player has deceived in this node, we may be bypassed
				if (g_pChar.m_nHighestDeceivedIce >= this.m_nRating)
					this.m_bBypassed = true;
			}
		}
	}
}



Ice.prototype.DoAction = function() {
	// If we are not in the player's node, clear the bypassed flag
	if (this.m_pCurrentNode !== g_pChar.m_pCurrentNode)
		this.m_bBypassed = false;

	//------------------------------------------
	// Handle any special conditions on the ICE
	//------------------------------------------
	// See if we are slowed
	if (this.m_nSlowLevel) {
		this.m_nSlowLevel--;
		if (this.m_nSlowLevel===0) {
			MV.l_MessageView.AddMessage(this.m_szName+" is no longer slowed", BLACK);
		} else {
			if (this.m_bSkippedLastTurn) {
				// We can do this turn
				this.m_bSkippedLastTurn = false;
			} else {
				// Skip this turn
				this.m_bSkippedLastTurn = true;
				return;
			}
		}
	}

	// Do we have a virus?
	if (this.m_nVirusLevel>0) {
		this.m_nVirusLevel--;

		if (this.m_nVirusLevel===0) {
			MV.l_MessageView.AddMessage(this.m_szName+" is no longer infected", BLACK);
		} else {
			// Take a point of damage
			this.m_nHealth--;
			if (this.m_nHealth===0) {
				this.Crash();
				return;
			}
		}
	}

	// Are we confused?
	if (this.m_nConfusionLevel>0) {
		this.m_nConfusionLevel--;

		if (this.m_nConfusionLevel===0) {
			MV.l_MessageView.AddMessage(this.m_szName+" is no longer confused", BLACK);
		}
	}

	// Are we weakened?
	if (this.m_nWeakenLevel>0) {
		this.m_nWeakenLevel--;

		if (this.m_nWeakenLevel===0) {
			MV.l_MessageView.AddMessage(this.m_szName+" is no longer weakened",BLACK);
		}
	}


	//----------------------------------
	// Do the ICE actions for this turn
	//----------------------------------
	// If we are confused, choose a random action
	if (this.m_nConfusionLevel>0) {
		// If this is the active trace, 25% chance of cancelling trace
		if (g_pChar.m_pTraceIce === this) {
			if (Random(4)===0) {
				g_pChar.m_pTraceIce = null;
				MV.l_MessageView.AddMessage(this.m_szName+" cancels its trace!", BLUE);
			}
		}

		// Choose random action
		let iRoll = Random(5);
		let iSuccess;
		switch (iRoll) {
			case 0: // Damage
				iSuccess = DoDieRoll(10);
				if (iSuccess>0) {
					// The ice has damaged itself
					let iDamage = ComputeDamage(iSuccess);
					MV.l_MessageView.AddMessage(this.m_szName+" does "+(iDamage*5)+"% damage to itself.", BLUE);

					// Apply the damage
					this.m_nHealth -= iDamage;
					if (this.m_nHealth <1)
						this.Crash();
				}
				return;

			case 1: // Attack player, if in node
				if ( (this.m_nType === ICE_ATTACK || this.m_nType === ICE_TRACE || this.m_nType === ICE_PROBE) && g_pChar.m_pCurrentNode === this.m_pCurrentNode ) {
					// Go to the attack code normally
					this.m_nState = STATE_ATTACKING;
					break;
				} else {
					// Non-attack will just set an alarm
					DoSetAlert(this, ALERT_RED);
				}
				// Fall through to code below

			case 2: // Attack other ice in node
				if (this.m_nType === ICE_ATTACK) {
					// Build an ice list for this node
					let m_olOtherIce = [];
					g_pChar.m_pSystem.m_olIceList.forEach(pIce => {
						if (pIce !== this && pIce.m_pCurrentNode === this.m_pCurrentNode)
							m_olOtherIce.push(pIce);
					});

					if (m_olOtherIce.length) {
						// Pick a random ice to attack
						let iRoll = Random(m_olOtherIce.length);
						let pIce = m_olOtherIce[iRoll];

						// Attack the ice
						let iTargetNumber = 10 - this.GetEffectiveRating(RATING_COMBAT, false) + pIce.GetEffectiveRating(RATING_COMBAT, false);

						// Roll the die
						let iSuccess = DoDieRoll(iTargetNumber);

						if (iSuccess > 0) {
							// Did some damage. Send a message.
							let iDamage = ComputeDamage(iSuccess);
							MV.l_MessageView.AddMessage(this.m_szName+" attacks "+pIce.m_szName+" for "+(iDamage*5)+"% damage!", BLUE);

							// Apply the damage
							pIce.m_nHealth -= iDamage;
							if (pIce.m_nHealth < 1)
								pIce.Crash();
						} else {
							// Missed. Send a message.
							MV.l_MessageView.AddMessage(this.m_szName+" attacks "+pIce.m_szName+" but missed.", BLACK);
						}

						return;
					}
				}
				// Fall through to code below

			case 3:
				// Wander, or do nothing
				if ( this.m_nType === ICE_ATTACK || this.m_nType === ICE_TRACE || this.m_nType === ICE_PROBE ) {
					// If we fell through from the code above, 50/50 chance wandering/sleeping
					if ( iRoll===3 || Random(2)===0 ) {
						// Wander
						this.DoWander();
					}
				}

			//case 4:
			default:
				// Do nothing
				return;
		}
	}

	this.DoAction_2();
}

Ice.prototype.DoAction_Following = function() {
	// This is a probe ICE following the player to query him

	// If the player is in this node, query him
	if (this.m_pCurrentNode === g_pChar.m_pCurrentNode) {
		// Query the player.
		if (!this.DoQuery()) {
			// Wander
			this.m_nState = STATE_SEARCHING;
			this.DoWander();
			return;
		}
	} else {
		// Is the player in adjacent node?
		// If node is smoked, we won't know
		if (this.m_pCurrentNode.m_nActiveSmokeLevel===0) {
			for (let nDir = 0; nDir < 4; nDir++) {
				if (g_pChar.m_pCurrentNode === this.m_pCurrentNode.m_pAdjNode[nDir]) {
					// Move to this node
					this.DoMove(nDir);
					return;
				}
			}
		}

		// Player is not near. Give up the chase
		this.m_nState = STATE_SEARCHING;
		this.DoWander();
	}
}

Ice.prototype.DoAction_Moving = function() {
	// If this is black ice returning home in green/yellow alert, go inactive
	if ( (this.m_nType === ICE_ATTACK || this.m_nType === ICE_TRACE) && g_pChar.m_pSystem.m_nAlert !== ALERT_RED && this.m_nState !== STATE_MOVING_H ) {
		// Ignore player
	} else {
		// If the player is in this node, query him
		if ( this.m_pCurrentNode === g_pChar.m_pCurrentNode && !this.m_bBypassed && (this.m_nType === ICE_ATTACK || this.m_nType === ICE_PROBE || this.m_nType === ICE_TRACE) ) {
			// See if we notice him
			if (this.NoticedPlayer()) {
				if (this.DoQuery()) {
					// We queried, or are waiting, so quit
					return;
				}
			}
		}
	}

	// Are we at our node?
	if (this.m_pCurrentNode === this.m_pTargetNode) {
		// If this is black ice returning home in green/yellow alert, go inactive
		if ( (this.m_nType === ICE_ATTACK || this.m_nType === ICE_TRACE) && g_pChar.m_pSystem.m_nAlert !== ALERT_RED ) {
			// Go dormant
			this.m_nState = STATE_INACTIVE;
		} else if (this.m_bResponse) {
			// Response IC should wander looking for intruders.
			this.DoWander();
			// For non-response, guard
		} else if ( (this.m_nState & STATE_MASK_HOSTILE) && this.m_pCurrentNode === g_pChar.m_pCurrentNode ) {
			this.m_nState = STATE_GUARDING_H;
		} else {
			this.m_nState = STATE_GUARDING;
		}
	} else {
		// Calculate the shortest path to the target node
		this.m_pTargetNode.m_pParentArea.CalculatePathsToNode(this.m_pTargetNode);
		let nLowestDirVal = 1000;
		let nLowestDir;
		for (let nDir=0; nDir<4; nDir++) {
			if (this.m_pCurrentNode.m_pAdjNode[nDir]!==null && this.m_pCurrentNode.m_pAdjNode[nDir].m_bProcessed<nLowestDirVal) {
				nLowestDirVal = this.m_pCurrentNode.m_pAdjNode[nDir].m_bProcessed;
				nLowestDir = nDir;
			}
		}

		// Clear the hostile flag
		this.m_nState = STATE_MOVING;

		// Move towards the target node
		this.DoMove(nLowestDir);
	}
}

Ice.prototype.DoAction_Searching = function() {
	// If the player is in this node, query him
	if (this.m_pCurrentNode === g_pChar.m_pCurrentNode && !this.m_bBypassed) {
		// See if we notice the player
		if (this.NoticedPlayer()) {
			if (this.DoQuery()) {
				// Waiting for response
				return;
			}
		}
	}

	// Wander randomly
	this.DoWander();
}

Ice.prototype.DoAction_Queried = function() {
	// Have we been bypassed?
	if (!this.m_bBypassed) {
		// Ice has not been bypassed.

		// If this is the last time, or the player has left the node, sound a yellow alert.
		// If it is the red alert, go hostile
		if (this.m_nState === STATE_QUERIED3 || g_pChar.m_pCurrentNode !== this.m_pCurrentNode) {
			// Sound a yellow alert. May change our state if we are silenced,
			// or if it goes to red, but only if we are in the player's node.
			DoSetAlert(this, ALERT_YELLOW);
		} else {
			// Give the player some more time to respond
			this.m_nState++;
			return;
		}

		// If we successfully set a yellow alert, we can query again
		if (g_pChar.m_pSystem.m_nAlert === ALERT_YELLOW && this.m_pCurrentNode.m_nActiveSilenceLevel === 0) {
			// Query again
			// We may be in another node if the player
			// left without answering the query, so handle this.
			if (this.m_pCurrentNode !== g_pChar.m_pCurrentNode) {
				if (this.m_nType === ICE_PROBE || this.m_nType === ICE_ATTACK || this.m_nType === ICE_TRACE)
					this.m_nState = STATE_FOLLOWING;
				else
					this.m_nState = STATE_GUARDING;
			} else {
				// Query again
				this.DoQuery();

				// If we are waiting for someone else to query, fix state.
				if (this.m_nState !== STATE_QUERIED1 && !(this.m_nState & STATE_MASK_HOSTILE)) {
					if (this.m_nType === ICE_PROBE || this.m_nType === ICE_ATTACK || this.m_nType === ICE_TRACE)
						this.m_nState = STATE_FOLLOWING;
					else
						this.m_nState = STATE_GUARDING;
				}
				return;
			}
		} else {
			// Go hostile
			// We may be in another node if the player
			// left without answering the query, so handle this.
			if (this.m_pCurrentNode !== g_pChar.m_pCurrentNode) {
				if (this.m_nType === ICE_PROBE || this.m_nType === ICE_ATTACK || this.m_nType === ICE_TRACE)
					this.m_nState = STATE_ATTACKING;
				else
					this.m_nState = STATE_GUARDING;
			} else {
				// Mark all ice in the node as hostile
				MarkIceAsHostile();

				// It this is a tapeworm set it to destroy the file
				if (this.m_nType === ICE_TAPEWORM)
					this.m_nState = STATE_DESTROYING;
			}
		}

		// Redo action with new state
		this.DoAction_2();
		return;
	}

	// If we are here, we were bypassed

	if (this.m_nType === ICE_GATEWAY || this.m_nType === ICE_GUARDIAN || this.m_nType === ICE_TAPEWORM) {
		// If we are gate/guard/tape, go back to guarding
		this.m_nState = STATE_GUARDING;
	} else if (this.m_nType === ICE_PROBE || this.m_bResponse) {
		// For probe or response IC, wander
		this.m_nState = STATE_SEARCHING;
		this.DoWander();
	} else {
		// For non-response black, return home
		this.m_nState = STATE_MOVING;
		this.m_pTargetNode = this.m_pHomeNode;

		// Redo action with new state
		this.DoAction_2();
		return;
	}
}

Ice.prototype.DoAction_Destroying = function() {
	// This is a tapeworm destroying a file
	this.m_pFile.m_nState &= (~STATE_IN_NODE);

	// If this is a databomb, attack
	if (this.m_nSubType === TWST_DATABOMB && this.m_pCurrentNode === g_pChar.m_pCurrentNode) {
		// Do an attack with no benefit from decoys. First, get a target number
		// Target number is lower than normal
		let iTargetNumber = 6 - (2*g_pChar.m_pSystem.m_nRating + this.GetEffectiveRating(RATING_COMBAT)) + (g_pChar.GetEffectiveRating(RATING_DEFENSE));
		if (g_pChar.m_pActiveArmor !== null)
			iTargetNumber += g_pChar.m_pActiveArmor.m_nLoadedRating;

		// Roll the die
		let iSuccess = DoDieRoll(iTargetNumber);

		if (iSuccess>0) {
			// Ignore decoys
			// It hit. Compute damage
			let iDamage = ComputeDamage(iSuccess);

			// Print out a message saying so
			MV.l_MessageView.AddMessage(this.m_szName+" explodes for "+(iDamage*5)+"% damage.", BLACK);

			// Draw the damage
			MV.l_NodeView.DrawExplosion(this);
			MV.l_NodeView.DrawDamage(null);

			// Do damage to shield first
			if (g_pChar.m_pActiveShield !== null) {
				if (g_pChar.m_pActiveShield.m_nLoadedRating > iDamage) {
					// The shield will take the damage
					g_pChar.m_pActiveShield.m_nLoadedRating -= iDamage;
					iDamage = 0;
					MV.UpdateProgramRating();
				} else {
					// The shield will crash
					iDamage -= g_pChar.m_pActiveShield.m_nLoadedRating;
					g_pChar.m_pActiveShield.m_nLoadedRating = 0;
					MV.l_MessageView.AddMessage("Your shield program "+g_pChar.m_pActiveShield.m_szName+" has crashed.", RED);
					DoRemoveProgram(g_pChar.m_pActiveShield);
				}
				MV.UpdateBar(BAR_SHIELD);
			}

			// Do we still have damage to do?
			if (iDamage > 0) {
				// Do damage to the deck
				g_pChar.m_nDamageDeck += iDamage;
			}
		} else {
			// We missed. Print out a message saying so
			MV.l_MessageView.AddMessage(this.m_szName+" exploded.", BLACK);
		}
	}

	MV.PlayGameSound(SOUND_FILEDESTROYED);

	// Print a message
	MV.l_MessageView.AddMessage(this.m_szName+" destroys file "+this.m_pFile.m_szName+".", ORANGE);

	// Self destruct
	this.Crash();
}

Ice.prototype.DoAction_Guarding = function() {
	// If we are black ICE and are in the same node as player, query him
	if (this.m_nType === ICE_ATTACK || this.m_nType === ICE_TRACE) {
		if (this.m_pCurrentNode === g_pChar.m_pCurrentNode && !this.m_bBypassed) {
			if (this.NoticedPlayer()) {
				// Query the player
				this.DoQuery();
			}
		}
		// Otherwise, just sleep
	} else if (this.m_bWasAccessed) {
		// Character accessed us. Query the player
		this.DoQuery();
	}
}
Ice.prototype.DoAction_Guarding_H = function() {
	// Then, do nothing
}

Ice.prototype.DoAction_Attacking = function() {
	// If the player is not in the node, try to follow him
	if (this.m_pCurrentNode !== g_pChar.m_pCurrentNode) {
		// Is the player in adjacent node? If smoked, we won't know
		if (this.m_pCurrentNode.m_nActiveSmokeLevel===0) {
			for (let nDir = 0; nDir < 4; nDir++) {
				if (g_pChar.m_pCurrentNode === this.m_pCurrentNode.m_pAdjNode[nDir]) {
					// Move to this node
					this.DoMove(nDir);

					return;
				}
			}
		}

		// Player is not near. Give up the chase.
		if (this.m_nType === ICE_PROBE || this.m_bResponse) {
			// Probe and response IC will try to search for intruders
			this.m_nState = STATE_SEARCHING;
			this.DoWander();
		} else {
			// Non-response ice will go home and guard
			this.m_nState = STATE_MOVING;
			this.m_pTargetNode = this.m_pHomeNode;

			// Redo action with new state
			this.DoAction_2();
			return;
		}

	} else {
		// Player is in this node. Attack base on ICE type
		if (this.m_nType === ICE_ATTACK) {
			// Do a normal attack. First, get a target number
			let iTargetNumber = 10 - (2*g_pChar.m_pSystem.m_nRating + this.GetEffectiveRating(RATING_COMBAT)) + (g_pChar.GetEffectiveRating(RATING_DEFENSE));
			if (g_pChar.m_pActiveArmor !== null)
				iTargetNumber += g_pChar.m_pActiveArmor.m_nLoadedRating;
			if (this.m_nSubType & AST_MASK_KILLER) {
				// Killer ice. Take neural damper into account
				iTargetNumber += g_pChar.m_nHardware[HW_NEURAL_DAMPER];
			}

			// Roll the die
			let iSuccess = DoDieRoll(iTargetNumber);

			if (iSuccess>0) {
				MV.PlayGameSound(SOUND_ATTACKED);

				// If there are decoys, see if we actually hit
				if (g_pChar.m_nDecoyCount > 0) {
					if (Random(g_pChar.m_nDecoyCount+1) !== 0) {
						// Hit the decoy
						MV.l_MessageView.AddMessage(this.m_szName+" hits a decoy and destroys it.", BLACK);

						// Erase the decoy
						g_pChar.m_nDecoyCount--;
						MV.l_NodeView.EraseDecoy(g_pChar.m_ptDecoyLocation[g_pChar.m_nDecoyCount]);
						return;
					}
				}

				// It hit. Compute damage
				let iDamage = ComputeDamage(iSuccess);

				// Print out a message saying so
				MV.l_MessageView.AddMessage(this.m_szName+" hits for "+(iDamage*5)+"% damage.", BLACK);

				// Check for reflect
				if (g_pChar.m_pActiveReflect !== null) {
					// Roll to see reflected percent
					let iTargetNumber = 10 - (2*g_pChar.m_pSystem.m_nRating + this.GetEffectiveRating(RATING_COMBAT)) + (g_pChar.GetEffectiveRating(RATING_DEFENSE) + g_pChar.m_pActiveReflect.m_nLoadedRating);

					// Roll the die
					let iSuccess = DoDieRoll(iTargetNumber);
					if (iSuccess === -1) {
						g_pChar.m_pActiveReflect.m_nLoadedRating = 0;
						MV.l_MessageView.AddMessage("Your reflect program "+g_pChar.m_pActiveReflect.m_szName+" has crashed.", RED);
						DoRemoveProgram(g_pChar.m_pActiveReflect);
					} else {
						// 20% damage reflected per success
						let iReflectedDamage = Math.floor((iDamage * iSuccess)/5);

						if (iReflectedDamage > 0) {
							// Some damage has been reflected
							MV.l_MessageView.AddMessage((iReflectedDamage*5)+"% damage has been reflected.", RED);

							// Reduce the damage taken
							iDamage -= iReflectedDamage;

							// Do damage to the ice
							MV.l_NodeView.DrawDamage(this);
							this.m_nHealth -= iReflectedDamage;
							if (this.m_nHealth <= 0)
								this.Crash();

							if (iDamage === 0) return;
						}
					}
				}

				// Draw the damage
				MV.l_NodeView.DrawDamage(null);

				// Do damage to shield first
				if (g_pChar.m_pActiveShield !== null) {
					if (g_pChar.m_pActiveShield.m_nLoadedRating > iDamage) {
						// The shield will take the damage
						g_pChar.m_pActiveShield.m_nLoadedRating -= iDamage;
						iDamage = 0;
						MV.UpdateProgramRating();
					} else {
						// The shield will crash
						iDamage -= g_pChar.m_pActiveShield.m_nLoadedRating;
						g_pChar.m_pActiveShield.m_nLoadedRating = 0;
						MV.l_MessageView.AddMessage("Your shield program "+g_pChar.m_pActiveShield.m_szName+" has crashed.", RED);
						DoRemoveProgram(g_pChar.m_pActiveShield);
					}
					MV.UpdateBar(BAR_SHIELD);
				}

				// Do we still have damage to do?
				if (iDamage>0) {
					// Modify the player's health
					if (this.m_nSubType & AST_MASK_KILLER) {
						// Damage the player
						g_pChar.m_nDamageMental += iDamage;
					} else {
						// Damage the deck
						g_pChar.m_nDamageDeck += iDamage;
					}

					// If this is crash ice, handle that
					if (this.m_nSubType & AST_MASK_CRASH) {
						// 10% chance per damage point of crashing a program
						if (Random(10) < iDamage) {
							// Crash a program
							let olProgs = [];

							// First, get a list of programs
							g_pChar.m_olSoftware.forEach(pProgram => {
								if (pProgram.m_nLoadedRating > 0)
									olProgs.push(pProgram);
							});

							// See if it is empty
							if (olProgs.length) {
								// Choose a random one
								let p = Random(olProgs.length);
								let pProgram = olProgs[p];

								// Send a message
								MV.l_MessageView.AddMessage(this.m_szName+" has crashed your "+pProgram.m_szName+" program!", RED);

								// Crash it
								pProgram.m_nLoadedRating = 0;
								DoRemoveProgram(pProgram);
							}
						}
					}
				}
			} else {
				// We missed. Print out a message saying so
				MV.l_MessageView.AddMessage(this.m_szName+" program missed.", BLACK);
			}
		} else if (this.m_nType === ICE_TRACE) {
			// If there is already a trace active,
			// or if we are a normal trace and the trace is complete, just wait
			if (g_pChar.m_pTraceIce === null && (this.m_nSubType !== TST_NORMAL || !g_pChar.m_bTraced)) {
				// Do the attack.
				// Do a normal attack. First, get a target number
				let iTargetNumber = 10 - (2*g_pChar.m_pSystem.m_nRating + this.GetEffectiveRating(RATING_COMBAT)) + (g_pChar.GetEffectiveRating(RATING_DEFENSE));
				if (g_pChar.m_pActiveArmor !== null)
					iTargetNumber += g_pChar.m_pActiveArmor.m_nLoadedRating;

				// Reduce by 1 for each attacking trace
				g_pChar.m_olCurrentIceList.forEach(pIce => {
					if (pIce !== this && pIce.m_nType === ICE_TRACE)
						iTargetNumber--;
				});

				// Roll the die
				let iSuccess = DoDieRoll(iTargetNumber);

				if (iSuccess>0) {
					// Set us up as the tracing ice (12-(success/2) => 10..2)
					g_pChar.m_pTraceIce = this;
					g_pChar.m_nTraceInitialTime = (12 - Math.floor(iSuccess/2));
					g_pChar.m_nTraceTurnsLeft = g_pChar.m_nTraceInitialTime;
					if (!g_pChar.m_bTraced) {
						// Normal trace
						g_pChar.m_nTraceType = TST_NORMAL;
					} else {
						// Type is our type
						g_pChar.m_nTraceType = this.m_nSubType;
					}

					MV.PlayGameSound(SOUND_TRACESTART);

					// The trace has started
					MV.l_MessageView.AddMessage(this.m_szName+" has started a trace! Trace will complete in "+g_pChar.m_nTraceInitialTime+" seconds.", RED);

					MV.UpdateBar(BAR_TRACE);
				} else {
					MV.l_MessageView.AddMessage(this.m_szName+" tried a trace, but failed!", RED);
				}
			}
		}
		// Probe ice will just continue to follow
	}
}

Ice.prototype.DoAction_2 = function() {
	// Try to signal an alarm if we are hostile
	switch (this.m_nState) {
		case STATE_MOVING_H:
		case STATE_GUARDING_H:
		case STATE_DESTROYING:
		case STATE_ATTACKING:
			DoSetAlert(this, ALERT_RED);
	}

	// Process according to current state
	switch (this.m_nState) {

		case STATE_FOLLOWING:
			this.DoAction_Following();
			break;
		case STATE_MOVING_H:
		case STATE_MOVING:
			this.DoAction_Moving();
			break;
		case STATE_SEARCHING:
			this.DoAction_Searching();
			break;
		case STATE_QUERIED1:
		case STATE_QUERIED2:
		case STATE_QUERIED3:
			this.DoAction_Queried();
			break;
		case STATE_DESTROYING:
			this.DoAction_Destroying();
			break;
		case STATE_ATTACKING:
			this.DoAction_Attacking();
			break;
		case STATE_GUARDING:
			this.DoAction_Guarding();
		case STATE_GUARDING_H:
			this.DoAction_Guarding_H();
			break;
		//case STATE_INACTIVE:
		default:
			// Do nothing
	}
}




Ice.prototype.Save = function(Buffer) {
	// Write out the fixed data
	Buffer.addString(this.m_szName);
	Buffer.addInteger(this.m_nType);
	Buffer.addInteger(this.m_nSubType);
	Buffer.addInteger(this.m_nRating);
	Buffer.addInteger(this.m_nImage);
	Buffer.addInteger(this.m_bResponse);

	// Home node
	Buffer.addElement(this.m_pHomeNode, g_pChar.m_pSystem.m_olNodeList);

	// File
	Buffer.addElement(this.m_pFile, this.m_pHomeNode.m_olFileList);

	// Write health status
	Buffer.addInteger(this.m_nHealth);
	Buffer.addInteger(this.m_nSlowLevel);
	Buffer.addInteger(this.m_bSkippedLastTurn);
	Buffer.addInteger(this.m_nConfusionLevel);
	Buffer.addInteger(this.m_nWeakenLevel);
	Buffer.addInteger(this.m_nVirusLevel);
	Buffer.addInteger(this.m_nAnalyzed);

	// Write location data
	Buffer.addElement(this.m_pCurrentNode, g_pChar.m_pSystem.m_olNodeList);
	Buffer.addPoint( this.m_ptNodeLoc );

	// Behavior flags
	Buffer.addInteger(this.m_nState);       // Current state
	Buffer.addInteger(this.m_bBypassed);    // Was this ice bypassed?
	Buffer.addInteger(this.m_bWasAccessed); // Was this ice accessed by the player
	Buffer.addInteger(this.m_nLastDir);     // Direction we moved last time

	// Target Node
	Buffer.addElement(this.m_pTargetNode, g_pChar.m_pSystem.m_olNodeList);
}
Ice.prototype.Load = function(Buffer, version, pSystem) {
	// Read out the fixed data
	this.m_szName = Buffer.getString();
	this.m_nType = Buffer.getInteger();
	this.m_nSubType = Buffer.getInteger();
	this.m_nRating = Buffer.getInteger();
	this.m_nImage = Buffer.getInteger();
	this.m_bResponse = !!Buffer.getInteger();

	// Home node
	this.m_pHomeNode = Buffer.getElement(pSystem.m_olNodeList);

	// File
	this.m_pFile = Buffer.getElement(this.m_pHomeNode.m_olFileList);
	if (this.m_pFile !== null)
		this.m_pFile.m_pTapeworm = this;

	// Read health status
	this.m_nHealth = Buffer.getInteger();
	this.m_nSlowLevel = Buffer.getInteger();
	this.m_bSkippedLastTurn = !!Buffer.getInteger();
	this.m_nConfusionLevel = Buffer.getInteger();
	this.m_nWeakenLevel = Buffer.getInteger();
	this.m_nVirusLevel = Buffer.getInteger();

	if (version < 7) {
		let b_nAnalyzed = !!Buffer.getInteger();
		this.m_nAnalyzed = bAnalyzed ? 2 : 0;
	} else {
		this.m_nAnalyzed = Buffer.getInteger();
	}

	// Read location data
	this.m_pCurrentNode = Buffer.getElement(pSystem.m_olNodeList);
	this.m_ptNodeLoc = Buffer.getPoint();

	// Behavior flags
	this.m_nState = Buffer.getInteger();
	this.m_bBypassed = !!Buffer.getInteger();
	this.m_bWasAccessed = !!Buffer.getInteger();
	this.m_nLastDir = Buffer.getInteger();

	// Target Node
	this.m_pTargetNode = Buffer.getElement(pSystem.m_olNodeList);
}

Ice.prototype.Crash = function() {
	// Ice has crashed. Send a message.
	// Check to see if ice is in same node. If not, no message.
	if (this.m_pCurrentNode === g_pChar.m_pCurrentNode) {
		// Don't play sound if tapeworm, because it has its own sound
		if (this.m_nType !== ICE_TAPEWORM)
			MV.PlayGameSound(SOUND_ICECRASH);

		MV.l_MessageView.AddMessage(this.m_szName+" has crashed!", DK_BLUE);

		// Erase the ice from the node view
		MV.l_NodeView.EraseIce(this);
	}

	// If this was the targetted ice, clear the target
	if (this === g_pChar.m_pTargettedIce) {
		g_pChar.m_pTargettedIce = null;
		MV.UpdateTargetInfo();
		MV.UpdateControls();
	}

	// If this was a tracing ice, cancel the trace
	if (this === g_pChar.m_pTraceIce)
		DoClearTrace();

	// Remove the ICE from the node list
	if (this.m_pCurrentNode === g_pChar.m_pCurrentNode)
		g_pChar.m_olCurrentIceList.remove(this);

	// Remove the ICE from the system list
	g_pChar.m_pSystem.m_olIceList.remove(this);

	// If this is a tapeworm ice, set it to not be guarding a file (tapeworms do not respawn).
	if (this.m_nType === ICE_TAPEWORM) {
		this.m_pFile.m_pTapeworm = null;
	} else {
		// Move this ice to the dead ice list
		g_pChar.m_pSystem.m_olDeadIceList.push(this);
	}
}

// source.js

function Source() {
	this.m_nType = 0;
	this.m_nClass = 0;
	this.m_nRating = 0;
}

Source.prototype.Save = function(Buffer) {
	Buffer.addInteger(this.m_nType);
	Buffer.addInteger(this.m_nClass);
	Buffer.addInteger(this.m_nRating);
}
Source.prototype.Load = function(Buffer, version) {
	this.m_nType = Buffer.getInteger();
	this.m_nClass = Buffer.getInteger();
	this.m_nRating = Buffer.getInteger();
}

// sound.js


// Sound directory
const g_szSoundDirectory = "snd";

// Sound file extension
const g_szSoundExtension = ".ogg";


const SOUND_DEFAULTATTACK			= 0;
const SOUND_DEFAULTAREAATTACK		= 1;
const SOUND_DEFAULTPIERCINGATTACK	= 2;
const SOUND_DEFAULTSLOW				= 3;
const SOUND_DEFAULTVIRUS			= 4;
const SOUND_DEFAULTSILENCE			= 5;
const SOUND_DEFAULTCONFUSE			= 6;
const SOUND_DEFAULTWEAKEN			= 7;
const SOUND_DEFAULTSHIELD			= 8;
const SOUND_DEFAULTSMOKE			= 9;
const SOUND_DEFAULTDECOY			= 10;
const SOUND_DEFAULTMEDIC			= 11;
const SOUND_DEFAULTARMOR			= 12;
const SOUND_DEFAULTHIDE				= 13;
const SOUND_DEFAULTDECEIVE			= 14;
const SOUND_DEFAULTRELOCATE			= 15;
const SOUND_DEFAULTANALYZE			= 16;
const SOUND_DEFAULTSCAN				= 17;
const SOUND_DEFAULTEVALUATE			= 18;
const SOUND_DEFAULTDECRYPT			= 19;
const SOUND_DEFAULTREFLECT			= 20;
const SOUND_DEFAULTATTACKBOOST		= 21;
const SOUND_DEFAULTDEFENSEBOOST		= 22;
const SOUND_DEFAULTSTEALTHBOOST		= 23;
const SOUND_DEFAULTANALYSISBOOST	= 24;
const SOUND_DOWNLOADFILE			= 25;
const SOUND_EDITFILE				= 26;
const SOUND_ERASEFILE				= 27;
const SOUND_CRASHSYSTEM				= 28;
const SOUND_USEIO					= 29;
const SOUND_GETMAP					= 30;
const SOUND_CREATEBACKDOOR			= 31;
const SOUND_CANCELALERT				= 32;
const SOUND_ENTERPORTAL				= 33;
const SOUND_CANCELTRACE				= 34;
const SOUND_CANCELSHUTDOWN			= 35;
const SOUND_MOVE					= 36;
const SOUND_UNLOADPROGRAM			= 37;
const SOUND_ENTERMATRIX				= 38;
const SOUND_DUMPDISCONNECT			= 39;
const SOUND_DUMPDECKDAMAGE			= 40;
const SOUND_DUMPUNCONSCIOUS			= 41;
const SOUND_DUMPDEATH				= 42;
const SOUND_DUMPTRACE				= 43;
const SOUND_DUMPSYSCRASH			= 44;
const SOUND_DUMPSYSOFFLINE			= 45;
const SOUND_QUERIED					= 46;
const SOUND_ATTACKED				= 47;
const SOUND_YELLOWALERT				= 48;
const SOUND_REDALERT				= 49;
const SOUND_SHUTDOWN_COMMENCE		= 50;
const SOUND_TRACESTART				= 51;
const SOUND_ICECRASH				= 52;
const SOUND_DOWNLOADCOMPLETE		= 53;
const SOUND_EDITCOMPLETE			= 54;
const SOUND_ICEENTERNODE			= 55;
const SOUND_ICELEAVENODE			= 56;
const SOUND_PROGRAMLOADED			= 57;
const SOUND_SCANCOMPLETE			= 58;
const SOUND_EVALCOMPLETE			= 59;
const SOUND_FILEDESTROYED			= 60;
const SOUND_CUSTOM1					= 61;
const SOUND_CUSTOM2					= 62;
const SOUND_CUSTOM3					= 63;
const SOUND_CUSTOM4					= 64;
const SOUND_CUSTOM5					= 65;
const SOUND_CUSTOM6					= 66;
const SOUND_CUSTOM7					= 67;
const SOUND_CUSTOM8					= 68;
const SOUND_CUSTOM9					= 69;
const SOUND_CUSTOM10				= 70;
const SOUND_CUSTOM11				= 71;
const SOUND_CUSTOM12				= 72;
const SOUND_CUSTOM13				= 73;
const SOUND_CUSTOM14				= 74;
const SOUND_CUSTOM15				= 75;
const SOUND_CUSTOM16				= 76;
const SOUND_CUSTOM17				= 77;
const SOUND_CUSTOM18				= 78;
const SOUND_CUSTOM19				= 79;
const SOUND_CUSTOM20				= 80;
const SOUND_DEFAULTCLIENT			= 81;
const SOUND_STOPROGRAM				= 82;


var g_szSoundKey = [
	"Pulse3",					// SOUND_DEFAULTATTACK
	"9mmPistol",				// SOUND_DEFAULTAREAATTACK
	"44Magnum",					// SOUND_DEFAULTPIERCINGATTACK
	"Misc1",					// SOUND_DEFAULTSLOW
	"Misc1",					// SOUND_DEFAULTVIRUS
	"Silence",					// SOUND_DEFAULTSILENCE
	"Misc1",					// SOUND_DEFAULTCONFUSE
	"Misc1",					// SOUND_DEFAULTWEAKEN
	"Misc3",					// SOUND_DEFAULTSHIELD
	"Smoke",					// SOUND_DEFAULTSMOKE
	"Pulse2",					// SOUND_DEFAULTDECOY
	"Misc2",					// SOUND_DEFAULTMEDIC
	"Spike",					// SOUND_DEFAULTARMOR
	"Hide",						// SOUND_DEFAULTHIDE
	"Deceive",					// SOUND_DEFAULTDECEIVE
	"Relocate",					// SOUND_DEFAULTRELOCATE
	"Analyze",					// SOUND_DEFAULTANALYZE
	"Scan",						// SOUND_DEFAULTSCAN
	"Scan",						// SOUND_DEFAULTEVALUATE
	"Decrypt",					// SOUND_DEFAULTDECRYPT
	"Reflect",					// SOUND_DEFAULTREFLECT
	"Boost",					// SOUND_DEFAULTATTACKBOOST
	"Boost",					// SOUND_DEFAULTDEFENSEBOOST
	"Boost",					// SOUND_DEFAULTSTEALTHBOOST
	"Boost",					// SOUND_DEFAULTANALYSISBOOST
	"StartDownload",			// SOUND_DOWNLOADFILE
	"Edit",						// SOUND_EDITFILE
	"Erase",					// SOUND_ERASEFILE
	"Crash",					// SOUND_CRASHSYSTEM
	"IO",						// SOUND_USEIO
	"Map",						// SOUND_GETMAP
	"Backdoor",					// SOUND_CREATEBACKDOOR
	"CancelAlert",				// SOUND_CANCELALERT
	"Portal",					// SOUND_ENTERPORTAL
	"CancelAlert",				// SOUND_CANCELTRACE
	"CancelAlert",				// SOUND_CANCELSHUTDOWN
	"Move",						// SOUND_MOVE
	"Flush",					// SOUND_UNLOADPROGRAM
	"Dialup",					// SOUND_ENTERMATRIX
	"EndOfLine",				// SOUND_DUMPDISCONNECT
	"EndOfLine",				// SOUND_DUMPDECKDAMAGE
	"EndOfLine",				// SOUND_DUMPUNCONSCIOUS
	"EndOfLine",				// SOUND_DUMPDEATH
	"EndOfLine",				// SOUND_DUMPTRACE
	"EndOfLine",				// SOUND_DUMPSYSCRASH
	"EndOfLine",				// SOUND_DUMPSYSOFFLINE
	"ICEQuery",					// SOUND_QUERIED
	"Pulse1",					// SOUND_ATTACKED
	"YellowAlert",				// SOUND_YELLOWALERT
	"RedAlert",					// SOUND_REDALERT
	"RedAlert",					// SOUND_SHUTDOWN_COMMENCE
	"Ping",						// SOUND_TRACESTART
	"Error",					// SOUND_ICECRASH
	"Download-EditComplete",	// SOUND_DOWNLOADCOMPLETE
	"Download-EditComplete",	// SOUND_EDITCOMPLETE
	"ICEEnter",					// SOUND_ICEENTERNODE
	"ICELeave",					// SOUND_ICELEAVENODE
	"LoadComplete",				// SOUND_PROGRAMLOADED
	"ScanDone",					// SOUND_SCANCOMPLETE
	"ScanDone",					// SOUND_EVALCOMPLETE
	"Tapeworm",					// SOUND_FILEDESTROYED
	"Pulse1",					// SOUND_CUSTOM1
	"Pulse2",					// SOUND_CUSTOM2
	"Pulse3",					// SOUND_CUSTOM3
	"9mmPistol",				// SOUND_CUSTOM4
	"44Magnum",					// SOUND_CUSTOM5
	"",							// SOUND_CUSTOM6
	"",							// SOUND_CUSTOM7
	"",							// SOUND_CUSTOM8
	"",							// SOUND_CUSTOM9
	"",							// SOUND_CUSTOM10
	"",							// SOUND_CUSTOM11
	"",							// SOUND_CUSTOM12
	"",							// SOUND_CUSTOM13
	"",							// SOUND_CUSTOM14
	"",							// SOUND_CUSTOM15
	"",							// SOUND_CUSTOM16
	"",							// SOUND_CUSTOM17
	"",							// SOUND_CUSTOM18
	"",							// SOUND_CUSTOM19
	"",							// SOUND_CUSTOM20
	"Misc4",					// SOUND_DEFAULTCLIENT
	"CancelAlert",				// SOUND_STOPROGRAM
];


var preloadedSounds = { }; // filename => true. Exists only if it loaded ok


function HasGameSound(nSound) {
	// Check for valid sound effect
	return !( nSound < 0 || nSound >= g_szSoundKey.length || g_szSoundKey[nSound] === "" );
}
function PlayGameSound(nSound) {
	// Check for sound off
	if (Config.mute) return;

	// Check for valid sound effect
	if ( nSound < 0 || nSound >= g_szSoundKey.length || g_szSoundKey[nSound] === "" )
		return;

	// Check if sound has loaded properly
	if ( !preloadedSounds[g_szSoundKey[nSound]] ) return;

	let szSound = g_szSoundDirectory + "/" + g_szSoundKey[nSound] + g_szSoundExtension;
	let audio = new Audio(szSound);
	audio.volume = Config.volume / 100;

	// Play the sound file
	audio.play();
}


// Preload sounds
g_szSoundKey.forEach((val,i) => {
	if ( val !== "" && preloadedSounds[g_szSoundKey[i]] === undefined ) {
		preloadedSounds[g_szSoundKey[i]] = false;

		let szSound = g_szSoundDirectory + "/" + val + g_szSoundExtension;
		let audio = new Audio(szSound);
		audio.oncanplay = () => preloadedSounds[val] = audio;
	}
});

// buffer.js


function BufferReader(data) {
	this.data = data; // array of Uint8Array
	this.offset = 0;
}
BufferReader.prototype.getByte = function() {
	let R = this.data[this.offset++];
	if (R === undefined) throw null;
	return R;
}
BufferReader.prototype.getByteArray = function(N) {
	let R = [];
	while (N--)
		R.push(this.data[this.offset++]);
	if (R[R.length-1] === undefined) throw null;
	return R;
}
BufferReader.prototype.getString = function() {
	let length = this.getByte();
	let data = this.data.slice(this.offset, this.offset+length);
	this.offset += length-1;
	this.getByte(); // this is to cause an exception if there are less than 'length' bytes left
	return (new TextDecoder).decode(data);
}
BufferReader.prototype.getBoolean = function() {
	let R = this.getByte();
	if (R !== 1 && R !== 0) throw null;
	return !!R;
}
BufferReader.prototype.getWord = function() {
	let buffer = new ArrayBuffer(2);
	(new Uint8Array(buffer)).set( this.data.slice(this.offset,this.offset+2) );

	this.offset += 1;
	this.getByte(); // this is to cause an exception if there are less than 2 bytes left

	return (new Int16Array(buffer))[0];
}
BufferReader.prototype.getInteger = function() {
	let buffer = new ArrayBuffer(4);
	(new Uint8Array(buffer)).set( this.data.slice(this.offset,this.offset+4) );

	this.offset += 3;
	this.getByte(); // this is to cause an exception if there are less than 4 bytes left

	return (new Int32Array(buffer))[0];
}
BufferReader.prototype.getPoint = function() {
	return new Point( this.getInteger(), this.getInteger() );
}
BufferReader.prototype.getElement = function(array) {
	let nIndex = this.getInteger();
	if (nIndex < 0) return null;
	if (nIndex >= array.length) throw null; // out of bounds
	return array[nIndex];
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function BufferWriter() {
	this.data = []; // array of Uint8Array
}
BufferWriter.prototype.getAll = function() {
	let size = this.data.reduce((a,b) => a + b.byteLength, 0);
	let result = new Uint8Array(size);

	let offset = 0;
	this.data.forEach(arr => {
		result.set(arr, offset);
		offset += arr.byteLength;
	});

	return result;
}

BufferWriter.prototype.addByte = function(v) {
	this.data.push( Uint8Array.of(v) );
}
BufferWriter.prototype.addByteArray = function(arr, N) {
	let R = new Uint8Array(N);
	for (let i=0; i<N; i++)
		R[i] = arr[i];
	this.data.push(R);
}
BufferWriter.prototype.addString = function(str) {
	let arr = (new TextEncoder).encode(str);
	this.addByte(arr.length);
	this.data.push(arr);
}
BufferWriter.prototype.addBoolean = function(v) {
	this.data.push( Uint8Array.of(v?1:0) );
}
BufferWriter.prototype.addWord = function(v) {
	let buffer = new ArrayBuffer(2);
	(new Int16Array(buffer))[0] = v;
	this.data.push( new Uint8Array(buffer) );
}
BufferWriter.prototype.addInteger = function(v) {
	let buffer = new ArrayBuffer(4);
	(new Int32Array(buffer))[0] = v;
	this.data.push( new Uint8Array(buffer) );
}
BufferWriter.prototype.addPoint = function(p) {
	this.addInteger(p.x);
	this.addInteger(p.y);
}
BufferWriter.prototype.addElement = function(elem, array) {
	this.addInteger( array.indexOf(elem) );
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// base64 encoding for Uint8Array's
function Buffer2String(data) {
	let binary = "";
	let len = data.length;
	for (let i=0; i<len; i++)
		binary += String.fromCharCode(data[i]);
	return window.btoa(binary);
}
function String2Buffer(str) {
	let binary = window.atob(str);
	let data = new Uint8Array(binary.length);
	for (let i=0; i<binary.length; i++)
		data[i] = binary.charCodeAt(i);
	return data;
}

// HTMLbuilder.js


function HTMLbuilder_R(parent, tag, get, params, children) {
	if (get !== true) {
		children = params;
		params = get;
		get = false;
	}
	if (Array.isArray(params)) {
		children = params;
		params = {};
	} else if (params === undefined) {
		children = [];
		params = {};
	}
	if (children === undefined)
		children = [];

	function addParams(obj, params) {
		for (let key in params) {
			let val = params[key];
			if (typeof val === "object")
				addParams(obj[key], val);
			else
				obj[key] = val;
		}
	}

	let obj = document.createElement(tag);
	addParams(obj, params);

	let R = [];
	if (get) R.push(obj);
	for (let i=0; i<children.length; i++) {
		let child = HTMLbuilder_R(obj, ...children[i]);
		R.push(...child);
	}
	if (parent) parent.appendChild(obj);
	return R;
}

function HTMLbuilder(children) {
	return HTMLbuilder_R(null, ...children);
}

// gamefile.js

const SAVEGAME_ERROR_FORMAT = "The file format is invalid.";
const SAVEGAME_ERROR_UNKNOWN = "An unspecified error has occurred while reading the file.";


var GameFile = {};

GameFile.lastSlot = null;


// save current game into a file
GameFile.Export = function() {
	let data = GameFile.game2data(g_pChar);
	GameFile.data2file(data);
}

// load game from a file
GameFile.Import = function() {
	GameFile.file2data(data => {
		let R = GameFile.data2game(data);
		if ( R ) {
			g_pChar = R;
			Popup.closeAll();
			if (g_pChar.m_bOnRun) {
				Popup.matrix(null);
			} else {
				Popup.homeview();
			}
			Popup.alert("The game has been loaded.");
			GameFile.lastSlot = null;
		}
	});
}

// start a new game
GameFile.New = function() {
	Popup.newgame().onYes(R => {
		g_pChar = new Character();
		g_pChar.CreateNew(R.bonus);
		g_pChar.m_szName = R.name;
		g_pChar.m_nImage = R.avatar;
		g_pChar.m_bIronMan = R.ironman;
		g_pChar.m_bTooltips = R.tooltips;

		Popup.closeAll();
		Popup.homeview();
	});
	GameFile.lastSlot = null;
}

// save current game in a slot
GameFile.Save = function(slot) {
	let data = GameFile.game2data(g_pChar);
	localStorage.setItem("DeckerSave"+slot, Buffer2String(data));
	GameFile.lastSlot = slot;
}

// load game from a slot
GameFile.Load = function(slot) {
	let data = localStorage.getItem("DeckerSave"+slot);
	let R = GameFile.data2game(String2Buffer(data));
	if ( R ) {
		g_pChar = R;
		Popup.closeAll();
		if (g_pChar.m_bOnRun) {
			Popup.matrix(null);
		} else {
			Popup.homeview();
		}
		Popup.alert("The game has been loaded.");
		GameFile.lastSlot = slot;
	}
}

// returns basic data from a slot, null if slot is empty, false if slot has invalid data
GameFile.slotData = function(slot) {
	let data = localStorage.getItem("DeckerSave"+slot);
	if ( data === null )
		return null;

	let pChar = GameFile.data2game(String2Buffer(data), true);
	if (!pChar) return false;
	return {
		avatar     : pChar.m_nImage,
		ironman    : pChar.m_bIronMan,
		name       : pChar.m_szName,
		reputation : g_szRepLevelString[pChar.m_nRepLevel],
		money      : pChar.m_nCredits,
		date       : g_szMonthNames[pChar.m_nMonth] + " " + (pChar.m_nDayOfMonth+1) + ", " + pChar.m_nYear,
	};
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// takes a character, returns its gamedata
GameFile.game2data = function(pChar) {
	let Buffer = new BufferWriter();
	Buffer.addWord(1); // Major version
	Buffer.addWord(12); // Minor version
	pChar.Save(Buffer);
	return Buffer.getAll();
}

// takes gamedata and returns a new character made from it. Or null if data is faulty.
// In case of error shows a popup with message, unless asked to be silent
GameFile.data2game = function(data, silent) {
	let Buffer = new BufferReader(data);
	let majorVersion = Buffer.getWord(); // Major version
	let minorVersion = Buffer.getWord(); // Minor version
	let version = majorVersion*1000+minorVersion;

	// Create a new, temporary character
	let pNewChar = new Character();
	try {
		pNewChar.Load(Buffer, version);
	} catch (e) {
		// an error occurred
		if (!silent) {
			if (e !== null)
				Popup.alert(SAVEGAME_ERROR_UNKNOWN);
			else
				Popup.alert(SAVEGAME_ERROR_FORMAT);
		}
		return null;
	}

	// Did we actually reach the end of the file? If so, a read must fail.
	try {
		Buffer.getByte();
	} catch(e) {
		if (e !== null) {
			if (!silent) Popup.alert(SAVEGAME_ERROR_FORMAT);
			return null;
		}
		// got an error! that means we are ok.

		// Return the loaded character
		return pNewChar;
	}

	// data extends beyond the end. This is a fail
	if (!silent) Popup.alert(SAVEGAME_ERROR_FORMAT);
	return null;
}



// opens a dialog, asking for a file to read.
// if cancelled, nothing happens.
// else, reads it and calls the callback with the read data.
// shows a popup if it can't read
GameFile.file2data = function(callback) {
	let input = document.createElement("input");
	input.type = "file";
	input.accept = ".dsg";
	input.onchange = () => {
		let file = input.files[0];
		// avoid processing big files
		if (file.size > 60000) { // I hope this is big enough for our purposes
			Popup.alert(SAVEGAME_ERROR_FORMAT);
			return;
		}
		let reader = new FileReader();
		Popup.blocker(); // to block game while reading
		reader.onerror = () => {
			Popup.close(); // unblock
			Popup.alert(SAVEGAME_ERROR_UNKNOWN);
		};
		reader.onload = () => {
			Popup.close(); // unblock
			callback(new Uint8Array(reader.result));
		};
		reader.readAsArrayBuffer(file);
	}
	input.click();
}

// takes data and opens a dialog to save it to a file
GameFile.data2file = function(data, name="decker.dsg") {
	let blob = new Blob([data], {type:"application/octet-binary"});
	let url = URL.createObjectURL(blob);

	let a = document.createElement("a");
	a.style.display = "none";
	a.href = url;
	a.download = name;
	document.body.appendChild(a);
	a.click();
	setTimeout(function() {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	}, 0);
}

// game.js


function MarkIceAsHostile() {
	// Mark all the ICE in this node as hostile.
	g_pChar.m_olCurrentIceList.forEach(pIce => {
		// Mark as not bypassed
		pIce.m_bBypassed = false;

		// If a tapeworm trying to erase a file, don't change
		if (pIce.m_nState === STATE_DESTROYING) return;

		// NOTE: Ice will try to sound alarm on its next action
		if ( pIce.m_nType === ICE_GATEWAY || pIce.m_nType === ICE_GUARDIAN || pIce.m_nType === ICE_TAPEWORM ) {
			// These ICE should always be in home node. If not, move there
			if (pIce.m_pCurrentNode === pIce.m_pHomeNode) {
				// ICE is home. Set to hostile guarding
				pIce.m_nState = STATE_GUARDING_H;
			} else {
				// ICE is not home. Set to moving
				pIce.m_nState = STATE_MOVING_H;
				pIce.m_pTargetNode = pIce.m_pHomeNode;
			}
		} else {
			// Attack, trace, and probe will attack
			pIce.m_nState = STATE_ATTACKING;
		}
	});
}

function DoClearTrace() {
	// Send a message
	MV.l_MessageView.AddMessage("Trace has been cancelled.", BLUE);

	// Clear the trace data
	g_pChar.m_pTraceIce = null;

	// Update the bar
	MV.UpdateBar(BAR_TRACE);
}

function DoRemoveProgram(pProgram) {
	// Check to see if this was a default/active program
	if (pProgram === g_pChar.m_pDefAttackProgram) {
		g_pChar.m_pDefAttackProgram = null;
		MV.UpdateControls();
	} else if (pProgram === g_pChar.m_pActiveArmor) {
		g_pChar.m_pActiveArmor = null;
		MV.UpdateActiveBar();
	} else if (pProgram === g_pChar.m_pActiveShield) {
		g_pChar.m_pActiveShield = null;
		MV.UpdateBar(BAR_SHIELD);
		MV.UpdateActiveBar();
	} else if (pProgram === g_pChar.m_pActiveHide) {
		g_pChar.m_pActiveHide = null;
		MV.UpdateActiveBar();
	} else if (pProgram === g_pChar.m_pActiveScan) {
		g_pChar.m_pActiveScan = null;
		MV.UpdateNodeIcons();
	} else if (pProgram === g_pChar.m_pActiveReflect) {
		g_pChar.m_pActiveReflect = null;
		MV.UpdateActiveBar();
	} else if (pProgram === g_pChar.m_pActiveBoost) {
		g_pChar.m_pActiveBoost = null;
		MV.UpdateActiveBar();
	} else if (pProgram.m_nClass === PROGRAM_CLIENT && g_pChar.m_nClientProgramStatus !== 0) {
		g_pChar.m_nClientProgramStatus = 0;
		MV.UpdateNodeIcons();
	}

	// Recalculate the deck load
	g_pChar.calcCurrentLoad();

	// Update the program controls
	MV.SoftwareListUpdate();
}

function DoSetAlert(pIce, nAlertLevel) {
	// If the node is silenced, we cannot set an alarm
	if (pIce !== null && pIce.m_pCurrentNode.m_nActiveSilenceLevel) {
		// Automatically set ice to hostile
		if (pIce.m_pCurrentNode === g_pChar.m_pCurrentNode)
			MarkIceAsHostile();
		return;
	}

	// If we already are at red alert, ignore
	if (g_pChar.m_pSystem.m_nAlert === ALERT_RED) {
		// If the ice is in the same node as the player, or if the ice is chasing the player,
		// then route the IC to the player's node
		if (pIce === null || pIce.m_pCurrentNode === g_pChar.m_pCurrentNode) {
			g_pChar.m_pSystem.RouteResponseIC(g_pChar.m_pCurrentNode);
			MarkIceAsHostile();
		}
		return;
	}

	// New alert depends on current alert and requested alert
	if (g_pChar.m_pSystem.m_nAlert === ALERT_GREEN && nAlertLevel === ALERT_YELLOW) {
		// Do a yellow alert only
		MV.PlayGameSound(SOUND_YELLOWALERT);
		g_pChar.m_pSystem.m_nAlert = ALERT_YELLOW;

		// Send a message
		if (pIce !== null)
			MV.l_MessageView.AddMessage(pIce.m_szName+" in node "+pIce.m_pCurrentNode.m_szName+" signals a yellow alert.", ORANGE);
	} else {
		// Do a red alert
		MV.PlayGameSound(SOUND_REDALERT);
		g_pChar.m_pSystem.m_nAlert = ALERT_RED;

		// Set flag that alert was set
		g_pChar.m_dwRunFlags |= CRF_ALARMS_SET;

		// Send a message
		if (pIce !== null)
			MV.l_MessageView.AddMessage(pIce.m_szName+" in node "+pIce.m_pCurrentNode.m_szName+" signals a red alert!", RED);

		// Activate all IC
		g_pChar.m_pSystem.m_olIceList.forEach(pIce2 => {
			if (pIce2.m_nState === STATE_INACTIVE) {
				// Activate this ice
				pIce2.m_nState = STATE_GUARDING;
			}
		});

		// Send the response IC to the ice's node.
		if (pIce !== null)
			g_pChar.m_pSystem.RouteResponseIC(pIce.m_pCurrentNode);
		else
			g_pChar.m_pSystem.RouteResponseIC(g_pChar.m_pCurrentNode);

		// Mark the ice as hostile
		if (pIce === null || pIce.m_pCurrentNode === g_pChar.m_pCurrentNode)
			MarkIceAsHostile();
	}

	// Show the graphic
	if (pIce !== null && pIce.m_pCurrentNode === g_pChar.m_pCurrentNode)
		MV.l_NodeView.DrawAlert(pIce);

	// Do the graphic
	MV.l_abAlert.RedrawWindow();
}


function DoDumpDecker(nCause) {
	let nSound;
	let szTxt;
	let bTrace = false;

	//-----------------------
	// Show the dump message
	//-----------------------
	switch (nCause) {
		case DUMP_DECK_DAMAGE:
			nSound = SOUND_DUMPDECKDAMAGE;
			szTxt = "You have been dumped!";
			if (g_pChar.m_pTraceIce !== null && g_pChar.m_pTraceIce.m_nSubType !== TST_NORMAL && g_pChar.m_bTraced)
				bTrace = true;
			break;
		case DUMP_UNCONS:
			nSound = SOUND_DUMPUNCONSCIOUS;
			szTxt = "You have fallen unconscious, and been dumped!";
			if (g_pChar.m_pTraceIce !== null && g_pChar.m_pTraceIce.m_nSubType !== TST_NORMAL && g_pChar.m_bTraced)
				bTrace = true;
			break;
		case DUMP_DEATH:
			nSound = SOUND_DUMPDEATH;
			if (g_pChar.m_nHardware[HW_BIO_MONITOR] >= 2) {
				// Saved by autodump
				szTxt = "You have been saved by your BioMonitor's AutoDump.";
				g_pChar.m_nHealthPhysical = 1;
			} else {
				// Death!
				Popup.alert("You have died!\n(Does anyone smell grey matter burning?)").then(() => {
					Popup.closeAll();
					Popup.welcome();
				});
				return;
			}
			break;
		case DUMP_TRACE:
			nSound = SOUND_DUMPTRACE;
			szTxt = "An extended trace has completed and you have been dumped as a result.";
			bTrace = true;
			break;
		case DUMP_TRACE_FRY:
			nSound = SOUND_DUMPTRACE;

			// Choose a random chip
			let iChip = Random(NUM_CHIPS);

			// If chip is already 0, no chance to fry
			let iSuccess;
			if (g_pChar.m_nChip[iChip] !== 0) {
				// Calculate the target number
				// Note that this is a roll of purely ICE vs (chip + surge protector)
				let iTargetNumber = 10 - g_pChar.m_pTraceIce.GetEffectiveRating(RATING_COMBAT, false) + (g_pChar.m_nChip[iChip] + g_pChar.m_nHardware[HW_SURGE_SUPP]);

				// Roll the die
				iSuccess = DoDieRoll(iTargetNumber);
			} else  {
				iSuccess = 0;
			}

			if (iSuccess < 1) {
				// Fry was unsuccessful
				szTxt = "An extended trace has completed and you have been dumped as a result.";
			} else {
				if (iSuccess > g_pChar.m_nChip[iChip])
					iSuccess = g_pChar.m_nChip[iChip];

				szTxt = "An extended trace has completed and you have been dumped as a result. In addition, your "+GetChipName(iChip)+" chip has been fried. The rating has been reduced by "+iSuccess+".";
				g_pChar.m_nChip[iChip] -= iSuccess;
			}
			bTrace = true;
			break;
		case DUMP_SYS_CRASH:
			nSound = SOUND_DUMPSYSCRASH;
			szTxt = "You have crashed the system.";
			break;
		case DUMP_SYS_OFFLINE:
			nSound = SOUND_DUMPSYSOFFLINE;
			szTxt = "The system has been taken offline due to an intruder alert.";
			break;
		case DUMP_DISCONNECT:
			nSound = SOUND_DUMPDISCONNECT;
			szTxt = "You have disconnected from the matrix.";
			break;
	}

	MV.PlayGameSound(nSound);
	// finish pending animations before continuing
	Anim.run(() => {
		Popup.alert(szTxt).then(() => {
			DoDumpDecker_2(nCause, bTrace);
		});
	});
}
function DoDumpDecker_2(nCause, bTrace) {
	//----------------------------
	// Check for completed traces
	//----------------------------
	// If trace completed, there is a 10% chance per system level of calling police
	let szTxt = null;
	if (bTrace) {
		// Check for Anti-trace Proxy
		if (g_pChar.m_nHardware[HW_PROXY]) {
			g_pChar.m_nHardware[HW_PROXY] = 0;

			szTxt = "An extended trace was completed against you. Your AntiTrace Proxy has destroyed itself to defeat the trace.";
		} else if (Random(10) <= Math.floor(g_pChar.m_pSystem.m_nCorporation/5)) {
			if (g_pChar.m_nLifestyle === LS_STREET)
				szTxt = "The police have been sent to arrest you. You are forced to abandon your home to avoid capture.";
			else
				szTxt = "The police have been sent to arrest you. You are forced to abandon your home to avoid capture.\nYour lifestyle has dropped to poverty.";

			g_pChar.m_nLifestyle = 0;

			// Clear all contracts, then generate new ones based on new lifestyle
			g_pChar.ClearContracts();
			g_pChar.GenerateContracts();
		}
	}

	if (szTxt)
		Popup.alert(szTxt).then(() => { DoDumpDecker_3(nCause) });
	else
		DoDumpDecker_3(nCause);
}
function DoDumpDecker_3(nCause) {
	//-------------------
	// Check for success
	//-------------------
	// Compute the results of the run
	let [szOverall, szBreakdown, nResult] = GetContractStatus(false, (nCause === DUMP_SYS_CRASH));

	// We now have success/failure. Compute other things

	// Get total values of files
	let nFileValue = 0;
	g_pChar.m_pSystem.BuildFileList(false).forEach(pFile => {
		if ((pFile.m_nState & STATE_IN_DECK) && !(pFile.m_nState & STATE_EDITED_D)) {
			// File is downloaded unedited. What type is it?
			if (pFile.m_nType === FT_VALUABLE) {
				// Just add to credits
				nFileValue += pFile.m_nValue;
			} else if (pFile.m_nType === FT_PROGRAM) {
				// Add the program to the deck
				let pProgram = Program.create(pFile.m_nContents, pFile.m_nValue);
				g_pChar.m_olSoftware.push(pProgram);
			} else if (pFile.m_nType === FT_P_SOURCE) {
				let pSource = new Source;
				pSource.m_nType = IT_SOFTWARE;
				pSource.m_nClass = pFile.m_nContents;
				pSource.m_nRating = pFile.m_nValue;
				g_pChar.m_olSourceCode.push(pSource);
			} else if (pFile.m_nType === FT_C_SOURCE) {
				let pSource = new Source;
				pSource.m_nType = IT_CHIP;
				pSource.m_nClass = pFile.m_nContents;
				pSource.m_nRating = pFile.m_nValue;
				g_pChar.m_olSourceCode.push(pSource);
			}
		}
	});

	// Compute the effects on reputation, skill points, and money
	let nPay = 0;
	let nSkillPoints = 0;
	let nRepChange = 0;
	if (nResult === -1) {
		// Lose points equal to run
		g_pChar.m_nRepPoints -= g_pChar.m_pCurrentContract.m_nDifficulty;
		if (g_pChar.m_nRepPoints < 0)
			g_pChar.m_nRepPoints = 0;

		if (g_pChar.m_nRepLevel>0 && g_pChar.m_nRepPoints < CalcRepPointsForNextLevel(g_pChar.m_nRepLevel-1)) {
			g_pChar.m_nRepLevel--;
			nRepChange = -1;
		}
	} else if (nResult === 0) {
		// Lose points equal to run/2
		g_pChar.m_nRepPoints -= Math.floor(g_pChar.m_pCurrentContract.m_nDifficulty/2);
		if (g_pChar.m_nRepPoints < 0)
			g_pChar.m_nRepPoints = 0;

		if (g_pChar.m_nRepLevel>0 && g_pChar.m_nRepPoints < CalcRepPointsForNextLevel(g_pChar.m_nRepLevel-1)) {
			g_pChar.m_nRepLevel--;
			nRepChange = -1;
		}
	} else { //if (nResult === 1)
		nPay = g_pChar.m_pCurrentContract.m_nPay;

		// Old way was  Points = Diff - (Skill - Diff). This gives away too many points
		// for low difficulty missions at higher skill levels.
		//nSkillPoints = 1 + (2 * g_pChar.m_pCurrentContract.m_nDifficulty) - g_pChar.GetEffectiveLevel();
		//if (nSkillPoints<0) nSkillPoints = 0;

		// New method is Diff - 25% per level below skill
		nSkillPoints = g_pChar.m_pCurrentContract.m_nDifficulty;
		let iDiff = g_pChar.GetEffectiveLevel() - g_pChar.m_pCurrentContract.m_nDifficulty;
		if (iDiff === 1) {
			// One level below: 75%
			nSkillPoints -= Math.floor(nSkillPoints/4);
		} else if (iDiff === 2) {
			// Two levels below: 50%
			nSkillPoints = Math.floor(nSkillPoints/2);
		} else if (iDiff === 3) {
			// Three levels below: 25%
			nSkillPoints = Math.floor(nSkillPoints/4);
		} else if (iDiff>=4) {
			// Four or more levels below: 0
			nSkillPoints = 0;
		}

		g_pChar.m_nRepPoints += g_pChar.m_pCurrentContract.m_nDifficulty;
		let nRepForNextLevel = CalcRepPointsForNextLevel(g_pChar.m_nRepLevel);
		if (g_pChar.m_nRepPoints >= nRepForNextLevel) {
			// Make sure we are not capped
			if (g_pChar.m_nRepLevel < (g_pChar.m_nLifestyle+1) * 4) {
				g_pChar.m_nRepLevel++;
				nRepChange = 1;
			} else {
				g_pChar.m_nRepPoints = (nRepForNextLevel - 1);
				nRepChange = 2;
			}
		} else {
			nRepChange = 0;
		}
	}
	let nTotal = nFileValue + nPay;

	// Update the character information
	g_pChar.m_nSkillPoints += nSkillPoints;
	g_pChar.m_nCredits += nTotal;

	// Fill in the dialog
	let dlgResult = {};
	dlgResult.m_contract = g_pChar.m_pCurrentContract.GetTypeText();
	dlgResult.m_summary = szBreakdown;
	dlgResult.m_result = szOverall;
	dlgResult.m_pay = nPay;
	dlgResult.m_total = nTotal;
	dlgResult.m_files = nFileValue;
	dlgResult.m_skill_pts = nSkillPoints;
	if (nRepChange === 0)
		dlgResult.m_rep = "No change";
	else if (nRepChange === 1)
		dlgResult.m_rep = "Raised to " + g_szRepLevelString[g_pChar.m_nRepLevel];
	else if (nRepChange === 2)
		dlgResult.m_rep = "Capped at " + g_szRepLevelString[g_pChar.m_nRepLevel];
	else
		dlgResult.m_rep = "Falls to " + g_szRepLevelString[g_pChar.m_nRepLevel];

	Popup.results(dlgResult).then(() => { DoDumpDecker_4(nResult) });
}
function DoDumpDecker_4(nResult) {
	// Set system alerts, if necessary
	if (g_pChar.m_pSystem.m_nAlert === ALERT_YELLOW) {
		// Stay in yellow for one day per (level/5)
		g_pChar.m_bSystemAlerts[g_pChar.m_pSystem.m_nCorporation] = Math.ceil(g_pChar.m_pSystem.m_nRating/5) + 1;
	} else if (g_pChar.m_pSystem.m_nAlert === ALERT_RED) {
		// Stay in yellow for one week per (level/5)
		g_pChar.m_bSystemAlerts[g_pChar.m_pSystem.m_nCorporation] = Math.ceil(g_pChar.m_pSystem.m_nRating/5) * 7 + 1;
	} else {
		// Leaving in green, so leave it that way
		g_pChar.m_bSystemAlerts[g_pChar.m_pSystem.m_nCorporation] = 0;
	}

	// Delete the current contract if failed or succeeded
	if (nResult !== 0)
		g_pChar.ClearCurrentContract();

	// Delete the system
	g_pChar.m_pSystem = null;
	g_pChar.m_olCurrentIceList = [];
	g_pChar.m_bOnRun = false;

	// Close this window, go back home
	Popup.close();
	Popup.homeview();

	// Let some time pass //FSO 7-24-01 Changed to 1 day
	g_pChar.PassTime(1, () => {
		//FSO 7-24-01
		// If contract was completed successfully, add a new one
		if (nResult === 1) {
			// Add a new contract
			let pContract = new Contract;
			pContract.Generate();
			g_pChar.m_olContracts.push(pContract);
		}
	});
}



function DoEndPlayerTurn() {
	let szTxt;

	// Update target ice health
	MV.UpdateTargetInfo();

	//------------------
	// Handle transfers
	//------------------
	if (g_pChar.m_pTransferProgram !== null) {
		// Decrement the transfer time
		g_pChar.m_nTransferTurnsLeft--;

		// Check for completion
		if (g_pChar.m_nTransferTurnsLeft === 0) {
			MV.l_MessageView.AddMessage("Program "+g_pChar.m_pTransferProgram.m_szName+" has finished loading.", BLUE);

			// Adjust the loaded rating
			g_pChar.m_pTransferProgram.m_nLoadedRating = g_pChar.m_pTransferProgram.m_nRating;

			// In case we loaded something, recalculate
			g_pChar.calcCurrentLoad();

			// In case we are reloading the active shield, update the bar
			MV.UpdateBar(BAR_SHIELD);

			MV.PlayGameSound(SOUND_PROGRAMLOADED);

			// Add/update the program
			MV.SoftwareListUpdate();

			g_pChar.m_pTransferProgram = null;
		}
	} else if (g_pChar.m_pTransferFile !== null) {
		// Decrement the transfer time
		g_pChar.m_nTransferTurnsLeft--;

		// Check for completion
		if (g_pChar.m_nTransferTurnsLeft === 0) {
			// Transfer complete
			if (g_pChar.m_nFileTransferType === FO_EDIT) {
				// Edit complete
				MV.PlayGameSound(SOUND_EDITCOMPLETE);
				szTxt = "File "+g_pChar.m_pTransferFile.m_szName+" has been edited.";
				g_pChar.m_pTransferFile.m_nState |= STATE_EDITED_N;
			} else {
				// Download complete
				MV.PlayGameSound(SOUND_DOWNLOADCOMPLETE);
				szTxt = "File "+g_pChar.m_pTransferFile.m_szName+" has been downloaded.";
				g_pChar.m_pTransferFile.m_nState |= STATE_IN_DECK;
				if (g_pChar.m_pTransferFile.m_nState & STATE_EDITED_N) {
					// An edited file which is downloaded will have no value (even as a quest item)
					g_pChar.m_pTransferFile.m_nState |= STATE_EDITED_D;
				}
			}
			MV.l_MessageView.AddMessage(szTxt, BLUE);

			g_pChar.m_pTransferFile = null;
		}
	}
	MV.UpdateBar(BAR_TRANSFER);

	//---------------------------
	// Handles scans/evaluations
	//---------------------------
	if (g_pChar.m_pActiveScan !== null) {
		// get all files in order, but shifted so that the current file is first. Will make things easier...
		let curFiles = g_pChar.m_pCurrentNode.m_olFileList.slice(0);
		let p = g_pChar.m_pCurrentNode.m_olFileList.indexOf(g_pChar.m_posScanFile);
		curFiles = curFiles.slice(p).concat( curFiles.slice(0, p-1) );

		// If the current file is not ok, reset progress
		if ( !curFiles[0].IsValidForScanEval(g_pChar.m_pActiveScan.m_nClass) )
			g_pChar.m_nCurrentScanMP = 0;

		// Find first legal scan file
		while ( curFiles.length && !curFiles[0].IsValidForScanEval(g_pChar.m_pActiveScan.m_nClass) )
			curFiles.shift();
		g_pChar.m_posScanFile = curFiles.length ? curFiles[0] : null;
		let pFile = g_pChar.m_posScanFile;

		// If we reached the end, terminate the scan
		if (pFile === null) {
			// No valid files left
			if (g_pChar.m_pActiveScan.m_nClass === PROGRAM_SCAN)
				MV.PlayGameSound(SOUND_SCANCOMPLETE);
			else
				MV.PlayGameSound(SOUND_EVALCOMPLETE);
			MV.l_MessageView.AddMessage(g_pChar.m_pActiveScan.m_szName+" has completed.", BLUE);
			g_pChar.m_pActiveScan = null;
			MV.SoftwareListUpdate();
			MV.UpdateNodeIcons();
		} else {
			// Increment the amount scanned (Rating * 5mp per turn)
			g_pChar.m_nCurrentScanMP += (5 * g_pChar.m_pActiveScan.m_nLoadedRating);

			// Check to see if the file is scanned
			if (pFile.m_nSize <= g_pChar.m_nCurrentScanMP) {
				// Mark file as scanned/evaluated, then get the next file
				if (g_pChar.m_pActiveScan.m_nClass === PROGRAM_SCAN) {
					// Mark file as scanned
					pFile.m_nState |= STATE_SCAN;

					// Send a message
					MV.l_MessageView.AddMessage("File "+pFile.m_szName+" has been scanned. ("+pFile.GetScanString()+")", BLACK);

					// Check for target file //FSO 6-20-01
					if (pFile.m_nType === FT_QUEST) {
						g_pChar.m_pCurrentNode.m_nSpecialImage = NSI_DS_QUEST;
						MV.l_MapView.RedrawWindow();
					}
				} else {
					let szTxt;

					// Mark file as evaluated
					pFile.m_nState |= STATE_EVAL;

					// Process according to type
					if (pFile.m_nType === FT_VALUABLE) {
						// Send a message
						szTxt = "File "+pFile.m_szName+" has been evaluated. ("+pFile.m_nValue+")";
					} else if (pFile.m_nType === FT_CLUE) {
						// Send a message
						let MSGs = g_pChar.m_pSystem.MarkContractNodes();
						MSGs.forEach(msg => MV.l_MessageView.AddMessage(msg, BLUE));
						MV.l_MapView.RedrawWindow();

						szTxt = "File "+pFile.m_szName+" has been evaluated. <Clue>";
					} else if (pFile.m_nType === FT_PASSCODE) {
						g_pChar.m_pSystem.m_bPasscodeAccessed = true;

						MV.l_MessageView.AddMessage("Passcode file accessed!", BLUE);
						szTxt = "File "+pFile.m_szName+" has been evaluated. <Passcode>";
					} else if (pFile.m_nType === FT_PROGRAM) {
						szTxt = "File "+pFile.m_szName+" has been evaluated. <"+GetSoftwareText(pFile.m_nContents, pFile.m_nValue)+">";
					} else if (pFile.m_nType === FT_P_SOURCE) {
						szTxt = "File "+pFile.m_szName+" has been evaluated. <"+GetSoftwareText(pFile.m_nContents, pFile.m_nValue)+" Source>";
					} else if (pFile.m_nType === FT_C_SOURCE) {
						szTxt = "File "+pFile.m_szName+" has been evaluated. <"+GetChipName(pFile.m_nContents)+" "+pFile.m_nValue+" Source>";
					} else {
						console.error("No message for Evaluate program. File Type = "+pFile.m_nType);
					}

					MV.l_MessageView.AddMessage(szTxt, BLACK);
				}

				// Get the next file
				curFiles.shift();
				while ( curFiles.length && !curFiles[0].IsValidForScanEval(g_pChar.m_pActiveScan.m_nClass) )
					curFiles.shift();
				g_pChar.m_posScanFile = curFiles.length ? curFiles[0] : null;

				// See if we are done
				if (g_pChar.m_posScanFile === null) {
					// No valid files left
					if (g_pChar.m_pActiveScan.m_nClass === PROGRAM_SCAN)
						MV.PlayGameSound(SOUND_SCANCOMPLETE);
					else
						MV.PlayGameSound(SOUND_EVALCOMPLETE);

					MV.l_MessageView.AddMessage(g_pChar.m_pActiveScan.m_szName+" has completed.", BLUE);
					g_pChar.m_pActiveScan = null;
					MV.UpdateNodeIcons();
					MV.SoftwareListUpdate();
				} else {
					// Reduce the points scanned for the next file
					g_pChar.m_nCurrentScanMP -= g_pChar.m_posScanFile.m_nSize;
				}
			}
		}
	}

	//-------------------------
	// Handle special programs
	//-------------------------
	if (g_pChar.m_nClientProgramStatus !== 0) {
		// Decrement the timer
		g_pChar.m_nClientProgramStatus--;
		if (g_pChar.m_nClientProgramStatus === 0) {
			// Program complete
			MV.l_MessageView.AddMessage("Client program has completed execution.", BLUE);

			// Mark node as accessed
			g_pChar.m_pCurrentNode.m_bActivated = true;

			// Redraw icon
			MV.l_tProgramList.redraw();
		}
	}

	//-----------------------
	// Handle trace attempts
	//-----------------------
	if (g_pChar.m_pTraceIce !== null) {
		g_pChar.m_nTraceTurnsLeft--;

		if (g_pChar.m_nTraceTurnsLeft === 0) {
			// Trace is complete
			if (g_pChar.m_nTraceType === TST_NORMAL) {
				MV.l_MessageView.AddMessage(g_pChar.m_pTraceIce.m_szName+" has completed its trace. All ice will now be hostile.", RED);
				g_pChar.m_bTraced = true;
				g_pChar.m_pTraceIce = null;

				// Mark ice in current node as hostile
				MarkIceAsHostile();
			} else if (g_pChar.m_nTraceType === TST_DUMP) {
				// Ice dumps the decker
				DoDumpDecker(DUMP_TRACE);
				return;
			} else { //TRACE & FRY
				// Ice gets to randomly fry a chip
				DoDumpDecker(DUMP_TRACE_FRY);
				return;
			}
		}
	}
	MV.UpdateBar(BAR_TRACE);

	//---------------
	// Handle the ICE
	//---------------
	// First, sort according to sensor strength so that the higher rated ICE goes first
	// This allows the strongest (sensor-wise) ice to query the player first. This also
	// allows the strongest trace program to attack first.
	function cmpIce(pIce1,pIce2) {
		if (pIce1.HasQueried()) return -1;
		if (pIce2.HasQueried()) return 1;
		return (pIce2.GetEffectiveRating(RATING_SENSORS, false) - pIce1.GetEffectiveRating(RATING_SENSORS, false));
	}
	g_pChar.m_pSystem.m_olIceList.sort(cmpIce);


	// Now, do the ICE movement
	g_pChar.m_pSystem.m_olIceList.slice(0).forEach(pIce => { // work on a copy, since the array can be modified (ICE dying by themselves)
		// since an ICE can get killed by another, check that this ICE is still alive
		if ( g_pChar.m_pSystem.m_olIceList.indexOf(pIce) === -1 )
			return;

		pIce.DoAction();

		// Reset some ice stuff
		pIce.m_bWasAccessed = false;
	});

	//---------------
	// Handle damage
	//---------------
	// Do mental damage
	g_pChar.m_nHealthMental -= g_pChar.m_nDamageMental;
	MV.UpdateBar(BAR_MENTAL);

	// Check for dump
	if (g_pChar.m_nHealthMental < 1) {
		// Modify physical health
		g_pChar.m_nHealthPhysical += g_pChar.m_nHealthMental;
		MV.UpdateBar(BAR_LETHAL);

		// Dump the decker
		if (g_pChar.m_nHealthPhysical < 1) // FIXME: what if I lose both by mental and deck damage simultaneously? Should I receive both damages?
			DoDumpDecker(DUMP_DEATH);
		else
			DoDumpDecker(DUMP_UNCONS);
		return;
	}

	// Do deck damage
	g_pChar.m_nHealthDeck -= g_pChar.m_nDamageDeck;
	MV.UpdateBar(BAR_DECK);

	if (g_pChar.m_nHealthDeck < 1) {
		// Extra deck damage becomes physical damage
		g_pChar.m_nHealthPhysical += g_pChar.m_nHealthDeck;
		MV.UpdateBar(BAR_LETHAL);

		// Dump the decker
		if (g_pChar.m_nHealthPhysical < 1)
			DoDumpDecker(DUMP_DEATH);
		else
			DoDumpDecker(DUMP_DECK_DAMAGE);
		return;
	}

	// Reset damage
	g_pChar.m_nDamageMental = 0;
	g_pChar.m_nDamageDeck = 0;

	//----------------------
	// Handle node programs
	//----------------------
	g_pChar.m_pSystem.m_olAreaList.forEach(pArea => {
		pArea.m_olNodeList.forEach(pNode => {
			// Check silence
			if (pNode.m_nActiveSilenceLevel) {
				pNode.m_nActiveSilenceLevel--;
				if (pNode.m_nActiveSilenceLevel === 0)
					MV.l_MessageView.AddMessage("Node "+pNode.m_szName+" is no longer silenced.", ORANGE);
			}

			// Check smoke
			if (pNode.m_nActiveSmokeLevel) {
				pNode.m_nActiveSmokeLevel--;
				if (pNode.m_nActiveSmokeLevel === 0)
					MV.l_MessageView.AddMessage("Node "+pNode.m_szName+" is no longer smoked.", ORANGE);
			}
		});
	});

	//-----------------------
	// Handle boost programs
	//-----------------------
	if (g_pChar.m_pActiveBoost !== null) {
		g_pChar.m_pActiveBoost.m_nLoadedRating--;
		if (g_pChar.m_pActiveBoost.m_nLoadedRating === 0) {
			// Crash the program
			MV.l_MessageView.AddMessage("Your boost program "+g_pChar.m_pActiveBoost.m_szName+" has expired.", RED);
			DoRemoveProgram(g_pChar.m_pActiveBoost);
			MV.UpdateActiveBar();
		} else {
			// Just update it
			MV.l_tProgramList.redraw();
		}
	}

	//---------------------------
	// Check for system shutdown
	//---------------------------
	// If the system is in red alert and the external alarm system has not been deactivated,
	// then there is a chance that the system may be taken offline.
	if (g_pChar.m_pSystem.m_nAlert === ALERT_RED && g_pChar.m_pSystem.m_nTurnsUntilCrash === 0 && !g_pChar.m_pSystem.m_bExternalAlarmsDeactivated) {
		// Chance of shutdown relative to system level - .1% per system rating per turn
		if (Random(1000) < g_pChar.m_pSystem.m_nRating) {
			// System alert has been noticed. System will be taken offline in 15*#Areas seconds (turns)
			MV.PlayGameSound(SOUND_SHUTDOWN_COMMENCE);

			g_pChar.m_pSystem.m_nTurnsUntilCrash = Math.ceil(g_pChar.m_pSystem.m_nRating/4) * 15;
			MV.l_MessageView.AddMessage("System shutdown commencing. System will be offline in "+g_pChar.m_pSystem.m_nTurnsUntilCrash+" seconds.", RED);
			MV.l_abAlert.RedrawWindow();
		}
	} else if (g_pChar.m_pSystem.m_nTurnsUntilCrash) {
		// Check for shutdown in progress
		g_pChar.m_pSystem.m_nTurnsUntilCrash --;

		if (g_pChar.m_pSystem.m_nTurnsUntilCrash === 30)
			MV.l_MessageView.AddMessage("30 seconds until system shutdown.", RED);
		else if (g_pChar.m_pSystem.m_nTurnsUntilCrash === 10)
			MV.l_MessageView.AddMessage("10 seconds until system shutdown.", RED);
		else if (g_pChar.m_pSystem.m_nTurnsUntilCrash === 0) {
			// Time for shutdown
			DoDumpDecker(DUMP_SYS_OFFLINE);
			return;
		}
	}

	//-------------------------
	// Handle ICE reactivation
	//-------------------------
	if (g_pChar.m_pSystem.m_olDeadIceList.length > 0) {
		// Check the reactivate time
		if (g_pChar.m_pSystem.m_nIceReactivateTime === 0) {
			// Reset it
			g_pChar.m_pSystem.SetReactivateTime(false);
		} else {
			// Just decrement
			g_pChar.m_pSystem.m_nIceReactivateTime--;

			if (g_pChar.m_pSystem.m_nIceReactivateTime === 0) {
				// Time to reactivate something
				for (;;) {
					// Remove the lead ice from the list
					let pIce = g_pChar.m_pSystem.m_olDeadIceList.shift();

					// See if his area ice portal is active
					if (pIce.m_pHomeNode.m_pParentArea.m_pIceIONode !== null) {
						// Activate this ice
						pIce.m_nHealth = MAX_HEALTH;
						pIce.m_bBypassed = false;
						pIce.m_nSlowLevel = 0;
						pIce.m_bSkippedLastTurn = false;
						pIce.m_nConfusionLevel = 0;
						pIce.m_nWeakenLevel = false;
						pIce.m_nVirusLevel = false;
						pIce.m_pCurrentNode = pIce.m_pHomeNode.m_pParentArea.m_pIceIONode;
						if (pIce.m_nType === ICE_PROBE || pIce.m_bResponse)
							pIce.m_nState = STATE_SEARCHING;
						else
							pIce.m_nState = STATE_MOVING;
						pIce.m_bWasAccessed = false;
						pIce.m_pTargetNode = pIce.m_pHomeNode;

						g_pChar.m_pSystem.m_olIceList.push(pIce);

						pIce.DoMove(DIR_NONE);
						break;
					} else {
						// Forget about this ice
					}

					// If the ice list is empty, we are done
					if (g_pChar.m_pSystem.m_olDeadIceList.length === 0)
						break;
				}

				// If the dead ice list is not empty, reset the time
				if (g_pChar.m_pSystem.m_olDeadIceList.length > 0)
					g_pChar.m_pSystem.SetReactivateTime(true);
			}
		}
	}

	//--------------
	// Handle clock
	//--------------
	g_pChar.m_nRunTime++;
	MV.l_cvClock.update();

	//--------------------
	// Update other items
	//--------------------
	// Enable the buttons
	MV.UpdateControls();
	MV.UpdateTargetInfo(); // In case ice was harmed by virus or confusion
	MV.UpdateNodeIcons();
	MV.l_MessageView.AddSeparator();

	Anim.run();
}



function AttemptNodeAccess() {
	// See if there is a guardian or active black ice present
	let pGuardIce = null;
	g_pChar.m_olCurrentIceList.forEach(pIce => {
		// Is this a guardian
		if (pIce.m_nType === ICE_GUARDIAN && pIce.m_pHomeNode === pIce.m_pCurrentNode) {
			// Always use guardian ice if present
			pGuardIce = pIce;
		} else if (pIce.m_nState === STATE_GUARDING && pIce.m_nType === ICE_ATTACK) {
			// Use the highest rated guarding black ice only if no guardian is present
			if ( pGuardIce !== null && pGuardIce.m_nType === ICE_GUARDIAN ) return;

			// This is a guarding black ice. Use the highest rated if no guardian is present
			if ( pGuardIce === null || pGuardIce.GetEffectiveRating(RATING_SENSORS, false) < pIce.GetEffectiveRating(RATING_SENSORS, false) )
				pGuardIce = pIce;
		}
	});

	// If no ice, or if we have bypassed it, we can access
	if (pGuardIce === null || pGuardIce.m_bBypassed)
		return true;

	// See if there is a hide program active
	if (g_pChar.m_pActiveHide === null) {
		MV.l_MessageView.AddMessage(pGuardIce.m_szName+" blocks your access.", BLACK);
	} else {
		// Try to use the hide program to bypass the ice
		if (DoRunProgramVsIce(g_pChar.m_pActiveHide, pGuardIce)) {
			// Hide succeeded. Print out a message saying so
			MV.l_MessageView.AddMessage(pGuardIce.m_szName+" was successfully bypassed by the "+g_pChar.m_pActiveHide.m_szName+" program.", BLACK);
			return true;
		} else {
			// We failed. Print out a message saying so
			MV.l_MessageView.AddMessage(pGuardIce.m_szName+" was not fooled by "+g_pChar.m_pActiveHide.m_szName+" program.", BLACK);
			pGuardIce.m_bWasAccessed = true;
		}
	}
	return false;
}

function DoMove(nDir) {
	// Make sure that direction is open
	if (g_pChar.m_pCurrentNode.m_pAdjNode[nDir] === null)
		return;

	// See if there is ICE blocking this direction. Find the gateway guarding the corresponding direction, if any
	let pIce = g_pChar.m_olCurrentIceList.find(p => p.m_nType === ICE_GATEWAY && p.m_nSubType === nDir && p.m_pHomeNode === p.m_pCurrentNode);
	if (pIce && !pIce.m_bBypassed) {
		// There is a undeceived gateway
		// If we have a HIDE program active, try it
		if (g_pChar.m_pActiveHide !== null) {
			// Try to use the hide program to bypass the ice
			if (DoRunProgramVsIce(g_pChar.m_pActiveHide, pIce)) {
				// Hide succeeded. Print out a message saying so
				MV.l_MessageView.AddMessage(pIce.m_szName+" was successfully bypassed by the "+g_pChar.m_pActiveHide.m_szName+" program.", BLACK);

				// Continue on to move code below.
			} else {
				// We failed. Print out a message saying so
				MV.l_MessageView.AddMessage(pIce.m_szName+" was not fooled by the "+g_pChar.m_pActiveHide.m_szName+" program.", BLACK);
				pIce.m_bWasAccessed = true;

				DoEndPlayerTurn();
				return;
			}
		} else {
			// Put out a message and mark the ice as needing to query
			MV.l_MessageView.AddMessage(pIce.m_szName+" blocks you passage.", BLACK);

			DoEndPlayerTurn();
			return;
		}
	}

	DoLeaveNode();
	MV.PlayGameSound(SOUND_MOVE);
	DoEnterNode(g_pChar.m_pCurrentNode.m_pAdjNode[nDir], OppDir(nDir));

	// End the turn
	DoEndPlayerTurn();
}

function DoLeaveNode() {
	// Cancel any file transfer in progress (but not programs)
	if (g_pChar.m_pTransferFile !== null) {
		g_pChar.m_pTransferFile = null;
		MV.l_MessageView.AddMessage("File transfer cancelled.", BLACK);
		MV.UpdateBar(BAR_TRANSFER);
	}

	// Cancel any scan/eval in progress
	if (g_pChar.m_pActiveScan !== null) {
		g_pChar.m_pActiveScan = null;
		MV.UpdateNodeIcons();
	}

	// Cancel any client program execution
	if (g_pChar.m_nClientProgramStatus !== 0) {
		g_pChar.m_nClientProgramStatus = 0;
		MV.l_MessageView.AddMessage("Client program execution cancelled.", BLACK);
		MV.UpdateNodeIcons();
	}

	// Change the state of all ice in the node we are leaving
	g_pChar.m_olCurrentIceList.forEach(pIce => {
		switch (pIce.m_nState) {
			case STATE_MOVING:
				// Black ice moving. If not bypassed, they will want to query
				if (!pIce.m_bBypassed)
					pIce.m_nState = STATE_SEARCHING;
				break;
			case STATE_GUARDING_H:
				// Change them back to guarding
				pIce.m_nState = STATE_GUARDING;
				break;
			// All others stay the same
		}
	});
}

function DoEnterNode(pNode, nDirFrom) {
	// Generate a location for the player, and put him in it
	g_pChar.m_ptNodeLoc = pNode.ChooseLocation(nDirFrom);
	g_pChar.m_pCurrentNode = pNode;

	// Choose locations for decoys
	for (let i=0; i<g_pChar.m_nDecoyCount; i++)
		g_pChar.m_ptDecoyLocation[i] = pNode.ChooseLocation(nDirFrom);

	// Clear the targetted ice
	g_pChar.m_pTargettedIce = null;
	MV.UpdateTargetInfo();

	// Clear the highest deceived ICE
	g_pChar.m_nHighestDeceivedIce = 0;

	// Mark the node as mapped
	g_pChar.m_pCurrentNode.m_bMapped = true;

	// If mapper hardware installed, mark adjacent nodes as mapped
	if (g_pChar.m_nHardware[HW_MAPPER]>0)
		for (let i = 0; i < 4; i++)
			if (g_pChar.m_pCurrentNode.m_pAdjNode[i] !== null)
				g_pChar.m_pCurrentNode.m_pAdjNode[i].m_bMapped = true;

	// Build an ICE list for the node
	g_pChar.m_olCurrentIceList = [];
	g_pChar.m_pSystem.m_olIceList.forEach(pIce => {
		if (pIce.m_pCurrentNode === pNode) {
			g_pChar.m_olCurrentIceList.push(pIce);

			// Reset some flags on the ICE
			pIce.m_bWasAccessed = false;
			pIce.m_bBypassed = false;
		}
	});

	// If we have been traced, mark the ice as hostile
	if (g_pChar.m_bTraced)
		MarkIceAsHostile();

	// Update the node access buttons
	MV.UpdateNodeAccessButtons();

	// Output a message
	MV.l_MessageView.AddMessage("Entering node "+pNode.m_szName+".", BLACK);

	// Redraw the node
	MV.l_NodeView.RedrawWindow();

	// Redraw the map
	MV.l_MapView.DoMove();

	// Redraw the node name
	MV.l_nbNodeName.set(g_pChar.m_pCurrentNode.m_szName);

	// Update the controls
	MV.UpdateControls();
}

// game_actions.js


function OnMapZoom() {
	MV.l_MapView.DoZoom();
}



function OnNextTarget(backwards) {
	// if no ice present, do nothing
	if (!g_pChar.m_olCurrentIceList.length) return;

	// get current ice index
	let i = g_pChar.m_olCurrentIceList.indexOf(g_pChar.m_pTargettedIce);

	// move the index, careful to not go off the list
	if (backwards) {
		i -= 1;
		if (i < 0) i = g_pChar.m_olCurrentIceList.length-1;
	} else {
		i += 1;
		if (i >= g_pChar.m_olCurrentIceList.length) i = 0;
	}

	// set it
	g_pChar.m_pTargettedIce = g_pChar.m_olCurrentIceList[i];

	MV.l_NodeView.Retarget();
	MV.UpdateTargetInfo();
	Anim.run();
}



function OnRunProgram() {
	let pProgram = MV.l_tProgramList.getSelected();
	if (!pProgram) return;
	DoRunProgram(pProgram);
}
function OnSetDefProgram() {
	// Get the selected program
	let pProgram = MV.l_tProgramList.getSelected();
	if (pProgram === null) return;

	// Set the new program as the default
	g_pChar.m_pDefAttackProgram = pProgram;

	// Change the image
	MV.l_tProgramList.redraw();

	MV.UpdateControls();
	Anim.run();
}
function OnLoadProgram() {
	Popup.transfer().onYes(() => {
		// Note - bar will update at DoEndPlayerTurn
		//MV.UpdateBar(BAR_TRANSFER);
		MV.l_MessageView.AddMessage("Transfer started.",BLACK);
		DoEndPlayerTurn();
	});
}
function OnStopProgram() {
	// Get the selected program
	let pProgram = MV.l_tProgramList.getSelected();
	if (pProgram === null) return;

	if (pProgram === g_pChar.m_pActiveArmor) {
		g_pChar.m_pActiveArmor = null;
		MV.UpdateActiveBar();
	} else if (pProgram === g_pChar.m_pActiveShield) {
		g_pChar.m_pActiveShield = null;
		MV.UpdateBar(BAR_SHIELD);
		MV.UpdateActiveBar();
	} else if (pProgram === g_pChar.m_pActiveHide) {
		g_pChar.m_pActiveHide = null;
		MV.UpdateActiveBar();
	} else if (pProgram === g_pChar.m_pActiveScan) {
		g_pChar.m_pActiveScan = null;
		MV.UpdateNodeIcons();
	} else if (pProgram === g_pChar.m_pActiveReflect) {
		g_pChar.m_pActiveReflect = null;
		MV.UpdateActiveBar();
	} else if (pProgram === g_pChar.m_pActiveBoost) {
		g_pChar.m_pActiveBoost = null;
		MV.UpdateActiveBar();
	} else
		return;

	MV.PlayGameSound(SOUND_STOPROGRAM);
	MV.l_MessageView.AddMessage(pProgram.m_szName+" stopped.", BLUE);

	// Update the program controls
	MV.SoftwareListUpdate();

	Anim.run();
}
function OnUnloadProgram() {
	// Get the selected program
	let pProgram = MV.l_tProgramList.getSelected();
	if (pProgram === null) return;

	MV.PlayGameSound(SOUND_UNLOADPROGRAM);

	pProgram.m_nLoadedRating = 0;
	MV.l_MessageView.AddMessage(pProgram.m_szName+" unloaded.", BLUE);
	DoRemoveProgram(pProgram);

	Anim.run();
	DoEndPlayerTurn();
}



function OnMoveN() {
	if ( MV.l_bmbButton[1].isEnabled() )
		DoMove(DIR_NORTH);
}
function OnMoveE() {
	if ( MV.l_bmbButton[5].isEnabled() )
		DoMove(DIR_EAST);
}
function OnMoveS() {
	if ( MV.l_bmbButton[7].isEnabled() )
		DoMove(DIR_SOUTH);
}
function OnMoveW() {
	if ( MV.l_bmbButton[3].isEnabled() )
		DoMove(DIR_WEST);
}

function OnWait() {
	DoEndPlayerTurn();
}



function OnViewChar() { Popup.charview(); }
function OnViewDeck() { Popup.deckview(); }
function OnViewContract() { Popup.contract(); }



function OnGetFile() {
	if (!AttemptNodeAccess()) {
		DoEndPlayerTurn();
	} else {
		Popup.fileaccess(FO_GET).onYes(() => {
			MV.PlayGameSound(SOUND_DOWNLOADFILE);
			MV.l_MessageView.AddMessage("Transfer started.",BLACK);
			DoEndPlayerTurn();
		});
	}
}
function OnEditFile() {
	if (!AttemptNodeAccess()) {
		DoEndPlayerTurn();
	} else {
		Popup.fileaccess(FO_EDIT).onYes(() => {
			MV.PlayGameSound(SOUND_EDITFILE);
			MV.l_MessageView.AddMessage("Transfer started.",BLACK);
			DoEndPlayerTurn();
		});
	}
}
function OnEraseFile() {
	if (!AttemptNodeAccess()) {
		DoEndPlayerTurn();
	} else {
		Popup.fileaccess(FO_ERASE).onYes(() => {
			MV.PlayGameSound(SOUND_ERASEFILE);
			MV.l_MessageView.AddMessage("File erased.",BLACK);
			DoEndPlayerTurn();
		});
	}
}


function OnUseIO() {
	if (AttemptNodeAccess()) {
		MV.PlayGameSound(SOUND_USEIO);

		// Process depending on type
		switch (g_pChar.m_pCurrentNode.m_nSubType) {
			case NST_IO_ALARM:
				MV.l_MessageView.AddMessage("External alarms have been deactivated.", BLUE);
				g_pChar.m_pSystem.m_bExternalAlarmsDeactivated = true;
				g_pChar.m_pCurrentNode.m_bActivated = true;
				break;
			case NST_IO_ICE_PORT:
				MV.l_MessageView.AddMessage("Ice port has been closed. No reinforcements will appear.", BLUE);
				g_pChar.m_pCurrentNode.m_pParentArea.m_pIceIONode = null;
				g_pChar.m_pCurrentNode.m_bActivated = true;
				break;
			case NST_IO_MATRIX:
				MV.l_MessageView.AddMessage("Connection made to deck. High speed I/O now available in this area.", BLUE);
				g_pChar.m_pCurrentNode.m_bActivated = true;
				break;
			case NST_IO_QUEST_NODE:
				if (g_pChar.m_pCurrentContract.m_nType !== CONT_RUN_PROGRAM) {
					let szTxt;
					if (g_pChar.m_pCurrentContract.m_nType === CONT_DEACTIVATE_IO)
						szTxt = "You have deactivated the "+g_pChar.m_pCurrentContract.GetTargetObjectText()+".";
					else if (g_pChar.m_pCurrentContract.m_nType === CONT_ACTIVATE_IO)
						szTxt = "You have activated the "+g_pChar.m_pCurrentContract.GetTargetObjectText()+".";
					else //CONT_SABOTAGE_IO
						szTxt = "You have sabotaged the "+g_pChar.m_pCurrentContract.GetTargetObjectText()+".";

					MV.l_MessageView.AddMessage(szTxt, BLUE);
					g_pChar.m_pCurrentNode.m_bActivated = true;
					break;
				}
				// Else this is a run-program node, so fall through
			default:
				// Useless node. Chance of setting alarm
				if (Random(3)===0) {
					// Set an alert
					MV.l_MessageView.AddMessage("You have accidentally triggered an alarm!", RED);

					// Do a red alert
					DoSetAlert(null, ALERT_RED);
				} else {
					// Tell the user that nothing happened
					MV.l_MessageView.AddMessage("Nothing happens!", BLUE);
				}
				break;
		}

		MV.UpdateControls();
	}
	DoEndPlayerTurn();
}


function OnGetMap() {
	// Attempt node access
	if (AttemptNodeAccess()) {
		MV.PlayGameSound(SOUND_GETMAP);

		// Map all of the nodes in this area
		g_pChar.m_pCurrentNode.m_pParentArea.m_olNodeList.forEach(pNode => {
			pNode.m_bMapped = true;

			// Handle special map icons
			if (pNode.m_nType === NT_IO) {
				if (pNode.m_nSubType === NST_IO_ALARM)
					pNode.m_nSpecialImage = NSI_IO_ALARM;
				else if (pNode.m_nSubType === NST_IO_ICE_PORT)
					pNode.m_nSpecialImage = NSI_IO_ICE_PORT;
				else if (pNode.m_nSubType === NST_IO_MATRIX)
					pNode.m_nSpecialImage = NSI_IO_MATRIX;
			} else if (pNode.m_nType === NT_COP) {
				if (pNode.m_nSubType === NST_COP_SECURITY)
					pNode.m_nSpecialImage = NSI_COP_SECURITY;
			}
		});

		MV.l_MapView.RedrawWindow();
		MV.l_MessageView.AddMessage("Area map acquired.", BLACK);
	}
	DoEndPlayerTurn();
}
function OnKillShutDown() {
	// Attempt node access
	if (AttemptNodeAccess()) {
		// Make a roll of attack skill versus the system rating
		let iTargetNumber = 8 + (2*g_pChar.m_pSystem.m_nRating) - g_pChar.GetEffectiveRating(RATING_ATTACK);

		// Roll the die
		let iSuccess = DoDieRoll(iTargetNumber);

		// Check for success
		if (iSuccess>0) {
			MV.PlayGameSound(SOUND_CANCELSHUTDOWN);

			MV.l_MessageView.AddMessage("System shutdown halted.", BLUE);
			g_pChar.m_pSystem.m_nTurnsUntilCrash = 0;

			// Do the graphic
			MV.l_abAlert.RedrawWindow();
		} else {
			MV.l_MessageView.AddMessage("Failed to cancel shutdown.", BLACK);

			if (iSuccess === -1) {
				// Critical failure. Set alarm
				MV.l_MessageView.AddMessage("Oops! You have triggered an alert.", RED);
				DoSetAlert(null, ALERT_RED);
			}
		}
	}
	DoEndPlayerTurn();
}
function OnCrashSystem() {
	// Attempt node access
	if (AttemptNodeAccess()) {
		// Make a roll of attack skill versus the system rating
		let iTargetNumber = 10 + (2*g_pChar.m_pSystem.m_nRating) - g_pChar.GetEffectiveRating(RATING_ATTACK);

		// Roll the die
		let iSuccess = DoDieRoll(iTargetNumber);

		// Check for success
		if (iSuccess>0) {
			MV.PlayGameSound(SOUND_CRASHSYSTEM);

			// Crash the system
			DoDumpDecker(DUMP_SYS_CRASH);
			return;
		} else {
			// A failed attempt at crashing always sets an alert
			MV.l_MessageView.AddMessage("System crash failed. You have triggered an alert.", RED);
			DoSetAlert(null, ALERT_RED);
		}
	}
	DoEndPlayerTurn();
}
function OnBackdoor() {
	// Attempt node access
	if (AttemptNodeAccess()) {
		// Make a roll of analysis skill versus the system rating
		let iTargetNumber = 12 + (2*g_pChar.m_pSystem.m_nRating) - g_pChar.GetEffectiveRating(RATING_ANALYSIS);

		// Roll the die
		let iSuccess = DoDieRoll(iTargetNumber);

		// Check for success
		if (iSuccess>0) {
			MV.PlayGameSound(SOUND_CREATEBACKDOOR);

			MV.l_MessageView.AddMessage("Backdoor successfully created.", BLUE);
			g_pChar.m_pSystem.m_bBackdoor = true;
			g_pChar.m_bBackdoor[g_pChar.m_pCurrentContract.m_nCorporation] = iSuccess;
		} else {
			MV.l_MessageView.AddMessage("Backdoor creation failed.", BLACK);

			if (iSuccess === -1) {
				// Critical failure. Set alarm
				MV.l_MessageView.AddMessage("Oops! You have triggered an alert.", RED);
				DoSetAlert(null, ALERT_RED);
			}
		}
	}
	DoEndPlayerTurn();
}


function OnKillAlarm() {
	// If green alert, nothing to do
	if (g_pChar.m_pSystem.m_nAlert === ALERT_GREEN) {
		MV.l_MessageView.AddMessage("There is no alert to cancel.", BLACK);
		return;
	}

	// Attempt node access
	if (AttemptNodeAccess()) {
		// Make a roll of attack skill versus the system rating
		let iTargetNumber = 10 + (2*g_pChar.m_pSystem.m_nRating) - g_pChar.GetEffectiveRating(RATING_ATTACK);

		// Roll the die
		let iSuccess = DoDieRoll(iTargetNumber);

		// Check for success
		if (iSuccess>0) {
			MV.PlayGameSound(SOUND_CANCELALERT);

			MV.l_MessageView.AddMessage("Alert cancelled.",BLUE);

			// If red alert, send all ICE to home nodes
			if (g_pChar.m_pSystem.m_nAlert === ALERT_RED) {
				g_pChar.m_pSystem.m_olIceList.forEach(pIce => {
					if (pIce.m_nType === ICE_ATTACK || pIce.m_nType === ICE_TRACE) {
						pIce.m_nState = STATE_MOVING;
						pIce.m_pTargetNode = pIce.m_pHomeNode;
					} else if (pIce.m_nType === ICE_PROBE) {
						pIce.m_nState = STATE_SEARCHING;
					} else {
						// Gateway, guardian, tapeworm should already be at home or
						// going there. Just set to non-hostile
						pIce.m_nState &= (~STATE_MASK_HOSTILE);
					}
				});

				// Downgrade alert
				g_pChar.m_pSystem.m_nAlert = ALERT_YELLOW;
			} else {
				// Go from yellow to green
				g_pChar.m_pSystem.m_nAlert = ALERT_GREEN;
			}

			// Do the graphic
			MV.l_abAlert.RedrawWindow();
		} else {
			MV.l_MessageView.AddMessage("Failed to cancel alert.", BLACK);

			if (iSuccess === -1) {
				// Critical failure. Set alarm
				MV.l_MessageView.AddMessage("Oops! You have triggered an alert.", RED);
				DoSetAlert(null, ALERT_RED);
			}
		}
	}
	DoEndPlayerTurn();
}
function OnKillTrace() {
	// Attempt node access
	if (AttemptNodeAccess()) {
		// Make a roll of attack skill versus the system rating
		let iTargetNumber = 10 + (2*g_pChar.m_pSystem.m_nRating) - g_pChar.GetEffectiveRating(RATING_ATTACK);

		// Roll the die
		let iSuccess = DoDieRoll(iTargetNumber);

		// Check for success
		if (iSuccess>0) {
			MV.PlayGameSound(SOUND_CANCELTRACE);

			MV.l_MessageView.AddMessage("Trace has been removed.", BLUE);
			g_pChar.m_bTraced = false;

			// Do the graphic
			MV.l_abAlert.RedrawWindow();
		} else {
			MV.l_MessageView.AddMessage("Failed to remove trace.", BLACK);

			if (iSuccess === -1) {
				// Critical failure. Set alarm
				MV.l_MessageView.AddMessage("Oops! You have triggered an alert.", RED);
				DoSetAlert(null, ALERT_RED);
			}
		}
	}
	DoEndPlayerTurn();
}


function OnEnterPortal() {
	// Attempt node access
	if (AttemptNodeAccess()) {
		DoLeaveNode();

		MV.PlayGameSound(SOUND_ENTERPORTAL);

		// Find the current area in the list
		let p = g_pChar.m_pSystem.m_olAreaList.indexOf(g_pChar.m_pCurrentNode.m_pParentArea);

		// Is this a portal in or portal out
		if (g_pChar.m_pCurrentNode === g_pChar.m_pCurrentNode.m_pParentArea.m_pAreaPortalIn) {
			// Go inwards
			let pArea = g_pChar.m_pSystem.m_olAreaList[p-1];
			DoEnterNode(pArea.m_pAreaPortalOut, DIR_CENTER);
		} else {
			// Go outwards
			let pArea = g_pChar.m_pSystem.m_olAreaList[p+1];
			DoEnterNode(pArea.m_pAreaPortalIn, DIR_CENTER);
		}
	}
	DoEndPlayerTurn();
}



function OnUseNode() {
	let options = [];

	switch (g_pChar.m_pCurrentNode.m_nType) {
		case NT_CPU:
			options.push([ "Get an area map", OnGetMap, MV.l_bmbButton[12].isEnabled() ]);
			options.push([ "Crash the system", OnCrashSystem, MV.l_bmbButton[13].isEnabled() ]);
			options.push([ "Cancel a system shutdown", OnKillShutDown, MV.l_bmbButton[14].isEnabled() ]);
			options.push([ "Create a backdoor", OnBackdoor, MV.l_bmbButton[15].isEnabled() ]);
			break;
		case NT_SPU:
			options.push([ "Get an area map", OnGetMap, MV.l_bmbButton[12].isEnabled() ]);
			options.push([ "Cancel a system shutdown", OnKillShutDown, MV.l_bmbButton[14].isEnabled() ]);
			break;
		case NT_DS:
			options.push([ "Get a file", OnGetFile, MV.l_bmbButton[12].isEnabled() ]);
			options.push([ "Edit a file", OnEditFile, MV.l_bmbButton[13].isEnabled() ]);
			options.push([ "Erase a file", OnEraseFile, MV.l_bmbButton[14].isEnabled() ]);
			break;
		case NT_IO:
			options.push([ "Activate I/O", OnUseIO, MV.l_bmbButton[12].isEnabled() ]);
			break;
		case NT_PORTAL_IN:
		case NT_PORTAL_OUT:
			options.push([ "Enter portal", OnEnterPortal, MV.l_bmbButton[12].isEnabled() ]);
			break;
		case NT_COP:
			if (g_pChar.m_pCurrentNode.m_nSubType === NST_COP_SECURITY) {
				// only show controls if node's subtype is known
				if ( g_pChar.m_pCurrentNode.m_nSpecialImage === NSI_COP_SECURITY ) {
					options.push([ "Cancel an alert", OnKillAlarm, MV.l_bmbButton[12].isEnabled() ]);
					options.push([ "Remove a completed trace", OnKillTrace, MV.l_bmbButton[13].isEnabled() ]);
				}
			}
			break;
	}

	if (!options.length)
		Popup.alert("No actions available in this node.");
	else
		Popup.usenode(options);
}



function OnAttack() {
	// Run the default attack program
	if (g_pChar.m_pDefAttackProgram === null)
		Popup.alert("No default attack program specified.");
	else
		DoRunProgram(g_pChar.m_pDefAttackProgram);
}

function OnDeceive() {
	// Run the highest rated deceive program
	let pProgram = g_pChar.FindProgram(PROGRAM_DECEIVE);
	if (pProgram === null)
		Popup.alert("No Deceive program loaded.");
	else
		DoRunProgram(pProgram);
}

function OnViewIce() {
	if (g_pChar.m_pTargettedIce === null)
		return;
	Popup.icedata();
}

function OnScan() {
	// Run the highest rated program
	let pProgram = g_pChar.FindProgram(PROGRAM_SCAN);
	if (pProgram === null)
		Popup.alert("No Scan program loaded.");
	else
		DoRunProgram(pProgram);
}

function OnEvaluate() {
	// Run the highest rated program
	let pProgram = g_pChar.FindProgram(PROGRAM_EVALUATE);
	if (pProgram === null)
		Popup.alert("No Evaluate program loaded.");
	else
		DoRunProgram(pProgram);
}

function OnAnalyze() {
	// Run the highest rated analize program
	let pProgram = g_pChar.FindProgram(PROGRAM_ANALYZE);
	if (pProgram === null)
		Popup.alert("No Analyze program loaded.");
	else
		DoRunProgram(pProgram);
}

function OnSilence() {
	// Run the highest rated program
	let pProgram = g_pChar.FindProgram(PROGRAM_SILENCE);
	if (pProgram === null)
		Popup.alert("No Silence program loaded.");
	else
		DoRunProgram(pProgram);
}

function OnSmoke() {
	// Run the highest rated program
	let pProgram = g_pChar.FindProgram(PROGRAM_SMOKE);
	if (pProgram === null)
		Popup.alert("No Smoke program loaded.");
	else
		DoRunProgram(pProgram);
}

function OnMedic() {
	// Run the highest rated program
	let pProgram = g_pChar.FindProgram(PROGRAM_MEDIC);
	if (pProgram === null)
		Popup.alert("No Medic program loaded.");
	else
		DoRunProgram(pProgram);
}

function OnRelocate() {
	// Run the highest rated program
	let pProgram = g_pChar.FindProgram(PROGRAM_RELOCATE);
	if (pProgram === null)
		Popup.alert("No Relocate program loaded.");
	else
		DoRunProgram(pProgram);
}

function OnDecrypt() {
	// Run the highest rated program
	let pProgram = g_pChar.FindProgram(PROGRAM_DECRYPT);
	if (pProgram === null)
		Popup.alert("No Decrypt program loaded.");
	else
		DoRunProgram(pProgram);
}



function OnOptions() {
	Popup.options();
}
function OnDisconnect() {
	Popup.confirm("Are you sure you wish to disconnect?", {noDefault:true}).onYes( () => DoDumpDecker(DUMP_DISCONNECT) );
}



function OnKeyPress(event) {
	if (event.altKey || event.ctrlKey || event.metaKey) return;
	let key = (event.shiftKey ? "S+" : "") + event.key;

	switch (key) {
		case "ArrowUp":     OnMoveN(); break;
		case "ArrowDown":   OnMoveS(); break;
		case "ArrowLeft":   OnMoveW(); break;
		case "ArrowRight":  OnMoveE(); break;
		case "Tab":         OnNextTarget(false); break;
		case "S+Tab":       OnNextTarget(true); break;
		case "A": case "a": OnAttack(); break;
		case "D": case "d": OnDeceive(); break;
		case "V": case "v": OnViewIce(); break;
		case "Z": case "z": OnAnalyze(); break;
		case "S": case "s": OnScan(); break;
		case "E": case "e": OnEvaluate(); break;
		case "W": case "w": OnWait(); break;
		case "L": case "l": OnSilence(); break;
		case "K": case "k": OnSmoke(); break;
		case "M": case "m": OnMedic(); break;
		case "R": case "r": OnRelocate(); break;
		case "C": case "c": OnDecrypt(); break;
		case "U": case "u": OnUseNode(); break;
		default: return;
	}
	event.preventDefault();
}

// matrix_activebar.js

var ActiveBar = function(obj, image) {
	this.obj = obj;
	this.image = image;
	this.slots = [];
	this.data = {};
}

ActiveBar.imageSize = 16;

// setup the icons
// like: when I tell you to add "value", then in the slot "slot" you draw the image "idxImage"
ActiveBar.prototype.setup = function(value, slot, idxImage=value) {
	// add more slots as necessary
	while (this.slots.length < slot) {
		let icon = document.createElement("div");
		icon.style.width = "16px";
		icon.style.height = "16px";
		icon.style.display = "inline-block";
		icon.style.background = "url("+this.image+")";
		icon.style.visibility = "hidden";
		this.slots.push(icon);
		this.obj.appendChild(icon);
	}

	this.data[value] = [slot-1, idxImage];
}

ActiveBar.prototype.add = function(value, on=true) {
	let [slot, idxImage] = this.data[value];
	if (on) {
		Anim.add(() => {
			this.slots[slot].style.backgroundPositionX = -16*idxImage + "px";
			this.slots[slot].style.visibility = "";
		});
	} else {
		Anim.add(() => {
			this.slots[slot].style.visibility = "hidden";
		});
	}
}
ActiveBar.prototype.remove = function(value) {
	this.add(value,false);
}

// matrix_alarm.js

var AlarmBar = function(div) {
	this.obj = document.createElement("div");
	this.obj.style.width = "100%";
	this.obj.style.height = "100%";
	div.appendChild(this.obj);
}
AlarmBar.prototype.RedrawWindow = function() {
	const g_crAlarmColor = [ DK_GREEN, YELLOW, RED ];
	let color;
	if (g_pChar.m_pSystem.m_nTurnsUntilCrash === 0)
		color = g_crAlarmColor[g_pChar.m_pSystem.m_nAlert];
	else
		color = PURPLE;

	Anim.add(() => {
		this.obj.style.background = color;
	});
}

// matrix_button.js

var MatrixButton = function(obj) {
	this.obj = obj;
	this.state = { null:[0,true,null] }; // mode: [image, disabled, callback]
	MatrixButton.butList.push(this);

	Popup.onclick( this.obj, this.onclick.bind(this) );
}
MatrixButton.butList = [];
MatrixButton.mode = null;

// imagen a mostrar y function a llamar al ser presionado en modo mode
MatrixButton.prototype.setup = function(mode, img, func) {
	this.state[mode] = [img,false,func];
}
MatrixButton.prototype.enable = function(V=true, mode) {
	this.disable(!V, mode);
}
MatrixButton.prototype.disable = function(V=true, mode) {
	if (mode === undefined) mode = MatrixButton.mode;
	mode = this.state[mode] ? mode : null;
	this.state[mode][1] = V;

	let curMode = this.state[MatrixButton.mode] ? MatrixButton.mode : null;
	if (mode === curMode) {
		Anim.add(() => {
			this.obj.blur(); // to avoid focusing on a disabled button, where keyboard events don't work
			this.obj.disabled = V;
		});
	}
}
MatrixButton.prototype.isEnabled = function() {
	let mode = MatrixButton.mode;
	mode = this.state[mode] ? mode : null;
	return !this.state[mode][1];
}

MatrixButton.prototype.onclick = function() {
	let curMode = this.state[MatrixButton.mode] ? MatrixButton.mode : null;
	let func = this.state[curMode][2];
	if (func) func();
}

MatrixButton.setMode = function(mode, force) {
	MatrixButton.butList.forEach((but,i) => {
		let curMode = but.state[MatrixButton.mode] ? MatrixButton.mode : null;
		let newMode = but.state[mode] ? mode : null;

		if (!force && curMode === newMode) return;

		let [image,disabled] = but.state[newMode];
		Anim.add(() => {
			but.obj.style.backgroundPositionX = (-20*image) + "px";
			but.obj.blur(); // to avoid focusing on a disabled button, where keyboard events don't work
			but.obj.disabled = disabled;
		});
	});
	MatrixButton.mode = mode;
}

// matrix_clock.js

var ClockView = function(obj) {
	this.digits = [];

	[1,1,0,1,1,0,1,1].forEach(digit => {
		let elem = document.createElement("div");
		elem.style.display = "inline-block";
		elem.style.height = "11px";
		elem.style.background = "url(img/matrixTime.png)";
		if (digit) {
			this.digits.push(elem);
			elem.style.width = "7px";
			obj.appendChild(elem);
		} else {
			elem.style.backgroundPositionX = "1px";
			elem.style.width = "1px";
			obj.appendChild(elem);
		}
	});
}
ClockView.prototype.update = function() {
	const factor = [10*60*60,60*60,10*60,60,10,1];
	let nTime = g_pChar.m_nRunTime;

	for (let i=0; i<factor.length; i++) {
		let value = Math.floor(nTime / factor[i]);
		if (value > 9) value = 9;
		Anim.add(() => {
			this.digits[i].style.backgroundPositionX = (-value*7) + "px";
		});
		nTime -= value * factor[i];
	}
}

// matrix_health.js

var HealthBar = function(div, max=100) {
	this.obj = document.createElement("div");
	this.obj.style.width = "100%";
	this.obj.style.height = "100%";
	this.obj.style.background = BLUE;
	div.appendChild(this.obj);

	this.max = max;
}
HealthBar.prototype.set = function(value, max) {
	if (max !== undefined) this.max = max;
	else max = this.max;

	// Normalize value
	if (value > max) value = max;
	else if (value < 0) value = 0;

	// Calculate proportional length (in percentage)
	let nLength = value / max;

	// Color is also according to current and max
	// Scale - 255 Green at highest, add red to middle, reduce green to end
	let nGreen = (511 * nLength) - 64;
	let nRed = 765 - (765 * nLength);
	if (nGreen > 255) nGreen = 255;
	else if (nGreen < 0) nGreen = 0;
	if (nRed > 255) nRed = 255;
	else if (nRed < 0) nRed = 0;
	let nColor = "rgb("+nRed+","+nGreen+",0)";

	// Alternate method
	//	if (nLength <= 2/5)
	//		nColor = RED;
	//	else if (nLength <= 4/5)
	//		nColor = YELLOW;
	//	else
	//		nColor = GREEN;

	// Fill the bar with the color
	Anim.add(() => {
		this.obj.style.width = 100*nLength + "%";
		this.obj.style.background = nColor;
	});
}

// matrix_icepic.js

var IcePic = function(obj) {
	this.obj = obj;
}
IcePic.prototype.setImage = function(V) {
	Anim.add(() => {
		if (V < 0) {
			this.obj.style.backgroundImage = "";
		} else {
			let x = (V%10);
			let y = (V-x)/10;
			this.obj.style.backgroundImage = "url(img/ice.png)";
			this.obj.style.backgroundPositionX = -x*24+"px";
			this.obj.style.backgroundPositionY = -y*24+"px";
		}
	});
}
IcePic.prototype.setColor = function(V) {
	Anim.add(() => {
		this.obj.style.backgroundColor = V;
	});
}

// matrix_mapview.js

var MapView = function(obj) {
	this.obj = obj;
	this.obj.style.overflow = "hidden";

	this.here = null; // div pointing to center cell

	this.m_nZoomMode = 0;
	this.m_nGridSize = 16;
	this.m_nSkew = 0;
	this.m_ilNodes = "img/mapNodes16.png";
	this.m_ilExits = "img/mapExits16.png";



	let dragged = false;
	let dragging = 0;
	let dragX, dragY;
	let mapMove = e => {
		if (!dragging) return;
		dragging = 2;

		let deltaX = e.clientX - dragX;
		let deltaY = e.clientY - dragY;
		dragX = e.clientX;
		dragY = e.clientY;

		this.obj.children[0].style.left = this.obj.children[0].offsetLeft + deltaX + "px";
		this.obj.children[0].style.top = this.obj.children[0].offsetTop + deltaY + "px";
	}
	this.obj.onmousedown = e => {
		dragging = 1;
		window.addEventListener("mousemove", mapMove, true);
		dragX = e.clientX;
		dragY = e.clientY;
	}
	window.addEventListener("mouseup", () => {
		if (!dragging) return;
		dragged = (dragging > 1);
		dragging = 0;
		window.removeEventListener("mousemove", mapMove, true);
	});


	this.obj.onclick = e => {
		if (dragged) return;
		// only interested if clicked on a node
		if (e.target.parentNode.parentNode === this.obj)
			this.ScrollToCurrentNode(e.target);
	};
}

// center view into the "here" cell
MapView.prototype.ScrollToCurrentNode = function(target) {
	if (!target) target = this.here;

	// center of the map
	let centerX = Math.floor(this.obj.clientWidth / 2);
	let centerY = Math.floor(this.obj.clientHeight / 2);

	// current center of the target, relative to the container
	let hereX = target.offsetLeft + this.m_nGridSize/2;
	let hereY = target.offsetTop + this.m_nGridSize/2;

	// new position of the container
	let posX = centerX - hereX;
	let posY = centerY - hereY;

	// move the container to the new position
	this.obj.children[0].style.left = posX + "px";
	this.obj.children[0].style.top  = posY + "px";
}
MapView.prototype.DoMove = function() {
	this.RedrawWindow();
}
MapView.prototype.DoZoom = function() {
	this.m_nZoomMode = (this.m_nZoomMode + 1) % 3;

	// Change the zoom mode.
	switch (this.m_nZoomMode) {
		case 0: // small
			this.m_nGridSize = 16;
			this.m_nSkew = 0;
			this.m_ilNodes = "img/mapNodes16.png";
			this.m_ilExits = "img/mapExits16.png";
			break;
		case 1: // big
			this.m_nGridSize = 32;
			this.m_nSkew = 0;
			this.m_ilNodes = "img/mapNodes32.png";
			this.m_ilExits = "img/mapExits32.png";
			break;
		case 2: // 3D
			this.m_nGridSize = 32;
			this.m_nSkew = 9;
			this.m_ilNodes = "img/mapNodes3D.png";
			this.m_ilExits = "img/mapExits3D.png";
	}

	// Resize the window
	this.RedrawWindow();
}

MapView.prototype.RedrawWindow = function() {
	let pArea = g_pChar.m_pCurrentNode.m_pParentArea;

	let grid = {};
	let iMinX = null;
	let iMinY = null;
	let iMaxX = null;
	let iMaxY = null;
	function gridAddElem(point,what,val=true) {
		let [x,y] = [point.x,point.y];

		if (iMinX === null || x < iMinX) iMinX = x;
		if (iMinY === null || y < iMinY) iMinY = y;
		if (iMaxX === null || x > iMaxX) iMaxX = x;
		if (iMaxY === null || y > iMaxY) iMaxY = y;

		let key = x+","+y;
		if (!grid[key]) grid[key] = {x:x, y:y};
		grid[key][what] = val;
	}

	// Go through and draw everything
	pArea.m_olNodeList.forEach(pNode => {
		// If the node has not been mapped, skip it
		if (!pNode.m_bMapped) return;

		let p = new Point(pNode.m_ptLocation.x, pNode.m_ptLocation.y);

		// process paths
		if ( pNode.m_pAdjNode[DIR_NORTH] !== null ) {
			gridAddElem(p, DIR_NORTH);
			gridAddElem(p.move(DIR_NORTH), DIR_SOUTH);
		}
		if ( pNode.m_pAdjNode[DIR_SOUTH] !== null ) {
			gridAddElem(p, DIR_SOUTH);
			gridAddElem(p.move(DIR_SOUTH), DIR_NORTH);
		}
		if ( pNode.m_pAdjNode[DIR_EAST] !== null ) {
			gridAddElem(p, DIR_EAST);
			gridAddElem(p.move(DIR_EAST), DIR_WEST);
		}
		if ( pNode.m_pAdjNode[DIR_WEST] !== null ) {
			gridAddElem(p, DIR_WEST);
			gridAddElem(p.move(DIR_WEST), DIR_EAST);
		}

		// now, the icon
		gridAddElem(p, "icon", pNode.m_nType);
		gridAddElem(p, "spec", pNode.m_nSpecialImage+1);

		// mark the cursor
		if (pNode === g_pChar.m_pCurrentNode) {
			gridAddElem(p, "here");
		}
	});


	let drawCell = cell => {
		let x = cell.x;
		let y = cell.y;
		let bgi = [];
		let bgx = [];
		let bgy = [];
		if (cell.here) {
			bgi.push("url("+this.m_ilExits+")");
			bgx.push( -(this.m_nGridSize*4)+"px" );
			bgy.push( "0" );
		}
		if (cell.icon !== undefined) {
			bgi.push("url("+this.m_ilNodes+")");
			bgx.push( -(this.m_nGridSize*cell.icon)+"px" );
			bgy.push( -(this.m_nGridSize*cell.spec)+"px" );
		}
		for (let i=0; i<4; i++) {
			if (cell[i]) {
				bgi.push("url("+this.m_ilExits+")");
				bgx.push( -(this.m_nGridSize*i)+"px" );
				bgy.push( "0" );
			}
		}

		let div = document.createElement("div");
		div.style.position = "absolute";
		div.style.left = (x*this.m_nGridSize-y*this.m_nSkew)+"px";
		div.style.top = (y*this.m_nGridSize)+"px";
		div.style.backgroundImage = bgi.join(",");
		div.style.backgroundPositionX = bgx.join(",");
		div.style.backgroundPositionY = bgy.join(",");

		if (cell.here) this.here = div;
		return div;
	}

	// draw the grid
	let container = document.createElement("div");
	container.id = "map"+this.m_nGridSize;
	container.style.position = "absolute";

	for (let cell in grid)
		container.appendChild( drawCell(grid[cell]) );

	this.obj.innerHTML = "";
	this.obj.appendChild(container);

	this.ScrollToCurrentNode();
}

// matrix_message.js

var MessageView = function(obj) {
	this.msgBox = obj;
	this.pendingSeparator = false;

	// semi-hidden button with "Clear" option
	this.menu = document.createElement("div");
	this.menu.style.position = "absolute";
	this.menu.style.top = "6px";
	this.menu.style.right = "20px";
	this.menu.style.width = "16px";
	this.menu.style.height = "16px";
	this.menu.style.opacity = ".4";
	this.menu.style.backgroundImage = "url(img/trashcan.png)";
	this.menu.style.cursor = "pointer";
	this.menu.onclick = () => this.OnClear();
	this.menu.onmouseenter = () => this.menu.style.opacity = "1";
	this.menu.onmouseleave = () => this.menu.style.opacity = ".4";
}

MessageView.prototype.OnClear = function() {
	while (this.msgBox.firstChild)
		this.msgBox.removeChild(this.msgBox.firstChild);
	this.msgBox.parentNode.appendChild(this.menu);
	this.pendingSeparator = false;
}

MessageView.prototype.AddMessage = function(text,color) {
	let div = document.createElement("div");
	div.style.color = color;
	div.textContent = text;
	if (this.pendingSeparator)
		div.style.borderTop = "1px dashed #ddd";
	this.pendingSeparator = false;

	Anim.add(() => {
		this.msgBox.appendChild(div);

		if (MAX_MESSAGES >= 0)
			while (this.msgBox.children.length > MAX_MESSAGES)
				this.msgBox.removeChild(this.msgBox.firstChild);

		this.msgBox.scrollTop = this.msgBox.scrollHeight;
	});
}
MessageView.prototype.AddSeparator = function() {
	if (this.msgBox.children.length)
		this.pendingSeparator = true;
}

// matrix_namebar.js

var NameBar = function(obj) {
	this.obj = obj;
}
NameBar.prototype.set = function(txt) {
	Anim.add(() => {
		this.obj.textContent = txt;
	});
}

// matrix_nodeview.js


// Node grid starting coordinate
const NODE_GRID_OFFSET	= 12;	// Offset of grid
const NODE_GRID_SIZE	= 24;	// Size of node grid square

// Connection starting coordinates
const LINE_N_X = 107;
const LINE_N_Y = 0;
const LINE_E_X = 227;
const LINE_E_Y = 107;
const LINE_S_X = 107;
const LINE_S_Y = 227;
const LINE_W_X = 0;
const LINE_W_Y = 107;

// Size of line bitmaps
const LINE_WIDTH	= 26; // cy for NS, cx for EW
const LINE_LENGTH	= 13; // cx for NS, cy for EW

// Miscellaneous images
const MISC_TARGET		= 0;
const MISC_DAMAGE		= 1;
const MISC_QUERY		= 2;
const MISC_ALERT		= 3;
const MISC_BYPASS		= 4;
const MISC_EXPLOSION	= 5;

const MISC_NUMBER		= 6; // images in one row


var NodeView = function(obj) {
	this.obj = obj;
	this.obj.style.position = "relative";

	this.grid = document.createElement("div");
	this.grid.style.position = "absolute";
	this.grid.style.top = NODE_GRID_OFFSET+"px";
	this.grid.style.left = NODE_GRID_OFFSET+"px";
	this.grid.style.right = NODE_GRID_OFFSET+"px";
	this.grid.style.bottom = NODE_GRID_OFFSET+"px";
	this.obj.appendChild(this.grid);

	// Load the node bitmaps
	this.m_hNodeBitMap = [];
	this.m_hNodeBitMap[NT_CPU		] = "url(img/nodeBgCPU.png)";
	this.m_hNodeBitMap[NT_SPU		] = "url(img/nodeBgSPU.png)";
	this.m_hNodeBitMap[NT_COP		] = "url(img/nodeBgCOP.png)";
	this.m_hNodeBitMap[NT_DS		] = "url(img/nodeBgDS.png)";
	this.m_hNodeBitMap[NT_IO		] = "url(img/nodeBgIO.png)";
	this.m_hNodeBitMap[NT_JUNC		] = "url(img/nodeBgJunc.png)";
	this.m_hNodeBitMap[NT_PORTAL_IN	] = "url(img/nodeBgPortal.png)";
	this.m_hNodeBitMap[NT_PORTAL_OUT] = "url(img/nodeBgPortal.png)";

	// Prepare the node connections
	this.connections = [];
	{
		// line bitmaps
		let m_hLineBitMap = [];
		m_hLineBitMap[DIR_NORTH] = "linear-gradient(90deg, blue,darkcyan,darkcyan,darkcyan,blue)";
		m_hLineBitMap[DIR_EAST ] = "linear-gradient( 0deg, blue,darkcyan,darkcyan,darkcyan,blue)";
		m_hLineBitMap[DIR_SOUTH] = "linear-gradient(90deg, blue,darkcyan,darkcyan,darkcyan,blue)";
		m_hLineBitMap[DIR_WEST ] = "linear-gradient( 0deg, blue,darkcyan,darkcyan,darkcyan,blue)";

		// line coordinates
		let m_ptLineLocation = [];
		m_ptLineLocation[DIR_NORTH] = new Point(LINE_N_X, LINE_N_Y);
		m_ptLineLocation[DIR_EAST]  = new Point(LINE_E_X, LINE_E_Y);
		m_ptLineLocation[DIR_SOUTH] = new Point(LINE_S_X, LINE_S_Y);
		m_ptLineLocation[DIR_WEST]  = new Point(LINE_W_X, LINE_W_Y);

		// line sizes
		let m_szLineSize = [];
		m_szLineSize[DIR_NORTH] = new Point(LINE_WIDTH, LINE_LENGTH);
		m_szLineSize[DIR_EAST]  = new Point(LINE_LENGTH, LINE_WIDTH);
		m_szLineSize[DIR_SOUTH] = new Point(LINE_WIDTH, LINE_LENGTH);
		m_szLineSize[DIR_WEST]  = new Point(LINE_LENGTH, LINE_WIDTH);

		// Prepare the node connections
		for (let nDir=0; nDir<4; nDir++) {
			let div = document.createElement("div");
			div.style.position = "absolute";
			div.style.left   = m_ptLineLocation[nDir].x + "px";
			div.style.top    = m_ptLineLocation[nDir].y + "px";
			div.style.width  = m_szLineSize[nDir].x + "px";
			div.style.height = m_szLineSize[nDir].y + "px";
			div.style.backgroundImage = m_hLineBitMap[nDir];
			this.obj.appendChild(div);
			this.connections[nDir] = div;
		}
	}
}


// creates a new element in the grid
NodeView.prototype.newDiv = function(left,top, image, imageX,maxX=1000000, pIce=null) {
	Anim.add(() => {
		// remove everything from that position
		[...this.grid.children].forEach(div => {
			if ( div.style.left === (left*NODE_GRID_SIZE)+"px" && div.style.top === (top*NODE_GRID_SIZE)+"px" )
				this.grid.removeChild(div);
		});

		let div = document.createElement("div");
		div.style.position = "absolute";
		div.style.left   = (NODE_GRID_SIZE*left) + "px";
		div.style.top    = (NODE_GRID_SIZE*top)  + "px";
		div.style.width  = NODE_GRID_SIZE + "px";
		div.style.height = NODE_GRID_SIZE + "px";
		div.style.backgroundImage = image;

		let imageY = 0;
		if (!imageX) imageX = 0;
		while (imageX >= maxX) { imageX -= maxX; imageY++; }

		imageX = imageX ? -imageX*NODE_GRID_SIZE : 0;
		imageY = imageY ? -imageY*NODE_GRID_SIZE : 0;

		div.style.backgroundPosition = imageX+"px "+imageY+"px";
		this.grid.appendChild(div);

		if (pIce)
			div.onclick = () => { this.clickedIce(pIce) };
	});
}
// creates a new sub-element in the grid
NodeView.prototype.newDivExtra = function(left,top, image, imageX,maxX=1000000, className) {
	Anim.add(() => {
		// Find the div of the target
		let found = this.findDiv(left, top);
		if (!found) { console.error("NodeView: div not found!"); return null; } // this shouldn't happen!

		let div = document.createElement("div");
		div.style.position = "absolute";
		div.style.width  = NODE_GRID_SIZE + "px";
		div.style.height = NODE_GRID_SIZE + "px";
		div.style.backgroundImage = image;

		let imageY = 0;
		if (!imageX) imageX = 0;
		while (imageX >= maxX) { imageX -= maxX; imageY++; }

		imageX = imageX ? -imageX*NODE_GRID_SIZE : 0;
		imageY = imageY ? -imageY*NODE_GRID_SIZE : 0;
		div.style.backgroundPosition = imageX+"px "+imageY+"px";
		if (className) div.className = className;

		found.appendChild(div);
	});
}
NodeView.prototype.findDiv = function(left,top) {
	return [...this.grid.children].find(div =>
		div.style.left === (left*NODE_GRID_SIZE)+"px" && div.style.top === (top*NODE_GRID_SIZE)+"px"
	);
}
NodeView.prototype.delDiv = function(left,top) {
	Anim.add(() => {
		this.grid.removeChild( this.findDiv(left, top) );
	});
}
NodeView.prototype.removeMiscs = function() {
	Anim.add(() => {
		[...this.grid.children].forEach(div => {
			for (let i = div.children.length-1; i>=0; i--)
				if (div.children[i].className !== "target")
					div.removeChild(div.children[i]);
		});
	});
}

NodeView.prototype.RedrawWindow = function() {
	// Get a pointer to the current node
	let pNode = g_pChar.m_pCurrentNode;

	Anim.add(() => {
		// Set the node background
		this.obj.style.backgroundImage = this.m_hNodeBitMap[pNode.m_nType];

		// Draw the node connections
		for (let nDir=0; nDir<4; nDir++)
			this.connections[nDir].style.display = pNode.m_pAdjNode[nDir] ? "" : "none";

		// Clean the grid
		this.grid.innerHTML = "";
	});

	// Draw the character.
	this.newDiv(g_pChar.m_ptNodeLoc.x, g_pChar.m_ptNodeLoc.y, "url(img/avatars.png)", g_pChar.m_nImage);

	// Draw the decoys
	for (let i=0; i < g_pChar.m_nDecoyCount; i++) {
		this.newDiv(g_pChar.m_ptDecoyLocation[i].x, g_pChar.m_ptDecoyLocation[i].y, "url(img/avatars.png)", g_pChar.m_nImage);
	}

	// Draw any objects in the node
	g_pChar.m_pSystem.m_olIceList.forEach(pIce => {
		// Is the ice in this node?
		if (pIce.m_pCurrentNode !== g_pChar.m_pCurrentNode) return;

		// Draw the ICE
		this.newDiv(pIce.m_ptNodeLoc.x, pIce.m_ptNodeLoc.y, "url(img/ice.png)", pIce.m_nImage, ICE_PER_ROW, pIce);
	});

	// Draw target
	this.Retarget();
}


NodeView.prototype.EraseIce = function(pIce) {
	// Make sure this ice is in the current node
	if (pIce.m_pCurrentNode !== g_pChar.m_pCurrentNode) return;

	// erase position
	this.delDiv(pIce.m_ptNodeLoc.x, pIce.m_ptNodeLoc.y);
}
NodeView.prototype.DrawIce = function(pIce) {
	// Make sure this ice is in the current node
	if (pIce.m_pCurrentNode !== g_pChar.m_pCurrentNode) return;

	this.newDiv(pIce.m_ptNodeLoc.x, pIce.m_ptNodeLoc.y, "url(img/ice.png)", pIce.m_nImage, ICE_PER_ROW, pIce);
}


NodeView.prototype.DrawDecoy = function(ptLoc) {
	this.newDiv(ptLoc.x, ptLoc.y, "url(img/avatars.png)", g_pChar.m_nImage);
}
NodeView.prototype.EraseDecoy = function(ptLoc) {
	this.delDiv(ptLoc.x, ptLoc.y);
}


NodeView.prototype.DrawBypass = function(pIce) {
	this.DrawMisc(pIce, MISC_BYPASS);
}
NodeView.prototype.DrawAlert = function(pIce) {
	this.DrawMisc(pIce, MISC_ALERT);
}
NodeView.prototype.DrawQuery = function(pIce) {
	this.DrawMisc(pIce, MISC_QUERY);
}
NodeView.prototype.DrawDamage = function(pIce) {
	this.DrawMisc(pIce, MISC_DAMAGE + MISC_NUMBER * Random(4));
}
NodeView.prototype.DrawExplosion = function(pIce) {
	this.DrawMisc(pIce, MISC_EXPLOSION, false);
}

NodeView.prototype.DrawMisc = function(pIce, nImage, bRemove=true) {
	let ptNodeLoc;

	// Calculate position
	if (pIce === null) {
		ptNodeLoc = g_pChar.m_ptNodeLoc.copy();
	} else {
		// Make sure the ICE is in the current node
		if (pIce.m_pCurrentNode !== g_pChar.m_pCurrentNode)
			return;
		ptNodeLoc = pIce.m_ptNodeLoc.copy();
	}

	this.newDivExtra(ptNodeLoc.x, ptNodeLoc.y, "url(img/nodeMisc.png)", nImage,MISC_NUMBER);
	if (bRemove) {
		// wait half a second and remove
		Anim.wait(500);
		this.removeMiscs();
	}
}



NodeView.prototype.clickedIce = function(pIce) {
	if (g_pChar.m_pTargettedIce !== pIce)
		g_pChar.m_pTargettedIce = pIce;

	this.Retarget();
	MV.UpdateTargetInfo();
	Anim.run();
}


// Target has changed. Redraw it.
NodeView.prototype.Retarget = function() {
	// remove current target, if any
	Anim.add(() => {
		let oldTarget = this.grid.getElementsByClassName("target")[0];
		if (oldTarget)
			oldTarget.parentNode.removeChild(oldTarget);
	});

	if (g_pChar.m_pTargettedIce) {
		let pIce = g_pChar.m_pTargettedIce;
		this.newDivExtra(pIce.m_ptNodeLoc.x, pIce.m_ptNodeLoc.y, "url(img/nodeMisc.png)", MISC_TARGET,MISC_NUMBER, "target");
	}
}

// matrixView.js


// graphic elements of the matrix screen. Filled during screen creation
var MV = {
	l_cvClock : null,
	l_MessageView : null,
	l_abAlert : null,
	l_hbHealthBar : [], // 7 health bars
	l_nbNodeName : null,
	l_nbIceName : null,
	l_abActiveChar : null,
	l_abActiveNode : null,
	l_abActiveIce : null,
	l_idIcePic : null,
	l_MapView : null,
	l_NodeView : null,
	l_bmbSoftButton : [], // software buttons
	l_bmbButton : [], // matrix main buttons
	l_coverBio : null,
	l_coverTrace : null,
	l_tProgramList : null, // programs list

	SetCovers : null,
	UpdateTargetInfo : null,
	UpdateControls : null,
	UpdateNodeIcons : null,
	UpdateActiveBar : null,
	UpdateBar : null,
	DoQuery : null,
	SoftwareListUpdate : null,
	UpdateProgramRating : null,
	PlayGameSound : null,
};


MV.SetCovers = function() {
	if (g_pChar.m_nHardware[HW_BIO_MONITOR] === 0)
		MV.l_coverBio.style.visibility = "visible";
	else
		MV.l_coverBio.style.visibility = "hidden";
	if (g_pChar.m_nHardware[HW_TRACE_MONITOR] === 0)
		MV.l_coverTrace.style.visibility = "visible";
	else
		MV.l_coverTrace.style.visibility = "hidden";
}


// update state of matrix's main buttons
MV.UpdateControls = function() {
	// Look for hostile ICE and for ice guarding the exits
	let bHostileIce = false;
	let bQueried = false;
	let bIceGuarding = [false,false,false,false];
	let bGuardianIce = false;
	let bBlackIce = false;
	g_pChar.m_olCurrentIceList.forEach(pIce => {
		if (pIce.m_nState & STATE_MASK_HOSTILE)
			bHostileIce = true;

		if (pIce.HasQueried())
			bQueried = true;

		if (pIce.m_nType === ICE_GATEWAY && pIce.m_pHomeNode === pIce.m_pCurrentNode)
			bIceGuarding[pIce.m_nSubType] = true;
		else if (pIce.m_nType === ICE_GUARDIAN && pIce.m_pHomeNode === pIce.m_pCurrentNode)
			bGuardianIce = true;
		else if (pIce.m_nType === ICE_ATTACK || pIce.m_nType === ICE_TRACE)
			bBlackIce = true;
	});

	// Movement buttons
	[ [1,DIR_NORTH], [3,DIR_WEST], [5,DIR_EAST], [7,DIR_SOUTH] ].forEach(([btn,dir]) => {
		if ( g_pChar.m_pCurrentNode.m_pAdjNode[dir] === null )
			MV.l_bmbButton[btn].enable(false);
		else
			MV.l_bmbButton[btn].enable( bIceGuarding[dir] === false || (!bHostileIce && !bQueried) );
	});

	// Use default program buttons
	MV.l_bmbButton[0].enable( g_pChar.m_pDefAttackProgram !== null && (g_pChar.m_pTargettedIce !== null || g_pChar.m_pDefAttackProgram.m_nClass === PROGRAM_ATTACK_A) ); // attack
	MV.l_bmbButton[2].enable( g_pChar.FindProgram(PROGRAM_DECEIVE) !== null && g_pChar.m_pTargettedIce !== null ); // deceive
	MV.l_bmbButton[6].enable( g_pChar.FindProgram(PROGRAM_ANALYZE) !== null && g_pChar.m_pTargettedIce !== null ); // view ice
	MV.l_bmbButton[8].enable( (g_pChar.m_pCurrentNode.m_nType === NT_DS || g_pChar.m_pCurrentNode.m_nType === NT_IO) && g_pChar.FindProgram(PROGRAM_SCAN) !== null ); // scan

	// Software control buttons
	let pProgram = MV.l_tProgramList.getSelected();
	if (pProgram === null) {
		MV.l_bmbSoftButton[0].disable(); // run
		MV.l_bmbSoftButton[1].disable(); // set default
		MV.l_bmbSoftButton[3].disable(); // stop
		MV.l_bmbSoftButton[4].disable(); // unload
	} else {
		MV.l_bmbSoftButton[0].enable();
		MV.l_bmbSoftButton[1].enable(pProgram.m_nClass === PROGRAM_ATTACK || pProgram.m_nClass === PROGRAM_ATTACK_A || pProgram.m_nClass === PROGRAM_ATTACK_P || pProgram.m_nClass === PROGRAM_VIRUS);
		MV.l_bmbSoftButton[3].enable(pProgram === g_pChar.m_pActiveArmor || pProgram === g_pChar.m_pActiveHide || pProgram === g_pChar.m_pActiveShield || pProgram === g_pChar.m_pActiveReflect || pProgram === g_pChar.m_pActiveBoost || pProgram === g_pChar.m_pActiveScan);
		MV.l_bmbSoftButton[4].enable(pProgram.m_nLoadedRating !== 0);
	}

	// Node access buttons - No access allowed if hostile guardian or black ice present, or if player has been queried.
	if ( (bQueried || bHostileIce) && (bGuardianIce || bBlackIce) ) {
		MV.l_bmbButton[12].disable();
		MV.l_bmbButton[13].disable();
		MV.l_bmbButton[14].disable();
		MV.l_bmbButton[15].disable();
	} else {
		MV.l_bmbButton[12].enable(true, "ds"); // get file
		MV.l_bmbButton[13].enable(true, "ds"); // edit file
		MV.l_bmbButton[14].enable(true, "ds"); // erase file

		MV.l_bmbButton[12].enable(!g_pChar.m_pCurrentNode.m_bActivated, "io"); // use io
		MV.l_bmbButton[12].enable(g_pChar.m_pSystem.m_nAlert === ALERT_YELLOW || (g_pChar.m_pSystem.m_nAlert === ALERT_RED && !bGuardianIce), "sec"); // kill alarm
		MV.l_bmbButton[13].enable(g_pChar.m_bTraced, "sec"); // kill trace

		MV.l_bmbButton[12].enable(true, "cpu"); // get map
		MV.l_bmbButton[12].enable(true, "spu"); // get map
		MV.l_bmbButton[13].enable(!g_pChar.m_pSystem.m_nTurnsUntilCrash && !bGuardianIce, "cpu"); // crash
		MV.l_bmbButton[14].enable(g_pChar.m_pSystem.m_nTurnsUntilCrash !== 0, "cpu"); // kill shutdown
		MV.l_bmbButton[14].enable(g_pChar.m_pSystem.m_nTurnsUntilCrash !== 0, "spu"); // kill shutdown
		MV.l_bmbButton[15].enable(true, "cpu"); // backdoor

		MV.l_bmbButton[12].enable(g_pChar.m_pCurrentNode !== g_pChar.m_pSystem.m_pSystemPortalOut, "prt"); // enter portal
	}
}

// update health bars (and similar)
MV.UpdateBar = function(nBar) {
	if ( nBar === BAR_DECK || nBar === BAR_ALL )
		MV.l_hbHealthBar[BAR_DECK].set( g_pChar.m_nHealthDeck );

	if ( nBar === BAR_MENTAL || nBar === BAR_ALL )
		MV.l_hbHealthBar[BAR_MENTAL].set( g_pChar.m_nHealthMental );

	if ( nBar === BAR_LETHAL || nBar === BAR_ALL )
		MV.l_hbHealthBar[BAR_LETHAL].set( g_pChar.m_nHealthPhysical );

	if ( nBar === BAR_SHIELD || nBar === BAR_ALL ) {
		if (g_pChar.m_pActiveShield === null)
			MV.l_hbHealthBar[BAR_SHIELD].set( 0 );
		else
			MV.l_hbHealthBar[BAR_SHIELD].set( g_pChar.m_pActiveShield.m_nLoadedRating, g_pChar.m_pActiveShield.m_nRating );
	}

	if ( nBar === BAR_TRANSFER || nBar === BAR_ALL ) {
		if (g_pChar.m_pTransferFile === null && g_pChar.m_pTransferProgram === null)
			MV.l_hbHealthBar[BAR_TRANSFER].set( 0 );
		else
			MV.l_hbHealthBar[BAR_TRANSFER].set( g_pChar.m_nTransferTurnsLeft, g_pChar.m_nTransferInitialTime );
	}

	if ( nBar === BAR_TRACE || nBar === BAR_ALL ) {
		if (g_pChar.m_pTraceIce === null)
			MV.l_hbHealthBar[BAR_TRACE].set( 0 );
		else
			MV.l_hbHealthBar[BAR_TRACE].set( g_pChar.m_nTraceTurnsLeft, g_pChar.m_nTraceInitialTime );
	}

	if ( nBar === BAR_ICE || nBar === BAR_ALL ) {
		if (g_pChar.m_pTargettedIce === null)
			MV.l_hbHealthBar[BAR_ICE].set( 0 );
		else
			MV.l_hbHealthBar[BAR_ICE].set( g_pChar.m_pTargettedIce.m_nHealth );
	}
}

// update active programs bar
MV.UpdateActiveBar = function() {
	MV.l_abActiveChar.add(PROGRAM_ARMOR, g_pChar.m_pActiveArmor !== null);
	MV.l_abActiveChar.add(PROGRAM_SHIELD, g_pChar.m_pActiveShield !== null);
	MV.l_abActiveChar.add(PROGRAM_HIDE, g_pChar.m_pActiveHide !== null);
	MV.l_abActiveChar.add(PROGRAM_REFLECT, g_pChar.m_pActiveReflect !== null);

	// Boost
	if (g_pChar.m_pActiveBoost === null)
		MV.l_abActiveChar.remove(PROGRAM_ATTACK_BOOST);
	else
		MV.l_abActiveChar.add(g_pChar.m_pActiveBoost.m_nClass);
}

MV.UpdateNodeIcons = function() {
	// Silence
	MV.l_abActiveNode.add(PROGRAM_SILENCE, g_pChar.m_pCurrentNode.m_nActiveSilenceLevel > 0);

	// Smoke
	MV.l_abActiveNode.add(PROGRAM_SMOKE, g_pChar.m_pCurrentNode.m_nActiveSmokeLevel > 0);

	// Scan/Eval
	if (g_pChar.m_pActiveScan === null)
		MV.l_abActiveNode.remove(PROGRAM_SCAN);
	else
		MV.l_abActiveNode.add(g_pChar.m_pActiveScan.m_nClass);

	// Special
	MV.l_abActiveNode.add(PROGRAM_CLIENT, g_pChar.m_nClientProgramStatus > 0);
}

MV.UpdateTargetInfo = function() {
	if (g_pChar.m_pTargettedIce !== null) {
		// Show the name
		MV.l_nbIceName.set(g_pChar.m_pTargettedIce.m_szName);

		// Show picture
		if (g_pChar.m_pTargettedIce.m_nState & STATE_MASK_HOSTILE)
			MV.l_idIcePic.setColor(RED);
		else if (g_pChar.m_pTargettedIce.HasQueried())
			MV.l_idIcePic.setColor(YELLOW);
		else
			MV.l_idIcePic.setColor(GREEN);
		MV.l_idIcePic.setImage(g_pChar.m_pTargettedIce.m_nImage);

		MV.l_abActiveIce.add(PROGRAM_SLOW, g_pChar.m_pTargettedIce.m_nSlowLevel);
		MV.l_abActiveIce.add(PROGRAM_VIRUS, g_pChar.m_pTargettedIce.m_nVirusLevel);
		MV.l_abActiveIce.add(PROGRAM_CONFUSE, g_pChar.m_pTargettedIce.m_nConfusionLevel);
		MV.l_abActiveIce.add(PROGRAM_WEAKEN, g_pChar.m_pTargettedIce.m_nWeakenLevel);
		MV.l_abActiveIce.add(PROGRAM_ANALYZE, g_pChar.m_pTargettedIce.m_nAnalyzed);
	} else {
		MV.l_abActiveIce.remove(PROGRAM_SLOW);
		MV.l_abActiveIce.remove(PROGRAM_VIRUS);
		MV.l_abActiveIce.remove(PROGRAM_CONFUSE);
		MV.l_abActiveIce.remove(PROGRAM_WEAKEN);
		MV.l_abActiveIce.remove(PROGRAM_ANALYZE);
		MV.l_nbIceName.set("");
		MV.l_idIcePic.setImage(-1);
		MV.l_idIcePic.setColor(BLUE);
	}

	// Show health bar
	MV.UpdateBar(BAR_ICE);

	// Update the buttons
	MV.UpdateControls();
}

MV.DoQuery = function(pIce) {
	// Send a message
	MV.l_MessageView.AddMessage(pIce.m_szName+" has queried you.", RED);

	// Show the graphic
	MV.l_NodeView.DrawQuery(pIce);
}

MV.SoftwareListUpdate = function() {
	// set up the loaded programs' list
	Anim.add(() => {
		MV.l_tProgramList.setContents( g_pChar.m_olSoftware.filter(p => p.m_nLoadedRating > 0), false );
	});

	MV.UpdateControls();
}

MV.UpdateProgramRating = function() {
	MV.l_tProgramList.redraw();
}

MV.UpdateNodeAccessButtons = function() {
	let mode = null;
	switch (g_pChar.m_pCurrentNode.m_nType) {
		case NT_CPU:
			mode = "cpu";
			break;
		case NT_SPU:
			mode = "spu";
			break;
		case NT_DS:
			mode = "ds";
			break;
		case NT_IO:
			mode = "io";
			break;
		case NT_PORTAL_IN:
		case NT_PORTAL_OUT:
			mode = "prt";
			break;
		case NT_COP:
			if (g_pChar.m_pCurrentNode.m_nSubType === NST_COP_SECURITY) {
				// only show controls if node's subtype is known
				if ( g_pChar.m_pCurrentNode.m_nSpecialImage === NSI_COP_SECURITY )
					mode = "sec";
			}
			break;
	}
	MatrixButton.setMode(mode);
	tooltip.redraw();
}

MV.PlayGameSound = function(nSound) {
	Anim.add(() => {
		PlayGameSound(nSound);
	});
}

// popup_alert.js

// Usage:
//	Popup.alert(mainText, buttonTxt="Ok");
// OR
//	Popup.alert([ [text,btn],text,[text],[text,btn],... ]);
//	- array of popups be shown one after the other
{
	let [obj,span,btnOk] = HTMLbuilder(
		["div", true, [
			["div", true, {style:{padding:"2em",background:"#ddd",textAlign:"left",whiteSpace:"pre-wrap"}}],
			["div", {style:{padding:"1em",textAlign:"right"}}, [
				["button", true, {style:{width:"80px"}}],
			]],
		]],
	);

	Popup.onclick( btnOk, close );


	Popup.create("alert", obj).onInit(initFunc).onKey({"Escape":close,"Enter":close,"Tab":ignore});

	let list;
	function initFunc(txt, btn) {
		if (Array.isArray(txt))
			list = txt;
		else
			list = [ [txt,btn] ];

		show_next();
	}
	function show_next() {
		let data = list.shift();
		let txt, btn="Ok";
		if (Array.isArray(data)) {
			txt = data[0];
			if (data[1] !== undefined) btn = data[1];
		} else {
			txt = data;
		}

		span.textContent = txt;
		btnOk.textContent = btn;
		btnOk.focus();
	}

	function ignore(e) {
		e.preventDefault();
	}

	function close(e) {
		e.preventDefault(); // to stop "Enter" from bubbling and activating a button
		if (list.length)
			show_next();
		else
			Popup.close();
	}

}

// popup_confirm.js

// Usage:
//	Popup.confirm(mainText, options);
//	options is object with any of the following:
//	-	btnYes:    string for the affirmative button. Default: "Yes"
//	-	btnNo:     string for the negative button. Default: "No"
//	-	noDefault: normally, focus begins in the affirmative button, allowing 'Enter' to pick the affirmative button. With this option as true, no focus is set

{
	let [obj,span,btnYes,btnNo] = HTMLbuilder(
		["div", true, [
			["div", true, {style:{padding:"2em",background:"#ddd",textAlign:"left",whiteSpace:"pre-wrap"}}],
			["div", {style:{padding:"1em",textAlign:"right"}}, [
				["button", true, {style:{width:"80px"}}],
				["button", true, {style:{width:"80px",marginLeft:"1em"}}],
			]],
		]],
	);

	Popup.onclick( btnYes, close_yes );
	Popup.onclick( btnNo, close_no );

	Popup.create("confirm", obj).onInit(initFunc).onKey({"Escape":close_no,"Tab":ignore});

	function initFunc(txt, options={}) {
		span.textContent = txt;
		btnYes.textContent = options.btnYes ? options.btnYes : "Yes";
		btnNo.textContent = options.btnNo ? options.btnNo : "No";
		if (!options.noDefault) btnYes.focus();
	}

	function ignore(e) {
		e.preventDefault();
	}

	function close_yes() {
		Popup.close(true);
	}
	function close_no() {
		Popup.close(false);
	}

}

// popup_blocker.js


var Anim = {};

{
	let obj = document.createElement("div");
	Popup.create("blocker", obj, true);



	let running = false;
	let queue = [];

	Anim.add = function(func, ...params) {
		if (running) {
			console.warn("ANIM.ADD WHILE RUNNING");
			(func.bind(...params))();
		} else {
			queue.push( func.bind(...params) );
		}
	}

	Anim.wait = function(ms) {
		if (running)
			console.warn("ANIM.WAIT WHILE RUNNING: "+ms+"ms");
		else
			queue.push(ms);
	}

	Anim.clear = function() {
		queue = [];
	}

	Anim.run = function(cb,why) {
		if (why !== undefined) console.info(why);
		if (cb) Anim.add(cb);
		if (running && cb === undefined) {
			console.warn("ANIM.RUN WHILE RUNNING");
			return;
		}
		running = true;

		while (queue.length) {
			let task = queue.shift();
			if (typeof task === "function")
				task();
			else {
				Popup.blocker();
				setTimeout(() => {
					Popup.close();
					Anim.run(null);
				}, task);
				return;
			}
		}

		if (!queue.length)
			running = false;
	};
}

// popup_welcome.js

{
	let [obj,buttons] = HTMLbuilder(
		["div", true, [
			["div", [
				["div", {style:{width:"157px",height:"74px",background:"url(img/welcome.png)"}}],
				["div", true, {className:"flexV",style:{alignItems:"center",margin:".5em 0"}}, [
					["button", {style:{margin:".5em 0"},textContent:"New Game"}],
					["button", {style:{margin:".5em 0"},textContent:"Load Game"}],
					["button", {style:{margin:".5em 0"},textContent:"Import Game"}],
					["button", {style:{margin:".5em 0"},textContent:"Help"}],
				]],
			]],
		]],
	);

	buttons = [...buttons.children];
	Popup.onclick( buttons[0], new_game );
	Popup.onclick( buttons[1], load_game );
	Popup.onclick( buttons[2], load_file );
	Popup.onclick( buttons[3], open_help );

	// quick fix to stop window from being dragged by the buttons
	buttons[0].onmousedown = e => e.stopPropagation();
	buttons[1].onmousedown = e => e.stopPropagation();
	buttons[2].onmousedown = e => e.stopPropagation();
	buttons[3].onmousedown = e => e.stopPropagation();

	Popup.create("welcome", obj).onInit(initFunc);


	function initFunc() {
		g_pChar = null;
	}

	function new_game() {
		GameFile.New();
	}
	function load_game() {
		Popup.saveslots(false);
	}
	function load_file() {
		GameFile.Import();
	}
	function open_help() {
		window.open("help.html");
	}

}

// popup_newgame.js

{
	let [obj,avatarImg,ironHelp] = HTMLbuilder(
		["div", true, [
			["h2", {textContent:"New Character"}],
			["div", [
				["fieldset", [
					["legend", {textContent:"Character Information"}],
					["div", {textContent:"Character Name:"}],
					["input", {maxLength:CHARNAME_MAXSIZE,style:{width:"100%",marginBottom:"1em"}}],
					["div", {className:"flexH"}, [
						["span", {style:{textAlign:"center"}}, [
							["div", {textContent:"Character Image:"}],
							["div", true, {style:{width:"24px",height:"24px",margin:"1em auto",backgroundImage:"url(img/avatars.png)"}}],
							["button", {style:{width:"24px",height:"24px",margin:"2px"},textContent:"◀"}],
							["button", {style:{width:"24px",height:"24px",margin:"2px"},textContent:"▶"}],
						]],
						["span", {style:{width:"50px"}}],
						["div", {className:"flexV"}, [
							["div", {textContent:"Starting Bonus:"}],
							["label", [
								["input", {name:"initial_bonus",type:"radio"}],
								["span", {textContent:"None (Tough Guy)"}],
							]],
							["label", [
								["input", {name:"initial_bonus",type:"radio"}],
								["span", {textContent:"Skills"}],
							]],
							["label", [
								["input", {name:"initial_bonus",type:"radio"}],
								["span", {textContent:"Hardware"}],
							]],
							["label", [
								["input", {name:"initial_bonus",type:"radio"}],
								["span", {textContent:"Software"}],
							]],
							["label", [
								["input", {name:"initial_bonus",type:"radio"}],
								["span", {textContent:"Money"}],
							]],
						]],
					]],
				]],
				["fieldset", {style:{textAlign:"left"}}, [
					["legend", {textContent:"Game Options"}],
					["div", [
						["label", [
							["input", {type:"checkbox"}],
							["span", {textContent:"Ironman Mode "}],
						]],
						["span", true, {textContent:"(?)",style:{color:"blue",cursor:"help"}}],
					]],
					["div", [
						["label", [
							["input", {type:"checkbox"}],
							["span", {textContent:"Tooltips"}],
						]],
					]],
				]],
				["div", {className:"btnGroup"}, [
					["button", {textContent:"OK"}],
					["button", {textContent:"Cancel"}],
				]],
			]],
		]],
	);


	ironHelp.onclick = () => {
		Popup.alert("Ironmen don't need to save in the matrix.");
	}

	let inputs = [...obj.getElementsByTagName("input")];
	let buttons = [...obj.getElementsByTagName("button")];

	Popup.onclick( buttons[0], avatar_prev );
	Popup.onclick( buttons[1], avatar_next );
	Popup.onclick( buttons[2], ok );
	Popup.onclick( buttons[3], close );

	Popup.create("newgame", obj).onInit(initFunc).onKey({"Escape":close});

	let avatar_number = 0;

	function initFunc() {
		inputs[0].value = "Hacker X";
		inputs[0].focus();
		inputs[0].select();
		inputs[1].checked = true;
		inputs[2].checked = false;
		inputs[3].checked = false;
		inputs[4].checked = false;
		inputs[5].checked = false;
		inputs[6].checked = false;
		inputs[7].checked = false;
		avatar_number = 1;
		avatar_prev();
	}

	function avatar_prev() {
		avatar_number--;
		if (avatar_number < 0) avatar_number += MAX_AVATAR;
		avatarImg.style.backgroundPositionX = (-avatar_number*24)+"px";
	}
	function avatar_next() {
		avatar_number++;
		if (avatar_number >= MAX_AVATAR) avatar_number -= MAX_AVATAR;
		avatarImg.style.backgroundPositionX = (-avatar_number*24)+"px";
	}

	function close() { Popup.close(); }
	function ok() {
		let charname = inputs[0].value.trim();
		if (charname === "") {
			Popup.alert("Please enter a name.").then( () => inputs[0].focus() );
			return;
		}

		let bonus = 0;
		if (inputs[1].checked) bonus = BONUS_NONE;
		if (inputs[2].checked) bonus = BONUS_SKILLS;
		if (inputs[3].checked) bonus = BONUS_HARDWARE;
		if (inputs[4].checked) bonus = BONUS_SOFTWARE;
		if (inputs[5].checked) bonus = BONUS_MONEY;
		var R = {
			name : charname,
			avatar : avatar_number,
			bonus : bonus,
			ironman : inputs[6].checked,
			tooltips : inputs[7].checked,
		};
		Popup.close(R);
	}

}

// popup_saveslots.js

{
	let [obj,h2,slots,btnClose] = HTMLbuilder(
		["div", true, [
			["h2", true, {textContent:"Save Slots"}],
			["div", [
				["div", true, {className:"flexH",style:{width:"850px",justifyContent:"space-between",marginBottom:".5em"}}, [
					["button", {style:{width:"200px",height:"200px"}}],
					["button", {style:{width:"200px",height:"200px"}}],
					["button", {style:{width:"200px",height:"200px"}}],
					["button", {style:{width:"200px",height:"200px"}}],
				]],
				["div", {className:"btnGroup"}, [
					["button", true, {textContent:"Cancel"}],
				]],
			]],
		]],
	);

	Popup.onclick( slots.children[0], clickedOn.bind(null,1) );
	Popup.onclick( slots.children[1], clickedOn.bind(null,2) );
	Popup.onclick( slots.children[2], clickedOn.bind(null,3) );
	Popup.onclick( slots.children[3], clickedOn.bind(null,4) );
	Popup.onclick( btnClose, close );

	Popup.create("saveslots", obj).onInit(initFunc).onKey({"Escape":close});


	let saving;
	let empties = [];

	function initFunc(save=false) {
		saving = !!save;
		if (saving)
			h2.textContent = "Save Game";
		else
			h2.textContent = "Load Game";

		for (let i=1; i<=4; i++) {
			let slot = slots.children[i-1];
			let data = GameFile.slotData(i);

			if (data === null) {
				slot.innerHTML = "<span style='color:#666'>&mdash; Empty &mdash;</span>";
				slot.disabled = saving ? false : true;
				empties[i] = true;
			} else if (data === false) {
				slot.innerHTML = "<span style='color:red'>&mdash; Bad Data &mdash;</span>";
				slot.disabled = saving ? false : true;
				empties[i] = true;
			} else {
				let html = "";
				html += "<div style='display:inline-block;width:24px;height:24px;background-image:url(img/avatars.png);background-position-x:"+(-24*data.avatar)+"px'></div>";
				html += "<br><b>"+escapeHTML(data.name)+"</b>";
				html += "<br>"+(data.ironman ? "(Ironman)" : "");
				html += "<br>";
				html += "<br>"+escapeHTML(data.reputation);
				html += "<br>"+data.money+" credits";
				html += "<br>"+data.date;
				slot.innerHTML = "<div>" + html + "</div>";

				slot.disabled = false;
				empties[i] = false;
			}
		}
	}

	function clickedOn(nSlot) {
		if (saving) {
			if (empties[nSlot]) {
				GameFile.Save(nSlot);
				Popup.close();
				Popup.alert("The game has been saved.");
			} else {
				Popup.confirm("Overwrite save, are you sure?").onYes(() => {
					GameFile.Save(nSlot);
					Popup.close();
					Popup.alert("The game has been saved.");
				});
			}
		} else {
			if (empties[nSlot]) return;
			GameFile.Load(nSlot);
		}
	}

	function close() {
		Popup.close();
	}

}

// popup_homeview.js

{
	let [obj] = HTMLbuilder(
		["div", true, {id:"popup_homeview"}, [
			["h2", {textContent:"Decker @ Home"}],
			["div", {style:{background:"#33f",color:"white"}}, [
				["li", [
					["button", {style:{backgroundPositionX:"0"}}],
					["span", {textContent:"View Character"}],
				]],
				["li", [
					["button", {style:{backgroundPositionX:"-24px"}}],
					["span", {textContent:"View Cyberdeck"}],
				]],
				["li", [
					["button", {style:{backgroundPositionX:"-48px"}}],
					["span", {textContent:"View Contracts"}],
				]],
				["li", [
					["button", {style:{backgroundPositionX:"-72px"}}],
					["span", {textContent:"Buy Hardware/Software"}],
				]],
				["li", [
					["button", {style:{backgroundPositionX:"-96px"}}],
					["span", {textContent:"Projects"}],
				]],
				["li", [
					["button", {style:{backgroundPositionX:"-120px"}}],
					["span", {textContent:"Rest and Recuperate"}],
				]],
				["li", [
					["button", {style:{backgroundPositionX:"-144px"}}],
					["span", {textContent:"Enter the Matrix"}],
				]],
				["li", [
					["button", {style:{backgroundPositionX:"-168px"}}],
					["span", {textContent:"Game Options"}],
				]],
			]],
		]],
	);


	let buttons = [...obj.getElementsByTagName("button")];
	Popup.onclick( buttons[0], view_char );
	Popup.onclick( buttons[1], view_deck );
	Popup.onclick( buttons[2], view_contract );
	Popup.onclick( buttons[3], view_shop );
	Popup.onclick( buttons[4], view_project );
	Popup.onclick( buttons[5], view_rest );
	Popup.onclick( buttons[6], view_matrix );
	Popup.onclick( buttons[7], view_options );

	Popup.create("homeview", obj);


	function view_char() {
		Popup.charview();
	}
	function view_deck() {
		Popup.deckview();
	}
	function view_contract() {
		if (g_pChar.m_pCurrentContract !== null) {
			// Contract selected
			Popup.contract();
		} else {
			// No contract selected
			Popup.contracts();
		}
	}
	function view_shop() {
		Popup.shopview();
	}
	function view_project() {
		Popup.projects();
	}
	function view_rest() {
		Popup.rest();
	}
	function view_options() {
		Popup.options();
	}

	function view_matrix() {
		// Make sure we have a contract
		if (g_pChar.m_pCurrentContract === null) {
			Popup.alert("No contract has been accepted.");
			return;
		}

		// Generate the system for this contract
		g_pChar.m_pSystem = new System();
		g_pChar.m_pSystem.Generate(g_pChar.m_pCurrentContract.m_nCorporation, g_pChar.m_pCurrentContract.m_nSystemSize, 0);

		// Reset some run-time data
		g_pChar.m_dwRunFlags = 0;
		g_pChar.m_nHealthMental = MAX_HEALTH;
		g_pChar.m_nHealthDeck = MAX_HEALTH;
		g_pChar.m_pTraceIce = null;
		g_pChar.m_nTraceInitialTime = 0;
		g_pChar.m_nTraceTurnsLeft = 0;
		g_pChar.m_pTargettedIce = null;
		g_pChar.m_pTraceIce = null;
		g_pChar.m_bTraced = false;
		g_pChar.m_pTransferProgram = null;
		g_pChar.m_pTransferFile = null;
		g_pChar.m_pActiveScan = null;
		g_pChar.m_pActiveBoost = null;
		g_pChar.m_nRunTime = 0;
		g_pChar.m_nDecoyCount = 0;
		g_pChar.m_nDamageMental = 0;
		g_pChar.m_nDamageDeck = 0;

		// Verify that the default attack program is loaded FIXME: how could this happen? And what if we end up overloaded?
		if (g_pChar.m_pDefAttackProgram !== null) {
			if ( !g_pChar.m_pDefAttackProgram.m_bLoadByDefault )
				console.warn("Default attack program not loaded. Loading");
			g_pChar.m_pDefAttackProgram.m_bLoadByDefault = true;
		}

		// Load the default programs
		g_pChar.calcCurrentLoad();

		// Set the active programs
		g_pChar.m_pActiveArmor   = g_pChar.m_pDefArmorProgram;
		g_pChar.m_pActiveShield  = g_pChar.m_pDefShieldProgram;
		g_pChar.m_pActiveHide    = g_pChar.m_pDefHideProgram;
		g_pChar.m_pActiveReflect = g_pChar.m_pDefReflectProgram;

		// Get the entry node
		let pEntryNode = g_pChar.m_pSystem.m_pSystemPortalOut;
		if (!g_pChar.m_bBackdoor[g_pChar.m_pCurrentContract.m_nCorporation]) {
			PlayGameSound(SOUND_ENTERMATRIX);
			view_matrix_2(pEntryNode);
			return;
		}

		Popup.confirm("You have a backdoor to this system. Use it?").then(R => {
			if (R) pEntryNode = g_pChar.m_pSystem.m_pSystemCPU;
			PlayGameSound(SOUND_ENTERMATRIX);
			view_matrix_2(pEntryNode);
		});
	}
	function view_matrix_2(pEntryNode) {
		// Set current node so map view won't crash
		g_pChar.m_pCurrentNode = pEntryNode;

		// Put the user in the matrix
		g_pChar.m_bOnRun = true;

		// Close this window and show the matrix's
		Popup.close();
		Popup.matrix(pEntryNode);
	}

}

// popup_charview.js

{
	let [obj, txtName,txtRep,txtMoney,txtHealth, txtDate, sklAtt,sklDef,sklStl,sklAna,sklPrg,sklChp,sklUnused, txtStyle,txtCost,txtDue,txtUpgr] = HTMLbuilder(
		["div", true, {id:"popup_charview"}, [
			["h2", {textContent:"Character Information"}],
			["div", {className:"flexV"}, [
				["div", {className:"flexH",style:{justifyContent:"space-between"}}, [
					["div", {style:{lineHeight:"1.5"},textContent:"Name:\nReputation:\nMoney:\nPhysical Health: "}],
					["div", {style:{lineHeight:"1.5"}}, [
						["div", true], // txtName
						["div", true], // txtRep
						["div", true], // txtMoney
						["div", true], // txtHealth
					]],
					["div", true, {style:{flexGrow:1,textAlign:"right"}}], // txtDate
				]],
				["div", {className:"flexH",style:{marginTop:"1em"}}, [
					["fieldset", [
						["legend", {textContent:"Skills"}],
						["div", {style:{display:"grid",gridTemplateColumns:"auto 25px 1.5em auto",gridRowGap:"3px",alignItems:"center"}}, [
							["div", {style:{gridColumn:"3/4",gridRow:"1/7"}}],
							["div", {textContent:"Attack:"}],
							["div", true, {style:{textAlign:"right"}}], // sklAtt
							["button", {textContent:"+"}],
							["div", {textContent:"Defense:"}],
							["div", true, {style:{textAlign:"right"}}], // sklDef
							["button", {textContent:"+"}],
							["div", {textContent:"Stealth:"}],
							["div", true, {style:{textAlign:"right"}}], // sklStl
							["button", {textContent:"+"}],
							["div", {textContent:"Analysis:"}],
							["div", true, {style:{textAlign:"right"}}], // sklAna
							["button", {textContent:"+"}],
							["div", {textContent:"Programming:"}],
							["div", true, {style:{textAlign:"right"}}], // sklPrg
							["button", {textContent:"+"}],
							["div", {textContent:"Chip Design:"}],
							["div", true, {style:{textAlign:"right"}}], // sklChp
							["button", {textContent:"+"}],
							["div", {textContent:"Unused Skill Points:",style:{marginTop:"1em"}}],
							["div", true, {style:{textAlign:"right",marginTop:"1em"}}], // txtUnused
						]],
					]],
					["fieldset", [
						["legend", {textContent:"LifeStyle"}],
						["div", {style:{display:"grid",gridTemplateColumns:"auto auto auto",gridGap:"3px 10px",alignItems:"center"}}, [
							["div", {textContent:"Current Lifestyle:"}],
							["div", true], // txtStyle
							["button", {style:{visibility:"hidden"}}],
							["div", {textContent:"Monthly Cost:"}],
							["div", true], // txtCost
							["button", {style:{visibility:"hidden"}}],
							["div", {textContent:"Due in:"}],
							["div", true], // txtDue
							["button", {style:{visibility:"hidden"}}],
							["div", {textContent:"Cost to Upgrade:"}],
							["div", true], // txtUpgr
							["button", {textContent:"Upgrade",style:{width:"80px"}}],
						]],
					]],
				]],
				["div", {className:"btnGroup"}, [
					["button", {textContent:"View Deck"}],
					["button", {textContent:"Close"}],
				]],
			]],
		]],
	);


	let buttons = [...obj.getElementsByTagName("button")];
	Popup.onclick( buttons[0], upgrade_attack );
	Popup.onclick( buttons[1], upgrade_defense );
	Popup.onclick( buttons[2], upgrade_stealth );
	Popup.onclick( buttons[3], upgrade_analysis );
	Popup.onclick( buttons[4], upgrade_programming );
	Popup.onclick( buttons[5], upgrade_chipdesign );
	// buttons 6 to 8 are hidden placeholders so that the lines look well spaced
	Popup.onclick( buttons[9], upgrade_lifestyle );
	Popup.onclick( buttons[10], view_deck );
	Popup.onclick( buttons[11], close );

	Popup.create("charview", obj).onInit(initFunc).onKey({"Escape":close});


	function initFunc() {
		// basic character data
		let rep = g_szRepLevelString[g_pChar.m_nRepLevel];
		if (g_pChar.m_nRepLevel === ((g_pChar.m_nLifestyle + 1) * 4))
			rep += " (Max)";
		txtName.textContent = g_pChar.m_szName; // name
		txtRep.textContent = rep; // reputation
		txtMoney.textContent = g_pChar.m_nCredits; // money
		txtHealth.textContent = g_pChar.m_nHealthPhysical*HEALTH_INCREMENT + "%"; // health

		// other data (date / ironman)
		let extra = g_szMonthNames[g_pChar.m_nMonth] + " " + (g_pChar.m_nDayOfMonth+1) + ", " + g_pChar.m_nYear;
		if (g_pChar.m_bIronMan) extra += "\n(Ironman)";
		txtDate.textContent = extra;

		// skills
		sklAtt.textContent = g_pChar.m_nAttackSkill; // attack
		sklDef.textContent = g_pChar.m_nDefenseSkill; // defense
		sklStl.textContent = g_pChar.m_nStealthSkill; // stealth
		sklAna.textContent = g_pChar.m_nAnalysisSkill; // analysis
		sklPrg.textContent = g_pChar.m_nProgrammingSkill; // programming
		sklChp.textContent = g_pChar.m_nChipDesignSkill; // chip design
		sklUnused.textContent = g_pChar.m_nSkillPoints; // unused points

		// lifestyle
		txtStyle.textContent = g_pChar.GetLifestyleString(); // lifestyle
		txtCost.textContent = g_nLifestyleMonthlyCost[g_pChar.m_nLifestyle]; // rent
		let dueIn = (GetDays(g_pChar.m_nMonth,g_pChar.m_nYear) - g_pChar.m_nDayOfMonth);
		txtDue.textContent = (dueIn>1) ? (dueIn + " days") : "Tomorrow"; // due in
		if (g_pChar.m_nLifestyle !== MAX_LIFESTYLE)
			txtUpgr.textContent = g_nLifestyleMonthlyCost[g_pChar.m_nLifestyle+1] * LIFESTYLE_UPGRADE_FACTOR;
		else
			txtUpgr.textContent = "-";

		// disable/enable buttons
		if (g_pChar.m_bOnRun) {
			buttons[0].disabled = true;
			buttons[1].disabled = true;
			buttons[2].disabled = true;
			buttons[3].disabled = true;
			buttons[4].disabled = true;
			buttons[5].disabled = true;
			buttons[9].disabled = true;
		} else {
			buttons[0].disabled = (g_pChar.m_nAttackSkill > g_pChar.m_nSkillPoints);
			buttons[1].disabled = (g_pChar.m_nDefenseSkill > g_pChar.m_nSkillPoints);
			buttons[2].disabled = (g_pChar.m_nStealthSkill > g_pChar.m_nSkillPoints);
			buttons[3].disabled = (g_pChar.m_nAnalysisSkill > g_pChar.m_nSkillPoints);
			buttons[4].disabled = (g_pChar.m_nProgrammingSkill > g_pChar.m_nSkillPoints);
			buttons[5].disabled = (g_pChar.m_nChipDesignSkill > g_pChar.m_nSkillPoints);
			buttons[9].disabled = (g_pChar.m_nLifestyle===MAX_LIFESTYLE || g_pChar.m_nCredits < (g_nLifestyleMonthlyCost[g_pChar.m_nLifestyle+1] * LIFESTYLE_UPGRADE_FACTOR));
		}
	}

	function upgrade_attack() {
		g_pChar.m_nSkillPoints -= g_pChar.m_nAttackSkill;
		g_pChar.m_nAttackSkill++;
		initFunc();
	}
	function upgrade_defense() {
		g_pChar.m_nSkillPoints -= g_pChar.m_nDefenseSkill;
		g_pChar.m_nDefenseSkill++;
		initFunc();
	}
	function upgrade_stealth() {
		g_pChar.m_nSkillPoints -= g_pChar.m_nStealthSkill;
		g_pChar.m_nStealthSkill++;
		initFunc();
	}
	function upgrade_analysis() {
		g_pChar.m_nSkillPoints -= g_pChar.m_nAnalysisSkill;
		g_pChar.m_nAnalysisSkill++;
		initFunc();
	}
	function upgrade_programming() {
		g_pChar.m_nSkillPoints -= g_pChar.m_nProgrammingSkill;
		g_pChar.m_nProgrammingSkill++;
		initFunc();
	}
	function upgrade_chipdesign() {
		g_pChar.m_nSkillPoints -= g_pChar.m_nChipDesignSkill;
		g_pChar.m_nChipDesignSkill++;
		initFunc();
	}
	function upgrade_lifestyle() {
		g_pChar.m_nLifestyle++;
		g_pChar.m_nCredits -= (g_nLifestyleMonthlyCost[g_pChar.m_nLifestyle] * LIFESTYLE_UPGRADE_FACTOR);
		initFunc();

		Popup.alert("Lifestyle upgraded. New contracts and shop items are now available.");

		g_pChar.GenerateShopItems();
		g_pChar.ClearContracts();
		g_pChar.GenerateContracts();
	}
	function view_deck() {
		Popup.close();
		Popup.deckview();
	}
	function close() {
		Popup.close();
	}

}

// popup_deckview.js

{
	let [obj,lvlCpu,lvlCop,lvlAtt,lvlDef,lvlStl,lvlAna,otherHard,tList,curLoad,txtLoad] = HTMLbuilder(
		["div", true, [
			["h2", {textContent:"Cyberdeck Configuration"}],
			["div", [
				["fieldset", [
					["legend", {textContent:"Hardware"}],
					["div", {className:"flexH",style:{justifyContent:"space-between"}}, [
						["div", {style:{display:"grid",gridTemplateColumns:"auto 1fr",gridGap:"3px"}}, [
							["div", {textContent:"CPU Rating:"}],
							["span", true],
							["div", {textContent:"Coprocessor:"}],
							["span", true],
							["div", {textContent:"Attack Firmware:"}],
							["span", true],
							["div", {textContent:"Defense Firmware:"}],
							["span", true],
							["div", {textContent:"Stealth Firmware:"}],
							["span", true],
							["div", {textContent:"Analysis Firmware:"}],
							["span", true],
						]],
						["div", {style:{marginLeft:"5em"}}, [
							["div", {textContent:"Optional Hardware:"}],
							["div", true, {style:{marginLeft:"2em"}}],
						]],
						["div"],
					]],
				]],
				["fieldset", [
					["legend", {textContent:"Software"}],
					["div", {style:{display:"grid",gridTemplateColumns:"1fr 1fr auto auto",gridRowGap:".5em"}}, [
						["div", true, {className:"tableList",style:{gridColumn:"span 2"}}],
						["div", {style:{alignSelf:"center"}}, [
							["button", {textContent:"⬆",style:{margin:".5em",width:"24px",height:"24px"}}],
							["br"],
							["button", {textContent:"⬇",style:{margin:".5em",width:"24px",height:"24px"}}],
						]],
						["div", {className:"flexV",style:{gridRow:"span 2",justifyContent:"space-between"}}, [
							["button", {textContent:"Load"}],
							["button", {textContent:"Default"}],
							["button", {textContent:"Clear All"}],
							["button", {textContent:"Trash"}],
							["button", {textContent:"Rename"}],
							["button", {textContent:"Sound Effect"}],
						]],
						["div", {textContent:"Current Load: "}, [
							["span", true],
						]],
						["div", [
							["div", {style:{display:"inline-block",marginRight:".5em"},textContent:"Light Load:\nAverage Load:\nHeavy Load:"}],
							["div", true, {style:{display:"inline-block"}}]
						]],
					]],
				]],
				["div", {className:"btnGroup"}, [
					["button", {textContent:"View Char."}],
					["button", {textContent:"Close"}],
				]],
			]],
		]],
	);


	tList = new tableList( tList, 150, "softwarelist" );
	tList.onClick = UpdateControls;
	tList.onSort = sort_click;
	tList.setColumns([
		[ null,      pProgram => pProgram.m_nClass ],
		[ "Name",    pProgram => pProgram.m_szName ],
		[ "Class",   pProgram => GetProgramClassName(pProgram.m_nClass) ],
		[ "Rating",  pProgram => pProgram.m_nRating ],
		[ "Size",    pProgram => pProgram.GetSize() + " MP" ],
		[ "Loaded",  pProgram => pProgram.m_nLoadedRating ? "Yes" : "No" ],
		[ "Load",    pProgram => pProgram.m_bLoadByDefault ? "Yes" : "No" ],
		[ "Default", pProgram => (pProgram === g_pChar.m_pDefAttackProgram || pProgram === g_pChar.m_pDefArmorProgram || pProgram === g_pChar.m_pDefShieldProgram || pProgram === g_pChar.m_pDefHideProgram || pProgram === g_pChar.m_pDefReflectProgram) ? "Yes" : "No" ],
	]);

	let buttons = [...obj.getElementsByTagName("button")];
	Popup.onclick( buttons[0], move_up );
	Popup.onclick( buttons[1], move_down );
	Popup.onclick( buttons[2], program_load );
	Popup.onclick( buttons[3], set_default );
	Popup.onclick( buttons[4], clear_all );
	Popup.onclick( buttons[5], trash );
	Popup.onclick( buttons[6], rename );
	Popup.onclick( buttons[7], resound );
	Popup.onclick( buttons[8], view_char );
	Popup.onclick( buttons[9], close );

	Popup.create("deckview", obj).onInit(initFunc0).onKey({"Escape":close, "C+ArrowUp":move_up, "C+ArrowDown":move_down}).onKey(tList.keyBindings());

	// Load ratings
	let l_nLightLoad, l_nHeavyLoad, l_nMaxLoad, l_nDefaultLoad;

	function UpdateControls(pProgram) {
		// update the controls:

		// all disabled by default
		for (let i=0; i<=7; i++)
			buttons[i].disabled = true;

		// If on run, everything disabled
		if (g_pChar.m_bOnRun) return;

		// Not on run, so clear always enabled
		buttons[4].disabled = false;

		// If nothing selected, done
		if (!pProgram) return;

		// Enable the up/down arrows, as needed
		if (pProgram !== g_pChar.m_olSoftware[0])
			buttons[0].disabled = false;
		if (pProgram !== g_pChar.m_olSoftware[g_pChar.m_olSoftware.length-1])
			buttons[1].disabled = false;

		// Always enable the load button, and set text
		buttons[2].disabled = false;
		if (pProgram.m_bLoadByDefault)
			buttons[2].textContent = "Unload";
		else
			buttons[2].textContent = "Load";

		// Always enable trash, rename and resound
		buttons[5].disabled = false;
		buttons[6].disabled = false;
		buttons[7].disabled = false;

		// See if we should enable the Default button
		if ( pProgram.m_nClass === PROGRAM_ATTACK || pProgram.m_nClass === PROGRAM_ATTACK_A || pProgram.m_nClass === PROGRAM_ATTACK_P || pProgram.m_nClass === PROGRAM_VIRUS || pProgram.m_nClass === PROGRAM_SHIELD || pProgram.m_nClass === PROGRAM_ARMOR || pProgram.m_nClass === PROGRAM_HIDE || pProgram.m_nClass === PROGRAM_REFLECT )
			buttons[3].disabled = false;
	}

	function initFunc0() {
		tList.clear();
		initFunc();
	}
	function initFunc() {
		buttons[2].textContent = "Load";

		// chip levels
		lvlCpu.textContent = g_pChar.m_nChip[CHIP_CPU];
		lvlCop.textContent = g_pChar.m_nChip[CHIP_COPROCESSOR];
		lvlAtt.textContent = g_pChar.m_nChip[CHIP_ATTACK];
		lvlDef.textContent = g_pChar.m_nChip[CHIP_DEFENSE];
		lvlStl.textContent = g_pChar.m_nChip[CHIP_STEALTH];
		lvlAna.textContent = g_pChar.m_nChip[CHIP_ANALYSIS];

		// other hardware
		let other_hw = "";
		for (let i = 0; i < NUM_HW; i++)
			if (g_pChar.m_nHardware[i] !== 0)
				other_hw += GetHardwareString(i, g_pChar.m_nHardware[i]) + "\n";
		otherHard.textContent = other_hw;

		// Get the load ratings
		[l_nLightLoad, l_nHeavyLoad, l_nMaxLoad] = g_pChar.GetLoadRatings();
		let loadTxt = "";
		loadTxt += "0 - "+(l_nLightLoad-1)+" MP\n";
		loadTxt += l_nLightLoad+" - "+l_nHeavyLoad+" MP\n";
		loadTxt += (l_nHeavyLoad+1)+" - "+l_nMaxLoad+" MP\n";
		txtLoad.textContent = loadTxt;

		// calculate load
		l_nDefaultLoad = 0;
		g_pChar.m_olSoftware.forEach(pProgram => {
			if (g_pChar.m_bOnRun) {
				if (pProgram.m_nLoadedRating)
					l_nDefaultLoad += pProgram.GetSize();
			} else {
				if (pProgram.m_bLoadByDefault)
					l_nDefaultLoad += pProgram.GetSize();
			}
		});

		// update load
		if (l_nDefaultLoad < l_nLightLoad)
			curLoad.textContent = l_nDefaultLoad+" MP (Light)";
		else if (l_nDefaultLoad > l_nHeavyLoad)
			curLoad.textContent = l_nDefaultLoad+" MP (Heavy)";
		else
			curLoad.textContent = l_nDefaultLoad+" MP (Average)";

		// update the controls:
		UpdateControls();

		// set up the software list
		if (g_pChar.m_bOnRun)
			tList.setIgnoreColumns(6,7); // ignore "Load" and "Default"
		else
			tList.setIgnoreColumns(5); // ignore "Loaded"
		tList.setContents(g_pChar.m_olSoftware);
	}


	function view_char() {
		Popup.close();
		Popup.charview();
	}
	function close() {
		Popup.close();
	}

	function move_up() {
		if (buttons[0].disabled) return;
		let i = g_pChar.m_olSoftware.indexOf( tList.getSelected() );

		let tmp = g_pChar.m_olSoftware[i];
		g_pChar.m_olSoftware[i] = g_pChar.m_olSoftware[i-1];
		g_pChar.m_olSoftware[i-1] = tmp;
		initFunc();
	}
	function move_down() {
		if (buttons[1].disabled) return;
		let i = g_pChar.m_olSoftware.indexOf( tList.getSelected() );

		let tmp = g_pChar.m_olSoftware[i];
		g_pChar.m_olSoftware[i] = g_pChar.m_olSoftware[i+1];
		g_pChar.m_olSoftware[i+1] = tmp;
		initFunc();
	}

	function program_load() {
		let pProgram = tList.getSelected();

		// Is this a load or unload?
		if (pProgram.m_bLoadByDefault) { // Unload
			// Clear loaded rating
			pProgram.m_bLoadByDefault = false;

			// update default
			if (pProgram === g_pChar.m_pDefAttackProgram)
				g_pChar.m_pDefAttackProgram = null;
			else if (pProgram === g_pChar.m_pDefArmorProgram)
				g_pChar.m_pDefArmorProgram = null;
			else if (pProgram === g_pChar.m_pDefShieldProgram)
				g_pChar.m_pDefShieldProgram = null;
			else if (pProgram === g_pChar.m_pDefHideProgram)
				g_pChar.m_pDefHideProgram = null;
			else if (pProgram === g_pChar.m_pDefReflectProgram)
				g_pChar.m_pDefReflectProgram = null;
		} else { // Load
			// Check max load
			if ((l_nDefaultLoad + pProgram.GetSize()) > l_nMaxLoad) {
				Popup.alert("This would overload your deck.");
				return;
			}

			// Set default load
			pProgram.m_bLoadByDefault = true;
		}

		initFunc();
	}
	function set_default() {
		let pProgram = tList.getSelected();

		// Check max load, if needed
		if ( !pProgram.m_bLoadByDefault && (l_nDefaultLoad + pProgram.GetSize() > l_nMaxLoad) ) {
			Popup.alert("This would overload your deck.");
			return;
		}

		// Set the default value, if not already
		let ppDefProgram;
		if ( (pProgram.m_nClass === PROGRAM_ATTACK || pProgram.m_nClass === PROGRAM_ATTACK_A || pProgram.m_nClass === PROGRAM_ATTACK_P || pProgram.m_nClass === PROGRAM_VIRUS) && g_pChar.m_pDefAttackProgram !== pProgram )
			g_pChar.m_pDefAttackProgram = pProgram;
		else if ( pProgram.m_nClass === PROGRAM_SHIELD && g_pChar.m_pDefShieldProgram !== pProgram )
			g_pChar.m_pDefShieldProgram = pProgram;
		else if ( pProgram.m_nClass === PROGRAM_ARMOR && g_pChar.m_pDefArmorProgram !== pProgram )
			g_pChar.m_pDefArmorProgram = pProgram;
		else if ( pProgram.m_nClass === PROGRAM_HIDE && g_pChar.m_pDefHideProgram !== pProgram )
			g_pChar.m_pDefHideProgram = pProgram;
		else if ( pProgram.m_nClass === PROGRAM_REFLECT && g_pChar.m_pDefReflectProgram !== pProgram )
			g_pChar.m_pDefReflectProgram = pProgram;
		else return;

		// Set us to load if not already done
		pProgram.m_bLoadByDefault = true;

		initFunc();
	}
	function clear_all() {
		g_pChar.m_olSoftware.forEach(pProgram => pProgram.m_bLoadByDefault = false);
		g_pChar.m_pDefAttackProgram = null;
		g_pChar.m_pDefArmorProgram = null;
		g_pChar.m_pDefShieldProgram = null;
		g_pChar.m_pDefHideProgram = null;
		g_pChar.m_pDefReflectProgram = null;

		initFunc();
	}
	function trash() {
		let pProgram = tList.getSelected();

		// Query for confirmation
		Popup.confirm("Are you sure you wish to delete this program?").onYes(() => {
			// Update default
			if (pProgram.m_bLoadByDefault) {
				if (pProgram === g_pChar.m_pDefAttackProgram)
					g_pChar.m_pDefAttackProgram = null;
				else if (pProgram === g_pChar.m_pDefArmorProgram)
					g_pChar.m_pDefArmorProgram = null;
				else if (pProgram === g_pChar.m_pDefShieldProgram)
					g_pChar.m_pDefShieldProgram = null;
				else if (pProgram === g_pChar.m_pDefHideProgram)
					g_pChar.m_pDefHideProgram = null;
				else if (pProgram === g_pChar.m_pDefReflectProgram)
					g_pChar.m_pDefReflectProgram = null;
			}

			// Delete the program
			g_pChar.m_olSoftware.remove(pProgram);

			initFunc();
		});
	}
	function rename() {
		let pProgram = tList.getSelected();

		Popup.deckname(pProgram.m_szName).onYes(newName => {
			if (newName === "") {
				Popup.alert("Please enter a name.").then(rename);
			} else {
				pProgram.m_szName = newName;
				initFunc();
			}
		});
	}
	function resound() {
		let pProgram = tList.getSelected();

		Popup.decksound(pProgram.m_nSound,pProgram.m_nClass).onYes(R => {
			pProgram.m_nSound = R;
		});
	}

	function sort_click(criteria) {
		// comparison functions:
		let cmpByName = (a,b) => {
			if ( a.m_szName > b.m_szName ) return 1;
			if ( a.m_szName < b.m_szName ) return -1;
			return 0;
		};
		let cmpByClass = (a,b) => a.m_nClass - b.m_nClass;
		let cmpByRating = (a,b) => b.m_nRating - a.m_nRating; // note a and b are reversed, to sort from big to small
		let cmpBySize = (a,b) => a.GetSize() - b.GetSize();
		let cmpByLoaded = (a,b) => (b.m_nLoadedRating?1:0) - (a.m_nLoadedRating?1:0);
		let cmpByLoad = (a,b) => b.m_bLoadByDefault - a.m_bLoadByDefault;
		let cmpByDefault = (a,b) => {
			let valA = (a === g_pChar.m_pDefAttackProgram || a === g_pChar.m_pDefArmorProgram || a === g_pChar.m_pDefShieldProgram || a === g_pChar.m_pDefHideProgram || a === g_pChar.m_pDefReflectProgram);
			let valB = (b === g_pChar.m_pDefAttackProgram || b === g_pChar.m_pDefArmorProgram || b === g_pChar.m_pDefShieldProgram || b === g_pChar.m_pDefHideProgram || b === g_pChar.m_pDefReflectProgram);
			return (valB?1:0) - (valA?1:0);
		}

		let cmpFunc;
		switch (criteria) {
			case 0: cmpFunc = cmpByName; break;
			case 1: cmpFunc = cmpByClass; break;
			case 2: cmpFunc = cmpByRating; break;
			case 3: cmpFunc = cmpBySize; break;
			case 4: cmpFunc = g_pChar.m_bOnRun ? cmpByLoaded : cmpByLoad; break;
			case 5: cmpFunc = cmpByDefault; break;
			default: return;
		}

		// g_pChar.m_olSoftware.sort(cmpFunc); // sort stability isn't ensured by JS standard. Rolling my own:
		let original = g_pChar.m_olSoftware.slice(0);
		g_pChar.m_olSoftware.sort((a,b) => {
			let result = cmpFunc(a,b);
			if (result) return result;
			return original.indexOf(a) - original.indexOf(b);
		});

		initFunc();
	}

}

// popup_deckname.js

{
	let [obj,input,btnOk,btnClose] = HTMLbuilder(
		["div", true, [
			["h2", {textContent:"Program Name"}],
			["div", {className:"flexV"}, [
				["div", {textContent:"Enter a new name for the program:"}],
				["input", true, {maxLength:PROGNAME_MAXSIZE}],
				["div", {className:"btnGroup"}, [
					["button", true, {textContent:"OK"}],
					["button", true, {textContent:"Cancel"}],
				]],
			]],
		]],
	);

	Popup.onclick( btnOk, close_yes );
	Popup.onclick( btnClose, close_no );

	Popup.create("deckname", obj).onInit(initFunc).onKey({"Enter":close_yes_key,"Escape":close_no});

	function initFunc(txt) {
		input.value = txt;
		input.focus();
		input.select();
	}

	function close_yes_key(e) {
		e.preventDefault(); // to avoid an 'Enter' key from bubbling
		close_yes();
	}
	function close_yes() {
		let progname = input.value.trim();
		if (progname === "") {
			Popup.alert("Please enter a name.").then( () => input.focus() );
			return;
		}
		Popup.close(progname);
	}
	function close_no() {
		Popup.close(null);
	}

}

// popup_decksound.js

{
	let [obj,select,btnPlay,btnOk,btnNo] = HTMLbuilder(
		["div", true, [
			["h2", {textContent:"Sound Effect Selection"}],
			["div", [
				["div", {className:"flexH",style:{alignItems:"center"}}, [
					["div", {style:{textAlign:"left"}}, [
						["div", {textContent:"Choose Sound Effect:"}],
						["select", true, {size:7,style:{minWidth:"200px"}}],
					]],
					["button", true, {textContent:"Play",style:{marginLeft:"1em"}}],
				]],
				["div", {className:"btnGroup"}, [
					["button", true, {textContent:"OK"}],
					["button", true, {textContent:"Cancel"}],
				]],
			]],
		]],
	);

	Popup.onclick( btnPlay, play );
	Popup.onclick( btnOk, choose );
	Popup.onclick( btnNo, close );

	Popup.create("decksound", obj).onInit(initFunc).onKey({"Escape":close});

	function initFunc(nSound,nClass) {
		select.options.length = 0;
		select.options[0] = new Option("None", -1);
		select.options[1] = new Option("Default", nClass);
		for (let  i = 1; i <= 20; i++) {
			if (HasGameSound(SOUND_CUSTOM1-1+i)) // hide options without sound
				select.options[i+1] = new Option("Custom Sound "+i, SOUND_CUSTOM1-1+i);
		}
		select.value = nSound;
	}


	function play() {
		PlayGameSound(select.value);
	}
	function choose() {
		Popup.close(select.value);
	}
	function close() {
		Popup.close();
	}

}

// popup_shopview.js

{
	let [obj,h2,tList,curMoney,btnBuy,btnSpec,btnNo] = HTMLbuilder(
		["div", true, [
			["h2", true],
			["div", [
				["div", {textContent:"Items for Sale"}],
				["div", true, {className:"tableList"}],
				["div", {style:{marginTop:".5em"},textContent:"Credits: "}, [
					["span", true],
				]],
				["div", {className:"btnGroup"}, [
					["button", true, {textContent:"Purchase"}],
					["button", true, {textContent:"Special Order"}],
					["button", true, {textContent:"Close"}],
				]],
			]],
		]],
	);

	// Shop names
	const g_szShopName = [
		"Thrifty Electronics",		// LS_STREET
		"The Little Warez Shop",	// LS_LOW
		"The Matrix Emporium",		// LS_MED
		"Hacker's Haven",			// LS_HIGH
		"Nullspace",				// LS_ELITE
	];

	tList = new tableList( tList, 200, "shoplist" );
	tList.onClick = onClick;
	tList.setColumns([
		[ null,      pItem => pItem.m_nType ],
		[ "Item",    pItem => pItem.m_szText ],
		[ "Cost",    pItem => pItem.m_nPrice + "cr" ],
		[ "Current", pItem => g_pChar.GetCurrentItemLevel(pItem.m_nType, pItem.m_nSubType) || "-" ], // rating
	]);


	Popup.onclick( btnBuy, purchase );
	Popup.onclick( btnSpec, specialOrder );
	Popup.onclick( btnNo, close );

	Popup.create("shopview", obj).onInit(initFunc0).onKey({"Escape":close}).onKey(tList.keyBindings());


	function onClick(p) {
		btnBuy.disabled = (p===null);
	}
	function initFunc0() {
		h2.textContent = g_szShopName[g_pChar.m_nLifestyle];
		tList.clear();
		initFunc();
	}
	function initFunc() {
		curMoney.textContent = g_pChar.m_nCredits;
		btnBuy.disabled = true;

		// set up the shop list
		tList.setContents(g_pChar.m_olShopList);
	}

	function purchase() {
		let pItem = tList.getSelected();

		// See if we have enough money
		if (g_pChar.m_nCredits < pItem.m_nPrice) {
			Popup.alert("You cannot afford this.");
			return;
		}

		// Process depending on type
		switch (pItem.m_nType) {
			case IT_SOFTWARE:
				// Look for program of equivalent level or greater
				let bFound = null;
				g_pChar.m_olSoftware.forEach(pProgram => {
					if (pProgram.m_nClass === pItem.m_nSubType) {
						if (pProgram.m_nRating === pItem.m_nRating) {
							bFound = false;
						} else if (pProgram.m_nRating > pItem.m_nRating) {
							if (bFound === null)
								bFound = true;
						}
					}
				});

				if (bFound === false) {
					Popup.alert("You already own this type of program");
					return;
				}
				if (bFound === true)
					Popup.confirm("You already own a stronger version of this program. Do you still wish to buy it?").onYes(soft_purchase);
				else
					soft_purchase();

				function soft_purchase() {
					// Get the money
					g_pChar.m_nCredits -= pItem.m_nPrice;

					// Buy the program
					let pProgram = Program.create(pItem.m_nSubType, pItem.m_nRating);

					// Add it to the user's software list (sorted)
					let i;
					for (i=0; i<g_pChar.m_olSoftware.length; i++) {
						let pListProgram = g_pChar.m_olSoftware[i];
						if (pListProgram.m_nClass > pProgram.m_nClass) break;
						if (pListProgram.m_nClass === pProgram.m_nClass && pListProgram.m_nRating < pProgram.m_nRating) break;
					}
					g_pChar.m_olSoftware.splice(i,0,pProgram);

					Popup.alert("Program purchased.");
					initFunc();
				}
				break;

			case IT_HARDWARE:
				// Look for hardware of equivalent level or greater
				if (g_pChar.m_nHardware[pItem.m_nSubType] >= pItem.m_nRating) {
					Popup.alert("You already own this type of hardware.");
					return;
				}

				// Check for chip burner and chips active
				if ( pItem.m_nSubType === HW_CHIP_BURNER && g_pChar.m_pChipBurning !== null )
					Popup.confirm("Your currently have chips cooking. If you upgrade, these will be destroyed. Continue?").onYes(hard_purchase);
				else
					hard_purchase();

				function hard_purchase() {
					if ( pItem.m_nSubType === HW_CHIP_BURNER )
						g_pChar.m_pChipBurning = null;

					// Check for refund
					if (g_pChar.m_nHardware[pItem.m_nSubType] !== 0) {
						let iRefund = Math.floor( GetHardwarePrice(pItem.m_nSubType,g_pChar.m_nHardware[pItem.m_nSubType]) / 2 );
						Popup.alert("Hardware purchased. You sold your old hardware for "+iRefund+"cr.");
						g_pChar.m_nCredits += iRefund;
					} else {
						Popup.alert("Hardware purchased.");
					}

					// Set the hardware item
					g_pChar.m_nHardware[pItem.m_nSubType] = pItem.m_nRating;

					// Get the money
					g_pChar.m_nCredits -= pItem.m_nPrice;

					// Remove the item
					g_pChar.m_olShopList.remove(pItem);

					initFunc();
				}
				break;

			case IT_CHIP:
				// Look for hardware of equivalent level or greater
				if (g_pChar.m_nChip[pItem.m_nSubType] >= pItem.m_nRating) {
					Popup.alert("You already own a chip of this rating or higher.");
					return;
				}

				Popup.alert("Chip purchased.");

				// Save the chip
				g_pChar.m_nChip[pItem.m_nSubType] = pItem.m_nRating;

				// Get the money
				g_pChar.m_nCredits -= pItem.m_nPrice;

				// Remove the item
				g_pChar.m_olShopList.remove(pItem);
				break;
		}

		initFunc();
	}
	function specialOrder() {
		// Is an order in progress
		if (g_pChar.m_nOrderItemType !== -1) {
			Popup.alert("Your order will arrive in "+g_pChar.m_nOrderTimeLeft+" days.");
		} else {
			Popup.specorder();
		}
	}
	function close() {
		Popup.close();
	}

}

// popup_specorder.js

{
	let [obj,txtCost,txtTime,btnOk,btnNo] = HTMLbuilder(
		["div", true, [
			["h2", {textContent:"Special Order"}],
			["div", [
				["div", {className:"flexH"}, [
					["div", {style:{margin:".5em"},textContent:"Type:\n"}, [
						["select"],
					]],
					["div", {style:{margin:".5em"},textContent:"Class:\n"}, [
						["select", {style:{minWidth:"150px"}}],
					]],
					["div", {style:{margin:".5em"},textContent:"Rating:\n"}, [
						["select"],
					]],
				]],
				["div", {style:{marginTop:".5em"}}, [
					["span", {textContent:"Cost:"}],
					["span", true],
				]],
				["div", {style:{marginTop:".5em"}}, [
					["span", {textContent:"Time:"}],
					["span", true],
				]],
				["div", {className:"btnGroup"}, [
					["button", true, {textContent:"Order"}],
					["button", true, {textContent:"Cancel"}],
				]],
			]],
		]],
	);

	Popup.onclick( btnOk, order );
	Popup.onclick( btnNo, close );

	let selects = [...obj.getElementsByTagName("select")];
	selects[0].onchange = FillInClassList;
	selects[1].onchange = FillInRatingList;
	selects[2].onchange = FillInMisc;

	Popup.create("specorder", obj).onInit(initFunc).onKey({"Escape":close});

	let l_type, l_class, l_rating;
	let l_nPrice, l_nTime;


	function initFunc() {
		selects[0].options.length = 0;
		selects[0].options[0] = new Option("Program", IT_SOFTWARE);
		selects[0].options[1] = new Option("Chip", IT_CHIP);
		selects[0].options[2] = new Option("Hardware", IT_HARDWARE);
		FillInClassList();
	}
	function FillInClassList() {
		selects[1].options.length = 0;
		l_type = +selects[0].value;

		switch (l_type) {
			case IT_SOFTWARE:
				for (let i=0; i<NUM_PROGRAMS; i++)
					if (i !== PROGRAM_CLIENT)
						selects[1].options[i] = new Option(GetProgramClassName(i), i);
				break;
			case IT_CHIP:
				for (let i=0; i<NUM_CHIPS; i++)
					selects[1].options[i] = new Option(GetChipName(i), i);
				break;
			case IT_HARDWARE:
				for (let i=0; i<NUM_HW; i++)
					selects[1].options[i] = new Option(GetHardwareName(i), i);
				break;
		}

		FillInRatingList();
	}
	function FillInRatingList() {
		l_class = +selects[1].value;
		let nMax;

		// Get the maximum rating
		if (l_type === IT_SOFTWARE || l_type === IT_CHIP)
			nMax = 6 + 2 * g_pChar.m_nLifestyle;
		else
			nMax = GetMaxHardwareRating(l_class);

		// Fill in the list box
		selects[2].options.length = 0;
		for (let i = 0; i < nMax; i++) {
			selects[2].options[i] = new Option(i+1, i+1);
		}

		// Update source and time
		FillInMisc();
	}
	function FillInMisc() {
		l_rating = +selects[2].value;

		// Get base price according to type
		if (l_type === IT_SOFTWARE)
			l_nPrice = GetSoftwarePrice(l_class, l_rating);
		else if (l_type === IT_CHIP)
			l_nPrice = GetChipPrice(l_class, l_rating);
		else // IT_HARDWARE
			l_nPrice = GetHardwarePrice(l_class, l_rating);

		// double it, because we are ordering
		l_nPrice *= 2;
		txtCost.textContent = l_nPrice+" cr";

		// If user doesn't have enough money, disable the OK button
		btnOk.disabled = ( l_nPrice > g_pChar.m_nCredits );

		// Time is dependant on price
		if (l_nPrice < 500)
			l_nTime = 2;
		else if (l_nPrice < 1000)
			l_nTime = 3;
		else if (l_nPrice < 5000)
			l_nTime = 4;
		else if (l_nPrice < 10000)
			l_nTime = 5;
		else if (l_nPrice < 50000)
			l_nTime = 6;
		else
			l_nTime = 7;

		// Software is quicker
		if (l_type === IT_SOFTWARE)
			l_nTime--;

		txtTime.textContent = l_nTime+" days";
	}

	function order() {
		// Make sure this is usable
		if (l_type === IT_SOFTWARE) {
			let bFound = false;
			g_pChar.m_olSoftware.forEach(pProgram => {
				if ( pProgram.m_nClass === l_class && pProgram.m_nRating === l_rating )
					bFound = true;
			});
			if (bFound) {
				Popup.alert("You already have a program of this rating.");
				return;
			}
		} else if (l_type === IT_CHIP) {
			if (g_pChar.m_nChip[l_class] >= l_rating) {
				Popup.alert("You already have this chip of equal or higher rating.");
				return;
			}
		} else { // IT_HARDWARE
			if (g_pChar.m_nHardware[l_class] >= l_rating) {
				Popup.alert("You already have this item of equal or higher rating.");
				return;
			}
		}

		// Set the order information
		g_pChar.m_nOrderItemType = l_type;
		g_pChar.m_nOrderItemClass = l_class;
		g_pChar.m_nOrderItemRating = l_rating;
		g_pChar.m_nOrderTimeLeft = l_nTime;

		// Subtract the money
		g_pChar.m_nCredits -= l_nPrice;

		// Close and show a confirmation message
		Popup.close();
		Popup.alert("Order has been placed.");
	}
	function close() {
		Popup.close();
	}

}

// popup_contracts.js

{
	let [obj,tList,btnView,btnAccept,btnClose] = HTMLbuilder(
		["div", true, [
			["h2", {textContent:"Available Contracts"}],
			["div", {className:"flexV"}, [
				["div", true, {className:"tableList"}],
				["div", {className:"btnGroup"}, [
					["button", true, {textContent:"View"}],
					["button", true, {textContent:"Accept"}],
					["button", true, {textContent:"Close"}],
				]],
			]],
		]],
	);

	tList = new tableList( tList, 200, "contractlist" );
	tList.onClick = onClick;
	tList.onDblClick = view;
	tList.setColumns([
		[ "Type",       pContract => pContract.GetTypeText() ],
		[ "Difficulty", pContract => (pContract.m_nDifficulty*5) + "%" ],
		[ "Target",     pContract => pContract.m_szSystemName+" ("+pContract.m_nSystemSize+")" ],
		[ "Deadline",   pContract => pContract.m_nDaysLeft + " days" ],
		[ "Pay",        pContract => pContract.m_nPay + "cr" ],
	]);

	Popup.onclick( btnView, view );
	Popup.onclick( btnAccept, accept );
	Popup.onclick( btnClose, close );

	Popup.create("contracts", obj).onInit(initFunc).onKey({"Escape":close}).onKey(tList.keyBindings());

	function onClick(p) {
		btnView.disabled = (p===null);
		btnAccept.disabled = (p===null);
	}
	function initFunc() {
		// set up the contract list
		tList.clear();
		tList.setContents(g_pChar.m_olContracts);
		// disable View & Accept button
		btnView.disabled = true;
		btnAccept.disabled = true;
	}

	function view() {
		let theContract = tList.getSelected();
		if (!theContract) return;

		Popup.contract(theContract).onYes(() => {
			accept();
		});
	}

	function accept() {
		let theContract = tList.getSelected();
		if (!theContract) return;

		// User has accepted contract
		g_pChar.m_pCurrentContract = theContract;
		g_pChar.m_olContracts.remove(theContract); // remove contract from list

		// If this is a Run Program contract, add the program to the user's deck
		if (theContract.m_nType === CONT_RUN_PROGRAM) {
			// Add the program to run
			let nRating = Math.ceil( (theContract.m_nCorporation+1) / 5 );
			let pProgram = Program.create(PROGRAM_CLIENT, nRating);
			g_pChar.m_olSoftware.push(pProgram);
		}

		Popup.close();
	}

	function close() {
		Popup.close();
	}

}

// popup_contract.js

// shows a single contract. If none provided, shows currently accepted contract

{
	let [obj,txtType,txtTarget,txtDiff,txtPay,txtDays,txtDescr,txtStatus,txtResult,btnOk,btnNo] = HTMLbuilder(
		["div", true, [
			["h2", {textContent:"Contract Information"}],
			["div", [
				["div", {style:{display:"grid",gridTemplateColumns:"auto 1fr",gridGap:"3px"}}, [
					["div", {textContent:"Type:",style:{width:"1px"}}],
					["div", true],
					["div", {textContent:"Target:"}],
					["div", true],
					["div", {textContent:"Difficulty:"}],
					["div", true],
					["div", {textContent:"Pay:"}],
					["div", true],
					["div", {textContent:"Deadline:"}],
					["div", true],
					["div", {textContent:"Description:",style:{gridColumn:"span 2"}}],
					["div", true, {style:{paddingLeft:"2em",paddingBottom:"3em",maxWidth:"400px",whiteSpace:"pre-wrap",gridColumn:"span 2"}}],
					["div", true, {style:{gridColumn:"span 2"}}],
					["div", true, {style:{paddingLeft:"2em",maxWidth:"400px",whiteSpace:"pre-wrap",gridColumn:"span 2"}}],
				]],
				["div", {className:"btnGroup"}, [
					["button", true],
					["button", true, {textContent:"Close"}],
				]],
			]],
		]],
	);

	Popup.onclick( btnOk, accept );
	Popup.onclick( btnNo, close );

	Popup.create("contract", obj).onInit(initFunc).onKey({"Escape":close});


	function initFunc(pContract) {
		if (!pContract) {
			pContract = g_pChar.m_pCurrentContract;
			btnOk.textContent = "Accepted";
			btnOk.disabled = true;
		} else {
			btnOk.textContent = "Accept";
			btnOk.disabled = false;
		}

		txtType.textContent = pContract.GetTypeText();
		txtTarget.textContent = pContract.m_szSystemName + " ("+pContract.m_nSystemSize+")";
		txtDiff.textContent = (pContract.m_nDifficulty * 5) + "%";
		txtPay.textContent = pContract.m_nPay + "cr";
		txtDays.textContent = pContract.m_nDaysLeft + " days";
		txtDescr.textContent = pContract.GetDescriptiveText();

		if (g_pChar.m_bOnRun) {
			let [szTmp1, szTmp2] = GetContractStatus(true, false);
			txtStatus.textContent = "Status: "+szTmp1;
			txtResult.textContent = szTmp2;
		} else {
			// Hide status
			txtStatus.textContent = "";
			txtResult.textContent = "";
		}
	}

	function accept() {
		Popup.close(true);
	}
	function close() {
		Popup.close();
	}

}

// popup_projects.js

{
	let [obj,txtDate,prjType,prjDays,chipType,chipDays,tList] = HTMLbuilder(
		["div", true, [
			["h2", {textContent:"Project Management"}],
			["div", [
				["div", {style:{marginBottom:".5em"},textContent:"Date: "}, [
					["span", true],
				]],
				["fieldset", [
					["legend", {textContent:"Current Project"}],
					["div", {className:"flexH",style:{justifyContent:"space-between"}}, [
						["div", {style:{display:"grid",gridTemplateColumns:"auto 1fr",gridGap:".5em",height:"0"}}, [
							["div", {textContent:"Type:"}],
							["div", true],
							["div", {textContent:"Days Left:"}],
							["div", true],
						]],
						["div", {style:{margin:"-2px"}}, [
							["button", {style:{margin:"2px"},textContent:"Work Day"}],
							["button", {style:{margin:"2px"},textContent:"Finish"}],
							["br"],
							["button", {style:{margin:"2px"},textContent:"Work Week"}],
							["button", {style:{margin:"2px"},textContent:"New"}],
						]],
					]],
				]],
				["fieldset", [
					["legend", {textContent:"Current Chip"}],
					["div", {style:{display:"grid",gridTemplateColumns:"auto 1fr",gridGap:".5em"}}, [
						["div", {textContent:"Type:"}],
						["div", true],
						["div", {textContent:"Days Left:"}],
						["div", true],
					]],
				]],
				["fieldset", [
					["legend", {textContent:"Source"}],
					["div", {className:"flexH"}, [
						["div", true, {className:"tableList"}],
						["div", {style:{marginLeft:"1em"}}, [
							["br"],
							["button", {textContent:"Build",style:{width:"80px"}}],
							["br"],
							["br"],
							["button", {textContent:"Trash",style:{width:"80px"}}],
						]],
					]],
				]],
				["div", {className:"btnGroup"}, [
					["button", {textContent:"Close"}],
				]],
			]],
		]],
	);

	tList = new tableList( tList, 200, "projlist" );
	tList.onClick = onClick;
	tList.onSort = sort_click;
	tList.setColumns([
		[ null,      pSource => pSource.m_nType ],
		[ "Type",    pSource => (pSource.m_nType === IT_SOFTWARE) ? GetProgramClassName(pSource.m_nClass) : GetChipName(pSource.m_nClass) ],
		[ "Rating",  pSource => pSource.m_nRating ],
		[ "Current", pSource => {
			if (pSource.m_nType === IT_SOFTWARE) {
				let pProgram = g_pChar.FindProgram(pSource.m_nClass, false);
				if (pProgram === null)
					return "-";
				else
					return pProgram.m_nRating;
			} else {
				return g_pChar.m_nChip[pSource.m_nClass];
			}
		} ],
	]);

	let buttons = [...obj.getElementsByTagName("button")];
	Popup.onclick( buttons[0], work_day );
	Popup.onclick( buttons[1], work_full );
	Popup.onclick( buttons[2], work_week );
	Popup.onclick( buttons[3], new_proj );
	Popup.onclick( buttons[4], build );
	Popup.onclick( buttons[5], trash );
	Popup.onclick( buttons[6], close );

	Popup.create("projects", obj).onInit(initFunc0).onKey({"Escape":close}).onKey(tList.keyBindings());


	let l_nSkill;

	function onClick(c) {
		buttons[4].disabled = !c;
		buttons[5].disabled = !c;
	}
	function initFunc0() {
		tList.clear();
		initFunc();
	}
	function initFunc() {
		// setup buttons
		buttons[4].disabled = true;
		buttons[5].disabled = true;

		// Fill in the project information
		UpdateProject();

		// Fill in the chip information
		UpdateChip();

		// Fill in the source information
		tList.setContents(g_pChar.m_olSourceCode);
	}
	function UpdateProject() {
		// Fill in the date
		txtDate.textContent = g_szMonthNames[g_pChar.m_nMonth]+" "+(g_pChar.m_nDayOfMonth+1)+", "+g_pChar.m_nYear;

		// Fill in the project information
		if (g_pChar.m_nProjectType === -1) {
			prjType.textContent = "None";
			prjDays.textContent = "-";
			buttons[0].disabled = true;
			buttons[1].disabled = true;
			buttons[2].disabled = true;
		} else {
			if (g_pChar.m_nProjectType === IT_SOFTWARE) {
				prjType.textContent = GetProgramClassName(g_pChar.m_nProjectClass) + " - " + g_pChar.m_nProjectRating;
				l_nSkill = g_pChar.m_nProgrammingSkill;
			} else {
				prjType.textContent = GetChipName(g_pChar.m_nProjectClass) + " - " + g_pChar.m_nProjectRating;
				l_nSkill = g_pChar.m_nChipDesignSkill;
			}
			let nSkill = l_nSkill * (1 + g_pChar.m_nHardware[HW_DESIGN_ASSIST]);
			prjDays.textContent = Math.ceil(g_pChar.m_nProjectTimeLeft / nSkill);
			buttons[0].disabled = false;
			buttons[1].disabled = false;
			buttons[2].disabled = false;
		}
	}
	function UpdateChip() {
		if (g_pChar.m_pChipBurning === null) {
			chipType.textContent = "None";
			chipDays.textContent = "-";
		} else {
			chipType.textContent = GetChipName(g_pChar.m_pChipBurning.m_nClass) + " Level " + g_pChar.m_pChipBurning.m_nRating;
			chipDays.textContent = Math.ceil( g_pChar.m_nChipBurnTimeLeft / g_pChar.m_nHardware[HW_CHIP_BURNER] );
		}
	}

	function new_proj() {
		Popup.projnew().onYes(UpdateProject);
	}
	function work_day() {
		g_pChar.PassTime(1, () => {
			let nSkill = l_nSkill * (1 + g_pChar.m_nHardware[HW_DESIGN_ASSIST]);
			g_pChar.m_nProjectTimeLeft -= nSkill;

			if (g_pChar.m_nProjectTimeLeft <= 0)
				DoCompleteProject();

			initFunc();
		});
	}
	function work_week() {
		let nSkill = l_nSkill * (1 + g_pChar.m_nHardware[HW_DESIGN_ASSIST]);

		// Calculate days left
		let nDays = Math.ceil(g_pChar.m_nProjectTimeLeft / nSkill);

		// Calculate time until end of week or end of project
		let nTime = (7 - g_pChar.m_nDayOfWeek);
		if (nTime > nDays)
			nTime = nDays;
		g_pChar.PassTime(nTime, () => {
			g_pChar.m_nProjectTimeLeft -= nTime * nSkill;

			if (g_pChar.m_nProjectTimeLeft <= 0)
				DoCompleteProject();

			initFunc();
		});
	}
	function work_full() {
		let nSkill = l_nSkill * (1 + g_pChar.m_nHardware[HW_DESIGN_ASSIST]);

		// Calculate days left
		let nDays = Math.ceil(g_pChar.m_nProjectTimeLeft / nSkill);

		g_pChar.PassTime(nDays, () => {
			g_pChar.m_nProjectTimeLeft = 0;
			DoCompleteProject();

			initFunc();
		});
	}
	function DoCompleteProject() {
		// Make a roll to see if the project was successful
		let nTarget = 10 + g_pChar.m_nProjectRating - (l_nSkill + g_pChar.m_nHardware[HW_DESIGN_ASSIST]);

		if (DoDieRoll(nTarget) <= 0) {
			// Design flaw
			Popup.alert("You have discovered a flaw in your code. Additional time will be required.");

			g_pChar.m_nProjectInitialTime = Math.ceil(g_pChar.m_nProjectInitialTime / 4);
			g_pChar.m_nProjectTimeLeft = g_pChar.m_nProjectInitialTime;
			return;
		}

		// Project is complete
		Popup.alert("Your project is now complete.");

		// Create a new source
		let pSource = new Source;
		pSource.m_nType = g_pChar.m_nProjectType;
		pSource.m_nClass = g_pChar.m_nProjectClass;
		pSource.m_nRating = g_pChar.m_nProjectRating;

		// Add it to the list
		g_pChar.m_olSourceCode.push(pSource);

		// Clear the project
		g_pChar.m_nProjectType = -1;
	}

	function trash() {
		// Get the selected source
		let pSource = tList.getSelected();

		// See if this is the chip being burnt
		if (pSource === g_pChar.m_pChipBurning) {
			Popup.alert("That source is currently being used to burn a chip.");
			return;
		}

		// Ask for confirmation
		Popup.confirm("Are you sure you want to erase this source code?").onYes(() => {
			// Delete the program
			g_pChar.m_olSourceCode.remove(pSource);
			initFunc();
		});
	}

	function close() {
		Popup.close();
	}

	function sort_click(criteria) {
		// store the previously chosen program, to reselect it later
		let pSource = tList.getSelected();

		// comparison functions:
		let cmpByTypeClass = (a,b) => {
			if ( a.m_nType !== b.m_nType )
				return a.m_nType - b.m_nType;
			if ( a.m_nClass !== b.m_nClass )
				return a.m_nClass - b.m_nClass;
			return a.m_nRating - b.m_nRating;
		}
		let cmpByRating = (a,b) => a.m_nRating - b.m_nRating;

		let cmpFunc;
		switch (criteria) {
			case 0: cmpFunc = cmpByTypeClass; break;
			case 1: cmpFunc = cmpByRating; break;
			case 2: return; // ignore for now
			default: return;
		}

		let original = g_pChar.m_olSourceCode.slice(0);
		g_pChar.m_olSourceCode.sort((a,b) => {
			let result = cmpFunc(a,b);
			if (result) return result;
			return original.indexOf(a) - original.indexOf(b);
		});


		initFunc();
	}

	function build() {
		// Get the selected source
		let pSource = tList.getSelected();

		// Process depending on program/chip
		if (pSource.m_nType === IT_SOFTWARE) {
			let [,,nMaxLoad] = g_pChar.GetLoadRatings();

			// Make sure we can load this program without overloading the deck
			let bAllowLoad = true;
			if ( g_pChar.m_nCurrentLoad + GetProgramSize(pSource.m_nClass, pSource.m_nRating) > nMaxLoad )
				bAllowLoad = false;

			let name = GetProgramClassName(pSource.m_nClass) + " " + pSource.m_nRating;
			Popup.projbuild(name,bAllowLoad).onYes(buildProgram);
		} else { // IT_CHIP
			// Make sure we have a chip burner
			if (g_pChar.m_nHardware[HW_CHIP_BURNER] === 0) {
				Popup.alert("You do not own a chip burner.");
				return;
			}
			if (g_pChar.m_nChip[pSource.m_nClass] >= pSource.m_nRating) {
				Popup.alert("This chip is lower than what is already installed.");
				// FIXME: what happens if I special order a chip, then buy/cook an higher one before it arrives? R: My higher chip is replaced by the lower one :c
				return;
			}

			// Is there a chip already burning?
			if (g_pChar.m_pChipBurning !== null)
				Popup.confirm("You already have a chip in production. Do you wish to cancel it?").onYes(burnChip);
			else
				burnChip();

			function burnChip() {
				// Burn the chip
				g_pChar.m_pChipBurning = pSource;
				g_pChar.m_nChipBurnTimeLeft = GetChipComplexity(pSource.m_nClass) * pSource.m_nRating;
				UpdateChip();

				Popup.alert("The chip is now cooking.");
			}
		}
	}

	function buildProgram(R) {
		// Get the selected source
		let pSource = tList.getSelected();

		// Create a new program and add it to our list
		let pProgram = Program.create(pSource.m_nClass, pSource.m_nRating);
		pProgram.m_szName = R.name;
		pProgram.m_bLoadByDefault = R.load;

		// Add it to the user's software list (sorted)
		let i;
		for (i=0; i<g_pChar.m_olSoftware.length; i++) {
			let pListProgram = g_pChar.m_olSoftware[i];
			if (pListProgram.m_nClass > pProgram.m_nClass) break;
			if (pListProgram.m_nClass === pProgram.m_nClass && pListProgram.m_nRating < pProgram.m_nRating) break;
		}
		g_pChar.m_olSoftware.splice(i,0,pProgram);

		// Do something with the old ones?
		let toRemove = [];
		if (R.trash || R.unload) {
			g_pChar.m_olSoftware.forEach((pTmpProgram,i) => {
				if ( pTmpProgram !== pProgram && pTmpProgram.m_nClass === pProgram.m_nClass && pTmpProgram.m_nRating <= pProgram.m_nRating ) {

					// Replace any defaults
					if (pTmpProgram === g_pChar.m_pDefArmorProgram)
						g_pChar.m_pDefArmorProgram = pProgram;
					else if (pTmpProgram === g_pChar.m_pDefAttackProgram)
						g_pChar.m_pDefAttackProgram = pProgram;
					else if (pTmpProgram === g_pChar.m_pDefHideProgram)
						g_pChar.m_pDefHideProgram = pProgram;
					else if (pTmpProgram === g_pChar.m_pDefShieldProgram)
						g_pChar.m_pDefShieldProgram = pProgram;
					else if (pTmpProgram === g_pChar.m_pDefReflectProgram)
						g_pChar.m_pDefReflectProgram = pProgram;

					// Trash or unload the program
					if (R.trash)
						toRemove.unshift(i); // since we are still traversing the array, store deletions for later
					else
						pTmpProgram.m_bLoadByDefault = false;

				}
			});
		}
		toRemove.forEach(i => g_pChar.m_olSoftware.splice(i,1));

		Popup.alert("Program has been compiled and is now available for use.");

		// Recalculate load rating
		g_pChar.calcCurrentLoad();

		// Update the current ratings
		tList.redraw();
	}

}

// popup_projnew.js

{
	let [obj,txtSkill,txtSource,txtTime,btnOk,btnNo] = HTMLbuilder(
		["div", true, [
			["h2", {textContent:"New Project"}],
			["div", [
				["div", {style:{display:"grid",gridTemplateColumns:"auto 1fr",gridGap:".5em",alignItems:"center"}}, [
					["div", {textContent:"Project Type:"}],
					["select"],
					["div", {textContent:"Skill:"}],
					["div", true],
					["div"],
					["div"],
					["div", {textContent:"Class:"}],
					["select"],
					["div", {textContent:"Source Available:"}],
					["div", true],
					["div"],
					["div"],
					["div", {textContent:"Rating:"}],
					["select"],
					["div", {textContent:"Estimated Time:"}],
					["div", true],
				]],
				["div", {className:"btnGroup"}, [
					["button", true, {textContent:"Start"}],
					["button", true, {textContent:"Cancel"}],
				]],
			]],
		]],
	);

	Popup.onclick( btnOk, start );
	Popup.onclick( btnNo, close );

	let selects = obj.getElementsByTagName("select");
	selects[0].onchange = FillInClassList;
	selects[1].onchange = FillInRatingList;
	selects[2].onchange = FillInMisc;

	Popup.create("projnew", obj).onInit(initFunc).onKey({"Escape":close});

	let l_type, l_class, l_rating;
	let l_nMaxRating, l_nSkill, l_nBaseTime;


	function initFunc() {
		selects[0].options.length = 0;
		selects[0].options[0] = new Option("Program", IT_SOFTWARE);
		selects[0].options[1] = new Option("Chip", IT_CHIP);
		FillInClassList();
	}
	function FillInClassList() {
		selects[1].options.length = 0;
		l_type = +selects[0].value;

		switch (l_type) {
			case IT_SOFTWARE:
				for (let i=0; i<NUM_PROGRAMS; i++)
					if (i !== PROGRAM_CLIENT)
						selects[1].options[i] = new Option(GetProgramClassName(i), i);
				break;
			case IT_CHIP:
				for (let i=0; i<NUM_CHIPS; i++)
					selects[1].options[i] = new Option(GetChipName(i), i);
				break;
		}

		FillInRatingList();
	}
	function FillInRatingList() {
		l_class = +selects[1].value;

		// Find the maximum source level
		l_nMaxRating = 0;
		g_pChar.m_olSourceCode.forEach(pSource => {
			if ( pSource.m_nType === l_type && pSource.m_nClass === l_class )
				if (pSource.m_nRating > l_nMaxRating)
					l_nMaxRating = pSource.m_nRating;
		});

		// Fill in the source available
		txtSource.textContent = l_nMaxRating;

		// Fill in the list box
		selects[2].options.length = 0;

		if (l_type === IT_SOFTWARE)
			l_nSkill = g_pChar.m_nProgrammingSkill;
		else
			l_nSkill = g_pChar.m_nChipDesignSkill;
		txtSkill.textContent = l_nSkill;

		for (let i = 0; i < l_nSkill; i++)
			selects[2].options[i] = new Option(i+1, i+1);

		// Select an initial rating of the highest level
		l_rating = l_nSkill;
		selects[2].value = l_nSkill;

		// Update source and time
		FillInMisc();
	}
	function FillInMisc() {
		// Get the complexity
		let nComplexity;
		if (l_type === IT_SOFTWARE)
			nComplexity = GetProgramComplexity(l_class); // Get time to write program
		else
			nComplexity = GetChipComplexity(l_class); // Get time to design chip

		// Get the estimated time
		let nNewTime;
		let nOldTime;
		let nRating = l_rating;
		if (nRating > l_nMaxRating) {
			// Doing an upgrade - use difference
			nNewTime = nComplexity * nRating * nRating;
			nOldTime = nComplexity * l_nMaxRating * l_nMaxRating;
			l_nBaseTime = nNewTime - nOldTime;
		} else {
			// Doing a downgrade - use lowest that is higher than desired
			let nBestFit = l_nMaxRating;
			g_pChar.m_olSourceCode.forEach(pSource => {
				// Find program/chip of the same type
				if ( pSource.m_nType === l_type && pSource.m_nClass === l_class )
					if ( pSource.m_nRating >= nRating && pSource.m_nRating < l_nMaxRating )
						nBestFit = pSource.m_nRating;
			});

			// Use difference of ratings for complexity time calculation
			l_nBaseTime = nComplexity * (nBestFit - nRating);

			// Set minimum time to 1
			if (l_nBaseTime <= 0)
				l_nBaseTime = 1;
		}

		// Base time is now computed. Divide base time by skill (including design assistant)
		let nSkill = l_nSkill * (1 + g_pChar.m_nHardware[HW_DESIGN_ASSIST]);
		txtTime.textContent = Math.ceil(l_nBaseTime / nSkill);
	}

	function start() {
		// If another project is active, confirm its cancellation
		if (g_pChar.m_nProjectType !== -1)
			Popup.confirm("You already have a project. Do you wish to cancel it to start this one?").onYes(doStart);
		else
			doStart();
	}
	function doStart() {
		// Start the new project
		g_pChar.m_nProjectType = l_type;
		g_pChar.m_nProjectClass = l_class;
		g_pChar.m_nProjectRating = l_rating;
		g_pChar.m_nProjectInitialTime = l_nBaseTime;
		g_pChar.m_nProjectTimeLeft = l_nBaseTime;

		Popup.close(true);
	}

	function close() {
		Popup.close();
	}

}

// popup_projbuild.js

{
	let [obj,inpName,inpLoad,inpTrash,inpUnload,btnOk,btnNo] = HTMLbuilder(
		["div", true, [
			["h2", {textContent:"Build Program"}],
			["div", {className:"flexV"}, [
				["div", {textContent:"Enter a name for the new program:"}],
				["input", true, {style:{marginBottom:"1em"},maxLength:PROGNAME_MAXSIZE}],
				["label", [
					["input", true, {type:"checkbox"}],
					["span", {textContent:"Load into deck"}],
				]],
				["label", [
					["input", true, {type:"checkbox"}],
					["span", {textContent:"Trash obsolete copies"}],
				]],
				["label", [
					["input", true, {type:"checkbox"}],
					["span", {textContent:"Unload obsolete copies"}],
				]],
				["div", {className:"btnGroup"}, [
					["button", true, {textContent:"OK"}],
					["button", true, {textContent:"Cancel"}],
				]],
			]],
		]],
	);

	Popup.onclick( btnOk, start );
	Popup.onclick( btnNo, close );

	Popup.onclick( inpLoad, onLoad );
	Popup.onclick( inpTrash, onTrash );
	Popup.onclick( inpUnload, onUnload );

	Popup.create("projbuild", obj).onInit(initFunc).onKey({"Escape":close});

	function initFunc(name, bAllowLoad) {
		inpName.value = name;
		inpName.focus();
		inpName.select();
		if (bAllowLoad) {
			inpLoad.checked = true;
			inpTrash.checked = true;
			inpUnload.checked = false;
			inpTrash.disabled = false;
			inpUnload.disabled = false;
		} else {
			inpLoad.checked = false;
			inpTrash.checked = false;
			inpUnload.checked = false;
			inpLoad.disabled = true;
			inpTrash.disabled = true;
			inpUnload.disabled = true;
		}
	}

	function onLoad() {
		inpTrash.checked = false;
		inpUnload.checked = false;
		inpTrash.disabled = !inpLoad.checked;
		inpUnload.disabled = !inpLoad.checked;
	}
	function onTrash() {
		if (inpTrash.checked) inpUnload.checked = false;
	}
	function onUnload() {
		if (inpUnload.checked) inpTrash.checked = false;
	}

	function start() {
		let progname = inpName.value.trim();
		if (progname === "") {
			Popup.alert("Please enter a name.").then( () => inpName.focus() );
			return;
		}
		Popup.close({ name:progname, load:inpLoad.checked, trash:inpTrash.checked, unload:inpUnload.checked });
	}
	function close() {
		Popup.close();
	}

}

// popup_rest.js

{
	function getHealHtml(title, withCost) {
		let R = [
			["tr", [
				["td", {colSpan:2}, [
					["div", {className:"restPerc",textContent:title}],
				]],
				["td", {rowSpan:3}, [
					["button", true, {textContent:"Go",style:{marginLeft:"1em",width:"40px"}}],
				]],
			]],
			["tr", [
				["td", {textContent:"Days:"}],
				["td", [
					["span"]
				]],
			]],
			["tr", [
				["td", {textContent:withCost?"Cost:":"\xa0"}], // nbsp
				["td", withCost?[["span"]]:[]],
			]],
		];
		return R;
	}

	let [obj,txtInfo,btnHome1,btnHomeA,btnHosp1,btnHospA,btnWaitD,btnWaitW,btnClose] = HTMLbuilder(
		["div", true, [
			["h2", {textContent:"Rest & Recuperate"}],
			["div", [
				["div", {style:{display:"grid",gridTemplateColumns:"auto 1fr",gridColumnGap:".5em"}}, [
					["div", {textContent:"Date:\nHealth:\nMoney:"}],
					["div", true],
				]],
				["div", {className:"flexH",style:{marginTop:".5em"}}, [
					["fieldset", [
						["legend", {textContent:"Home"}],
						["table", {style:{borderSpacing:0,borderCollapse:"collapse"}}, [
							...getHealHtml("Heal 5%", false),
							["tr", [
								["td", {style:{height:"1em"}}],
							]],
							...getHealHtml("Heal 100%", false),
						]],
					]],
					["fieldset", [
						["legend", {textContent:"Hospital"}],
						["table", {style:{borderSpacing:0,borderCollapse:"collapse"}}, [
							...getHealHtml("Heal 5%", true),
							["tr", [
								["td", {style:{height:"1em"}}],
							]],
							...getHealHtml("Heal 100%", true),
						]],
					]],
				]],
				["fieldset", [
					["legend", {textContent:"Rest Without Healing"}],
					["button", true, {textContent:"Wait 1 Day",style:{display:"block",marginBottom:"3px"}}],
					["button", true, {textContent:"Wait Week"}],
				]],
				["div", {className:"btnGroup"}, [
					["button", true, {textContent:"OK"}],
				]],
			]],
		]],
	);

	let spans = [...obj.getElementsByTagName("span")];
	Popup.onclick( btnHome1, home_one );
	Popup.onclick( btnHomeA, home_all );
	Popup.onclick( btnHosp1, hosp_one );
	Popup.onclick( btnHospA, hosp_all );
	Popup.onclick( btnWaitD, wait_day );
	Popup.onclick( btnWaitW, wait_week );
	Popup.onclick( btnClose, close );

	Popup.create("rest", obj).onInit(initFunc).onKey({"Escape":close});


	let l_nBaseTime, l_nFullTime, l_nBaseHospCost, l_nFullHospCost;

	function initFunc() {
		// Put basic stuff
		let szTxt = "";
		szTxt += g_szMonthNames[g_pChar.m_nMonth]+" "+(g_pChar.m_nDayOfMonth+1)+", "+g_pChar.m_nYear;
		szTxt += "\n";
		szTxt += (g_pChar.m_nHealthPhysical * HEALTH_INCREMENT) + "%";
		szTxt += "\n";
		szTxt += g_pChar.m_nCredits;
		txtInfo.textContent = szTxt;

		// Calculate the healing times and costs
		let nDamage = MAX_HEALTH - g_pChar.m_nHealthPhysical;
		l_nBaseTime = nDamage;
		l_nFullTime = Math.floor((nDamage * (nDamage + 2))/3); // not exact, since it includes a "discount"
		l_nBaseHospCost = 100 * l_nBaseTime;
		l_nFullHospCost = 100 * l_nFullTime;

		spans[0].textContent = l_nBaseTime;
		spans[1].textContent = l_nFullTime;
		spans[2].textContent = Math.ceil(l_nBaseTime/2); // hospital time
		spans[3].textContent = Math.ceil(l_nFullTime/2); // full hospital time
		spans[4].textContent = l_nBaseHospCost; // hospital cost
		spans[5].textContent = l_nFullHospCost; // full hospital cost

		// Enable/disable controls
		btnHome1.disabled = (nDamage === 0); // home heal
		btnHomeA.disabled = (nDamage === 0); // home heal all
		btnHosp1.disabled = ((nDamage === 0) || (g_pChar.m_nCredits < l_nBaseHospCost)); // hospital heal
		btnHospA.disabled = ((nDamage === 0) || (g_pChar.m_nCredits < l_nFullHospCost)); // hospital heal all
	}

	function close() {
		Popup.close();
	}

	function home_one() {
		g_pChar.PassTime(l_nBaseTime, () => {
			g_pChar.m_nHealthPhysical++;
			initFunc();
		});
	}
	function home_all() {
		g_pChar.PassTime(l_nFullTime, () => {
			g_pChar.m_nHealthPhysical = MAX_HEALTH;
			initFunc();
		});
	}
	function hosp_one() {
		g_pChar.PassTime(Math.ceil(l_nBaseTime/2), () => {
			g_pChar.m_nHealthPhysical++;
			g_pChar.m_nCredits -= l_nBaseHospCost;
			initFunc();
		});
	}
	function hosp_all() {
		g_pChar.PassTime(Math.ceil(l_nFullTime/2), () => {
			g_pChar.m_nHealthPhysical = MAX_HEALTH;
			g_pChar.m_nCredits -= l_nFullHospCost;
			initFunc();
		});
	}
	function wait_day() {
		g_pChar.PassTime(1, () => {
			initFunc();
		});
	}
	function wait_week() {
		let nTime = (7 - g_pChar.m_nDayOfWeek);
		g_pChar.PassTime(nTime, () => {
			initFunc();
		});
	}

}

// popup_options.js

{
	let [obj,helpDiff,inpVol,txtVol] = HTMLbuilder(
		["div", true, [
			["h2", {textContent:"Options"}],
			["div", {className:"flexV",style:{alignItems:"center"}}, [
				["div", [
					["button", {textContent:"Quick Load",style:{margin:"2px"}}],
					["button", {textContent:"Quick Save",style:{margin:"2px"}}],
				]],
				["div", [
					["button", {textContent:"Load Game",style:{margin:"2px"}}],
					["button", {textContent:"Save Game",style:{margin:"2px"}}],
				]],
				["div", [
					["button", {textContent:"Import Game",style:{margin:"2px"}}],
					["button", {textContent:"Export Game",style:{margin:"2px"}}],
				]],
				["button", {textContent:"Quit Game",style:{margin:"2px"}}],
				["button", {textContent:"Help",style:{margin:"2px"}}],
				["fieldset", {style:{width:"100%",marginTop:"1em"}}, [
					["legend", {textContent:"Game Options"}],
					["div", [
						["label", [
							["input", {type:"checkbox"}],
							["span", {textContent:"Tooltips"}],
						]],
					]],
					["div", [
						["label", [
							["input", {type:"checkbox"}],
							["span", {textContent:"Hard Difficulty"}],
						]],
						["span", true, {textContent:"(?)",style:{marginLeft:".5em",color:"blue",cursor:"pointer"}}],
					]],
					["div", [
						["label", [
							["input", {type:"checkbox"}],
							["span", {textContent:"Sound Effects"}],
						]],
					]],
					["div", [
						["label", [
							["input", {type:"checkbox"}],
							["span", {textContent:"View ICE after Analysis"}],
						]],
					]],
					["div", [
						["label", [
							["input", {type:"checkbox"}],
							["span", {textContent:"Warning when closing game"}],
						]],
					]],
					["div", {className:"flexH",style:{marginTop:".5em"}}, [
						["span", {textContent:"Sound Volume:"}],
						["input", true, {type:"range",tabindex:"-1",min:0,max:100,step:1}],
						["span", true, {style:{fontSize:"80%",width:"10px"}}],
					]],
				]],
				["button", {textContent:"Continue",style:{marginTop:"1em"}}],
			]],
		]],
	);



	helpDiff.onclick = () => {
		Popup.alert("This fixes a bug in the original code, that caused less enemies to spawn.\nApplies only to newly generated Systems.");
	}

	let inputs = [...obj.getElementsByTagName("input")];
	inputs[0].onchange = () => { g_pChar.m_bTooltips = inputs[0].checked; };
	inputs[1].onchange = () => { Config.difficulty = inputs[1].checked; };
	inputs[2].onchange = () => { Config.mute = !inputs[2].checked; };
	inputs[3].onchange = () => { Config.viewice = inputs[3].checked; };
	inputs[4].onchange = () => { Config.warnclose = inputs[4].checked; };
	inpVol.oninput = () => {
		Config.volume = +inpVol.value;
		txtVol.textContent = Config.volume + "%";
	};

	let buttons = [...obj.getElementsByTagName("button")];
	Popup.onclick( buttons[0], load_quick );
	Popup.onclick( buttons[1], save_quick );
	Popup.onclick( buttons[2], load_game );
	Popup.onclick( buttons[3], save_game );
	Popup.onclick( buttons[4], load_file );
	Popup.onclick( buttons[5], save_file );
	Popup.onclick( buttons[6], quit );
	Popup.onclick( buttons[7], open_help );
	Popup.onclick( buttons[8], close );

	Popup.create("options", obj).onInit(initFunc).onKey({"Escape":close});

	function initFunc() {
		if (GameFile.lastSlot === null) {
			buttons[0].disabled = true;
			buttons[1].disabled = true;
		} else {
			buttons[0].disabled = false;
			buttons[1].disabled = false;
		}
		inputs[0].checked = g_pChar.m_bTooltips;
		inputs[1].checked = Config.difficulty;
		inputs[2].checked = !Config.mute;
		inputs[3].checked = Config.viewice;
		inputs[4].checked = Config.warnclose;
		inpVol.value = Config.volume;

		// don't allow difficulty change while in the matrix
		inputs[1].disabled = g_pChar.m_bOnRun;

		txtVol.textContent = Config.volume + "%";
	}

	function save_quick() {
		if (GameFile.lastSlot === null) return;
		if (g_pChar.m_bIronMan && g_pChar.m_bOnRun && g_pChar.m_nRunTime) {
			Popup.alert("Ironmen don't need to save in the matrix.");
			return;
		}
		GameFile.Save(GameFile.lastSlot);
		Popup.close();
		Popup.alert("The game has been saved.");
	}
	function load_quick() {
		if (GameFile.lastSlot === null) return;
		Popup.confirm("Are you sure you want to lose the current game?").onYes(() => {
			GameFile.Load(GameFile.lastSlot);
			Popup.close();
			Popup.alert("The game has been loaded.");
		});
	}
	function save_game() {
		if (g_pChar.m_bIronMan && g_pChar.m_bOnRun && g_pChar.m_nRunTime) {
			Popup.alert("Ironmen don't need to save in the matrix.");
			return;
		}
		Popup.saveslots(true).then(initFunc); // call initFunc, since this could activate the quicksave/load buttons
	}
	function load_game() {
		Popup.confirm("Are you sure you want to lose the current game?").onYes(() => {
			Popup.saveslots(false);
		});
	}

	function save_file() {
		if (g_pChar.m_bIronMan && g_pChar.m_bOnRun && g_pChar.m_nRunTime) {
			Popup.alert("Ironmen don't need to save in the matrix.");
			return;
		}
		GameFile.Export();
	}
	function load_file() {
		Popup.confirm("Are you sure you want to lose the current game?").onYes(() => {
			GameFile.Import();
		});
	}

	function quit() {
		Popup.confirm("Are you sure you wish to quit?", {noDefault:true}).onYes(() => {
			Popup.closeAll();
			Popup.welcome();
		});
	}
	function close() {
		Popup.close();
	}
	function open_help() {
		window.open("help.html");
	}

}

// popup_transfer.js

{
	let [obj,tList,curLoad,aftLoad,btnOk,btnClose,loadLgt,loadAvg,loadHvy] = HTMLbuilder(
		["div", true, [
			["h2", {textContent:"Select program to load"}],
			["div", [
				["div", true, {className:"tableList"}],
				["div", {className:"flexH",style:{justifyContent:"space-between"}}, [
					["div", {style:{display:"grid",gridTemplateRows:"auto auto auto",gridTemplateColumns:"auto auto .5fr .5fr auto auto",gridGap:"5px .5em",alignItems:"end",gridAutoFlow:"column",width:"100%",marginTop:".5em"}}, [
						["div", {textContent:"Current Load:"}],
						["div", {textContent:"After Transfer:"}],
						["div"],
						["div", true],
						["div", true],
						["div"],

						["button", true, {textContent:"OK",style:{justifySelf:"end",gridRow:"span 3"}}],
						["button", true, {textContent:"Cancel",style:{justifySelf:"start",gridRow:"span 3"}}],

						["div", {textContent:"Light:"}],
						["div", {textContent:"Average:"}],
						["div", {textContent:"Heavy:"}],

						["div", true, {style:{textAlign:"right"}}],
						["div", true, {style:{textAlign:"right"}}],
						["div", true, {style:{textAlign:"right"}}],
					]],
				]],
			]],
		]],
	);


	tList = new tableList( tList, 250, "transferlist" );
	tList.onClick = onClick;
	tList.onDblClick = download;
	tList.setColumns([
		[ "Name",   pProgram => pProgram.m_szName ],
		[ "Class",  pProgram => GetProgramClassName(pProgram.m_nClass) ],
		[ "Rating", pProgram => pProgram.m_nRating ],
		[ "Size",   pProgram => pProgram.GetSize() + " MP" ],
		[ "Time",   pProgram => pProgram.GetLoadTime() ],
	]);

	Popup.onclick( btnOk, download );
	Popup.onclick( btnClose, close );

	Popup.create("transfer", obj).onInit(initFunc).onKey({"Escape":close, "Enter":download_Enter}).onKey(tList.keyBindings());

	let l_nLightLoad, l_nHeavyLoad, l_nMaxLoad;


	function onClick(p) {
		if (p) {
			btnOk.disabled = false;
			btnOk.focus();
			aftLoad.textContent = GetLoadText(g_pChar.m_nCurrentLoad + p.GetSize());
		} else {
			btnOk.disabled = true;
			aftLoad.textContent = "";
		}
	}
	function initFunc() {
		// Get the load ratings
		[l_nLightLoad, l_nHeavyLoad, l_nMaxLoad] = g_pChar.GetLoadRatings();
		loadLgt.textContent = "0 - "+(l_nLightLoad-1)+" MP";
		loadAvg.textContent = l_nLightLoad+" - "+l_nHeavyLoad+" MP";
		loadHvy.textContent = (l_nHeavyLoad+1)+" - "+l_nMaxLoad+" MP";

		curLoad.textContent = GetLoadText(g_pChar.m_nCurrentLoad);


		// set up the program list. Only those not fully loaded
		tList.clear();
		tList.setContents( g_pChar.m_olSoftware.filter(p => p.m_nLoadedRating !== p.m_nRating) );

		btnOk.disabled = true;
		aftLoad.textContent = "";
	}

	function GetLoadText(nLoad) {
		let szStr = nLoad;
		if (nLoad < l_nLightLoad)
			szStr += " (Light)";
		else if (nLoad > l_nHeavyLoad)
			szStr += " (Heavy)";
		else if (nLoad > l_nMaxLoad)
			szStr += " (Overloaded)";
		else
			szStr += " (Average)";
		return szStr;
	}

	function download_Enter() {
		if (document.activeElement !== btnClose)
			download();
	}
	function download() {
		// See what is selected
		let pProgram = tList.getSelected();
		if (!pProgram) return;

		// Make sure this will not overload the deck
		if ( g_pChar.m_nCurrentLoad + pProgram.GetSize() > l_nMaxLoad ) {
			Popup.alert("This would overload the deck.");
			return;
		}

		// See if something else is being loaded
		if ( g_pChar.m_pTransferProgram !== null || g_pChar.m_pTransferFile !== null )
			Popup.confirm("There is currently a transfer in progress. Do you wish to cancel it?").onYes(doDownload);
		else
			doDownload();
	}
	function doDownload() {
		let pProgram = tList.getSelected();

		g_pChar.m_pTransferFile = null;
		g_pChar.m_pTransferProgram = pProgram;
		g_pChar.m_nTransferInitialTime = pProgram.GetLoadTime();
		g_pChar.m_nTransferTurnsLeft = g_pChar.m_nTransferInitialTime + 1; // NOTE: We use +1 because it will decrement immediately
		Popup.close(true);
	}

	function close() {
		Popup.close();
	}

}

// popup_fileaccess.js

{
	let [obj,h2,tList,btnOk,btnClose] = HTMLbuilder(
		["div", true, [
			["h2", true],
			["div", [
				["div", true, {className:"tableList"}],
				["div", {className:"btnGroup"}, [
					["button", true, {textContent:"OK"}],
					["button", true, {textContent:"Cancel"}],
				]],
			]],
		]],
	);

	tList = new tableList( tList, 300, "fileaccesslist" );
	tList.onClick = onClick;
	tList.onDblClick = onOk;
	tList.setColumns([
		[ "Name",     pFile => pFile.m_szName ],
		[ "Contents", pFile => {
			// only if scanned
			if (pFile.m_nState & STATE_SCAN) {
				let szTmp = pFile.GetContentString();
				if (pFile.m_nState & STATE_EDITED_N) szTmp += " (Edited)";
				return szTmp;
			} else {
				return "?";
			}
		} ],
		[ "Value",    pFile => {
			// quest+worthless visible on scan, other on eval
			if (pFile.m_nState & STATE_SCAN) {
				if (pFile.m_nType === FT_QUEST)
					return "*Contract*";
				else if (pFile.m_nType === FT_USELESS)
					return "-";
				else if (pFile.m_nState & STATE_EVAL) {
					if (pFile.m_nType === FT_VALUABLE) {
						// If it has been edited, mark it as 0
						if (pFile.m_nState & STATE_EDITED_N)
							return "0";
						// If has been downloaded, or is worthless, mark as none
						else if (pFile.m_nState & STATE_IN_DECK)
							return "-";
						else
							return pFile.m_nValue;
					} else if (pFile.m_nType === FT_PROGRAM || pFile.m_nType === FT_P_SOURCE)
						return GetSoftwareText(pFile.m_nContents, pFile.m_nValue);
					else if (pFile.m_nType === FT_C_SOURCE)
						return GetChipName(pFile.m_nContents) + " " + pFile.m_nValue;
					else //if (pFile.m_nType === FT_CLUE || pFile.m_nType === FT_PASSCODE)
						return "-";
				} else
					return "?";
			} else {
				return "?";
			}
		} ],
		[ "Size",     pFile => pFile.m_nSize ],
		[ "Time",     pFile => {
			// always visible
			if (pFile.m_nState & STATE_IN_DECK)
				return "-";
			else
				return pFile.GetLoadTime();
		} ],
		[ "Guard",    pFile => pFile.m_pTapeworm !== null ? pFile.m_pTapeworm.m_szName : "" ],
	]);



	Popup.onclick( btnOk, onOk );
	Popup.onclick( btnClose, close );

	Popup.create("fileaccess", obj).onInit(initFunc).onKey({"Escape":close, "Enter":onOk_Enter}).onKey(tList.keyBindings());

	let l_nOperationType;

	function initFunc(type) {
		l_nOperationType = type;

		// set title
		let title;
		switch (l_nOperationType) {
			case FO_GET:
				title = "Select a file to download from "+g_pChar.m_pCurrentNode.m_szName;
				break;
			case FO_EDIT:
				title = "Select a file to edit on "+g_pChar.m_pCurrentNode.m_szName;
				break;
			case FO_ERASE:
				title = "Select a file to erase from "+g_pChar.m_pCurrentNode.m_szName;
				break;
			default: //case FO_VIEW:
				title = "Files on "+g_pChar.m_pCurrentNode.m_szName;
				break;
		}
		h2.textContent = title;

		// Insert the files - Only ones that are in the node
		let data = [];
		g_pChar.m_pCurrentNode.m_olFileList.forEach(pFile => {
			// if not in node, ignore
			if (pFile.m_nState & STATE_IN_NODE)
				data.push(pFile);
		});

		tList.clear();
		tList.setContents(data);
		btnOk.disabled = true;
	}

	function onClick(pFile) {
		if (!pFile) {
			btnOk.disabled = true;
			return;
		}

		// If tapeworm, no access possible
		if (pFile.m_pTapeworm) {
			btnOk.disabled = true;
			return;
		}

		// Activate ok based on type
		let enable = false;
		switch (l_nOperationType) {
			case FO_GET:
				// Activate if not downloaded
				enable = (pFile.m_nState & STATE_IN_DECK) === 0;
				break;
			case FO_EDIT:
				// Activate if not edited
				enable = (pFile.m_nState & STATE_EDITED_N) === 0;
				break;
			case FO_ERASE:
				// Can always erase
				enable = true;
				break;
			//case FO_VIEW:
				// Leave inactive
		}

		btnOk.disabled = !enable;
	}

	function onOk_Enter() { // FIXME: ugly hack. Apply everywhere, but in a nicer way
		if (document.activeElement !== btnClose)
			onOk();
	}
	function onOk() {
		// check again if file can be accessed
		if ( btnOk.disabled ) return;

		// Get a pointer to the file
		let pFile = tList.getSelected();

		// Process based on type
		if (l_nOperationType === FO_ERASE) {
			// Erasing is instant
			pFile.m_nState &= (~STATE_IN_NODE);
			Popup.close(true);
		} else {
			// See if something else is being loaded
			if ( g_pChar.m_pTransferProgram !== null || g_pChar.m_pTransferFile !== null ) {
				Popup.confirm("There is currently a transfer in progress. Do you wish to cancel it?").onYes(doTransfer);
			} else {
				doTransfer();
			}
		}
	}

	function doTransfer() {
		// Get a pointer to the file
		let pFile = tList.getSelected();

		g_pChar.m_pTransferProgram = null;
		g_pChar.m_nFileTransferType = l_nOperationType;
		g_pChar.m_pTransferFile = pFile;
		g_pChar.m_nTransferInitialTime = pFile.GetLoadTime();

		// If this is an edit, it goes at double speed
		if (l_nOperationType === FO_EDIT)
			g_pChar.m_nTransferInitialTime = Math.ceil(g_pChar.m_nTransferInitialTime / 2);

		if (g_pChar.m_nTransferInitialTime < 1)
			g_pChar.m_nTransferInitialTime = 1;

		g_pChar.m_nTransferTurnsLeft = 1 + g_pChar.m_nTransferInitialTime; // NOTE: We use +1 because it will decrement immediately

		Popup.close(true);
	}

	function close() {
		Popup.close();
	}

}

// popup_icedata.js

{
	let [obj,img,txt1,txt2,txt3,txt4,txt5,txt6,btnClose] = HTMLbuilder(
		["div", true, {id:"popup_icedata"}, [
			["h2", {textContent:"ICE Data"}],
			["div", [
				["div", {style:{display:"grid",gridTemplateColumns:"auto 1fr",gridGap:"10px 2em",alignItems:"top",marginBottom:"4em",width:"400px"}}, [
					["div", true, {style:{width:"24px",height:"24px",backgroundImage:"url(img/ice.png)"}}],
					["div"],
					["div", {textContent:"Name:"}],
					["div", true],
					["div", {textContent:"Type:"}],
					["div", true],
					["div", {textContent:"Rating:"}],
					["div", true],
					["div", {textContent:"Status:"}],
					["div", true],
					["div", {textContent:"Analysis:"}],
					["div", true],
					["div", {textContent:"Notes:"}],
					["div", true, {style:{whiteSpace:"pre-wrap"}}],
				]],
				["div", {className:"btnGroup"}, [
					["button", true, {textContent:"OK"}],
				]],
			]],
		]],
	);

	Popup.onclick( btnClose, close );

	Popup.create("icedata", obj).onInit(initFunc).onKey({"Escape":close});


	function initFunc() {
		let pIce = g_pChar.m_pTargettedIce;

		let damage = (MAX_HEALTH - pIce.m_nHealth) * HEALTH_INCREMENT;

		let name = pIce.m_szName;
		let type = pIce.GetTypeString();
		let rating = pIce.m_nAnalyzed ? pIce.m_nRating : "?";
		let status = damage+"% damaged";
		if (pIce.m_nSlowLevel) status += "\nSlowed";
		if (pIce.m_nConfusionLevel) status += "\nConfused";
		if (pIce.m_nWeakenLevel) status += "\nWeakened";
		if (pIce.m_nVirusLevel) status += "\nInfected";
		let analysis = pIce.m_nAnalyzed ? (pIce.m_nAnalyzed*20 + "% complete") : "None";
		let notes = pIce.GetNotes();

		let image = g_pChar.m_pTargettedIce.m_nImage;

		let x = (image % ICE_PER_ROW);
		let y = (image-x) / ICE_PER_ROW;
		img.style.backgroundPositionX = -x*24+"px";
		img.style.backgroundPositionY = -y*24+"px";

		txt1.textContent = name;
		txt2.textContent = type;
		txt3.textContent = rating;
		txt4.textContent = status;
		txt5.textContent = analysis;
		txt6.textContent = notes;

		btnClose.focus();
	}

	function close() {
		Popup.close();
	}

}

// popup_results.js

{
	let [obj,txtContract,txtResult,txtSummary,payMiss,payFiles,payTotal,txtRep,txtSkill,btnClose] = HTMLbuilder(
		["div", true, {style:{minWidth:"600px"}}, [
			["h2", {textContent:"Mission Results"}],
			["div", [
				["div", {style:{display:"grid",gridTemplateColumns:"auto 1fr",gridGap:"3px 1em"}}, [
					["div", {textContent:"Contract:"}],
					["div", true],
					["div", {textContent:"Result:"}],
					["div", true],
					["div", {textContent:"Task Summary:"}],
					["div", true, {style:{paddingLeft:"2em",gridColumn:"span 2"}}],
				]],
				["div", {style:{display:"grid",gridTemplateColumns:"auto auto 1fr auto 1fr",gridTemplateRows:"auto auto auto auto",gridGap:"3px .5em",gridAutoFlow:"column",paddingTop:"5em"}}, [
							["div", {textContent:"Mission Pay:"}],
							["div", {textContent:"File Values:"}],
							["div", {style:{padding:0,gridColumn:"span 2"}}, [["hr"]]],
							["td", {textContent:"Total Earned:"}],

							["div", true, {style:{textAlign:"right"}}],
							["div", true, {style:{textAlign:"right"}}],
							["div", true, {style:{textAlign:"right"}}],

							["div", {style:{gridRow:"span 4"}}],

							["div", {textContent:"Reputation: "}, [["span", true]]],
							["div", {textContent:"Skill Points Gained: "}, [["span", true]]],
				]],
				["div", {className:"btnGroup"}, [
					["button", true, {textContent:"OK"}],
				]],
			]],
		]],
	);



	Popup.onclick( btnClose, close );

	Popup.create("results", obj).onInit(initFunc).onKey({"Escape":close});


	function initFunc(dlgResult) {
		txtContract.textContent = dlgResult.m_contract;
		txtResult.textContent = dlgResult.m_result;
		txtSummary.textContent = dlgResult.m_summary;

		payMiss.textContent = dlgResult.m_pay;
		payFiles.textContent = dlgResult.m_files;
		payTotal.textContent = dlgResult.m_total;

		txtRep.textContent = dlgResult.m_rep;
		txtSkill.textContent = dlgResult.m_skill_pts;
	}

	function close() {
		Popup.close();
	}

}

// popup_usenode.js

{
	let [obj,optList,btnOk,btnClose] = HTMLbuilder(
		["div", true, [
			["h2", {textContent:"Node Actions"}],
			["div", [
				["div", true, {className:"flexV"}],
				["div", {className:"btnGroup"}, [
					["button", true, {textContent:"Ok"}],
					["button", true, {textContent:"Close"}],
				]],
			]],
		]],
	);

	Popup.onclick( btnOk, ok );
	Popup.onclick( btnClose, close );

	Popup.create("usenode", obj).onInit(initFunc).onKey({"Enter":ok,"Escape":close});


	let action = null;
	function initFunc(options) {
		optList.innerHTML = "";
		let i = 0;
		options.forEach(([txt,func,enabled=true]) => {
			if (!enabled) func = null;
			let option = document.createElement("label");
			option.style.display = "block";
			option.innerHTML = "<input type='radio' name='usenode'>"+escapeHTML(txt);

			option.children[0].onchange = () => { action = func; };
			if (!enabled) {
				option.style.color = "#666";
				option.style.textDecoration = "line-through";
			}

			optList.appendChild(option);
		});
		optList.children[0].children[0].click();
		optList.children[0].children[0].focus();
	}

	function ok() {
		if (!action) return;
		Popup.close();
		action();
	}
	function close() {
		Popup.close();
	}

}

// popup_matrix.js

{
	let [obj,base] = HTMLbuilder(
		["div", true, {id:"popup_matrix"}, [
			["h2", {textContent:"The Matrix"}],
			["div", {style:{position:"relative",width:"636px",height:"476px",background:"#339",padding:"0"}}, [
				["div", true],
			]],
		]],
	);

	// construct the matrix screen
	{
		let lastElem = null;
		function addTo(parent, type, coords, className, styles) {
			let elem = document.createElement(type);
			if (className) elem.className = className;
			function val2dim(v) {
				return (v === ""+v) ? v : (+v + "px");
			}
			elem.style.position = "absolute";
			if (coords.t !== undefined) elem.style.top = val2dim(coords.t);
			if (coords.l !== undefined) elem.style.left = val2dim(coords.l);
			if (coords.r !== undefined) elem.style.right = val2dim(coords.r);
			if (coords.b !== undefined) elem.style.bottom = val2dim(coords.b);
			if (coords.w !== undefined) elem.style.width = val2dim(coords.w);
			if (coords.h !== undefined) elem.style.height = val2dim(coords.h);
			for (let key in styles) {
				if (styles.hasOwnProperty(key))
					elem.style[key] = val2dim(styles[key]);
			}
			parent.appendChild(elem);
			lastElem = elem;
			return elem;
		}


		// Clock
		{
			let block = addTo(base, "div", {l:3,t:3,w:179,h:27}, "block", {textAlign:"right"});
			addTo(block, "div", {l:106,t:3,w:16,h:16}, null, {background:"url(img/matrixHour.png)"});
			addTo(block, "div", {t:3,r:3,w:44,h:11}, "inset", {padding:1,background:"black"});
			tooltip.set(lastElem, "Mission Clock");
			MV.l_cvClock = new ClockView(lastElem);
		}

		// Title
		{
			let block = addTo(base, "div", {l:185,t:3,w:236,h:34}, "block", {background:"url(img/matrixTitle.png)"});
		}

		// Map
		{
			let block = addTo(base, "div", {l:442,t:3,w:191,h:180}, "block");
			addTo(block, "div", {t:3,l:3,b:3,r:3}, "inset", {background:"black"});
			tooltip.set(lastElem, "Area Map");
			MV.l_MapView = new MapView(lastElem);
		}
		// Map Zoom
		{
			let block = addTo(base, "div", {l:424,t:3,w:20,h:34}, "block", {borderRight:0});
			addTo(block, "button", {t:3,l:3,w:15,h:24}, null, {backgroundImage:"url(img/matrixZoom.png)"});
			tooltip.set(lastElem, "Zoom");
			Popup.onclick( lastElem, OnMapZoom );
		}

		// Software
		{
			let block = addTo(base, "div", {l:3,t:33,w:179,h:440}, "block");
			addTo(block, "div", {l:3,t:3,r:3,b:30}, "inset tableList");
			tooltip.set(lastElem, "Programs currently loaded");
			MV.l_tProgramList = new tableList( lastElem, null, "matrixlist" );
			addTo(block, "button", {b:3,l:3}, "mvButton");
			tooltip.set(lastElem, "Run the selected program");
			MV.l_bmbSoftButton.push(new MatrixButton(lastElem));
			addTo(block, "button", {b:3,l:30}, "mvButton");
			tooltip.set(lastElem, "Set the default attack program");
			MV.l_bmbSoftButton.push(new MatrixButton(lastElem));
			addTo(block, "button", {b:3,l:57}, "mvButton");
			tooltip.set(lastElem, "Load a program");
			MV.l_bmbSoftButton.push(new MatrixButton(lastElem));
			addTo(block, "button", {b:3,l:84}, "mvButton");
			tooltip.set(lastElem, "Stop the selected program");
			MV.l_bmbSoftButton.push(new MatrixButton(lastElem));
			addTo(block, "button", {b:3,l:111}, "mvButton");
			tooltip.set(lastElem, "Unload the selected program");
			MV.l_bmbSoftButton.push(new MatrixButton(lastElem));
			addTo(block, "button", {b:3,l:138}, "cover").disabled = true;
		}

		// Main
		{
			let block = addTo(base, "div", {l:185,t:40,w:254,h:315}, "block");
			// screen
			addTo(block, "div", {l:3,t:3,w:240,h:240}, "inset", {background:"black"});
			tooltip.set(lastElem, "The current node");
			MV.l_NodeView = new NodeView(lastElem);
			// left
			addTo(block, "div", {l:3,t:250,w:96,h:16}, "inset selectable", {background:"white",fontWeight:"bold",overflow:"hidden"}); // node name
			tooltip.set(lastElem, "Name of the node you are in");
			MV.l_nbNodeName = new NameBar(lastElem);
			addTo(block, "div", {l:3,t:273,w:96,h:16}, "activebar inset", {background:"white"}); // node status
			tooltip.set(lastElem, "Programs affecting node");
			MV.l_abActiveNode = new ActiveBar(lastElem, "img/software.png");
			addTo(block, "div", {l:3,t:296,w:12,h:12}, null, {background:"url(img/matrixAlarm.png)"}); // alarm icon
			addTo(block, "div", {l:15,t:296,w:84,h:8}, "inset"); // alarm status
			tooltip.set(lastElem, "System alert");
			MV.l_abAlert = new AlarmBar(lastElem);
			// center
			addTo(block, "div", {l:116,t:250,w:24,h:24}, "inset"); // ice icon
			tooltip.set(lastElem, "Targetted ICE");
			MV.l_idIcePic = new IcePic(lastElem);
			// right
			addTo(block, "div", {l:147,t:250,w:96,h:16}, "inset selectable", {background:"white",fontWeight:"bold",overflow:"hidden",letterSpacing:"-.5px"}); // ice name
			tooltip.set(lastElem, "Name of targetted ICE");
			MV.l_nbIceName = new NameBar(lastElem);
			addTo(block, "div", {l:147,t:273,w:96,h:16}, "activebar inset", {background:"white"}); // ice status
			tooltip.set(lastElem, "Programs affecting ICE");
			MV.l_abActiveIce = new ActiveBar(lastElem, "img/software.png");
			addTo(block, "div", {l:149,t:296,w:12,h:12}, null, {background:"url(img/matrixHeart.png)"}); // health icon
			addTo(block, "div", {l:163,t:296,w:80,h:8}, "inset"); // ice health
			tooltip.set(lastElem, "Target ICE health");
			MV.l_hbHealthBar[BAR_ICE] = new HealthBar(lastElem, 20);
		}

		// Buttons
		{
			let block = addTo(base, "div", {l:437,t:186,w:83,h:169}, "block", {borderLeft:0});

			addTo(block, "button", {l:0,t:3}, "mvButton");
			tooltip.set(lastElem, "Attack using the default attack program");
			MV.l_bmbButton.push(new MatrixButton(lastElem));
			addTo(block, "button", {l:27,t:3}, "mvButton");
			tooltip.set(lastElem, "Move north");
			MV.l_bmbButton.push(new MatrixButton(lastElem));
			tooltip.set(lastElem, "Move North");
			addTo(block, "button", {l:54,t:3}, "mvButton");
			tooltip.set(lastElem, "Run the highest rated Deceive program");
			MV.l_bmbButton.push(new MatrixButton(lastElem));
			tooltip.set(lastElem, "Deceive");

			addTo(block, "button", {l:0,t:30}, "mvButton");
			tooltip.set(lastElem, "Move west");
			MV.l_bmbButton.push(new MatrixButton(lastElem));
			addTo(block, "button", {l:27,t:30}, "mvButton");
			tooltip.set(lastElem, "Wait one second");
			MV.l_bmbButton.push(new MatrixButton(lastElem));
			addTo(block, "button", {l:54,t:30}, "mvButton");
			tooltip.set(lastElem, "Move east");
			MV.l_bmbButton.push(new MatrixButton(lastElem));

			addTo(block, "button", {l:0,t:57}, "mvButton");
			tooltip.set(lastElem, "View the targetted ICE");
			MV.l_bmbButton.push(new MatrixButton(lastElem));
			addTo(block, "button", {l:27,t:57}, "mvButton");
			tooltip.set(lastElem, "Move south");
			MV.l_bmbButton.push(new MatrixButton(lastElem));
			addTo(block, "button", {l:54,t:57}, "mvButton");
			tooltip.set(lastElem, "Scan Node");
			MV.l_bmbButton.push(new MatrixButton(lastElem));

			addTo(block, "button", {l:0,t:84}, "mvButton");
			tooltip.set(lastElem, "View character statistics");
			MV.l_bmbButton.push(new MatrixButton(lastElem));
			addTo(block, "button", {l:27,t:84}, "mvButton");
			tooltip.set(lastElem, "View deck statistics");
			MV.l_bmbButton.push(new MatrixButton(lastElem));
			addTo(block, "button", {l:54,t:84}, "mvButton");
			tooltip.set(lastElem, "View the current contract");
			MV.l_bmbButton.push(new MatrixButton(lastElem));

			addTo(block, "button", {l:0,t:111}, "mvButton");
			tooltip.set(lastElem, ()=>{
				switch (g_pChar.m_pCurrentNode.m_nType) {
					case NT_CPU:
					case NT_SPU:
						return "Get an area map";
					case NT_DS:
						return "Get a file";
					case NT_IO:
						return "Activate I/O";
					case NT_PORTAL_IN:
					case NT_PORTAL_OUT:
						return "Enter portal";
					case NT_COP:
						if (g_pChar.m_pCurrentNode.m_nSubType === NST_COP_SECURITY) {
							// only show controls if node's subtype is known
							if ( g_pChar.m_pCurrentNode.m_nSpecialImage === NSI_COP_SECURITY )
								return "Cancel an alert";
						}
				}
				return "";
			});
			MV.l_bmbButton.push(new MatrixButton(lastElem));
			addTo(block, "button", {l:27,t:111}, "mvButton");
			tooltip.set(lastElem, ()=>{
				switch (g_pChar.m_pCurrentNode.m_nType) {
					case NT_CPU:
						return "Crash the system";
					case NT_DS:
						return "Edit a file";
					case NT_COP:
						if (g_pChar.m_pCurrentNode.m_nSubType === NST_COP_SECURITY) {
							// only show controls if node's subtype is known
							if ( g_pChar.m_pCurrentNode.m_nSpecialImage === NSI_COP_SECURITY )
								return "Remove a completed trace";
						}
				}
				return "";
			});
			MV.l_bmbButton.push(new MatrixButton(lastElem));
			addTo(block, "button", {l:54,t:111}, "mvButton");
			tooltip.set(lastElem, ()=>{
				switch (g_pChar.m_pCurrentNode.m_nType) {
					case NT_CPU:
					case NT_SPU:
						return "Cancel a system shutdown";
					case NT_DS:
						return "Erase a file";
				}
				return "";
			});
			MV.l_bmbButton.push(new MatrixButton(lastElem));

			addTo(block, "button", {l:0,t:138}, "mvButton");
			tooltip.set(lastElem, ()=>{
				switch (g_pChar.m_pCurrentNode.m_nType) {
					case NT_CPU:
						return "Create a backdoor";
				}
				return "";
			});
			MV.l_bmbButton.push(new MatrixButton(lastElem));
			addTo(block, "button", {l:27,t:138}, "mvButton");
			tooltip.set(lastElem, "Disconnect from the matrix");
			MV.l_bmbButton.push(new MatrixButton(lastElem));
			addTo(block, "button", {l:54,t:138}, "mvButton");
			tooltip.set(lastElem, "Game options");
			MV.l_bmbButton.push(new MatrixButton(lastElem));
		}

		// Message Box
		{
			let block = addTo(base, "div", {l:185,t:358,w:448,h:115}, "block");
			addTo(block, "div", {t:3,l:3,r:3,b:3}, "inset selectable", {background:"white", fontWeight:"bold", overflowX:"auto", overflowY:"scroll"});
			tooltip.set(lastElem, "Messages");
			MV.l_MessageView = new MessageView(lastElem);
		}

		// Health Bars
		{ // healthbar: deck
			let block = addTo(base, "div", {l:523,t:186,w:110,h:22}, "block");
			addTo(block, "div", {t:2,l:1,w:17,h:14}, null, {background:"url(img/matrixStatus.png)", backgroundPositionY:0});
			addTo(block, "div", {t:3,l:19,r:3,h:8}, "inset");
			tooltip.set(lastElem, "Cyberdeck health");
			MV.l_hbHealthBar[BAR_DECK] = new HealthBar(lastElem, 20);
		}
		{ // healthbar: mental & lethal
			let block = addTo(base, "div", {l:523,t:211,w:110,h:36}, "block");
			addTo(block, "div", {t:9,l:1,w:17,h:14}, null, {background:"url(img/matrixStatus.png)", backgroundPositionY:-14});
			addTo(block, "div", {t:3,l:19,r:3,h:8}, "inset");
			tooltip.set(lastElem, "Mental Health");
			MV.l_hbHealthBar[BAR_MENTAL] = new HealthBar(lastElem, 20);
			addTo(block, "div", {t:17,l:19,r:3,h:8}, "inset");
			tooltip.set(lastElem, "Physical Health");
			MV.l_hbHealthBar[BAR_LETHAL] = new HealthBar(lastElem, 20);
			MV.l_coverBio = addTo(base, "div", {l:523,t:211,w:110,h:36}, "block cover");
		}
		{ // healthbar: shield
			let block = addTo(base, "div", {l:523,t:250,w:110,h:22}, "block");
			addTo(block, "div", {t:2,l:1,w:17,h:14}, null, {background:"url(img/matrixStatus.png)", backgroundPositionY:-28});
			addTo(block, "div", {t:3,l:19,r:3,h:8}, "inset");
			tooltip.set(lastElem, "Shield Status");
			MV.l_hbHealthBar[BAR_SHIELD]   = new HealthBar(lastElem, 20);
		}
		{ // healthbar: transfer
			let block = addTo(base, "div", {l:523,t:275,w:110,h:22}, "block");
			addTo(block, "div", {t:2,l:1,w:17,h:14}, null, {background:"url(img/matrixStatus.png)", backgroundPositionY:-42});
			addTo(block, "div", {t:3,l:19,r:3,h:8}, "inset");
			tooltip.set(lastElem, "Transfer Status");
			MV.l_hbHealthBar[BAR_TRANSFER] = new HealthBar(lastElem, 20);
		}
		{ // healthbar: trace
			let block = addTo(base, "div", {l:523,t:300,w:110,h:22}, "block");
			addTo(block, "div", {t:2,l:1,w:17,h:14}, null, {background:"url(img/matrixStatus.png)", backgroundPositionY:-56});
			addTo(block, "div", {t:3,l:19,r:3,h:8}, "inset");
			tooltip.set(lastElem, "Trace Status");
			MV.l_hbHealthBar[BAR_TRACE]    = new HealthBar(lastElem, 20);
			MV.l_coverTrace = addTo(base, "div", {l:523,t:300,w:110,h:22}, "block cover");
		}
		{ // activebar: player's buffs/debuffs
			let block = addTo(base, "div", {l:523,t:325,w:110,h:30}, "block");
			addTo(block, "div", {t:3,b:3,l:3,r:3}, "activebar inset", {background:"white"});
			tooltip.set(lastElem, "Programs affecting character");
			MV.l_abActiveChar = new ActiveBar(lastElem, "img/software.png");
		}

	}
	// END of construction



	// software list setup
	MV.l_tProgramList.onClick = OnClick;
	MV.l_tProgramList.onDblClick = OnDblClick;
	MV.l_tProgramList.setColumns([
		[ null,      pProgram => {
			if (pProgram === g_pChar.m_pDefAttackProgram)
				return [pProgram.m_nClass, RED];
			else if (pProgram === g_pChar.m_pActiveArmor || pProgram === g_pChar.m_pActiveHide || pProgram === g_pChar.m_pActiveShield || pProgram === g_pChar.m_pActiveReflect)
				return [pProgram.m_nClass, BLUE];
			else if (pProgram === g_pChar.m_pActiveScan)
				return [pProgram.m_nClass, DK_GREEN];
			else if (pProgram === g_pChar.m_pActiveBoost)
				return [pProgram.m_nClass, GREEN];
			else if (pProgram.m_nClass === PROGRAM_CLIENT && g_pChar.m_nClientProgramStatus > 0)
				return [pProgram.m_nClass, YELLOW];
			else
				return pProgram.m_nClass;
		}],
		[ "Program", pProgram => pProgram.m_szName ],
		[ "Rating",  pProgram => {
			if (pProgram.m_nLoadedRating === pProgram.m_nRating)
				return pProgram.m_nRating;
			else
				return pProgram.m_nLoadedRating+" ("+pProgram.m_nRating+")";
		}],
	]);

	function OnClick(c, true_click) {
		MV.UpdateControls();
		if (true_click)
			Anim.run();
	}
	function OnDblClick(c) {
		OnRunProgram();
	}



	// Configure the active programs bars
	MV.l_abActiveChar.setup(PROGRAM_ARMOR,          1);
	MV.l_abActiveChar.setup(PROGRAM_SHIELD,         2);
	MV.l_abActiveChar.setup(PROGRAM_HIDE,           3);
	MV.l_abActiveChar.setup(PROGRAM_REFLECT,        4);
	MV.l_abActiveChar.setup(PROGRAM_ATTACK_BOOST,   5);
	MV.l_abActiveChar.setup(PROGRAM_DEFENSE_BOOST,  5);
	MV.l_abActiveChar.setup(PROGRAM_STEALTH_BOOST,  5);
	MV.l_abActiveChar.setup(PROGRAM_ANALYSIS_BOOST, 5);
	MV.l_abActiveNode.setup(PROGRAM_SILENCE,  1);
	MV.l_abActiveNode.setup(PROGRAM_SMOKE,    2);
	MV.l_abActiveNode.setup(PROGRAM_SCAN,     3);
	MV.l_abActiveNode.setup(PROGRAM_EVALUATE, 3);
	MV.l_abActiveNode.setup(PROGRAM_CLIENT,   4);
	MV.l_abActiveIce.setup(PROGRAM_SLOW,    1);
	MV.l_abActiveIce.setup(PROGRAM_VIRUS,   2);
	MV.l_abActiveIce.setup(PROGRAM_CONFUSE, 3);
	MV.l_abActiveIce.setup(PROGRAM_WEAKEN,  4);
	MV.l_abActiveIce.setup(PROGRAM_ANALYZE, 5);

	// Configure the software buttons
	MV.l_bmbSoftButton[0].setup(null,1,OnRunProgram);
	MV.l_bmbSoftButton[1].setup(null,2,OnSetDefProgram);
	MV.l_bmbSoftButton[2].setup(null,3,OnLoadProgram);
	MV.l_bmbSoftButton[3].setup(null,4,OnStopProgram);
	MV.l_bmbSoftButton[4].setup(null,5,OnUnloadProgram);

	// Configure the matrix buttons
	MV.l_bmbButton[ 0].setup(null, 11, OnAttack);
	MV.l_bmbButton[ 1].setup(null,  6, OnMoveN);
	MV.l_bmbButton[ 2].setup(null, 12, OnDeceive);
	MV.l_bmbButton[ 3].setup(null,  9, OnMoveW);
	MV.l_bmbButton[ 4].setup(null, 10, OnWait);
	MV.l_bmbButton[ 5].setup(null,  7, OnMoveE);
	MV.l_bmbButton[ 6].setup(null, 13, OnViewIce);
	MV.l_bmbButton[ 7].setup(null,  8, OnMoveS);
	MV.l_bmbButton[ 8].setup(null, 14, OnScan);
	MV.l_bmbButton[ 9].setup(null, 15, OnViewChar);
	MV.l_bmbButton[10].setup(null, 16, OnViewDeck);
	MV.l_bmbButton[11].setup(null, 17, OnViewContract);
	MV.l_bmbButton[12].setup("cpu",25, OnGetMap);
	MV.l_bmbButton[12].setup("spu",25, OnGetMap);
	MV.l_bmbButton[12].setup("sec",23, OnKillAlarm);
	MV.l_bmbButton[12].setup("ds", 20, OnGetFile);
	MV.l_bmbButton[12].setup("io", 19, OnUseIO);
	MV.l_bmbButton[12].setup("prt",18, OnEnterPortal);
	MV.l_bmbButton[13].setup("cpu",26, OnCrashSystem);
	MV.l_bmbButton[13].setup("sec",24, OnKillTrace);
	MV.l_bmbButton[13].setup("ds", 21, OnEditFile);
	MV.l_bmbButton[14].setup("cpu",27, OnKillShutDown);
	MV.l_bmbButton[14].setup("spu",27, OnKillShutDown);
	MV.l_bmbButton[14].setup("ds", 22, OnEraseFile);
	MV.l_bmbButton[15].setup("cpu",28, OnBackdoor);
	MV.l_bmbButton[16].setup(null, 29, OnDisconnect);
	MV.l_bmbButton[17].setup(null, 30, OnOptions);




	Popup.create("matrix", obj).onInit(Initialize).onKey({null:OnKeyPress});

	function Initialize(pEntryNode) {
		// Clean stuff
		Anim.clear();
		MV.l_tProgramList.clear();
		MatrixButton.setMode(null, true);

		// Set covers, if necessary
		MV.SetCovers();

		// show the software
		MV.SoftwareListUpdate();

		// show the node name
		MV.l_nbNodeName.set( g_pChar.m_pCurrentNode.m_szName );

		// Update node buttons
		MV.UpdateNodeAccessButtons();

		// Initialize buttons
		MV.UpdateControls();

		// Update all bars
		MV.UpdateBar(BAR_ALL);

		// Update miscellaneous
		MV.UpdateTargetInfo();
		MV.UpdateNodeIcons();
		MV.UpdateActiveBar();
		MV.l_cvClock.update();
		MV.l_abAlert.RedrawWindow();

		if (pEntryNode !== null) {
			// first enter
			DoEnterNode(pEntryNode, DIR_CENTER);
		} else {
			// loaded game
			MV.l_NodeView.RedrawWindow(); // Redraw the node
			MV.l_MapView.DoMove(); // Redraw the map
		}
		MV.l_MessageView.AddSeparator();
		Anim.run();
	}

}

// main.js

var g_pChar = null;

window.onbeforeunload = (e) => {
	if (!g_pChar) return null;
	if (!Config.warnclose) return null;

	let msg = "Are you sure you want to lose the current game?";
	e.returnValue = msg;
	return msg;
};
window.addEventListener("load", function(event) {
	Popup.welcome();
});

