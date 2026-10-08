import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { locationData } from "@/data/contact";
import { privacyPolicyMeta, privacyPlaceholders } from "@/data/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy | ParamShree Associates",
  description:
    "How Paramshree Associates collects, uses, shares and protects the personal data you submit through this website, written with reference to India's Digital Personal Data Protection Act, 2023.",
};

type PolicySection = {
  id: string;
  title: string;
  body: ReactNode;
};

const headingClass =
  "scroll-mt-24 font-serif text-[1.5rem] font-semibold leading-snug text-[#42182F] sm:text-[1.75rem]";
const paragraphClass = "mt-4 text-[16px] leading-[1.75] text-[#35312F]";
const listClass =
  "mt-4 list-disc space-y-2.5 pl-5 text-[16px] leading-[1.7] text-[#35312F] marker:text-[#A65F42]";
const linkClass =
  "font-medium text-[#A65F42] underline underline-offset-2 transition-colors duration-200 hover:text-[#8d5235] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/40";

const sections: PolicySection[] = [
  {
    id: "introduction",
    title: "Introduction",
    body: (
      <>
        {/* <p className={paragraphClass}>
          This Privacy Policy explains how Paramshree Associates (“ParamShree”, “we”, “us” or “our”)
          collects, uses, shares and protects the personal data you give us through this website,
          mainly through the Contact / Enquiry form.
        </p> */}
        <p className={paragraphClass}>
          The Policy is written with reference to the Digital Personal Data Protection Act, 2023
          (DPDP Act) and the Digital Personal Data Protection Rules, 2025, as they apply to our
          activities. It is meant to explain our actual practices in simple language and to support
          our compliance with these requirements. It is not a legal certification and does not
          guarantee any particular legal outcome.
        </p>
        <p className={paragraphClass}>
          Please read this Policy before you submit your personal data through the enquiry form. If
          anything is unclear, please contact us using the details in the Contact Us section.
        </p>
      </>
    ),
  },
  {
    id: "about-paramshree-associates",
    title: "About Paramshree Associates",
    body: (
      <>
        <p className={paragraphClass}>
          Paramshree Associates operates this website and is the data fiduciary for the personal data
          described in this Policy. This means we decide why and how your enquiry information is
          used.
        </p>
        <p className={paragraphClass}>
          Our business is real-estate channel partnership: we present property and project
          information, answer your questions, coordinate site visits and connect you with the right
          sales representative.
        </p>
        <p className={paragraphClass}>
          SOUL Prakriti, the project featured on this website, is a project of Soul Agro Farms Pvt.
          Ltd. (the developer). Paramshree Associates is a channel partner of Soul Agro Farms Pvt.
          Ltd. Paramshree Associates is not the owner, developer or promoter of the project. Project
          details, prices, availability and title information are confirmed by the developer’s
          authorised representatives.
        </p>
        <p className={paragraphClass}>
          Paramshree Associates designed and maintains this website. Paramshree Associates.
        </p>
        <p className={paragraphClass}>
          Where this website describes a project as being associated with or powered by another
          entity (for example, ETH Infra Pvt. Ltd.), that relationship is as stated on the relevant
          page of the website.
        </p>
      </>
    ),
  },
  {
    id: "scope",
    title: "Scope of this Privacy Policy",
    body: (
      <>
        <p className={paragraphClass}>
          This Policy applies to personal data collected through this website, including the Contact
          / Enquiry form and any other form on this website that sends your details to us.
        </p>
        <p className={paragraphClass}>
          It does not apply to websites, WhatsApp chats or other services operated by third parties
          that we link to. Those services have their own privacy policies.
        </p>
        <p className={paragraphClass}>
          Browsing this website does not require you to provide any personal data, and you can read
          all public project information without consenting to anything.
        </p>
      </>
    ),
  },
  {
    id: "personal-data-we-collect",
    title: "Personal Data We Collect",
    body: (
      <>
        <p className={paragraphClass}>We collect only the information you choose to give us through the enquiry form:</p>
        <ul className={listClass}>
          <li>Full name</li>
          <li>Mobile / phone number</li>
          <li>Email address</li>
          <li>
            Your property or project interest - the option you select in the “Interested In” field
            (for example, SOUL Prakriti Villa, SOUL Prakriti Farmhouse or General Enquiry)
          </li>
          <li>Your message or enquiry details, if you choose to write them</li>
          <li>
            How you reached the form, where applicable - for example, if you arrived through a
            specific link such as a site-visit enquiry link
          </li>
          <li>
            A record of your consent - your consent choice, the date and time you gave it, the
            version of this Policy you agreed to, and the form it was given through. We do not record
            your IP address or device details with your consent record.
          </li>
        </ul>
        <p className={paragraphClass}>
          When you visit the website, our hosting provider may automatically record standard
          technical information in server logs, such as your IP address, browser type, the pages
          requested and the time of visit. This is used for security, fault-finding and checking that
          the website is working properly.
        </p>
        <p className={paragraphClass}>
          We do not collect Aadhaar numbers, PAN, bank or financial account details, biometric data,
          precise location or any other sensitive personal data through this website.
        </p>
        <p className={paragraphClass}>
          If another form on the website (such as a call-back or site-visit request) begins sending
          your details to us, this Policy will apply to that information as well.
        </p>
      </>
    ),
  },
  {
    id: "how-we-collect",
    title: "How We Collect Personal Data",
    body: (
      <>
        <ul className={`${listClass} mt-0`}>
          <li>
            <span className="font-medium text-[#42182F]">Directly from you</span> - when you fill in
            and submit the Contact / Enquiry form, or any other form that sends details to us.
          </li>
          <li>
            <span className="font-medium text-[#42182F]">Automatically</span> - standard technical
            information in server logs when your browser loads the website, as described above.
          </li>
        </ul>
        <p className={paragraphClass}>
          We do not buy personal data from data brokers, advertising networks or social media
          platforms, and we do not collect information about you from other sources without telling
          you.
        </p>
      </>
    ),
  },
  {
    id: "purposes",
    title: "Purposes of Processing",
    body: (
      <>
        <p className={paragraphClass}>We use the personal data you submit to:</p>
        <ul className={listClass}>
          <li>Respond to your enquiry</li>
          <li>Contact you about the property or project you asked about</li>
          <li>Provide property and project information you requested</li>
          <li>Schedule a call or site visit, where you have asked for one</li>
          <li>Understand your property requirements</li>
          <li>Connect you with the appropriate sales representative</li>
          <li>
            Where necessary, share your enquiry with the relevant project / developer entity or
            authorised sales representative so that your enquiry can be answered
          </li>
          <li>Maintain enquiry and communication records</li>
          <li>Improve website functionality and enquiry handling</li>
          <li>Meet applicable legal and regulatory requirements</li>
        </ul>
        <p className={paragraphClass}>
          We use your information only for these purposes and matters directly connected with them.
          We do not use it for unrelated purposes without telling you and, where the law requires,
          asking for your consent again.
        </p>
      </>
    ),
  },
  {
    id: "legal-basis-consent",
    title: "Legal Basis / Consent",
    body: (
      <>
        <p className={paragraphClass}>
          For the personal data you submit through the enquiry form, we rely on your consent.
        </p>
        <p className={paragraphClass}>
          Before you submit the form, we show a short privacy notice and ask you to tick a consent
          box. The box is not ticked for you, and your enquiry is not submitted unless you tick it.
          Simply browsing the website, ignoring the form or leaving it unsubmitted is not consent.
        </p>
        <p className={paragraphClass}>
          When you tick the box, you confirm that you have read this Policy and consent to
          Paramshree Associates collecting and using your information for the purposes described
          above, including sharing it where necessary as described under Sharing of Personal Data.
          You also confirm that you are 18 years of age or older and are consenting for yourself.
        </p>
        <p className={paragraphClass}>
          Under the DPDP Act, certain uses of personal data are permitted without consent (for
          example, uses required by any law for the time being in force). Where we rely on such a
          use, we keep it to what the law allows and to what is necessary.
        </p>
      </>
    ),
  },
  {
    id: "enquiry-processing",
    title: "Contact and Enquiry Processing",
    body: (
      <>
        <p className={paragraphClass}>Here is what happens when you submit the enquiry form:</p>
        <ul className={listClass}>
          <li>
            Your entries are validated - including the consent box. If required consent has not been
            given, the submission is rejected and your personal data is not sent anywhere.
          </li>
          <li>
            Once accepted, the enquiry is delivered to our team through the delivery channels
            configured for this website (described under Service Providers and Data Processors).
          </li>
          <li>
            Authorised Paramshree personnel review the enquiry and respond to you by call, email or
            WhatsApp, depending on your requirement.
          </li>
          <li>
            Where needed to answer you, your enquiry is shared with the relevant sales
            representative or the project / developer entity.
          </li>
          <li>
            A consent record is stored with your enquiry, showing that consent was given, the date
            and time it was given, the version of this Policy that applied, the purpose
            (“Contact/enquiry response”) and the source (“Website Contact Form”). We do not attach
            your IP address or device information to this record.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Sharing of Personal Data",
    body: (
      <>
        <p className={paragraphClass}>Your enquiry information may be shared with:</p>
        <ul className={listClass}>
          <li>
            Paramshree Associates’ authorised representatives and personnel who handle enquiries
          </li>
          <li>Sales personnel responsible for the property or project you enquired about</li>
          <li>
            Soul Agro Farms Pvt. Ltd. (the project developer) and, where the website identifies it
            as a project entity, other project entities - only where necessary to respond to your
            enquiry
          </li>
          <li>
            Authorised service providers who support website hosting, email delivery, enquiry
            storage, messaging or other website operations, as described in the next section
          </li>
          <li>
            Government or statutory authorities, where disclosure is required by applicable law,
            court order or legal process
          </li>
        </ul>
        <p className={paragraphClass}>
          We do not sell personal data. We do not share your information with unrelated third
          parties or with “all partners”. Sharing is limited to what is needed to respond to your
          enquiry or what the law requires.
        </p>
      </>
    ),
  },
  {
    id: "service-providers",
    title: "Service Providers and Data Processors",
    body: (
      <>
        <p className={paragraphClass}>
          We use outside services to run this website. To the extent they handle your personal data,
          they do so only to provide their service to us and under their own terms and applicable
          law. The services that may be involved are:
        </p>
        <ul className={listClass}>
          <li>
            <span className="font-medium text-[#42182F]">Service Provider</span>  - website
            development and maintenance; may access the website’s code and configuration while
            supporting it.
          </li>
          <li>
            <span className="font-medium text-[#42182F]">Website hosting provider</span> - stores
            the website and its server logs on secured infrastructure.
          </li>
          <li>
            <span className="font-medium text-[#42182F]">Email delivery service (Resend)</span> -
            sends enquiry notification emails to our team, where enabled.
          </li>
          <li>
            <span className="font-medium text-[#42182F]">Google</span> - Google Sheets may be used
            to store enquiries in our own spreadsheet (where enabled), and Google Maps displays the
            project and office locations shown on this website. When a map loads, Google may process
            technical information and use cookies under its own privacy policy (
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              policies.google.com/privacy
            </a>
            ).
          </li>
          <li>
            <span className="font-medium text-[#42182F]">Meta Platforms (WhatsApp)</span> - delivers
            enquiry notifications to our team through WhatsApp Business messaging, where enabled.
          </li>
        </ul>
        <p className={paragraphClass}>
          Some of these services are used only if they have been enabled for this website. Where a
          service is not enabled, no data is sent to it. We do not authorise any service provider to
          use your information for its own purposes.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and Similar Technologies",
    body: (
      <>
        <p className={paragraphClass}>
          Cookies are small files a website stores on your device. Our position today is:
        </p>
        <ul className={listClass}>
          <li>
            <span className="font-medium text-[#42182F]">Essential cookies</span> - used only if
            strictly required for the website to function, stay secure or load efficiently (for
            example, cookies set by our hosting provider).
          </li>
          <li>
            <span className="font-medium text-[#42182F]">Analytics and marketing cookies</span> -
            not used at present. This website does not currently include Google Analytics, Meta
            Pixel or similar tracking tools.
          </li>
          <li>
            <span className="font-medium text-[#42182F]">Map display</span> - when a Google Map is
            shown, Google may set or read cookies under its own cookie and privacy policies.
          </li>
        </ul>
        <p className={paragraphClass}>
          The server logs described earlier are not cookies; they are created automatically by the
          server when the website loads.
        </p>
        <p className={paragraphClass}>
          If we add analytics or marketing cookies later, we will update this section and, where the
          law requires, ask for your consent before setting them. You can also control cookies
          through your browser settings, though blocking essential cookies may affect how the
          website works.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "Data Retention",
    body: (
      <>
        <p className={paragraphClass}>
          We keep your personal data only for as long as it is reasonably necessary for the purposes
          it was collected for, including for:
        </p>
        <ul className={listClass}>
          <li>Handling and responding to your enquiry</li>
          <li>Maintaining business and communication records</li>
          <li>Resolving disputes</li>
          <li>Meeting legal and regulatory obligations</li>
          <li>Establishing, exercising or defending legal claims, where applicable</li>
        </ul>
        <p className={paragraphClass}>
          We do not set a fixed retention period for enquiry data; it depends on the nature of the
          enquiry and our record-keeping requirements. When your personal data is no longer required
          for any of the purposes above, we delete it, anonymise it or otherwise dispose of it in
          accordance with applicable law and our retention practices.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Data Security",
    body: (
      <>
        <p className={paragraphClass}>
          We implement reasonable technical and organisational measures designed to protect personal
          data against unauthorised access, loss, misuse, alteration or disclosure, including:
        </p>
        <ul className={listClass}>
          <li>
            Transmission of form submissions over HTTPS / TLS encryption between your browser and
            this website
          </li>
          <li>
            Access to enquiry information restricted to authorised personnel who need it for their
            work, with authentication and access controls
          </li>
          <li>Secure hosting with our hosting provider, including its own safeguards and updates</li>
          <li>Encryption of data at rest where appropriate and available</li>
          <li>Secure backups where applicable</li>
          <li>Monitoring and timely application of security updates</li>
        </ul>
        <p className={paragraphClass}>
          No method of transmitting or storing data is completely secure, and we do not claim
          absolute security or any specific security certification. We take measures that are
          reasonable for a website of this kind. If we become aware of a personal data breach
          affecting you, we will take the steps required under applicable law.
        </p>
      </>
    ),
  },
  {
    id: "rights",
    title: "User / Data Principal Rights",
    body: (
      <>
        <p className={paragraphClass}>
          Under the applicable data protection framework, you (as the data principal) have the
          following rights in relation to your personal data:
        </p>
        <ul className={listClass}>
          <li>
            <span className="font-medium text-[#42182F]">Right to information</span> - ask what
            personal data we are processing about you and request a summary of that processing
          </li>
          <li>
            <span className="font-medium text-[#42182F]">Right to correction and update</span> -
            correct data that is inaccurate, incomplete or out of date
          </li>
          <li>
            <span className="font-medium text-[#42182F]">Right to erasure</span> - request deletion
            of your personal data where applicable
          </li>
          <li>
            <span className="font-medium text-[#42182F]">Right to withdraw consent</span> - at any
            time, as described in the next section
          </li>
          <li>
            <span className="font-medium text-[#42182F]">Right to grievance redressal</span> -
            raise a concern with us, as described under Grievance Redressal
          </li>
          <li>
            <span className="font-medium text-[#42182F]">Other rights</span> available to you under
            applicable law
          </li>
        </ul>
        <p className={paragraphClass}>
          To exercise a right, contact us using the details under Contact Us. We may need to verify
          your identity before acting on a request. Some requests may be limited or refused where
          applicable law permits or requires it - for example, where we must retain certain records
          to meet a legal obligation. Nothing in this Policy excludes any right available to you
          under applicable law.
        </p>
      </>
    ),
  },
  {
    id: "withdrawal",
    title: "Withdrawal of Consent",
    body: (
      <>
        <p className={paragraphClass}>
          You can withdraw your consent at any time, using a method as simple as the one you used to
          give it:
        </p>
        <ul className={listClass}>
          <li>
            Email us at the privacy / grievance address given under Grievance Redressal and Contact
            Us
          </li>
          <li>Write to us at our office address given under Contact Us</li>
          <li>Send a message through the Contact / Enquiry section of this website</li>
        </ul>
        <p className={paragraphClass}>
          Tell us which enquiry you made (for example, your name and the email address or phone
          number you used) so that we can locate your record. On receiving your request, we stop
          using your personal data for the purpose you withdrew from. Withdrawal of consent does not
          affect the lawfulness of processing carried out before the withdrawal.
        </p>
      </>
    ),
  },
  {
    id: "grievance",
    title: "Grievance Redressal",
    body: (
      <>
        <p className={paragraphClass}>
          If you have a concern about how your personal data is handled - including questions about
          collection, use, correction, deletion, withdrawal of consent or any other privacy matter -
          please contact us:
        </p>
        <div className="mt-5 rounded-xl border border-[#d7d0c2] bg-[#FCFAF6] p-5">
          <dl className="space-y-3 text-[15px] leading-relaxed text-[#35312F]">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-[#42182F]">
                Privacy / Grievance Contact
              </dt>
              <dd className="mt-1 break-words">
                {privacyPolicyMeta.grievanceEmail ? (
                  <a
                    href={`mailto:${privacyPolicyMeta.grievanceEmail}`}
                    className={`${linkClass} break-all`}
                  >
                    {privacyPolicyMeta.grievanceEmail}
                  </a>
                ) : (
                  <span className="font-medium text-[#A65F42]">
                    {privacyPlaceholders.grievanceEmail}
                  </span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-[#42182F]">
                Contact Address
              </dt>
              <dd className="mt-1">
                <span className="block">Paramshree Associates</span>
                {locationData.office.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
        <p className={paragraphClass}>
          Please mention that your concern relates to privacy or personal data. We will acknowledge
          your grievance and respond within a reasonable period, in accordance with applicable law.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children’s Data",
    body: (
      <>
        <p className={paragraphClass}>
          This website is intended for adults seeking to buy or enquire about property. It is not
          directed at children, and we do not knowingly collect personal data from children
          (persons under 18 years of age).
        </p>
        <p className={paragraphClass}>
          If you believe a child has submitted personal data through this website, please contact
          us and we will take steps to delete it, in accordance with applicable law. We do not carry
          out age verification of visitors to the website.
        </p>
      </>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-Party Websites and Links",
    body: (
      <>
        <p className={paragraphClass}>
          This website may include links to third-party services - for example, a WhatsApp chat
          link, a Google Maps link or a link to a project page. These services are operated by
          others and are governed by their own privacy policies and terms. We are not responsible
          for their practices, and we encourage you to read their policies before sharing personal
          data with them.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this Privacy Policy",
    body: (
      <>
        <p className={paragraphClass}>
          We may update this Policy from time to time. When we do, the “Last Updated” date and
          version number at the top of this page are changed, and the new version applies from its
          effective date. Where a change affects the purposes for which we use your personal data,
          we will ask for your consent again where the law requires it. We encourage you to review
          this page occasionally.
        </p>
      </>
    ),
  },
  {
    id: "applicable-law",
    title: "Applicable Law",
    body: (
      <>
        <p className={paragraphClass}>
          This Policy is governed by the laws of India and is designed with reference to the Digital
          Personal Data Protection Act, 2023, the Digital Personal Data Protection Rules, 2025 and
          other Indian law applicable to our activities as they apply to us.
        </p>
        <p className={paragraphClass}>
          This Policy explains our practices concerning personal data. It is not a certification
          that the website is legally compliant and does not guarantee any specific legal outcome,
          and it does not exclude any right available to you under applicable law.
        </p>
      </>
    ),
  },
  {
    id: "contact-us",
    title: "Contact Us",
    body: (
      <>
        <p className={paragraphClass}>
          For any question about this Policy or about how we handle your personal data, you can:
        </p>
        <ul className={listClass}>
          <li>
            Send a message through the{" "}
            <Link href="/#contact" className={linkClass}>
              Contact / Enquiry form
            </Link>{" "}
            on this website
          </li>
          <li>
            Email us at{" "}
            {privacyPolicyMeta.grievanceEmail ? (
              <a
                href={`mailto:${privacyPolicyMeta.grievanceEmail}`}
                className={`${linkClass} break-all`}
              >
                {privacyPolicyMeta.grievanceEmail}
              </a>
            ) : (
              <span className="font-medium text-[#A65F42]">
                {privacyPlaceholders.grievanceEmail}
              </span>
            )}
          </li>
          <li>
            Write to us at: Paramshree Associates, {locationData.office.addressLines.join(", ")}
          </li>
        </ul>
        <p className={paragraphClass}>
          Owner / Data Fiduciary: Paramshree Associates. This Policy was last updated on{" "}
          {privacyPolicyMeta.lastUpdated} (Version {privacyPolicyMeta.version}).
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  const missingBeforePublication: string[] = [];
  if (!privacyPolicyMeta.websiteUrl) {
    missingBeforePublication.push("website URL");
  }
  if (!privacyPolicyMeta.grievanceEmail) {
    missingBeforePublication.push("privacy / grievance email");
  }

  return (
    <section className="mx-auto w-full max-w-screen-2xl px-4 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-10 xl:px-14 2xl:px-16">
      <div className="mx-auto w-full max-w-[68ch]">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#A65F42]" />
          <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#A65F42]">
            Your Privacy
          </span>
        </div>

        <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-[#42182F] sm:text-5xl">
          {privacyPolicyMeta.title}
        </h1>

        {missingBeforePublication.length > 0 && (
          <div
            role="status"
            className="mt-6 rounded-xl border border-[#A65F42]/50 bg-[#A65F42]/10 p-4 text-sm leading-relaxed text-[#42182F]"
          >
            <span className="font-semibold">Before publication:</span> fill in the{" "}
            {missingBeforePublication.join(" and ")} in{" "}
            <code className="rounded bg-[#42182F]/10 px-1.5 py-0.5 text-xs">
              src/data/privacy.ts
            </code>{" "}
            and remove this notice. Do not publish this page while placeholder text is visible.
          </div>
        )}

        <dl className="mt-7 grid gap-x-6 gap-y-4 rounded-2xl border border-[#d7d0c2] bg-[#FCFAF6] p-5 sm:grid-cols-2 sm:p-6">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-[#42182F]">
              Effective Date
            </dt>
            <dd className="mt-1 text-[15px] text-[#35312F]">{privacyPolicyMeta.effectiveDate}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-[#42182F]">
              Last Updated
            </dt>
            <dd className="mt-1 text-[15px] text-[#35312F]">{privacyPolicyMeta.lastUpdated}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-[#42182F]">
              Version
            </dt>
            <dd className="mt-1 text-[15px] text-[#35312F]">{privacyPolicyMeta.version}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-[#42182F]">
              Website
            </dt>
            <dd className="mt-1 break-words text-[15px] text-[#35312F]">
              {privacyPolicyMeta.websiteUrl ?? (
                <span className="font-medium text-[#A65F42]">{privacyPlaceholders.websiteUrl}</span>
              )}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-[#42182F]">
              Owner / Data Fiduciary
            </dt>
            <dd className="mt-1 text-[15px] text-[#35312F]">{privacyPolicyMeta.owner}</dd>
          </div>
        </dl>

        <nav aria-label="Table of contents" className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#42182F]">
            On this page
          </h2>
          <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-[#35312F]/85 underline-offset-4 transition-colors duration-200 hover:text-[#A65F42] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F42]/40"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
              className="border-t border-[#e6e1d3] pt-8"
            >
              <h2 id={`${section.id}-heading`} className={headingClass}>
                {section.title}
              </h2>
              {section.body}
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-[#d7d0c2] bg-[#FCFAF6] p-5 sm:p-6">
          <p className="text-[15px] leading-relaxed text-[#35312F]">
            Have a question about your personal data?{" "}
            <Link href="/#contact" className={linkClass}>
              Contact us
            </Link>{" "}
            or write to Paramshree Associates at {locationData.office.addressLines.join(", ")}.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link
              href="/"
              className={`${linkClass} inline-flex items-center gap-1.5`}
              aria-label="Back to home page"
            >
              <span aria-hidden="true">←</span> Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
