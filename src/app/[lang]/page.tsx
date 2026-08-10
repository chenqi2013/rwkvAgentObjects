import { notFound } from "next/navigation";

import { AgentCatalog } from "@/components/agent-catalog";
import { readAgentProjects, type AgentProject } from "@/lib/agent-projects";
import { getDictionary } from "@/lib/dictionaries";
import {
  isLocale,
  type DataLoadError,
} from "@/lib/i18n";

type LocalizedPageProps = {
  params: Promise<{ lang: string }>;
};

function classifyLoadError(reason: unknown): DataLoadError {
  return {
    kind:
      typeof reason === "object" &&
      reason !== null &&
      "code" in reason &&
      reason.code === "ENOENT"
        ? "missing"
        : "invalid",
  };
}

export default async function Home({ params }: LocalizedPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dictionary = await getDictionary(lang);
  let projects: AgentProject[] = [];
  let projectLoadError: DataLoadError | undefined;

  try {
    projects = await readAgentProjects(lang);
  } catch (error) {
    projectLoadError = classifyLoadError(error);
  }

  return (
    <AgentCatalog
      locale={lang}
      dictionary={dictionary}
      projects={projects}
      loadError={projectLoadError}
    />
  );
}
