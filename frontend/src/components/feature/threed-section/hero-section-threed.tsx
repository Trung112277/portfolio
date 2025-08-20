'use client'
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import {
  Text3D,
  Center,
  Float,
  useMatcapTexture
} from "@react-three/drei";

function HeroSectionThreed() {
    const [matcapTexture] = useMatcapTexture("CB4E88_F99AD6_F384C3_ED75B9");
    const ref = useRef<THREE.Mesh>(null);
    const [primaryColor, setPrimaryColor] = useState("#fbbf24");
    const [textSize, setTextSize] = useState(1);
  
    // Get primary color from CSS
    useEffect(() => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      const cssPrimaryColor = computedStyle.getPropertyValue('--primary') || '#1fc3ff';
      setPrimaryColor(cssPrimaryColor);
    }, []);

    // Responsive size for mobile
    useEffect(() => {
      const mediaQuery = window.matchMedia('(max-width: 640px)');
      const updateSize = () => setTextSize(mediaQuery.matches ? 0.6 : 1);
      updateSize();
      mediaQuery.addEventListener('change', updateSize);
      return () => mediaQuery.removeEventListener('change', updateSize);
    }, []);
  
    return (
      <>
        <Center>
          <Float speed={1}>
            <Text3D
              position={[0, 0, 0]}
              ref={ref}
              size={textSize}
              font={"/fonts/helvetiker_regular.typeface.json"}
              curveSegments={24}
              bevelSegments={1}
              bevelEnabled
              bevelSize={0.08}
              bevelThickness={0.03}
              height={0.5}
              lineHeight={0.9}
              letterSpacing={0.3}
            >
              PROJECTS
              <meshMatcapMaterial color={primaryColor} matcap={matcapTexture} />
            </Text3D>
          </Float>
        </Center>
      </>
    );
  }

export default HeroSectionThreed;