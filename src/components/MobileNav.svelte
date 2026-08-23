<script lang="ts">
  interface NavItem {
    label: string;
    href: string;
  }

  let {
    navItems = [],
    cta,
  }: { navItems: NavItem[]; cta: NavItem } = $props();

  let open = $state(false);
  let btn: HTMLButtonElement | undefined;

  function close() {
    open = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && open) {
      open = false;
      btn?.focus();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<button
  bind:this={btn}
  type="button"
  class="inline-flex h-10 w-10 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2"
  aria-label={open ? 'Close menu' : 'Open menu'}
  aria-expanded={open}
  aria-controls="mobile-menu"
  onclick={() => (open = !open)}
>
  {#if open}
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  {/if}
</button>

{#if open}
  <!-- Anchored to the header (which is position:sticky, so it is a positioning
       context) rather than to the viewport, so the panel stays flush under the
       masthead at every width without having to know how much chrome sits
       above it. The panel ships no ground of its own — system.css owns it. -->
  <div id="mobile-menu" class="mobile-menu absolute inset-x-0 top-full z-30">
    <nav class="mobile-menu-inner" aria-label="Mobile">
      {#each navItems as item}
        <a href={item.href} onclick={close} class="mobile-menu-link">
          {item.label}
        </a>
      {/each}
      <a href={cta.href} onclick={close} class="btn btn--solid btn--md mobile-menu-cta">
        {cta.label}
      </a>
    </nav>
  </div>
{/if}
