"use client";

import React, { useState } from "react";
import {
  Title,
  Text,
  Paper,
  Group,
  Table,
  Badge,
  ActionIcon,
  Tooltip,
  Box,
  Tabs,
} from "@mantine/core";
import { motion } from "framer-motion";
import { Eye, MapPin, Calendar, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import Link from "next/link";

// Enhanced Mock Data with more fields
const allRequests = [
  {
    id: "REQ-001",
    user: "Ali Raza",
    phone: "+92 300 1234567",
    service: "Towing",
    vehicle: "Honda Civic 2019",
    location: "Gulberg III, Lahore",
    helper: "Ahmed K.",
    helperPhone: "+92 321 7654321",
    status: "In Progress",
    time: "10 mins ago",
    amount: "Rs 4,500",
    paymentStatus: "Pending",
    notes: "Car broke down near Main Boulevard.",
  },
  {
    id: "REQ-002",
    user: "Sara Ahmed",
    phone: "+92 333 9876543",
    service: "Flat Tire",
    vehicle: "Suzuki Alto",
    location: "DHA Phase 5, Lahore",
    helper: "Looking...",
    helperPhone: "N/A",
    status: "Pending",
    time: "25 mins ago",
    amount: "Rs 1,200",
    paymentStatus: "Unpaid",
    notes: "Need urgent assistance.",
  },
  {
    id: "REQ-003",
    user: "John Doe",
    phone: "+92 345 6789012",
    service: "Fuel Delivery",
    vehicle: "Toyota Corolla",
    location: "Johar Town, Lahore",
    helper: "Mike T.",
    helperPhone: "+92 301 1122334",
    status: "Completed",
    time: "2 hours ago",
    amount: "Rs 2,200",
    paymentStatus: "Paid",
    notes: "Ran out of fuel on highway exit.",
  },
  {
    id: "REQ-004",
    user: "Bilal Khan",
    phone: "+92 312 3456789",
    service: "Car Mechanic",
    vehicle: "Kia Sportage",
    location: "Model Town, Lahore",
    helper: "Usman A.",
    helperPhone: "+92 322 4455667",
    status: "Completed",
    time: "5 hours ago",
    amount: "Rs 3,500",
    paymentStatus: "Paid",
    notes: "Engine overheating issues.",
  },
  {
    id: "REQ-005",
    user: "Ayesha Malik",
    phone: "+92 307 7788990",
    service: "Locksmith",
    vehicle: "Honda City",
    location: "Bahria Town, Lahore",
    helper: "Looking...",
    helperPhone: "N/A",
    status: "Pending",
    time: "1 hour ago",
    amount: "Rs 1,500",
    paymentStatus: "Unpaid",
    notes: "Keys locked inside the car.",
  },
];

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState<string | null>("all");

  const filteredRequests = allRequests.filter((req) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return req.status === "Pending";
    if (activeTab === "inprogress") return req.status === "In Progress";
    if (activeTab === "completed") return req.status === "Completed";
    return true;
  });

  const handleDownloadReport = () => {
    // Generate simple CSV content
    const headers = [
      "ID",
      "User",
      "Phone",
      "Service",
      "Vehicle",
      "Location",
      "Status",
      "Amount",
      "Time",
    ];
    const rows = filteredRequests.map((req) =>
      [
        req.id,
        req.user,
        req.phone,
        req.service,
        req.vehicle,
        req.location,
        req.status,
        req.amount,
        req.time,
      ].join(","),
    );
    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `requests_report_${activeTab || "all"}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Report downloaded successfully!");
  };

  return (
    <Box className="p-4 md:p-8 min-h-screen font-satoshi bg-brand-black text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Group
          justify="space-between"
          mb="lg"
          className="flex-col md:flex-row items-start md:items-center"
        >
          <div>
            <Title className="font-manrope text-3xl font-bold text-white mb-1">
              Service Requests
            </Title>
            <Text className="text-gray-400">
              Monitor and manage ongoing and past service requests.
            </Text>
          </div>
          <Button
            onClick={handleDownloadReport}
            className="bg-brand-red hover:bg-brand-dark-red text-white gap-2 mt-4 md:mt-0"
          >
            <Download size={18} />
            Download Report
          </Button>
        </Group>

        <Paper
          p="lg"
          radius="xl"
          className="glass-dark border border-white/10 overflow-hidden bg-brand-charcoal/50"
        >
          {/* Filters */}
          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            variant="pills"
            radius="xl"
            mb="md"
            classNames={{
              list: "gap-2",
              tab: "bg-white/5 text-gray-400 hover:bg-white/10 data-[active=true]:bg-brand-red data-[active=true]:text-white border-0 transition-all",
            }}
          >
            <Tabs.List>
              <Tabs.Tab value="all">All Requests</Tabs.Tab>
              <Tabs.Tab value="pending">Pending</Tabs.Tab>
              <Tabs.Tab value="inprogress">In Progress</Tabs.Tab>
              <Tabs.Tab value="completed">Completed</Tabs.Tab>
            </Tabs.List>
          </Tabs>

          <div className="overflow-x-auto">
            <Table verticalSpacing="md" className="text-gray-200">
              <Table.Thead className="bg-white/5">
                <Table.Tr>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>User Details</Table.Th>
                  <Table.Th>Service Info</Table.Th>
                  <Table.Th>Location</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Payment</Table.Th>
                  <Table.Th>Time</Table.Th>
                  <Table.Th className="text-right">Action</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredRequests.map((req, i) => (
                  <motion.tr
                    key={req.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <Table.Td className="font-mono text-gray-400 text-xs font-bold">
                      {req.id}
                    </Table.Td>
                    <Table.Td>
                      <div>
                        <Text size="sm" fw={600} className="text-white">
                          {req.user}
                        </Text>
                        <Text size="xs" className="text-gray-500">
                          {req.phone}
                        </Text>
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <div>
                        <Text size="sm" className="text-brand-red font-medium">
                          {req.service}
                        </Text>
                        <Text size="xs" className="text-gray-400">
                          {req.vehicle}
                        </Text>
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs" className="text-gray-300">
                        <MapPin size={14} className="text-gray-500" />
                        <Text
                          size="xs"
                          className="truncate max-w-[150px]"
                          title={req.location}
                        >
                          {req.location}
                        </Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        color={
                          req.status === "Completed"
                            ? "green"
                            : req.status === "Pending"
                              ? "orange"
                              : "blue"
                        }
                        variant="light"
                        className="capitalize"
                      >
                        {req.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        variant="dot"
                        color={req.paymentStatus === "Paid" ? "green" : "red"}
                        className="bg-transparent pl-0"
                      >
                        {req.paymentStatus}
                      </Badge>
                      <Text size="xs" fw={700}>
                        {req.amount}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs" className="text-gray-400">
                        <Calendar size={14} />
                        <Text size="xs">{req.time}</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td className="text-right">
                      <Tooltip label="View Details" withArrow position="left">
                        <Link href={`/admin/requests/${req.id}`}>
                          <ActionIcon
                            variant="light"
                            color="gray"
                            className="bg-white/5 hover:bg-brand-red hover:text-white text-gray-300 transition-all"
                          >
                            <Eye size={18} />
                          </ActionIcon>
                        </Link>
                      </Tooltip>
                    </Table.Td>
                  </motion.tr>
                ))}
              </Table.Tbody>
            </Table>
            {filteredRequests.length === 0 && (
              <div className="text-center py-16 flex flex-col items-center justify-center text-gray-500">
                <FileText size={48} className="mb-4 opacity-20" />
                <Text>No requests found in this category.</Text>
              </div>
            )}
          </div>
        </Paper>
      </motion.div>
    </Box>
  );
}
