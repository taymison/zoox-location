import { City } from "./city";

export interface State {
	id: string,
	name: string;
	initials: string;
	cities?: City[]; 
}
