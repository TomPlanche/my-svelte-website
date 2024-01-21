<script lang="ts">
  import { useTask } from '@threlte/core'
  import {interactivity, OrbitControls} from '@threlte/extras'
  import {Color, PerspectiveCamera, TextureLoader, Vector3} from "three";
  import {AsciiEffect} from "three/examples/jsm/effects/AsciiEffect";
  import { T } from '@threlte/core'
  import {onMount} from "svelte";
  import type {TUserLocation} from "../../../routes/api/where/+server";
  import Globe from "$lib/components/three/Globe.svelte";

  // Setup
  interactivity();
  const textureLoader = new TextureLoader();

  // Variables
  // Types
  type TSphere = {
    radius: number,
    segments: number,
    rotation: number,
    speed: number,
  }

  // Refs
  // let camera: PerspectiveCamera;

  const earthVars: TSphere = {
    radius: 3,
    segments: 64,
    rotation: 0.2,
    speed: 0.0,
  } as TSphere;

  const cloudVars: TSphere = {
    radius: 3.01,
    segments: 64,
    rotation: 7,
    speed: 0.06,
  } as TSphere;

  let userPosition: Vector3 = new Vector3(0, 0, 0);

  export let data: {
    userLocation: TUserLocation
  };

  // const effect = new AsciiEffect(
  //   camera,
  //   ' .:-+*=%@#',
  //   { invert: true }
  // );

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
  ): Vector3 => {
    if (debug) {
      console.log(`[Scene] latLongToVector3: ${lat}, ${long}`);
    }

    const phi = (lat * Math.PI) / 180;
    const theta = ((long - 180) * Math.PI) / 180;

    const x = -(earthVars.radius * Math.cos(phi) * Math.cos(theta));
    const y = earthVars.radius * Math.sin(phi);
    const z = earthVars.radius * Math.cos(phi) * Math.sin(theta);

    if (debug) {
      console.log(`[Scene] latLongToVector3: ${x}, ${y}, ${z}`);
    }

    return new Vector3(x, y, z);
  }

  // Watchers
  // $: userCoords && console.log(`[Scene] User location: ${JSON.stringify(userCoords)}`);
  $: if (data) {
    userPosition = latLongToVector3(data.userLocation.coords.lat, data.userLocation.coords.lon);
  }

  // $: if (camera && userPosition) {
  //   // point the camera to the user's location
  //   // make the camera closer to the earth
  //   camera.position.set(
  //     userPosition.x * 1.5,
  //     userPosition.y * 1.5,
  //     userPosition.z * 1.5
  //   );
  //   camera.lookAt(userPosition);
  // }

  $: console.log(`[Scene] User location: ${JSON.stringify(userPosition)}`);
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
  position={[8, 8, 8]}

  on:create={({ ref }) => {
    ref.lookAt(0, 1, 0);
  }}
>
  <OrbitControls />
</T.PerspectiveCamera>

<T.DirectionalLight
  position={[0, 10, 10]}
  castShadow
/>
<T.AmbientLight intensity={0.5} />

<!--&lt;!&ndash; Earth &ndash;&gt;-->
<!--<T.Group rotation={[0, earthVars.rotation, 0]}>-->
<!--  <T.Mesh>-->
<!--    <T.SphereGeometry args={[earthVars.radius, earthVars.segments, earthVars.segments]} />-->
<!--    <T.MeshPhongMaterial-->
<!--      map={textureLoader.load('/imgs/2_no_clouds_4k.jpg')}-->
<!--      bumpMap={textureLoader.load('/imgs/elev_bump_4k.jpg')}-->
<!--      bumpScale={0.005}-->
<!--      specularMap={textureLoader.load('/imgs/water_4k.png')}-->
<!--      specular={new Color('grey')}-->
<!--    />-->
<!--  </T.Mesh>-->

<!--  &lt;!&ndash; User Location Marker &ndash;&gt;-->
<!--  {#if data}-->
<!--    <T.Mesh-->
<!--          position={[-->
<!--            latLongToVector3(data.userLocation.coords.lat, data.userLocation.coords.lon).x,-->
<!--            latLongToVector3(data.userLocation.coords.lat, data.userLocation.coords.lon).y,-->
<!--            latLongToVector3(data.userLocation.coords.lat, data.userLocation.coords.lon).z,-->
<!--          ]}-->
<!--    >-->
<!--      <T.SphereGeometry-->
<!--          args={[.01, 32, 32]}-->
<!--      />-->
<!--      <T.MeshBasicMaterial color="red" />-->
<!--    </T.Mesh>-->
<!--  {/if}-->
<!--</T.Group>-->

<!--&lt;!&ndash; Clouds&ndash;&gt;-->
<!--<T.Mesh rotation={[0, cloudVars.rotation, 0]}>-->
<!--  <T.SphereGeometry args={[cloudVars.radius, cloudVars.segments, cloudVars.segments]} />-->
<!--  <T.MeshPhongMaterial-->
<!--    map={textureLoader.load('/imgs/fair_clouds_4k.png')}-->
<!--    transparent-->
<!--  />-->
<!--</T.Mesh>-->

<Globe />
