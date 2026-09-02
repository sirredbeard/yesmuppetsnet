// @ts-ignore
const { Typed } = window;

/**
 * Fisher-Yates shuffle. Returns a new array; does not mutate the input.
 * @param {string[] | number[]} list
 */
function shuffled(list) {
  const result = [...list];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

const others = [
  'Fozzie Bear',
  'Gonzo',
  'Animal',
  'Rowlf',
  'Scooter',
  'Dr. Teeth',
  'Rizzo',
  'Pepe',
  'Statler',
  'Waldorf',
  'Beaker',
  'Dr. Bunsen Honeydew',
  'the Swedish Chef',
  'Camilla',
  'Robin',
  'Sam the Eagle',
  'Link Hogthrob',
  'Janice',
  'Floyd Pepper',
  'Zoot',
  'Lips',
  'Bobo',
];

const shared = {
  typeSpeed: 80,
  backSpeed: 60,
  smartBackspace: false,
  backDelay: 2000,
};

/**
 * force the start of cursor blink animation while `startDelay` is
 * ticking...can't use `toggleBlinking(true)` here, as it has some extra
 * checks whether animation has started, which defeats the purpose
 * @param {{ cursor: HTMLElement | null }} typedInstance
 */
function blinkCursorImmediately(typedInstance) {
  if (typedInstance.cursor != null) {
    typedInstance.cursor.classList.add('typed-cursor--blink');
  }
}

/**
 * Forever, randomly cycle through the rest of the Muppets. Kermit and Miss
 * Piggy already had their turn and never come back around.
 */
function startCyclingOthers() {
  let hasDroppedIntro = false;

  const cycleTyped = new Typed('#cycle', {
    ...shared,
    strings: shuffled(others),
    loop: true,
    // give "Miss Piggy" a moment on screen before it gets backspaced
    startDelay: 2000,
    onLastStringBackspaced: () => {
      if (!hasDroppedIntro) {
        // Typed auto-detected the leftover "Miss Piggy" text and stuck it
        // in as strings[0]; drop it now so it's never retyped again.
        cycleTyped.strings.shift();
        hasDroppedIntro = true;
      }
      cycleTyped.sequence = shuffled(
        cycleTyped.strings.map(
          /** @param {string} _ @param {number} i */ (_, i) => i
        )
      );
    },
  });

  blinkCursorImmediately(cycleTyped);
}

// Kermit is already on the page as static text. Typed detects it, backspaces
// it, and types "Miss Piggy" once. Then, and only then, the random cycle
// through the rest of the Muppets begins.
const introTyped = new Typed('#cycle', {
  ...shared,
  strings: ['Miss Piggy'],
  loop: false,
  startDelay: 3000,
  onComplete: () => {
    // remove the now-stale cursor before Typed inserts a fresh one for the
    // next instance, so there's never more than one cursor on screen
    if (introTyped.cursor != null && introTyped.cursor.parentNode != null) {
      introTyped.cursor.parentNode.removeChild(introTyped.cursor);
    }
    startCyclingOthers();
  },
});

blinkCursorImmediately(introTyped);
