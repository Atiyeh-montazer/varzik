"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth_provider';
import { API } from '@/data/api';
import MedicalFileComponent from "../../components/shared/MedicalFileComponent"

const questions = [
    { question: 'آیا تا کنون پزشک شما اشاره کرده است که شما دچار مشکل قلبی هستید و فقط باید فعالیت‌های جسمانی خاصی که توسط پزشک توصیه می‌شود را انجام دهید؟', answer: "false" },
    { question: 'آیا در هنگام انجام فعالیت‌های جسمانی در قفسه سینه خود احساس درد می‌کنید؟', answer: "false" },
    { question: 'آیا تاکنون به دلیل سرگیجه تعادل یا هوشیاری خود را از دست داده اید؟', answer: "false" },
    { question: 'آیا در یک ماه گذشته در حالیکه در حال انجام فعالیت های جسمانی نبوده اید دچار درد قفسه سینه شده اید؟', answer: "false" },
    { question: 'آیا دچار مشکلات مفصل یا استخوان (به عنوان مثال در کمر, زانو یا لگن) هستید که ممکن است با تغییر در فعالیت جسمانی شما بدتر شود؟', answer: "false" },
    { question: 'آیا در حال حاضر پزشک برای شما داروهایی به عنوان مثال قرص هایی که با آب بلعیده میشوند تجویز کرده است؟', answer: "false" },
    { question: 'آیا دچار فشار خون یا مشکلات قلبی هستید؟', answer: "false" },
    { question: 'آیا هیچ گونه دلیل دیگری برای منع فعالیت جسمانی شما وجود دارد؟', answer: "false" },
]
function Medicalfile() {
    const [user, setUser] = useState(undefined)
    const router = useRouter();
    const auth = useAuth()
    const apiCall = useRef(undefined)
    // State to manage checkboxes (default to empty values)
    const [formValues, setFormValues] = useState([
        { question: 'آیا تا کنون پزشک شما اشاره کرده است که شما دچار مشکل قلبی هستید و فقط باید فعالیت‌های جسمانی خاصی که توسط پزشک توصیه می‌شود را انجام دهید؟', answer: "false" },
        { question: 'آیا در هنگام انجام فعالیت‌های جسمانی در قفسه سینه خود احساس درد می‌کنید؟', answer: "false" },
        { question: 'آیا تاکنون به دلیل سرگیجه تعادل یا هوشیاری خود را از دست داده اید؟', answer: "false" },
        { question: 'آیا در یک ماه گذشته در حالیکه در حال انجام فعالیت های جسمانی نبوده اید دچار درد قفسه سینه شده اید؟', answer: "false" },
        { question: 'آیا دچار مشکلات مفصل یا استخوان (به عنوان مثال در کمر, زانو یا لگن) هستید که ممکن است با تغییر در فعالیت جسمانی شما بدتر شود؟', answer: "false" },
        { question: 'آیا در حال حاضر پزشک برای شما داروهایی به عنوان مثال قرص هایی که با آب بلعیده میشوند تجویز کرده است؟', answer: "false" },
        { question: 'آیا دچار فشار خون یا مشکلات قلبی هستید؟', answer: "false" },
        { question: 'آیا هیچ گونه دلیل دیگری برای منع فعالیت جسمانی شما وجود دارد؟', answer: "false" },
    ]);

    // If no user is found, redirect to login
    useEffect(() => {
        if (auth.loading) return
        if (auth.user) {
            setUser(auth.user)
            let _formValues = [...formValues]
            for (var i = 0; i < questions.length; i++) {
                _formValues[i].answer = auth.user.medical_info.content[i].answer
            }
            console.log("_formValues", _formValues)
            setFormValues(_formValues)
        }
    }, [auth]);

    // Handle checkbox changes

    // Handle form submission
    const handleSubmit = async () => {
        try {
            apiCall.current = API.auth.request({
                path: "/user/update-medical-record",
                method: "put",
                body: {
                    content: formValues,
                }
            });
            let response = await apiCall.current.promise;
            console.log(response)
            if (!response.isSuccess)
                throw response;
            let _authUser = auth.user
            _authUser.medical_info.content = formValues
            auth.setUser(_authUser)
            alert('اطلاعات پزشکی با موفقیت ذخیره شد.');
            router.push('/user'); // Redirect to user page after success

        }
        catch (err) {
            console.error('Failed to update medical record:', err);
            alert('خطا در ذخیره اطلاعات پزشکی');
        }
    };

    return (
        <MedicalFileComponent onSubmit={handleSubmit} formValues={formValues} setFormValues={setFormValues} />
    );
}

export default Medicalfile;
