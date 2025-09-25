import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface StarCanvasProps {
  onAnimationComplete?: () => void;
}

interface GalaxyData {
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
}

interface CoreData {
  positions: Float32Array;
  colors: Float32Array;
}

interface ComponentProps {
  progress: number;
}

interface CameraAnimationProps extends ComponentProps {
  setProgress: (progress: number) => void;
  onAnimationComplete?: () => void;
}

// Generate random points in a sphere for stars
const generateSphere = (count: number, radius: number): Float32Array => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.random() * radius;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
};

// Generate more realistic and dense galaxy spiral
const generateGalaxySpiral = (count: number): GalaxyData => {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  
  // Define galaxy parameters
  const coreRadius = 0.8;
  const diskRadius = 4;
  const armCount = 4;
  const armSeparation = (Math.PI * 2) / armCount;
  
  for (let i = 0; i < count; i++) {
    let x: number, y: number, z: number;
    const rand = Math.random();
    
    // 40% chance for dense galactic center
    if (rand < 0.4) {
      // Dense galactic bulge
      const r = Math.random() * coreRadius;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.3; // Flattened bulge
      
      x = r * Math.cos(theta);
      y = r * Math.sin(phi) * 0.3; // Very flat for galactic plane
      z = r * Math.sin(theta);
      
      // Bright core colors (yellow/orange/white)
      colors[i * 3] = 0.9 + Math.random() * 0.1; // Red
      colors[i * 3 + 1] = 0.7 + Math.random() * 0.3; // Green
      colors[i * 3 + 2] = 0.4 + Math.random() * 0.3; // Blue
      sizes[i] = 0.02 + Math.random() * 0.03; // Larger core stars
    } 
    // 60% chance for spiral arms
    else {
      // Spiral arms
      const armIndex = Math.floor(Math.random() * armCount);
      const armAngle = armIndex * armSeparation;
      
      // Distance from center (weighted toward inner regions)
      const t = Math.pow(Math.random(), 0.7); // Bias toward inner galaxy
      const radius = coreRadius + t * (diskRadius - coreRadius);
      
      // Spiral angle calculation
      const spiralTightness = 0.8;
      const angle = armAngle + radius * spiralTightness + (Math.random() - 0.5) * 0.8;
      
      // Add spiral arm width and scatter
      const armWidth = 0.3 + radius * 0.1;
      const offsetAngle = angle + (Math.random() - 0.5) * armWidth;
      const offsetRadius = radius + (Math.random() - 0.5) * 0.4;
      
      x = offsetRadius * Math.cos(offsetAngle);
      z = offsetRadius * Math.sin(offsetAngle);
      
      // Galactic disk height (very thin)
      const scaleHeight = 0.08 + radius * 0.02;
      y = (Math.random() - 0.5) * scaleHeight * Math.exp(-radius / 2);
      
      // Spiral arm colors (blue-white for young stars, yellow-red for older)
      // const distanceFromCenter = Math.sqrt(x * x + z * z);
      // const normalizedDistance = Math.min(distanceFromCenter / diskRadius, 1);
      
      // Mix of star colors based on position
      if (Math.random() < 0.3) {
        // Young blue stars (in spiral arms)
        colors[i * 3] = 0.7 + Math.random() * 0.3;
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
      } else {
        // Older yellow-red stars
        colors[i * 3] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 1] = 0.6 + Math.random() * 0.3;
        colors[i * 3 + 2] = 0.3 + Math.random() * 0.4;
      }
      
      sizes[i] = 0.008 + Math.random() * 0.015; // Smaller arm stars
    }
    
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }
  
  return { positions, colors, sizes };
};

