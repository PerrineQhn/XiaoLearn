import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';

type ColorKey = keyof typeof Colors.light;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ColorKey
): string {
  const theme = useColorScheme();
  const colorFromProps = props[theme];
  if (colorFromProps) return colorFromProps;
  return Colors[theme][colorName] as string;
}
