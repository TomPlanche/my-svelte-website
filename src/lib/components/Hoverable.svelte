<script lang="ts">
  // Imports
  import type {T_CursorOptions, T_OnEnter, T_OnLeave} from "../types";
  import {store} from "$lib/appStore";

  // Variables
  const defaultEnterOptions: T_CursorOptions = {
    isHover: true,
    scale: 2,
    opacity: 0.5,
  };

  const defaultLeaveOptions: T_CursorOptions = {
    isHover: false,
    scale: 1,
    opacity: 1,
    svg: undefined
  };

  // Functions
  const defaultOnEnter: T_OnEnter = (
    cursorOptions?: T_CursorOptions
  ) => {
    console.log(`defaultOnEnter with cursorOptions: ${JSON.stringify(cursorOptions)}`);

    $store.cursor.setCursorParams({
      ...defaultEnterOptions,
      ...cursorOptions,
    });
  }

  const defaultOnLeave: T_OnLeave = (
    cursorOptions?: T_CursorOptions
  ) => {
    $store.cursor.setCursorParams({
      ...defaultLeaveOptions,
      ...cursorOptions,
    });
  }


  // Props
  /**
   * Options for the cursor when the user enters the element
   *
   * @type {T_CursorOptions}
   */
  export let onEnterOptions: T_CursorOptions = {
    isHover: true,
    scale: 2,
  };

  /**
   * Options for the cursor when the user leaves the element
   *
   * @type {T_CursorOptions}
   */
  export let onLeaveOptions: T_CursorOptions = {
    isHover: false,
    scale: 1,
  };

  /**
   * Whether to show the debug outline
   *
   * @type {boolean}
   */
  export let debug: boolean = false;

  /**
   * Function to call when the user clicks on the element
   *
   * @type {function}
   */
  export let onClick: () => void = () => {
  };

  /**
   * Style to apply to the element
   *
   * @type {string}
   */
  export let style: string = "";

  // Watchers
  $: style = debug ? "outline: 2px dotted red;" : "";

</script>

<div
        aria-hidden="true"
        on:mouseenter={() => defaultOnEnter(onEnterOptions)}
        on:mouseleave={() => defaultOnLeave(onLeaveOptions)}

        on:click={onClick}

        style={style}
>
    <slot>
        <span style="display: flex; flex-direction: row; align-content: center; align-items: center">You need to add some content to your `<pre>Hoverable</pre>` component</span>
    </slot>
</div>
