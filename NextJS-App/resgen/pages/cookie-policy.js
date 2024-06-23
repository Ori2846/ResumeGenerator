// pages/cookie-policy.js

import Head from 'next/head';
import Link from 'next/link';

const CookiePolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Cookie Policy</title>
        <meta name="description" content="Our cookie policy page" />
      </Head>

      <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>
      <p className="mb-4">Last updated: June 22, 2024</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Introduction</h2>
      <p className="mb-4">
        Our website uses cookies and local storage to enhance your browsing experience, provide additional functionalities, and help us understand how our site is used. This policy explains what cookies and local storage are, how we use them, and your choices regarding their use.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">What are cookies and local storage?</h2>
      <p className="mb-4">
        Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. Local storage is a type of web storage that allows websites to store data on your browser. Unlike cookies, data stored in local storage is not sent to the server with every HTTP request and has no expiration time.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">How we use cookies and local storage</h2>
      <p className="mb-4">
        We use cookies and local storage for several purposes, including:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>To remember your preferences and settings</li>
        <li>To enhance the functionality of our site</li>
        <li>To collect anonymous usage data for analytical purposes</li>
        <li>To provide personalized content and advertisements</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Types of cookies we use</h2>
      <p className="mb-4">
        We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period or until you delete them). The types of cookies we use include:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Essential cookies: These cookies are necessary for the website to function properly.</li>
        <li>Performance cookies: These cookies collect information about how visitors use our site.</li>
        <li>Functional cookies: These cookies allow us to remember your preferences and settings.</li>
        <li>Advertising cookies: These cookies are used to deliver relevant advertisements to you.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Your choices</h2>
      <p className="mb-4">
        You can control and manage cookies and local storage through your browser settings. Most browsers allow you to view, delete, and block cookies and local storage. Please note that disabling cookies and local storage may affect the functionality of our site.
      </p>
      <p className="mb-4">
        Here are links to the support pages for managing cookies and local storage in some common browsers:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer">Internet Explorer</a></li>
        <li><a href="https://support.apple.com/en-us/HT201265" target="_blank" rel="noopener noreferrer">Safari</a></li>
        <li><a href="https://support.microsoft.com/en-us/help/4468242/microsoft-edge-browsing-data-and-privacy-microsoft-privacy" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Changes to this policy</h2>
      <p className="mb-4">
        We may update this cookie policy from time to time. We will notify you of any changes by posting the new policy on this page. You are advised to review this policy periodically for any changes.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Contact us</h2>
      <p className="mb-4">
        If you have any questions about this cookie policy, please contact us at:
      </p>
      <p className="mb-4">
        Email: <a href="mailto:support@example.com">support@example.com</a><br />
        Address: 123 Main Street, Anytown, USA
      </p>

      <p>
        <Link href="/">
          <span className="text-blue-500 hover:text-blue-700 cursor-pointer">Back to Home</span>
        </Link>
      </p>
    </div>
  );
};

export default CookiePolicy;
