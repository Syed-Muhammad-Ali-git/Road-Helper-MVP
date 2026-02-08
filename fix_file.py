import os

file_path = 'app/admin/dashboard/page.tsx'
with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Try to find the corrupted block and fix it.
# Based on the repr, it looks like there's a lot of whitespace and junk.
# I'll just rewrite the imports part based on what it should be.

clean_imports = """\"use client\";

import React, { useState, useEffect, useMemo, memo, useCallback } from \"react\";
import {
  SimpleGrid,
  Paper,
  Text,
  Title,
  Group,
  ThemeIcon,
  Badge,
  Table,
  Button,
  Box,
  Tooltip,
  Avatar,
  ScrollArea,
  ActionIcon,
} from \"@mantine/core\";
import { 
  IconUsers, 
  IconReceipt, 
  IconAlertCircle, 
  IconActivity, 
  IconTrendingUp, 
  IconPercentage, 
  IconUserShield, 
  IconMapPin, 
  IconArrowRight, 
  IconDownload, 
  IconCrown, 
  IconSparkles 
} from \"@tabler/icons-react\";
import { motion, AnimatePresence, Variants } from \"framer-motion\";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from \"recharts\";
import Image from \"next/image\";
import Link from \"next/link\";
import { cn } from \"@/lib/utils\";
"""

# Find where the mock data starts
marker = "// Mock Data"
start_index = content.find(marker)

if start_index != -1:
    new_content = clean_imports + "\n" + content[start_index:]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("File fixed successfully")
else:
    print("Could not find marker")
