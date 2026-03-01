<script setup lang="ts">
import { computed, ref } from "vue";
import { projects } from "./data/projects";

const query = ref("");

const filteredProjects = computed(() => {
  const value = query.value.trim().toLowerCase();
  if (!value) return projects;

  return projects.filter((project) => {
    const searchable = [
      project.name,
      project.description,
      project.stack,
      project.status,
      ...project.tags,
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(value);
  });
});

const liveCount = computed(
  () => projects.filter((project) => project.status === "Live").length
);
</script>

<template>
  <div class="page">
    <div class="background-blur bg-one"></div>
    <div class="background-blur bg-two"></div>

    <main class="shell">
      <header class="hero">
        <p class="eyebrow">Your project directory</p>
        <h1>Everything you build, in one place.</h1>
        <p class="subtitle">
          A clean index of your hosted sites. Update
          <code>src/data/projects.ts</code> whenever you launch something new.
        </p>

        <div class="stats-row">
          <div class="stat">
            <span class="stat-label">Total sites</span>
            <strong>{{ projects.length }}</strong>
          </div>
          <div class="stat">
            <span class="stat-label">Live now</span>
            <strong>{{ liveCount }}</strong>
          </div>
        </div>

        <label class="search">
          <span>Search by name, tag, stack, or status</span>
          <input
            v-model="query"
            type="search"
            placeholder="Try: live, vue, portfolio..."
            aria-label="Search projects"
          />
        </label>
      </header>

      <section class="grid" aria-live="polite">
        <article v-for="project in filteredProjects" :key="project.url" class="card">
          <div class="card-top">
            <h2>{{ project.name }}</h2>
            <span class="status">{{ project.status }}</span>
          </div>
          <p class="description">{{ project.description }}</p>
          <p class="stack">{{ project.stack }}</p>
          <ul class="tags">
            <li v-for="tag in project.tags" :key="`${project.name}-${tag}`">
              #{{ tag }}
            </li>
          </ul>
          <a class="visit" :href="project.url" target="_blank" rel="noreferrer">
            Visit site
          </a>
        </article>
      </section>

      <p v-if="filteredProjects.length === 0" class="empty">
        No matches. Try a different search term.
      </p>
    </main>
  </div>
</template>
