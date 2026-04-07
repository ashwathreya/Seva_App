import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  useWindowDimensions,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import Video from 'react-native-video';

const SPLASH_BG = '#0F3D3E';
const CROSS_MS = 300;
const EXIT_MS = 320;

/**
 * Static: centered PNG (42% width, clamped).
 * Video: 9:16 MP4 (e.g. 1080×1920), contained in a centered frame so we avoid full-screen
 * upscale blur. Letterbox/pillarbox uses SPLASH_BG. Android: shutterColor matches teal to
 * reduce surface flash; solid underlay catches decoder edge tint.
 *
 * If the background still “breathes” inside the file, re-export with fixed #0F3D3E, sRGB,
 * higher bitrate (e.g. H.264 CRF 15–18 or ~15–25 Mbps for 1080p), no film grain on flat BG.
 */
export default function SplashScreen({ navigation }) {
  const { width: winW, height: winH } = useWindowDimensions();
  const staticOpacity = useRef(new Animated.Value(1)).current;
  const videoOpacity = useRef(new Animated.Value(0)).current;
  const [videoPlaying, setVideoPlaying] = useState(false);
  const finished = useRef(false);
  const exiting = useRef(false);
  const maxTimer = useRef(null);
  const exitToWelcomeRef = useRef(() => {});

  const goWelcome = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    if (maxTimer.current) {
      clearTimeout(maxTimer.current);
      maxTimer.current = null;
    }
    navigation.replace('Welcome');
  }, [navigation]);

  const exitToWelcome = useCallback(() => {
    if (finished.current || exiting.current) return;
    exiting.current = true;
    if (maxTimer.current) {
      clearTimeout(maxTimer.current);
      maxTimer.current = null;
    }
    Animated.timing(videoOpacity, {
      toValue: 0,
      duration: EXIT_MS,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished: animDone }) => {
      if (animDone) goWelcome();
    });
  }, [goWelcome, videoOpacity]);

  exitToWelcomeRef.current = exitToWelcome;

  useEffect(() => {
    const ease = Easing.out(Easing.cubic);
    const t = setTimeout(() => {
      setVideoPlaying(true);
      Animated.parallel([
        Animated.timing(staticOpacity, {
          toValue: 0,
          duration: CROSS_MS,
          easing: ease,
          useNativeDriver: true,
        }),
        Animated.timing(videoOpacity, {
          toValue: 1,
          duration: CROSS_MS,
          easing: ease,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (finished.current) return;
        maxTimer.current = setTimeout(() => exitToWelcomeRef.current(), 15000);
      });
    }, 2000);
    return () => clearTimeout(t);
  }, [staticOpacity, videoOpacity]);

  useEffect(() => {
    return () => {
      if (maxTimer.current) clearTimeout(maxTimer.current);
    };
  }, []);

  const logoSize = Math.min(200, Math.max(120, winW * 0.42));

  // 1080×1920 portrait: fit inside screen without upscaling past 1 dimension (sharper than cover).
  const videoAspect = 1080 / 1920;
  let frameW = winW;
  let frameH = winW / videoAspect;
  if (frameH > winH) {
    frameH = winH;
    frameW = winH * videoAspect;
  }

  return (
    <View style={styles.videoRoot}>
      <StatusBar hidden />
      <Animated.View
        pointerEvents="none"
        style={[styles.videoLayer, { opacity: videoOpacity }]}>
        <View style={[styles.videoFrame, { width: frameW, height: frameH }]}>
          <View style={styles.videoUnderlay} />
          <Video
            source={require('../assets/seva_splash.mp4')}
            style={styles.videoInner}
            resizeMode="contain"
            repeat={false}
            muted
            paused={!videoPlaying}
            controls={false}
            onEnd={() => exitToWelcomeRef.current()}
            onError={() => exitToWelcomeRef.current()}
            ignoreSilentSwitch="ignore"
            useTextureView={Platform.OS === 'android'}
            shutterColor={SPLASH_BG}
          />
        </View>
      </Animated.View>
      <Animated.View
        pointerEvents={videoPlaying ? 'none' : 'auto'}
        style={[styles.staticLayer, { opacity: staticOpacity }]}>
        <Image
          source={require('../assets/seva_logo_new.png')}
          style={{ width: logoSize, height: logoSize }}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  videoRoot: {
    flex: 1,
    backgroundColor: SPLASH_BG,
  },
  videoLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: SPLASH_BG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoFrame: {
    overflow: 'hidden',
    borderRadius: 2,
    backgroundColor: SPLASH_BG,
  },
  videoUnderlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: SPLASH_BG,
  },
  videoInner: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: SPLASH_BG,
  },
  staticLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: SPLASH_BG,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
