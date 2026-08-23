<script lang="ts">
  import type { NewsletterCopy } from '../data/site';

  // The reply card. It is a CARD, not a section: the enclosing section owns
  // the only <h2> here, so this ships a small label and never a second title.
  let {
    eyebrow,
    blurb,
    submitLabel,
    successStamp,
    successTitle,
    successBody,
  }: NewsletterCopy = $props();

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

    // Errors say what is missing and how to fix it. They do not apologise.
    const next: { name?: string; email?: string } = {};
    if (!name.trim()) {
      next.name = 'Enter your name.';
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      next.email = 'Enter an email address we can reach you at.';
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
  <div role="status" class="nl-success">
    <span class="nl-success-stamp">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9.55 17.6 4.4 12.45l1.7-1.7 3.45 3.45 8.35-8.35 1.7 1.7z" />
      </svg>
      {successStamp}
    </span>
    <p class="nl-success-title">{successTitle}</p>
    <p class="nl-success-body">{successBody}</p>
  </div>
{:else}
  <div class="nl-coupon">
    <p class="nl-eyebrow">{eyebrow}</p>
    <p class="nl-blurb">{blurb}</p>

    <!-- the fold of the card -->
    <hr class="nl-fold" aria-hidden="true" />

    <form onsubmit={handleSubmit} novalidate>
      <div class="nl-fields">
        <div>
          <label for="nl-name" class="nl-label">Name</label>
          <input
            id="nl-name"
            type="text"
            bind:value={name}
            autocomplete="name"
            aria-invalid={attempted && errors.name ? 'true' : undefined}
            aria-describedby={attempted && errors.name ? 'nl-name-error' : undefined}
            class="nl-input"
          />
          {#if attempted && errors.name}
            <p id="nl-name-error" class="nl-error">{errors.name}</p>
          {/if}
        </div>

        <div>
          <label for="nl-email" class="nl-label">Email</label>
          <input
            id="nl-email"
            type="email"
            bind:value={email}
            autocomplete="email"
            aria-invalid={attempted && errors.email ? 'true' : undefined}
            aria-describedby={attempted && errors.email ? 'nl-email-error' : undefined}
            class="nl-input"
          />
          {#if attempted && errors.email}
            <p id="nl-email-error" class="nl-error">{errors.email}</p>
          {/if}
        </div>
      </div>

      <button type="submit" class="nl-submit">{submitLabel}</button>
    </form>
  </div>
{/if}
