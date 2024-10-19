"use client"
import React, { useRef } from 'react'
import EmblaCarousel from '@/components/embla-caousel/EmblaCarousel'
import '@/components/embla-caousel/assets/css/sandbox.css'
import '@/components/embla-caousel/assets/css/embla.css'
import { useAuth } from '@/providers/auth_provider';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { API } from '@/data/api'


const OPTIONS = { loop: true }

function Mainpage() {

  const auth = useAuth();
  const [user, setUser] = useState(undefined);
  const [videos, setVideos] = useState([]); // State to hold the video data
  const router = useRouter()
  const apiCall = useRef()
  useEffect(() => {
    if (auth.loading) return;
    if (auth.user) {
      setUser(auth.user);
      fetchVideos(); // Fetch videos related to the plan
    } else {
      router.push("/login");
    }
  }, [auth]);

  useEffect(() => {
    return () => {
      if (apiCall.current !== undefined) {
        apiCall.current.cancel()
      }
    }
  }, [])
  const fetchVideos = async () => {
    try {
      apiCall.current = API.auth.request({
        path: "user/wikis/",
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

  return (
    <div>
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

      <EmblaCarousel title="برترین ها" options={OPTIONS}>
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

      <EmblaCarousel title="خدمات" options={OPTIONS}>
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

    </div>
  )
}

export default Mainpage