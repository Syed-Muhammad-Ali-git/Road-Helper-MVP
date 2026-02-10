"use client";

import React, { useState, Suspense } from "react";
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
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import z from "zod";
import { showSuccess, showError } from "@/lib/sweetalert";
import { zodResolver } from "mantine-form-zod-resolver";

const requestHelpSchema = z.object({
  serviceType: z.string().min(1, "Service type is required"),
  location: z.string().min(1, "Location is required"),
  vehicleDetails: z.string().min(1, "Vehicle details are required"),
  issueDescription: z.string().min(1, "Issue description is required"),
});

function RequestHelpContent() {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);

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
      console.log("Request Help Form Submitted:", values);

      // Simulate API call - TODO: Replace with Firebase
      setTimeout(async () => {
        setActive(3); // Complete step
        setLoading(false);
        await showSuccess("Request submitted successfully!");
      }, 1000);
    } else {
      await showError("Validation Error", "Please fill in all required fields correctly.");
    }
  };

  return (
    <Box className="p-4 md:p-8 max-w-4xl mx-auto">
      <Paper p="xl" radius="xl" withBorder>
        <Stepper active={active} allowNextStepsSelect={false}>
          {/* STEP 1 */}
          <Stepper.Step
            label="Service"
            description="What do you need?"
            icon={<IconCar size={rem(18)} />}
            className="w-full"
          >
            <Stack mt="xl">
              <Select
                label="Emergency Service Type"
                placeholder="Select service"
                required
                data={[
                  { value: "bike_mechanic", label: "Bike Mechanic" },
                  { value: "car_mechanic", label: "Car Mechanic" },
                  { value: "fuel_delivery", label: "Fuel Delivery" },
                  { value: "towing", label: "Towing Service" },
                ]}
                {...form.getInputProps("serviceType")}
              />
              <TextInput
                label="Current Location"
                required
                leftSection={<IconMapPin size={18} />}
                {...form.getInputProps("location")}
              />
            </Stack>
          </Stepper.Step>

          {/* STEP 2 */}
          <Stepper.Step
            label="Details"
            description="Vehicle & Issue"
            icon={<IconMessage2 size={rem(18)} />}
            className="w-full"
          >
            <Stack mt="xl">
              <TextInput
                label="Vehicle Information"
                required
                {...form.getInputProps("vehicleDetails")}
              />
              <Textarea
                label="Issue Description"
                required
                minRows={4}
                {...form.getInputProps("issueDescription")}
              />
            </Stack>
          </Stepper.Step>

          {/* STEP 3 */}
          <Stepper.Step
            label="Review"
            description="Confirm details"
            icon={<IconCheck size={rem(18)} />}
            className="w-full"
          >
            <Stack mt="xl">
              <Title order={4}>Review Your Request</Title>
              <SimpleGrid cols={2}>
                <Box>
                  <Text fw={600}>Service</Text>
                  <Text>{form.values.serviceType.replace("_", " ")}</Text>
                </Box>
                <Box>
                  <Text fw={600}>Location</Text>
                  <Text>{form.values.location}</Text>
                </Box>
              </SimpleGrid>
              <Box>
                <Text fw={600}>Vehicle</Text>
                <Text>{form.values.vehicleDetails}</Text>
              </Box>
              <Box>
                <Text fw={600}>Description</Text>
                <Text>{form.values.issueDescription}</Text>
              </Box>
            </Stack>
          </Stepper.Step>

          {/* DONE */}
          <Stepper.Completed>
            <Stack align="center" gap="md" className="text-center py-8">
              <ThemeIcon size="xl" radius="xl" color="green" variant="light">
                <IconCircleCheck size={32} />
              </ThemeIcon>
              <Title order={3}>Request Submitted!</Title>
              <Text c="dimmed">
                Your request has been submitted successfully.
              </Text>
              <Button
                variant="light"
                color="blue"
                onClick={() => {
                  setActive(0);
                  form.reset();
                }}
                className="mt-4"
              >
                Make Another Request
              </Button>
            </Stack>
          </Stepper.Completed>
        </Stepper>

        {active < 3 && (
          <Group justify="center" mt="xl">
            {active > 0 && (
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
            )}
            {active < 2 ? (
              <Button onClick={nextStep}>Next</Button>
            ) : (
              <Button loading={loading} onClick={handleSubmit} type="submit">
                Send Request
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
