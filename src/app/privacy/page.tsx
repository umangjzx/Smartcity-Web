import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Rotaract Club of Coimbatore Smartcity",
  description: "How the Rotaract Club of Coimbatore Smartcity collects, uses, and protects information submitted through this website.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--color-dhruvam-950)] overflow-x-hidden relative">
      <Navbar />
      <LegalPage title="Privacy Policy" updated="16 September 2026">
        <p>
          This Privacy Policy explains what information the Rotaract Club of Coimbatore Smartcity
          (&quot;the Club&quot;, &quot;we&quot;, &quot;us&quot;) collects through this website, how it is used,
          and the choices you have. We keep this simple because the site itself is simple: it is an
          informational site about the Club and its activities, with one form where you can reach out to us.
        </p>

        <h2>Information we collect</h2>
        <p>
          The only personal information this website collects is what you choose to submit through the
          <strong> Contact form</strong>: your first and last name, email address, subject, and message. We do
          not require you to create an account, and we do not ask for passwords, payment details, or any
          government ID.
        </p>
        <p>
          We do not use cookies, analytics scripts, or third-party advertising trackers on the public site.
          Visiting this site as a general visitor sets no cookies on your browser at all. A session cookie is
          used only for Club administrators to sign in to the content-management area of the site, and is
          never set for ordinary visitors.
        </p>

        <h2>How we use your information</h2>
        <p>
          Information submitted through the Contact form is used solely to read and respond to your message.
          We do not sell, rent, or share this information with third parties, and we do not use it for
          marketing without your explicit consent.
        </p>

        <h2>How long we keep it</h2>
        <p>
          Contact form submissions are retained so Club officers can follow up on inquiries. You can ask us
          to delete your submission at any time by emailing us at the address below.
        </p>

        <h2>Hosting and third-party services</h2>
        <p>
          This website is hosted on Vercel and stores data in MongoDB Atlas. Like most web infrastructure,
          these providers may log standard technical information (such as IP address and request timestamps)
          as part of normal server operation and security monitoring — this is not something the Club
          separately collects or analyzes.
        </p>

        <h2>Children&apos;s privacy</h2>
        <p>
          Rotaract membership is open to young adults aged 18–30. This site is not directed at children, and
          we do not knowingly collect information from anyone under 18.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If this policy changes, the updated version will be posted on this page with a new &quot;last
          updated&quot; date above.
        </p>

        <h2>Contact us</h2>
        <p>
          Questions about this policy, or requests to access or delete your information, can be sent to{" "}
          <a href="mailto:rotaractsmartcity@gmail.com">rotaractsmartcity@gmail.com</a>.
        </p>
      </LegalPage>
      <Footer />
      <BackToTop />
    </main>
  );
}
