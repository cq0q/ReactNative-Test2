import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import BlogContext from "../context/BlogContext";


const IndexScreen = () => {
    const { data, addBlogPost } = useContext(BlogContext)  // Value (blogPosts) is setted depending on what u assigned it in BlogContext file
    return (
        <View>
            <Text>Index Screen</Text>
            <Button title= "Add Post"  onPress = {() => addBlogPost ()}></Button>
            <FlatList
              data = {data}
              keyExtractor = {blogPost => blogPost.title}
              renderItem = {({ item }) => {
                return (
                    <Text>{item.title}</Text>
                );
              }
            }
            />
        </View>
    );
};


const styles = StyleSheet.create ({});



export default IndexScreen;