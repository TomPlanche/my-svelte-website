<script lang="ts">
  // Imports
  import {gsap} from 'gsap';

  // Variables
  import {gsap} from "gsap";
  import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
  import ScrollTrigger from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrambleTextPlugin);
  gsap.registerPlugin(ScrollTrigger);

  import {style_vars} from "$lib/globals";
  import {store} from "$lib/utils/store.ts";

  // VARIABLES
  // Local
  const headerHeight = style_vars.header_height;
  const padding = style_vars.main_padding;

  const moonsArray = ["🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔"];
  const darkIndex = moonsArray.indexOf("🌑");
  const lightIndex = moonsArray.indexOf("🌕");

  // Refs
  // Html
  const container = ref(null);
  const title = ref(null);

  const time = ref(new Date().toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }));
  const currentArrayIndex = ref<number>(lightIndex);
  const changeThemeBtnHovered = ref<boolean>(false);

  let clockInterval: NodeJS.Timeout;
  let changeThemeBtnInterval: NodeJS.Timeout;

  // Functions
</script>


<style lang="scss">

</style>
