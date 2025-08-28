"use client";

import { Card, CardContent, CardHeader, Button, TextField, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchQuickTransferUsers } from "@/lib/api";
import { QuickTransferUser } from "@/lib/types";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Import images for avatars and send icon
import Emanuel from "../../../public /emanuel.png";
import Julia from "../../../public /julia.png";
import Man from "../../../public /marcel.png";
import SendIcon from "../../../public /sendIcon.svg";

export function QuickTransfer() {
  const [quickTransferUsers, setQuickTransferUsers] = useState<QuickTransferUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Fetch users from the mock DB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuickTransferUsers();
        setQuickTransferUsers(data);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Fetch data on component mount
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4 px-4 pt-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Balance History</h2>
      </div>
              <Card>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse mb-2" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>

      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  // Handle user avatar mapping
  const avatarMapping: { [key: string]: string } = {
    "Livia Bator": Emanuel.src as string,  // Use the correct image source
    "Randy Press": Julia.src as string,
    "Workman": Man.src as string,
  };

  return (
    <div className="space-y-4 px-4 pt-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Balance History</h2>
      </div>
          <Card>
      <CardHeader title={"Quick Transfer"} />
      <CardContent className="space-y-6">
        <div className="flex gap-4 justify-center">
          {quickTransferUsers.map((user) => (
            <div
              key={user.id}
              className={cn(
                "text-center cursor-pointer p-2 rounded-lg transition-colors",
                selectedUser === user.id ? "bg-blue-50" : "hover:bg-gray-50"
              )}
              onClick={() => setSelectedUser(user.id)}
            >
              <Avatar className="w-16 h-16 mx-auto mb-2">
                <Image
                  src={avatarMapping[user.name] || "/placeholder.svg"} // Use the correct image from avatarMapping
                  alt={user.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </Avatar>
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-2">
          <p className="text-sm text-gray-600 mb-2">Write Amount</p>
          <TextField
            type="number"
            placeholder="525.50"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            variant="outlined"
            size="small"
            className="text-lg"
          />
          <Button
            className="mt-7 bg-[#232323] border rounded-2xl hover:bg-gray-800 text-white px-6"
            disabled={!selectedUser || !amount}
            endIcon={<Image src={SendIcon} alt="Send Icon" width={24} height={24} />}
          >
            Send
          </Button>
        </div>
      </CardContent>
    </Card>

    </div>
  );
}
