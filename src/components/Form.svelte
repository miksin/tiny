<script lang="ts">
  let fetching = $state(false);
  let text = $state('');

  async function shorten() {
    if (!text) return;

    fetching = true;
    try {
      const response = await fetch('/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: text }),
    });
    const data = await response.json();
    console.log(data);
    fetching = false;
    } catch (error) {
      console.error(error);
    }
  }
</script>

<div class="container">
  <input placeholder="Shorten your URL" bind:value={text} />
  <button onclick={shorten} disabled={fetching}>SHORTEN</button>
</div>

<style>
  .container {
    width: min(calc(100% - 2rem), 40rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 1rem;
    padding: 2rem 1rem;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(1rem);
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
