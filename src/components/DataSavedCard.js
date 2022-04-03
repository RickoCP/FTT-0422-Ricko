import React from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";

import {
    IconLabel
} from ".";
import { SIZES, COLORS, FONTS, icons } from "../constants";

const DataSavedCard = ({ containerStyle, data, appTheme, onPress }) => {


    return (
        <View
            style={{
                flexDirection: 'row',
                ...containerStyle
            }}
            
        >
            {/* Thumbnail */}
            <ImageBackground
                source={{uri:`https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`}}
                resizeMode="cover"
                style={{
                    width:"100%",
                    height:250,
                    marginBottom: SIZES.radius
                }}
                imageStyle={{
                    borderRadius: SIZES.radius
                }}
            >
                <View
                    style={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        backgroundColor: COLORS.white
                    }}
                >
                    <Image
                        source={icons.favourite}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.secondary
                        }}
                    />
                </View>

                <TouchableOpacity
                    onPress={onPress}
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        right: 20,
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        backgroundColor: COLORS.white
                    }}
                >
                    <Image
                        source={icons.bin}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.black
                        }}
                    />
                </TouchableOpacity>
            </ImageBackground>

            {/* Details */}
            <View
                style={{
                    flex: 1,
                    marginLeft: SIZES.base,
                    position:'absolute',
                    bottom:20,
                    left:20
                }}
            >
                {/* Title */}
                <Text
                    style={{
                        color: appTheme?.textColor,
                        ...FONTS.h3,
                        fontSize: 20
                    }}
                >
                    ID: {data.id}
                </Text>

                {/* Instructor & Duration */}
                
            </View>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        appTheme: state.themeStore.appTheme,
        error: state.themeStore.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataSavedCard);