// middleware
export const socketMiddleware = (wsUrl) => {
	return store => {

		let socket = null;

		return next => action => {

			const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === 'WS_CONNECTION_START') {
        // объект класса WebSocket
        const endpointQuery = ( payload && payload.type && payload.type === 'user' ) ? '?token='+payload.token : '/all';
        socket = new WebSocket(wsUrl+endpointQuery);
      }

      if (type === 'WS_CONNECTION_CLOSE' && socket  ){
      	socket.close();
      }

      if ( socket ) {
      	socket.onopen = event => {
      		const type = payload && payload.type && payload.type === 'user' ? 'user' : '-';
      		dispatch({ type: "WS_CONNECTION_SUCCESS", payload: {event: event, type: type} })
      	}
      	socket.onerror = event => {
          dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
        };
        socket.onmessage = event => {
        	const { data } = event;
          const parsedData = JSON.parse(data);
          console.log(parsedData);
          if ( parsedData.success ) {
          	dispatch({ type: 'WS_GET_MESSAGE', payload: parsedData });
        	} else {
        		console.log('Данные пришли, но в них ошибка');
        	}
        }
      }

			next(action);
		};
	};
}