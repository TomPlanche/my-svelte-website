<script lang="ts">
  // Imports
  import { T } from '@threlte/core'
  import {TextureLoader, AdditiveBlending} from "three";
  import fragmentShader from './shaders/globe/globeFragmentShader.glsl?raw';
  import vertexShader from './shaders/globe/globeVertexShader.glsl?raw';

  // Variables
  const texture = new TextureLoader().load('./textures/earth_dark.jpg');

  // Functions
</script>

<T.Mesh>
  <T.SphereGeometry args={[5, 64, 64]} />
  <T.ShaderMaterial
    fragmentShader={fragmentShader}
    vertexShader={vertexShader}
    uniforms={{
      globeTexture: { value: texture }
    }}
    blending={AdditiveBlending}
    transparent
  />
</T.Mesh>