// Enhanced galactic center with bright core
const GalacticCore: React.FC<ComponentProps> = ({ progress }) => {
  const ref = useRef<THREE.Points>(null);
  const [coreData] = useState<CoreData>(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Very dense core
      const r = Math.pow(Math.random(), 2) * 0.5; // Heavily weighted toward center
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.2; // Very flat
      
      positions[i * 3] = r * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * 0.2;
      positions[i * 3 + 2] = r * Math.sin(theta);
      
      // Bright white-yellow core
      const brightness = 1 - r * 0.3;
      colors[i * 3] = brightness; // Red
      colors[i * 3 + 1] = brightness * 0.9; // Green
      colors[i * 3 + 2] = brightness * 0.7; // Blue
    }
    
    return { positions, colors };
  });
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
      
      // Fade out as we zoom in
      (ref.current.material as THREE.PointsMaterial).opacity = Math.max(0, (1 - progress * 1.5) * 0.9);
      
      // Scale up as we approach
      const scale = 1 + progress * 2;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <Points
      ref={ref}
      positions={coreData.positions}
      colors={coreData.colors}
      stride={3}
      frustumCulled
    >
      <PointMaterial
        transparent
        vertexColors
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const MilkyWayGalaxy: React.FC<ComponentProps> = ({ progress }) => {
  const ref = useRef<THREE.Points>(null);
  const [galaxyData] = useState<GalaxyData>(() => generateGalaxySpiral(15000)); // Increased density
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
      
      // Fade out as we zoom in
      (ref.current.material as THREE.PointsMaterial).opacity = Math.max(0, 1 - progress * 1.2);
      
      // Scale up as we approach
      const scale = 1 + progress * 1.8;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <Points
      ref={ref}
      positions={galaxyData.positions}
      colors={galaxyData.colors}
      stride={3}
      frustumCulled
    >
      <PointMaterial
        transparent
        vertexColors
        size={0.012}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const StarBackground: React.FC<ComponentProps> = ({ progress }) => {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState<Float32Array>(() => generateSphere(8000, 1.5)); // Increased star count

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 80;
      ref.current.rotation.y -= delta / 120;
      
      // Fade in as the galaxy fades out
      (ref.current.material as THREE.PointsMaterial).opacity = Math.min(1, progress * 1.5);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled
      >
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0}
        />
      </Points>
    </group>
  );
};

const CameraAnimation: React.FC<CameraAnimationProps> = ({  setProgress, onAnimationComplete }) => {
  const { camera } = useThree();
  const startTime = useRef<number>(Date.now());
  
  useFrame(() => {
    const elapsed = (Date.now() - startTime.current) / 1000;
    const animationDuration = 10;
    
    // Calculate progress (0 to 1)
    const newProgress = Math.min(elapsed / animationDuration, 1);
    setProgress(newProgress);
    
    // Notify when animation is complete
    if (newProgress >= 1 && onAnimationComplete) {
      onAnimationComplete();
    }
    
    // Smooth easing function
    const easeInOutCubic = (t: number): number => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    const easedProgress = easeInOutCubic(newProgress);
    
    // Camera movement: start far away looking at galaxy, zoom in
    const startZ = 6;
    const endZ = 1.2;
    camera.position.z = startZ + (endZ - startZ) * easedProgress;
    
    // Slight rotation during zoom
    camera.rotation.z = easedProgress * 0.15;
    
    camera.updateProjectionMatrix();
  });

  return null;
};

const StarCanvas: React.FC<StarCanvasProps> = ({ onAnimationComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  
  return (
    <div className="w-full h-full fixed inset-0 z-0">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <CameraAnimation 
            progress={progress} 
            setProgress={setProgress} 
            onAnimationComplete={onAnimationComplete}
          />
          
          {/* Bright Galactic Core */}
          <GalacticCore progress={progress} />
          
          {/* Dense Milky Way Galaxy */}
          <MilkyWayGalaxy progress={progress} />
          
          {/* Star field - fades in as we zoom into the galaxy */}
          <StarBackground progress={progress} />
          
          {/* Ambient light for better visibility */}
          <ambientLight intensity={0.1} />
        </Suspense>
      </Canvas>
      
      {/* Enhanced overlay gradient for depth effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, 
            rgba(0,0,0,0) 0%, 
            rgba(25,25,50,${0.2 * (1 - progress)}) 30%,
            rgba(0,0,0,${0.4 * (1 - progress)}) 60%, 
            rgba(0,0,0,${0.9 * (1 - progress)}) 100%)`,
          opacity: Math.max(0, 1 - progress * 1.5)
        }}
      />
      
      {/* Subtle glow effect for galaxy center */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, 
            rgba(255,200,100,${0.1 * (1 - progress)}) 0%, 
            transparent 40%)`,
          opacity: Math.max(0, 1 - progress * 2)
        }}
      />
    </div>
  );
};

export default StarCanvas;
