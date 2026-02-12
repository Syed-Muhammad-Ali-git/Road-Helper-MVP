"use client";

import React, { useEffect, useState } from "react";
import {
  Title,
  Text,
  Paper,
  Stack,
  Box,
  Table,
  Badge,
  Button,
  Loader,
} from "@mantine/core";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { auth, db } from "@/lib/firebase/config";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import type { RideRequestDoc } from "@/types";

export default function ServiceHistoryUI() {
  const { dict, isRTL } = useLanguage();
  const [history, setHistory] = useState<
    Array<{ id: string } & RideRequestDoc>
  >([]);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUid(u?.uid ?? null);
      if (!u) setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!uid) return;

    const q = query(
      collection(db, "rideRequests"),
      where("customerId", "==", uid),
      orderBy("createdAt", "desc"),
    );

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const reqs = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate
              ? data.createdAt.toDate()
              : new Date(),
          } as any;
        });
        setHistory(reqs);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching history:", err);
        setLoading(false);
      },
    );

    return () => unsub();
  }, [uid]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "yellow";
      case "accepted":
        return "blue";
      case "in_progress":
        return "grape";
      case "completed":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <Box className={`p-4 md:p-8 ${isRTL ? "text-right" : "text-left"}`}>
      <Stack gap="xl">
        <Box>
          <Title order={1} className="text-3xl font-bold">
            {dict.sidebar.service_history || "Service History"}
          </Title>
          <Text c="dimmed">
            {dict.sidebar.track_past_requests ||
              "Track all your past help requests."}
          </Text>
        </Box>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader color="red" />
          </div>
        ) : history.length === 0 ? (
          <Paper
            p="xl"
            radius="xl"
            withBorder
            py={60}
            className="text-center bg-slate-50 border-dashed"
          >
            <Text c="dimmed">
              {dict.sidebar.no_requests_history ||
                "You haven't made any requests yet."}
            </Text>
            <Button mt="md" component={Link} href="/customer/request-help">
              {dict.sidebar.get_help_now || "Get Help Now"}
            </Button>
          </Paper>
        ) : (
          <Paper p="md" radius="xl" withBorder className="overflow-hidden">
            <Table highlightOnHover verticalSpacing="md" horizontalSpacing="lg">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th className={isRTL ? "text-right" : ""}>
                    {dict.sidebar.date || "Date"}
                  </Table.Th>
                  <Table.Th className={isRTL ? "text-right" : ""}>
                    {dict.sidebar.service || "Service"}
                  </Table.Th>
                  <Table.Th className={isRTL ? "text-right" : ""}>
                    {dict.sidebar.helper || "Helper"}
                  </Table.Th>
                  <Table.Th className={isRTL ? "text-right" : ""}>
                    {dict.sidebar.status || "Status"}
                  </Table.Th>
                  <Table.Th className={isRTL ? "text-right" : ""}>
                    {dict.sidebar.action || "Action"}
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {history.map((req) => (
                  <Table.Tr key={req.id}>
                    {/* Date */}
                    <Table.Td>
                      <Text size="sm">
                        {req.createdAt instanceof Date
                          ? req.createdAt.toLocaleDateString()
                          : "N/A"}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {req.createdAt instanceof Date
                          ? req.createdAt.toLocaleTimeString()
                          : ""}
                      </Text>
                    </Table.Td>

                    {/* Service */}
                    <Table.Td>
                      <Text size="sm" fw={600} tt="capitalize">
                        {req.serviceType?.replace("_", " ") || "N/A"}
                      </Text>
                      <Text size="xs" c="dimmed" lineClamp={1}>
                        {typeof req.location === "object"
                          ? req.location.address
                          : req.location}
                      </Text>
                    </Table.Td>

                    {/* Helper */}
                    <Table.Td>
                      <Text size="sm">{req.helperName || "-"}</Text>
                    </Table.Td>

                    {/* Status */}
                    <Table.Td>
                      <Badge variant="light" color={getStatusColor(req.status)}>
                        {req.status}
                      </Badge>
                    </Table.Td>

                    {/* Action */}
                    <Table.Td>
                      <Button
                        variant="subtle"
                        size="xs"
                        component={Link}
                        href={
                          req.status === "pending" ||
                          req.status === "accepted" ||
                          req.status === "in_progress"
                            ? `/journey/${req.id}`
                            : `/customer/request-status?id=${req.id}`
                        }
                      >
                        {dict.sidebar.view || "View"}
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        )}
      </Stack>
    </Box>
  );
}
