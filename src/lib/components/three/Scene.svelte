<script lang="ts">
  import { useTask } from '@threlte/core'
  import {interactivity, OrbitControls} from '@threlte/extras'
  import {Color, Mesh, MeshBasicMaterial, MeshPhongMaterial, SphereGeometry, TextureLoader, Vector3} from "three";
  import { T } from '@threlte/core'
  import {onMount} from "svelte";
  import type {TUserLocation} from "../../../routes/api/where/+server";

  interactivity();

  // Variables
  // Types
  type TSphere = {
    radius: number,
    segments: number,
    rotation: number,
    speed: number,
  }

  const textureLoader = new TextureLoader();
  let userCoords: TUserLocation;


  const earthVars: TSphere = {
    radius: 3,
    segments: 64,
    rotation: 0,
    speed: 0.05,
  } as TSphere;

  const cloudVars: TSphere = {
    radius: 3.01,
    segments: 64,
    rotation: 7,
    speed: 0.06,
  } as TSphere;

  export let data: {
    userLocation: TUserLocation
  };

  // Functions
  /**
   * Converts lat/long to Vector3 for use in Three.js
   * This function will be used to place markers on the 'earth'
   *
   * @param lat {number} - Latitude
   * @param long {number} - Longitude
   * @param debug {boolean} - Debug mode
   *
   * @returns {Vector3}
   */
  const latLongToVector3 = (
    lat: number,
    long: number,
    debug = false
  ): {
    x: number,
    y: number,
    z: number,
  } => {
    if (debug) {
      console.log(`[Scene] latLongToVector3: ${lat}, ${long}`);
    }

    const phi = (lat * Math.PI) / 180;
    const theta = ((long - 180) * Math.PI) / 180;

    const x = -(earthVars.radius * Math.cos(phi) * Math.cos(theta));
    const y = earthVars.radius * Math.sin(phi);
    const z = earthVars.radius * Math.cos(phi) * Math.sin(theta);

    if (debug) {
      console.log(`[Scene] latLongToVector3: x: ${x}, y: ${y}, z: ${z}`);
    }

    return { x, y, z };
  }

  // Watchers
  // $: userCoords && console.log(`[Scene] User location: ${JSON.stringify(userCoords)}`);
  $: if (data) {
    console.log(`[Scene] User location: ${JSON.stringify(data)}`);
    console.log(`[Scene] Vector3: ${JSON.stringify()}`);
  }
  // Lifecycle
  onMount(() => {
    // userCoords = data.userLocation;
    // console.log(`[Scene] User location: ${JSON.stringify(userCoords)}`);
  });

  useTask((delta) => {
    earthVars.rotation += earthVars.speed * delta;
    cloudVars.rotation += cloudVars.speed * delta;
  })
</script>


<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}

  on:create={({ ref }) => {
    ref.lookAt(0, 1, 0)
  }}
>
  <OrbitControls />
</T.PerspectiveCamera>

<T.DirectionalLight
  position={[0, 10, 10]}
  castShadow
/>
<T.AmbientLight intensity={0.5} />

<!-- Earth -->
<T.Mesh rotation={[0, earthVars.rotation, 0]}>
  <T.SphereGeometry args={[earthVars.radius, earthVars.segments, earthVars.segments]} />
  <T.MeshPhongMaterial
    map={textureLoader.load('/imgs/2_no_clouds_4k.jpg')}
    bumpMap={textureLoader.load('/imgs/elev_bump_4k.jpg')}
    bumpScale={0.005}
    specularMap={textureLoader.load('/imgs/water_4k.png')}
    specular={new Color('grey')}
  />
</T.Mesh>

<!-- Clouds-->
<T.Mesh rotation={[0, cloudVars.rotation, 0]}>
  <T.SphereGeometry args={[cloudVars.radius, cloudVars.segments, cloudVars.segments]} />
  <T.MeshPhongMaterial
    map={textureLoader.load('/imgs/fair_clouds_4k.png')}
    transparent
  />
</T.Mesh>

<!-- User Location Marker -->
{#if data}
  <T.Mesh position={latLongToVector3(data.userLocation.coords.lat, data.userLocation.coords.lon, true)}>
    <T.SphereGeometry args={[1, 32, 32]} />
    <T.MeshBasicMaterial color="red" />
  </T.Mesh>
{/if}
