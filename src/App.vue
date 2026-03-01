<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { projects, type HostedProject } from "./data/projects";

const query = ref("");
const isChecking = ref(false);
const failedProjects = ref<HostedProject[]>([]);
const showFailureModal = ref(false);

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

async function pingSite(url: string): Promise<boolean> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 8000);

  try {
    await fetch(url, {
      method: "GET",
      mode: "no-cors",
      cache: "no-store",
      signal: controller.signal,
    });
    return true;
  } catch {
    return false;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function runHealthChecks() {
  isChecking.value = true;
  failedProjects.value = [];

  for (const project of projects.filter((item) => item.status === "Live")) {
    const isAlive = await pingSite(project.url);
    if (!isAlive) {
      failedProjects.value.push(project);
    }
  }

  isChecking.value = false;
  showFailureModal.value = failedProjects.value.length > 0;
}

function closeFailureModal() {
  showFailureModal.value = false;
}

onMounted(() => {
  void runHealthChecks();
});
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

        <p class="health-check-status" aria-live="polite">
          <span v-if="isChecking">Checking live site health...</span>
          <span v-else-if="failedProjects.length === 0">
            All live sites responded during startup checks.
          </span>
          <span v-else>
            {{ failedProjects.length }} site(s) failed startup health checks.
          </span>
        </p>
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

    <div
      v-if="showFailureModal"
      class="modal-backdrop"
      role="presentation"
      @click.self="closeFailureModal"
    >
      <section
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="health-check-failure-title"
      >
        <h2 id="health-check-failure-title">Site check failed</h2>
        <p>The following sites did not respond during startup checks:</p>
        <ul class="modal-list">
          <li v-for="project in failedProjects" :key="`failed-${project.url}`">
            <a :href="project.url" target="_blank" rel="noreferrer">
              {{ project.name }}
            </a>
          </li>
        </ul>
        <button class="modal-close" type="button" @click="closeFailureModal">
          Close
        </button>
      </section>
    </div>
  </div>
</template>
