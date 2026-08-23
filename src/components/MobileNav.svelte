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
       context) rather than to the viewport. A fixed panel would need to know
       how much chrome sits above the header — and the preview bar's height
       changes with viewport width — so `top: 100%` is the only version that
       stays flush in every theme at every width. -->
  <div id="mobile-menu" class="mobile-menu absolute inset-x-0 top-full z-30">
    <nav class="mx-auto flex max-w-6xl flex-col px-6 py-3" aria-label="Mobile">
      {#each navItems as item}
        <a href={item.href} onclick={close} class="mobile-menu-link block py-3">
          {item.label}
        </a>
      {/each}
      <a href={cta.href} onclick={close} class="btn btn--solid btn--md mt-4 w-full">
        {cta.label}
      </a>
    </nav>
  </div>
{/if}
