import createDataContext from "./createDataContext";
import uuid from 'react-native-uuid';


const blogReducer = (state, action) => {
     switch (action.type) {
          case 'edit_blogpost':
               return state.map (blogPost => {
                    return blogPost.id === action.payload.id ? action.payload : blogPost;

              // if (blogPost.id === action.payload.id) {      // This is the other way instead of the one above it
             //       return action.payload;
             //  } else {
             //       return blogPost;
             //  };

               });
          case 'delete_blogpost':
               return state.filter(blogPost => blogPost.id !== action.payload);
          case 'add_blogpost':
               return (
                    [
                         ...state,
                         {
                              id: uuid.v4(),
                              //title: `Blog Post #${state.length + 1}`
                              title: action.payload.title,
                              action: action.payload.content
                         }
                    ]
               // What i did here is that: i took all the existing blog posts and added them here (in action as: dot dot dot state) to this array, 
               //so this code itself means create a new array, and inside that new array take all the current blog posts we have and add them in to the new array (it's like some sort of loop).
               // and that kind of loop is going to get executed when the customer presses on the add Post button (which i created in indexScreen file)
               );
          default:
               return state;
     }
};

const addBlogPost = (dispatch) => {
     return (title, content, callback) => {
          dispatch ({ type: 'add_blogpost', payload: {title: title, content: content} });
          if (callback) {
               callback();
          };
     };
};

const deleteBlogPost = (dispatch) => {
     return id => {
          dispatch ({ type: 'delete_blogpost', payload: id });
     };
};

const editBlogPost = (dispatch) => {
     return (id, title, content, callback) => {
          dispatch ({
               type: 'edit_blogpost',
               payload: { id: id, title: title, content: content}
          });
          if (callback) {
               callback();
          };   // I used this way of callback in here and in addBlogPost instead of the simple way below, which is: callback() ,
               // to not face an error in the future because on the same 2 callbacks in 2 different cases
          // callback();
     };
};



export const { Context, Provider } = createDataContext (
     blogReducer,
     { addBlogPost, deleteBlogPost, editBlogPost },
     [{ title: 'TEST POST', content: 'TEST CONTENT', id: 1}]    // This is the initial default state value which is gonna be an empty array
);