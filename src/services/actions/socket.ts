import type { TOrder } from '../../types/data';

export const WS_CONNECTION_START:'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS:'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR:'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSE:'WS_CONNECTION_CLOSE' = 'WS_CONNECTION_CLOSE';
export const WS_GET_MESSAGE:'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE:'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export type TwsConnectionStartAction = {
	readonly type: typeof WS_CONNECTION_START;
	readonly payload: {
		type: string;
		token: string;
	}
};
export type TwsConnectionSuccessAction = {
	readonly type: typeof WS_CONNECTION_SUCCESS;
};
export type TwsConnectionErrorAction = {
	readonly type: typeof WS_CONNECTION_ERROR;
};
export type TwsConnectionCloseAction = {
	readonly type: typeof WS_CONNECTION_CLOSE;
};
export type TwsGetMessageAction = {
	readonly type: typeof WS_GET_MESSAGE;
	readonly payload: {
		orders: TOrder[];
		total: number;
		totalToday: number;
	}
};
export type TwsSendMessageAction = {
	readonly type: typeof WS_SEND_MESSAGE;
};

export type TwsActions = 
	| TwsConnectionStartAction
	| TwsConnectionSuccessAction
	| TwsConnectionErrorAction
	| TwsConnectionCloseAction
	| TwsGetMessageAction
	| TwsSendMessageAction;