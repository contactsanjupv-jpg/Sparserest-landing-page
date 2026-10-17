import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — SparseReST",
  description:
    "Learn about SparseReST and the technology we build for modern businesses.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f5f3ef] text-[#111111]">
      <div className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-8 sm:py-16">

        <header className="mb-20">
          <Link href="/" className="mb-20 inline-flex -translate-x-12">
            <img
              src="/logo.png"
              alt="SparseReST logo"
              className="logo-image"
            />
          </Link>

          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.16em] text-[#77736d]">
              About SparseReST
            </p>

            <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl">
              Building technology
              <br />
              for what comes next.
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-[#68645e] sm:text-xl">
              SparseReST is a technology company that builds software and
              intelligent digital systems for modern businesses.
            </p>
          </div>
        </header>

        <section className="border-t border-black/10 pt-12">
          <div className="grid gap-10 sm:grid-cols-[0.7fr_1.3fr]">

            <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#77736d]">
              Who we are
            </p>

            <div>
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">
                We build technology that makes business simpler.
              </h2>

              <p className="mt-6 text-[15px] leading-8 text-[#5f5b55]">
                SparseReST creates software and digital systems designed around
                real business needs.
              </p>

              <p className="mt-5 text-[15px] leading-8 text-[#5f5b55]">
                We combine engineering design automation data and intelligent
                technology to create useful systems that help businesses work
                better.
              </p>
            </div>

          </div>
        </section>

        <section className="mt-24 border-t border-black/10 pt-12">
          <div className="grid gap-10 sm:grid-cols-[0.7fr_1.3fr]">

            <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#77736d]">
              What we build
            </p>

            <div className="space-y-4">

              <div className="rounded-3xl border border-black/10 bg-white/50 p-7">
                <p className="text-xl font-semibold tracking-[-0.02em]">
                  Software
                </p>

                <p className="mt-3 text-[15px] leading-7 text-[#68645e]">
                  Purpose built software designed to solve real business
                  problems.
                </p>
              </div>

              <div className="rounded-3xl border border-black/10 bg-white/50 p-7">
                <p className="text-xl font-semibold tracking-[-0.02em]">
                  Intelligent systems
                </p>

                <p className="mt-3 text-[15px] leading-7 text-[#68645e]">
                  Intelligent technology that helps businesses handle complex
                  work and make better use of their information.
                </p>
              </div>

              <div className="rounded-3xl border border-black/10 bg-white/50 p-7">
                <p className="text-xl font-semibold tracking-[-0.02em]">
                  Automation
                </p>

                <p className="mt-3 text-[15px] leading-7 text-[#68645e]">
                  Systems that reduce repetitive work and connect important
                  business processes.
                </p>
              </div>

              <div className="rounded-3xl border border-black/10 bg-white/50 p-7">
                <p className="text-xl font-semibold tracking-[-0.02em]">
                  Digital experiences
                </p>

                <p className="mt-3 text-[15px] leading-7 text-[#68645e]">
                  Modern digital experiences built for customers teams and
                  businesses.
                </p>
              </div>

            </div>
          </div>
        </section>

        <section className="mt-24 border-t border-black/10 pt-12">
          <div className="grid gap-10 sm:grid-cols-[0.7fr_1.3fr]">

            <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#77736d]">
              Our approach
            </p>

            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                Simple ideas. Serious engineering.
              </h2>

              <div className="mt-10 space-y-8">

                <div>
                  <p className="text-lg font-semibold">
                    01 Start with the problem
                  </p>

                  <p className="mt-2 text-[15px] leading-7 text-[#68645e]">
                    We begin by understanding the problem before deciding what
                    technology should be used.
                  </p>
                </div>

                <div>
                  <p className="text-lg font-semibold">
                    02 Build with purpose
                  </p>

                  <p className="mt-2 text-[15px] leading-7 text-[#68645e]">
                    Every system we build should have a clear purpose and create
                    meaningful value for the people using it.
                  </p>
                </div>

                <div>
                  <p className="text-lg font-semibold">
                    03 Keep things simple
                  </p>

                  <p className="mt-2 text-[15px] leading-7 text-[#68645e]">
                    Complex technology should create simple experiences and
                    clearer workflows.
                  </p>
                </div>

                <div>
                  <p className="text-lg font-semibold">
                    04 Think long term
                  </p>

                  <p className="mt-2 text-[15px] leading-7 text-[#68645e]">
                    We build systems that can grow and evolve with the
                    businesses that use them.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        <section className="mt-24 rounded-[2rem] bg-[#111111] px-7 py-12 text-white sm:px-12 sm:py-16">

          <p className="text-sm font-medium uppercase tracking-[0.14em] text-white/50">
            Our direction
          </p>

          <h2 className="mt-6 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
            Technology should become an advantage for the business using it.
          </h2>

          <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/60">
            SparseReST is focused on creating products and systems that help
            modern businesses become more capable more connected and easier to
            operate.
          </p>

        </section>

        <section className="mt-24 border-t border-black/10 pt-12">

          <div className="grid gap-8 sm:grid-cols-[0.7fr_1.3fr]">

            <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#77736d]">
              Get in touch
            </p>

            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                Have something worth building?
              </h2>

              <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#68645e]">
                Tell us what you are working on what is not working or what you
                want to build next.
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