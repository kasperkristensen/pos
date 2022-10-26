const palette = {
  mineShaft: '#393939',
  white: '#fff',
  wildSand: '#f4f4f4',
  alto: '#e0e0e0',
  silverChalice: '#a8a8a8',
  codGray: '#161616',
  emporer: '#525252',
  silver: '#c6c6c6',
  butterCup: '#f1c21b',
  madang: '#a7f0ba',
  jewel: '#0E6027',
  tamarillo: '#a2191f',
  cosmos: '#FFD7D9',
  dusk: '#6F6F6F',
  alizarinCrimson: '#da1e28',
}

const bodyFontFamily = {
  fontFamily: 'inter-regular',
  fontWeight: '400' as const,
}

export const theme = {
  colors: {
    primary: palette.mineShaft,
    layer: palette.wildSand,
    subtle: palette.alto,
    overlay: palette.codGray,
    background: palette.white,
    backgroundInverse: palette.mineShaft,
    textPrimary: palette.codGray,
    textSecondary: palette.emporer,
    textError: palette.alizarinCrimson,
    textPlaceholder: palette.silverChalice,
    textHelper: palette.dusk,
    textOnColor: palette.white,
    iconPrimary: palette.codGray,
    iconSecondary: palette.emporer,
    iconOnColor: palette.white,
    iconPlaceholder: palette.silverChalice,
    buttonPrimary: palette.codGray,
    buttonSecondary: palette.white,
    fieldPrimary: palette.wildSand,
    transparent: 'transparent',
    supportWarning: palette.butterCup,
    supportSuccess: palette.madang,
    supportError: palette.tamarillo,
  },
  spacing: {
    none: 0,
    px: 1,
    xxxs: 2,
    xxs: 4,
    xs: 8,
    s: 12,
    base: 16,
    m: 24,
    l: 28,
    xl: 32,
    xxl: 40,
    xxxl: 72,
  },
  radii: {
    none: 0,
    xs: 2,
    s: 4,
    m: 8,
    full: 9999,
  },
  borderVariants: {
    none: {
      borderWidth: 0,
    },
    subtle: {
      borderColor: palette.alto,
      borderWidth: 1,
    },
    interactive: {
      borderColor: palette.codGray,
      borderWidth: 2,
    },
  },
  buttonVariants: {
    primary: {
      backgroundColor: palette.mineShaft,
      borderRadius: 8,
    },
  },
  textVariants: {
    small: {
      ...bodyFontFamily,
      fontSize: 12,
      lineHeight: 20,
    },
    base: {
      ...bodyFontFamily,
      fontSize: 14,
      lineHeight: 24,
    },
    large: {
      ...bodyFontFamily,
      fontSize: 16,
      lineHeight: 24,
    },
    xlarge: {
      ...bodyFontFamily,
      fontSize: 24,
      lineHeight: 36,
    },
    xxlarge: {
      ...bodyFontFamily,
      fontSize: 30,
      lineHeight: 48,
    },
  },
}

export type Theme = typeof theme
export type SpacingStyles = {
  m?: keyof Theme['spacing']
  mt?: keyof Theme['spacing']
  mr?: keyof Theme['spacing']
  mb?: keyof Theme['spacing']
  ml?: keyof Theme['spacing']
  mx?: keyof Theme['spacing']
  my?: keyof Theme['spacing']
  p?: keyof Theme['spacing']
  pt?: keyof Theme['spacing']
  pr?: keyof Theme['spacing']
  pb?: keyof Theme['spacing']
  pl?: keyof Theme['spacing']
  px?: keyof Theme['spacing']
  py?: keyof Theme['spacing']
}

export const darkTheme: Theme = {
  ...theme,
}
