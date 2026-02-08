"use client";

import React, { useState } from "react";
import {
  Title,
  Text,
  Paper,
  Group,
  TextInput,
  Button,
  Table,
  Avatar,
  Badge,
  ActionIcon,
  Menu,
  Pagination,
  Modal,
  Box,
  SimpleGrid,
  Select,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconSearch,
  IconPlus,
  IconDotsVertical,
  IconEdit,
  IconTrash,
  IconBan,
  IconFilter,
  IconDownload,
  IconUserPlus,
  IconSortDescending,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const initialUsers = [
  {
    id: 1,
    name: "Ali Raza",
    email: "ali@gmail.com",
    role: "Customer",
    phone: "+92 300 1234567",
    status: "Active",
    lastActive: "2 mins ago",
  },
  {
    id: 2,
    name: "Ahmed Khan",
    email: "ahmed@helper.com",
    role: "Helper",
    phone: "+92 321 7654321",
    status: "Active",
    lastActive: "1 hour ago",
  },
  {
    id: 3,
    name: "Sara Smith",
    email: "sara@gmail.com",
    role: "Customer",
    phone: "+92 333 9876543",
    status: "Inactive",
    lastActive: "3 days ago",
  },
  {
    id: 4,
    name: "Mike T.",
    email: "mike@mechanic.com",
    role: "Helper",
    phone: "+92 301 1122334",
    status: "Suspended",
    lastActive: "1 week ago",
  },
  {
    id: 5,
    name: "John Doe",
    email: "john@doe.com",
    role: "Customer",
    phone: "+92 345 6789012",
    status: "Active",
    lastActive: "5 mins ago",
  },
];

export default function UsersPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Form State for New User
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    phone: "",
  });

  const handleAddUser = () => {
    // Basic Validation
    if (!newUser.firstName || !newUser.email || !newUser.role) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const userToAdd = {
      id: users.length + 1,
      name: `${newUser.firstName} ${newUser.lastName}`,
      email: newUser.email,
      role: newUser.role,
      phone: newUser.phone,
      status: "Active",
      lastActive: "Just now",
    };

    setUsers([userToAdd, ...users]);
    toast.success("User added successfully!");
    setNewUser({ firstName: "", lastName: "", email: "", role: "", phone: "" });
    close();
  };

  const handleDeleteUser = (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
      toast.success("User deleted.");
    }
  };

  const handleFilter = () => {
    toast.info("Filter functionality would go here.");
  };

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    const sorted = [...users].sort((a, b) => {
      if (newOrder === "asc") return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });
    setUsers(sorted);
    toast.success(`Sorted by Name (${newOrder === "asc" ? "A-Z" : "Z-A"})`);
  };

  // Filter Logic
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

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
              User Management
            </Title>
            <Text className="text-gray-400">
              Manage customers, helpers, and verification status.
            </Text>
          </div>
          <Group className="mt-4 md:mt-0">
            <Button
              variant="outline"
              color="gray"
              leftSection={<IconDownload size={18} />}
              className="text-gray-300 border-gray-700 hover:bg-gray-800"
              onClick={() => toast.success("Exporting user list...")}
            >
              Export
            </Button>
            <Button
              className="bg-brand-red hover:bg-brand-dark-red text-white"
              leftSection={<IconPlus size={18} />}
              onClick={open}
            >
              Add New User
            </Button>
          </Group>
        </Group>

        <Paper
          p="lg"
          radius="xl"
          className="glass-dark border border-white/10 overflow-hidden bg-brand-charcoal/50"
        >
          {/* Toolbar */}
          <Group
            justify="space-between"
            mb="md"
            className="flex-col md:flex-row"
          >
            <TextInput
              placeholder="Search users by name or email..."
              leftSection={<IconSearch size={16} />}
              className="w-full md:w-80"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              styles={{
                input: {
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderColor: "rgba(255,255,255,0.1)",
                  color: "white",
                  "&:focus": {
                    borderColor: "#EF4444",
                  },
                },
              }}
            />
            <Group gap="xs">
              <Button
                variant="default"
                leftSection={<IconFilter size={16} />}
                className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                onClick={handleFilter}
              >
                Filter
              </Button>
              <Button
                variant="default"
                leftSection={<IconSortDescending size={16} />}
                className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                onClick={handleSort}
              >
                Sort: {sortOrder === "asc" ? "A-Z" : "Newest"}
              </Button>
            </Group>
          </Group>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table verticalSpacing="sm" className="text-gray-200">
              <Table.Thead className="bg-white/5">
                <Table.Tr>
                  <Table.Th>User Info</Table.Th>
                  <Table.Th>Role</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Last Active</Table.Th>
                  <Table.Th className="text-right">Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <AnimatePresence mode="popLayout">
                  {filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-white/5 transition-colors group border-b border-white/5 last:border-0"
                    >
                      <Table.Td>
                        <Group gap="sm">
                          <Avatar
                            src={null}
                            alt={user.name}
                            radius="xl"
                            color="red"
                            className="bg-gradient-to-br from-brand-red to-brand-dark-red text-white font-bold"
                          >
                            {user.name[0]}
                          </Avatar>
                          <div>
                            <Text size="sm" fw={600} className="text-white">
                              {user.name}
                            </Text>
                            <Text size="xs" className="text-gray-400">
                              {user.email}
                            </Text>
                          </div>
                        </Group>
                      </Table.Td>
                      <Table.Td>
                        <Badge
                          variant="dot"
                          color={
                            user.role === "Admin"
                              ? "red"
                              : user.role === "Helper"
                                ? "blue"
                                : "gray"
                          }
                          size="lg"
                          className="bg-transparent pl-0 text-gray-300"
                        >
                          {user.role}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Badge
                          color={
                            user.status === "Active"
                              ? "green"
                              : user.status === "Suspended"
                                ? "red"
                                : "gray"
                          }
                          variant="light"
                          className="capitalize"
                        >
                          {user.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td className="text-gray-400 text-sm">
                        {user.lastActive}
                      </Table.Td>
                      <Table.Td className="text-right">
                        <Menu shadow="md" width={200} position="bottom-end">
                          <Menu.Target>
                            <ActionIcon
                              variant="subtle"
                              color="gray"
                              className="hover:bg-white/10"
                            >
                              <IconDotsVertical size={18} />
                            </ActionIcon>
                          </Menu.Target>
                          <Menu.Dropdown className="bg-[#18181B] border-[#27272A]">
                            <Menu.Item
                              leftSection={<IconEdit size={14} />}
                              className="text-gray-300 hover:bg-white/5"
                              onClick={() => toast.info(`Editing ${user.name}`)}
                            >
                              Edit Details
                            </Menu.Item>
                            <Menu.Item
                              leftSection={<IconBan size={14} />}
                              color="orange"
                              className="hover:bg-orange-500/10"
                              onClick={() =>
                                toast.warning(`${user.name} suspended.`)
                              }
                            >
                              Suspend User
                            </Menu.Item>
                            <Menu.Divider className="border-gray-700" />
                            <Menu.Item
                              leftSection={<IconTrash size={14} />}
                              color="red"
                              className="hover:bg-red-500/10"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Delete User
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      </Table.Td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </Table.Tbody>
            </Table>
            {filteredUsers.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                No users found.
              </div>
            )}
          </div>

          {/* Pagination */}
          <Group justify="end" mt="lg">
            <Pagination
              total={10}
              color="red"
              classNames={{
                control:
                  "bg-white/5 border-white/10 text-gray-300 data-[active=true]:bg-brand-red hover:bg-white/10",
              }}
            />
          </Group>
        </Paper>
      </motion.div>

      {/* Add User Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Text className="text-white font-bold text-xl">Add New User</Text>
        }
        centered
        size="lg"
        classNames={{
          content: "bg-[#18181B] border border-white/10 rounded-2xl",
          header: "bg-[#18181B] border-b border-white/10 p-6",
          body: "p-6",
          close:
            "text-gray-400 hover:bg-white/10 text-white rounded-full transition-colors",
        }}
        overlayProps={{
          blur: 5,
          backgroundOpacity: 0.7,
        }}
        transitionProps={{ transition: "pop", duration: 200 }}
      >
        <div className="grid gap-5">
          <SimpleGrid cols={2}>
            <TextInput
              label="First Name"
              placeholder="John"
              required
              value={newUser.firstName}
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
              classNames={{
                label: "text-gray-400 mb-1.5 font-medium",
                input:
                  "bg-white/5 border-white/10 text-white focus:border-brand-red h-11 rounded-lg",
              }}
            />
            <TextInput
              label="Last Name"
              placeholder="Doe"
              value={newUser.lastName}
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
              classNames={{
                label: "text-gray-400 mb-1.5 font-medium",
                input:
                  "bg-white/5 border-white/10 text-white focus:border-brand-red h-11 rounded-lg",
              }}
            />
          </SimpleGrid>
          <TextInput
            label="Email"
            placeholder="john@example.com"
            required
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            classNames={{
              label: "text-gray-400 mb-1.5 font-medium",
              input:
                "bg-white/5 border-white/10 text-white focus:border-brand-red h-11 rounded-lg",
            }}
          />
          <Select
            label="Role"
            placeholder="Select Role"
            required
            data={["Customer", "Helper", "Admin"]}
            value={newUser.role}
            onChange={(val) => setNewUser({ ...newUser, role: val || "" })}
            classNames={{
              label: "text-gray-400 mb-1.5 font-medium",
              input:
                "bg-white/5 border-white/10 text-white focus:border-brand-red h-11 rounded-lg",
              dropdown:
                "bg-[#18181B] border border-white/10 text-white shadow-xl rounded-lg",
              option:
                "hover:bg-white/10 data-[checked=true]:bg-brand-red data-[checked=true]:text-white",
            }}
          />
          <TextInput
            label="Phone"
            placeholder="+92 300 0000000"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            classNames={{
              label: "text-gray-400 mb-1.5 font-medium",
              input:
                "bg-white/5 border-white/10 text-white focus:border-brand-red h-11 rounded-lg",
            }}
          />
          <Button
            fullWidth
            size="lg"
            className="bg-brand-red hover:bg-brand-dark-red mt-4 h-12 text-base font-bold"
            leftSection={<IconUserPlus size={20} />}
            onClick={handleAddUser}
          >
            Create User
          </Button>
        </div>
      </Modal>
    </Box>
  );
}
