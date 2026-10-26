import * as THREE from 'three';

export function createHeartShape(): THREE.Shape {
  const shape = new THREE.Shape();
  // Centered, mathematically proportioned romantic heart
  shape.moveTo(0, 0.35);
  shape.bezierCurveTo(0, 0.6, 0.45, 0.9, 0.85, 0.9);
  shape.bezierCurveTo(1.4, 0.9, 1.4, 0.35, 1.4, 0.35);
  shape.bezierCurveTo(1.4, -0.1, 1.05, -0.45, 0.6, -0.85);
  shape.bezierCurveTo(0.3, -1.15, 0.05, -1.4, 0, -1.5);
  shape.bezierCurveTo(-0.05, -1.4, -0.3, -1.15, -0.6, -0.85);
  shape.bezierCurveTo(-1.05, -0.45, -1.4, -0.1, -1.4, 0.35);
  shape.bezierCurveTo(-1.4, 0.35, -1.4, 0.9, -0.85, 0.9);
  shape.bezierCurveTo(-0.45, 0.9, 0, 0.6, 0, 0.35);
  return shape;
}

export function createHeartGeometry(scale = 1.0, depth = 0.45): THREE.ExtrudeGeometry {
  const shape = createHeartShape();
  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: depth * scale,
    bevelEnabled: true,
    bevelSegments: 20,
    steps: 2,
    bevelSize: 0.22 * scale,
    bevelThickness: 0.22 * scale,
    curveSegments: 64,
  };

  const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geom.center(); // centers the heart pivot at (0, 0, 0)
  return geom;
}
