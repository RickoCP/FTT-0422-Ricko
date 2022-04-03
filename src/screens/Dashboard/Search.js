import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    ActivityIndicator,
    LogBox 
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import  Animated,{
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';
import { connect } from "react-redux";

import { COLORS, FONTS, SIZES, icons } from '../../constants';
import { fetchData, fetchSearch } from '../../stores/actions/dataActions';
import DataCard from '../../components/DataCard';

LogBox.ignoreAllLogs();

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)


const Search = (props) => {
    const navigation = useNavigation();

    const [dataShow, setDataShow] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(15);
    const [query, setQuery] = useState('');
    const [isScrollBegin, setIsScrollBegin] = useState(false);
    const [isAddList, setIsAddList] = useState(false);

    const flatlistRef = useRef();

    const scrollY = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });


    const getData = async () => {
        try {
            props.dispatchData(page, limit)
        } catch (e) {
            console.warn(e)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        setDataShow(props.data)
    }, [props.data])

    const searchOnPress = async () => {
        try {
            setIsAddList(false)
            props.dispatchSearch(query)

        } catch (e) {
            console.warn(e)
        }
    }
    const onEndReachedThreshold = async () => {
        try {
            setPage(page + 1)
            setIsScrollBegin(false)
            setIsAddList(true)
            props.dispatchData(page+1, limit)
        } catch (e) {
            console.warn(e)
        }
    }


    function renderSearchBar() {
        const inputRange = [0, 120];

        const searchBarAnimatedStyle = useAnimatedStyle(() => {
            return {
                // height: interpolate(scrollY.value, inputRange, [120, 0], Extrapolate.CLAMP),
                // opacity: interpolate(scrollY.value, inputRange, [1, 0], Extrapolate.CLAMP),
            };
        });

        return (
            <Animated.View
                style={[{
                    height: 120,
                    paddingTop: 50,
                    paddingBottom: 20,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    flex: 1,
                    paddingHorizontal: SIZES.padding,
                }, searchBarAnimatedStyle]}
            >
                <Shadow>
                    <View
                        style={{
                            // height:50,
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: SIZES.width - (SIZES.padding * 2),
                            paddingHorizontal: SIZES.radius,
                            borderRadius: SIZES.radius,
                            backgroundColor: props.appTheme?.backgroundColor7
                        }}
                    >
                        <TextInput
                            style={{
                                flex: 1,
                                marginLeft: SIZES.base,
                                color: props.appTheme?.textColor,
                                ...FONTS.h4,
                            }}
                            value={query}
                            placeholder="Search"
                            placeholderTextColor={props.appTheme?.textColor6}
                            onChangeText={(text) => setQuery(text)}
                        />
                        <TouchableOpacity
                            onPress={() => searchOnPress(query)}
                        >
                            <Image
                                source={icons.search}
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: COLORS.gray40
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </Shadow>
            </Animated.View>
        )
    }


    function renderImage() {
        return (

            <View
                style={{
                    marginTop: 120
                }}
            >
                {props.isLoading && !isAddList &&

                    <ActivityIndicator size="large" color={props.appTheme?.primaryColor} />
                }

                {!props.isLoading &&
                    <AnimatedFlatList
                        onScroll={onScroll}
                        ref={flatlistRef}
                        data={dataShow}
                        numColumns={2}
                        scrollEnabled={true}
                        listKey="BrowseCategories"
                        keyExtractor={item => `BrowseCategories-${item.id}`}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            flexGrow:1,
                            paddingBottom: 150,
                        }}
                        onContentSizeChange={() =>
                            isAddList ? flatlistRef.current.scrollToEnd({
                                animated: false,
                            }) : ""
                        }
                        onMomentumScrollBegin={() => {
                            setIsScrollBegin(true)
                        }}
                        onEndReachedThreshold={0.0001} // 0, 0.01, 0.1, 0.7, 50, 100, 700
                        onEndReached={({ distanceFromEnd }) => {
                            console.log("isScrollBegin: ",isScrollBegin)
                            console.log("distanceFromEnd: ",distanceFromEnd)
                            if (isScrollBegin) {
                                onEndReachedThreshold()
                                setLimit(5)
                            }
                        }}
                        ListHeaderComponent={() => (
                            <Text
                                style={{
                                    // marginTop: 100,
                                    marginHorizontal: SIZES.padding,
                                    color: props.appTheme?.textColor,
                                    ...FONTS.h2
                                }}
                            >
                                Image
                            </Text>
                        )}
                        ListFooterComponent={() => (
                            props.isLoading && isAddList && <ActivityIndicator size="large" color={props.appTheme?.primaryColor} />

                        )}
                        renderItem={({ item, index }) => (
                            <DataCard
                                sharedElementPrefix="Search"
                                category={item}
                                containerStyle={{
                                    height: 130,
                                    width: (SIZES.width - (SIZES.padding * 2) - SIZES.radius) / 2,
                                    marginTop: SIZES.radius,
                                    marginLeft: (index + 1) % 2 == 0 ? SIZES.radius : SIZES.padding
                                }}
                                onPress={() => navigation.navigate("DetailData", { category: item, sharedElementPrefix: "Search" })}
                            />
                        )}
                    />}
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: props.appTheme?.backgroundColor1
            }}
        >

            {renderImage()}
            {renderSearchBar()}

        </View>
    )
}

function mapStateToProps(state) {
    return {
        appTheme: state.themeStore.appTheme,
        error: state.themeStore.error,
        data: state.dataStore.payload,
        isLoading: state.dataStore.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchData: (page, limit) => dispatch(fetchData(page, limit)),
        dispatchSearch: (query) => dispatch(fetchSearch(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);