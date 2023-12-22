import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { Context as BlogContext } from "../context/BlogContext";
import BlogPostForm from "../Components/BlogPostForm";


const CreateScreen = ({ navigation }) => {
    const { addBlogPost } = useContext(BlogContext);

    return (
        <BlogPostForm
          onSubmit = {(title, content) => {
            addBlogPost (title, content, () => navigation.navigate('Index'));
          }}
        />
    );
};


const styles = StyleSheet.create({
});


export default CreateScreen;