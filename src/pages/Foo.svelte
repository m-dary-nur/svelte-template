<script type="module">
   import { fly } from "svelte/transition"
</script>

<div in:fly="{{ x: 500, delay: 350 }}" out:fly="{{ x: -500 }}">Iam Foo Component</div>
