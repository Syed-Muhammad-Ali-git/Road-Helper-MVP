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
} from "@mantine/core";

import {
  IconUser,
  IconPhone,
  IconMail,
  IconCamera,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { auth } from "@/lib/firebase/config";
import { getUserByUid, updateUserProfile } from "@/lib/services/userService";
import { showConfirm, showError, showSuccess } from "@/lib/sweetalert";
import { deleteAccountFully } from "@/lib/services/authService";
import {
  uploadImageToCloudinary,
  validateImageFile,
} from "@/lib/services/cloudinaryService";
import { useAppTheme } from "@/app/context/ThemeContext";
import { useLanguage } from "@/app/context/LanguageContext";

export default function ProfilePage() {
  const { isDark } = useAppTheme();
  const { dict, isRTL } = useLanguage(); // language hook
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
        className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#0a0a0a]" : "bg-gray-50"}`}
      >
        <Loader size="xl" color="red" />
      </Box>
    );
  }

  // Refined theme classes
  const bgClass = isDark
    ? "bg-[#0a0a0a] text-white"
    : "bg-gray-50 text-gray-900";
  const paperClass = isDark
    ? "glass-dark border border-white/10"
    : "bg-white border border-gray-200 shadow-sm";
  const inputClass = isDark
    ? "bg-white/5 border-white/10 text-white placeholder:text-gray-500"
    : "bg-gray-50 border-gray-300 text-gray-900";

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
      const msg =
        error instanceof Error ? error.message : "Failed to upload image";
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
      showSuccess(
        "Success",
        dict.profile.update_profile + " " + dict.profile.save_changes,
      ); // Just "Success" or specific key
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Failed to update profile";
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
    <Box
      className={`min-h-screen p-4 md:p-8 max-w-2xl mx-auto ${bgClass} transition-colors duration-300`}
    >
      <Stack gap="xl">
        <Box className={isRTL ? "text-right" : "text-left"}>
          <Text
            className={`uppercase tracking-wider text-xs font-bold mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            {dict.profile.account}
          </Text>
          <Title order={1} className="font-manrope text-3xl md:text-4xl">
            {dict.profile.my_profile}
          </Title>
        </Box>

        {/* Avatar Section */}
        <Paper
          p="xl"
          radius="32px"
          className={`${paperClass} text-center relative overflow-hidden`}
        >
          {/* Background blur effect */}
          <div
            className={`absolute top-0 left-0 w-full h-32 ${isDark ? "bg-brand-charcoal/50" : "bg-gray-100/50"} z-0`}
          />

          <Box className="relative inline-block mx-auto mb-4 z-10 mt-8">
            <Avatar
              size={120}
              radius="100%"
              color="red"
              src={profile?.profileImage}
              className="border-4 border-white dark:border-[#1a1a1a] shadow-xl"
            >
              {initials}
            </Avatar>
            {/* Camera Icon always visible now for better UX, or just when editing? 
                User asked to enable inputs. Let's make picture upload always accessible or only in edit mode.
                Let's keep it interactive. */}
            <div className="absolute bottom-0 right-0">
              <input
                id={`profile-upload-${uid ?? "anon"}`}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                disabled={uploading} // Only disabled if uploading
                onChange={(e) =>
                  handleImageUpload(e.target.files ? e.target.files[0] : null)
                }
              />
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById(
                    `profile-upload-${uid ?? "anon"}`,
                  ) as HTMLInputElement | null;
                  if (el) el.click();
                }}
                className={`p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform ${isDark ? "bg-brand-red text-white" : "bg-white text-brand-red"}`}
                title={dict.profile.change_photo}
              >
                <IconCamera size={18} />
              </button>
            </div>
          </Box>
          <div className="relative z-10">
            <Title
              order={2}
              className={`mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {profile?.displayName ?? "User"}
            </Title>
            <Text c="dimmed" size="sm" tt="uppercase" fw={700}>
              {dict.profile.customer_badge}
            </Text>
          </div>
        </Paper>

        <Paper p="xl" radius="32px" className={paperClass}>
          <Stack gap="md">
            <TextInput
              label={dict.profile.full_name}
              placeholder={dict.profile.full_name}
              value={displayName}
              onChange={(e) => setDisplayName(e.currentTarget.value)}
              disabled={!editing}
              leftSection={<IconUser size={18} />}
              classNames={{ input: inputClass }}
              variant="filled"
              radius="md"
            />

            <TextInput
              label={dict.profile.phone_number}
              placeholder={dict.profile.phone_number}
              value={phone}
              onChange={(e) => setPhone(e.currentTarget.value)}
              disabled={!editing}
              leftSection={<IconPhone size={18} />}
              classNames={{ input: inputClass }}
              variant="filled"
              radius="md"
            />

            <TextInput
              label={dict.profile.email_address}
              placeholder={dict.profile.email_address}
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              disabled={!editing} // Email often is not changeable easily without verification, but we'll allow editing if previously allowed.
              leftSection={<IconMail size={18} />}
              classNames={{ input: inputClass }}
              variant="filled"
              radius="md"
            />

            <Divider my="md" color={isDark ? "white" : "gray"} opacity={0.1} />

            {/* Action Buttons */}
            {!editing ? (
              <Button
                variant="filled"
                className={`${isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"} h-12 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl`}
                fullWidth
                onClick={() => setEditing(true)}
              >
                {dict.profile.edit_profile}
              </Button>
            ) : (
              <Group grow>
                <Button
                  variant="filled"
                  color="green"
                  h={48}
                  radius="xl"
                  loading={saving}
                  leftSection={<IconCheck size={18} />}
                  onClick={handleSaveChanges}
                  className="font-bold shadow-green-500/20 shadow-lg"
                >
                  {dict.profile.save_changes}
                </Button>
                <Button
                  variant="subtle"
                  color="gray"
                  h={48}
                  radius="xl"
                  disabled={saving}
                  leftSection={<IconX size={18} />}
                  onClick={handleCancel}
                >
                  {dict.profile.cancel}
                </Button>
              </Group>
            )}

            <Divider
              my="md"
              label={dict.profile.danger_zone}
              labelPosition="center"
              color="red"
              style={{ opacity: 0.3 }}
            />

            <Button
              color="red"
              variant="subtle"
              fullWidth
              h={48}
              radius="xl"
              className="hover:bg-red-50 dark:hover:bg-red-900/10"
              loading={deleting}
              onClick={async () => {
                const res = await showConfirm(
                  dict.profile.delete_account_confirm,
                  dict.profile.delete_account_desc,
                  dict.profile.delete_btn,
                );
                if (!res.isConfirmed) return;
                try {
                  setDeleting(true);
                  await deleteAccountFully();
                  await showSuccess(
                    "Account deleted",
                    "We’re sorry to see you go.",
                  );
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
              {dict.profile.delete_account}
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
