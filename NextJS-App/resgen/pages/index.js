"use client";
import { useRouter } from 'next/router';
import Image from 'next/image';
import 'tailwindcss/tailwind.css';
import Footer from '/components/Footer';


export default function Home() {
  const router = useRouter();

  const handleNewSession = () => {
    localStorage.removeItem('savedFormData');
    router.push('/generator');
  };

  const handleContinueSession = () => {
    router.push('/generator');
  };

  const handleImportJson = (event) => {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], 'UTF-8');
    fileReader.onload = (e) => {
      const json = JSON.parse(e.target.result);
      localStorage.setItem('savedFormData', JSON.stringify(json));
      router.push('/generator');
    };
  };

  return (
    <div className="app-container flex flex-col min-h-screen">
      <header className="bg-gray-900 text-white p-6 text-center">
        <h1 className="text-4xl font-bold">Engr Resumes</h1>
      </header>

      <main className="main-content flex flex-1 p-6 bg-gray-50 flex-col items-center">
        <div className="buttons-container flex flex-col justify-center items-center space-y-6 mb-8">
          <button
            className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg text-lg"
            onClick={handleNewSession}
          >
            New Session
          </button>
          <button
            className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg text-lg"
            onClick={handleContinueSession}
          >
            Continue Session
          </button>
          <label className="btn bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg shadow-lg text-lg cursor-pointer">
            Import JSON
            <input
              type="file"
              className="hidden"
              accept=".json"
              onChange={handleImportJson}
            />
          </label>
        </div>

        <div className="example-container w-full flex justify-center">
          <Image src="/images/template1.png" alt="Template 1" width={600} height={800} className="rounded-lg shadow-lg" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
