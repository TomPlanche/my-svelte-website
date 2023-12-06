<script lang="ts">
    // Imports
    import {cursorStore} from "../appStore";
    import type {T_CursorOptions, T_OnEnter, T_OnLeave} from "../types";

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

        cursorStore.update((state) => {
            return {
                ...state,
                ...defaultEnterOptions,
                ...cursorOptions,
            };
        });
    }

    const defaultOnLeave: T_OnLeave = (
        cursorOptions?: T_CursorOptions
    ) => {
        cursorStore.update((state) => {
            return {
                ...state,
                ...defaultLeaveOptions,
                ...cursorOptions,
            };
        });
    }


    // Props
    export let onEnterOptions: T_CursorOptions = {
        isHover: true,
        scale: 2,
    };
    export let onLeaveOptions: T_CursorOptions = {
        isHover: false,
        scale: 1,
    };
    export let debug: boolean = false;
    export let style: string = "";

    $: style = debug ? "outline: 2px dotted red;" : "";

</script>

<div
        aria-hidden="true"
        on:mouseenter={() => defaultOnEnter(onEnterOptions)}
        on:mouseleave={() => defaultOnLeave(onLeaveOptions)}

        style={style}
>
    <slot>
        <span style="display: flex; flex-direction: row; align-content: center; align-items: center">You need to add some content to your `<pre>Hoverable</pre>` component</span>
    </slot>
</div>
