import * as MediaLibrary from 'expo-media-library'
import { useEffect, useState } from 'react'
import {
    Dimensions,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native'

const windowWidth = Dimensions.get('window').width

const imageWidth = windowWidth * 0.33
const imageGap = windowWidth * 0.005

export default function MediaScreen() {
    const [permissionResponse, requestPermission] =
        MediaLibrary.usePermissions()
    const [photos, setPhotos] = useState([])
    const [selectedPhotos, setSelecetedPhotos] = useState([])

    async function loadInitialPhotos() {
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: MediaLibrary.MediaType.photo,
            sortBy: ['creationTime'],
            first: 6,
        })
        setPhotos(media.assets)
    }

    useEffect(() => {
        if (permissionResponse && permissionResponse.granted) {
            loadInitialPhotos()
        }
    }, [permissionResponse])

    if (!permissionResponse) {
        return (
            <View style={styles.container}>
                <Text></Text>
            </View>
        )
    }

    const { granted, canAskAgain } = permissionResponse

    if (!granted && canAskAgain) {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={requestPermission}>
                    <Text>Request permission</Text>
                </TouchableOpacity>
            </View>
        )
    } else if (!granted && !canAskAgain) {
        return (
            <View style={styles.container}>
                <Text>
                    Permission to access your photos is not granted {'\n'}
                    Change this in{' '}
                    <Text style={{ fontWeight: 'bolder' }}>
                        {' '}
                        Settings {'>'} Permissions
                    </Text>
                </Text>
            </View>
        )
    }

    function loadMore() {
        //to do
    }

    return (
        <View style={{ position: 'relative', flex: 1 }}>
            <FlatList
                data={photos}
                onEndReached={loadMore}
                numColumns={3}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => {
                    return (
                        <ImageItem
                            photo={item}
                            selected={
                                selectedPhotos.findIndex(
                                    (selected) => selected.id === item.id
                                ) + 1
                            }
                            select={() =>
                                setSelecetedPhotos([...selectedPhotos, item])
                            }
                            remove={() =>
                                setSelecetedPhotos(
                                    selectedPhotos.filter(
                                        (selected) => selected.id !== item.id
                                    )
                                )
                            }
                        />
                    )
                }}
                keyExtractor={(item) => item.uri}
            />
            {selectedPhotos.length > 0 && (
                <TouchableOpacity>
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            padding: 15,
                            margin: 20,
                            backgroundColor: '#26a7de',
                            alignSelf: 'center',
                            borderRadius: 18,
                            width: 124,
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 18, color: 'white' }}>
                            Send
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    )
}

const ImageItem = ({ photo, selected, select, remove }) => {
    return (
        <TouchableOpacity onPress={() => (selected ? remove() : select())}>
            <Image
                source={photo}
                style={{ ...styles.photo, marginBottom: imageGap }}
            />
            {!!selected && (
                <View
                    style={{
                        ...styles.photo,
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, .6)',
                        borderColor: 'blue',
                        borderWidth: 5,
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 24 }}>
                        {selected}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photo: {
        width: imageWidth,
        height: imageWidth,
    },
})
