import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | Rotaract Club of Coimbatore Smartcity",
  description: "The terms that govern your use of the Rotaract Club of Coimbatore Smartcity website.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[var(--color-dhruvam-950)] overflow-x-hidden relative">
      <Navbar />
      <LegalPage title="Terms of Service" updated="16 September 2026">
        <p>
          These Terms of Service govern your use of this website, operated by the Rotaract Club of
          Coimbatore Smartcity (&quot;the Club&quot;, &quot;we&quot;, &quot;us&quot;), a Rotaract club chartered
          under Rotary International District 3206. By using this site, you agree to these terms.
        </p>

        <h2>Use of this site</h2>
        <p>
          This website is provided to share information about the Club — our leadership, activities,
          projects, and upcoming events — and to let visitors get in touch or apply for membership. You
          agree to use the site only for lawful purposes and not to attempt to disrupt it, gain unauthorized
          access to it, or misuse the Contact form (for example, by submitting spam or false information).
        </p>

        <h2>Content and intellectual property</h2>
        <p>
          Text, photos, logos, and the DHRUVAM branding on this site belong to the Club or are used with
          permission, except where a third-party mark (such as the Rotary or Rotaract emblem) belongs to
          Rotary International. You may share links to this site, but you may not reproduce or repurpose its
          content for commercial use without our written permission.
        </p>

        <h2>Membership applications and inquiries</h2>
        <p>
          Submitting an inquiry or an interest in membership through this site does not by itself grant you
          membership in the Club. Membership follows the Club&apos;s normal process, and we will contact you
          using the details you provide.
        </p>

        <h2>External links</h2>
        <p>
          This site links to external services such as WhatsApp, email, and (where listed) our social media
          profiles. We are not responsible for the content, availability, or privacy practices of those
          third-party services once you leave this site.
        </p>

        <h2>No warranty</h2>
        <p>
          This site and its content are provided &quot;as is,&quot; without warranties of any kind. While we
          try to keep information (such as event dates and leadership details) accurate and current, we do
          not guarantee it will always be error-free or up to date.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the extent permitted by law, the Club is not liable for any indirect or incidental damages
          arising from your use of this site.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of
          the courts in Coimbatore, Tamil Nadu.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the site after a change means you
          accept the updated terms.
        </p>

        <h2>Contact us</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href="mailto:rotaractsmartcity@gmail.com">rotaractsmartcity@gmail.com</a>.
        </p>
      </LegalPage>
      <Footer />
    </main>
  );
}
