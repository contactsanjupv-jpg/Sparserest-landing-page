import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — SparseReST",
  description:
    "Terms governing access to and use of the SparseReST website.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f5f3ef] text-[#111111]">
      <div className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-8 sm:py-16">
        {/* Header */}
        <header className="mb-16">
          <Link href="/" className="mb-12 inline-flex">
            <img
              src="/logo.png"
              alt="SparseReST logo"
              className="logo-image -my-3 -ml-6"
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
              These Terms explain the conditions that apply when you visit and
              use the SparseReST website. Please read them before using the site.
            </p>

            <p className="mt-5 text-sm text-[#8a867f]">
              Last updated: November 3, 2026
            </p>
          </div>
        </header>

        {/* Content */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              1. About These Terms
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              SparseReST maintains this website to provide information about
              the company, its work and its areas of focus. These Terms apply
              to your access to and use of this website.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Individual SparseReST products and services may be governed by
              separate terms. If you use one of those products or services,
              the terms presented for that offering apply to that use. These
              website Terms do not replace or expand those separate agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              2. Accepting These Terms
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              By accessing or using this website, you agree to these Terms.
              If you do not agree, do not use the website.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              We may update these Terms from time to time. Your use of the
              website after an updated version is published means that the
              updated Terms will apply to your continued use, to the extent
              permitted by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              3. Using the Website
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              You may use this website for lawful purposes and in accordance
              with these Terms. You are responsible for making sure that your
              use of the website complies with the laws that apply to you.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              You must not misuse the website, interfere with its operation,
              attempt to gain access to systems or information that are not
              made available to you, or use the website in a way that could
              damage it or impair access for others.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              4. Access to the Website
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              The SparseReST website is informational. It does not provide
              user registration, account management or payment functionality.
              You do not need an account to browse the website.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              We may change, suspend or remove any part of the website, or
              restrict access to it, where reasonably necessary for
              maintenance, security, legal compliance or the operation of
              the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              5. Intellectual Property
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              The website and its contents, including text, graphics, visual
              materials, design, logos and other content, are owned by
              SparseReST or used with permission. They are protected by
              applicable intellectual property laws.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              You may view the website and share links to its publicly
              available pages for personal or legitimate business reference.
              You must not reproduce, modify, distribute or commercially
              exploit website content without our prior written permission,
              except where applicable law permits that use.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              These Terms do not transfer ownership of any SparseReST
              intellectual property to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              6. Information You Send Us
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              If you contact SparseReST, you are responsible for the
              information and materials you choose to send. You should only
              provide information that you are entitled to share.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Sending us a message does not transfer ownership of your
              materials to SparseReST. You allow us to use the information
              you provide only as reasonably necessary to read, respond to
              and handle your communication, subject to our Privacy Policy
              and applicable law.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Do not send confidential, sensitive or restricted information
              unless we have agreed in writing to receive it under appropriate
              terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              7. Links to Other Websites
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              This website may contain links to websites or resources that
              SparseReST does not operate. Those links are provided for
              convenience or additional information.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              We do not control and are not responsible for the content,
              availability, security or practices of external websites.
              Your use of them is subject to their own terms and policies.
              A link does not mean that SparseReST endorses the linked
              organisation or its content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              8. No Purchases or Subscriptions Through This Website
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              This website does not offer checkout, payment or subscription
              functionality. Any commercial engagement, purchase or use of
              an individual SparseReST product or service is subject to the
              separate terms, order documents or agreements presented for
              that offering.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Nothing on this website, by itself, creates an obligation for
              SparseReST to provide a product, service, quotation or other
              commercial offering.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              9. Website Availability
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              We work to keep the website available and functioning properly.
              We do not promise that it will always be available,
              uninterrupted, error-free or compatible with every device or
              browser.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Access may be interrupted or limited for maintenance, updates,
              security reasons, technical problems or circumstances beyond
              our reasonable control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              10. Prohibited Use
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              You must not use the website to:
            </p>

            <ul className="mt-4 list-disc space-y-3 pl-6 text-[15px] leading-7 text-[#5f5b55]">
              <li>Violate any applicable law or regulation.</li>
              <li>Attempt to gain unauthorised access to the website or its systems.</li>
              <li>Disrupt, damage or interfere with the website or its infrastructure.</li>
              <li>Introduce malicious code or other harmful material.</li>
              <li>Collect information about others without a lawful basis.</li>
              <li>Infringe the rights of SparseReST or another person.</li>
              <li>
                Use automated means to access or copy website content in a
                manner that violates applicable law or these Terms.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              11. Website Information and Disclaimer
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              The information on this website is provided for general
              information. We take care in preparing and maintaining it, but
              we do not guarantee that every statement is complete, current
              or free from error.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Website content is not professional, technical, financial or
              legal advice, and should not be treated as a substitute for
              advice based on your particular circumstances. You are
              responsible for evaluating the information before relying on it.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              To the extent permitted by applicable law, the website is
              provided on an “as is” and “as available” basis, without
              warranties that are not expressly stated in these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              12. Limitation of Liability
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              To the extent permitted by applicable law, SparseReST will not
              be liable for indirect, incidental, special or consequential
              loss arising out of or related to your use of, or inability to
              use, this website.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Nothing in these Terms excludes or limits liability that cannot
              lawfully be excluded or limited, or affects rights that cannot
              be waived under applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              13. Restricting Access
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              We may restrict or block access to the website if we reasonably
              believe that it is being used in breach of these Terms, in a
              way that creates a security risk, or in a way that could harm
              the website or other visitors.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Where appropriate, we may take steps to address the issue
              before restricting access. We may act without prior notice
              where immediate action is reasonably necessary to protect the
              website, its users or our systems.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              14. Changes to These Terms
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              We may revise these Terms to reflect changes to the website,
              our practices or applicable law.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              When we make a change, we will publish the revised Terms on
              this page and update the date above. The revised Terms apply
              from the date they are published, subject to applicable law.
              We encourage you to review this page from time to time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              15. Governing Law
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              These Terms are interpreted under the laws that apply to the
              relationship between you and SparseReST. Any dispute will be
              dealt with by a court or other authority with jurisdiction
              under applicable law. Nothing in this section limits
              protections or rights that the law does not allow us to exclude.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              16. Contact Us
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              If you have a question about these Terms or the use of this
              website, contact us at:
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
