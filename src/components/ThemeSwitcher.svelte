<script lang="ts">
  // Runtime design-direction selector. Sets [data-theme] on <html> (which
  // re-skins every token in global.css) and remembers the choice. The initial
  // theme is applied before paint by an inline script in BaseLayout's <head>.
  const themes = [
    { id: 'civic', label: 'Letterpress Civic' },
    { id: 'gothic', label: 'Heartland Gothic' },
    { id: 'capitol', label: 'Capitol Cream' },
  ];

  let current = $state('civic');

  // Sync the highlighted button with whatever the head script applied.
  $effect(() => {
    const t = document.documentElement.dataset.theme;
    if (t) current = t;
  });

  function pick(id: string) {
    current = id;
    document.documentElement.dataset.theme = id;
    try {
      localStorage.setItem('src-theme', id);
    } catch {
      /* ignore storage failures */
    }
  }
</script>

<div role="group" aria-label="Choose a design direction" class="flex flex-wrap items-center gap-1">
  {#each themes as theme}
    <button
      type="button"
      onclick={() => pick(theme.id)}
      aria-pressed={current === theme.id}
      class={`rounded-[2px] border px-3 py-1 font-body text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brick ${
        current === theme.id
          ? 'border-navy bg-navy text-cream'
          : 'border-navy/25 text-ink/75 hover:border-navy/50 hover:text-brick'
      }`}
    >
      {theme.label}
    </button>
  {/each}
</div>
