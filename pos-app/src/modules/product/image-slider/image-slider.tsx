import { Image as MedusaImage } from '@medusajs/medusa'
import { useRef, useState } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  ViewToken,
} from 'react-native'
import { Box } from '../../common'

type Props = {
  images?: Omit<MedusaImage, 'beforeInsert'>[] | null
}

const { width } = Dimensions.get('window')

const ITEM_HEIGHT = 456

export const ImageSlider = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index || 0)
      }
    }
  )

  if (!images) {
    return null
  }

  return (
    <Box>
      <FlatList
        onViewableItemsChanged={handleViewableItemsChanged.current}
        data={images}
        renderItem={({ item, index }) => {
          return (
            <Box
              style={{
                width: width - 56,
              }}
            >
              <Box key={index} style={styles.itemContent} radii="m">
                <Image source={{ uri: item.url }} style={styles.itemImage} />
              </Box>
            </Box>
          )
        }}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
      <Box style={styles.indicators} mt="l">
        {Array.from({ length: images.length }).map((_, index) => {
          return (
            <Box
              key={index}
              style={{
                ...styles.dot,
              }}
              radii="full"
              mr={index !== images.length - 1 ? 'xs' : 'none'}
              backgroundColor={
                currentIndex === index ? 'iconPrimary' : 'iconPlaceholder'
              }
            />
          )
        })}
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  itemContent: {
    alignItems: 'center',
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 8,
  },
  itemImage: {
    width: '100%',
    height: ITEM_HEIGHT,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
  },
})
