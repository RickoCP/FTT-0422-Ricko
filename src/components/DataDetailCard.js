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

const DataDetailCard = ({ containerStyle, judul, detail, appTheme, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                ...containerStyle
            }}
            onPress={onPress}
        >
            {/* Details */}
            <View
                style={{
                    flex: 1,
                    marginLeft: SIZES.base,
                }}
            >
                {/* Title */}
                <Text
                    style={{
                        color: appTheme?.textColor,
                        ...FONTS.h3,
                        fontSize: 18
                    }}
                >
                    {judul}
                </Text>

                {/* Instructor & Duration */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: SIZES.base
                    }}
                >
                    <Text
                        style={{
                            color: appTheme?.textColor5,
                            ...FONTS.body4
                        }}
                    >
                        By {detail}
                    </Text>


                </View>

            </View>
        </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(DataDetailCard);