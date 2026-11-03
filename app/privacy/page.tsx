import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — SparseReST",
  description:
    "How SparseReST handles information when you visit our website or contact us.",
};

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#68645e] sm:text-lg">
              SparseReST takes your privacy seriously. This Policy explains what
              information we receive when you visit our website or contact us,
              how we use it, and the choices you have.
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
              1. About This Policy
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              SparseReST's website provides information about our work and how to
              get in touch with us. This Policy applies to information handled
              when you visit the website or contact SparseReST, including by
              email.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Our products and services have their own privacy notices. Those notices
              explain how information is handled when you use a product or
              service. This Policy applies only to the SparseReST website and
              messages sent to the company.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              2. Information We Receive
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              You do not need to create an account or sign in to use this website. The
              website does not provide account management or payment features.
              We mainly receive personal information when you choose to contact us.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Depending on the nature of the communication, this may include:
            </p>

            <ul className="mt-4 list-disc space-y-3 pl-6 text-[15px] leading-7 text-[#5f5b55]">
              <li>
                <strong className="font-medium text-[#37342f]">Contact details:</strong>{" "}
                your name, email address and any other contact details you
                choose to include.
              </li>
              <li>
                <strong className="font-medium text-[#37342f]">Professional context:</strong>{" "}
                your organisation, role or the business context of your inquiry,
                if you provide it.
              </li>
              <li>
                <strong className="font-medium text-[#37342f]">Correspondence:</strong>{" "}
                the contents of messages and any information or materials you
                choose to send to us.
              </li>
            </ul>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              When you visit the website, the systems that deliver it may also process
              basic technical information. This can include your IP address,
              browser and device details, the page requested, the time of the
              request and technical logs. This information helps the website
              load, function and remain secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              3. How We Use Information
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              We use information from website visits and messages to run the website
              and respond to people who contact us. This includes:
            </p>

            <ul className="mt-4 list-disc space-y-3 pl-6 text-[15px] leading-7 text-[#5f5b55]">
              <li>Responding to messages, questions and business inquiries.</li>
              <li>Communicating with individuals and organisations.</li>
              <li>Assessing and following up on requests or proposals.</li>
              <li>Operating, maintaining and securing the website.</li>
              <li>Diagnosing errors and maintaining website performance.</li>
              <li>Meeting legal obligations and protecting legitimate interests.</li>
            </ul>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              We do not use information collected here to run accounts or provide
              features inside our products. If we need to use information for a
              different purpose, we will explain that where required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              4. Cookies and Website Measurement
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              We do not use this website to build advertising profiles about visitors.
              The website's hosting and security systems may still use
              technical processes needed to deliver pages and protect the site.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              If we add tools that measure how people use the website, we will update
              this Policy to explain what those tools collect and why.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              You can control cookies through your browser settings. Blocking some
              website technologies may affect how the site works.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              5. Website Hosting
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Our website is hosted by a third-party infrastructure provider. When
              you open a page, that provider may process technical information
              such as your IP address, browser details, the page requested and
              server logs. This is part of delivering and protecting the website.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              We may also use service providers to support website operations or
              communications. They should only handle information needed to
              provide those services and must protect it appropriately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              6. When We Share Information
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              We do not sell personal information collected through this website.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Information may be disclosed when reasonably necessary:
            </p>

            <ul className="mt-4 list-disc space-y-3 pl-6 text-[15px] leading-7 text-[#5f5b55]">
              <li>
                With service providers that help us run the website or handle communications.
              </li>
              <li>
                To comply with applicable law, a valid legal process or a
                lawful request from a competent authority.
              </li>
              <li>
                To establish, exercise or defend legal rights, or to protect
                the security, integrity and lawful operation of the website
                and the company.
              </li>
              <li>
                In connection with a proposed or completed business
                reorganisation, transaction or transfer, where permitted by
                applicable law and subject to appropriate protections.
              </li>
            </ul>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              We do not disclose personal information for purposes
              incompatible with the context in which it was collected, except
              where permitted or required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              7. Keeping Information Safe
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              We take reasonable steps to protect personal information against
              unauthorised access, loss, misuse or disclosure. The safeguards
              we use are intended to reflect the kind of information involved
              and the risks to it.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              No method of sending or storing information online is completely secure.
              We work to protect information, but cannot promise that security
              can never be compromised.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              8. How Long We Keep Information
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              We keep personal information only for as long as needed to respond to
              you, maintain necessary business records, resolve disputes or
              meet legal requirements.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Retention periods may differ depending on the nature of the
              information, the context of the communication and applicable
              obligations. Technical logs held by our hosting provider may be
              subject to that provider's own retention practices and terms.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              When we no longer need information, we take reasonable steps to delete
              it or dispose of it, unless we are required to keep it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              9. Your Choices and Rights
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Privacy laws may give you the right to ask what personal information we
              hold about you, correct it, request its deletion, or withdraw
              consent where we rely on consent. The rights available to you
              depend on the law that applies.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              To make a request, email us using the address below. Please explain what
              you are asking for. We may need to confirm your identity before
              responding.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              10. Children
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Our website is intended for a general audience and is not designed for
              children. We do not knowingly collect children's personal
              information where doing so is not permitted by law.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              If you believe a child has sent us personal information, please contact
              us so we can review and address it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              11. Processing in Other Countries
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              The services used to operate the website may process technical
              information in countries other than the one you are visiting
              from.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              Where privacy laws place conditions on this processing, we will follow
              those requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              12. Changes to This Policy
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              We may update this Policy when the website, our practices or applicable
              laws change.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              We will publish the updated version on this page and change the date
              above.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-[-0.02em]">
              13. Contact Us
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-[#5f5b55]">
              If you have a question about this Policy or how we handle your personal
              information, contact us:
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
                className="text-[#111111] transition-colors"
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
