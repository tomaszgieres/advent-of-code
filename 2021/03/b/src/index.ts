// run with: `npx ts-node src/index.ts`

import { rawInput } from "./raw_input"

type Bit = 0 | 1;
type BinaryNumbers = Array<Bit>;
type BinaryNumbersList = Array<BinaryNumbers>;

type ControlBit = 0 | 1 | "EQUAL"
type BitCriteria = Array<ControlBit>;

function getBinaryNumbersListFromRawInput(rawInput:string): BinaryNumbersList {
  return rawInput.split("\n").map((line) => {
    return [...line].map( (char) => {
      return getBinaryNumberFromCharacter(char);
    });
  });
};

function getBinaryNumberFromCharacter(character:string): Bit {
  const binNumber:Bit | Number = parseInt(character);
  if(binNumber == 0) {
    return 0;
  } else if (binNumber == 1) {
    return 1;
  } else {
    throw new Error("A char found that is nor 0 or 1")
  }
}

function getMostPopularBit(bits:BinaryNumbers) : ControlBit {
  const sum = bits.reduce((sum, currentBit) => { return sum += currentBit; }, 0);
  const maxValue = bits.length;

  if( sum > (maxValue / 2) ) {
    return 1;
  } else if ( sum == (maxValue / 2)) {
    return "EQUAL";
  } else {
    return 0;
  }
}

function getLeastPopularBit(bits:BinaryNumbers) : ControlBit {
  const mostPopularBit = getMostPopularBit(bits)
  if(mostPopularBit == "EQUAL") {
    return "EQUAL"
  } else if (mostPopularBit == 1) {
    return 0
  } else {
    return 1
  }
}

function getBitCriteria(binaryNumbersList: BinaryNumbersList, bitCriteriaFn: (BinaryNumbers) => ControlBit) : BitCriteria {
  const bitCriteria:BitCriteria = [];
  const lastIndex = binaryNumbersList[0].length - 1;
  for(let i = 0; i <= lastIndex; i++) {
    const columnValues = binaryNumbersList.map((binaryNumbers) => { return binaryNumbers[i]; });
    bitCriteria.push(bitCriteriaFn(columnValues));
  }
  return bitCriteria;
}

function filterBinaryNumbersWithControlBits(binaryNumbersList:BinaryNumbersList, controlBit:ControlBit, index:number, binaryNumbersFilterFn: (BinaryNumbers, ControlBit, number) => boolean) {
  return binaryNumbersList.filter((binaryNumbers:BinaryNumbers) => {
    const condition = binaryNumbersFilterFn(binaryNumbers, controlBit, index);
    return condition;
  })
}

function OxygenGeneratorFilterFn(binaryNumbers: BinaryNumbers, controlBit:ControlBit, index:number) {
  return (controlBit == "EQUAL" && binaryNumbers[index] == 1) || (controlBit == binaryNumbers[index]);
}

function Co2ScrubberRatingFn(binaryNumbers: BinaryNumbers, controlBit:ControlBit, index:number) {
  return (controlBit == "EQUAL" && binaryNumbers[index] == 0) || ( controlBit == binaryNumbers[index] );
}


function toDec(binaryNumbers:BinaryNumbers) : number {
  return [...binaryNumbers].reverse().reduce((sum, item, index) => { return sum += item * (2**index); }, 0);
}

function calculateRating(binaryNumbersList:BinaryNumbersList, getBitFn:(BinaryNumbers) => ControlBit, controlBitSelectionFn:(BinaryNumbers, ControlBit, number) => boolean) : BinaryNumbers {
  const lastIndex = binaryNumbersList[0].length - 1;

  let remainingBinaryNumbers:BinaryNumbersList = binaryNumbersList;
  for(let i = 0; i <= lastIndex; i++) {
    const bitCriteria:BitCriteria = getBitCriteria(remainingBinaryNumbers, getBitFn);

    remainingBinaryNumbers = filterBinaryNumbersWithControlBits(remainingBinaryNumbers, bitCriteria[i], i, controlBitSelectionFn);

    if( remainingBinaryNumbers.length === 1 ) {
      return remainingBinaryNumbers[0];
    }
  }
}


const binaryNumbersList = getBinaryNumbersListFromRawInput(rawInput);

const oxygenGeneratorRating:BinaryNumbers = calculateRating(binaryNumbersList, getMostPopularBit, OxygenGeneratorFilterFn);
const co2ScrubberRating:BinaryNumbers = calculateRating(binaryNumbersList, getLeastPopularBit, Co2ScrubberRatingFn);
const lifeSupportRating:number = toDec(oxygenGeneratorRating) * toDec(co2ScrubberRating);

console.log("| ==> ", lifeSupportRating);

// | ==>  2795310