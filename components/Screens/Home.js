import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ActivityIndicator, Animated, StyleSheet, FlatList, View, Text } from 'react-native';

import FocusAwareStatusBar from '../FocusAwareStatusBar'
import PostListItems from '../PostListItems';
import Seperator from '../Seperator';
import Slider from '../Slider';
import { getFeaturedPost, getLatestPosts, getSinglePost } from '../../API/post'
// import { Icon } from 'react-native-vector-icons/FontAwesome';// <Icon name="rocket" size={30} color="#900" />

const limit = 5;
let pageNo = 0;

export default function Home({ navigation }) {

  const [featuerdPosts, setFeaturedPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loading1, setloading1] = useState(true);
  const [loading2, setloading2] = useState(true);


  const fetchFeaturedPost = async () => {
    const { error, posts } = await getFeaturedPost();
    if (error) return console.log(error);
    //console.log(posts);
    setFeaturedPosts(posts);
    setloading1(false);
  }

  const fetchLatestPost = async () => {
    const { error, posts } = await getLatestPosts(limit, pageNo);
    if (error) return console.log(error);
    //console.log(posts);
    setLatestPosts(posts);
    setloading2(false);
  }

  const fetchMorePosts = async () => {
    if (reachedToEnd || busy) return;
    pageNo += 1;
    setBusy(true);
    const { error, posts, postCount } = await getLatestPosts(limit, pageNo);
    setBusy(false);
    if (error) return console.log(error);

    if (postCount === latestPosts.length) return setReachedToEnd(true);

    //console.log(posts);
    setLatestPosts([...latestPosts, ...posts]);
  }

  useEffect(() => {
    fetchFeaturedPost();
    fetchLatestPost();

    return () => {
      pageNo = 0;
      setReachedToEnd(false);
    };
  }, []);

  const Carousel = useCallback(() => {
    return (<View>
      {featuerdPosts.length ? <Slider onSlidePress={fetchSinglePost} data={featuerdPosts} title="Featured Posts" /> : null}
      <View style={{ marginTop: 15 }}>
        <Seperator width='100%' />
        <Text style={{ fontWeight: "700", color: "#383838", fontSize: 22, marginTop: 15 }}>Latest Posts</Text>
      </View>
    </View>)
  }, [featuerdPosts]);

  const fetchSinglePost = async (postInfo) => {
    const slug = postInfo.slug || postInfo;
    const { error, post } = await getSinglePost(slug);
    if (error) return console.log(error);
    navigation.navigate('PostDetail', { post });
  }

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginTop: 15 }}>
        <PostListItems onPress={() => fetchSinglePost(item.slug)} post={item} />
      </View>
    )
  }

  const itemSeparatorComponent = () => <Seperator width='90%' style={{ marginTop: 15 }} />
  const memoizedValue = useMemo(() => renderItem, [latestPosts]);

  // return (<Slider onSlidePress={fetchSinglePost} data={featuerdPosts} title="Featured Posts" />);

  const FadeInView = props => { //Fix this by next update
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);

    return (
      <Animated.View // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim, // Bind opacity to animated value
        }}>
        {props.children}
      </Animated.View>
    );
  };

  if (loading1 && loading2) {
    return <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#008000" />
    </View>
    // return <Loader />
  } else {
    //return <FadeInView>
      return <View>
        <FocusAwareStatusBar backgroundColor="rgba(255,255,255,1)" barStyle="dark-content" />
        <FlatList
          removeClippedSubviews
          data={latestPosts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
          ListHeaderComponent={Carousel}
          ItemSeparatorComponent={itemSeparatorComponent}
          renderItem={memoizedValue}
          onEndReached={fetchMorePosts}
          onEndReachedThreshold={0}
          ListFooterComponent={() => {
            return reachedToEnd ? (
              <View>
                <Text style={{
                  fontWeight: "bold",
                  color: "#383838",
                  textAlign: "center",
                  paddingVertical: 15,
                }}>
                  You Reached the End!
                </Text>
                {/* <Icon name="rocket" size={30} color="#900" /> */}
              </View>
            ) : null;
          }}
        />
      </View>
    //</FadeInView>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
