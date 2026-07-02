import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';
import Svg, { Line, Path, Rect, Text as SvgText } from 'react-native-svg';
import { colors, spacing } from '../../utils/theme';

type Point = { x: number; y: number };

export interface WritingCanvasHandle {
  clear: () => void;
}

interface WritingCanvasProps {
  character: string;
  height: number;
  onHasStrokesChange?: (hasStrokes: boolean) => void;
  onDrawingChange?: (isDrawing: boolean) => void;
}

export const WritingCanvas = forwardRef<WritingCanvasHandle, WritingCanvasProps>(
  ({ character, height, onHasStrokesChange, onDrawingChange }, ref) => {
    const [layout, setLayout] = useState({ width: 0, height: 0 });
    const [strokes, setStrokes] = useState<Point[][]>([]);
    const strokesRef = useRef<Point[][]>([]);

    const updateStrokes = useCallback((nextStrokes: Point[][]) => {
      strokesRef.current = nextStrokes;
      setStrokes(nextStrokes);
      onHasStrokesChange?.(nextStrokes.length > 0);
    }, [onHasStrokesChange]);

    useImperativeHandle(ref, () => ({
      clear: () => updateStrokes([]),
    }));

    const panResponder = useMemo(
      () =>
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderGrant: (event) => {
            onDrawingChange?.(true);
            const { locationX, locationY } = event.nativeEvent;
            const nextStrokes = [...strokesRef.current, [{ x: locationX, y: locationY }]];
            updateStrokes(nextStrokes);
          },
          onPanResponderMove: (event) => {
            const { locationX, locationY } = event.nativeEvent;
            const current = strokesRef.current;
            if (current.length === 0) return;
            const nextStrokes = current.slice();
            const lastIndex = nextStrokes.length - 1;
            nextStrokes[lastIndex] = [
              ...nextStrokes[lastIndex],
              { x: locationX, y: locationY },
            ];
            updateStrokes(nextStrokes);
          },
          onPanResponderRelease: () => {
            onDrawingChange?.(false);
          },
          onPanResponderTerminate: () => {
            onDrawingChange?.(false);
          },
        }),
      [onDrawingChange, updateStrokes]
    );

    const buildPath = (points: Point[]) =>
      points
        .map((point, index) =>
          index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
        )
        .join(' ');

    const guideSize = Math.min(layout.width, layout.height) * 0.6;

    return (
      <View
        style={[styles.container, { height }]}
        onLayout={(event) => {
          const { width, height: layoutHeight } = event.nativeEvent.layout;
          setLayout({ width, height: layoutHeight });
        }}
        {...panResponder.panHandlers}
      >
        <Svg width="100%" height="100%">
          <Rect
            x={0}
            y={0}
            width="100%"
            height="100%"
            rx={16}
            ry={16}
            fill={colors.glass}
            stroke={colors.glassBorder}
            strokeWidth={1}
          />
          <Line
            x1={layout.width / 2}
            y1={spacing.md}
            x2={layout.width / 2}
            y2={layout.height - spacing.md}
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth={1}
          />
          <Line
            x1={spacing.md}
            y1={layout.height / 2}
            x2={layout.width - spacing.md}
            y2={layout.height / 2}
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth={1}
          />
          <SvgText
            x={layout.width / 2}
            y={layout.height / 2}
            fill="rgba(255, 255, 255, 0.08)"
            fontSize={guideSize}
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {character}
          </SvgText>
          {strokes.map((stroke, index) => (
            <Path
              key={index}
              d={buildPath(stroke)}
              stroke={colors.text}
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          ))}
        </Svg>
      </View>
    );
  }
);

WritingCanvas.displayName = 'WritingCanvas';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
});
