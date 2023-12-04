import { SaveFile } from '../interfaces/SaveFile';

export const isValidSaveFile = (x: Partial<SaveFile>): x is SaveFile => {
	return !!(x.orientation && x.position && x.username && x.sprite);
};
