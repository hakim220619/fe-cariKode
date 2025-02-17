"use client";
import axiosInstance from "@/lib/axiosInstance";
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import { useEffect, useState } from "react";

const Features = () => {
  const [appDetails, setAppDetails] = useState(null);
  const [featuresData, setFeaturesData] = useState([]);

  useEffect(() => {
    const fetchAppDetails = async () => {
      try {
        const appId = 'ASD6734023';
        const response = await axiosInstance.get(`/api/getDetailAplikasi`, {
          params: { id: appId }
        });
  
        setAppDetails(response.data);
      } catch (error) {
        console.error('Error fetching application details:', error);
      }
    };

    const fetchAppDetailsFeature = async () => {
      try {
        const appId = 'ASD646813';
        const response = await axiosInstance.get(`/api/getDetailAplikasi`, {
          params: { id: appId }
        });
        console.log(response.data);
  
        // Ensure the response data is an array before setting it
        if (Array.isArray(response.data)) {
          setFeaturesData(response.data);
        } else {
          console.error('Fetched data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching application details:', error);
      }
    };
console.log(featuresData);

    fetchAppDetails();
    fetchAppDetailsFeature();
  }, []);

  // Render loading state if the data is not yet fetched
  if (!appDetails || !Array.isArray(featuresData)) {
    return (
      <section className="dark:bg-gray-dark relative z-10 overflow-hidden bg-white pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="wow fadeInUp mx-auto max-w-[800px] text-center" data-wow-delay=".2s">
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Loading...
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title={appDetails.header}
            paragraph={appDetails.body}
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
