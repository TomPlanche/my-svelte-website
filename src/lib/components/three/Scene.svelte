<script lang="ts">
  import { useTask } from '@threlte/core'
  import {interactivity, OrbitControls} from '@threlte/extras'
  import {PerspectiveCamera, TextureLoader, Vector3} from "three";
  import { T } from '@threlte/core'
  import {onMount} from "svelte";
  import type {TUserLocation} from "$lib/types";
  import Globe from "$lib/components/three/Globe.svelte";
  import {lonLatToVector3} from "$lib/utils";
  import {globeVars} from "$lib/globals";

  // Setup
  interactivity();

  // Variables
  // Types
  type TSphere = {
    radius: number,
    segments: number,
    rotation: number,
    speed: number,
  }

  // Refs
  let camera: PerspectiveCamera;

  const {
    radius,
    segments,
  } = globeVars;

  const earthVars: TSphere = {
    radius: radius,
    segments: segments,
    rotation: 0.2,
    speed: 0.01,
  } as TSphere;

  let userPosition: Vector3 = new Vector3(0, 0, 0);

  /**
   * User location, given by the API @ /api/where
   *
   * @type {TUserLocation}
   */
  export let data: {
    userLocation: TUserLocation
  };

  // Functions

  // Watchers
  // $: userCoords && console.log(`[Scene] User location: ${JSON.stringify(userCoords)}`);
  $: if (data) {
    const newCoords = lonLatToVector3(data.userLocation.coords.lon, data.userLocation.coords.lat, radius);

    userPosition = new Vector3(
      newCoords.x,
      newCoords.y,
      newCoords.z,
    );
  }

  $: if (camera && userPosition) {
    // point the camera to the user's location
    // make the camera closer to the earth
    camera.position.set(
      userPosition.x * 2.5,
      userPosition.y * 2.5,
      userPosition.z * 2.5
    );
    camera.lookAt([.0, .0, .0]);
  }

  $: console.log(`[Scene] User location: ${JSON.stringify(userPosition)}`);
  // Lifecycle
  onMount(() => {
    // userCoords = data.userLocation;
    // console.log(`[Scene] User location: ${JSON.stringify(userCoords)}`);
  });

  useTask((delta) => {
    earthVars.rotation += earthVars.speed * delta;
  })
</script>


<T.PerspectiveCamera
  makeDefault
  position={[8, 8, 8]}

  on:create={({ ref }) => {
    ref.lookAt(0, 0, 0);
    camera = ref;
  }}
>
  <OrbitControls />
</T.PerspectiveCamera>


<T.Group rotation={[0, earthVars.rotation, 0]}>

  <!-- User Location Marker -->
  {#if data}
    <T.Mesh
          position={[userPosition.x, userPosition.y, userPosition.z]}
    >
      <T.SphereGeometry
          args={[radius / 50, segments / 2, segments / 2]}
      />
      <T.MeshBasicMaterial color="red" />
    </T.Mesh>

<!--    <UserMarker-->
<!--      userLocation={data.userLocation}-->
<!--      radius={earthVars.radius}-->
<!--    />-->
  {/if}

  <Globe />
</T.Group>


