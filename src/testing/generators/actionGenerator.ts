import { Action } from '../../interfaces/Action';

export const actionGenerator = (data?: Partial<Action>): Action => {
	return { name: 'testAction', ...data };
};
