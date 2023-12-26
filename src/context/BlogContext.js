import createDataContext from "./createDataContext";
import uuid from 'react-native-uuid';
import jsonServer from "../api/jsonServer";


const blogReducer = (state, action) => {
     switch (action.type) {
          case 'get_blogposts':
               return action.payload;

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

          //case 'add_blogpost':
          //     return (
          //          [
          //               ...state,
          //               {
          //                    id: uuid.v4(),
          //                    //title: `Blog Post #${state.length + 1}`
          //                    title: action.payload.title,
          //                    action: action.payload.content
          //               }
          //          ]
          //     // What i did here is that: i took all the existing blog posts and added them here (in action as: dot dot dot state) to this array, 
          //     //so this code itself means create a new array, and inside that new array take all the current blog posts we have and add them in to the new array (it's like some sort of loop).
          //     // and that kind of loop is going to get executed when the customer presses on the add Post button (which i created in indexScreen file)
          //     );
          //default:
          //     return state;
     }
};

const getBlogPosts = dispatch => {
     return async () => {
          const response = await jsonServer.get('/blogposts');
          // response.data === [ {}, {}, {} ]
          // response.data property is where our list of blog posts is going to be.
          // so Json or response.data will be an array of objects (like how i wrote in the first comment), where every object is our blog post .
          dispatch ({ type: 'get_blogposts', payload: response.data });
     };
};

const addBlogPost = (dispatch) => {
     return async (title, content, callback) => {
          await jsonServer.post('/blogposts', { title: title, content: content });
          //dispatch ({ type: 'add_blogpost', payload: {title: title, content: content} });
          if (callback) {
               callback();
          };
     };
};

const deleteBlogPost = (dispatch) => {
     return async id => {
          await jsonServer.delete(`/blogposts/${id}`);

          dispatch ({ type: 'delete_blogpost', payload: id });
     };
};

const editBlogPost = (dispatch) => {
     return async (id, title, content, callback) => {
          await jsonServer.put(`/blogposts/${id}`, { title: title, content: content });

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
     { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
     []    // This is the initial default state value which is gonna be an empty array (which basically means: what shows on the screen when you open the app)
);