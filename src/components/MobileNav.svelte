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
  class="inline-flex h-10 w-10 items-center justify-center rounded-[2px] border border-navy/30 text-navy transition-colors hover:bg-navy hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brick"
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
  <div
    id="mobile-menu"
    class="fixed inset-x-0 top-16 z-30 border-b border-navy/15 bg-cream shadow-lg"
  >
    <nav class="mx-auto flex max-w-6xl flex-col px-6 py-3" aria-label="Mobile">
      {#each navItems as item}
        <a
          href={item.href}
          onclick={close}
          class="border-b border-navy/10 py-3 font-body text-base font-semibold text-ink transition-colors hover:text-brick"
        >
          {item.label}
        </a>
      {/each}
      <a
        href={cta.href}
        onclick={close}
        class="mt-4 inline-flex items-center justify-center rounded-[2px] bg-navy px-6 py-3 font-body text-sm font-semibold uppercase tracking-[0.08em] text-cream transition-colors hover:bg-navy-deep"
      >
        {cta.label}
      </a>
    </nav>
  </div>
{/if}
