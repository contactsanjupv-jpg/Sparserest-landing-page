import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — SparseReST",
  description:
    "Terms of Service for SparseReST, a technology company building software, automation, and digital systems.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f5f3ef] text-[#111111]">
      <div className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-8 sm:py-16">
        {/* Header */}
        <header className="mb-16">
          <Link
            href="/"
            className="mb-12 inline-flex -translate-x-12"
          >
            <img
              src="/logo.png"
              alt="SparseReST logo"
              className="logo-image"
            />
          </Link>

          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.16em] text-[#77736d]">
              Legal
            </p>

            <h1 className="text-5xl font-semibold tracking-[-0.045em] sm:text-6xl">
              Terms of Service
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#68645e] sm:text-lg">
              These Terms of Service govern your access to and use of
              SparseReST websites, software products, and services.
            </p>

            <p className="mt-5 text-sm text-[#8a867f]">
              Last updated: September 16, 2026
            </p>
          </div>
        </header>

        {/* Content */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              1. About SparseReST
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              SparseReST is a technology company that develops software,
              automation systems, AI-powered technologies, data solutions, and
              digital experiences for businesses.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              These Terms of Service apply to your use of SparseReST websites,
              applications, software products, and related services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              2. Acceptance of These Terms
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              By accessing or using a SparseReST website or service, you agree
              to be bound by these Terms of Service and any applicable
              additional terms presented to you in connection with a specific
              service.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              If you do not agree with these terms, you should not access or use
              the applicable service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              3. Use of Our Services
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              You agree to use SparseReST services only for lawful purposes and
              in accordance with these Terms.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              You must not use our services to violate applicable laws,
              regulations, contractual obligations, or the rights of other
              people or organizations.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              You are responsible for activity conducted through accounts or
              credentials under your control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              4. Accounts and Access
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Certain SparseReST services may require you to create an account.
              You are responsible for providing accurate information and
              maintaining the confidentiality of your account credentials.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              You should notify us promptly if you believe your account has
              been accessed without authorization or if your credentials have
              been compromised.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              5. Intellectual Property
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Unless otherwise stated, SparseReST and its licensors retain all
              rights, title, and interest in the websites, software, designs,
              branding, content, technology, and other materials provided by
              SparseReST.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              These Terms do not transfer ownership of SparseReST intellectual
              property to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              6. Customer Content
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Where a SparseReST service allows you to submit, upload, or
              otherwise provide content or data, you retain your rights in that
              content.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              You grant SparseReST the permissions reasonably necessary to
              host, process, transmit, display, and otherwise use that content
              solely to provide and operate the applicable service.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              You are responsible for ensuring that you have the necessary
              rights and permissions to provide such content to SparseReST.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              7. Third-Party Services
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              SparseReST services may integrate with or depend on third-party
              services, platforms, APIs, hosting providers, payment providers,
              communication providers, analytics services, or other external
              systems.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Your use of third-party services may be subject to their own
              terms and privacy policies. SparseReST is not responsible for
              third-party services outside our reasonable control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              8. Payments and Subscriptions
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Certain SparseReST products or services may require payment or a
              recurring subscription. Pricing, billing intervals, renewal
              terms, and applicable cancellation conditions will be presented
              when you purchase or subscribe to the applicable service.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Payments may be processed through third-party payment providers.
              Additional terms from the applicable payment provider may apply.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              9. Service Availability
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              We work to keep our services available and reliable, but we do
              not guarantee that a service will always be uninterrupted,
              error-free, secure, or available at every moment.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Services may occasionally be unavailable because of maintenance,
              upgrades, technical issues, third-party dependencies, or
              circumstances outside our reasonable control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              10. Prohibited Activities
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              You may not use SparseReST services to:
            </p>

            <ul className="mt-4 list-disc space-y-3 pl-6 text-[15px] leading-7 text-[#5f5b55]">
              <li>Break or circumvent applicable laws or regulations.</li>
              <li>Attempt to gain unauthorized access to our systems.</li>
              <li>Interfere with or disrupt our services.</li>
              <li>Introduce malicious code, malware, or harmful content.</li>
              <li>Abuse, harass, or unlawfully harm another person.</li>
              <li>Infringe intellectual property or privacy rights.</li>
              <li>
                Attempt to access accounts, data, or systems without
                authorization.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              11. Disclaimer
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              To the extent permitted by applicable law, SparseReST services
              are provided on an “as is” and “as available” basis without
              warranties that are not expressly stated in these Terms.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              SparseReST does not guarantee that information, outputs, or
              results obtained through a service will always be accurate,
              complete, reliable, or suitable for every particular purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              12. Limitation of Liability
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              To the maximum extent permitted by applicable law, SparseReST
              will not be liable for indirect, incidental, special,
              consequential, exemplary, or punitive damages arising from or
              related to your use of our services.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Nothing in these Terms limits liability where such limitation is
              prohibited by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              13. Suspension or Termination
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              SparseReST may suspend or terminate access to a service where
              reasonably necessary to protect the service, its users, our
              systems, or where you materially violate these Terms.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              You may stop using a service at any time, subject to any
              applicable subscription or contractual obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              14. Changes to These Terms
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              We may update these Terms from time to time to reflect changes in
              our services, business practices, or applicable legal
              requirements.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Updated Terms will be posted on this page with a revised “Last
              updated” date. Your continued use of the applicable service after
              an update may constitute acceptance of the revised Terms where
              permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              15. Governing Law
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              These Terms are subject to applicable law. Any governing-law and
              jurisdiction provisions applicable to a specific SparseReST
              product or agreement will take precedence where expressly
              provided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              16. Contact Us
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              If you have questions about these Terms of Service, please
              contact SparseReST.
            </p>

            <div className="mt-6 rounded-3xl border border-black/10 bg-white/60 p-6">
              <p className="text-sm font-medium text-[#111111]">
                SparseReST
              </p>

              <a
                href="mailto:contact@sparserest.com"
                className="mt-2 inline-block text-sm text-[#68645e] transition-colors hover:text-[#111111]"
              >
                contact@sparserest.com
              </a>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-black/10 pt-8">
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
                href="/privacy"
                className="transition-colors hover:text-[#111111]"
              >
                Privacy
              </a>

              <a
                href="/terms"
                className="text-[#111111] transition-colors"
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