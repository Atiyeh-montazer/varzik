import React, { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Import remark-gfm

function Trainning({ plans }) {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Function to open modal with selected plan
    const openModal = (plan) => {
        setSelectedPlan(plan);
        setShowModal(true);
    };

    // Function to close modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedPlan(null);
    };

    // Function to hide part of the email
    const hideEmail = (email) => {
        const [localPart, domain] = email.split('@');
        const hiddenLocal = localPart.slice(0, 2) + '***';
        return `${hiddenLocal}@${domain}`;
    };

    return (
        <div className="rtl"> {/* Set the whole container to RTL */}
            <div className='grid grid-cols-2 gap-4'>
                {plans && plans.length > 0 ? (
                    plans.map((plan) => (
                        <div
                            key={plan.plan_id}
                            className="w-36 px-4 mt-5 ml-3 text-right border bg-pink-200 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                            onClick={() => openModal(plan)}
                        >
                            <h5 className="mb-2 text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                                برنامه : {plan.plan_id}
                            </h5>
                            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 text-sm">
                                تاریخ شروع: {new Date(plan.reg_at).toLocaleDateString('fa-IR')}
                            </p>
                            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 text-sm">
                                نام مربی: {hideEmail(plan.coach_email)}
                            </p>
                            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 text-sm">
                                وضعیت پیشرفت: {plan.progress ? plan.progress : 'در دسترس نیست'}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-right">هیچ برنامه‌ای موجود نیست.</p>
                )}
            </div>

            {/* Modal for displaying plan details */}
            {showModal && selectedPlan && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white w-80 p-4 rounded-lg shadow-lg relative max-h-96 overflow-y-auto text-right">
                        <h2 className="text-xl font-bold mb-4">جزئیات برنامه</h2>
                        <h3 className="text-md mb-2 font-semibold">حرکات برنامه:</h3>
                        <div className="max-h-48 overflow-y-auto pr-2"> {/* Scrollable list container */}
                            <ReactMarkdown
                                className="markdown-content text-right"
                                remarkPlugins={[remarkGfm]} // Enable GFM for tables
                            >
                                {selectedPlan.movements ? selectedPlan.movements : 'هیچ حرکتی موجود نیست'}
                            </ReactMarkdown>
                        </div>
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={closeModal}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Trainning;
