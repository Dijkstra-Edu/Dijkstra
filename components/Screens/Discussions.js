import { StyleSheet, Text, View } from 'react-native'
import FocusAwareStatusBar from '../FocusAwareStatusBar'
import React from 'react'

export default function Discussion() {
    return (
        <View>
            <FocusAwareStatusBar backgroundColor="rgba(255,255,255,1)" barStyle="dark-content"/>
            <Text style={styles.text}>Coming Soon</Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    text: {
       color: '#E5E7EB',
       fontSize: 36,
       marginTop: 36,
       textAlign: 'center',
    },
 })