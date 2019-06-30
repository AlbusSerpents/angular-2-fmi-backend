const parser = require('./parser');
const commands = require('./commands');

exports.interpret = ({ code, input }) => {
    const parsedInput = Array.from(input);
    try {
        const codeCommands = parser.parse(code);
        return commands.execute(codeCommands, parsedInput);
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

exports.run = (solution) => {
    const result = this.interpret(solution);
    return result && result.value ? result.value : null;
}