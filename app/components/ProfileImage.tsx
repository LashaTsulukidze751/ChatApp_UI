"use client";
import React, { useState, useEffect } from "react";
import {
  profileImagess,
  ProfileImageType,
  handleProfileImageChange,
} from "../functions";

function ProfileImage({
  visibility,
  fetchuserinfo,
}: {
  visibility: boolean;
  fetchuserinfo: any;
}) {
  const [profileImages, setProfileImages] = useState<ProfileImageType[]>([]);

  useEffect(() => {
    const fetchProfileImages = async () => {
      try {
        const result: any = await profileImagess();
        setProfileImages(result);
      } catch (error) {
        console.error("Error fetching profile images:", error);
      }
    };

    fetchProfileImages();
  });

  return (
    <>
      {visibility && (
        <div className="flex overflow-x-scroll">
          {profileImages.map((image) => (
            <img
              key={image.imageid}
              src={image.imageurl}
              onClick={async () => {
                await handleProfileImageChange(image.imageurl);
                await fetchuserinfo();
              }}
              alt="Profile"
              className="m-3 size-40"
            />
          ))}
        </div>
      )}
    </>
  );
}

export default ProfileImage;
