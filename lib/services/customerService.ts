import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  orderBy,
  limit,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";

// Export PKR formatter
export const formatPKR = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export interface CustomerStats {
  totalRequests: number;
  completedRequests: number;
  pendingRequests: number;
  totalSpent: number; // in PKR
  averageRating: number;
}

/**
 * Subscribe to customer's ride requests with real-time updates
 */
export function subscribeToCustomerRequests(
  customerId: string,
  callback: (requests: any[]) => void,
): Unsubscribe {
  const q = query(
    collection(db, COLLECTIONS.RIDE_REQUESTS),
    where("customerId", "==", customerId),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(q, (snapshot) => {
    const requests: any[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as any;
      requests.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
        acceptedAt: data.acceptedAt?.toDate?.(),
        completedAt: data.completedAt?.toDate?.(),
      });
    });
    callback(requests);
  });
}

/**
 * Get customer's request history with pagination
 */
export async function getCustomerRequestHistory(customerId: string, pageSize: number = 20) {
  try {
    const q = query(
      collection(db, COLLECTIONS.RIDE_REQUESTS),
      where("customerId", "==", customerId),
      orderBy("createdAt", "desc"),
      limit(pageSize),
    );
    const snapshot = await getDocs(q);
    const requests: any[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as any;
      requests.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
        acceptedAt: data.acceptedAt?.toDate?.(),
        completedAt: data.completedAt?.toDate?.(),
      });
    });
    return requests;
  } catch (error) {
    console.error("Error fetching customer history:", error);
    return [];
  }
}

/**
 * Get customer's dashboard statistics
 */
export async function getCustomerStats(customerId: string): Promise<CustomerStats> {
  try {
    const q = query(
      collection(db, COLLECTIONS.RIDE_REQUESTS),
      where("customerId", "==", customerId),
    );
    const snapshot = await getDocs(q);

    let totalRequests = 0;
    let completedRequests = 0;
    let pendingRequests = 0;
    let totalSpent = 0;
    let totalRating = 0;
    let ratedRequests = 0;

    snapshot.forEach((doc) => {
      const data = doc.data() as any;
      totalRequests += 1;

      if (data.status === "completed") {
        completedRequests += 1;
        totalSpent += data.cost || 0;
        if (data.helperRating && data.helperRating > 0) {
          totalRating += data.helperRating;
          ratedRequests += 1;
        }
      } else if (data.status === "pending") {
        pendingRequests += 1;
      }
    });

    const averageRating = ratedRequests > 0 ? totalRating / ratedRequests : 0;

    return {
      totalRequests,
      completedRequests,
      pendingRequests,
      totalSpent,
      averageRating,
    };
  } catch (error) {
    console.error("Error fetching customer stats:", error);
    return {
      totalRequests: 0,
      completedRequests: 0,
      pendingRequests: 0,
      totalSpent: 0,
      averageRating: 0,
    };
  }
}

/**
 * Subscribe to helper's active jobs with real-time updates
 */
export function subscribeToHelperJobs(
  helperId: string,
  callback: (jobs: any[]) => void,
): Unsubscribe {
  const q = query(
    collection(db, COLLECTIONS.RIDE_REQUESTS),
    where("helperId", "==", helperId),
    where("status", "in", ["accepted", "in_progress"]),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(q, (snapshot) => {
    const jobs: any[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as any;
      jobs.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
        acceptedAt: data.acceptedAt?.toDate?.(),
        completedAt: data.completedAt?.toDate?.(),
      });
    });
    callback(jobs);
  });
}

/**
 * Subscribe to helper's completed jobs earnings in real-time
 */
export function subscribeToHelperEarnings(
  helperId: string,
  callback: (earnings: { total: number; paid: number; pending: number; count: number }) => void,
): Unsubscribe {
  const q = query(
    collection(db, COLLECTIONS.RIDE_REQUESTS),
    where("helperId", "==", helperId),
    where("status", "==", "completed"),
  );

  return onSnapshot(q, (snapshot) => {
    let total = 0;
    let paid = 0;
    let pending = 0;

    snapshot.forEach((doc) => {
      const data = doc.data() as any;
      const amount = data.cost || 0;
      // 80% to helper, 20% platform commission
      const helperEarning = amount * 0.8;
      total += amount;

      if (data.hasCommissionPaid) {
        paid += helperEarning;
      } else {
        pending += helperEarning;
      }
    });

    callback({ total, paid, pending, count: snapshot.size });
  });
}
