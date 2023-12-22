import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Context as BlogContext } from "../context/BlogContext";
import BlogPostForm from "../Components/BlogPostForm";


const EditScreen = ({ navigation }) => {
    const id = navigation.getParam('id');
    const { state, editBlogPost } = useContext(BlogContext);

    const blogPost = state.find (
        blogPost => blogPost.id === id
    );

    return (
        <BlogPostForm
          initialValues = {{ title: blogPost.title, content: blogPost.content}}
          onSubmit = {(title, content) => {
            editBlogPost ( id, title, content, () => navigation.pop() );  // navigation.pop is other way to jump to the previous screen (which is ShowScreen) after editing
          }}                                                             //  instead of using navigation.navigate which is in CreateScreen
        />
    );
};

const styles = StyleSheet.create ({});


export default EditScreen;