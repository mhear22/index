<script setup lang="ts">
import { computed, ref } from "vue";
import { projects, type HostedProject } from "./data/projects";

interface StackTech {
  key: string;
  label: string;
  iconSrc?: string;
}

interface TechIconConfig {
  label: string;
  iconSlug: string;
}

const iconBaseUrl = "https://cdn.simpleicons.org";

const techIconMap: Record<string, TechIconConfig> = {
  vue: { label: "Vue", iconSlug: "vuedotjs" },
  vuejs: { label: "Vue", iconSlug: "vuedotjs" },
  next: { label: "Next.js", iconSlug: "nextdotjs" },
  nextjs: { label: "Next.js", iconSlug: "nextdotjs" },
  vercel: { label: "Vercel", iconSlug: "vercel" },
  typescript: { label: "TypeScript", iconSlug: "typescript" },
  ts: { label: "TypeScript", iconSlug: "typescript" },
  docker: { label: "Docker", iconSlug: "docker" },
};

function normalizeTech(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function parseStack(stack: string): StackTech[] {
  return stack
    .split("+")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part, index) => {
      const normalized = normalizeTech(part);
      const icon = techIconMap[normalized];

      if (!icon) {
        return {
          key: `${normalized || "unknown"}-${index}`,
          label: part,
        };
      }

      return {
        key: `${normalized}-${index}`,
        label: icon.label,
        iconSrc: `${iconBaseUrl}/${icon.iconSlug}`,
      };
    });
}

const query = ref("");

const filteredProjects = computed(() => {
  const value = query.value.trim().toLowerCase();
  if (!value) return projects;

  return projects.filter((project) => {
    const searchable = [
      project.name,
      project.url,
      project.description,
      project.stack,
      ...project.tags,
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(value);
  });
});
</script>

<template>
  <div class="page">
    <main class="shell">
      <header class="topbar">
        <h1>Hosted Sites</h1>
        <label class="search">
          <span>Search sites or products</span>
          <input
            v-model="query"
            type="search"
            placeholder="Try: vue, vercel, planner..."
            aria-label="Search projects"
          />
        </label>
      </header>

      <section class="grid" aria-live="polite">
        <article v-for="project in filteredProjects" :key="project.url" class="site-tile">
          <div class="site-top">
            <h2>{{ project.name }}</h2>
            <a class="visit" :href="project.url" target="_blank" rel="noreferrer">
              Open site
            </a>
          </div>
          <p class="site-url">{{ project.url }}</p>
          <ul class="stack-list" aria-label="Products used">
            <li
              v-for="tech in parseStack(project.stack)"
              :key="`${project.url}-${tech.key}`"
              class="stack-item"
            >
              <img
                v-if="tech.iconSrc"
                class="stack-icon"
                :src="tech.iconSrc"
                :alt="`${tech.label} logo`"
                loading="lazy"
                decoding="async"
              />
              <span class="stack-label">{{ tech.label }}</span>
            </li>
          </ul>
        </article>
      </section>

      <p v-if="filteredProjects.length === 0" class="empty">
        No matches. Try a different search term.
      </p>
    </main>
  </div>
</template>
