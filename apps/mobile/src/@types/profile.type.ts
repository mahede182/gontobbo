import React from "react";
import { TextStyle, ViewStyle } from "react-native";
import { User } from "./auth.type";
import { WishlistItem } from "./api.type";

export type LegalDocument = {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  type: "policy" | "terms" | "guidelines" | "licenses";
};

export interface LegalItemCardProps {
  item: LegalDocument;
  index: number;
  onPress: () => void;
}

export interface MenuItemProps {
  label: string;
  icon?: any;
  onPress: () => void;
  showArrow?: boolean;
  value?: string;
  valueStyle?: ViewStyle | TextStyle;
  containerStyle?: ViewStyle;
}

export interface MenuSectionProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

export type PaymentMethod = {
  id: number;
  name: string;
  icon: any;
  type: string;
};

export interface PaymentMethodItemProps {
  item: PaymentMethod;
  index: number;
}

export interface PersonalInfoCardProps {
  userData: any;
  personalInfo: { label: string; value: string; icon: string }[];
}

export interface PreferenceItemProps {
  item: { key: string; label: string; value: boolean };
  index: number;
  onToggle: (key: string, value: boolean) => void;
}

export interface ProfileHeaderProps {
  userData: any;
  displayName: string;
  email: string;
}

export interface QuickActionsProps {
  provider: User["socialType"];
  onNavigate: (screen: string) => void;
}

export interface WishlistItemCardProps {
  item: WishlistItem;
  index: number;
  onRemove: (id: string) => void;
  onBookNow: (item: WishlistItem) => void;
}

export type TravelDocument = {
  id: string;
  type: "PASSPORT" | "VISA" | "INSURANCE" | "VACCINATION";
  name: string;
  expiryDate?: Date;
  isRequired: boolean;
  description: string;
  status: "VALID" | "MISSING" | "EXPIRED" | "NOT_ALLOWED";
};
