import { Image as MedusaImage } from '@medusajs/medusa'
import { Dimensions, FlatList, Image, StyleSheet } from 'react-native'
import { Box } from '../../common'

type Props = {
  images?: Omit<MedusaImage, 'beforeInsert'>[] | null
}

const { width } = Dimensions.get('window')

const SPACING = 5
const ITEM_HEIGHT = 456
const BORDER_RADIUS = 20

export const ImageSlider = ({ images }: Props) => {
  if (!images) {
    return null
  }

  return (
    <Box backgroundColor="iconPrimary">
      <FlatList
        data={images}
        renderItem={({ item, index }) => {
          return (
            <Box
              style={{
                width: width,
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
      />
    </Box>
  )
}

const styles = StyleSheet.create({
  itemContent: {
    alignItems: 'center',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: ITEM_HEIGHT,
    borderRadius: 8,
    resizeMode: 'cover',
  },
})
