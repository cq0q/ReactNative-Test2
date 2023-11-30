import React, { useReducer } from "react";

const BlogContext = React.createContext();

const blogReducer = (state, action) => {
     switch (action.type) {
          case 'add_blogpost':
               return (
                    [...state, { title: `Blog Post #${state.length + 1}` }] 
               // What i did here is that: i took all the existing blog posts and added them here (in action as: dot dot dot state) to this array, 
               //so this code itself means create a new array, and inside that new array take all the current blog posts we have and add them in to the new array (it's like some sort of loop).
               // and that kind of loop is going to get executed when the customer presses on the add Post button (which i created in indexScreen file)
               );
          default:
               return state;
     }
};


export const BlogProvider = ({ children }) => {
     const [blogPosts, dispatch] = useReducer (blogReducer, []);

     const addBlogPost = () => {
          dispatch ({ type: 'add_blogpost' });
     };


    return (
    <BlogContext.Provider value={{ data: blogPosts, addBlogPost}}>
        {children}
    </BlogContext.Provider>
    );
};


export default BlogContext;