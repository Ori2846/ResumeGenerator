// app/privacy-policy/page.js
import Link from 'next/link';
import 'tailwindcss/tailwind.css';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          Welcome to Engr Resumes! This privacy policy outlines the types of personal information that is received and collected and how it is used.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Information Collection</h2>
        <p className="mb-4">
          We collect information from you when you register on our site, place an order, subscribe to our newsletter, or fill out a form. When ordering or registering on our site, as appropriate, you may be asked to enter your: name, e-mail address, mailing address, phone number, or credit card information.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Information Usage</h2>
        <p className="mb-4">
          Any of the information we collect from you may be used in one of the following ways:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>To personalize your experience (your information helps us to better respond to your individual needs)</li>
          <li>To improve our website (we continually strive to improve our website offerings based on the information and feedback we receive from you)</li>
          <li>To improve customer service (your information helps us to more effectively respond to your customer service requests and support needs)</li>
          <li>To process transactions</li>
          <li>To administer a contest, promotion, survey, or other site feature</li>
          <li>To send periodic emails</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Information Protection</h2>
        <p className="mb-4">
          We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Cookies</h2>
        <p className="mb-4">
          Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Information Disclosure</h2>
        <p className="mb-4">
          We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">6. Third Party Links</h2>
        <p className="mb-4">
          Occasionally, at our discretion, we may include or offer third party products or services on our website. These third party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">7. Online Privacy Policy Only</h2>
        <p className="mb-4">
          This online privacy policy applies only to information collected through our website and not to information collected offline.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">8. Your Consent</h2>
        <p className="mb-4">
          By using our site, you consent to our privacy policy.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">9. Changes to our Privacy Policy</h2>
        <p className="mb-4">
          If we decide to change our privacy policy, we will post those changes on this page. This policy was last modified on June 21, 2024.
        </p>
        <Link href="/" passHref legacyBehavior>
          <a className="text-blue-500 hover:underline mt-6 inline-block">Back to Home</a>
        </Link>
      </div>
    </div>
  );
}
