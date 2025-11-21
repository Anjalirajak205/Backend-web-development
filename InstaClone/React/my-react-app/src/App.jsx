import React, { useState } from "react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fqubnbxtiubscdsezply.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxdWJuYnh0aXVic2Nkc2V6cGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NDMxNzksImV4cCI6MjA3OTIxOTE3OX0.IhWOrCRyIfwIoKeFpITk90VbMJ0UtQj-FVYkqwu9cls";
const supabase = createClient(supabaseUrl, supabaseKey);

const Upload = () => {
  const [Img, setImg] = useState(null);

  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  async function save() {
    if (!Img) {
      alert("Please select an image first!");
      return;
    }

    try {
      // 1️⃣ Upload image to Supabase
        const { data, error } = await supabase.storage
  .from("Insta")
  .upload("insta_images/" + Img.name, Img, { upsert: true });

      if (error) throw error;

      // 2️⃣ Get public URL
      const imageUrl = `${supabaseUrl}/storage/v1/object/public/Insta/insta_images/${Img.name}`;
      console.log("Image URL:", imageUrl);

      // 3️⃣ Send metadata to backend
     await axios.post(
  "http://localhost:4001/upload",
  {
    name: Img.name,
    ImgUrl: imageUrl,
    user: localStorage.getItem("userEmail")
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
);


      alert("✅ Image uploaded and saved successfully!");
      setImg(null);
    } catch (err) {
      console.error("❌ Upload failed:", err);
      alert("Error uploading image. Check console for details.");
    }
  }

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center gap-4">
      <input type="file" onChange={handleFileChange} className="border p-2 rounded" />
      <button
        onClick={save}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </div>
  );
};

export default Upload;