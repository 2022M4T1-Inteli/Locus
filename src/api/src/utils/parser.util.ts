export default class ParserUtils {
	static addNewParsers() {
		(BigInt.prototype as any).toJSON = function () {
			return this.toString();
		};
	}
}
