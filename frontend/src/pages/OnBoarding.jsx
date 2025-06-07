import { Globe, Shuffle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { LANGUAGES } from "../constants/index";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { onboard } from "../lib/api";
import toast from "react-hot-toast";

const OnBoarding = () => {
  const [profilePic, setProfilePic] = useState("https://avatar.iran.liara.run/public/1.png");

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setProfilePic(randomAvatar);
  };

  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    nativeLanguage: "",
    learningLanguage: "",
    location: "",
  });

  const queryClient = useQueryClient();

  const useOnboard = () => {
    const { error, isPending, mutate } = useMutation({
      mutationFn: onboard,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
          toast.success("Onboarding complete!");
      },
    });

    return { onBoardMutation: mutate, isPending, error };
  };

  const { onBoardMutation, error, isPending } = useOnboard();
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onBoardMutation(formData);
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }, [error]);

  return (
    <div className="h-[calc(100vh-4rem)] flex justify-center items-center">
      <div className="card w-full max-w-3xl bg-base-300 shadow-xl sm:p-8 space-y-5">
        <div className="flex flex-col items-center space-y-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Complete Your Profile</h1>
          <img src={profilePic} className="size-36" />
          <div className="btn btn-accent" onClick={handleRandomAvatar}>
            <Shuffle size={16} />
            Generate random avatar
          </div>
        </div>
        {/*fullName*/}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Your full name"
          />
        </div>
        {/*BIO*/}
        <div className="form-control">
          <label>Bio</label>
          <textarea
            name="bio"
            id=""
            className="textarea textarea-bordered h-24"
            maxLength={100} 
            rows={5}
            onChange={handleChange}
            placeholder="Tell others about yourself and your language learning goals. 100 Characters only"
          ></textarea>
        </div>
        {/* LANGUAGES */}
        <div className="grid grid-cols-2 gap-5">
          <div className="w-full">
            <label className="label-text">Native language</label>
            <select
              className="select select-bordered w-full"
              name="nativeLanguage"
              value={formData.nativeLanguage}
              onChange={handleChange}
            >
              <option value="">Select your native language</option>
              {LANGUAGES.map((lang) => (
                <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label className="label-text">Learning language</label>
            <select
              className="select select-bordered w-full"
              name="learningLanguage"
              value={formData.learningLanguage}
              onChange={handleChange}
            >
              <option value="">Select language you're learning</option>
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang.toLowerCase()}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Location */}
        <div>
          <label className="label label-text">Location</label>
          <input
            type="text"
            name="location"
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="City, Country"
          />
        </div>
        <div className="btn btn-primary w-full" onClick={handleSubmit}>
          <span>
            <Globe />
          </span>
          <p>
            {isPending ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Onboarding now...
              </>
            ) : (
              "Complete Onboarding"
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
