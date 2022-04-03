import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    Modal,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';
import { connect } from "react-redux";

import {
    IconButton,
    LineDivider,
} from "../../components";
import { COLORS, FONTS, SIZES, images, icons, dummyData } from "../../constants";
import { AddDataSaved, RemoveDataSaved } from '../../stores/actions/dataSavedActions';
import { updateDataSaved } from '../../data/asyncStorage';
import fetchDetailData from '../../stores/actions/detailDataActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataDetailCard from '../../components/DataDetailCard';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const HEADER_HEIGHT = 250;

const DetailData = (props) => {
    const { category, sharedElementPrefix } = props.route.params;

    const [isSaved, setIsSaved] = useState(false);
    const [detailDataShow, setDetailDataShow] = useState({});

    useEffect(() => {
        if (props.dataSaved?.filter((el) => {
            return el.id == category?.id
        }).length > 0) { setIsSaved(true) }
        else { setIsSaved(false); }

        props.dispatchDetailData(category?.id)

    }, []
    )

    useEffect(() => {
        setDetailDataShow(props.detailData)
    }, [props.detailData])

    useEffect(() => {
        AsyncStorage.setItem('dataSaved', JSON.stringify(props.dataSaved));
    }, [props.dataSaved])

    function handleIsSaveOnClick() {
        if (isSaved) {
            props.dispatchRemoveDataSaved("dataSaved", category?.id)
            setIsSaved(false)
        } else {
            props.dispatchAddDataSaved("dataSaved", category?.id, category?.image_id)
            setIsSaved(true)
        }
    }

    const flatListRef = React.useRef();
    const scrollY = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    const headerSharedValue = useSharedValue(80);

    // Handler

    const backHandler = () => {
        props.navigation.goBack()
    };

    // Render

    function renderMainHeader() {
        const inputRange = [0, HEADER_HEIGHT - 50];

        headerSharedValue.value = withDelay(500,
            withTiming(0, {
                duration: 500,
            })
        )

        const headerFadeAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: interpolate(headerSharedValue.value, [80, 0], [0, 1]),
            };
        });


        const headerHeightAnimatedStyle = useAnimatedStyle(() => {
            return {
                height: interpolate(scrollY.value, inputRange, [HEADER_HEIGHT, 120], Extrapolate.CLAMP),
            };
        });

        const headerHideOnScrollAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: interpolate(scrollY.value, [80, 0], [0, 1], Extrapolate.CLAMP),
                transform: [
                    {
                        translateY: interpolate(scrollY.value, inputRange, [0, 200], Extrapolate.CLAMP),
                    }
                ],
            };
        });

        const headerShowOnScrollAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: interpolate(scrollY.value, [80, 0], [1, 0], Extrapolate.CLAMP),
                transform: [
                    {
                        translateY: interpolate(scrollY.value, inputRange, [50, 130], Extrapolate.CLAMP),
                    }
                ],
            };
        });

        return (
            <Animated.View
                style={[{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 250,
                    overflow: "hidden"
                }, headerHeightAnimatedStyle]}
            >
                {/* Thumbnail */}
                <SharedElement
                    id={`${sharedElementPrefix}-DataCard-Bg-${category?.id}`}
                    style={[StyleSheet.absoluteFillObject]}
                >
                    <Image
                        source={{ uri: `https://www.artic.edu/iiif/2/${category?.image_id}/full/843,/0/default.jpg` }}
                        resizeMode="cover"
                        style={{
                            height: "100%",
                            width: "100%",
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,

                        }}
                    />
                </SharedElement>

                {/* text atas */}
                <Animated.View
                    style={[{
                        position: 'absolute',
                        top: -80,
                        left: 0,
                        right: 0,
                    }, headerShowOnScrollAnimatedStyle, headerFadeAnimatedStyle]}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            ...FONTS.h3,
                            color: COLORS.white
                        }}
                    >
                        {category?.title}
                    </Text>
                </Animated.View>

                {/* judul */}
                <Animated.View
                    style={[{
                        position: 'absolute',
                        bottom: 70,
                        left: 30,
                    }, headerHideOnScrollAnimatedStyle]}
                >
                    <SharedElement
                        id={`${sharedElementPrefix}-DataCard-Title-${category?.id}`}
                        style={[StyleSheet.absoluteFillObject]}
                    >
                        <Text
                            style={{
                                position: 'absolute',
                                color: COLORS.white,
                                maxWidth: SIZES.width,
                                ...FONTS.h2
                            }}
                        >
                            {category?.title}
                        </Text>
                    </SharedElement>
                </Animated.View>

                {/* Back */}
                <Animated.View
                    style={headerFadeAnimatedStyle}
                >
                    <IconButton
                        icon={icons.back}
                        iconStyle={{
                            tintColor: COLORS.black
                        }}
                        containerStyle={{
                            position: 'absolute',
                            top: 40,
                            left: 20,
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 25,
                            backgroundColor: COLORS.white
                        }}
                        onPress={() => {
                            // console.log(scrollY.value)
                            // backHandler()

                            if (scrollY.value >= 0 && scrollY.value <= 200) {
                                flatListRef.current?.scrollToOffset({
                                    offset: 0,
                                    animated: true
                                })

                                setTimeout(() => {
                                    headerSharedValue.value = withTiming(80, {
                                        duration: 500,
                                    }, () => {
                                        runOnJS(backHandler)();
                                    })
                                }, 100)
                            } else {
                                backHandler()
                            }
                        }}
                    />
                </Animated.View>

                {/* love */}
                <Animated.View
                    style={headerFadeAnimatedStyle}
                >
                    <IconButton
                        icon={icons.favourite}
                        iconStyle={{
                            width: 35,
                            height: 35,
                            tintColor: isSaved ? COLORS.secondary : COLORS.additionalColor4
                        }}
                        containerStyle={{
                            backgroundColor: COLORS.white,
                            position: 'absolute',
                            top: 40,
                            right: 20,
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 40,
                            paddingTop: 5,
                        }}
                        onPress={() => handleIsSaveOnClick()}


                    />
                </Animated.View >
            </Animated.View>
        )
    }

    function renderResults() {
        return (
            <View>
                <AnimatedFlatList
                    ref={flatListRef}
                    data={dummyData.data}
                    keyExtractor={item => `Results-${item.id}`}
                    contentContainerStyle={{
                        paddingTop: 270,
                        paddingHorizontal: SIZES.padding,
                    }}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    keyboardDismissMode="on-drag"
                    onScroll={onScroll}
                    ListHeaderComponent={
                        <View>
                            <DataDetailCard
                                judul={"Inscription"}
                                detail={detailDataShow?.inscriptions}
                                containerStyle={{
                                    marginVertical: SIZES.padding,
                                    marginTop: SIZES.radius
                                }}
                                onPress={() => ""}
                            />

                            <DataDetailCard
                                judul={"Provenance Text"}
                                detail={detailDataShow?.provenance_text}
                                containerStyle={{
                                    marginVertical: SIZES.padding,
                                    marginTop: SIZES.radius
                                }}
                                onPress={() => ""}
                            />

                            <DataDetailCard
                                judul={"Publication History"}
                                detail={detailDataShow?.publication_history}
                                containerStyle={{
                                    marginVertical: SIZES.padding,
                                    marginTop: SIZES.radius
                                }}
                                onPress={() => ""}
                            />

                            <DataDetailCard
                                judul={"Exhibition History"}
                                detail={detailDataShow?.exhibition_history}
                                containerStyle={{
                                    marginVertical: SIZES.padding,
                                    marginTop: SIZES.radius
                                }}
                                onPress={() => ""}
                            />
                        </View>
                    }
                    // renderItem={}
                    ItemSeparatorComponent={() => (
                        <LineDivider />
                    )}
                />

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
            {/* Results */}
            {renderResults()}

            {/* Header */}
            {renderMainHeader()}

        </View>
    )
}

DetailData.sharedElements = (route, otherRoute, showing) => {
    if (otherRoute.name === 'Dashboard') {
        const { category, sharedElementPrefix } = route.params;

        return [
            {
                id: `${sharedElementPrefix}-DataCard-Bg-${category?.id}`
            },
            {
                id: `${sharedElementPrefix}-DataCard-Title-${category?.id}`
            }
        ];
    }
};

function mapStateToProps(state) {
    return {
        appTheme: state.themeStore.appTheme,
        error: state.themeStore.error,
        dataSaved: state.dataSavedStore.payload,
        isLoading: state.dataStore.isLoading,
        detailData: state.detailDataStore.payload
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleTheme: (themeType) => { return dispatch(toggleTheme(themeType)) },
        dispatchDataSaved: (storageKey) => dispatch(fetchDataSaved(storageKey)),
        dispatchRemoveDataSaved: (storageKey, id) => dispatch(RemoveDataSaved(storageKey, id)),
        dispatchAddDataSaved: (storageKey, id, image_id) => dispatch(AddDataSaved(storageKey, id, image_id)),
        dispatchDetailData: (identifier) => dispatch(fetchDetailData(identifier)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailData);