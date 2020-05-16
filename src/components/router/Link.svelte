<script>
   import pages from "pages"
   import { push, component, setComponent } from "./routerStore"

   export let to

   const loadComponent = async e => {
		e.preventDefault()
      const path = e.target.getAttribute("href")
		setComponent(path)
   }
      
</script>

<a href={to} on:click={loadComponent} class="router-link">
   <slot />
</a>