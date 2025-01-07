<script lang="ts">
  let fetching = $state(false);
  let text = $state('');
  let errorMsg = $state('');
  let result = $state('');

  async function shorten() {
    try {
      const url = new URL(text);
      fetching = true;
      try {
        const response = await fetch('/shorten', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: url.href }),
        });
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json() as { slug: string };
        const { slug } = data;
        result = `${window.location.origin}/${slug}`;
        fetching = false;
        errorMsg = '';
      } catch (error) {
        fetching = false;
        errorMsg = 'An error occurred. Please try again later.';
      }
    } catch (e) {
      errorMsg = 'Invalid URL.';
    }
  }
</script>

<div class="container">
  <div class="box">
    <input placeholder="Shorten your URL" bind:value={text} />
    <button onclick={shorten} disabled={fetching}>SHORTEN</button>
    {#if errorMsg}
      <p class="err">{errorMsg}</p>
    {/if}
  </div>

  {#if result}
    <div class="box">
      <p>Your shortened URL:</p>
      <input value={result} disabled />
    </div>
  {/if}
</div>

<style>
  .container {
    width: min(calc(100% - 2rem), 40rem);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 1rem;
    padding: 2rem 1rem;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(1rem);
  }

  .err {
    color: #ff0000;
  }

  input {
    outline: none;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 0.25rem;
    font-size: 1.25rem;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid #FFFFFF;
    width: 100%;
  }

  input:focus {
    border: 1px solid #52a0ff;
  }

  button {
    outline: none;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 0.25rem;
    font-size: 1.25rem;
    background: #3c82d8;
    color: #FFFFFF;
    cursor: pointer;
    width: 100%;
  }

  button:disabled {
    background: #b3b3b3;
    cursor: not-allowed;
  }

  button:not(:disabled):hover {
    background: #2f6abf;
  }
</style>
