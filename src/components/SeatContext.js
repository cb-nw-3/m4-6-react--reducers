//Used to subscribe to the data held within this context
export const SeatContext = React.createContext();

const initialState = {
    hasLoaded: false,
    seats: null,
    numOfRows: 0,
    seatsPerRow: 0,
};

function reducer(state,action){
    //Need to complete this...
}

export const SeatProvider = ({children}) => {
    const [state, dispatch] = 
    React.useReducer(reducer, initialState);

    const receiveSeatInfoFromServer = (data) => {
        dispatch({
            type: 'receive-seat-info-from-server', ...data
        });
    };
    
    return (
    <SeatContext.Provider
        value={{
            state,
            actions:{
                receiveSeatInfoFromServer,
            }
        }}
    >
            {children}
        </SeatContext.Provider>
    );
};

