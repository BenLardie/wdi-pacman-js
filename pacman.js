// Setup initial game stats
let score = 0;
let lives = 2;
let powerPellets = 4;


// Define your ghosts here
const inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

const coolGuy = {
  menu_option: '2',
  name: 'Cool Guy',
  colour: 'Blue',
  character: 'Gangsta',
  edible: false
};

const thanos = {
  menu_option: '3',
  name: 'Thanos',
  colour: 'purple',
  character: 'God',
  edible: false
};

const adamSandler = {
  menu_option: '4',
  name: 'Adam Sandle',
  colour: 'purple',
  character: 'Billy Madison',
  edible: false
};

const ghost =[inky, coolGuy, thanos, adamSandler];

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(() => {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log(`Score: ${score}     Lives: ${lives}`);
  console.log('');
  console.log(`Power-pellets: ${powerPellets}`);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (powerPellets > 0) {
  console.log('(p) Eat Power-pellet');
}
ghost.forEach(function(ghost) {
  if (ghost.edible) {
    can_eat = '(edible)'
  } else {
    can_eat = '(inedible)'
  }
  console.log(`(${ghost['menu_option']}) Eat ${ghost.name} ${can_eat}`)
})
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatGhost(ghost) {
  if (ghost.edible == true) {
    ghost.edible == false;
    score += 200;
    console.log(`\nYou ate the ${ghost.colour}!`);
    ghost.edible = false;
  } else if (ghost.edible == false){
    console.log(`\n${ghost.name} is not edible. You loose 1 life`);
    lives -= 1;
    checkLives();
  }
}

function checkLives() {
  if (lives < 0) {
    console.log('No more lives!');
    process.exit();
   }
}

function eatPower() {
  ghost.forEach(function(ghost) {
  ghost.edible = true;
  });
  powerPellets -= 1;
  console.log('\nTHE POWER IS MINE!');
  score += 50;
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      if (powerPellets > 0) { 
        eatPower();
        break; 
      } else {
        console.log('\nNo more pellets');
        break;
      }
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(coolGuy);
      break;
    case '3':
      eatGhost(thanos);
      break;
    case '4':
      eatGhost(adamSandler); 
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', (key) => {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', () => {
  console.log('\n\nGame Over!\n');
});
