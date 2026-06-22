<script lang="ts">
  let name = $state('');
  let email = $state('');
  let errors = $state<{ name?: string; email?: string }>({});
  let attempted = $state(false);
  let submitted = $state(false);

  // NOTE: GitHub Pages is static (no server). To actually collect signups, POST this
  // form to a hosted provider (Mailchimp, Buttondown, Formspree, etc.) — set the
  // provider endpoint and submit to it here.
  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    attempted = true;

    const next: { name?: string; email?: string } = {};
    if (!name.trim()) {
      next.name = 'Please enter your name.';
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      next.email = 'Please enter a valid email address.';
    }
    errors = next;

    if (Object.keys(next).length === 0) {
      submitted = true;
      name = '';
      email = '';
    }
  }
</script>

{#if submitted}
  <div
    role="status"
    class="mx-auto max-w-xl rounded-[2px] border border-navy/20 bg-cream-deep p-6 text-center"
  >
    <p class="font-display text-xl font-semibold text-navy">Thank you for joining!</p>
    <p class="mt-2 font-body text-sm text-ink/75">
      Watch your inbox — we will be in touch soon.
    </p>
  </div>
{:else}
  <form class="mx-auto max-w-xl" onsubmit={handleSubmit} novalidate>
    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label
          for="nl-name"
          class="mb-1.5 block font-body text-xs font-semibold uppercase tracking-[0.12em] text-ink/70"
        >
          Name
        </label>
        <input
          id="nl-name"
          type="text"
          bind:value={name}
          autocomplete="name"
          aria-invalid={attempted && errors.name ? 'true' : undefined}
          aria-describedby={attempted && errors.name ? 'nl-name-error' : undefined}
          class="w-full rounded-[2px] border border-navy/30 bg-cream px-4 py-3 font-body text-ink outline-none transition-colors focus:border-navy"
        />
        {#if attempted && errors.name}
          <p id="nl-name-error" class="mt-1 font-body text-xs text-brick-strong">{errors.name}</p>
        {/if}
      </div>

      <div>
        <label
          for="nl-email"
          class="mb-1.5 block font-body text-xs font-semibold uppercase tracking-[0.12em] text-ink/70"
        >
          Email
        </label>
        <input
          id="nl-email"
          type="email"
          bind:value={email}
          autocomplete="email"
          aria-invalid={attempted && errors.email ? 'true' : undefined}
          aria-describedby={attempted && errors.email ? 'nl-email-error' : undefined}
          class="w-full rounded-[2px] border border-navy/30 bg-cream px-4 py-3 font-body text-ink outline-none transition-colors focus:border-navy"
        />
        {#if attempted && errors.email}
          <p id="nl-email-error" class="mt-1 font-body text-xs text-brick-strong">{errors.email}</p>
        {/if}
      </div>
    </div>

    <button
      type="submit"
      class="mt-4 inline-flex w-full items-center justify-center rounded-[2px] bg-navy px-6 py-3 font-body text-sm font-semibold uppercase tracking-[0.08em] text-cream transition-colors hover:bg-navy-deep sm:w-auto"
    >
      Sign Me Up
    </button>
  </form>
{/if}
