"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isMounted, setIsMounted] = useState(false); // Flag to track client-side mount
  const router = useRouter();

  // Ensure component is mounted before running client-specific logic
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch user data from localStorage (or elsewhere) only on the client-side
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  // Show loading state until component is mounted and userData is fetched
  if (!isMounted || !userData) {
    return <div>Loading...</div>;
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      // Send logout request
      await axiosInstance.post("/api/logout");

      // Clear user data and token
      localStorage.removeItem("userData");
      localStorage.removeItem("token");

      // Redirect to home or login page
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
      alert("An error occurred while logging out.");
    }
  };
  if (!isMounted) {
    return null; // Or return a loading spinner or placeholder
  }

  return (
    <section id="profile" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            {/* Profile Image and Details */}
            <div className="w-full px-4 lg:w-1/2">
              <div
                className="wow fadeInUp mb-12 max-w-[570px] lg:mb-0"
                data-wow-delay=".15s"
              >
                <div className="flex items-center">
                  {/* Profile Image */}
                  <div className="mr-6">
                    <div
                      className="relative w-24 h-24 rounded-full overflow-hidden"
                      data-wow-delay=".15s"
                    >
                      <img
                        src={userData.profileImage || "/images/profile/profile-image.svg"}
                        alt="profile-image"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div>
                    <h2 className="text-2xl font-semibold text-body-color">
                      {userData.name || "Rainhard"}
                    </h2>
                    <p className="text-lg font-medium text-body-color opacity-70">
                      {userData.jobTitle || "Management Trainee at Indofood CBP"}
                    </p>
                    <p className="mt-2 text-sm text-body-color">
                      Email: {userData.email || "rainhard@example.com"}
                    </p>
                  </div>
                </div>

                {/* Logout Button */}
                <div className="mt-4">
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>

                {/* Profile Bio */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold">About Me</h3>
                  <p className="text-base text-body-color">
                    {userData.bio ||
                      "I am a Management Trainee at Indofood CBP, working on production processes in the Laminating Machine division. I'm passionate about continuous improvement and the application of modern tools and methodologies in manufacturing."}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Information or Links */}
            <div className="w-full px-4 lg:w-1/2">
              <ul className="space-y-4 text-lg text-body-color">
                {userData.socialLinks?.github && (
                  <li className="flex items-center">
                    GitHub:{" "}
                    <a href={userData.socialLinks.github} target="_blank" className="text-primary hover:underline">
                      {userData.socialLinks.github}
                    </a>
                  </li>
                )}
                {userData.socialLinks?.linkedin && (
                  <li className="flex items-center">
                    LinkedIn:{" "}
                    <a href={userData.socialLinks.linkedin} target="_blank" className="text-primary hover:underline">
                      {userData.socialLinks.linkedin}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
