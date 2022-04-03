import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

import { COLORS, FONTS, SIZES } from "../constants";

const DataCard = ({ sharedElementPrefix, category, containerStyle, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                height: 150,
                width: 200,
                ...containerStyle
            }}
            onPress={onPress}
        >
            <SharedElement
                id={`${sharedElementPrefix}-DataCard-Bg-${category?.id}`}
                style={[StyleSheet.absoluteFillObject]}
            >
                <Image
                    source={{uri:`https://www.artic.edu/iiif/2/${category?.image_id}/full/843,/0/default.jpg`}}
                    resizeMode="cover"
                    style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: SIZES.radius,
                    }}
                />
            </SharedElement>

            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0
                }}
            >
                <SharedElement
                    id={`${sharedElementPrefix}-DataCard-Title-${category?.id}`}
                    style={[StyleSheet.absoluteFillObject]}
                >
                    <Text
                        style={{
                            position: 'absolute',
                            color: COLORS.white, ...FONTS.h5,
                            bottom: 5,
                            left: 10,
                            maxWidth: 150,
                        }}
                    >
                        {category?.title}
                    </Text>
                </SharedElement>
            </View>
        </TouchableOpacity>
    )
}

export default DataCard;