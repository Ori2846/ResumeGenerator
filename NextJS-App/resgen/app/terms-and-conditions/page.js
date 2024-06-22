// pages/terms-and-conditions.js
"use client"
import Link from 'next/link';
import 'tailwindcss/tailwind.css';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        <p className="mb-4">
          Welcome to Engr Resumes! These terms and conditions outline the rules and regulations for the use of our website.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Introduction</h2>
        <p className="mb-4">
          By accessing this website, we assume you accept these terms and conditions. Do not continue to use Engr Resumes if you do not agree to all of the terms and conditions stated on this page.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Cookies</h2>
        <p className="mb-4">
          We employ the use of cookies. By accessing Engr Resumes, you agreed to use cookies in agreement with the Engr Resumes's Privacy Policy.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">3. License</h2>
        <p className="mb-4">
          Unless otherwise stated, Engr Resumes and/or its licensors own the intellectual property rights for all material on Engr Resumes. All intellectual property rights are reserved. You may access this from Engr Resumes for your own personal use subjected to restrictions set in these terms and conditions.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">4. User Comments</h2>
        <p className="mb-4">
          Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Engr Resumes does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Engr Resumes,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Content Liability</h2>
        <p className="mb-4">
          We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">6. Your Privacy</h2>
        <p className="mb-4">
          Please read Privacy Policy
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">7. Reservation of Rights</h2>
        <p className="mb-4">
          We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">8. Removal of links from our website</h2>
        <p className="mb-4">
          If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
        </p>
        <p className="mb-4">
          We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
        </p>
        <Link href="/" className="text-blue-500 hover:underline mt-6 inline-block">Back to Home</Link>
      </div>
    </div>
  );
}
