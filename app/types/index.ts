/**
 * Application-wide TypeScript types and interfaces
 * NO any types - strong typing everywhere
 */

import type { LucideIcon } from "lucide-react";

// ----------------------------------------
// ROLES & AUTH
// ----------------------------------------
export type UserRole = "admin" | "helper" | "customer";

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
}

// ----------------------------------------
// FIRESTORE COLLECTION TYPES
// ----------------------------------------
export interface FirestoreUser {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
  photoURL?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminProfile extends FirestoreUser {
  role: "admin";
  adminCode?: string;
}

export interface HelperProfile extends FirestoreUser {
  role: "helper";
  cnic: string;
  services: ServiceType[];
  phone: string;
  whatsapp?: string;
  planId?: string;
  rideCount?: number;
  planLimit?: number;
}

export interface CustomerProfile extends FirestoreUser {
  role: "customer";
  phone: string;
}

export type ServiceType =
  | "mechanic"
  | "tow"
  | "fuel"
  | "medical"
  | "battery"
  | "lockout";

export interface Service {
  id: string;
  name: string;
  slug: ServiceType;
  description?: string;
  icon?: string;
}

// ----------------------------------------
// RIDES / REQUESTS
// ----------------------------------------
export type RideStatus =
  | "pending"
  | "accepted"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface RideRequest {
  id: string;
  customerId: string;
  helperId?: string;
  serviceType: ServiceType;
  status: RideStatus;
  location: GeoLocation;
  destination?: GeoLocation;
  description?: string;
  createdAt: string;
  updatedAt: string;
  acceptedAt?: string;
  completedAt?: string;
}

export interface GeoLocation {
  lat: number;
  lng: number;
  address?: string;
}

// ----------------------------------------
// PLANS & PAYMENTS
// ----------------------------------------
export interface Plan {
  id: string;
  name: string;
  rideLimit: number;
  price: number;
  currency: string;
  paymentMethods: PaymentMethod[];
}

export type PaymentMethod = "jazzcash" | "easypaisa" | "bank";

export interface Payment {
  id: string;
  helperId: string;
  planId: string;
  amount: number;
  method: PaymentMethod;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

// ----------------------------------------
// NOTIFICATIONS
// ----------------------------------------
export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

// ----------------------------------------
// UI COMPONENTS
// ----------------------------------------
export interface SidebarItem {
  text: string;
  icon: LucideIcon;
  path: string;
}

export interface SideBarProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}

// ----------------------------------------
// FRAMER MOTION VARIANTS (typed)
// ----------------------------------------
export interface ContainerVariants {
  hidden: Record<string, unknown>;
  visible: Record<string, unknown>;
  exit?: Record<string, unknown>;
}

export interface ItemVariants {
  hidden: Record<string, unknown>;
  visible: Record<string, unknown>;
}

// ----------------------------------------
// FORM TYPES
// ----------------------------------------
export interface CustomerRegisterForm {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface HelperRegisterForm {
  fullName: string;
  email: string;
  phone: string;
  cnic: string;
  password: string;
  serviceType: string;
  services?: ServiceType[];
}

export interface AdminRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  adminCode: string;
}

export interface LoginForm {
  email: string;
  password: string;
}
