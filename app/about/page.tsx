import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About SparseReST",
  description:
    "SparseReST is an industrial technology company focused on advancing how industry evaluates and makes technical change.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f5f3ef] text-[#111111]">
      <div className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-8 sm:py-16">

        <header className="mb-20">
          <Link href="/" className="mb-20 inline-flex">
            <img
              src="/logo.png"
              alt="SparseReST logo"
              className="logo-image -my-3 -ml-6"
            />
          </Link>

          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.16em] text-[#77736d]">
              About SparseReST
            </p>

            <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl">
              Industry is changing.
              <br />
              The way we build for it should too.
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-[#68645e] sm:text-xl">
              SparseReST is an industrial technology company. We are building
              for a future in which critical decisions about materials,
              manufacturing, and technology can be made with greater clarity
              and confidence.
            </p>
          </div>
        </header>

        <section className="border-t border-black/10 pt-12">
          <div className="grid gap-10 sm:grid-cols-[0.7fr_1.3fr]">

            <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#77736d]">
              Why we exist
            </p>

            <div>
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">
                Progress depends on better decisions.
              </h2>

              <p className="mt-6 text-[15px] leading-8 text-[#5f5b55]">
                Industry is built on decisions that carry real consequences.
                A change in a material, a process, or a source can affect
                performance, reliability, cost, and the people who depend on
                the result.
              </p>

              <p className="mt-5 text-[15px] leading-8 text-[#5f5b55]">
                Yet the knowledge needed to make those decisions is often
                difficult to bring together. We believe technology can make
                that knowledge more accessible, more useful, and easier to
                act on.
              </p>
            </div>

          </div>
        </section>

        <section className="mt-24 border-t border-black/10 pt-12">
          <div className="grid gap-10 sm:grid-cols-[0.7fr_1.3fr]">

            <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#77736d]">
              Our focus
            </p>

            <div>
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">
                Making technical change easier to understand.
              </h2>

              <p className="mt-6 text-[15px] leading-8 text-[#5f5b55]">
                We are focused on the difficult decisions behind industrial
                change: understanding requirements, evaluating alternatives,
                interpreting evidence, and knowing what still needs to be
                tested.
              </p>

              <p className="mt-5 text-[15px] leading-8 text-[#5f5b55]">
                This is a long-standing challenge across industry. Our view is
                that better engineering and better use of data can make the
                process more rigorous, transparent, and informed.
              </p>
            </div>

          </div>
        </section>

        <section className="mt-24 border-t border-black/10 pt-12">
          <div className="grid gap-10 sm:grid-cols-[0.7fr_1.3fr]">

            <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#77736d]">
              How we think
            </p>

            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                The work matters more than the noise around it.
              </h2>

              <div className="mt-10 space-y-8">

                <div>
                  <p className="text-lg font-semibold">
                    01 Start with reality
                  </p>

                  <p className="mt-2 text-[15px] leading-7 text-[#68645e]">
                    We begin with the conditions, constraints, and evidence
                    that exist in the real world. Technology has to answer to
                    them.
                  </p>
                </div>

                <div>
                  <p className="text-lg font-semibold">
                    02 Be precise about what is known
                  </p>

                  <p className="mt-2 text-[15px] leading-7 text-[#68645e]">
                    Good decisions depend on understanding both the evidence
                    and its limits. Uncertainty should be visible, not hidden.
                  </p>
                </div>

                <div>
                  <p className="text-lg font-semibold">
                    03 Build for consequential work
                  </p>

                  <p className="mt-2 text-[15px] leading-7 text-[#68645e]">
                    We care about problems where reliability, traceability,
                    and sound engineering judgment matter.
                  </p>
                </div>

                <div>
                  <p className="text-lg font-semibold">
                    04 Think beyond the immediate
                  </p>

                  <p className="mt-2 text-[15px] leading-7 text-[#68645e]">
                    We are building a company for the long term. That means
                    taking the time to understand difficult problems and
                    creating foundations that can support meaningful progress.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        <section className="mt-24 rounded-[2rem] bg-[#111111] px-7 py-12 text-white sm:px-12 sm:py-16">

          <p className="text-sm font-medium uppercase tracking-[0.14em] text-white/50">
            Our ambition
          </p>

          <h2 className="mt-6 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
            Build a company that moves industry forward.
          </h2>

          <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/60">
            We intend to build SparseReST into a global industrial technology
            company. The scale of that ambition demands patience, sound
            engineering, and a willingness to take on problems that are not
            easily solved.
          </p>

        </section>

        <section className="mt-24 border-t border-black/10 pt-12">

          <div className="grid gap-8 sm:grid-cols-[0.7fr_1.3fr]">

            <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#77736d]">
              Contact
            </p>

            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                SparseReST
              </h2>

              <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#68645e]">
                For company enquiries and correspondence, contact us at the
                address below.
              </p>

              <a
                href="mailto:contact@sparserest.com"
                style={{ color: "#ffffff" }}
                className="mt-7 inline-flex items-center justify-center rounded-full bg-[#111111] px-6 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
              >
                contact@sparserest.com
              </a>
            </div>

          </div>

        </section>

        <footer className="mt-24 border-t border-black/10 pt-8">

          <div className="flex flex-col gap-5 text-sm text-[#77736d] sm:flex-row sm:items-center sm:justify-between">

            <p>
              © {new Date().getFullYear()} SparseReST. All rights reserved.
            </p>

            <div className="flex items-center gap-6">

              <Link
                href="/"
                className="transition-colors hover:text-[#111111]"
              >
                Home
              </Link>

              <a
                href="/about"
                className="text-[#111111]"
              >
                About
              </a>

              <a
                href="/privacy"
                className="transition-colors hover:text-[#111111]"
              >
                Privacy
              </a>

              <a
                href="/terms"
                className="transition-colors hover:text-[#111111]"
              >
                Terms
              </a>

            </div>

          </div>

        </footer>

      </div>
    </main>
  );
}
