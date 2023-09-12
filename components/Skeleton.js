import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonContent from 'react-native-skeleton-content';
import { LinearGradient } from 'expo-linear-gradient';
//import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Feather } from '@expo/vector-icons';
import FocusAwareStatusBar from './FocusAwareStatusBar'

export default function Skeleton() {
    return (
        <View></View>
        // <SkeletonContent
        //     containerStyle={{ flex: 1, width: 300 }}
        //     isLoading={false}
        //     layout={[
        //         { key: 'someId', width: 220, height: 20, marginBottom: 6 },
        //         { key: 'someOtherId', width: 180, height: 20, marginBottom: 6 }
        //     ]}
        // >
        //     <Text style={styles.normalText}>Your content</Text>
        //     <Text style={styles.bigText}>Other content</Text>
        // </SkeletonContent>
        // <SkeletonPlaceholder borderRadius={4}>
        //   <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        //     <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
        //     <SkeletonPlaceholder.Item marginLeft={20}>
        //       <SkeletonPlaceholder.Item width={120} height={20} />
        //       <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
        //     </SkeletonPlaceholder.Item>
        //   </SkeletonPlaceholder.Item>
        // </SkeletonPlaceholder>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})