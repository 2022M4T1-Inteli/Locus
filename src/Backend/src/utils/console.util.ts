import colors from 'colors';
import moment from 'moment';

class ConsoleUtils {
	static addTimeOnConsole() {
		var log = console.log;

		console.log = function () {
			var first_parameter = arguments[0];
			var other_parameters = Array.prototype.slice.call(arguments, 1);

			function getCurrentFilename() {
				let stack = new Error().stack;

				if (stack) {
					let stackArr = stack.split('\n');
					let stackArr2 = stackArr[3].split('/');
					let stackArr3 = stackArr2[stackArr2.length - 1].split(':');
					let filename = stackArr3[0].replace('.js', '');

					return `[${colors.cyan(filename)}]`;
				} else {
					return `[${colors.cyan('unknown')}]`;
				}
			}

			function formatConsoleDate(date: Date) {
				let consoleTime: string = `[${moment(date).format(
					'HH:mm:ss',
				)}]`;

				return colors.bgMagenta(colors.black(consoleTime));
			}

			log.apply(
				console,
				[
					formatConsoleDate(new Date()) +
						getCurrentFilename() +
						' ' +
						first_parameter,
				].concat(other_parameters),
			);
		};
	}
}

export default ConsoleUtils;
