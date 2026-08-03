/**
 * HanziWriter — ordre des traits + mode quiz (tracé interactif)
 * Native : WebView + hanzi-writer.js (CDN)
 * Web    : <div> ref + injection dynamique du script
 */
import { useEffect, useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';

interface Props {
  hanzi: string;
  size?: number;
  strokeColor?: string;
  /** 'animate' = animation auto  |  'quiz' = l'utilisateur trace  |  'show' = affichage statique */
  mode?: 'animate' | 'quiz' | 'show';
  /** @deprecated utiliser mode='animate' */
  animate?: boolean;
  onComplete?: () => void;
}

// ── Version WEB ───────────────────────────────────────────────
function HanziWriterWeb({ hanzi, size = 200, strokeColor = '#E05040', mode, animate, onComplete }: Props) {
  const resolvedMode = mode ?? (animate !== false ? 'animate' : 'show');
  const containerRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || !hanzi) return;
    // Vider le contenu précédent avant de réinitialiser
    containerRef.current.innerHTML = '';
    const id = `hw-${hanzi}-${resolvedMode}`;
    containerRef.current.id = id;

    function init() {
      const HW = (window as any).HanziWriter;
      if (!HW || !containerRef.current) return;

      const writer = HW.create(id, hanzi, {
        width: size,
        height: size,
        padding: 12,
        strokeColor,
        radicalColor: strokeColor,
        highlightColor: '#FFA500',
        drawingColor: strokeColor,
        drawingWidth: 4,
        delayBetweenStrokes: 200,
        strokeAnimationSpeed: 1.2,
        showOutline: true,
        outlineColor: '#CCCCCC',
        showCharacter: resolvedMode !== 'quiz',
      });

      if (resolvedMode === 'animate') {
        writer.animateCharacter();
        containerRef.current.addEventListener('click', () => writer.animateCharacter());
      } else if (resolvedMode === 'quiz') {
        writer.quiz({
          onComplete: () => onComplete?.(),
          onCorrectStroke: () => {},
          onMistake: () => {},
        });
        // Re-lancer le quiz au clic
        containerRef.current.addEventListener('click', () => {
          writer.cancelQuiz();
          writer.quiz({ onComplete: () => onComplete?.() });
        });
      }
      // mode 'show' = rien de plus, showCharacter suffit
    }

    if ((window as any).HanziWriter) {
      init();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.min.js';
      script.onload = init;
      document.head.appendChild(script);
    }
  }, [hanzi, size, strokeColor, resolvedMode]);

  // @ts-ignore
  return (
    <div
      ref={containerRef}
      style={{
        width: size,
        height: size,
        cursor: resolvedMode === 'animate' ? 'pointer' : 'crosshair',
        touchAction: 'none',
      }}
    />
  );
}

// ── Version NATIVE ────────────────────────────────────────────
function HanziWriterNative({ hanzi, size = 200, strokeColor = '#E05040', mode, animate, onComplete }: Props) {
  const resolvedMode = mode ?? (animate !== false ? 'animate' : 'show');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { WebView } = require('react-native-webview');

  const modeScript = resolvedMode === 'quiz'
    ? `w.quiz({onComplete:function(){window.ReactNativeWebView&&window.ReactNativeWebView.postMessage('complete');}});
       document.getElementById('t').addEventListener('click',function(){w.cancelQuiz();w.quiz({onComplete:function(){window.ReactNativeWebView&&window.ReactNativeWebView.postMessage('complete');}});});`
    : resolvedMode === 'animate'
    ? `w.animateCharacter();
       document.getElementById('t').addEventListener('click',function(){w.animateCharacter();});`
    : '';

  const html = `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
<style>
  *{margin:0;padding:0;box-sizing:border-box;-webkit-user-select:none;user-select:none}
  body{background:transparent;display:flex;align-items:center;justify-content:center;height:100vh;touch-action:none}
  svg{touch-action:none}
</style>
</head>
<body>
<div id="t"></div>
<script src="https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.min.js"></script>
<script>
var w=HanziWriter.create('t',${JSON.stringify(hanzi)},{
  width:${size},height:${size},padding:12,
  strokeColor:${JSON.stringify(strokeColor)},
  radicalColor:${JSON.stringify(strokeColor)},
  highlightColor:'#FFA500',
  drawingColor:${JSON.stringify(strokeColor)},
  drawingWidth:4,
  delayBetweenStrokes:200,strokeAnimationSpeed:1.2,
  showOutline:true,outlineColor:'#CCCCCC',
  showCharacter:${resolvedMode !== 'quiz'}
});
${modeScript}
</script>
</body>
</html>`;

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <WebView
        source={{ html }}
        style={{ width: size, height: size, backgroundColor: 'transparent' }}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        originWhitelist={['*']}
        allowsInlineMediaPlayback
        onMessage={(e: any) => { if (e.nativeEvent.data === 'complete') onComplete?.(); }}
      />
    </View>
  );
}

export function HanziWriter(props: Props) {
  if (Platform.OS === 'web') return <HanziWriterWeb {...props} />;
  return <HanziWriterNative {...props} />;
}

const styles = StyleSheet.create({
  wrap: { borderRadius: 16, overflow: 'hidden' },
});
