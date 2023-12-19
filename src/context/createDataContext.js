import React, { useReducer } from "react";


export default (reducer, actions, initialState) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        // actions === { addBlogPost: (dispatch) => { return () => {} } } 
        // the explanation for what is above is this:
        // we're going to loop through that actions object for every key (which is addBlogPost for now).
        // and then we're gonna take that function (dispatch) and we're going to call it with the dispatch argument.
        // And that's going to give us back (the return function).
        // and the return function is going to pass on down the value prop in provider below
        // which essentially going to let all of our child components make changes to our state object.

        const boundActions = {};
        for (let key in actions) {
            // key === addBlogPost
            boundActions [key] = actions [key] (dispatch);
        };


        return (
            <Context.Provider  value={{ state: state, ...boundActions }}>
                { children }
            </Context.Provider>
        );
    };

    return (
        { Context, Provider }
    );
};