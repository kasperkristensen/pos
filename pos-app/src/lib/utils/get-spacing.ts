import { StyleSheet } from 'react-native'
import { SpacingStyles, Theme } from '../../constants/theme'

type Props<T extends Record<string, unknown>> = SpacingStyles & T

export const cleanProps = <T extends Record<string, unknown>>(
  props: Props<T>
): { spacingProps: SpacingStyles } & Omit<T, keyof SpacingStyles> => {
  const { m, mb, ml, mr, mt, mx, my, p, pb, pl, pr, pt, px, py, ...rest } =
    props

  return {
    spacingProps: {
      m,
      mb,
      ml,
      mr,
      mt,
      mx,
      my,
      p,
      pb,
      pl,
      pr,
      pt,
      px,
      py,
    } as SpacingStyles,
    ...rest,
  }
}

export const getSpacing = (styles: SpacingStyles, theme: Theme) => {
  const styleSheet = StyleSheet.create({
    spacing: {
      margin: styles.m && theme.spacing[styles.m],
      marginTop: styles.mt && theme.spacing[styles.mt],
      marginRight: styles.mr && theme.spacing[styles.mr],
      marginBottom: styles.mb && theme.spacing[styles.mb],
      marginLeft: styles.ml && theme.spacing[styles.ml],
      marginHorizontal: styles.mx && theme.spacing[styles.mx],
      marginVertical: styles.my && theme.spacing[styles.my],
      padding: styles.p && theme.spacing[styles.p],
      paddingTop: styles.pt && theme.spacing[styles.pt],
      paddingRight: styles.pr && theme.spacing[styles.pr],
      paddingBottom: styles.pb && theme.spacing[styles.pb],
      paddingLeft: styles.pl && theme.spacing[styles.pl],
      paddingHorizontal: styles.px && theme.spacing[styles.px],
      paddingVertical: styles.py && theme.spacing[styles.py],
    },
  })

  return styleSheet.spacing
}
