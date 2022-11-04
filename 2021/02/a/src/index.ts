import { rawInput } from "./raw_input"

console.log("Hello");

type Command = {
  direction: "forward" | "down" | "up";
  step: number;
}

type Position = {
  horizontal: number;
  depth: number;
}

function buildCommandsFromRawInput(input: string): Array<Command> {
  return input.split("\n").map((line) => {
    return (<Command>({direction: line.split(" ")[0], step: parseInt(line.split(" ")[1])}));
  });
};

const commands: Array<Command> = buildCommandsFromRawInput(rawInput);
console.log(commands);

function adjustPositionWithCommand(position: Position, command: Command) : void {
  if(command.direction == "forward") {
    position.horizontal += command.step;
  } else if (command.direction == "up") {
    position.depth -= command.step;
  } else if (command.direction == "down" ) {
    position.depth += command.step;
  }
}

function adjustPositionWithCommands(initialPosition: Position, commands: Array<Command>) : Position {
  const finalPosition:Position = { horizontal: 0, depth: 0 };
  commands.forEach((command) => { adjustPositionWithCommand(finalPosition, command); })
  return finalPosition;
}

const finalPosition = adjustPositionWithCommands({ horizontal: 0, depth: 0 }, commands);
console.log(finalPosition);
console.log("Multiplied: ", finalPosition.horizontal * finalPosition.depth);