import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native';
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { toggleTheme } from "../../stores/actions/themeActions";

import {
    IconButton,
    LineDivider,
} from "../../components";
import { COLORS, FONTS, SIZES, icons } from '../../constants';
import { fetchDataSaved, RemoveDataSaved } from '../../stores/actions/dataSavedActions';
import DataSavedCard from '../../components/DataSavedCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Section = ({ containerStyle, title, children, appTheme }) => {
    return (
        <View
            style={{
                ...containerStyle
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.padding
                }}
            >
                <Text
                    style={{
                        flex: 1,
                        color: appTheme?.textColor,
                        ...FONTS.h2
                    }}
                >
                    {title}
                </Text>

            </View>

            {children}
        </View>
    )
}

const Home = (props) => {
    const [dataSavedShow, setDataSavedShow] = useState([]);

    const getDataSaved = async () => {
        try {
            props.dispatchDataSaved("dataSaved")
        } catch (e) {
            console.warn(e)
        }
    }

    useEffect(() => {
        getDataSaved()
    }, [])

    useEffect(() => {
        setDataSavedShow(props.dataSaved)
    }, [props.dataSaved,dataSavedShow])

    useEffect(() => {
        AsyncStorage.setItem('dataSaved', JSON.stringify(props.dataSaved));
    }, [props.dataSaved])

    async function removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch(exception) {
            return false;
        }
    }

    function deleteOnClick(id){
        props.dispatchRemoveDataSaved("dataSaved", id)
    }

    function toggleThemeHandler() {

        if (props.appTheme?.name == "light") {
            props.toggleTheme("dark")
        } else {
            props.toggleTheme("light")
        }
    }

    
    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 40,
                    marginBottom: 10,
                    paddingHorizontal: SIZES.padding,
                    alignItems: 'center'
                }}
            >
                {/* Greetings */}
                <View
                    style={{
                        flex: 1
                    }}
                >
                    <Text
                        style={{
                            color: props.appTheme?.textColor,
                            ...FONTS.h2
                        }}
                    >
                        Hello, Ricko Caesar Putra
                    </Text>
                    <Text
                        style={{
                            color: COLORS.gray50,
                            ...FONTS.body3
                        }}
                    >
                        {new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()}
                    </Text>
                </View>

                {/* theme button */}
                <IconButton
                    icon={icons.sun}
                    iconStyle={{
                        tintColor: props.appTheme?.tintColor
                    }}
                    onPress={() => toggleThemeHandler()}
                />
            </View>
        )
    }


    function renderSavedImage() {
        return (
            <Section
                title="Saved Image"
                appTheme={props.appTheme}
                containerStyle={{
                    marginTop: 30
                }}
            >
                {dataSavedShow?.length>0 && <FlatList
                    data={dataSavedShow}
                    listKey="Saved Image"
                    scrollEnabled={false}
                    keyExtractor={item => `SavedImage-${item?.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: SIZES.radius,
                        paddingHorizontal: SIZES.padding
                    }}
                    renderItem={({ item, index }) => (
                        <DataSavedCard
                            onPress={()=>deleteOnClick(item.id)}
                            data={item}
                            containerStyle={{
                                marginVertical: SIZES.padding,
                                marginTop: index == 0 ? SIZES.radius : SIZES.padding
                            }}
                        />
                    )}
                    ItemSeparatorComponent={() => (
                        <LineDivider />
                    )}
                />}
            </Section>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: props.appTheme?.backgroundColor1
            }}
        >
            {renderHeader()}

            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 150
                }}
                showsVerticalScrollIndicator={false}
            >

                {/* saved image*/}
                {renderSavedImage()}
            </ScrollView>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        appTheme: state.themeStore.appTheme,
        error: state.themeStore.error,
        dataSaved: state.dataSavedStore.payload,
        isLoading: state.dataStore.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleTheme: (themeType) => { return dispatch(toggleTheme(themeType)) },
        dispatchDataSaved: (storageKey) => dispatch(fetchDataSaved(storageKey)),
        dispatchRemoveDataSaved: (storageKey, id) => dispatch(RemoveDataSaved(storageKey, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);