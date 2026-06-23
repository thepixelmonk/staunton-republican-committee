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
  <div role="status" class="nl-success">
    <span class="nl-success-stamp">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9.55 17.6 4.4 12.45l1.7-1.7 3.45 3.45 8.35-8.35 1.7 1.7z" />
      </svg>
      Mailed
    </span>
    <p class="nl-success-title">You're on the list!</p>
    <p class="nl-success-body font-body text-sm">
      Watch your inbox — committee news is on its way.
    </p>
  </div>
{:else}
  <div class="nl-coupon">
    <!-- scissors riding the top cut-line -->
    <span class="nl-scissors" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="6" cy="6" r="2.6" />
        <circle cx="6" cy="18" r="2.6" />
        <line x1="20" y1="4" x2="8.1" y2="11.2" />
        <line x1="14.5" y1="14.7" x2="20" y2="20" />
        <line x1="8.1" y1="12.8" x2="11" y2="11" />
      </svg>
    </span>
    <span class="nl-cuttag" aria-hidden="true">Clip &amp; Mail</span>

    <!-- postal stamp corner -->
    <span class="nl-stamp" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1.5 14.47 8.6 21.99 8.76 15.99 13.3 18.17 20.49 12 16.2 5.83 20.49 8.01 13.3 2.01 8.76 9.53 8.6Z" />
      </svg>
      <span class="nl-stamp-label">VOTE</span>
    </span>

    <p class="nl-eyebrow">Sign &amp; Send</p>
    <p class="nl-title">Mail-In Membership Card</p>
    <p class="nl-blurb mt-2 font-body text-sm leading-relaxed">
      Fill in your details below to get committee news, event invitations, and ways to help —
      straight to your inbox.
    </p>

    <hr class="nl-fold" aria-hidden="true" />

    <form onsubmit={handleSubmit} novalidate>
      <div class="grid gap-4 sm:grid-cols-2">
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

      <button type="submit" class="nl-submit mt-5 w-full sm:w-auto"> Mail It In </button>
    </form>
  </div>
{/if}
