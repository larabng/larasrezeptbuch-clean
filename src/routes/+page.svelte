<script lang="ts">
	import { onMount } from "svelte";

	let recipes: any[] = [];
	let selectedRecipe: any = null;
	let showForm = false;

	let newRecipe = {
		title: "",
		description: "",
		ingredients: "",
		instructions: "",
		category: "",
	};

	onMount(async () => {
		const res = await fetch("/api/recipes");
		recipes = await res.json();
	});

	async function saveRecipe() {
		await fetch("/api/recipes", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				...newRecipe,
				ingredients: newRecipe.ingredients
					.split(",")
					.map((i) => i.trim()),
			}),
		});
		const res = await fetch("/api/recipes");
		recipes = await res.json();
		showForm = false;
	}

	function getImageFor(title: string): string {
		if (title.includes("Carbonara")) return "/images/carbonara.png";
		if (title.includes("Gemüsesuppe")) return "/images/gemuesesuppe.png";
		if (title.includes("Schokoladenkuchen"))
			return "/images/schokokuchen.png";
		return "/images/default.jpg";
	}
</script>

<div class="container mt-5">
	<h1 class="mb-4 text-primary">🍽️ Rezept Übersicht</h1>

	<button
		class="btn btn-outline-success mb-3"
		on:click={() => (showForm = !showForm)}
	>
		{showForm ? "Formular ausblenden" : "➕ Neues Rezept erfassen"}
	</button>

	{#if showForm}
		<form class="mb-4" on:submit|preventDefault={saveRecipe}>
			<div class="mb-2">
				<input
					class="form-control"
					bind:value={newRecipe.title}
					placeholder="Titel"
					required
				/>
			</div>
			<div class="mb-2">
				<input
					class="form-control"
					bind:value={newRecipe.description}
					placeholder="Beschreibung"
				/>
			</div>
			<div class="mb-2">
				<input
					class="form-control"
					bind:value={newRecipe.ingredients}
					placeholder="Zutaten (komma-getrennt)"
				/>
			</div>
			<div class="mb-2">
				<textarea
					class="form-control"
					bind:value={newRecipe.instructions}
					placeholder="Anleitung"
				></textarea>
			</div>
			<div class="mb-2">
				<input
					class="form-control"
					bind:value={newRecipe.category}
					placeholder="Kategorie"
				/>
			</div>
			<button type="submit" class="btn btn-primary">💾 Speichern</button>
		</form>
	{/if}

	<ul class="list-group mb-4">
		{#each recipes as recipe}
			<li
				class="list-group-item d-flex justify-content-between align-items-center"
			>
				<span>{recipe.title}</span>
				<button
					class="btn btn-sm btn-outline-info"
					on:click={() => (selectedRecipe = recipe)}>Anzeigen</button
				>
			</li>
		{/each}
	</ul>

	{#if selectedRecipe}
		<div class="card border-info recipe-detail">
			<div
				class="card-header bg-info text-white d-flex align-items-center"
			>
				<h2 class="mb-0 flex-grow-1">{selectedRecipe.title}</h2>
				<img
					src={getImageFor(selectedRecipe.title)}
					alt="Rezeptbild"
					class="recipe-image"
				/>
			</div>
			<div class="card-body">
				<p>
					<strong>Beschreibung:</strong>
					{selectedRecipe.description}
				</p>
				<p><strong>Kategorie:</strong> {selectedRecipe.category}</p>
				<h4>Zutaten:</h4>
				<ul>
					{#each selectedRecipe.ingredients as ing}
						<li>{ing}</li>
					{/each}
				</ul>
				<p>
					<strong>Anleitung:</strong><br
					/>{selectedRecipe.instructions}
				</p>
			</div>
		</div>
	{/if}
</div>

<style>
	.recipe-detail {
		background-color: #40c4ff;
		border-radius: 8px;
		padding: 1rem;
		margin-top: 1rem;
		color: #000;
	}

	.recipe-image {
		width: 120px;
		height: auto;
		border-radius: 6px;
		margin-left: 1rem;
		object-fit: cover;
	}
</style>
