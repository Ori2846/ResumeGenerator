import Link from 'next/link';
import 'tailwindcss/tailwind.css';

export default function AccessibilityPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Accessibility Policy</h1>
        <p className="mb-4">
          At Engr Resumes, we are committed to ensuring that our website is accessible to people with disabilities. We strive to adhere to the accepted guidelines and standards for accessibility and usability.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Commitment to Accessibility</h2>
        <p className="mb-4">
          We are continuously improving the user experience for everyone and applying the relevant accessibility standards to make our website accessible to people with disabilities.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Accessibility Standards</h2>
        <p className="mb-4">
          Our website aims to conform to the World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These guidelines explain how to make web content more accessible for people with disabilities.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Measures to Support Accessibility</h2>
        <p className="mb-4">
          We take the following measures to ensure accessibility:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Include accessibility throughout our internal policies.</li>
          <li>Integrate accessibility into our procurement practices.</li>
          <li>Provide continual accessibility training for our staff.</li>
          <li>Employ formal accessibility quality assurance methods.</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Feedback</h2>
        <p className="mb-4">
          We welcome your feedback on the accessibility of Engr Resumes. If you encounter any accessibility barriers on our website, please let us know by contacting the developer:
        </p>
        <p className="mb-4">
          Email: <a href="mailto:hdo2846@gmail.com" className="text-blue-500 hover:underline">hdo2846@gmail.com</a>
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Limitations and Alternatives</h2>
        <p className="mb-4">
          Despite our best efforts to ensure accessibility of Engr Resumes, there may be some limitations. Please get in touch with us if you observe any issues and we will do our best to address them.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">6. Accessibility of Third-Party Content</h2>
        <p className="mb-4">
          Engr Resumes may include third-party content or links to third-party websites. We are not responsible for the accessibility of third-party content or websites, but we will work with partners to ensure that they provide accessible content and services.
        </p>
        <Link href="/" passHref legacyBehavior>
          <a className="text-blue-500 hover:underline mt-6 inline-block">Back to Home</a>
        </Link>
      </div>
    </div>
  );
}
