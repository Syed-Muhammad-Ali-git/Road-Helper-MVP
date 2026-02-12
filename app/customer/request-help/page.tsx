"use client";

import React, { useEffect, useState, Suspense } from "react";
import {
  Title,
  Text,
  Paper,
  Stack,
  TextInput,
  Textarea,
  Button,
  Box,
  Group,
  Select,
  Stepper,
  rem,
  ThemeIcon,
  SimpleGrid,
  Loader,
} from "@mantine/core";
import {
  IconMapPin,
  IconCar,
  IconMessage2,
  IconCheck,
  IconCircleCheck,
  IconCurrentLocation,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import z from "zod";
import { showSuccess, showError } from "@/lib/sweetalert";
import { toast } from "react-toastify";
import { zodResolver } from "mantine-form-zod-resolver";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { useLiveLocation } from "@/hooks/useLiveLocation";
import { useLanguage } from "@/app/context/LanguageContext";
import dynamic from "next/dynamic";
import {
  createRideRequest,
  subscribeRideRequest,
} from "@/lib/services/requestService";

const LiveMap = dynamic(() => import("@/components/map/LiveMap"), {
  ssr: false,
});
import type { ServiceType } from "@/types";

const requestHelpSchema = z.object({
  serviceType: z.string().min(1, "Service type is required"),
  location: z.string().min(1, "Location is required"),
  vehicleDetails: z.string().min(1, "Vehicle details are required"),
  issueDescription: z.string().min(1, "Issue description is required"),
});

function RequestHelpContent() {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [requestStatus, setRequestStatus] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const router = useRouter();
  const { dict } = useLanguage();
  const live = useLiveLocation({
    onSuccess: (coords) => {
      form.setFieldValue(
        "location",
        `Current location (${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)})`,
      );
      toast.success("Location captured! Coordinates filled in.");
    },
  });
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUid(u?.uid ?? null));
    return () => unsub();
  }, []);

  const form = useForm({
    initialValues: {
      serviceType: "",
      location: "",
      vehicleDetails: "",
      issueDescription: "",
    },
    validate: zodResolver(requestHelpSchema),
  });

  const nextStep = () => setActive((prev) => prev + 1);
  const prevStep = () => setActive((prev) => prev - 1);
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!form.validate().hasErrors) {
      setLoading(true);
      const values = form.values;
      try {
        const uid = auth.currentUser?.uid;
        if (!uid) {
          await showError("Not signed in", "Please log in to send a request.");
          setLoading(false);
          return;
        }

        const serviceType = values.serviceType as ServiceType;
        const location = live.coords
          ? {
              lat: live.coords.lat,
              lng: live.coords.lng,
              address: values.location,
            }
          : { lat: 24.8607, lng: 67.0011, address: values.location };

        const displayName =
          auth.currentUser?.displayName ??
          auth.currentUser?.email?.split("@")[0] ??
          "Customer";
        const { getUserByUid } = await import("@/lib/services/userService");
        const customerProfile = await getUserByUid(uid);
        const id = await createRideRequest({
          customerId: uid,
          customerName: displayName,
          customerPhone: customerProfile?.phone ?? null,
          serviceType,
          location,
          vehicleDetails: values.vehicleDetails,
          issueDescription: values.issueDescription,
        });
        setRequestId(id);
        setRequestStatus("pending");
        setActive(3);
        await showSuccess(
          "Request sent",
          "We’re notifying nearby helpers. Keep this screen open for live updates.",
        );
      } catch (err: unknown) {
        const msg =
          err instanceof Error ? err.message : "Unable to create request.";
        await showError("Request Failed", msg);
      } finally {
        setLoading(false);
      }
    } else {
      await showError(
        "Validation Error",
        "Please fill in all required fields correctly.",
      );
    }
  };

  useEffect(() => {
    if (!requestId) return;
    const unsub = subscribeRideRequest(requestId, (req) => {
      if (!req) return;
      setRequestStatus((req as any).status ?? null);
      if ((req as any).status === "accepted" && (req as any).helperId) {
        toast.dismiss(); // Dismiss any existing toasts
        toast.success(dict.request_help_page.request_sent); // Optional: notify acceptance
        router.push(`/journey/${requestId}`);
      }
    });
    return () => unsub();
  }, [requestId, router]);

  return (
    <Box className="p-4 md:p-8 max-w-4xl mx-auto">
      <Paper p="xl" radius="xl" withBorder>
        <Stepper active={active} allowNextStepsSelect={false}>
          {/* STEP 1 */}
          <Stepper.Step
            label={dict.request_help_page.service_step_title}
            description={dict.request_help_page.service_step_desc}
            icon={<IconCar size={18} />}
            className="w-full"
          >
            <Stack mt="xl">
              <Select
                label={dict.request_help_page.emergency_service_type}
                placeholder={dict.request_help_page.select_service_placeholder}
                required
                data={[
                  {
                    value: "mechanic",
                    label: dict.request_help_page.mobile_mechanic,
                  },
                  { value: "tow", label: dict.request_help_page.towing_truck },
                  {
                    value: "fuel",
                    label: dict.request_help_page.fuel_delivery,
                  },
                  {
                    value: "battery",
                    label: dict.request_help_page.battery_jump,
                  },
                  {
                    value: "lockout",
                    label: dict.request_help_page.lockout_service,
                  },
                ]}
                {...form.getInputProps("serviceType")}
              />
              <TextInput
                label={dict.request_help_page.current_location}
                required
                leftSection={<IconMapPin size={18} />}
                rightSection={
                  <Button
                    variant="subtle"
                    size="xs"
                    loading={live.isWatching && !live.coords && !live.error}
                    onClick={(e) => {
                      e.preventDefault();
                      live.requestPermission();
                    }}
                    leftSection={<IconCurrentLocation size={14} />}
                  >
                    {dict.request_help_page.use_gps}
                  </Button>
                }
                {...form.getInputProps("location")}
              />
              {live.error && (
                <Text size="xs" c="dimmed">
                  Location: {live.error}
                </Text>
              )}
            </Stack>
          </Stepper.Step>

          {/* STEP 2 */}
          <Stepper.Step
            label={dict.request_help_page.details_step_title}
            description={dict.request_help_page.details_step_desc}
            icon={<IconMessage2 size={18} />}
            className="w-full"
          >
            <Stack mt="xl">
              <TextInput
                label={dict.request_help_page.vehicle_information}
                required
                {...form.getInputProps("vehicleDetails")}
              />
              <Textarea
                label={dict.request_help_page.issue_description}
                required
                minRows={4}
                {...form.getInputProps("issueDescription")}
              />
            </Stack>
          </Stepper.Step>

          {/* STEP 3 */}
          <Stepper.Step
            label={dict.request_help_page.review_step_title}
            description={dict.request_help_page.review_step_desc}
            icon={<IconCheck size={18} />}
            className="w-full"
          >
            <Stack mt="xl">
              <Title order={4}>
                {dict.request_help_page.review_your_request}
              </Title>
              <SimpleGrid cols={2}>
                <Box>
                  <Text fw={600}>
                    {dict.request_help_page.service_step_title}
                  </Text>
                  <Text>{form.values.serviceType.replace("_", " ")}</Text>
                </Box>
                <Box>
                  <Text fw={600}>
                    {dict.request_help_page.current_location}
                  </Text>
                  <Text>{form.values.location}</Text>
                </Box>
              </SimpleGrid>
              <Box>
                <Text fw={600}>
                  {dict.request_help_page.vehicle_information}
                </Text>
                <Text>{form.values.vehicleDetails}</Text>
              </Box>
              <Box>
                <Text fw={600}>{dict.request_help_page.issue_description}</Text>
                <Text>{form.values.issueDescription}</Text>
              </Box>
            </Stack>
          </Stepper.Step>

          {/* DONE */}
          <Stepper.Completed>
            <Stack gap="md" className="py-6">
              <Group justify="space-between" align="center">
                <Group>
                  <ThemeIcon
                    size="xl"
                    radius="xl"
                    color="green"
                    variant="light"
                  >
                    <IconCircleCheck size={32} />
                  </ThemeIcon>
                  <Box>
                    <Title order={3}>
                      {dict.request_help_page.request_sent}
                    </Title>
                    <Text c="dimmed">
                      Status:{" "}
                      <strong>
                        {(requestStatus ?? "pending").replace("_", " ")}
                      </strong>
                    </Text>
                  </Box>
                </Group>
                <Button
                  variant="light"
                  color="blue"
                  onClick={() =>
                    requestId && router.push(`/journey/${requestId}`)
                  }
                  disabled={!requestId}
                >
                  {dict.request_help_page.open_live_view}
                </Button>
              </Group>

              <Paper
                p="md"
                radius="xl"
                className="bg-black/20 border border-white/10"
              >
                <Text fw={700} className="text-white mb-1">
                  {dict.request_help_page.waiting_for_helper}
                </Text>
                <Text size="sm" c="dimmed">
                  {dict.request_help_page.keep_open_msg}
                </Text>
              </Paper>

              <LiveMap
                customer={
                  live.coords
                    ? {
                        lat: live.coords.lat,
                        lng: live.coords.lng,
                        label: "You",
                      }
                    : null
                }
                helper={null}
              />

              <Group justify="center">
                <Button
                  variant="light"
                  color="gray"
                  onClick={() => {
                    setActive(0);
                    setRequestId(null);
                    setRequestStatus(null);
                    form.reset();
                  }}
                >
                  {dict.request_help_page.make_another_request}
                </Button>
              </Group>
            </Stack>
          </Stepper.Completed>
        </Stepper>

        {active < 3 && (
          <Group justify="center" mt="xl">
            {active > 0 && (
              <Button variant="default" onClick={prevStep}>
                {dict.request_help_page.back}
              </Button>
            )}
            {active < 2 ? (
              <Button onClick={nextStep}>{dict.request_help_page.next}</Button>
            ) : (
              <Button loading={loading} onClick={handleSubmit} type="submit">
                {dict.request_help_page.send_request}
              </Button>
            )}
          </Group>
        )}
      </Paper>
    </Box>
  );
}

export default function RequestHelpPage() {
  return (
    <Suspense fallback={<Loader size="lg" />}>
      <RequestHelpContent />
    </Suspense>
  );
}
