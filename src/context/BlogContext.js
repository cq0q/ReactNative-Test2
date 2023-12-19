import createDataContext from "./createDataContext";
import uuid from 'react-native-uuid';


const blogReducer = (state, action) => {
     switch (action.type) {
          case 'delete_blogPost':
               return state.filter(blogPost => blogPost.id !== action.payload);
          case 'add_blogpost':
               return (
                    [...state, { id: uuid.v4(), title: `Blog Post #${state.length + 1}` }] 
               // What i did here is that: i took all the existing blog posts and added them here (in action as: dot dot dot state) to this array, 
               //so this code itself means create a new array, and inside that new array take all the current blog posts we have and add them in to the new array (it's like some sort of loop).
               // and that kind of loop is going to get executed when the customer presses on the add Post button (which i created in indexScreen file)
               );
          default:
               return state;
     }
};

const addBlogPost = (dispatch) => {
     return () => {
          dispatch ({ type: 'add_blogpost' });
     };
};

const deleteBlogPost = (dispatch) => {
     return id => {
          dispatch ({ type: 'delete_blogpost', payload: id });
     };
};



export const { Context, Provider } = createDataContext (
     blogReducer,
     { addBlogPost, deleteBlogPost },
     []    // This is the initial default state value which is gonna be an empty array
);