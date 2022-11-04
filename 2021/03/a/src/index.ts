// run with: `npx ts-node src/index.ts`

import { rawInput } from "./raw_input"

type BinaryNumber = 0 | 1;
type BinaryNumbers = Array<BinaryNumber>;
type BinaryNumbersList = Array<BinaryNumbers>;

function getBinaryNumbersListFromRawInput(rawInput:string): BinaryNumbersList {
  return rawInput.split("\n").map((line) => {
    return [...line].map( (char) => {
      return getBinaryNumberFromCharacter(char);
    });
  });
};

function getBinaryNumberFromCharacter(character:string): BinaryNumber {
  const binNumber:BinaryNumber | Number = parseInt(character);
  if(binNumber == 0) {
    return 0;
  } else if (binNumber == 1) {
    return 1;
  } else {
    throw new Error("A char found that is nor 0 or 1")
  }
}

function getMostPopularBit(bits:BinaryNumbers) : BinaryNumber {
  const sum = bits.reduce((sum, currentBit) => { return sum += currentBit; }, 0);
  const maxValue = bits.length;
  return sum > ( maxValue / 2 ) ? 1 : 0;
}

function getMostPopularBitsOnEachPosition(binaryNumbersList: BinaryNumbersList) : BinaryNumbers {
  const mostPopularBits:Array<BinaryNumber> = [];
  const lastIndex = binaryNumbersList[0].length - 1;
  for(let i = 0; i <= lastIndex; i++) {
    const columnValues = binaryNumbersList.map((binaryNumbers) => { return binaryNumbers[i]; });
    mostPopularBits.push(getMostPopularBit(columnValues));
  }
  return mostPopularBits;
}

function revertBits(binaryNumbers:BinaryNumbers) : BinaryNumbers {
  const reverted:BinaryNumbers = [];
  binaryNumbers.forEach((item) => {
    reverted.push(item == 0 ? 1 : 0);
  });
  return reverted;
}

function toDec(binaryNumbers:BinaryNumbers) : number {
  return binaryNumbers.reverse().reduce((sum, item, index) => { return sum += item * (2**index); }, 0);
}

const gammaRateBin = getMostPopularBitsOnEachPosition(getBinaryNumbersListFromRawInput(rawInput));
const epsilonRateBin = revertBits(gammaRateBin);
const powerConsumption = toDec(gammaRateBin) * toDec(epsilonRateBin);
console.log("Power consumuption is: ", powerConsumption);
