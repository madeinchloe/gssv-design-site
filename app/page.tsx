import { ProjectGrid } from "./components/project-grid";
import { LocalBusinessJsonLd } from "./components/local-business-jsonld";

export default function Home() {
  return (
    <>
      <LocalBusinessJsonLd />
      <h1 className="sr-only">
        GSSV Design, Sophie Vu : architecture d&apos;intérieur et design global à Toulouse
      </h1>
      <section className="page">
        <ProjectGrid />
      </section>
    </>
  );
}
