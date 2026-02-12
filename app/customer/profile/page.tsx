"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Title,
  Text,
  Paper,
  Stack,
  Box,
  Avatar,
  TextInput,
  Button,
  Group,
  Divider,
  Loader,
  FileInput,
} from "@mantine/core";

import { IconUser, IconPhone, IconMail, IconCamera, IconCheck, IconX } from "@tabler/icons-react";
import { auth } from "@/lib/firebase/config";
import { getUserByUid, updateUserProfile } from "@/lib/services/userService";
import { showConfirm, showError, showSuccess } from "@/lib/sweetalert";
import { deleteAccountFully } from "@/lib/services/authService";
import { uploadImageToCloudinary, validateImageFile } from "@/lib/services/cloudinaryService";
import { useAppTheme } from "@/app/context/ThemeContext";

export default function ProfilePage() {
  const { isDark } = useAppTheme();
  const [uid, setUid] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Editable fields
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUid(u?.uid ?? null));
    return () => unsub();
  }, []);

  useEffect(() => {
    let alive = true;
    if (!uid) {
      setLoading(false);
      return;
    }
    (async () => {
      setLoading(true);
      const p = await getUserByUid(uid);
      if (!alive) return;
      setProfile(p);
      setDisplayName(p?.displayName ?? "");
      setPhone(p?.phone ?? "");
      setEmail(p?.email ?? "");
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [uid]);

  const initials = useMemo(() => {
    const name = profile?.displayName ?? profile?.email ?? "User";
    return name.toString().slice(0, 2).toUpperCase();
  }, [profile]);

  if (loading) {
    return (
      <Box
        className={`min-h-screen flex items-center justify-center ${isDark ? "bg-brand-black" : "bg-gray-50"}`}
      >
        <Loader size="xl" color="red" />
      </Box>
    );
  }

  const bgClass = isDark ? "bg-brand-black text-white" : "bg-gray-50 text-gray-900";
  const paperClass = isDark ? "glass-dark border border-white/10" : "bg-white border border-gray-200";
  const inputClass = isDark ? "bg-black/30" : "bg-gray-100";

  const handleImageUpload = async (file: File | null) => {
    if (!file || !uid) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      showError("Invalid image", validation.error || "Image upload failed");
      return;
    }

    try {
      setUploading(true);
      const imageUrl = await uploadImageToCloudinary(file);
      await updateUserProfile(uid, { profileImage: imageUrl });
      setProfile((prev: any) => ({ ...prev, profileImage: imageUrl }));
      showSuccess("Success", "Profile image updated");
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Failed to upload image";
      showError("Upload failed", msg);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveChanges = async () => {
    if (!uid) return;

    if (!displayName.trim()) {
      showError("Validation", "Name cannot be empty");
      return;
    }

    try {
      setSaving(true);
      await updateUserProfile(uid, {
        displayName: displayName.trim(),
        phone: phone.trim(),
        email: email.trim(),
      });
      setProfile((prev: any) => ({
        ...prev,
        displayName: displayName.trim(),
        phone: phone.trim(),
        email: email.trim(),
      }));
      setEditing(false);
      showSuccess("Success", "Profile updated successfully");
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Failed to update profile";
      showError("Update failed", msg);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setDisplayName(profile?.displayName ?? "");
    setPhone(profile?.phone ?? "");
    setEmail(profile?.email ?? "");
    setEditing(false);
  };

  return (
    <Box className={`min-h-screen p-4 md:p-8 max-w-2xl mx-auto ${bgClass}`}>
      <Stack gap="xl">
        <Box>
          <Text className={isDark ? "text-gray-400" : "text-gray-600"}>
            Account
          </Text>
          <Title order={1} className="font-manrope text-3xl md:text-4xl">
            My Profile
          </Title>
        </Box>

        {/* Avatar Section */}
        <Paper p="xl" radius="xl" className={`${paperClass} text-center`}>
          <Box className="relative inline-block mx-auto mb-lg">
            <Avatar
              size={120}
              radius="xl"
              color="red"
              src={profile?.profileImage}
            >
              {initials}
            </Avatar>
            {editing && (
              <div className="absolute bottom-0 right-0 flex items-center">
                <input
                  id={`profile-upload-${uid ?? "anon"}`}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => handleImageUpload(e.target.files ? e.target.files[0] : null)}
                />
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(
                      `profile-upload-${uid ?? "anon"}`,
                    ) as HTMLInputElement | null;
                    if (el) el.click();
                  }}
                  className={`${isDark ? "bg-black/90 border-white/10" : "bg-white border-gray-200"} p-2 rounded-full shadow-md border cursor-pointer hover:scale-110 transition-transform`}
                >
                  <IconCamera size={20} className={isDark ? "text-white" : "text-gray-900"} />
                </button>
              </div>
            )}
          </Box>
          <Title order={2} className={isDark ? "text-white" : "text-gray-900"}>
            {profile?.displayName ?? "Customer"}
          </Title>
          <Text c="dimmed">CUSTOMER</Text>
        </Paper>

        <Paper p="xl" radius="xl" className={paperClass}>
          <Stack gap="md">
            <TextInput
              label="Full Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.currentTarget.value)}
              disabled={!editing}
              leftSection={<IconUser size={18} />}
              classNames={{ input: inputClass }}
            />

            <TextInput
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.currentTarget.value)}
              disabled={!editing}
              leftSection={<IconPhone size={18} />}
              classNames={{ input: inputClass }}
            />

            <TextInput
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              disabled={!editing}
              leftSection={<IconMail size={18} />}
              classNames={{ input: inputClass }}
            />

            <Divider my="md" />

            {/* Action Buttons */}
            {!editing ? (
              <Group grow>
                <Button
                  variant="filled"
                  color="blue"
                  fullWidth
                  h={48}
                  radius="md"
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </Button>
              </Group>
            ) : (
              <Group grow>
                <Button
                  variant="filled"
                  color="green"
                  fullWidth
                  h={48}
                  radius="md"
                  loading={saving}
                  leftSection={<IconCheck size={18} />}
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  h={48}
                  radius="md"
                  disabled={saving}
                  leftSection={<IconX size={18} />}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Group>
            )}

            <Divider my="md" label="Danger Zone" labelPosition="center" />
            <Group>
              <Button
                color="red"
                variant="outline"
                fullWidth
                h={48}
                radius="md"
                loading={deleting}
                onClick={async () => {
                  const res = await showConfirm(
                    "Delete account?",
                    "This will permanently delete your account from RoadHelper. This action cannot be undone.",
                    "Delete my account",
                  );
                  if (!res.isConfirmed) return;
                  try {
                    setDeleting(true);
                    await deleteAccountFully();
                    await showSuccess("Account deleted", "We’re sorry to see you go.");
                    window.location.href = "/";
                  } catch (e: unknown) {
                    const msg =
                      e instanceof Error
                        ? e.message
                        : "Unable to delete account. Please re-login and try again.";
                    await showError("Delete failed", msg);
                  } finally {
                    setDeleting(false);
                  }
                }}
              >
                Delete Account
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
