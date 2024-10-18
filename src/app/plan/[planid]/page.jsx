"use client";
import EmblaCarousel from '@/components/embla-caousel/EmblaCarousel';
import '@/components/embla-caousel/assets/css/sandbox.css';
import './embla.css';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/providers/auth_provider';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'; // For rendering HTML inside Markdown
import remarkGfm from 'remark-gfm'; // For rendering GitHub-flavored markdown (tables, etc.)
import { API } from '@/data/api'

const OPTIONS = { loop: true, axis: 'y' };

function Plan({ params }) {
  const auth = useAuth();
  const [user, setUser] = useState(undefined);
  const [plan, setPlan] = useState(null); // State to hold the plan data
  const [videos, setVideos] = useState([]); // State to hold the video data
  const [loading, setLoading] = useState(true);
  const apiCall = useRef(undefined)
  useEffect(() => {
    if (auth.loading) return;
    if (auth.user) {
      setUser(auth.user);
      fetchPlanDetails(params.planid); // Fetch the plan details on component mount
      fetchVideos(params.planid); // Fetch videos related to the plan
    } else {
      router.push("/login");
    }
  }, [auth]);

  const fetchPlanDetails = async (planId) => {
    try {
      apiCall.current = API.auth.request({
        path: `user/plans/${planId}`,
        method: "GET"
      })
      let response = await apiCall.current.promise
      if (!response.isSuccess) throw response
      setPlan(response.plan); // Set the plan data
      setLoading(false);
    }
    catch (err) {
      console.error('Failed to fetch the plan details:', error);
      setLoading(false);
    }
  };

  const fetchVideos = async (planId) => {
    try {
      apiCall.current = API.auth.request({
        path: `/user/wikis/${planId}`,
        method: "GET"
      })
      let response = await apiCall.current.promise
      if (!response.isSuccess) throw response
      setVideos(response.wikis);
    }
    catch (err) {
      console.error('Failed to fetch the videos:', err);
    }
  };

  const handleEndDayClick = async (planId) => {
    try {
      apiCall.current = API.auth.request({
        path: 'user/update-progress',
        method: "PUT",
        body: { plan_id: params.planid }
      })
      let response = await apiCall.current.promise
      if (!response.isSuccess) throw response
      alert('روز با موفقیت پایان یافت.');
      // Optionally, you can update the progress after the API call is successful.
      fetchPlanDetails(params.planid);
    }
    catch (error) {
      console.error('Failed to end the day:', error);
      alert('خطایی رخ داد. لطفا دوباره تلاش کنید.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div>
        {plan ? (
          <div>
            {/* Embla Carousel to display videos */}
            <EmblaCarousel title="ویکی" options={OPTIONS}>
              {videos && videos.length > 0 ? (
                videos.map((video) => (
                  <div key={video.id} className="embla__slide">
                    <video
                      controls
                      className="w-full h-auto rounded-xl mt-6 border border-slate-400"
                      src={`https://api.varzik.ir${video.video_url}`}
                    />
                  </div>
                ))
              ) : (
                <p className="text-center">No videos available</p>
              )}
            </EmblaCarousel>

            {/* Progress as Green Badge and End Day Button */}
            <div className="flex justify-between items-center mt-4">
              <span className="inline-block bg-green-500 text-white py-1 px-3 rounded-full">
                %وضعیت پیشرفت: {parseInt(plan.progress)}
              </span>
              <button
                className='hover:bg-gradient-to-r w-32 h-11 border focus:bg-pink-700 mt-4 text-white border-x-4 rounded-full mr-3 mb-3'
                onClick={handleEndDayClick}
              >
                پایان روز
              </button>
            </div>

            {/* Coach Username as Header (white text) */}
            <h1 className="text-right text-3xl font-bold text-white mb-4 mt-4" dir="rtl">
              مربی: {plan.coach_username}
            </h1>

            {/* Plan Container with White Background */}
            <div className="p-6 bg-white shadow-lg rounded-lg" dir="rtl" style={{ textAlign: 'right' }}>
              <h2 className="text-2xl mb-4">برنامه تمرینی</h2>

              {/* Responsive Scrollable Box for Markdown Content */}
              <div className="w-full overflow-x-auto">
                <div className="min-w-[600px]"> {/* Ensure the content doesn't shrink */}
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]} // Add support for GitHub-flavored markdown (tables, etc.)
                    className="table-auto border-collapse border border-gray-400"
                  >
                    {plan.movements}
                  </ReactMarkdown>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <p>Plan not found.</p>
        )}
      </div>
    </>
  );
}

export default Plan;
