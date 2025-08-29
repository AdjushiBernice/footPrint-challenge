"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Button,
  Input,
  TextField,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { updateUserProfile, updateProfileField } from "@/lib/slices/userSlice";
import { Camera } from "@mui/icons-material"; // Material UI Camera Icon
import ProfilePicture from "../../../public /christina.png";
import Image from "next/image";

export function ProfileForm() {
  const dispatch = useAppDispatch();
  const { profile, isLoading, error } = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    dateOfBirth: "",
    presentAddress: "",
    permanentAddress: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        username: profile.username || "",
        email: profile.email || "",
        dateOfBirth: profile.dateOfBirth || "",
        presentAddress: profile.presentAddress || "",
        permanentAddress: profile.permanentAddress || "",
        city: profile.city || "",
        postalCode: profile.postalCode || "",
        country: profile.country || "",
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    dispatch(
      updateProfileField({ field: field as keyof typeof profile, value })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(updateUserProfile(formData));
  };

  if (!profile) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="flex gap-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Section */}
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <Image
                  src={ProfilePicture}
                  alt={profile.name}
                  className="w-full h-full rounded-full"
                />
              </Avatar>
              <Button
                type="button"
                size="small"
                variant="outlined"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0 bg-transparent"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <Typography
                variant="h6"
                className="font-semibold text-gray-900 mb-1"
              >
                {profile.name}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                {profile.email}
              </Typography>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <TextField
                label="Your Name"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                fullWidth
                variant="outlined"
              />
            </div>

            <div className="space-y-2">
              <TextField
                label="User Name"
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                fullWidth
                variant="outlined"
              />
            </div>

            <div className="space-y-2">
              <TextField
                label="Email"
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                fullWidth
                variant="outlined"
              />
            </div>

            <div className="space-y-2">
              <TextField
                label="Password"
                id="password"
                type="password"
                fullWidth
                variant="outlined"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <TextField
                label="Date of Birth"
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  handleInputChange("dateOfBirth", e.target.value)
                }
                fullWidth
                variant="outlined"
              />
            </div>

            <div className="space-y-2">
              <TextField
                label="Present Address"
                id="presentAddress"
                value={formData.presentAddress}
                onChange={(e) =>
                  handleInputChange("presentAddress", e.target.value)
                }
                fullWidth
                variant="outlined"
              />
            </div>

            <div className="space-y-2">
              <TextField
                label="Permanent Address"
                id="permanentAddress"
                value={formData.permanentAddress}
                onChange={(e) =>
                  handleInputChange("permanentAddress", e.target.value)
                }
                fullWidth
                variant="outlined"
              />
            </div>

            <div className="space-y-2">
              <TextField
                label="City"
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                fullWidth
                variant="outlined"
              />
            </div>

            <div className="space-y-2">
              <TextField
                label="Postal Code"
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) =>
                  handleInputChange("postalCode", e.target.value)
                }
                fullWidth
                variant="outlined"
              />
            </div>

            <div className="space-y-2">
              <TextField
                label="Country"
                id="country"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                fullWidth
                variant="outlined"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <Typography variant="body2" className="text-sm text-red-600">
                {error}
              </Typography>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              variant="contained"
              style={{
                backgroundColor: "#232323", // Dark background color
                color: "#fff", // White text color
              }}
            >
              {isLoading ? <CircularProgress size={24} /> : "Save"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
