"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  Phone,
  Car,
  Wrench,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge, Paper, Text, Avatar, Divider, Timeline } from "@mantine/core";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "react-toastify";

// Enhanced Mock Data (In a real app, fetch from API by ID)
const getRequestById = (id: string) => {
  // Return mock data for demo purposes, assume ID matches regex or something
  return {
    id: id || "REQ-001",
    user: {
      name: "Ali Raza",
      phone: "+92 300 1234567",
      email: "ali@example.com",
      avatar: null,
    },
    helper: {
      name: "Ahmed K.",
      phone: "+92 321 7654321",
      rating: 4.8,
      avatar: null,
    },
    service: "Towing",
    vehicle: "Honda Civic 2019 (White)",
    location: "Gulberg III, Lahore, Pakistan",
    status: "In Progress",
    createdAt: "2024-02-15 10:30 AM",
    amount: "Rs 4,500",
    notes: "Car broke down near Main Boulevard. Engine is not starting.",
    timeline: [
      { title: "Request Created", time: "10:30 AM", active: true },
      { title: "Helper Assigned", time: "10:35 AM", active: true },
      { title: "Helper Arrived", time: "10:50 AM", active: true },
      { title: "Job Completed", time: "-", active: false },
    ],
  };
};

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const request = getRequestById(id);

  const handleAssignHelper = () => {
    toast.info("Assign Helper Logic would go here.");
  };

  return (
    <div className="min-h-screen bg-brand-black text-white p-4 md:p-8 font-satoshi">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold font-manrope">
                Request Details
              </h1>
              <Badge
                size="lg"
                color={request.status === "In Progress" ? "blue" : "green"}
              >
                {request.status}
              </Badge>
            </div>
            <p className="text-gray-400 text-sm mt-1">ID: {request.id}</p>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button className="bg-brand-red hover:bg-brand-dark-red">
              Mark as Completed
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status & Map Card */}
            <Paper
              p="xl"
              radius="lg"
              className="bg-brand-charcoal border border-white/5"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold mb-1">Current Status</h3>
                  <p className="text-gray-400 text-sm">
                    Real-time updates on the service.
                  </p>
                </div>
                <Clock className="text-brand-red" />
              </div>

              {/* Mock Timeline */}
              <div className="relative pl-4 space-y-8 border-l border-white/10 ml-2">
                {request.timeline.map((item, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div
                      className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 ${item.active ? "bg-brand-red border-brand-red" : "bg-brand-black border-gray-600"}`}
                    />
                    <h4
                      className={`text-sm font-bold ${item.active ? "text-white" : "text-gray-500"}`}
                    >
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                ))}
              </div>
            </Paper>

            {/* Details Card */}
            <Paper
              p="xl"
              radius="lg"
              className="bg-brand-charcoal border border-white/5"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Wrench size={20} className="text-gray-400" />
                Service Info
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-500 text-sm block mb-1">
                    Service Type
                  </label>
                  <p className="font-semibold text-lg">{request.service}</p>
                </div>
                <div>
                  <label className="text-gray-500 text-sm block mb-1">
                    Vehicle Details
                  </label>
                  <div className="flex items-center gap-2">
                    <Car size={16} className="text-brand-red" />
                    <p className="font-semibold">{request.vehicle}</p>
                  </div>
                </div>
                <div>
                  <label className="text-gray-500 text-sm block mb-1">
                    Location
                  </label>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-brand-red" />
                    <p className="font-medium text-sm text-gray-300">
                      {request.location}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-gray-500 text-sm block mb-1">
                    Total Amount
                  </label>
                  <p className="font-bold text-xl text-green-400">
                    {request.amount}
                  </p>
                </div>
              </div>

              <Divider my="lg" color="gray.8" />

              <div>
                <label className="text-gray-500 text-sm block mb-2">
                  Customer Notes
                </label>
                <p className="text-gray-300 bg-black/20 p-4 rounded-lg italic">
                  "{request.notes}"
                </p>
              </div>
            </Paper>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Customer Info */}
            <Paper
              p="lg"
              radius="lg"
              className="bg-brand-charcoal border border-white/5"
            >
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <User size={18} className="text-gray-400" />
                Customer
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <Avatar color="red" radius="xl" size="lg">
                  {request.user.name.charAt(0)}
                </Avatar>
                <div>
                  <p className="font-bold">{request.user.name}</p>
                  <p className="text-xs text-gray-500">Customer since 2023</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Phone size={16} className="text-gray-500" />
                  {request.user.phone}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <MailIcon size={16} className="text-gray-500" />
                  {request.user.email}
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-6 border-white/10 hover:bg-white/5"
              >
                View Profile
              </Button>
            </Paper>

            {/* Helper Info */}
            <Paper
              p="lg"
              radius="lg"
              className="bg-brand-charcoal border border-white/5"
            >
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Wrench size={18} className="text-gray-400" />
                Assigned Helper
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <Avatar color="blue" radius="xl" size="lg">
                  {request.helper.name.charAt(0)}
                </Avatar>
                <div>
                  <p className="font-bold">{request.helper.name}</p>
                  <div className="flex items-center gap-1 text-xs text-yellow-500">
                    ★ {request.helper.rating} Rating
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Phone size={16} className="text-gray-500" />
                  {request.helper.phone}
                </div>
              </div>
              <Button
                onClick={handleAssignHelper}
                variant="outline"
                className="w-full mt-6 border-white/10 hover:bg-white/5"
              >
                Reassign Helper
              </Button>
            </Paper>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MailIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
