<script lang="ts">
  // Imports
  import { T } from '@threlte/core'
  import {TextureLoader, AdditiveBlending} from "three";

  import fragmentShader from './shaders/globe/globeFragmentShader.glsl?raw';
  import vertexShader from './shaders/globe/globeVertexShader.glsl?raw';
  import dots from './dots.json';
  import type {TPoint} from "$lib/types";
  import {lonLatToVector3} from "$lib/utils";
  import {globeVars} from "$lib/globals";

  // Functions

  // Variables
  // types
  type TDot = {
    lon: number;
    lat: number;
  };

  // constants
  const texture = new TextureLoader();

  const {
    radius,
    segments,
  } = globeVars;

  const finalDots: TPoint[] = dots.map((dot: TDot) => {
    const { lon, lat } = dot;

    return lonLatToVector3(
      lon % 360 - 180,
      lat,
      radius
    )
  });
</script>

<T.Mesh>
  <T.SphereGeometry args={[radius, segments, segments]} />
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


{#each finalDots as dot}
  <T.Mesh position={[-dot.x, -dot.y, -dot.z]} key={dot.x + dot.y + dot.z}>
    <T.SphereGeometry args={[0.025, 32, 32]} />
    <T.MeshBasicMaterial color="white" />
  </T.Mesh>
{/each}
