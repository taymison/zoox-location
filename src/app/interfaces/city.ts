import { State } from "./state";

export interface City {
	id: string;
	name: string;
	stateId: string;
	state?: State;
}
