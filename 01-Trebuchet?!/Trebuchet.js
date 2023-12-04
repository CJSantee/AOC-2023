const fs = require('node:fs/promises');

async function readInput() {
  const data = await fs.readFile('./input.txt', { encoding: 'utf8' });
  return data.split('\n');
}

const getCalibrationValue = (str) => {
  const [firstDigit, lastDigit] = [...str].reduce((acc, char) => {
    let [first, last] = acc;
    if(!isNaN(char)) {
      if(first == null) {
        first = Number(char);
      }
      last = Number(char);
    }
    return [first, last];
  }, [null, null]);
  return (firstDigit * 10) + lastDigit;
}

const digitsMap = {
  'one': 1, 
  'two': 2, 
  'three': 3, 
  'four': 4, 
  'five': 5, 
  'six': 6, 
  'seven': 7, 
  'eight': 8,
  'nine': 9,
};
const getRealCalibrationValue = (str) => {
  const [firstDigit, lastDigit] = [...str].reduce((acc, char, idx) => {
    let [first, last] = acc;
    if(!isNaN(char)) {
      if(first == null) {
        first = Number(char);
      }
      last = Number(char);
    } else {
      Object.keys(digitsMap).forEach((key) => {
        let match = true;
        for(let i = 0; i < key.length; i++) {
          if(str[idx + i] !== key[i]) {
            match = false;
            break;
          }
        }
        if(match) {
          if(first == null) {
            first = digitsMap[key];
          }
          last = digitsMap[key];
        }
      });
    }

    return [first, last];
  }, [null, null]);

  return (firstDigit * 10) + lastDigit;
}

async function main() {
  const lines = await readInput();

  const partOne = lines.reduce((sum, line) => {
    return sum + getCalibrationValue(line);
  }, 0);

  console.log('partOne', partOne);

  const partTwo = lines.reduce((sum, line) => {
    return sum + getRealCalibrationValue(line);
  }, 0);

  console.log('partTwo', partTwo);
}

main();