import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// is function ka kaam tailwind ki same classes ko merge karna or same classes alag alag values ka sath hoon to last wali ko priority daina yahi kaam hai is function ka (jaise: "p-2" aur "p-4")
// or is function ko use karna hai is tarah se cn(class1, class2, class3) is tarah se use karna hai
