const tintColorLight = '#2f95dc'
const tintColorDark = '#fff'

export const themeColors = {
  background: {
    background: '#fff',
    backgroundActive: 'rgba(141, 141, 141, 0.5)',
    backgroundHover: 'rgba(141, 141, 141, 0.12)',
    backgroundSelected: 'rgba(141, 141, 141, 0.2)',
    backgroundSelectedHover: 'rgba(141, 141, 141, 0.32)',
    backgroundBrand: '#0F62FE',
    backgroundInverse: '#393939',
    backgroundInverseHover: '#4c4c4c',
  },
  text: {
    textPrimary: '#161616',
    textSecondary: '#525252',
    textPlaceholder: '#a8a8a8',
    textHelper: '#6f6f6f',
    textOnColor: '#fff',
    textInverse: '#fff',
    textError: '#da1e28',
    textDisabled: '#161616',
    textOnColorDisabled: '#8d8d8d',
  },
  button: {
    buttonPrimary: '#0F62FE',
    buttonPrimaryHover: '#0353e9',
    buttonPrimaryActive: '#002d9c',
    buttonSecondary: '#393939',
    buttonSecondaryHover: '#4c4c4c',
    buttonSecondaryActive: '#6f6f6f',
    buttonTertiary: '#0f62fe',
    buttonTertiaryHover: '#0353e9',
    buttonTertiaryActive: '#002d9c',
    buttonDanger: '#da1e28',
    buttonDangerHover: '#ba1b23',
    buttonDangerActive: '#750e13',
    buttonDisabled: '#c6c6c6',
    buttonSeparator: '#e0e0e0',
  },
  layer: {
    layer01: '#f4f4f4',
    layer02: '#ffffff',
    layer03: '#f4f4f4',
    layerHover01: '#e5e5e5',
  },
  border: {
    borderSubtle: '#e0e0e0',
  },
}

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
}
