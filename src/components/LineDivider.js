import React from 'react';
import {
    View
} from 'react-native';
import { connect } from "react-redux";

const LineDivider = ({ lineStyle, appTheme }) => {
    return (
        <View
            style={{
                height: 2,
                width: "100%",
                backgroundColor: appTheme?.lineDivider,
                ...lineStyle
            }}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(LineDivider);