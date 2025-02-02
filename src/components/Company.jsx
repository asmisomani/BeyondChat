import { useState } from "react";
import Confetti from "react-confetti";
import { faker } from "@faker-js/faker";
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import 'react-chatbot-kit/build/main.css'
import Authentication from './Authentication';
import { useAuth } from './AuthContext';
import Chatbot from "react-chatbot-kit";
import config from "./ChatBot/config";
import MessageParser from "./ChatBot/MessageParser";
import ActionProvider from "./ChatBot/ActionProvider";

const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
  ]

export default function Company() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyUrl: "",
    description: "",
  });

  const [isChatOpen, setIsChatOpen] = useState(false); // Chatbot visibility toggle
  const [isConfettiVisible, setIsConfettiVisible] = useState(false); // Confetti visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const {isAuthOpen, toggleAuth} = useAuth();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    // Show confetti for 5 seconds
    setIsConfettiVisible(true);
    setTimeout(() => {
      setIsConfettiVisible(false);
    }, 5000);

    alert("Company details saved!");
  };

  const handleCancel = () => {
    setFormData({ companyName: "", companyUrl: "", description: "" });
  };

  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <h2 className='text-indigo-600 rounded-full p-2 bg-white'>BeyondChat</h2>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button onClick={toggleAuth} className="text-sm/6 font-semibold text-gray-900 rounded-full bg-indigo-600 p-2 text-white" >
              Log in <span aria-hidden="true">&rarr;</span>
            </button>
            {isAuthOpen && <Authentication/>}
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden overflow-y-auto">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6 rounded-md bg-indigo-600">
                  <a
                    href=""
                    className="-mx-3 block rounded-md  px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>



    <div className="flex flex-col lg:flex-row md:flex-row position-absolute w-full">
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-6 row-expand">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Site</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="mt-1 text-sm block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              />
            </div>

            {/* Company URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company URL
              </label>
              <input
                type="url"
                name="companyUrl"
                value={formData.companyUrl}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-sm text-sm p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-100"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="text-sm mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 border-b pb-4 border-gray-300">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={()=>setIsConfettiVisible(true)}
                className="px-4 py-2 text-white bg-indigo-600 rounded-md text-sm hover:bg-indigo-500"
              >
                Save
              </button>
              {isConfettiVisible && <Confetti/>}
            </div>
            <div id="status">
              <div className="px-1 py-6 sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Status</dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                    <li className="flex items-center justify-between py-4 pr-5 pl-4 text-sm/6">
                      <div className="flex w-0 flex-1 items-center">
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">{faker.internet.url()}</span>
                        </div>
                      </div>
                      <div className="ml-4 shrink-0">
                        <p className="font-medium text-green-600">Scraped</p>
                      </div>
                    </li>
                    <li className="flex items-center justify-between py-4 pr-5 pl-4 text-sm/6">
                      <div className="flex w-0 flex-1 items-center">
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">{faker.internet.url()}</span>
                        </div>
                      </div>
                      <div className="ml-4 shrink-0">
                        <p className="font-medium text-green-600">Scraped</p>
                      </div>
                    </li>
                    <li className="flex items-center justify-between py-4 pr-5 pl-4 text-sm/6">
                      <div className="flex w-0 flex-1 items-center">
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">{faker.internet.url()}</span>
                        </div>
                      </div>
                      <div className="ml-4 shrink-0">
                        <p className="font-medium text-red-600">Pending</p>
                      </div>
                    </li>
                    <li className="flex items-center justify-between py-4 pr-5 pl-4 text-sm/6">
                      <div className="flex w-0 flex-1 items-center">
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">{faker.internet.url()}</span>
                        </div>
                      </div>
                      <div className="ml-4 shrink-0">
                        <p className="font-medium text-yellow-600">Detected</p>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Chatbot Toggle Button (Visible on all screen sizes) */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="flex items-center justify-center p-3 bg-indigo-600 text-white rounded-full shadow-lg"
        >
          🤖
        </button>
      </div>

      {/* Chatbot Dialog */}
      <div
        className={`fixed bottom-[89px] right-[50px]  bg-white border-t-2 border-gray-200 shadow-xl z-50 transition-all duration-500 ease-in-out transform ${
          isChatOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
        style={{
          transitionProperty: "transform, opacity",
          transform: isChatOpen ? "translateY(0)" : "translateY(100%)",
          opacity: isChatOpen ? 1 : 0,
        }}
      >
        <Chatbot config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}/>
      </div>

    </div>
    </div>
  );
}
