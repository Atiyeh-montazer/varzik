"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { updateMedicalRecord } from '@/redux/userSlice'; // Import Redux action
import axios from 'axios';

function Medicalfile() {
    const user = useSelector((state) => state.user.userInfo); // Get user from Redux
    const dispatch = useDispatch();
    const router = useRouter();

    // State to manage checkboxes (default to empty values)
    const [formValues, setFormValues] = useState({
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: '',
        question6: '',
        question7: '',
        question8: '',
    });

    // If no user is found, redirect to login
    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else if (user.medical_info) {
            // Load existing medical info from Redux if available
            setFormValues(user.medical_info);
        }
    }, [user, router]);

    // Handle checkbox changes
    const handleCheckboxChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async () => {
        const token = localStorage.getItem('jwtToken');

        const medicalRecordContent = {
            content: formValues, // Pass the form values as content
        };

        try {
            // Dispatch the form values to Redux store
            dispatch(updateMedicalRecord(formValues));

            // Send form values to the backend
            await axios.put(
                'https://api.varzik.ir/user/update-medical-record', // Backend API endpoint
                medicalRecordContent,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            alert('اطلاعات پزشکی با موفقیت ذخیره شد.');
            router.push('/user'); // Redirect to user page after success
        } catch (error) {
            console.error('Failed to update medical record:', error);
            alert('خطا در ذخیره اطلاعات پزشکی');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-center text-2xl mb-6">پرونده پزشکی</h1>

            {/* Question 1 */}
            <div className="mb-4">
                <p>آیا تا کنون پزشک شما اشاره کرده است که شما دچار مشکل قلبی هستید و فقط باید فعالیت‌های جسمانی خاصی که توسط پزشک توصیه می‌شود را انجام دهید؟</p>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="question1"
                            value="بله"
                            checked={formValues.question1 === 'بله'}
                            onChange={handleCheckboxChange}
                        />
                        بله
                    </label>
                    <label className="ml-4">
                        <input
                            type="radio"
                            name="question1"
                            value="خیر"
                            checked={formValues.question1 === 'خیر'}
                            onChange={handleCheckboxChange}
                        />
                        خیر
                    </label>
                </div>
            </div>

            {/* Question 2 */}
            <div className="mb-4">
                <p>آیا در هنگام انجام فعالیت‌های جسمانی در قفسه سینه خود احساس درد می‌کنید؟</p>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="question2"
                            value="بله"
                            checked={formValues.question2 === 'بله'}
                            onChange={handleCheckboxChange}
                        />
                        بله
                    </label>
                    <label className="ml-4">
                        <input
                            type="radio"
                            name="question2"
                            value="خیر"
                            checked={formValues.question2 === 'خیر'}
                            onChange={handleCheckboxChange}
                        />
                        خیر
                    </label>
                </div>
            </div>

            {/* Question 3 */}
            <div className="mb-4">
                <p>آیا تاکنون به دلیل سرگیجه تعادل یا هوشیاری خود را از دست داده اید؟</p>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="question3"
                            value="بله"
                            checked={formValues.question3 === 'بله'}
                            onChange={handleCheckboxChange}
                        />
                        بله
                    </label>
                    <label className="ml-4">
                        <input
                            type="radio"
                            name="question3"
                            value="خیر"
                            checked={formValues.question3 === 'خیر'}
                            onChange={handleCheckboxChange}
                        />
                        خیر
                    </label>
                </div>
            </div>

            {/* Question 4 */}
            <div className="mb-4">
                <p>آیا در یک ماه گذشته در حالیکه در حال انجام فعالیت های جسمانی نبوده اید دچار درد قفسه سینه شده اید؟</p>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="question4"
                            value="بله"
                            checked={formValues.question4 === 'بله'}
                            onChange={handleCheckboxChange}
                        />
                        بله
                    </label>
                    <label className="ml-4">
                        <input
                            type="radio"
                            name="question4"
                            value="خیر"
                            checked={formValues.question4 === 'خیر'}
                            onChange={handleCheckboxChange}
                        />
                        خیر
                    </label>
                </div>
            </div>

            {/* Question 5 */}
            <div className="mb-4">
                <p>آیا دچار مشکلات مفصل یا استخوان (به عنوان مثال در کمر, زانو یا لگن) هستید که ممکن است با تغییر در فعالیت جسمانی شما بدتر شود؟</p>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="question5"
                            value="بله"
                            checked={formValues.question5 === 'بله'}
                            onChange={handleCheckboxChange}
                        />
                        بله
                    </label>
                    <label className="ml-4">
                        <input
                            type="radio"
                            name="question5"
                            value="خیر"
                            checked={formValues.question5 === 'خیر'}
                            onChange={handleCheckboxChange}
                        />
                        خیر
                    </label>
                </div>
            </div>

            {/* Question 6 */}
            <div className="mb-4">
               <p>آیا در حال حاضر پزشک برای شما داروهایی به عنوان مثال قرص هایی که با آب بلعیده میشوند تجویز کرده است؟</p>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="question6"
                            value="بله"
                            checked={formValues.question6 === 'بله'}
                            onChange={handleCheckboxChange}
                        />
                        بله
                    </label>
                    <label className="ml-4">
                        <input
                            type="radio"
                            name="question6"
                            value="خیر"
                            checked={formValues.question6 === 'خیر'}
                            onChange={handleCheckboxChange}
                        />
                        خیر
                    </label>
                </div>
            </div>

            {/* Question 7 */}
            <div className="mb-4">
               <p>آیا دچار فشار خون یا مشکلات قلبی هستید؟</p>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="question7"
                            value="بله"
                            checked={formValues.question7 === 'بله'}
                            onChange={handleCheckboxChange}
                        />
                        بله
                    </label>
                    <label className="ml-4">
                        <input
                            type="radio"
                            name="question7"
                            value="خیر"
                            checked={formValues.question7 === 'خیر'}
                            onChange={handleCheckboxChange}
                        />
                        خیر
                    </label>
                </div>
            </div>

            {/* Question 8 */}
            <div className="mb-4">
               <p>آیا هیچ گونه دلیل دیگری برای منع فعالیت جسمانی شما وجود دارد؟</p>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="question8"
                            value="بله"
                            checked={formValues.question8 === 'بله'}
                            onChange={handleCheckboxChange}
                        />
                        بله
                    </label>
                    <label className="ml-4">
                        <input
                            type="radio"
                            name="question8"
                            value="خیر"
                            checked={formValues.question8 === 'خیر'}
                            onChange={handleCheckboxChange}
                        />
                        خیر
                    </label>
                </div>
            </div>

            {/* Submit and Back Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
                <Link href="/user">
                    <button className="hover:bg-pink-700 w-32 h-11 border border-x-4 rounded-full flex justify-center items-center text-xl">
                        بازگشت
                    </button>
                </Link>

                <button
                    onClick={handleSubmit}
                    className="bg-pink-700 text-white rounded-full w-32 h-11 flex justify-center items-center text-xl"
                >
                    ذخیره
                </button>
            </div>
        </div>
    );
}

export default Medicalfile;
