export default class BasicApiError extends Error {
	constructor(
		message: string,
		public status = 500,
	) {
		super(message);
		this.name = "BasicApiError";
	}
}
